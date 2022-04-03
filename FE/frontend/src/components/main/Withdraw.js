import { useForm } from 'react-hook-form';
import { FaLock, FaUser } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { apiDeleteUser } from '../../api/accounts';
import routes from '../../routes';
import { logout } from '../../store/user';
import Form from '../auth/Form';
import FormContainer from '../auth/FormContainer';
import Label from '../auth/Label';
import SubmitButton from '../auth/SubmitButton';
import Title from '../auth/Title';

function Withdraw() {
	const {
		register,
		handleSubmit,
		getValues,
		setError,
		clearErrors,
		formState: { isValid },
	} = useForm({
		mode: 'all',
	});
	const { username } = useSelector(state => state.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onValidSubmit = async () => {
		const { id, password } = getValues();

		try {
			const res = await Swal.fire({
				icon: 'warning',
				text: '정말 탈퇴하시겠습니까?',
				showCancelButton: true,
				confirmButtonText: '탈퇴',
				cancelButtonText: '취소',
			});
			if (res.isConfirmed) {
				if (id !== username) throw Error();
				await apiDeleteUser({ username, password });
				await Swal.fire({
					icon: 'success',
					text: '탈퇴되었습니다. 서비스를 이용해주셔서 감사합니다.',
				});
				dispatch(logout());
				navigate(routes.main);
			}
		} catch (e) {
			// error
			Swal.fire({
				icon: 'error',
				text: '회원정보가 일치하지 않습니다. 확인 후 다시 시도하세요.',
			});
		}
	};
	return (
		<FormContainer>
			<Form onSubmit={handleSubmit(onValidSubmit)}>
				<Title>회원 탈퇴</Title>
				<span>회원 탈퇴를 위한 본인 확인 절차입니다.</span>
				<span>아이디와 비밀번호를 입력하세요.</span>
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
					/>
				</Label>
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
								value: /^(?=.+[a-z])(?=.+[A-Z])((?=.+[0-9])(?=.+[!@#$%^&*])).{8,}$/,
								message: '영문 대문자, 소문자, 숫자, 특수문자를 사용하세요.',
							},
						})}
						type='password'
						placeholder='비밀번호'
						maxLength='20'
						onInput={() => clearErrors('result')}
					/>
				</Label>
				<SubmitButton type='submit' disabled={!isValid}>
					회원 탈퇴
				</SubmitButton>
			</Form>
		</FormContainer>
	);
}

export default Withdraw;
