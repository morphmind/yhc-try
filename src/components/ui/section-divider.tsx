import { cn } from "@/lib/utils";

interface SectionDividerProps {
  className?: string;
}

export function SectionDivider({ className }: SectionDividerProps) {
  return (
    <div className={cn("relative h-[60px] overflow-hidden", className)}>
      {/* Çizgi: SVG genişliği kadar boşluk (40px) bırakılarak ortalanıyor */}
      <div className="absolute inset-0 flex items-center">
        <div className="flex-1 h-1 bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="w-[40px] h-1 bg-transparent" />
        <div className="flex-1 h-1 bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>
      {/* Ortada yer alan SVG */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="40"
          height="60"
          viewBox="0 0 83 120"
          className="drop-shadow-md"
          style={{
            backgroundColor: "transparent",
            /* Aşağıdaki filter, PNG görseli beyaz kabul edilerek
               istenen #2c8e9a tonunu elde etmek amacıyla ayarlandı.  
               (Not: Gerçek sonuç PNG’nizin özelliklerine bağlıdır.  
               Eğer PNG’nin kendi arka planı varsa, onu şeffaf yapmanız gerekir.) */
            filter: "invert(40%) sepia(62%) saturate(2195%) hue-rotate(161deg) brightness(97%) contrast(90%)",
          }}
        >
          <image
            xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFMAAAB4CAYAAACO2c71AAAAAXNSR0IArs4c6QAADPlJREFUeF7tnH2QXlV9xz+/+/a8bZLdvEBCwdIZSIOJAhNABJtuUKSEjoqanU6xKqKVQaB1OlQQA8Sxo+hYh4hVhlYdBzLKltZWC4qWpAGMwC5IyRYcadGmhABrFnaz++zz3HvOac6z93F2Mtmwz+55XmTv/Wfzcu/Zcz/n+3s55/zOFbLLGQFx1lLWEBlMhyLIYGYwHRJw2FSmzAymQwIOm8qUmcF0SMBhU5kyM5gOCThsKlNmBtMhAYdNZcrMYDok4LCpTJkZTIcEHDaVKTOD6ZCAw6YyZWYwHRJw2FSmzAymQwIOm8qUmcF0SMBhU5kyM5gOCThsKlNmBtMhAYdNZcrMYDok4LCpTJkZTIcEHDaVKTOD6Y7AiDHdERRKIs/Pt9UFrUwLMg+byrBnqch/ZjDnSGDHjh3Bht7ej3lwXhmuLIrsnWNTv3lsQSrTGCOT8LsG/jmE+wO4XsT+0/yuhQrTA66pwHUa3l6AR0XEzA8lC++AgFXlQVjRBQ8Z2D8CFy0TGZ0vSPv8glOmMcaq8oPD8JUe+IgP20VEZzAbJGBVOQ7H+vD9PCTAO4EXXZj4glOmVaWGvz4IW/NwWeRQlQsK5jRfORCDqsLZJYeqXGgwra+89GX4ajd8GvisiKgGPcVRb18QAciqEjh2En4s0JODPwT+25WvrBNeKDB94NrJmBuDkC0Pwhc3itgA5PR6zcOsR/AiPCGwqAJvyMH/uFblgvCZaV55xYuYLx2DfP3L99579dWbNlWcSjJt7DWtTKvKCVhVgfsUnLQE3hLCYDNU+ZpX5g5jgl64YRyu8+GOPFwhIuVmqNI5TKuEZo16owCmrQztiSF3aHVoQwF+2sz+OTNzY0wReDPwiIiMNfryru9P1ytvqsC1eXhc4K3iaEFjpr46g3njXXdFN23e/O4q6H8ZGvpu37p1VdeAZttemleu2Qu7l0NXAT4E3OFqQaPpMOspSAk+m8AdAexodudneqlt99yTu+rCC79l0O8dxXt4CfyxiByY7WDM9T5nyrQdSNOQi+0S1yRcmYf/baaPOtJL20Etw5l5nTwknifgXQL0t2JgncJMgS6O4RaBVwLY0mr/aYwpGfiOGDZhGJvwWFOE/a0Y1GbAlBjOmIRv5uBvIvh2K1SRDqRduXjXfrjrmBgv9Li9/+mhq1vlv53DtC9145490Q1r196qoFfDplwTFhWOZOJ267ab5AGDt/ZZvJEVcO4i+HkrVOk8z6y/oPVbVTjFhx+Ow4MKLl8q8spcHftsnrP+ugyb8+g7kyQRCaK/fWJw8JNnnHFGPJvnXdzTFGXWg9EEXFaGW3vgM3cPDd3cLHOzgzcMK0PYJXCSD4mB07tgqFWqbJoy66M8asyyAuwagZMj2LQE7m+G/7TTxg2w5QX41CKQEtwrsFnETs1bdzVNmdNSpfc8C9tXwoiuVt9aiqI9LtWSpkLHF+CpOK6Unglzye/B2/JWpQ72whsZiqbCtB05YMySAH6QYM4qquoDZT/3rh6Rlxvp5NHutao8C319WK3eEEaRjOM9WIKLWp2SNd3M6+nKBGzyE74rgiQ+VxXhNhfmXps2xvEbx0LzSDGJIs9DxR5/Ftk809FeeCOD3nRlpkC7gH9P4MxfwcFVcbyxGIaPzdcM7bTxygvP334Qc3ExCcU3HCiHvLEA++bbdiMQ6/e2Cqb9PRt+AT8+QeHn4bExnwsWi/x6Lp2uKz6GN4lWD4hIsE88cwLc1j809BfNyhpera8tgWk78Y0dO/Lv6+290xgujmN0EvGXj8HX5rqxZaeNY3BnCfMOoVapOtkdx+cUw/Bn7VBlS3zm9ER+AtbnEnZ7HsFzHvHyJPmjfBDsbNS/1XylUheP+v53FicEKMxEjm99fuc3L9+68dJ5lwa+mgJn+v+WKdN24K49e6LNa9ZujzXvPhAiNqk2cF4XvNSImowxSxLYOQGnLiojEqDKwoZCwO5G2pkrtI6AaRVVgZP3GR4+UdEtSqk4518VNhDd04Xf9xj4NuDbDZ2i4WmEc0RkxDWgRtprqTLTwOFrrT/pVdRNJgy95wKGj4ULQru1MIske8yMrTB0/SiK1amB71MWdJfimv6AW/ocl7s0ArKlPnO67yzDcQV4smroqQqmCwbGYNNisVPsma+paaP+VBlvS4nYU1ox4uX/rwTnFmDvbAajUUCN3N9yZdbVSZJcFwfBVgW2oEopuPbOwcFbPjrDKk99t9EHu9tYyulJPM/TQnTz4ODgja1cHeoInzldnbaQahh2LFN6jcQxw1EuXh6rd5Lzf3AkhQ0MDISnnb7+i77WH8PgVUMPZVRSTfSbloThrFxEIyqby71tUWaqTqvID6D07SSJP5qLTDjJo4U8F8hhc3eryhhOfxZ2rx6biMjnGZOYriD6+Sjy5u42B56WzoCOOMrG2M315aExAxMir+ueBDEoCryfw7Y6bML/wd7e/qrmosjW4SvF3tDXv4O+/m68L7Q78LQfZrqbqVAfHsX/u54JfFtF+XyBZ5bC+Xn4lTX31Ff2BrZeSBHkrC0pxUTov1ikcg7kmlLR9ltl5tP85+KX4Z+6jT7Pnv4oi6dzmq/8/eODf2WDkTFmWQz3hVV9OnbmE9pSS7T22Hb30NAn2jUPPxLstvnM6cHo0GymNzD6PpQKxv3QFIXdAucfKlC1U8OP/hK+fGKCjzFoEftD+SEbgQfbnQ5Nh9p2mLYz+40pdcO9I/AWo9GrFFcT8jVgKTA4Ca/L1+SoEfHs4aUXxoXTSvBCBvMwG7F+MUmSt78UBP+6Ah4JYPNOGD4bLkXzVfHwI2MQEZTGiNL9n35o1we2btzYtkWNjjTzeqesOlfA+xJ4KIL/olpdV46i/yhAt1Vk2aspkgOgVsE7fLtpNovp51wCyVyf6Qgzr3felgH29vaq/qGhcPMpa/9hxOOSHrCqpRoEtdu0LWiAc12f4ZkrwI7zmdM7lBYwrIkqPIEmnCxMFfpGpoAI2sC2XXDNXBeVXUDrqOnk0V7ILmacC58LK3wcD28yLNsf+DqH3TATuODQFojdf5/3kWbXYDvKzNO1ynXD8GiPJicCVbsCCuTjHCg9Sd77fTpghaijA5Dt3G0DA+GH16+//QC8f6mZOr5tYVZNlUVqEVJVz1D01ze7nHquiu0YZaaqXE1ingTC2BdqpapG2SJaJr3AFCfGv97/7D1X9K3ra1uJ99FAdwzMtF7oc15iPo5SnsoFNqckFFXLL8fxVL5avsSPCi2pAp6LOjsCZk2VVV4/GjG4WMU5G7bBt1MelOfbwMNzcHAFldNyHbSwcTjwjoCZHn7aNgyXL0+qYunFlYQwn7d5pWVrJuGRArxNxH5iozOvtsOsH18GnqJCt/YNtq7feFUEK9jQAtV5uLm/ny19fW7PiLsclk6AaVfcLyHhGyh8QntqA8SPSVSC9gtojAqRjpxCdtQMyBizyMD9KNbb8ukgmpo2JjKGQhGxyP5VefhvAJ7uxGS9DrStykxN/Ox9sGuVYoqiV4s7VLwRIgkRk8eXwK4OnQw8l8GcwTGlgefW8crkn5eivKgkwU8XNEalSkBAUXk2sNvDBScBv85gzgDTGFt/wOP2LLhvIIljAgtTpLb76OPXYdrSw9WtOLI3n4DUNjNPTfx4A89oiDybods0qLbFA2VUbYEjl/gQ8NKhHcs1GcyZVWkHcmNVq/uMMX6Eh9jsXDRGayr2j0gGczamkh5a/YxBf0Ib7fliMyQwcVKbPhKkEk08q8zMzI8GNT3G/EOD3lCb5Njk0l52+bemULs9niaeUwHIRvPhLAAdgaoxxhZxPBma5PhaRmQT9dqcPHXjFqpS6CCybO0U0kZzZx/Bm431NHpPWwJQGnxOeB5+sRId1QJPXZkGjFK2VAaCAG3DkMd4qsyWHHVuFGJbk/Z0n2fdAXh8pVE153j4HoRYX2mrEEIhTwZzxgFOlXnmi/CTY14F5kRgKIpnv7y6OjPzI/tL617W74WfnqBTZabRPEkdTxhP/WE0hBK8NAGnzOfc0FxNt5Hn2uYzK7D6eWOGTjR6ysxngPlKCEvgl8Cpnbr303afCSzfD0+tVGpZLSPyp3ykXcW0Vz79huDeIDHHE/zb1p07N3daOczhqm2LMmtKnPqo1APoqVLBmWAOB6jl8KfAPzZ6+KoRE3VxbzthWvP+Eom50mZGSTDVlfrnA0vpN1cnfPYW4Sw6rOLtSPDbCVNI6AXzI7t7NgNMOwW6pr+/f1tfX5/TT9q6UGLHmHlq6nYZffcIvL5HI79JNgX2eejjYICpg/hHPR/UDDBzabNtykxh2t//B1XYHilW2YmPPzWj1AQ8fKgM5jJa+CmduQCc/kxbYaZAbRg/7tD+zp+ANfua2/z+oTz0e52+st5RZj5fJXTa821XZqcBmU9/MpjzoXfYsxnMDKZDAg6b+n9yUirERzAK9QAAAABJRU5ErkJggg=="
            style={{ background: "transparent" }}
          />
        </svg>
      </div>
    </div>
  );
}
