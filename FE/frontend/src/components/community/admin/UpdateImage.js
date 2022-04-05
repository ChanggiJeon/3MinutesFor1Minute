import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaSearch, FaUsers } from 'react-icons/fa';
import { IoWarningOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import Form from '../../auth/Form';
import Label from '../../auth/Label';
import Title from '../../auth/Title';
import Modal from '../../modal/Modal';
import {
	apiGetCommunityInfo,
	apiPutCommunityInfo,
	apiUniqueCheckCommunityName,
	apiUpdateCommunityImage,
} from '../../../api/community';
import ErrorMsg from '../../auth/ErrorMsg';
import EmptyMsg from '../../auth/EmptyMsg';
import IconBtn from '../../auth/IconBtn';
import ErrorAndCheck from '../../auth/ErrorAndCheck';
import AreaLabel from '../../auth/AreaLabel';
import SubmitButton from '../../auth/SubmitButton';
import {
	getCommunityData,
	updateCommunityData,
} from '../../../store/community';

function UpdateImage({ setMode }) {
	const {
		id: communityId,
		name,
		intro,
		is_private: isPrivate,
	} = useSelector(state => state.community);
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
	const dispatch = useDispatch();

	const onValidSubmit = async () => {
		const { image } = getValues();
		const formData = new FormData();

		formData.append('image', image[0]);
		formData.append('enctype', 'multipart/form-data');
		formData.append('name', name);
		formData.append('intro', intro);
		formData.append('is_private', isPrivate);

		try {
			// api
			await apiUpdateCommunityImage({ communityId, formData });
			// alert
			Swal.fire({
				icon: 'success',
				text: `${name} 커뮤니티 이미지가 변경되었습니다.`,
			});
			const response = await apiGetCommunityInfo({ communityId });
			dispatch(getCommunityData(response.data));
			setMode(false);
		} catch (e) {
			// e.response.status
			setError('result', { message: '커뮤니티 이미지 변경에 실패하였습니다.' });
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
		<Modal setMode={setMode}>
			<Form onSubmit={handleSubmit(onValidSubmit)}>
				<Title>커뮤니티 이미지 변경</Title>
				{ResultError}
				<Label htmlFor='image'>
					<input {...register('image')} type='file' />
				</Label>
				<SubmitButton type='submit' disabled={!isValid}>
					변 경
				</SubmitButton>
			</Form>
		</Modal>
	);
}

export default UpdateImage;
