import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { FaLock, FaUser, FaUserTag } from 'react-icons/fa';
import { BsShieldLockFill } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';
import { IoWarningOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import {
	apiSignup,
	apiUniqueCheckId,
	apiUniqueCheckEmail,
} from '../api/accounts';
import Divider from '../components/auth/Divider';
import EmptyMsg from '../components/auth/EmptyMsg';
import ErrorMsg from '../components/auth/ErrorMsg';
import Form from '../components/auth/Form';
import FormContainer from '../components/auth/FormContainer';
import Label from '../components/auth/Label';
import SubmitButton from '../components/auth/SubmitButton';
import Title from '../components/auth/Title';
import ErrorAndCheck from '../components/auth/ErrorAndCheck';
import routes from '../routes';

function Signup() {
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
		getValues,
		setError,
		setValue,
		clearErrors,
		watch,
		getFieldState,
		setFocus,
	} = useForm({
		mode: 'all',
	});
	const navigate = useNavigate();
	const passwordMatch = watch('password');
	const [idCheck, setIdCheck] = useState(false);
	const [emailCheck, setEmailCheck] = useState(false);
	const [emailCertCode, setEmailCertCode] = useState('');
	const [emailConfirm, setEmailConfirm] = useState(false);
	const [emailConfirmLoading, setEmailConfirmLoading] = useState(false);
	const { isLoggedIn } = useSelector(state => state.user);

	useEffect(() => {
		if (isLoggedIn) {
			navigate(routes.main);
		}
	}, [isLoggedIn]);

	const handleIdCheck = async () => {
		const { id } = getValues();

		if (id) {
			try {
				await apiUniqueCheckId({ id }).then(res => {
					if (res.status === 200) {
						setIdCheck(true);
					}
				});
			} catch (e) {
				if (e.response.status === 400) {
					setError('id', {
						message: '이미 사용 중인 아이디 입니다.',
					});
				}
			}
		} else {
			Swal.fire({
				icon: 'error',
				text: '아이디를 입력하세요.',
			});
		}
	};

	const handleEmailCheck = async () => {
		const { email } = getValues();

		if (!getFieldState('email').invalid) {
			try {
				setEmailConfirmLoading(true);

				const response = await apiUniqueCheckEmail({ email });

				if (response.status === 200) {
					setEmailCheck(true);
					setValue('emailConfirmCode', null);
					setEmailCertCode(response.data.code);
					Swal.fire({
						icon: 'success',
						text: '이메일로 인증코드가 발송되었습니다.',
					});
				}
			} catch (e) {
				if (e.response.status === 400) {
					setError('email', {
						message: '이미 사용 중인 이메일 입니다.',
					});
				}
			} finally {
				setEmailConfirmLoading(false);
			}
		} else {
			Swal.fire({
				icon: 'error',
				text: '이메일을 형식이 올바르지 않습니다.',
			});
		}
	};

	const handleEmailConfirm = async () => {
		const { emailConfirmCode } = getValues();

		if (emailConfirmCode === emailCertCode) {
			setEmailConfirm(true);
		} else {
			setEmailConfirm(false);
			Swal.fire({
				icon: 'error',
				text: '인증코드가 일치하지 않습니다.',
			});
		}
	};

	const onValidSubmit = async () => {
		const { id, password, passwordConfirmation, name, email } = getValues();

		try {
			if (!idCheck || !emailCheck || !emailConfirm) throw Error();

			await apiSignup({
				id,
				password,
				passwordConfirmation,
				name,
				email,
			});
			await Swal.fire({
				icon: 'success',
				text: '회원가입에 성공하였습니다.',
			});

			navigate(routes.login);
		} catch (e) {
			if (!idCheck) {
				await Swal.fire({
					icon: 'info',
					text: '아이디 중복확인이 필요합니다.',
				});
				setFocus('id');
			} else if (!emailCheck) {
				await Swal.fire({
					icon: 'info',
					text: '이메일 인증이 필요합니다.',
				});
				setFocus('email');
			} else if (!emailConfirm) {
				await Swal.fire({
					icon: 'info',
					text: '이메일 인증이 필요합니다.',
				});
				setFocus('emailConfirmCode');
			} else {
				await Swal.fire({
					icon: 'error',
					text: '회원가입 오류, 다시 시도하세요.',
				});
			}
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

	const PasswordConfirmationError = errors?.passwordConfirmation?.message ? (
		<ErrorMsg>
			<IoWarningOutline />
			{errors?.passwordConfirmation?.message}
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

	return (
		<Divider>
			<FormContainer>
				<Form onSubmit={handleSubmit(onValidSubmit)}>
					<Title>Join Us!</Title>
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
									message: '영문 대문자, 소문자, 숫자를 사용하세요.',
								},
							})}
							type='id'
							placeholder='ID'
							maxLength='16'
							onInput={() => clearErrors('result')}
							onChange={() => setIdCheck(false)}
						/>
						<SubmitButton type='button' onClick={handleIdCheck}>
							중복확인
						</SubmitButton>
					</Label>
					{ErrorAndCheck(errors?.id?.message, idCheck)}
					<Label htmlFor='password'>
						<FaLock />
						<input
							{...register('password', {
								required: '비밀번호를 입력하세요.',
								minLength: {
									value: 8,
									message: '8자 이상 입력하세요.',
								},
								pattern: {
									value: /((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,})/,
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
					<Label htmlFor='passwordConfirmation'>
						<FaLock />
						<input
							{...register('passwordConfirmation', {
								required: '비밀번호를 다시 입력하세요.',
								validate: value =>
									value === passwordMatch || '비밀번호가 일치하지 않습니다.',
							})}
							type='password'
							placeholder='비밀번호 확인'
							maxLength='20'
							onInput={() => clearErrors('result')}
						/>
					</Label>
					{PasswordConfirmationError}
					<Label htmlFor='name'>
						<FaUserTag />
						<input
							{...register('name', {
								required: '이름을 입력하세요.',
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
							onChange={() => {
								setEmailCheck(false);
								setEmailConfirm(false);
							}}
						/>
						<SubmitButton
							type='button'
							onClick={handleEmailCheck}
							disabled={emailConfirmLoading}
						>
							{emailConfirmLoading ? '발송완료' : '인증하기'}
						</SubmitButton>
					</Label>
					{ErrorAndCheck(errors?.email?.message, emailCheck)}
					{emailCheck && (
						<Label htmlFor='emailConfirmCode'>
							<BsShieldLockFill />
							<input
								{...register('emailConfirmCode')}
								type='text'
								placeholder='인증코드'
								maxLength='10'
								onInput={() => clearErrors('result')}
								onChange={() => setEmailConfirm(false)}
								disabled={emailConfirm}
							/>
							<SubmitButton
								type='button'
								onClick={handleEmailConfirm}
								disabled={emailConfirm}
							>
								코드확인
							</SubmitButton>
						</Label>
					)}
					{ErrorAndCheck(errors?.emailConfirmCode?.message, emailConfirm)}
					<SubmitButton type='submit'>회 원 가 입</SubmitButton>
				</Form>
			</FormContainer>
		</Divider>
	);
}

export default Signup;
