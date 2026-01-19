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
    title: 'Materi Ergonomi untuk Mahasiswa/i',
    subtitle: 'Dasar-dasar ergonomi dalam konteks pendidikan',
    cover: {
      src: '/icons/favicon-128x128.png',
      overlay: 'dark',
    },
    contentMd: `# Ergonomi Kampus

## 1. Definisi Ergonomi
Ergonomi adalah ilmu yang mempelajari kesesuaian antara manusia, aktivitas, alat, dan lingkungan dengan tujuan menciptakan kondisi kerja dan belajar yang aman, sehat, nyaman, dan efisien. Prinsip utama ergonomi adalah menyesuaikan pekerjaan dengan kemampuan dan keterbatasan manusia, bukan sebaliknya.

## 2. Ruang Lingkup Ergonomi
Ruang lingkup ergonomi meliputi:

### Ergonomi Fisik
Berkaitan dengan postur tubuh, gerakan, beban kerja, desain meja dan kursi, serta penggunaan alat seperti laptop dan smartphone.

### Ergonomi Kognitif
Berkaitan dengan proses mental seperti konsentrasi, persepsi, beban mental, stres, dan pengambilan keputusan selama aktivitas belajar.

### Ergonomi Organisasi
Berkaitan dengan pengaturan waktu belajar, sistem perkuliahan, beban tugas, kerja kelompok, dan interaksi antara mahasiswa dan dosen.

## 3. Prinsip Dasar Ergonomi
Prinsip dasar ergonomi antara lain:
- Menyesuaikan pekerjaan dengan kemampuan fisik dan mental manusia
- Menggunakan postur kerja yang alami dan netral
- Mengurangi gerakan berulang dan posisi statis terlalu lama
- Memberikan waktu istirahat yang cukup
- Menciptakan lingkungan belajar yang aman dan nyaman

Penerapan prinsip ini dapat mencegah kelelahan, nyeri otot, dan gangguan kesehatan akibat aktivitas belajar yang berkepanjangan.

## 4. Ergonomi Mahasiswa di Lingkungan Kampus
Ergonomi mahasiswa di lingkungan kampus berkaitan dengan bagaimana mahasiswa berinteraksi dengan fasilitas kampus, sistem perkuliahan, dan aktivitas akademik sehari-hari.

Penerapan ergonomi di kampus mencakup:

### Ergonomi Ruang Kelas
- Desain meja dan kursi yang sesuai dengan ukuran tubuh mahasiswa
- Pencahayaan dan ventilasi yang memadai
- Posisi papan tulis atau layar proyektor yang mudah dilihat

### Ergonomi Saat Belajar dan Praktikum
- Postur duduk yang benar saat kuliah dan mengerjakan tugas
- Penggunaan laptop dan alat praktikum secara aman dan nyaman
- Pengaturan waktu belajar dan istirahat

### Ergonomi Penggunaan Gadget dan Teknologi
- Penggunaan laptop dan smartphone dalam durasi yang wajar
- Posisi layar sejajar dengan mata
- Pencegahan kelelahan mata dan nyeri leher

### Ergonomi Lingkungan Kampus
- Jalur pejalan kaki yang aman
- Tangga dan fasilitas umum yang ramah pengguna
- Area belajar yang mendukung kenyamanan dan konsentrasi

Penerapan ergonomi yang baik di lingkungan kampus dapat meningkatkan kesehatan, kenyamanan, konsentrasi, dan prestasi akademik mahasiswa.

## 5. Peregangan untuk Mahasiswa
Peregangan merupakan bagian penting dari penerapan ergonomi bagi mahasiswa, terutama untuk mencegah keluhan muskuloskeletal akibat duduk lama dan aktivitas belajar yang monoton.

### 5.1 Peregangan Leher
**Pengertian:**  
Peregangan leher adalah gerakan sederhana untuk meregangkan otot-otot leher yang tegang akibat posisi kepala menunduk atau statis dalam waktu lama saat belajar atau menggunakan gadget.

**Manfaat:**  
- Mengurangi nyeri dan kekakuan leher  
- Melancarkan aliran darah ke area leher  
- Membantu menjaga fleksibilitas otot leher  

### 5.2 Peregangan Bahu
**Pengertian:**  
Peregangan bahu merupakan gerakan untuk merilekskan otot bahu yang sering tegang akibat postur duduk yang kurang ergonomis.

**Manfaat:**  
- Mengurangi rasa pegal pada bahu  
- Membantu memperbaiki postur tubuh  
- Mencegah ketegangan otot bahu  

### 5.3 Peregangan Punggung
**Pengertian:**  
Peregangan punggung adalah aktivitas untuk meregangkan otot punggung yang bekerja terus-menerus saat duduk lama.

**Manfaat:**  
- Mengurangi nyeri punggung  
- Meningkatkan fleksibilitas tulang belakang  
- Mencegah gangguan muskuloskeletal  

### 5.4 Peregangan Kaki
**Pengertian:**  
Peregangan kaki adalah gerakan peregangan otot-otot kaki untuk mengurangi kekakuan akibat posisi duduk statis.

**Manfaat:**  
- Melancarkan sirkulasi darah pada kaki  
- Mengurangi rasa pegal dan kesemutan  
- Membantu menjaga kebugaran otot kaki  

### Waktu yang Dianjurkan
Peregangan disarankan dilakukan setiap 20–30 menit saat belajar atau setelah perkuliahan untuk mencegah kelelahan berkepanjangan.

Peregangan yang dilakukan secara rutin dapat membantu mahasiswa tetap sehat, nyaman, dan produktif selama menjalani aktivitas akademik.

### Penutup
Ergonomi bukan hanya penting di dunia kerja, tetapi juga sangat relevan bagi mahasiswa. Dengan memahami dan menerapkan prinsip ergonomi sejak masa kuliah, mahasiswa dapat menjaga kesehatan, meningkatkan kenyamanan belajar, serta mempersiapkan diri menjadi lulusan yang produktif dan profesional di masa depan.
`,
  },
  {
    id: 'ergo-1',
    title: 'Keluhan & Pencegahan Ergonomi di Lingkungan Kampus',
    subtitle: 'Konsep dan penerapan ergonomi untuk kenyamanan kerja',
    cover: {
      src: '/icons/favicon-128x128.png',
      overlay: 'dark',
    },
    contentMd: `# Keluhan & Pencegahan Ergonomi di Lingkungan Kampus

## 1. Keluhan Muskuloskeletal (MSDs)
Keluhan paling dominan akibat postur dan desain fasilitas yang tidak ergonomis.

**Keluhan yang sering muncul:**
- Nyeri leher dan bahu
- Nyeri punggung atas dan bawah
- Sakit pinggang (low back pain)
- Pegal pada lengan, pergelangan tangan, dan jari
- Nyeri lutut akibat posisi duduk lama

**Penyebab umum di kampus:**
- Kursi dan meja tidak sesuai antropometri pengguna
- Duduk statis lama saat kuliah / mengerjakan tugas
- Posisi laptop terlalu rendah atau terlalu tinggi
- Meja praktikum tidak sesuai tinggi badan

## 2. Kelelahan Fisik dan Mental
Ergonomi tidak hanya fisik, tetapi juga kognitif.

**Keluhan yang sering muncul:**
- Mudah lelah meski aktivitas ringan
- Sulit fokus saat perkuliahan
- Penurunan konsentrasi dan daya ingat
- Sakit kepala tegang (tension headache)

**Penyebab:**
- Postur kerja yang salah dalam waktu lama
- Beban visual tinggi (menatap layar terlalu lama)
- Pencahayaan ruang kelas yang tidak optimal

## 3. Keluhan Mata (Visual Fatigue)
Sangat umum di era pembelajaran digital.

**Gejala:**
- Mata kering dan perih
- Pandangan kabur sementara
- Mata terasa berat
- Sakit kepala setelah menatap layar

**Faktor pemicu:**
- Penggunaan laptop/gadget berjam-jam
- Jarak pandang layar tidak sesuai
- Pencahayaan berlebih atau kurang

## 4. Gangguan Postur dan Kebiasaan Gerak
Terjadi akibat adaptasi jangka panjang terhadap lingkungan yang tidak ergonomis.

**Dampak yang sering terjadi:**
- Postur membungkuk (forward head posture)
- Bahu tidak simetris
- Kebiasaan duduk menyilang atau miring
- Risiko kelainan tulang belakang bila kronis

## 5. Keluhan Akibat Stasiun Kerja Tidak Ergonomis
Dialami dosen dan tenaga kependidikan.

**Keluhan yang sering muncul:**
- Nyeri pergelangan tangan (risiko carpal tunnel syndrome)
- Nyeri bahu akibat posisi mouse/keyboard
- Kaku leher setelah bekerja di depan komputer

## 6. Dampak Psikososial
Ergonomi buruk juga memengaruhi kenyamanan dan motivasi belajar/kerja.

**Dampak yang dirasakan:**
- Mudah stres
- Ketidaknyamanan selama kuliah
- Penurunan motivasi belajar
- Iritabilitas dan kelelahan emosional

## 7. Keluhan Spesifik di Lingkungan Kampus
Beberapa contoh khas:
- Nyeri punggung saat kuliah di ruang besar dengan kursi lipat
- Pegal saat praktikum berdiri lama
- Kelelahan saat membawa tas ransel terlalu berat
- Nyeri leher akibat sering melihat smartphone saat menunggu kelas

## Kesimpulan Singkat
Ergonomi yang tidak baik di kampus dapat menyebabkan gangguan fisik, mental, dan psikososial, serta berdampak pada kinerja akademik, produktivitas, dan kualitas hidup sivitas akademika.
`,
  },
  {
    id: 'stretch-1',
    title: 'Pencegahan Keluhan Ergonomi di Kampus',
    subtitle: 'Strategi pencegahan untuk mengurangi risiko keluhan muskuloskeletal',
    cover: {
      src: '/icons/favicon-128x128.png',
      overlay: 'dark',
    },
    contentMd: `# Pencegahan Keluhan Ergonomi di Kampus

## 1. Pencegahan pada Desain Fasilitas Kampus

### Perbaikan sarana belajar
- Gunakan kursi dan meja sesuai antropometri pengguna
- Kursi memiliki sandaran punggung dan dukungan lumbar
- Tinggi meja ± setinggi siku saat duduk
- Sediakan footrest bila kursi terlalu tinggi

### Ruang kelas & laboratorium
- Meja praktikum disesuaikan dengan jenis aktivitas (duduk/berdiri)
- Sediakan alas berdiri anti-lelah (anti-fatigue mat) di laboratorium

## 2. Pencegahan Melalui Postur dan Cara Kerja

### Edukasi postur duduk ergonomis
- Punggung tegak, bahu rileks
- Kaki menapak lantai
- Layar sejajar dengan tinggi mata
- Jarak mata–layar ± 50–70 cm

### Variasi posisi kerja
- Hindari duduk statis > 30–60 menit
- Kombinasikan duduk–berdiri–bergerak

## 3. Manajemen Waktu dan Istirahat

### Microbreak ergonomis
- Istirahat 3–5 menit setiap 30–60 menit
- Lakukan peregangan leher, bahu, punggung, pergelangan tangan

### Aturan 20–20–20 untuk mata
- Setiap 20 menit, lihat objek sejauh 20 kaki selama 20 detik

## 4. Pencegahan Keluhan Akibat Gadget & Laptop

### Penggunaan laptop
- Gunakan laptop stand atau buku sebagai penyangga
- Gunakan keyboard & mouse eksternal bila memungkinkan

### Smartphone
- Angkat layar ke arah mata, bukan menundukkan leher
- Batasi penggunaan berkelanjutan

## 5. Pengendalian Beban Fisik

### Tas dan perlengkapan kuliah
- Beban tas ≤ 10–15% berat badan
- Gunakan ransel dua tali dan atur posisi tali simetris

### Aktivitas praktikum
- Rotasi tugas berdiri dan duduk
- Gunakan alas kaki yang mendukung
`,
  },
];

export function getMateriById(id: string): Materi | undefined {
  return materiList.find((m) => m.id === id);
}
