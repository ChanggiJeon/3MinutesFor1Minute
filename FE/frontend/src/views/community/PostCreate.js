import React, { useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
import { apiCreateBoard } from '../../api/board';
import Label from '../../components/auth/Label';
import AreaLabel from '../../components/auth/AreaLabel';
import ComMain from '../../components/community/MainStart';
import Background from '../../components/community/board/list/Background';
import Header from '../../components/community/board/list/Header';
import BoardTitle from '../../components/community/board/list/BoardTitle';
import NForm from '../../components/community/board/list/NForm';
import SubmitButton from '../../components/auth/SubmitButton';
import BlueMdBtn from '../../components/common/BlueMdBtn';

const SButton = styled(SubmitButton)`
border: none;
`
const CreateBtn = styled(BlueMdBtn)`
	margin-right: 20px;
`;
const TitileInput = styled.input`
	width:100%
`;

function PostCreate() {
	const {
		register,
		handleSubmit,
		getValues,
		formState: { isValid },
	} = useForm({
		mode: 'all',
	});
	const { communityId } = useParams();
	const navigate = useNavigate();
	const { is_admin: isAdmin } = useSelector(state => state.member);
	const onValidSubmit = async () => {
		const { title, content, isNotice, upload } = getValues();

		try {
			const response = await apiCreateBoard({
				communityId,
				title,
				content,
				isNotice,
				upload,
			});
			const { id: postId } = response.data;

			await Swal.fire({
				icon: 'success',
				text: '게시글이 성공적으로 작성되었습니다.',
			});
			navigate(`/community/${communityId}/posts/${postId}`);
		} catch (error) {
			// error
			if(error.response.status === 400){
				await Swal.fire({
					icon: 'error',
					text: '공지는 최대 5개까지 작성할 수 있습니다.',
				});
			}else{
				await Swal.fire({
					icon: 'error',
					text: '게시글 작성에 실패하였습니다. 다시 시도하세요.',
				});
			}
			
		}
	};

	return (
		<ComMain>
			<Background>
				<Header>
					<BoardTitle>게시글 작성</BoardTitle>
					<CreateBtn onClick={() => navigate(`/community/${communityId}/posts`)}>
						돌아가기
					</CreateBtn>
				</Header>
				<NForm onSubmit={handleSubmit(onValidSubmit)}>
					<Label htmlFor='title'>
						<TitileInput
							{...register('title', {
								required: true,
							})}
							type='title'
							placeholder='제목 없음'
						/>
					</Label>

					{/* 관리자이면 공지인지 아닌지 설정 가능한 체크박스 나온다 */}
					{ isAdmin ? (
						<Label htmlFor='isNotice'>
							공지여부
							<input {...register('isNotice')} type='checkbox' />
						</Label>
					) : null}
					<AreaLabel htmlFor='content'>
						<textarea
							{...register('content', {
								required: true,
							})}
							cols='60'
							rows='10'
							placeholder='내용 없음'
						/>
					</AreaLabel>
					{/* <Label htmlFor='upload'>
						파일첨부
						<input {...register('upload')} type='file' multiple />
					</Label> */}
					<SButton disabled={!isValid}>작성하기</SButton>
				</NForm>
			</Background>
		</ComMain>
	);
}

export default PostCreate;
