import * as Yup from 'yup';

// TODO: 닉네임 중복 검사
const signupFormSchema = Yup.object().shape({
  nickname: Yup.string()
    .trim()
    .matches(/^[가-힣a-zA-Z0-9]+$/, '2~8자의 한글, 영어, 숫자만 가능합니다.')
    .min(2, '2~8자의 한글, 영어, 숫자만 가능합니다.')
    .max(8, '2~8자의 한글, 영어, 숫자만 가능합니다.')
    .required('닉네임을 입력해주세요.'),
  phoneNumber: Yup.string()
    .matches(/^\d{3}-\d{3,4}-\d{4}$/, '연락처 입력 형식을 확인해주세요. (000-0000-0000)')
    .required('연락처를 입력해주세요'),
  ageCheck: Yup.boolean().oneOf([true], '해당 항목을 표시해야 합니다.').required(),
  serviceAgreement: Yup.boolean().oneOf([true], '필수 이용약관에 동의해야 합니다.').required(),
  privatePolicy: Yup.boolean().oneOf([true], '필수 이용약관에 동의해야 합니다.').required(),
  marketingAgreement: Yup.boolean().required(),
});

export const phoneNumberSchema = Yup.object({
  phoneNumber: Yup.string()
    .matches(/^\d{3}-\d{3,4}-\d{4}$/, '연락처 입력 형식을 확인해주세요. (000-0000-0000)')
    .required('연락처를 입력해주세요'),
}).required();

export default signupFormSchema;
