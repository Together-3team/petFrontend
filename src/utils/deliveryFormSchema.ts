import * as Yup from 'yup';

export const deliveryFormSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .required('배송지명을 입력해 주세요.')
    .matches(/^[가-힣a-zA-Z0-9]+$/, '1~20자의 한글, 영어, 숫자만 가능합니다.')
    .max(20, '1~20자의 한글, 영어, 숫자만 가능합니다.'),
  recipient: Yup.string()
    .trim()
    .required('받는 사람을 입력해 주세요.')
    .matches(/^[가-힣a-zA-Z0-9]+$/, '1~20자의 한글, 영어, 숫자만 가능합니다.')
    .max(20, '1~20자의 한글, 영어, 숫자만 가능합니다.'),

  recipientPhoneNumber: Yup.string()
    .required('연락처를 입력해 주세요.')
    .matches(/010-\d{4}-\d{4}/, '연락처 입력 형식을 확인해주세요. (010-0000-0000)'),
  zipCode: Yup.string().required('우편번호를 입력해 주세요.'),
  address: Yup.string().required('주소를 입력해 주세요.'),
  detailedAddress: Yup.string().required('상세 주소를 입력해 주세요.'),
  isDefault: Yup.boolean(),
});
