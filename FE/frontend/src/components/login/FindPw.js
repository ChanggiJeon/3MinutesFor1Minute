import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaUser, FaUserTag } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { IoWarningOutline } from 'react-icons/io5';
import Swal from 'sweetalert2';
import { apiFindPw } from '../../api/accounts';
import EmptyMsg from '../auth/EmptyMsg';
import ErrorMsg from '../auth/ErrorMsg';
import Form from '../auth/Form';
import Label from '../auth/Label';
import SubmitButton from '../auth/SubmitButton';
import Title from '../auth/Title';

function FindPw() {
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
		getValues,
		setError,
		clearErrors,
	} = useForm({
		mode: 'all',
	});
	const [isLoading, setLoading] = useState(false);

	const onValidSubmit = async () => {
		const { id, name, email } = getValues();

		try {
			setLoading(true);
			await apiFindPw({ username: id, name, email });
			Swal.fire({
				icon: 'success',
				text: '임시 비밀번호를 이메일로 전송하였습니다.',
			});
		} catch (e) {
			setError('result', { message: '존재하지 않는 회원 정보 입니다.' });
			return;
		} finally {
			setLoading(false);
		}
	};

	const ResultError = errors?.result?.message ? (
		<ErrorMsg>
			<IoWarningOutline />
			{errors?.result?.message}
		</ErrorMsg>
	) : (
		<EmptyMsg />
	);

	const IdError = errors?.id?.message ? (
		<ErrorMsg>
			<IoWarningOutline />
			{errors?.id?.message}
		</ErrorMsg>
	) : (
		<EmptyMsg />
	);

	const NameError = errors?.name?.message ? (
		<ErrorMsg>
			<IoWarningOutline />
			{errors?.name?.message}
		</ErrorMsg>
	) : (
		<EmptyMsg />
	);

	const EmailError = errors?.email?.message ? (
		<ErrorMsg>
			<IoWarningOutline />
			{errors?.email?.message}
		</ErrorMsg>
	) : (
		<EmptyMsg />
	);

	return (
		<Form onSubmit={handleSubmit(onValidSubmit)}>
			<Title>비밀번호 찾기</Title>
			{ResultError}
			<Label htmlFor='id'>
				<FaUser />
				<input
					{...register('id', {
						required: '아이디를 입력하세요.',
						minLength: {
							value: 5,
							message: '5자 이상 입력하세요.',
						},
						pattern: {
							value: /^[a-zA-Z0-9]{5,}$/,
							message: '영문자, 숫자를 사용하세요.',
						},
					})}
					type='id'
					placeholder='ID'
					maxLength='16'
					onInput={() => clearErrors('result')}
				/>
			</Label>
			{IdError}
			<Label htmlFor='name'>
				<FaUserTag />
				<input
					{...register('name', {
						required: '이름를 입력하세요.',
						minLength: {
							value: 2,
							message: '2자 이상 입력하세요.',
						},
						pattern: {
							value: /^[ㄱ-ㅎㅏ-ㅢ가-힣]*$/,
							message: '한글만 입력하세요.',
						},
					})}
					type='name'
					placeholder='이름'
					maxLength='10'
					onInput={() => clearErrors('result')}
				/>
			</Label>
			{NameError}
			<Label htmlFor='email'>
				<MdEmail />
				<input
					{...register('email', {
						required: '이메일를 입력하세요.',
						pattern: {
							value:
								/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/,
							message: '올바른 이메일 형식이 아닙니다.',
						},
					})}
					type='email'
					placeholder='이메일'
					maxLength='25'
					onInput={() => clearErrors('result')}
				/>
			</Label>
			{EmailError}
			<SubmitButton type='submit' disabled={!isValid || isLoading}>
				{isLoading ? '발송완료' : '찾 기'}
			</SubmitButton>
		</Form>
	);
}

export default FindPw;
