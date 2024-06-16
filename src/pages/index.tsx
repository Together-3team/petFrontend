import styles from './HomePage.module.scss';
import BannerCarousel from '@/components/common/Carousel/Banner';

import banner1 from '@/assets/images/test-carousel1.jpg';
import banner2 from '@/assets/images/test-carousel2.jpg';
import banner3 from '@/assets/images/test-carousel3.jpg';
import banner4 from '@/assets/images/test-carousel4.jpg';
import banner5 from '@/assets/images/test-carousel5.jpg';
import Header from '@/components/common/Layout/Header';
import NavTop from '@/components/common/Nav/Top';
import Input from '@/components/common/Input';
import NavBottom from '@/components/common/Nav/Bottom';
import BackButton from '@/components/common/Button/BackButton';
import SearchButton from '@/components/common/Button/Search';
import CartButton from '@/components/common/Button/Cart';
import useToast from '@/hooks/useToast';
import FloatingBox from '@/components/common/Layout/Footer/FloatingBox';
import useModal from '@/hooks/useModal';
import BottomSheet from '@/components/common/Modal/Base/BottomSheet';
import { useState } from 'react';
import BottomModal from '@/components/common/Modal/Base/BottomModal';
import CenterModal from '@/components/common/Modal/Base/CenterModal';

const BANNER_IMAGES = [
  { src: banner1.src, alt: '배너1' },
  { src: banner2.src, alt: '배너2' },
  { src: banner3.src, alt: '배너3' },
  { src: banner4.src, alt: '배너4' },
  { src: banner5.src, alt: '배너5' },
];

const BOTTOM_BOX_ID = 'bottomBox';
const BOTTOM_SHEET_ID = 'bottomSheet';
const BOTTOM_MODAL_ID = 'bottomModal';

