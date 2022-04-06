import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import routes from '../../../routes';
import {
	apiCreateComment,
} from '../../../api/speech';
import Label from '../../../components/auth/Label';
import SmallBtn from '../../../components/community/board/list/SmallBtn';
import NForm from '../../../components/community/board/list/NForm';

const CLabel = styled(Label)`
	input {
		width: 100%;
		font-size: 15px;
	}
`;

const CForm = styled(NForm)`
  	padding: 0px;
	width: 90%;
  	justify-content:center;
`;

const SubmitBtn = styled(SmallBtn)`
  width: 50px;
`;

function SpeechComment() {
	const {
		register,
		handleSubmit,
		getValues,
		formState: { isValid },
	} = useForm({
		mode: 'all',
	});

	const { communityId, minutesId, speechId } = useParams();

	const onValidSubmit = async data => {
		try {
			console.log(data)
			await apiCreateComment({
				communityId,
				minutesId,
				speechId,
				content: data.content,
			}).then(res => {
        	console.log(res)
      });
			await Swal.fire({
				icon: 'success',
				text: '댓글이 성공적으로 작성되었습니다.',
			});
			window.location.reload(true);
		} catch (e) {
			// error
			await Swal.fire({
				icon: 'error',
				text: '댓글 작성에 실패하였습니다. 다시 시도하세요.',
			});
		}
	};

	return (
		<CForm onSubmit={handleSubmit(onValidSubmit)}>
			<CLabel htmlFor='content'>
				<input
					{...register('content', {
						required: true,
					})}
					type='content'
					placeholder='댓글을 입력하세요'
				/>
				<SubmitBtn type='submit' disabled={!isValid}>
					등록
				</SubmitBtn>
			</CLabel>
		</CForm>
	);
}

export default SpeechComment;
