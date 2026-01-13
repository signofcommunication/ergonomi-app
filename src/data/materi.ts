export type Materi = {
  id: string;
  title: string;
  subtitle?: string;
  cover?: {
    /** Relative path under /public or /src/assets (when used by bundler) */
    src: string;
    /** Optional overlay/gradient to improve contrast */
    overlay?: 'dark' | 'light' | 'none';
  };
  /** Markdown content */
  contentMd: string;
};

// Dummy materi (lorem ipsum)
export const materiList: Materi[] = [
  {
    id: 'k3l-1',
    title: 'Pengenalan K3L & Lingkungan',
    subtitle: 'Dasar-dasar keselamatan, kesehatan kerja, dan lingkungan',
    cover: {
      src: '/icons/favicon-128x128.png',
      overlay: 'dark',
    },
    contentMd: `# Pengenalan K3L & Lingkungan

**Lorem ipsum** dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

## 1. Definisi
- Lorem ipsum dolor sit amet, consectetur adipiscing elit.
- Ut enim ad minim veniam, quis nostrud exercitation.

## 2. Ruang Lingkup
1. Lorem ipsum dolor sit amet.
2. Consectetur adipiscing elit.
3. Sed do eiusmod tempor.

## 3. Prinsip Dasar
> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.

### 3.1 Tujuan
- Lorem ipsum
- Dolor sit
- Amet consectetur

### 3.2 Manfaat
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.

## 4. Penutup
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sagittis ipsum. Praesent mauris.
`,
  },
  {
    id: 'ergo-1',
    title: 'Ergonomi di Tempat Kerja',
    subtitle: 'Konsep dan penerapan ergonomi untuk kenyamanan kerja',
    cover: {
      src: '/icons/favicon-128x128.png',
      overlay: 'dark',
    },
    contentMd: `# Ergonomi di Tempat Kerja

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa.

## 1. Pengantar
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

## 2. Faktor Risiko
- Lorem ipsum dolor sit amet
- Consectetur adipiscing elit
- Sed do eiusmod tempor

## 3. Rekomendasi Postur
1. Lorem ipsum dolor sit amet
2. Consectetur adipiscing elit
3. Sed do eiusmod tempor

## 4. Checklist Singkat
- [ ] Lorem ipsum
- [ ] Dolor sit amet
- [ ] Consectetur adipiscing
`,
  },
  {
    id: 'stretch-1',
    title: 'Peregangan Ringan di Kantor',
    subtitle: 'Rutinitas singkat untuk mengurangi ketegangan otot',
    cover: {
      src: '/icons/favicon-128x128.png',
      overlay: 'dark',
    },
    contentMd: `# Peregangan Ringan di Kantor

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum lacinia arcu eget nulla.

## 1. Leher
Lorem ipsum dolor sit amet, consectetur adipiscing elit.

## 2. Bahu
Lorem ipsum dolor sit amet, consectetur adipiscing elit.

## 3. Punggung
Lorem ipsum dolor sit amet, consectetur adipiscing elit.

## Catatan Keamanan
> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
`,
  },
];

export function getMateriById(id: string): Materi | undefined {
  return materiList.find((m) => m.id === id);
}
