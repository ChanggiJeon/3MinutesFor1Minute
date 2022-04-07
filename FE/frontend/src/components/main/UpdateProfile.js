import { useForm } from 'react-hook-form';
import { FaUnlock } from 'react-icons/fa';
import { IoWarningOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { apiGetMyProfile, apiUpdateProfileImage } from '../../api/accounts';
import { getUserData } from '../../store/user';
import EmptyMsg from '../auth/EmptyMsg';
import ErrorMsg from '../auth/ErrorMsg';
import Form from '../auth/Form';
import FormContainer from '../auth/FormContainer';
import Label from '../auth/Label';
import SubmitButton from '../auth/SubmitButton';
import Title from '../auth/Title';

function UpdateProfile({ toggleMode }) {
	const {
		register,
		handleSubmit,
		formState: { isValid, errors },
		getValues,
		setError,
		clearErrors,
	} = useForm({
		mode: 'all',
	});
	const dispatch = useDispatch();
	const { username } = useSelector(state => state.user);

	const onValidSubmit = async () => {
		const { password, profileImage } = getValues();
		const formData = new FormData();

		formData.append('profile_image', profileImage[0]);
		formData.append('enctype', 'multipart/form-data');
		formData.append('username', username);
		formData.append('password', password);

		try {
			await apiUpdateProfileImage({
				formData,
			});
			Swal.fire({
				icon: 'success',
				text: '프로필 이미지가 변경되었습니다.',
			});

			const response = await apiGetMyProfile();
			dispatch(
				getUserData({
					...response.data,
				})
			);
			toggleMode('profile');
		} catch (e) {
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

	return (
		<FormContainer>
			<Form onSubmit={handleSubmit(onValidSubmit)}>
				<Title>프로필 이미지 변경</Title>
				{ResultError}
				<Label htmlFor='profileImage'>
					<input {...register('profileImage')} type='file' />
				</Label>
				<Label htmlFor='password'>
					<FaUnlock />
					<input
						{...register('password', {
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
						placeholder='비밀번호'
						maxLength='20'
						onInput={() => clearErrors('result')}
					/>
				</Label>
				{PasswordError}
				<SubmitButton type='submit' disabled={!isValid}>
					변 경
				</SubmitButton>
			</Form>
		</FormContainer>
	);
}

export default UpdateProfile;
