import classNames from 'classnames/bind';

import styles from './HomePage.module.scss';
import MainLayout from '@/components/common/Layout/Main';
import BannerCarousel from '@/components/common/Carousel/Banner';

import banner1 from '@/assets/images/test-carousel1.jpg';
import banner2 from '@/assets/images/test-carousel2.jpg';
import banner3 from '@/assets/images/test-carousel3.jpg';
import banner4 from '@/assets/images/test-carousel4.jpg';
import banner5 from '@/assets/images/test-carousel5.jpg';

const BANNER_IMAGES = [
  { src: banner1.src, alt: '배너1' },
  { src: banner2.src, alt: '배너2' },
  { src: banner3.src, alt: '배너3' },
  { src: banner4.src, alt: '배너4' },
  { src: banner5.src, alt: '배너5' },
];

export default function HomePage() {
  return (
    <div className={styles.container}>
      <BannerCarousel items={BANNER_IMAGES} />
      <div className={styles.test}>
        <p>
          Ad occaecat officia dolor nulla labore. Eu qui in elit exercitation in nostrud non. Sint sit consequat aliquip
          aliqua. Sint laborum non aliquip adipisicing nisi deserunt pariatur reprehenderit esse elit eu non commodo
          dolor. Dolore enim ad voluptate eiusmod magna Lorem qui amet sunt anim. Sunt anim incididunt qui ut tempor
          labore irure consectetur magna eiusmod. Lorem sunt cupidatat sint est Lorem deserunt laborum eu voluptate
          pariatur. Pariatur nisi anim commodo ad cupidatat commodo nisi tempor mollit magna magna aliquip sint. Culpa
          cillum et id ex. Eiusmod consectetur velit sunt ut laboris ex consectetur quis in nisi incididunt elit
          occaecat aliquip. Laborum ullamco aliquip est irure enim sit eiusmod aliquip veniam duis enim ex nisi
          proident. Cupidatat esse eiusmod sint ullamco tempor sunt ea ea anim ad duis exercitation veniam. Tempor dolor
          Lorem irure enim sunt ad adipisicing pariatur nisi quis nisi tempor ex. Nostrud non magna in deserunt
          incididunt sint et elit exercitation. Ad aliquip reprehenderit consequat nisi consectetur esse. Enim et ad sit
          non sunt ad sunt sunt. Exercitation pariatur quis exercitation aute sunt est eu anim. Commodo est tempor magna
          sint cupidatat culpa enim enim deserunt. Culpa qui ea exercitation veniam ex nostrud fugiat est consectetur
          laboris. Dolore sit sunt ut laborum pariatur quis elit aute sunt officia. Veniam et eiusmod tempor non. Sint
          consectetur ullamco qui excepteur incididunt amet sit. Dolore eu occaecat et deserunt voluptate veniam
          proident nulla consectetur minim. Minim velit consectetur mollit esse velit sit eu quis in consectetur. Ad
          consectetur cillum occaecat cillum irure occaecat. Labore velit quis eu sunt irure sint do laborum nisi est
          nulla laboris. Consectetur nostrud sit Lorem ut pariatur adipisicing aliquip culpa. Voluptate exercitation non
          eiusmod aute veniam occaecat mollit nostrud consequat duis excepteur. Aute mollit commodo consectetur sit sunt
          Lorem deserunt. Aliqua qui mollit culpa dolore. Amet ad proident eiusmod officia eiusmod. Lorem ad quis
          officia officia ullamco do quis ea nostrud consequat nulla adipisicing sint dolor. Sunt in labore laboris ex
          commodo ad qui officia ea sint. Tempor duis Lorem excepteur tempor mollit proident est elit. Voluptate
          excepteur ex non non magna. Mollit nulla dolor magna exercitation sunt incididunt officia. Aliquip quis
          ullamco ad nisi qui labore irure cupidatat incididunt irure nisi esse amet do. Labore cupidatat anim tempor
          sint anim sit aute dolore ex qui dolore et. Dolore magna proident nostrud veniam ipsum sit sint ex. Dolore
          laboris exercitation officia exercitation mollit deserunt commodo consectetur nostrud sunt Lorem voluptate
          irure. Aliqua non nostrud aliquip incididunt cupidatat magna ullamco officia. Eu eu consectetur mollit esse.
          Nulla velit ad in ad minim nostrud laboris excepteur incididunt quis. Est mollit mollit consectetur proident
          culpa labore velit. Laborum reprehenderit elit aute sit Lorem. Adipisicing deserunt tempor quis exercitation
          do. Esse do nostrud sit elit incididunt Lorem ipsum do anim veniam anim ea. Laborum eiusmod occaecat
          exercitation Lorem aliqua et exercitation. Irure eiusmod elit aliqua Lorem laborum adipisicing do consectetur
          ex adipisicing nisi aliqua. Ad consectetur proident eu ea aute culpa nostrud non nisi anim duis cillum
          proident quis. Do esse anim ullamco fugiat occaecat. Ipsum sint aute consectetur cupidatat mollit. Voluptate
          sunt adipisicing incididunt enim Lorem qui esse ullamco ullamco officia. Qui et officia esse aute aliqua. Ad
          culpa deserunt minim enim consectetur aliqua aute nisi eiusmod.
        </p>
        <div className={styles.divider} />
        <p>
          Eiusmod cillum irure excepteur fugiat eiusmod officia in eu. Irure magna incididunt id do consequat
          consectetur anim qui ullamco enim elit. Amet pariatur nulla est Lorem. Anim non qui magna ea do laborum
          aliquip adipisicing. Fugiat labore fugiat nulla velit ut in quis consectetur aliqua fugiat ut enim voluptate.
          Consequat do enim velit id ipsum. Amet occaecat deserunt fugiat cillum proident veniam cupidatat et laboris.
          Non occaecat aliqua commodo exercitation ut laborum nisi eiusmod deserunt. Reprehenderit ipsum mollit cillum
          pariatur qui aute. Velit reprehenderit voluptate do aliqua officia non veniam voluptate laborum laborum
          consequat reprehenderit nulla. Aute minim veniam et proident occaecat sint deserunt proident exercitation do
          occaecat consectetur. Tempor culpa et mollit velit laborum incididunt voluptate ex consectetur laboris. Aliqua
          in deserunt laborum Lorem ea nostrud aute et sunt ad in cillum. Nulla dolor aliqua laborum magna excepteur
          esse labore Lorem esse. Elit proident sunt laborum adipisicing mollit esse excepteur. Fugiat incididunt eu
          adipisicing mollit cillum sint dolore ex irure consectetur nostrud ad. Et Lorem voluptate laborum mollit
          fugiat. Cupidatat cupidatat labore proident nostrud nisi consectetur commodo. Dolore non do Lorem dolore id
          sint amet est ad consequat labore consequat sunt. Reprehenderit aliquip est exercitation dolore eu occaecat
          irure. Nisi duis reprehenderit laboris consectetur elit anim tempor eu cupidatat quis ipsum. Consequat aute
          irure consectetur ad eiusmod culpa labore reprehenderit laborum officia anim voluptate nisi. Id consequat
          adipisicing nisi quis esse sint sint. Cupidatat minim aliquip cupidatat commodo consectetur est irure ea
          voluptate reprehenderit aute duis. Excepteur adipisicing labore ullamco dolor consequat ex do ea dolore culpa.
          Fugiat labore exercitation aliquip officia cillum tempor dolore dolor voluptate anim. Occaecat aliquip
          pariatur consectetur sint elit et mollit. Non ea aliquip officia quis est veniam non occaecat laborum. Culpa
          Lorem velit minim exercitation minim mollit labore in ad cupidatat ut ut aliqua. Nostrud deserunt irure
          exercitation excepteur magna do minim culpa. Eiusmod consectetur ut commodo nisi ipsum consectetur ad elit
          sit. Irure nostrud ex in sint. Sit adipisicing fugiat anim nulla sunt fugiat ex laborum excepteur amet qui ea
          sit eiusmod. Duis occaecat amet voluptate reprehenderit nostrud eu aliqua. Cupidatat quis laboris quis aute
          irure voluptate pariatur reprehenderit ullamco commodo sit aliqua duis. Amet est ut culpa sit sunt aliquip.
          Esse tempor nostrud cillum culpa Lorem non esse adipisicing. In deserunt irure ut est ut veniam deserunt
          nostrud velit eu culpa aliquip ut. Consectetur pariatur qui veniam do adipisicing. Minim id et excepteur
          aliquip irure ullamco magna enim ad excepteur Lorem consequat. Consequat voluptate amet id culpa exercitation.
          Minim non non consequat anim et sint est qui commodo sunt deserunt proident duis. Pariatur culpa mollit culpa
          sint ea reprehenderit dolor veniam ea. Do eiusmod sint incididunt proident eiusmod labore veniam ipsum. Et
          nisi sit mollit et. Adipisicing adipisicing pariatur anim occaecat incididunt occaecat elit consequat.
          Incididunt esse minim nulla dolore cillum consequat consequat veniam incididunt magna adipisicing eiusmod in.
          Qui consequat aute veniam enim esse. Elit veniam consectetur voluptate cillum pariatur nostrud est ut ut velit
          esse qui labore. Lorem est non tempor duis laborum sit sit velit. Quis sunt ex eiusmod nostrud sint magna
          aliqua fugiat eiusmod culpa ipsum ea ullamco. Consequat fugiat veniam consectetur excepteur reprehenderit
          mollit. Veniam aliquip excepteur labore laboris in voluptate tempor pariatur consequat. Magna non qui deserunt
          est occaecat amet laborum ipsum. Elit reprehenderit adipisicing reprehenderit non id esse enim anim. Amet esse
          ea aliquip nulla voluptate commodo excepteur excepteur. Velit aliqua ad ullamco ad fugiat magna ullamco quis
          magna pariatur nostrud. Aliquip mollit duis laboris amet culpa in eiusmod est duis consectetur amet. Est esse
          proident proident elit ex sit ipsum. Ex nisi dolore occaecat sit aute. Labore enim minim irure minim labore
          et.
        </p>
      </div>
    </div>
  );
}

HomePage.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
