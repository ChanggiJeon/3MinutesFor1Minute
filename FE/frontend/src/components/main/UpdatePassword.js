import { useForm } from 'react-hook-form';
import { FaLock, FaUnlock } from 'react-icons/fa';
import { IoWarningOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { apiUpdateUser } from '../../api/accounts';
import routes from '../../routes';
import { logout } from '../../store/user';
import EmptyMsg from '../auth/EmptyMsg';
import ErrorMsg from '../auth/ErrorMsg';
import Form from '../auth/Form';
import FormContainer from '../auth/FormContainer';
import Label from '../auth/Label';
import SubmitButton from '../auth/SubmitButton';
import Title from '../auth/Title';

function UpdatePassword() {
	const {
		register,
		handleSubmit,
		formState: { isValid, errors },
		getValues,
		setError,
		clearErrors,
		watch,
	} = useForm({
		mode: 'all',
	});
	const passwordMatch = watch('newPassword');
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { username } = useSelector(state => state.user);

	const onValidSubmit = async () => {
		const { password, newPassword, newPasswordConfirmation } = getValues();

		try {
			await apiUpdateUser({
				username,
				password,
				newPassword,
				newPasswordConfirmation,
			});
			await Swal.fire({
				icon: 'success',
				text: '비밀번호가 변경되었습니다. 다시 로그인 하세요.',
			});
			dispatch(logout());
			navigate(routes.login);
		} catch (e) {
			// error
			Swal.fire({
				icon: 'error',
				text: '비밀번호가 유효하지 않습니다. 다시 확인하세요.',
			});
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

	const PasswordError = errors?.password?.message ? (
		<ErrorMsg>
			<IoWarningOutline />
			{errors?.password?.message}
		</ErrorMsg>
	) : (
		<EmptyMsg />
	);

	const NewPasswordError = errors?.newPassword?.message ? (
		<ErrorMsg>
			<IoWarningOutline />
			{errors?.newPassword?.message}
		</ErrorMsg>
	) : (
		<EmptyMsg />
	);

	const NewPasswordConfirmationError = errors?.newPasswordConfirmation
		?.message ? (
		<ErrorMsg>
			<IoWarningOutline />
			{errors?.newPasswordConfirmation?.message}
		</ErrorMsg>
	) : (
		<EmptyMsg />
	);

	return (
		<FormContainer>
			<Form onSubmit={handleSubmit(onValidSubmit)}>
				<Title>비밀번호 변경</Title>
				{ResultError}
				<Label htmlFor='password'>
					<FaUnlock />
					<input
						{...register('password', {
							required: '비밀번호를 입력하세요.',
							minLength: {
								value: 8,
								message: '8자 이상 입력하세요.',
							},
						})}
						type='password'
						placeholder='기존 비밀번호'
						maxLength='20'
						onInput={() => clearErrors('result')}
					/>
				</Label>
				{PasswordError}
				<Label htmlFor='newPassword'>
					<FaLock />
					<input
						{...register('newPassword', {
							required: '비밀번호를 입력하세요.',
							minLength: {
								value: 8,
								message: '8자 이상 입력하세요.',
							},
							pattern: {
								value: /^(?=.*[a-z])(?=.*[A-Z])((?=.*[0-9])(?=.*[!@#$%^&*])).{8,}$/,
								message: '영문 대문자, 소문자, 숫자, 특수문자를 사용하세요.',
							},
						})}
						type='password'
						placeholder='새 비밀번호'
						maxLength='20'
						onInput={() => clearErrors('result')}
					/>
				</Label>
				{NewPasswordError}
				<Label htmlFor='newPasswordConfirmation'>
					<FaLock />
					<input
						{...register('newPasswordConfirmation', {
							required: '비밀번호를 다시 입력하세요.',
							validate: value =>
								value === passwordMatch || '비밀번호가 일치하지 않습니다.',
						})}
						type='password'
						placeholder='새 비밀번호 확인'
						maxLength='20'
						onInput={() => clearErrors('result')}
					/>
				</Label>
				{NewPasswordConfirmationError}
				<SubmitButton type='submit' disabled={!isValid}>
					비밀번호 변경
				</SubmitButton>
			</Form>
		</FormContainer>
	);
}

export default UpdatePassword;
