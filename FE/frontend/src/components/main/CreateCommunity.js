import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaUsers } from 'react-icons/fa';
import { IoWarningOutline } from 'react-icons/io5';
import Swal from 'sweetalert2';
import routes from '../../routes';
import AreaLabel from '../auth/AreaLabel';
import IconBtn from '../auth/IconBtn';
import EmptyMsg from '../auth/EmptyMsg';
import ErrorMsg from '../auth/ErrorMsg';
import Form from '../auth/Form';
import Label from '../auth/Label';
import SubmitButton from '../auth/SubmitButton';
import Title from '../auth/Title';
import ErrorAndCheck from '../auth/ErrorAndCheck';
import {
	apiCreateCommunity,
	apiUniqueCheckCommunityName,
} from '../../api/community';

function CreateCommunity() {
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
	const [nameCheck, setNameCheck] = useState(false);
	const navigate = useNavigate();

	const handleNameCheck = async () => {
		// check process
		const { name } = getValues();
		try {
			await apiUniqueCheckCommunityName({ name });
			setNameCheck(true);
		} catch (e) {
			Swal.fire({
				icon: 'error',
				text: '사용할 수 없는 커뮤니티 이름입니다.',
			});
		}
	};

	const onValidSubmit = async () => {
		const { name, isPrivate, intro } = getValues();
		try {
			// api
			const response = await apiCreateCommunity({ name, isPrivate, intro });
			const { id } = response.data;
			// alert
			await Swal.fire({
				icon: 'success',
				text: `${name} 커뮤니티가 생성되었습니다.`,
			});
			navigate(`${routes.community}/${id}`);
		} catch (e) {
			// e.response.status
			setError('result', { message: '커뮤니티 생성에 실패하였습니다.' });
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
			<Title>커뮤니티 생성</Title>
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
						pattern: {
							value: /^[ㄱ-ㅎ가-힣a-zA-Z0-9]{2,}$/,
							message: '특수문자, 공백은 사용할 수 없습니다.',
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
				생 성
			</SubmitButton>
		</Form>
	);
}

export default CreateCommunity;
