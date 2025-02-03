import { HairAnalysisFormData } from '@/types'
import { formatAnalysisDataForWhatsApp } from './formatAnalysisData'
import emailjs from '@emailjs/browser'
import { emailjsConfig } from '@/config/emailjs'
import { telegramConfig } from '@/config/telegram'
import { toast } from '@/hooks/useToast'
import { create } from 'zustand'
import { compressImage } from './imageCompression'
import { supabase } from '@/lib/supabase'

try {
  emailjs.init(emailjsConfig.publicKey)
} catch (error) {
  console.error('EmailJS initialization error:', error)
}

interface SubmissionStore {
  loading: boolean
  message: string
  setLoading: (loading: boolean) => void
  setMessage: (message: string) => void
}

export const useSubmissionStore = create<SubmissionStore>((set) => ({
  loading: false,
  message: '',
  setLoading: (loading) => set({ loading }),
  setMessage: (message) => set({ message }),
}))

// Yardımcı: base64 => File
function dataURLToFile(dataurl: string, filename: string): File | null {
  try {
    const arr = dataurl.split(',')
    if (arr.length < 2) return null
    const mimeMatch = arr[0].match(/:(.*?);/)
    if (!mimeMatch) return null

    const mime = mimeMatch[1]
    const bstr = atob(arr[1])
    let n = bstr.length
    const u8arr = new Uint8Array(n)
    for (let i = 0; i < n; i++) {
      u8arr[i] = bstr.charCodeAt(i)
    }

    return new File([u8arr], filename, { type: mime })
  } catch (error) {
    console.error('Error converting dataURL to File:', error)
    return null
  }
}

