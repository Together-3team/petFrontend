import * as Yup from 'yup';

export const deliveryFormSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .matches(/^[가-힣a-zA-Z0-9]+$/, '1~20자의 한글, 영어, 숫자만 가능합니다.')
    .max(20, '1~20자의 한글, 영어, 숫자만 가능합니다.')
    .required(),
  recipient: Yup.string()
    .trim()
    .matches(/^[가-힣a-zA-Z0-9]+$/, '1~20자의 한글, 영어, 숫자만 가능합니다.')
    .max(20, '1~20자의 한글, 영어, 숫자만 가능합니다.')
    .required(),
  phoneNumber: Yup.string()
    .matches(/^\d{3}-\d{3,4}-\d{4}$/, '연락처 입력 형식을 확인해주세요. (000-0000-0000)')
    .required(),
  zipCode: Yup.string().required(),
  address: Yup.string().required(),
  detailedAddress: Yup.string().required(),
  isDefault: Yup.boolean(),
});
