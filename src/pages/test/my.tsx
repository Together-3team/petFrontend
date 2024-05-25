import { useState, useEffect } from 'react';
import Input from '@/components/common/Input';
import ModalPortal from '@/components/Portal';
import BottomModal from '../../components/common/BottomModal';
import Button from '@/components/common/Button';

export default function My() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient && (
        <ModalPortal>
          <div
            style={{
              width: '100%',
              height: '81.2rem',
              paddingTop: '7rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              alignItems: 'center',
            }}>
            <Input id="이메일" type="email" label="이메일" size={'large'} background={'background'} placeholder=" " />
            <Input id="이름" type="text" label="이름" size={'large'} background={'background'} placeholder=" " />
            <BottomModal>
              <span>배송지를 삭제하시겠습니까?</span>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <Button size="medium" backgroundColor="#FFFFFF" onClick={handleModalClose}>
                  취소
                </Button>
                <Button size="medium" backgroundColor="#545454">
                  삭제
                </Button>
              </div>
            </BottomModal>
          </div>
        </ModalPortal>
      )}
    </>
  );
}
