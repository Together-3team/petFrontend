import React, { useState } from 'react';
import DaumPostcode from 'react-daum-postcode';

export default function AddressInput() {
  const [zonecode, setZonecode] = useState('');
  const [address, setAddress] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [detailedAddress, setDetailedAddress] = useState('');

  const themeObj = {
    bgColor: '#FFFFFF',
    pageBgColor: '#FFFFFF',
    postcodeTextColor: '#C05850',
    emphTextColor: '#222222',
  };

  const postCodeStyle = {
    width: '360px',
    height: '480px',
  };

  //data는 사용자가 선택한 주소 정보(zonecode, address...)를 담고 있는 객체
  const completeHandler = (data: any) => {
    const { address, zonecode } = data;
    setZonecode(zonecode);
    setAddress(address);
  };

  const closeHandler = (state: string) => {
    if (state === 'FORCE_CLOSE') {
      setIsOpen(false);
    } else if (state === 'COMPLETE_CLOSE') {
      setIsOpen(false);
    }
  };

  const toggleHandler = () => {
    setIsOpen(prevOpenState => !prevOpenState);
  };

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDetailedAddress(event.target.value);
  };

  return (
    <div>
      <div>
        <strong>address</strong>
      </div>
      <div>
        <div>
          <div>{zonecode}</div>
          <button type="button" onClick={toggleHandler}>
            주소 찾기
          </button>
        </div>
        {isOpen && (
          <div>
            <DaumPostcode theme={themeObj} style={postCodeStyle} onComplete={completeHandler} onClose={closeHandler} />
          </div>
        )}
        <div>{address}</div>
        <input value={detailedAddress} onChange={inputChangeHandler} />
      </div>
    </div>
  );
}
