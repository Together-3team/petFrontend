import { useForm, SubmitHandler } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Input from '../common/Input';

interface NicknameInput {
  nickname: string;
}

const formSchema = Yup.object().shape({
  nickname: Yup.string().trim().max(30, '닉네임을 30자 이내로 입력해주세요').required('닉네임을 입력해주세요'),
});

export default function NicknameForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NicknameInput>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      nickname: '',
    },
  });
  const onSubmit: SubmitHandler<NicknameInput> = data => console.log(data);
  console.log(errors);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        id="nickname"
        type="text"
        size={'large'}
        label="닉네임"
        isError={errors.nickname && true}
        labelStyle={'label'}
        placeholder="닉네임을 입력해주세요"
        {...register('nickname')}
      />
      {errors.nickname && <p style={{ color: 'red' }}>{errors.nickname.message}</p>}
      <button type="submit">제출</button>
    </form>
  );
}
