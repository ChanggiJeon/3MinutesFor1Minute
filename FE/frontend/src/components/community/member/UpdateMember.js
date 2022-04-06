import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaUser } from 'react-icons/fa';
import { IoWarningOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import {
	apiPutMember,
	apiUniqueCheckNicknameInCommunity,
} from '../../../api/community';
import { updateMemberData } from '../../../store/member';
import AreaLabel from '../../auth/AreaLabel';
import EmptyMsg from '../../auth/EmptyMsg';
import ErrorAndCheck from '../../auth/ErrorAndCheck';
import ErrorMsg from '../../auth/ErrorMsg';
import Form from '../../auth/Form';
import FormContainer from '../../auth/FormContainer';
import Label from '../../auth/Label';
import SubmitButton from '../../auth/SubmitButton';
import Title from '../../auth/Title';

function UpdateMember({ toggleMode, getMember }) {
	const { id, nickname, bio } = useSelector(state => state.member);
	const { communityId, memberNickname } = useParams();
	const {
		register,
		handleSubmit,
		formState: { isValid, errors },
		getValues,
		setError,
		clearErrors,
	} = useForm({
		mode: 'all',
		defaultValues: {
			nickname,
			bio,
		},
	});
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [nicknameCheck, setNicknameCheck] = useState(true);

	const handleNicknameCheck = async () => {
		const { nickname: newNickname } = getValues();

		if (nickname === newNickname) {
			setNicknameCheck(true);
		} else {
			try {
				await apiUniqueCheckNicknameInCommunity({
					communityId,
					nickname: newNickname,
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
					setNicknameCheck(false);
				}
			}
		}
	};

	const onValidSubmit = async () => {
		const { nickname: newNickname, bio: newBio } = getValues();

		try {
			await apiPutMember({
				communityId,
				memberId: id,
				nickname: newNickname,
				bio: newBio,
			});
			await Swal.fire({
				icon: 'success',
				text: '멤버 정보가 변경되었습니다.',
			});
			dispatch(
				updateMemberData({
					nickname: newNickname,
					bio: newBio,
				})
			);
			toggleMode('info');
			if (nickname !== newNickname) {
				navigate(`/community/${communityId}/member/${newNickname}`);
			} else {
				getMember();
			}
		} catch (e) {
			// error
			Swal.fire({
				icon: 'error',
				text: '입력 값이 유효하지 않습니다. 다시 확인하세요.',
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

	return (
		<FormContainer>
			<Form onSubmit={handleSubmit(onValidSubmit)}>
				<Title>멤버 정보 변경</Title>
				{ResultError}
				<Label htmlFor='nickname'>
					<FaUser />
					<input
						{...register('nickname', {
							required: '닉네임을 입력하세요.',
							minLength: {
								value: 2,
								message: '2자 이상 입력하세요.',
							},
						})}
						placeholder='닉네임'
						maxLength='16'
						onInput={() => clearErrors('result')}
						onChange={() => setNicknameCheck(false)}
					/>
					<SubmitButton type='button' onClick={handleNicknameCheck}>
						중복확인
					</SubmitButton>
				</Label>
				{ErrorAndCheck(errors?.nickname?.message, nicknameCheck)}
				<AreaLabel htmlFor='bio'>
					자기소개
					<textarea
						{...register('bio')}
						placeholder='자기소개'
						onInput={() => clearErrors('result')}
					/>
				</AreaLabel>
				<SubmitButton type='submit' disabled={!isValid && !nicknameCheck}>
					변경
				</SubmitButton>
			</Form>
		</FormContainer>
	);
}

export default UpdateMember;
