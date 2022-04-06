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
	apiUpdateMemberProfile,
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

function UpdateProfile({ toggleMode, getMember }) {
	const { id, nickname, bio } = useSelector(state => state.member);
	const { communityId } = useParams();
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

	const onValidSubmit = async () => {
		const { profileImage } = getValues();
		const formData = new FormData();

		formData.append('profile_image', profileImage[0]);
		formData.append('enctype', 'multipart/form-data');
		formData.append('nickname', nickname);
		formData.append('bio', bio);

		try {
			await apiUpdateMemberProfile({
				communityId,
				memberId: id,
				formData,
			});
			await Swal.fire({
				icon: 'success',
				text: '프로필 이미지가 변경되었습니다.',
			});
			toggleMode('profile');
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
				<Title>프로필 이미지 변경</Title>
				{ResultError}
				<Label htmlFor='profileImage'>
					<input {...register('profileImage')} type='file' />
				</Label>
				<SubmitButton type='submit' disabled={!isValid}>
					변경
				</SubmitButton>
			</Form>
		</FormContainer>
	);
}

export default UpdateProfile;