export default function HomePage() {
  const { showToast, setPortalId } = useToast(BOTTOM_BOX_ID);
  const { modalOpen, handleModalOpen, handleModalClose } = useModal();
  const {
    modalOpen: bottomModalIsOpen,
    handleModalOpen: openBottomModal,
    handleModalClose: closeBottomModal,
  } = useModal();
  const {
    modalOpen: centerModalIsOpen,
    handleModalOpen: openCenterModal,
    handleModalClose: closeCenterModal,
  } = useModal();
  const [test, setTest] = useState(false);

  const showSuccess = () => {
    showToast({
      status: 'success',
      message: '성공',
    });
  };
  const showError = () => {
    showToast({
      status: 'error',
      message: '실패',
    });
  };
  const showWarn = () => {
    showToast({
      status: 'warn',
      message: '경고',
    });
  };
  const showLink = () => {
    showToast({
      status: 'success',
      message: '링크',
      linkMessage: '장바구니로 가기',
      linkProps: {
        href: '/cart',
      },
    });
  };

  return (
    <>
      <div className={styles.container}>
        <Header.Root className={styles.header}>
          <Header.Box>
            <Header.Left>
              <BackButton />
            </Header.Left>
            <Header.Center>
              <Input id="검색" placeholder="검색해 주세요" type="search" />
            </Header.Center>
            <Header.Right>
              <SearchButton />
              <CartButton />
            </Header.Right>
          </Header.Box>
          <NavTop />
          <button onClick={showSuccess}>성공</button>
          <button onClick={showError}>실패</button>
          <button onClick={showWarn}>경고</button>
          <button onClick={showLink}>링크</button>
          <button
            onClick={() => {
              setPortalId(BOTTOM_SHEET_ID);
              handleModalOpen();
            }}>
            바텀시트
          </button>
          <button
            onClick={() => {
              setPortalId(BOTTOM_MODAL_ID);
              openBottomModal();
            }}>
            바텀모달
          </button>
          <button
            onClick={() => {
              setPortalId();
              openCenterModal();
            }}>
            센터모달
          </button>
        </Header.Root>
        <BannerCarousel items={BANNER_IMAGES} />
        <div className={styles.test}>
          <p>
            Ad occaecat officia dolor nulla labore. Eu qui in elit exercitation in nostrud non. Sint sit consequat
            aliquip aliqua. Sint laborum non aliquip adipisicing nisi deserunt pariatur reprehenderit esse elit eu non
            commodo dolor. Dolore enim ad voluptate eiusmod magna Lorem qui amet sunt anim. Sunt anim incididunt qui ut
            tempor labore irure consectetur magna eiusmod. Lorem sunt cupidatat sint est Lorem deserunt laborum eu
            voluptate pariatur. Pariatur nisi anim commodo ad cupidatat commodo nisi tempor mollit magna magna aliquip
            sint. Culpa cillum et id ex. Eiusmod consectetur velit sunt ut laboris ex consectetur quis in nisi
            incididunt elit occaecat aliquip. Laborum ullamco aliquip est irure enim sit eiusmod aliquip veniam duis
            enim ex nisi proident. Cupidatat esse eiusmod sint ullamco tempor sunt ea ea anim ad duis exercitation
            veniam. Tempor dolor Lorem irure enim sunt ad adipisicing pariatur nisi quis nisi tempor ex. Nostrud non
            magna in deserunt incididunt sint et elit exercitation. Ad aliquip reprehenderit consequat nisi consectetur
            esse. Enim et ad sit non sunt ad sunt sunt. Exercitation pariatur quis exercitation aute sunt est eu anim.
            Commodo est tempor magna sint cupidatat culpa enim enim deserunt. Culpa qui ea exercitation veniam ex
            nostrud fugiat est consectetur laboris. Dolore sit sunt ut laborum pariatur quis elit aute sunt officia.
            Veniam et eiusmod tempor non. Sint consectetur ullamco qui excepteur incididunt amet sit. Dolore eu occaecat
            et deserunt voluptate veniam proident nulla consectetur minim. Minim velit consectetur mollit esse velit sit
            eu quis in consectetur. Ad consectetur cillum occaecat cillum irure occaecat. Labore velit quis eu sunt
            irure sint do laborum nisi est nulla laboris. Consectetur nostrud sit Lorem ut pariatur adipisicing aliquip
            culpa. Voluptate exercitation non eiusmod aute veniam occaecat mollit nostrud consequat duis excepteur. Aute
            mollit commodo consectetur sit sunt Lorem deserunt. Aliqua qui mollit culpa dolore. Amet ad proident eiusmod
            officia eiusmod. Lorem ad quis officia officia ullamco do quis ea nostrud consequat nulla adipisicing sint
            dolor. Sunt in labore laboris ex commodo ad qui officia ea sint. Tempor duis Lorem excepteur tempor mollit
            proident est elit. Voluptate excepteur ex non non magna. Mollit nulla dolor magna exercitation sunt
            incididunt officia. Aliquip quis ullamco ad nisi qui labore irure cupidatat incididunt irure nisi esse amet
            do. Labore cupidatat anim tempor sint anim sit aute dolore ex qui dolore et. Dolore magna proident nostrud
            veniam ipsum sit sint ex. Dolore laboris exercitation officia exercitation mollit deserunt commodo
            consectetur nostrud sunt Lorem voluptate irure. Aliqua non nostrud aliquip incididunt cupidatat magna
            ullamco officia. Eu eu consectetur mollit esse. Nulla velit ad in ad minim nostrud laboris excepteur
            incididunt quis. Est mollit mollit consectetur proident culpa labore velit. Laborum reprehenderit elit aute
            sit Lorem. Adipisicing deserunt tempor quis exercitation do. Esse do nostrud sit elit incididunt Lorem ipsum
            do anim veniam anim ea. Laborum eiusmod occaecat exercitation Lorem aliqua et exercitation. Irure eiusmod
            elit aliqua Lorem laborum adipisicing do consectetur ex adipisicing nisi aliqua. Ad consectetur proident eu
            ea aute culpa nostrud non nisi anim duis cillum proident quis. Do esse anim ullamco fugiat occaecat. Ipsum
            sint aute consectetur cupidatat mollit. Voluptate sunt adipisicing incididunt enim Lorem qui esse ullamco
            ullamco officia. Qui et officia esse aute aliqua. Ad culpa deserunt minim enim consectetur aliqua aute nisi
            eiusmod.
          </p>
          <div className={styles.divider} />
          <p>
            Eiusmod cillum irure excepteur fugiat eiusmod officia in eu. Irure magna incididunt id do consequat
            consectetur anim qui ullamco enim elit. Amet pariatur nulla est Lorem. Anim non qui magna ea do laborum
            aliquip adipisicing. Fugiat labore fugiat nulla velit ut in quis consectetur aliqua fugiat ut enim
            voluptate. Consequat do enim velit id ipsum. Amet occaecat deserunt fugiat cillum proident veniam cupidatat
            et laboris. Non occaecat aliqua commodo exercitation ut laborum nisi eiusmod deserunt. Reprehenderit ipsum
            mollit cillum pariatur qui aute. Velit reprehenderit voluptate do aliqua officia non veniam voluptate
            laborum laborum consequat reprehenderit nulla. Aute minim veniam et proident occaecat sint deserunt proident
            exercitation do occaecat consectetur. Tempor culpa et mollit velit laborum incididunt voluptate ex
            consectetur laboris. Aliqua in deserunt laborum Lorem ea nostrud aute et sunt ad in cillum. Nulla dolor
            aliqua laborum magna excepteur esse labore Lorem esse. Elit proident sunt laborum adipisicing mollit esse
            excepteur. Fugiat incididunt eu adipisicing mollit cillum sint dolore ex irure consectetur nostrud ad. Et
            Lorem voluptate laborum mollit fugiat. Cupidatat cupidatat labore proident nostrud nisi consectetur commodo.
            Dolore non do Lorem dolore id sint amet est ad consequat labore consequat sunt. Reprehenderit aliquip est
            exercitation dolore eu occaecat irure. Nisi duis reprehenderit laboris consectetur elit anim tempor eu
            cupidatat quis ipsum. Consequat aute irure consectetur ad eiusmod culpa labore reprehenderit laborum officia
            anim voluptate nisi. Id consequat adipisicing nisi quis esse sint sint. Cupidatat minim aliquip cupidatat
            commodo consectetur est irure ea voluptate reprehenderit aute duis. Excepteur adipisicing labore ullamco
            dolor consequat ex do ea dolore culpa. Fugiat labore exercitation aliquip officia cillum tempor dolore dolor
            voluptate anim. Occaecat aliquip pariatur consectetur sint elit et mollit. Non ea aliquip officia quis est
            veniam non occaecat laborum. Culpa Lorem velit minim exercitation minim mollit labore in ad cupidatat ut ut
            aliqua. Nostrud deserunt irure exercitation excepteur magna do minim culpa. Eiusmod consectetur ut commodo
            nisi ipsum consectetur ad elit sit. Irure nostrud ex in sint. Sit adipisicing fugiat anim nulla sunt fugiat
            ex laborum excepteur amet qui ea sit eiusmod. Duis occaecat amet voluptate reprehenderit nostrud eu aliqua.
            Cupidatat quis laboris quis aute irure voluptate pariatur reprehenderit ullamco commodo sit aliqua duis.
            Amet est ut culpa sit sunt aliquip. Esse tempor nostrud cillum culpa Lorem non esse adipisicing. In deserunt
            irure ut est ut veniam deserunt nostrud velit eu culpa aliquip ut. Consectetur pariatur qui veniam do
            adipisicing. Minim id et excepteur aliquip irure ullamco magna enim ad excepteur Lorem consequat. Consequat
            voluptate amet id culpa exercitation. Minim non non consequat anim et sint est qui commodo sunt deserunt
            proident duis. Pariatur culpa mollit culpa sint ea reprehenderit dolor veniam ea. Do eiusmod sint incididunt
            proident eiusmod labore veniam ipsum. Et nisi sit mollit et. Adipisicing adipisicing pariatur anim occaecat
            incididunt occaecat elit consequat. Incididunt esse minim nulla dolore cillum consequat consequat veniam
            incididunt magna adipisicing eiusmod in. Qui consequat aute veniam enim esse. Elit veniam consectetur
            voluptate cillum pariatur nostrud est ut ut velit esse qui labore. Lorem est non tempor duis laborum sit sit
            velit. Quis sunt ex eiusmod nostrud sint magna aliqua fugiat eiusmod culpa ipsum ea ullamco. Consequat
            fugiat veniam consectetur excepteur reprehenderit mollit. Veniam aliquip excepteur labore laboris in
            voluptate tempor pariatur consequat. Magna non qui deserunt est occaecat amet laborum ipsum. Elit
            reprehenderit adipisicing reprehenderit non id esse enim anim. Amet esse ea aliquip nulla voluptate commodo
            excepteur excepteur. Velit aliqua ad ullamco ad fugiat magna ullamco quis magna pariatur nostrud. Aliquip
            mollit duis laboris amet culpa in eiusmod est duis consectetur amet. Est esse proident proident elit ex sit
            ipsum. Ex nisi dolore occaecat sit aute. Labore enim minim irure minim labore et.
          </p>
        </div>
      </div>
      <FloatingBox id={BOTTOM_BOX_ID}>
        <NavBottom />
      </FloatingBox>

      <BottomModal
        id={BOTTOM_MODAL_ID}
        isOpen={bottomModalIsOpen}
        onClose={() => {
          setPortalId(BOTTOM_BOX_ID);
          closeBottomModal();
        }}>
        <div>
          <h1>안녕하세요오오오</h1>
          <p>
            Nisi aute veniam id id elit nisi culpa sunt. Est anim ex dolore eiusmod voluptate nulla deserunt nulla.
            Nostrud irure ut in aliqua consequat nisi do duis labore consequat qui ipsum. Aliqua amet reprehenderit
            cupidatat anim. Cillum ea ex esse fugiat nulla excepteur mollit ipsum aute enim nostrud. Consectetur nisi
            quis laborum sunt laborum nisi ullamco excepteur anim. Dolore dolore quis ipsum dolor. Fugiat aliqua duis
            nostrud voluptate ex laboris id eiusmod cillum ea aliquip adipisicing ipsum excepteur. Consectetur proident
            duis do anim cupidatat deserunt amet in adipisicing. Mollit voluptate non consequat cillum amet duis nulla
            qui esse pariatur. Pariatur voluptate occaecat ut ea ullamco amet. Eiusmod incididunt consequat adipisicing
            laboris cupidatat. Elit commodo velit ea commodo amet aute dolor deserunt dolore eu adipisicing aliqua.
            Labore elit dolore quis consequat fugiat anim aute sit cillum esse amet laborum proident id. Dolore proident
            do et fugiat fugiat consequat non adipisicing duis. Minim aliquip ut non consequat incididunt est elit est
            nulla. Aute aliqua duis magna deserunt Lorem et quis deserunt velit sit aute ut dolore in.
          </p>
        </div>
      </BottomModal>

      <CenterModal
        isOpen={centerModalIsOpen}
        onClose={() => {
          setPortalId(BOTTOM_BOX_ID);
          closeCenterModal();
        }}>
        <div style={{ width: '300px' }}>
          <h1>안녕하세요</h1>
          <p>
            Occaecat esse incididunt tempor nostrud ea eu ex culpa minim. Exercitation eiusmod reprehenderit aute enim
            elit labore ullamco. Adipisicing amet in ad in et magna. Quis ipsum sit non nisi nostrud nisi sint consequat
            culpa. Sunt pariatur dolor duis tempor dolore et nisi Lorem excepteur velit. Laborum sint commodo Lorem
            exercitation. Aliqua aute officia quis est reprehenderit adipisicing dolor. Deserunt laboris laborum culpa
            proident est sit. In eu ipsum aliquip dolore eu pariatur magna anim sunt. Voluptate sint ea cillum ad
            aliquip est deserunt quis. Occaecat sunt dolore aliquip ut sint commodo incididunt mollit dolore consectetur
            amet. Elit exercitation exercitation ex anim ullamco amet. Laboris laborum velit esse et excepteur. Labore
            tempor mollit eu deserunt proident nulla. Officia do voluptate eiusmod deserunt.
          </p>
        </div>
      </CenterModal>

      <BottomSheet
        id={BOTTOM_SHEET_ID}
        isOpen={modalOpen}
        onClose={() => {
          setPortalId(BOTTOM_BOX_ID);
          handleModalClose();
        }}>
        <div>
          <h1>안녕하세요</h1>
          <button type="button" onClick={() => setTest(prev => !prev)}>
            테스트
          </button>
          <div className={styles.bottomSheetContents}>
            <p>
              Sit ad proident labore magna exercitation eiusmod. Minim in aute irure commodo nulla nisi eiusmod velit
              cillum. Aliqua ea cillum ipsum laborum quis sint ea fugiat incididunt adipisicing do non aute consequat.
              Magna sunt exercitation irure in eu enim id. Qui irure ea excepteur ut ad aute qui irure irure ullamco
              culpa consectetur. Sit ad proident labore magna exercitation eiusmod. Minim in aute irure commodo nulla
              nisi eiusmod velit cillum. Aliqua ea cillum ipsum laborum quis sint ea fugiat incididunt adipisicing do
              non aute consequat. Magna sunt exercitation irure in eu enim id. Qui irure ea excepteur ut ad aute qui
              irure irure ullamco culpa consectetur. Sit ad proident labore magna exercitation eiusmod. Minim in aute
              irure commodo nulla nisi eiusmod velit cillum. Aliqua ea cillum ipsum laborum quis sint ea fugiat
              incididunt adipisicing do non aute consequat. Magna sunt exercitation irure in eu enim id. Qui irure ea
              excepteur ut ad aute qui irure irure ullamco culpa consectetur.
            </p>
          </div>
          <div>
            {test && (
              <>
                <p>테스트</p>
                <p>테스트</p>
                <p>테스트</p>
                <p>테스트</p>
                <p>테스트</p>
                <p>테스트</p>
                <p>테스트</p>
              </>
            )}
          </div>
        </div>
      </BottomSheet>
    </>
  );
}