export async function submitAnalysis(formData: HairAnalysisFormData, t: any): Promise<boolean> {
  const { setLoading, setMessage } = useSubmissionStore.getState()
  setLoading(true)
  setMessage(t.hairAnalysis.toast.loading.steps.processing)

  let photoUrls: Record<string, string> = {}

  try {
    // 1) localStorage'dan 'photosStep' base64 verilerini okuyalım
    let localPhotos: Record<string, { file: null; preview: string } | undefined> = {}
    const local = localStorage.getItem('photosStep')
    if (local) {
      try {
        localPhotos = JSON.parse(local)
      } catch (err) {
        console.error('Error parsing localStorage photosStep:', err)
      }
    }

    // 2) Fotoğrafları işleme (Supabase'a yükleme + Telegram)
    const hasPhotos =
      formData.photos &&
      Object.keys(formData.photos).length > 0 &&
      Object.values(formData.photos).some((val) => val)

    if (hasPhotos) {
      setMessage(t.hairAnalysis.toast.loading.steps.uploading)

      for (const [type, val] of Object.entries(formData.photos)) {
        try {
          let fileToUpload: File | null = null

          // (A) formData.photos[type] gerçekte bir File mı?
          if (val instanceof File) {
            fileToUpload = val
          } else {
            // (B) Değilse localStorage fallback: base64 => File
            const fallback = localPhotos[type]
            if (fallback?.preview) {
              const now = Date.now()
              const fallbackName = `${now}-${type}.jpg`
              fileToUpload = dataURLToFile(fallback.preview, fallbackName)
            }
          }

          if (!fileToUpload) {
            // Foto yok veya dönüştürülemedi -> atla
            continue
          }

          // Compress & Upload
          const compressedFile = await compressImage(fileToUpload)
          const timestamp = Date.now()
          const safeFileName = fileToUpload.name.replace(/[^a-zA-Z0-9.-]/g, '_')
          const fileName = `${timestamp}-${type}-${safeFileName}`
          const filePath = `submissions/${fileName}`

          const { error: uploadError } = await supabase.storage
            .from('hair-analysis-photos')
            .upload(filePath, compressedFile)

          if (uploadError) throw uploadError

          // Public URL
          const {
            data: { publicUrl },
          } = supabase.storage.from('hair-analysis-photos').getPublicUrl(filePath)

          photoUrls[type] = publicUrl
        } catch (error) {
          console.error(`Error processing ${type} photo:`, error)
        }
      }
    }

    // 3) Gerekli alanları kontrol
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.country) {
      toast({
        variant: 'destructive',
        title: t.hairAnalysis.toast.error.title,
        description: t.hairAnalysis.toast.error.requiredFields,
      })
      setLoading(false)
      return false
    }

    // 4) Supabase'a ekle
    setMessage(t.hairAnalysis.toast.loading.steps.sending)

    const { error: dbError } = await supabase.from('hair_analysis_submissions').insert([
      {
        gender: formData.gender,
        age_range: formData.ageRange,
        hair_loss_type: formData.hairLossType,
        hair_loss_duration: formData.hairLossDuration,
        previous_transplants: formData.previousTransplants || false,
        previous_transplant_details: formData.previousTransplantDetails,
        medical_conditions: formData.medicalConditions || [],
        medications: formData.medications || [],
        allergies: formData.allergies || [],
        photos: photoUrls,
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        country: formData.country,
        status: 'new',
      },
    ])

    if (dbError) throw dbError

    // 5) Telegram + Email
    const whatsappContent = formatAnalysisDataForWhatsApp({
      ...formData,
      photos: photoUrls,
    })

    await Promise.all([
      // EmailJS
      emailjsConfig.publicKey
        ? emailjs
            .send(emailjsConfig.serviceId, emailjsConfig.templateId, {
              to_email: 'vipkaan@gmail.com',
              message: whatsappContent,
              date: new Date().toLocaleString('tr-TR'),
              gender: formData.gender === 'male' ? 'Erkek' : 'Kadın',
              ageRange: formData.ageRange
                ? `${formData.ageRange.min}-${formData.ageRange.max || '+'}`
                : '',
              hairLossType: formData.hairLossType,
              hairLossDuration: formData.hairLossDuration,
              previousTransplants: formData.previousTransplants ? 'Evet' : 'Hayır',
              previousTransplantDetails: formData.previousTransplantDetails || '',
              medicalConditions: formData.medicalConditions?.join(', ') || '',
              medications: formData.medications?.join(', ') || '',
              allergies: formData.allergies?.join(', ') || '',
              photoCount: Object.keys(photoUrls).length,
            })
            .catch((error) => {
              console.error('EmailJS error:', error)
              return null
            })
        : Promise.resolve(null),

      // Telegram
      telegramConfig.botToken && telegramConfig.chatId
        ? Promise.all([
            // Metin Mesajı
            fetch(`https://api.telegram.org/bot${telegramConfig.botToken}/sendMessage`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                chat_id: telegramConfig.chatId,
                text: whatsappContent,
                parse_mode: 'HTML',
                disable_web_page_preview: true,
              }),
            }).catch((error) => {
              console.error('Telegram message error:', error)
              return null
            }),
            // Fotoğrafları da gönder
            ...Object.entries(photoUrls).map(([type, url]) =>
              fetch(`https://api.telegram.org/bot${telegramConfig.botToken}/sendPhoto`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  chat_id: telegramConfig.chatId,
                  photo: url,
                  caption: `${formData.firstName} ${formData.lastName} - ${type} görünüm`,
                  parse_mode: 'HTML',
                }),
              }).catch((error) => {
                console.error('Telegram photo error:', error)
                return null
              })
            ),
          ])
        : Promise.resolve(),
    ]).catch((error) => {
      console.error('Error sending notifications:', error)
      // Bildirimler başarısız olsa bile formu failed yapmıyoruz
    })

    // 6) sessionStorage'a kaydet (tebrikler)
    sessionStorage.setItem(
      'analysisFormData',
      JSON.stringify({
        ...formData,
        photos: photoUrls,
      })
    )

    // Örnek: localStorage temizleme (istiyorsanız)
    // localStorage.removeItem('photosStep')
    // localStorage.removeItem('medicalHistoryStep')
    // localStorage.removeItem('previousTransplantDetails')
    // ... (varsa diğer step'ler)

    // 7) Success Stories
    const { data: stories, error: storiesError } = await supabase
      .from('success_stories')
      .select('*')
      .contains('pattern_match', [formData.hairLossType])
      .eq('status', 'published')
      .order('created_at', { ascending: false })
      .limit(5)

    if (storiesError) throw storiesError
    if (stories?.length > 0) {
      sessionStorage.setItem('matchingStories', JSON.stringify(stories))
    }

    toast({
      title: t.hairAnalysis.toast.success.title,
      description: t.hairAnalysis.toast.success.description.replace('{name}', formData.firstName),
    })

    return true
  } catch (error) {
    console.error('Error submitting analysis:', error)
    toast({
      variant: 'destructive',
      title: t.hairAnalysis.toast.error.title,
      description: t.hairAnalysis.toast.error.submitError,
    })
    return false
  } finally {
    setLoading(false)
  }
}
