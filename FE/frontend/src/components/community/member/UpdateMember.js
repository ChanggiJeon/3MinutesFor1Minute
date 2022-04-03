import { useForm } from 'react-hook-form';
import { FaUser } from 'react-icons/fa';
import { IoWarningOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { apiPutMember } from '../../../api/community';
import { updateMemberData } from '../../../store/member';
import AreaLabel from '../../auth/AreaLabel';
import EmptyMsg from '../../auth/EmptyMsg';
import ErrorMsg from '../../auth/ErrorMsg';
import Form from '../../auth/Form';
import FormContainer from '../../auth/FormContainer';
import Label from '../../auth/Label';
import SubmitButton from '../../auth/SubmitButton';
import Title from '../../auth/Title';

function UpdateMember({ toggleMode, getMember }) {
	const { nickname, bio } = useSelector(state => state.member);
	const { communityId, memberId } = useParams();
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

	const onValidSubmit = async () => {
		const { nickname: newNickname, bio: newBio } = getValues();

		try {
			await apiPutMember({
				communityId,
				memberId,
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
			getMember();
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
						})}
						placeholder='닉네임'
						maxLength='16'
						onInput={() => clearErrors('result')}
					/>
				</Label>
				<AreaLabel htmlFor='bio'>
					자기소개
					<textarea
						{...register('bio', {
							required: '자기소개를 입력하세요.',
						})}
						placeholder='자기소개'
						onInput={() => clearErrors('result')}
					/>
				</AreaLabel>
				<SubmitButton type='submit' disabled={!isValid}>
					변경
				</SubmitButton>
			</Form>
		</FormContainer>
	);
}

export default UpdateMember;
