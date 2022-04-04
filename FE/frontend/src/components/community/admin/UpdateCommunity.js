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
	apiPutCommunityInfo,
	apiUniqueCheckCommunityName,
} from '../../../api/community';
import ErrorMsg from '../../auth/ErrorMsg';
import EmptyMsg from '../../auth/EmptyMsg';
import IconBtn from '../../auth/IconBtn';
import ErrorAndCheck from '../../auth/ErrorAndCheck';
import AreaLabel from '../../auth/AreaLabel';
import SubmitButton from '../../auth/SubmitButton';
import { updateCommunityData } from '../../../store/community';

function UpdateCommunity({ setMode }) {
	const {
		name: oldName,
		is_private: oldIsPrivate,
		intro: oldIntro,
		id: communityId,
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
		defaultValues: {
			name: oldName,
			isPrivate: oldIsPrivate,
			intro: oldIntro,
		},
	});
	const [nameCheck, setNameCheck] = useState(true);
	const dispatch = useDispatch();

	const handleNameCheck = async () => {
		// check process
		const { name } = getValues();
		try {
			await apiUniqueCheckCommunityName({ name });
			setNameCheck(true);
		} catch (e) {
			Swal.fire({
				icon: 'error',
				text: '이미 사용 중인 커뮤니티 이름입니다.',
			});
		}
	};

	const onValidSubmit = async () => {
		const { name, isPrivate, intro } = getValues();
		try {
			// api
			await apiPutCommunityInfo({ communityId, name, isPrivate, intro });
			// alert
			await Swal.fire({
				icon: 'success',
				text: `${name} 커뮤니티 정보가 변경되었습니다.`,
			});
			dispatch(
				updateCommunityData({
					name,
					is_private: isPrivate,
					intro,
				})
			);
			setMode(false);
		} catch (e) {
			// e.response.status
			setError('result', { message: '커뮤니티 정보 변경에 실패하였습니다.' });
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
				<Title>커뮤니티 정보 변경</Title>
				{ResultError}
				<Label htmlFor='name'>
					<FaUsers />
					<input
						{...register('name', {
							required: '커뮤니티 이름을 입력하세요.',
							minLength: {
								value: 5,
								message: '이름을 5자 이상 입력하세요.',
							},
						})}
						type='name'
						placeholder='커뮤니티 이름'
						maxLength='16'
						onChange={() => setNameCheck(false)}
						onInput={() => clearErrors('result')}
					/>
					<IconBtn type='button' onClick={handleNameCheck}>
						<FaSearch />
					</IconBtn>
				</Label>
				{ErrorAndCheck(errors?.name?.message, nameCheck)}
				<Label htmlFor='isPrivate'>
					비공개
					<input
						{...register('isPrivate')}
						type='checkbox'
						onInput={() => clearErrors('result')}
					/>
				</Label>
				<EmptyMsg />
				<AreaLabel htmlFor='intro'>
					커뮤니티 소개
					<textarea {...register('intro')} onInput={() => clearErrors('result')} />
				</AreaLabel>
				<SubmitButton type='submit' disabled={!isValid || !nameCheck}>
					변 경
				</SubmitButton>
			</Form>
		</Modal>
	);
}

export default UpdateCommunity;
