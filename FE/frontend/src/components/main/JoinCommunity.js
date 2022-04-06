import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaUserTag } from 'react-icons/fa';
import { IoWarningOutline } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import {
	apiApplyCommunity,
	apiUniqueCheckNicknameInCommunity,
} from '../../api/community';
import routes from '../../routes';
import AreaLabel from '../auth/AreaLabel';
import EmptyMsg from '../auth/EmptyMsg';
import ErrorAndCheck from '../auth/ErrorAndCheck';
import ErrorMsg from '../auth/ErrorMsg';
import Form from '../auth/Form';
import Label from '../auth/Label';
import SubmitButton from '../auth/SubmitButton';
import Title from '../auth/Title';
import TextSubTitle from '../common/TextSubTitle';

function JoinCommunity({ target, setMode, getList }) {
	const { name } = useSelector(state => state.user);
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
		getValues,
		setError,
		clearErrors,
	} = useForm({
		mode: 'all',
		defaultValues: {
			nickname: name,
		},
	});
	const [nicknameCheck, setNicknameCheck] = useState(false);
	const navigate = useNavigate();

	const handleNicknameCheck = async () => {
		const { nickname } = getValues();

		try {
			await apiUniqueCheckNicknameInCommunity({
				communityId: target.id,
				nickname,
			}).then(res => {
				if (res.status === 200) {
					setNicknameCheck(true);
				}
			});
		} catch (e) {
			if (e.response.status === 400) {
				setError('nickname', {
					message: '이미 사용 중인 닉네임 입니다.',
				});
			}
		}
	};

	const onValidSubmit = async () => {
		const { nickname, bio } = getValues();

		try {
			if (!nickname) throw Error();

			await apiApplyCommunity({
				communityId: target.id,
				nickname,
				bio,
			});
			await Swal.fire({
				icon: 'success',
				text: `${target.name} 커뮤니티에 가입 요청을 보냈습니다.`,
			});
			setMode(false);
			getList();
		} catch (e) {
			const { data, status } = e.response;

			if (status === 400) {
				await Swal.fire({
					icon: 'error',
					text: data[0],
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

	return (
		<Form onSubmit={handleSubmit(onValidSubmit)}>
			<Title>커뮤니티 가입</Title>
			{ResultError}
			<Label htmlFor='nickname'>
				<FaUserTag />
				<input
					{...register('nickname', {
						required: '닉네임을 입력하세요',
						minLength: {
							value: 2,
							message: '2자 이상 입력하세요.',
						},
						pattern: {
							value: /^[ㄱ-ㅎ가-힣a-zA-Z0-9]{2,}$/,
							message: '특수문자, 공백은 사용할 수 없습니다.',
						},
					})}
					type='nickname'
					placeholder='닉네임'
					onInput={() => clearErrors('result')}
					onChange={() => setNicknameCheck(false)}
				/>
				<SubmitButton type='button' onClick={handleNicknameCheck}>
					중복확인
				</SubmitButton>
			</Label>
			{ErrorAndCheck(errors?.nickname?.message, nicknameCheck)}
			<AreaLabel htmlFor='bio'>
				<TextSubTitle>{target.name}</TextSubTitle>
				<textarea {...register('bio')} onInput={() => clearErrors('result')} />
			</AreaLabel>
			<SubmitButton type='submit' disabled={!isValid || !nicknameCheck}>
				가 입
			</SubmitButton>
		</Form>
	);
}

export default JoinCommunity;
