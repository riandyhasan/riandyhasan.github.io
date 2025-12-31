import React, { useState, useEffect } from "react";
import { makeStyles, Typography, Container, Grid, Link } from "@material-ui/core";
import { ReactComponent as Strip } from "../assets/svg/Strip.svg";
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ProjectCard from "../components/ProjectCard";
import ArticleCard from "../components/ArticleCard";
import image1 from "../assets/image/projects/1.png";
import image2 from "../assets/image/projects/2.png";
import image3 from "../assets/image/projects/3.png";
import image4 from "../assets/image/projects/4.png";

const useStyles = makeStyles(() => {
  return {
    root: {
      display: "flex",
      flexDirection: "column",
      color: "white",
    },
    title: {
      display: "flex",
      alignItems: "center",
      gap: "1.5rem",
      justifyContent: "center",
      marginBottom: "3rem",
    },
  };
});

export default function Project() {
  const theme = useTheme();
  const isResp = useMediaQuery(theme.breakpoints.down('md'));
  const [mediumData, setMediumData] = useState("");
  const [isProject, setIsProject] = useState(true);
  const matches = useMediaQuery('(max-width:473px)');

  const classes = useStyles();
  const projectCard = [
    {
      name: "Skill Up",
      imageUrl: image1,
      url: "https://skill-up.id/",
    },
    {
      name: "Glampy",
      imageUrl: image2,
      url: "https://glampy.vercel.app",
    },
    {
      name: "Konsulin",
      imageUrl: image3,
      url: "https://powerful-peak-20198.herokuapp.com/final.html",
    },
    {
      name: "Porto Web",
      imageUrl: image4,
      url: "https://riandyhasan.github.io/",
    },
  ];
  const tempData = [
    {
      title: "Impulsivitas",
      link: "https://tenggelamdalamkata.medium.com/impulsivitas-fe64ba97af10?source=rss-11c0cae3437------2",
      content:
        "Pernah tidak kalian tiba-tiba terbangun pada pagi hari dengan motivasi penuh semangat untuk melakukan berbagai hal. Semua kemalasan yang sebelumnya menghalangi seakan sirna, energi kalian seakan terisi penuh.\nAneh memang. Rencana yang sebelum-sebelumnya terbengkalai karena kemalasanku terselesaikan seketika. Pikiran yang sempat buntu tak mau bekerja dialiri oleh ide-ide yang entah dari mana datangnya.\nKadang diriku iri melihat orang bisa mengerjakan sesuatu secara terstruktur tapi aku tau inilah diriku, yang suka bekerja secara impulsif, mungkin jika aku paksakan sesuatu yang bukan merupakan diriku hasilnya tidak akan maksimal.\nNamun, aku menyadari juga bahwa tak selamanya sistem ini akan berjalan dengan baik. Ada saatnya aku harus keluar dari zona nyaman untuk mengerjakan sesuatu secara terstruktur. Aku tau bakalan banyak rintangan kemalasan yang aku hadapi. Semua butuh proses.\n10 Agustus 2021 | Dimotivasi oleh Challenge SPARTA",
    },
    {
      title: "Menjadi Dewasa",
      link: "https://tenggelamdalamkata.medium.com/menjadi-dewasa-7eb6fe01f015?source=rss-11c0cae3437------2",
      content:
        "Kadang saat ditanya “Jika bisa ke masa lalu untuk merasakan kembali, mau kembali ke mana?”. Satu jawaban yang terlintas di kepalaku, aku ingin merasakan kembali memori-memoriku sewaktu SD.\nMasa dimana yang terpikirkan olehku hanyalah bermain, tertawa dan berbahagia. Entah yang kulakukan bermain bersama teman atau menghibur diri dengan bermain game online di warnet.\nAku berpikir betapa nyaman dan tenangnya masa itu. Tanpa banyak beban pikiran dan kecemasan akan masa depan.\nDulu saat apa yang aku inginkan tidak aku dapatkan aku hanya merengek untuk dikabulkan, sekarang aku telah belajar untuk mengikhlaskan dan tidak semua hal berjalan sesuai keinginan kita.\nDulu aku hanya memikirkan kesenangan aku sendiri dan melakukan apapun yang aku sukai, sekarang aku belajar bahwa adanya hak dan kewajiban yang dimiliki setiap orang.\nRasanya baru kemaren aku bermain-main sepulang sekolah bersama teman SD-ku. Kini tak terasa 5 bulan lagi usiaku menginjak kepala dua. Waktu berlalu begitu cepat, proses pendewasaan pun mengiringi.\nMungkin kecemasan dan kekhawatiran yang aku rasakan sekarang adalah gerbang pembuka ke fase berikutnya dalam kehidupan. Fase yang bisa saja aku merasakan banyak kepahitan disana. Tapi apapun itu aku siap menghadapinya…. Menjadi Dewasa\n10 Agustus 2021 | Dimotivasi oleh Challenge SPARTA",
    },
    {
      title: "Seribu Sungai, Sepuluh Ribu Sampah",
      link: "https://tenggelamdalamkata.medium.com/seribu-sungai-sepuluh-ribu-sampah-352988108419?source=rss-11c0cae3437------2",
      content:
        "Sungai Martapura, Banjarmasin, Kalimantan Selatan (source: redkal.com)\nBanjarmasin sering dikenal dengan ‘Kota Seribu Sungai’, hal ini wajar mengingat hampir di setiap sudut kota Banjarmasin kita pasti akan menemui sungai disana. Tercatat bahwa ada 102 sungai dengan tiga sungai besar yaitu Sungai Barito, Sungai Martapura, dan Sungai Kuin.\nSungai di Banjarmasin sudah menjadi bagian dari hidup masyarakatnya. Banyak aktivitas masyarakat Banjarmasin yang melibatkan sungai di antaranya adalah mobilisasi, mandi cuci kakus, jual beli hingga irigasi. Tentu hal tersebut menyebabkan sungai berperan penting untuk masyarakat Banjarmasin untuk berbagai keperluan. Sungai telah memberikan banyak manfaat kepada masyarakat, tetapi apakah masyarakat telah memberikan perlakuan yang sepadan kepada sungai?\nAnalisi Permasalahan\nPertumbuhan ekonomi di suatu kota menyebabkan timbulnya urbanisasi yang dapat menimbulkan permasalahan pada sektor perumahan dan pemukiman. Kebutuhan akan perumahan dan pemukiman yang kian bertambah seiring pertambahan penduduk kota yang cepat menyebabkan lahan yang tersedia makin sedikit. Sungai di Banjarmasin yang dulu rata-rata lebarnya lebih dari 6 meter sekarang hanya tinggal 2–3 meter, hal tersebut disebabkan karena pemukiman yang didirikan menjorok ke tengah sungai. Selain masalah sungai yang makin menyempit, masalah sampah juga merupakan salah satu masalah terbesar sungai di Banjarmasin. Perilaku oknum yang terbiasa membuat sampah ke sungai menyebabkan sungai makin kotor. Dengan sungai yang makin sempit tentu sampah yang dibuang ke sungai tidak hanya mengotori, tetapi juga makin mempersempit sungai.\nPerilaku membuang sampah ini disebabkan oleh berbagai faktor. Dari aspek fisik lingkungan bisa disebabkan karena faktor sarana dan prasana yang belum menyediakan TPS untuk warga sekitar. Dari aspek sosial bisa kita lihat bahwa perilaku ini disebabkan karena kontrol dan sanksi sosial yang belum kuat hingga belum adanya individu atau kelompok yang menginisiasi gerakan pengelolaan sampah pada daerah tersebut. Pada aspek tradisi perilaku membuang sampah di sungai disebabkan adanya anggapan bahwa air pasang surut sungai akan membersihkan sampah mereka.\nSungai Martapura, Banjarmasin, Kalimantan Selatan (source: kalsel.antaranews.com)\nPeraturan mengenai membuang sampah di sungai telah diatur dalam Peraturan Daerah Kota Banjarmasin Nomor 2 Tahun 2007 Tentang Pengelolaan Sungai pada Bab II ayat 4 yang berbunyi:\n“Dilarang membuang benda-benda dan/atau bahan-bahan padat dan/ atau cair dan / atau sampah dan /atau yang berupa limbah ke dalam maupun di sekitar sungai yang diperkirakan atau patut diduga akan menimbulkan pencemaran atau menurunkan kualitas air, sehingga membahayakan dan atau merugikan pengguna air dan lingkungan.”\nNamun, untuk sosialisasi dan penegakannya belum maksimal sehingga praktik membuang sampah ke sungai di Banjarmasin masih marak terjadi.\nSolusi yang dibawakan\nPermasalahan sampah merupakan masalah struktural yang tentu saja dengan satu cuman satu pihak bisa selesaikan. Apabila tidak ada kesadaran antara pemerintah dan masyarakat bisa dijamin bahwa permasalahannya akan semakin memburuk bahkan mungkin nanti Banjarmasin akan dikenal dengan sebutan “Sepuluh Ribu Sampah”. Masalah ini perlu diselesaikan bersama-sama baik dari pemerintah maupun masyarakat. Oleh karena itu, diperlukan solusi dan usaha dari berbagai pihak agar masalah ini dapat terselesaikan.\nSosialisasi dan Penegasan Penegakan Aturan\nSebagian besar masyarakat sebenarnya secara umum harusnya tahu bahwa membuang sampah ke sungai merupakan hal yang salah. Namun, tidak bisa dipungkiri diperlukan suatu peraturan agar masyarakat tidak melakukan hal tersebut. Berdasarkan yang telah disebutkan sebelumnya telah ada yang peraturan mengenai hal tersebut, tetapi apakah semua masyarakat tahu mengenai peraturan tersebut? Pemerintah dapat melakukan usaha lebih untuk mengedukasi masyarakat dengan melakukan sosialisasi agar peraturan tersebut dapat diketahui secara luas oleh masyarakat. Selain itu, penegakan sanksi yang tegas diperlukan agar meminimalisir masyarakat yang melanggar peraturan tersebut. Biasanya untuk membentuk suatu kesadaran diperlukan paksaan untuk membiasakan kesadaran tersebut. Baik mengenai peraturan bahkan sanksi yang akan dijatuhi harus disosiliasikan kepada masyarakat secara menyeluruh karena hal tersebut akan menjadi sia-sia jika pada akhirnya masyarakat tidak mengetahui hal tersebut.\nInisiatif Pergerakan\nTentu pemerintah tidak akan sanggup jika masalah ini hanya diusahakan oleh pemerintah saja. Masyarakat juga harus mengusahakan pergerakan agar masalah ini dapat teratasi baik itu melakukan edukasi atau bahkan turun langsung ke lapangan untuk membantu membersihkan sungai-sungai. Pergerakan-pergerakan seperti ini membantu mewadahi masyarakat yang memiliki keinginan untuk berkontribusi untuk kotanya agar dapat membantu menyelesaikan permasalahan sampah yang ada. Selain itu, sungai pada masyarakat Banjarmasin telah memberi banyak manfaat jadi seharusnya masyarakat juga harus menjaga dengan baik kebersihan sungai agar manfaatnya dapat dinikmati oleh anak cucu mereka. Mungkin sudah ada beberapa gerakan-gerakan untuk menjaga sungai seperti bersih, diharapakan gerakan-gerakan ini makin bertumbuh agar permasalahan ini dapat teratasi secara cepat. Mahasiswa yang mempunyai peran sebagai katalisator pada masyarakat diharapkan untuk memulai gerakan-gerakan ini.\nKesadaran Individu\nTak bisa dipungkiri untuk menumbuhkan kesadaran dalam diri sendiri merupakan hal yang sulit. Namun, hal tersebut bukan merupakan alasan bagi kita untuk abai dalam menaati peraturan dan menjaga alam. Mungkin untuk mengatasi permasalahan sampah di sungai kita coba melakukan refleksi diri terlebih dahulu, apakah kita telah benar-benar menaati peraturan dan tidak membuang sampah di sungai selama ini? Penulis di sini ingin menyampaikan bahwa kita tidak perlu melakukan sesuatu yang besar untuk mengatasi masalah ini. Dimulai dari kesadaran diri kita terlebih dahulu untuk mulai membantu mengatasi permasalahan ini, dari hal yang sangat sederhana seperti kesadaran membuang sampah pada tempatnya sudah sangat membantu untuk menyelesaikan masalah seperti ini. Kadang kita terlalu fokus untuk mencari akar permasalahannya tanpa kita tahu bahwa kita salah satu akar permasalahan itu.\nMungkin hal-hal yang penulis sebutkan di atas merupakan hanya sebagian dari banyak solusi yang ada. Namun, melalui tulisan ini penulis ingin masyarakat Banjarmasin lebih sadar akan hal ini. Permasalahan sampah di sungai merupakan masalah bersama.\nMasalah sampah di sungai tidak bisa diselesaikan oleh satu orang saja. Masalah ini perlu diselesaikan bersama-sama baik dari pemerintah maupun masyarakat. Sungai telah memberikan banyak kepada kita, tetapi apa yang telah kita berikan kepada sungai?\nReferensi\nAgoes, H. F. (2011). Studi Inventarisasi Sungai Yang Tidak Produktif Di Kota Banjarmasin. Jurnal INTEKNA, 157–165.\nFitriansyah, M., Asmadi, A., & Sari, A. P. K. (2018). PERMASALAHAN LINGKUNGAN SUNGAI PEGAMBANGAN KOTA BANJARMASIN. Media Teknik Sipil, 16(2), 115–118.\nPutra, T. P., Adyatma, S., & Normlenai, E. (2016). Analisis perilaku masyarakat bantaran sungai martapura dalam aktivitas membuang sampah rumah tangga di kelurahan Basirih kecamatan Banjarmasin Barat. JPG (Jurnal Pendidikan Geografi), 3(6).\nRidha, H., Prihatini, N. S., & Firmansyah, M. (2018). POLA PENGELOLAAN SAMPAH RUMAH TANGGA DI SEPANJANG ALIRAN SUNGAI PEKAPURAN–BANJARMASIN. JERNIH, 1(2), 67–80.\nRiswan, M. PERILAKU MASYARAKAT DALAM MEMBUANG SAMPAH DOMESTIK KE SUNGAI KUIN KELURAHAN KUIN SELATAN KOTA BANJARMASIN. Jurnal Socius, 7(1).\nRiandy Hasan\n16520117\nSistem dan Teknologi Informasi\nKelompok 14",
    },
    {
      title: "Privasi Data? Haruskah Kita Peduli?",
      link: "https://tenggelamdalamkata.medium.com/privasi-data-haruskah-kita-peduli-9a0c528f358a?source=rss-11c0cae3437------2",
      content:
        "Privasi data, mungkin hal tersebut terdengar sepele bagi kita. Di internet, kita sering mengabaikan tentang privasi kita. Bahkan secara tidak sadar kita sering memberikan data kita ke orang yang baru kita temui di internet. Apakah hal tersebut wajar? Apakah hal tersebut tidak berdampak apa-apa?.\nApa itu privasi data?\nPrivasi secara umum dapat didefinisikan dengan berbagai arti. Menurut KBBI privasi adalah kebebasan, keleluasaan pribadi. Menurut Cambridge Dictionary, privacy salah satunya diartikan sebagai hak yang dipunyai seseorang untuk menjaga kehidupan personal atau rahasia informasi personal agar hanya untuk diketahui sekelompok kecil saja. Privasi data berhubungan antara pengumpulan dan penyebaran data, teknologi, ekspektasi publik terhadap privasi, dan masalah hukum dan politik yang mengelilinginya. Adapun mengenai data pribadi, pengertiannya dapat ditemukan dalam Undang-Undang Nomor 23 Tahun 2006 tentang Administrasi Kependudukan (“UU Adminduk”) sebagaimana yang telah diubah dengan Undang-Undang Nomor 24 Tahun 2013 tentang Perubahan Atas Undang-Undang Nomor 23 Tahun 2006 tentang Administrasi Kependudukan (“UU 24/2013”). Pasal 1 angka 22 UU 24/2013 berbunyi:\n“Data Pribadi adalah data perseorangan tertentu yang disimpan, dirawat, dan dijaga kebenaran serta dilindungi kerahasiaannya”\nSecara konstitusional, negara melindungi privasi dan data penduduk masyarakat. Pasal 28G ayat (1) Undang-Undang Dasar Negara Republik Indonesia Tahun 1945 (“UUD 1945”) berbunyi:\n“Setiap orang berhak atas perlindungan diri pribadi, keluarga, kehormatan, martabat, dan harta benda yang di bawah kekuasaannya, serta berhak atas rasa aman dan perlindungan dari ancaman ketakutan untuk berbuat atau tidak berbuat sesuatu yang merupakan hak asasi.”’\nContoh dari data pribadi itu sendiri seperti:\n\nnama dan nama belakang;\nalamat rumah;\nalamat email;\nnomor kartu identitas;\ndata lokasi (misalnya fungsi data lokasi pada ponsel) ;\nalamat Internet Protocol (IP);\nID cookie ;\ndata yang dimiliki oleh rumah sakit atau dokter; dan\nyang bisa menjadi simbol yang mengidentifikasi seseorang secara unik (sidik jari, tanda tangan).\n\nMengapa privasi data penting?\nDengan kemajuan teknologi dan sekarang semuanya yang serba digital membuat informasi mudah tersebar. Data pribadi yang dengan mudah kita input bisa saja disalahgunakan oleh orang lain. Penyalahgunaan tersebut bisa dalam berbagai macam bentuk, salah satunya orang lain menyalahgunakan identitas anda. Dengan berbekal beberapa data pribadi anda, orang lain bisa menggunakan identitas anda untuk melakukan hal-hal buruk seperti melakukan penipuan lewat sosial media. Anda yang tidak tahu bahwa data anda disalahgunakan tentu saja akan kebingungan jika tiba-tiba ada orang melaporkan anda karena dituduh melakukan penipuan.\nPenyalahgunaan data pribadi tidak hanya dilakukan oleh orang yang tidak kita kenal, bahkan orang terdekat anda bisa atau bahkan telah melakukannya. Misalnya teman atau kenalan anda melakukan pinjaman online, kadang pemberi pinjaman meminta data pribadi orang yang dikenalnya berupa nomor handphone. Pemberi pinjaman memiliki modus memanfaatkan data pribadi untuk menagih hutang ke kolega dan temannya. Tentu saja jika teman atau kenalan anda yang melakukan pinjaman online tadi jika tidak bisa dihubungi oleh pihak pemberi pinjaman, mereka akan menghubungi bahkan meneror anda. Hal ini mengakibatkan kita menjadi terganggu.\nSelain itu keterampilan dan peluang untuk mengambil atau menambang berbagai jenis data pribadi juga berkembang sangat cepat bahkan beberapa perusahaan dan lembaga pemerintah sempat kecolongan. Data warga negara Indonesia yang berasal dari Daftar Pemilih Tetap Pemilu 2014 bocor di internet. Sekitar 2,3 juta data invididu yang berisi nama, tempat dan tanggal lahir, NIK sampai alamat yang merupakan data DPT dari Provinsi Daerah Istimewa Yogyakarta (DIY) itu disebar di suatu forum.\nSebelumnya juga Tokopedia diretas dan peretas tersebut menjual 91 juta data penggunanya di dark web seharga USD 5000. Peretas yang mengatas namakan ShinyHunters ini sebelumnya sudah melepas 5000 data pengguna Tokopedia secara cuma-cuma.\nTentu sangat berbahaya jika data kita disalahgunakan. Maka dari itu kita sebagai individu yang sadar akan betapa pentingnya privasi data harus dapat memutuskan apakah ingin membagikan beberapa informasi atau tidak. Dengan hal itu kita dapat mencegah data pribadi tersebar dengan mudah. STEI PRIVATE EVERYONE !\nRiandy Hasan\n#AksiTPB20 #STEI20 #STEIPRIVATE #NoDataIsSafe",
    },
  ];
  const [isHoverContent, setIsHoverContent] = useState(false);

  return (
    <Container>
      <div className={classes.root}>
        {isProject ? (
          <div>
            <div className={classes.title}>
              <Typography variant="h1" align="center" style={{ cursor: "pointer" }} onMouseEnter={() => setIsHoverContent(true)} onMouseLeave={() => setIsHoverContent(false)} onClick={() => setIsProject(false)}>
                {isHoverContent ? "Article" : "Project"}
              </Typography>
              <Strip style={{ cursor: "pointer" }} />
            </div>
            <Grid 
            container 
            spacing={10}
            direction={isResp?"column":"row"}
            justifyContent="center"
            alignItems="center"
            >
              {projectCard.map((item) => (
                <Grid item xs={matches? 18 : 6}>
                  <Link href={item.url} target="_blank">
                    <ProjectCard name={item.name} imageUrl={item.imageUrl} />
                  </Link>
                </Grid>
              ))}
            </Grid>
          </div>
        ) : (
          <div>
            <div className={classes.title}>
              <Typography variant="h1" align="center" style={{ cursor: "pointer" }} onMouseEnter={() => setIsHoverContent(true)} onMouseLeave={() => setIsHoverContent(false)} onClick={() => setIsProject(true)}>
                {isHoverContent ? "Project" : "Article"}
              </Typography>
              <Strip style={{ cursor: "pointer" }} />
            </div>
            <Grid
            container 
            spacing={10}
            direction={isResp?"column":"row"}
            justifyContent="center"
            alignItems="center"
            >
              {tempData.map((item) => (
                <Grid item xs={matches? 18 : 6}>
                  <Link href={item.link} target="_blank">
                    <ArticleCard title={item.title} content={item.content} />
                  </Link>
                </Grid>
              ))}
            </Grid>
          </div>
        )}
      </div>
    </Container>
  );
}
