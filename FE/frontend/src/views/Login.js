import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaLock, FaUser } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { IoWarningOutline } from 'react-icons/io5';
import { MdOutlineLock } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/user';
import routes from '../routes';
import Divider from '../components/auth/Divider';
import FormContainer from '../components/auth/FormContainer';
import ErrorMsg from '../components/auth/ErrorMsg';
import EmptyMsg from '../components/auth/EmptyMsg';
import Form from '../components/auth/Form';
import Title from '../components/auth/Title';
import Label from '../components/auth/Label';
import LinkContainer from '../components/auth/LinkContainer';
import SubmitButton from '../components/auth/SubmitButton';
import FindId from '../components/login/FindId';
import Modal from '../components/modal/Modal';
import FindPw from '../components/login/FindPw';
import EmptyBtn from '../components/auth/EmptyBtn';
import { apiLogin } from '../api/accounts';

function Login() {
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
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [isFindIdMode, setFindIdmode] = useState(false);
	const [isFindPwMode, setFindPwmode] = useState(false);
	const { isLoggedIn } = useSelector(state => state.user);

	useEffect(() => {
		if (isLoggedIn) {
			navigate(routes.main);
		}
	}, [isLoggedIn]);

	const onValidSubmit = async () => {
		const { id, password } = getValues();

		try {
			// api
			const response = await apiLogin({ username: id, password });
			const { access, refresh } = response.data;
			dispatch(
				login({
					isLoggedIn: true,
					access,
					refresh,
				})
			);
			clearErrors('result');
			navigate(routes.main);
		} catch (e) {
			if (e.response.status === 401) {
				Swal.fire({
					icon: 'error',
					text: '??????????????? ???????????? ????????????.',
				});
				setError('result', { message: '??????????????? ???????????? ????????????.' });
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

	const IdError = errors?.id?.message ? (
		<ErrorMsg>
			<IoWarningOutline />
			{errors?.id?.message}
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

	const FindIdModal = isFindIdMode && (
		<Modal setMode={setFindIdmode}>
			<FindId />
		</Modal>
	);

	const FindPwModal = isFindPwMode && (
		<Modal setMode={setFindPwmode}>
			<FindPw />
		</Modal>
	);

	return (
		<Divider>
			<FormContainer>
				<Form onSubmit={handleSubmit(onValidSubmit)}>
					<Title>Welcome!</Title>
					{ResultError}
					<Label htmlFor='id'>
						<FaUser />
						<input
							{...register('id', {
								required: '???????????? ???????????????.',
								minLength: {
									value: 5,
									message: '5??? ?????? ???????????????.',
								},
								pattern: {
									value: /^[a-zA-Z0-9]{5,}$/,
									message: '?????? ?????????, ?????????, ????????? ???????????????.',
								},
							})}
							type='id'
							placeholder='ID'
							maxLength='16'
							onInput={() => clearErrors('result')}
						/>
					</Label>
					{IdError}
					<Label htmlFor='password'>
						<FaLock />
						<input
							{...register('password', {
								required: '??????????????? ???????????????.',
								minLength: {
									value: 8,
									message: '8??? ?????? ???????????????.',
								},
							})}
							type='password'
							placeholder='????????????'
							maxLength='20'
							onInput={() => clearErrors('result')}
						/>
					</Label>
					{PasswordError}
					<SubmitButton type='submit' disabled={!isValid}>
						??? ??? ???
					</SubmitButton>
					<LinkContainer>
						<MdOutlineLock />
						<EmptyBtn onClick={() => setFindIdmode(true)} type='button'>
							????????? ??????
						</EmptyBtn>
						|
						<EmptyBtn onClick={() => setFindPwmode(true)} type='button'>
							???????????? ??????
						</EmptyBtn>
						|<Link to={routes.signup}>????????????</Link>
					</LinkContainer>
				</Form>
			</FormContainer>
			{FindIdModal}
			{FindPwModal}
		</Divider>
	);
}

export default Login;
