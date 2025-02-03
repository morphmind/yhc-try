import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Edit, Trash2, ChevronLeft, ChevronRight, MoreVertical } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { toast } from '@/hooks/useToast';
import { supabase } from '@/lib/supabase';
import { Label } from '@/components/ui/label';

interface SuccessStory {
  id: string;
  type: string;
  status: string;
  language: string;
  before_image: string;
  after_image: string;
  timeframe: string;
  grafts: number;
  age: number;
  video_id: string | null;
  patient_name: string;
  patient_country: string;
  rating: number;
  testimonial: string;
  created_at: string;
  pattern_match?: string[];
}

interface SuccessStoriesTableProps {
  stories: SuccessStory[];
  onEdit: (story: SuccessStory) => void;
  onDelete: (ids: string[]) => void;
  onRefresh: () => void;
}

export function SuccessStoriesTable({ stories, onEdit, onDelete, onRefresh }: SuccessStoriesTableProps) {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(10);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [patternFilter, setPatternFilter] = React.useState<string[]>([]);
  const [typeFilter, setTypeFilter] = React.useState('all');
  const [languageFilter, setLanguageFilter] = React.useState('all');
  const [statusFilter, setStatusFilter] = React.useState('all');
  const [graftRangeFilter, setGraftRangeFilter] = React.useState('all');
  const [ageRangeFilter, setAgeRangeFilter] = React.useState('all');
  const [sortField, setSortField] = React.useState<keyof SuccessStory>('created_at');
  const [sortDirection, setSortDirection] = React.useState<'asc' | 'desc'>('desc');
  const [selectedStories, setSelectedStories] = React.useState<string[]>([]);

  // Filter stories
  const filteredStories = stories.filter(story => {
    const matchesSearch = story.patient_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         story.patient_country.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         story.testimonial.toLowerCase().includes(searchTerm.toLowerCase());

    // Pattern filter
    const matchesPattern = patternFilter.length === 0 || 
      patternFilter.some(pattern => story.pattern_match?.includes(pattern));

    // Graft range filter
    const matchesGraftRange = graftRangeFilter === 'all' || (
      graftRangeFilter === '0-2000' ? story.grafts <= 2000 :
      graftRangeFilter === '2000-3000' ? story.grafts > 2000 && story.grafts <= 3000 :
      graftRangeFilter === '3000-4000' ? story.grafts > 3000 && story.grafts <= 4000 :
      graftRangeFilter === '4000-5000' ? story.grafts > 4000 && story.grafts <= 5000 :
      story.grafts > 5000
    );

    // Age range filter
    const matchesAgeRange = ageRangeFilter === 'all' || (
      ageRangeFilter === '18-30' ? story.age >= 18 && story.age <= 30 :
      ageRangeFilter === '31-40' ? story.age >= 31 && story.age <= 40 :
      ageRangeFilter === '41-50' ? story.age >= 41 && story.age <= 50 :
      story.age > 50
    );

    const matchesType = typeFilter === 'all' || story.type === typeFilter;
    const matchesLanguage = languageFilter === 'all' || story.language === languageFilter;
    const matchesStatus = statusFilter === 'all' || story.status === statusFilter;

    return matchesSearch && matchesPattern && matchesType && matchesLanguage && 
           matchesStatus && matchesGraftRange && matchesAgeRange;
  });

  // Sort stories
  const sortedStories = [...filteredStories].sort((a, b) => {
    if (sortField === 'created_at') {
      return sortDirection === 'asc'
        ? new Date(a[sortField]).getTime() - new Date(b[sortField]).getTime()
        : new Date(b[sortField]).getTime() - new Date(a[sortField]).getTime();
    }
    
    if (typeof a[sortField] === 'number') {
      return sortDirection === 'asc'
        ? (a[sortField] as number) - (b[sortField] as number)
        : (b[sortField] as number) - (a[sortField] as number);
    }
    
    return sortDirection === 'asc'
      ? String(a[sortField]).localeCompare(String(b[sortField]))
      : String(b[sortField]).localeCompare(String(a[sortField]));
  });

  // Paginate stories
  const totalPages = Math.ceil(sortedStories.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedStories = sortedStories.slice(startIndex, startIndex + itemsPerPage);

  const handleSort = (field: keyof SuccessStory) => {
    if (field === sortField) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedStories(paginatedStories.map(story => story.id));
    } else {
      setSelectedStories([]);
    }
  };

  const handleSelectOne = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedStories(prev => [...prev, id]);
    } else {
      setSelectedStories(prev => prev.filter(storyId => storyId !== id));
    }
  };

  const handleBulkAction = async (action: 'delete' | 'publish' | 'draft') => {
    if (selectedStories.length === 0) {
      toast({
        variant: "destructive",
        title: "Hata",
        description: "Lütfen en az bir kayıt seçin",
      });
      return;
    }

    try {
      switch (action) {
        case 'delete':
          onDelete(selectedStories);
          break;
        case 'publish':
        case 'draft':
          const { error } = await supabase
            .from('success_stories')
            .update({ status: action === 'publish' ? 'published' : 'draft' })
            .in('id', selectedStories);

          if (error) throw error;

          toast({
            title: "Başarılı",
            description: `${selectedStories.length} kayıt ${action === 'publish' ? 'yayınlandı' : 'taslağa alındı'}`,
          });
          onRefresh();
          break;
      }
      setSelectedStories([]);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Hata",
        description: error.message,
      });
    }
  };

  return (
    <div className="space-y-4">
      {/* Bulk Actions */}
      {selectedStories.length > 0 && (
        <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
          <span className="text-sm font-medium">
            {selectedStories.length} kayıt seçildi
          </span>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleBulkAction('publish')}
            >
              Yayınla
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleBulkAction('draft')}
            >
              Taslağa Al
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleBulkAction('delete')}
            >
              Sil
            </Button>
          </div>
        </div>
      )}
      {/* Filters */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Input
          placeholder="Ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />

        {/* Pattern Filter */}
        <div className="space-y-2">
          <Label>Saç Dökülme Paterni</Label>
          <div className="flex flex-wrap gap-2">
            {[
              { value: 'none', label: 'Yok' },
              { value: 'light', label: 'Hafif' },
              { value: 'slight-crown', label: 'Hafif Tepe' },
              { value: 'strong-crown', label: 'Güçlü Tepe' },
              { value: 'semi-bald', label: 'Yarı Kel' },
              { value: 'bald', label: 'Kel' }
            ].map(pattern => (
              <Button
                key={pattern.value}
                variant={patternFilter.includes(pattern.value) ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setPatternFilter(prev => 
                    prev.includes(pattern.value)
                      ? prev.filter(p => p !== pattern.value)
                      : [...prev, pattern.value]
                  );
                }}
              >
                {pattern.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Graft Range Filter */}
        <Select value={graftRangeFilter} onValueChange={setGraftRangeFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Greft Aralığı" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tüm Greft Aralıkları</SelectItem>
            <SelectItem value="0-2000">0-2000 Greft</SelectItem>
            <SelectItem value="2000-3000">2000-3000 Greft</SelectItem>
            <SelectItem value="3000-4000">3000-4000 Greft</SelectItem>
            <SelectItem value="4000-5000">4000-5000 Greft</SelectItem>
            <SelectItem value="5000+">5000+ Greft</SelectItem>
          </SelectContent>
        </Select>

        {/* Age Range Filter */}
        <Select value={ageRangeFilter} onValueChange={setAgeRangeFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Yaş Aralığı" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tüm Yaş Aralıkları</SelectItem>
            <SelectItem value="18-30">18-30 Yaş</SelectItem>
            <SelectItem value="31-40">31-40 Yaş</SelectItem>
            <SelectItem value="41-50">41-50 Yaş</SelectItem>
            <SelectItem value="50+">50+ Yaş</SelectItem>
          </SelectContent>
        </Select>

        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger>
            <SelectValue placeholder="İşlem Tipi" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tüm İşlemler</SelectItem>
            <SelectItem value="hair">Saç Ekimi</SelectItem>
            <SelectItem value="afro">Afro Saç Ekimi</SelectItem>
            <SelectItem value="women">Kadınlarda Saç Ekimi</SelectItem>
            <SelectItem value="beard">Sakal Ekimi</SelectItem>
            <SelectItem value="eyebrow">Kaş Ekimi</SelectItem>
          </SelectContent>
        </Select>

        <Select value={languageFilter} onValueChange={setLanguageFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Dil" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tüm Diller</SelectItem>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="tr">Türkçe</SelectItem>
            <SelectItem value="de">Deutsch</SelectItem>
            <SelectItem value="ru">Русский</SelectItem>
            <SelectItem value="ar">العربية</SelectItem>
            <SelectItem value="es">Español</SelectItem>
            <SelectItem value="fr">Français</SelectItem>
          </SelectContent>
        </Select>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Durum" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tüm Durumlar</SelectItem>
            <SelectItem value="published">Yayında</SelectItem>
            <SelectItem value="draft">Taslak</SelectItem>
          </SelectContent>
        </Select>

        <Select 
          value={itemsPerPage.toString()} 
          onValueChange={(value) => {
            setItemsPerPage(parseInt(value));
            setCurrentPage(1);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sayfa başına" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5 kayıt</SelectItem>
            <SelectItem value="10">10 kayıt</SelectItem>
            <SelectItem value="20">20 kayıt</SelectItem>
            <SelectItem value="50">50 kayıt</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox
                  checked={
                    paginatedStories.length > 0 &&
                    paginatedStories.every(story => 
                      selectedStories.includes(story.id)
                    )
                  }
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead 
                className="cursor-pointer"
                onClick={() => handleSort('patient_name')}
              >
                Hasta
                {sortField === 'patient_name' && (
                  <span className="ml-2">
                    {sortDirection === 'asc' ? '↑' : '↓'}
                  </span>
                )}
              </TableHead>
              <TableHead>Tip</TableHead>
              <TableHead>Dil</TableHead>
              <TableHead>Durum</TableHead>
              <TableHead 
                className="cursor-pointer"
                onClick={() => handleSort('grafts')}
              >
                Greft
                {sortField === 'grafts' && (
                  <span className="ml-2">
                    {sortDirection === 'asc' ? '↑' : '↓'}
                  </span>
                )}
              </TableHead>
              <TableHead 
                className="cursor-pointer"
                onClick={() => handleSort('created_at')}
              >
                Tarih
                {sortField === 'created_at' && (
                  <span className="ml-2">
                    {sortDirection === 'asc' ? '↑' : '↓'}
                  </span>
                )}
              </TableHead>
              <TableHead className="text-right">İşlemler</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedStories.map((story) => (
              <TableRow key={story.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedStories.includes(story.id)}
                    onCheckedChange={(checked) => 
                      handleSelectOne(story.id, checked)
                    }
                  />
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium">{story.patient_name}</span>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-muted-foreground">{story.patient_country}</span>
                      {story.pattern_match?.map((pattern) => (
                        <Badge key={pattern} variant="outline" className="text-xs">
                          {pattern === 'none' ? 'Yok' :
                           pattern === 'light' ? 'Hafif' :
                           pattern === 'slight-crown' ? 'Hafif Tepe' :
                           pattern === 'strong-crown' ? 'Güçlü Tepe' :
                           pattern === 'semi-bald' ? 'Yarı Kel' :
                           'Kel'}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{story.type}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{story.language}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={story.status === 'published' ? 'default' : 'secondary'}>
                    {story.status === 'published' ? 'Yayında' : 'Taslak'}
                  </Badge>
                </TableCell>
                <TableCell>{story.grafts}</TableCell>
                <TableCell>
                  {format(new Date(story.created_at), 'dd MMM yyyy', { locale: tr })}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onEdit(story)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Düzenle
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => onDelete([story.id])}
                          className="text-destructive"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Sil
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Toplam {filteredStories.length} kayıt
          {searchTerm && ` (${stories.length} kayıt içinde)`}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="text-sm">
            Sayfa {currentPage} / {totalPages}
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}