import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import {
	apiGetBoardDetail,
	apiPutBoardDetail,
	apiDeleteBoardDetail,
} from '../../api/board';
import Form from '../../components/auth/Form';
import Label from '../../components/auth/Label';
import AreaLabel from '../../components/auth/AreaLabel';
import SubmitButton from '../../components/auth/SubmitButton';
import ComMain from '../../components/community/main/ComMain';
import Background from '../../components/community/board/list/Background';
import TextTitle from '../../components/common/TextTitle';

function PostDetail() {
	const { communityId, postId } = useParams();
	const [post, setPost] = useState({});
	const [isUpdating, setUpdating] = useState(false);
	const navigate = useNavigate();
	const { register, handleSubmit, getValues, setValue } = useForm({
		mode: 'all',
	});

	useEffect(() => {
		getPost();
	}, [communityId, postId]);

	const getPost = async () => {
		try {
			console.log(communityId, postId)
			await apiGetBoardDetail({ communityId, postId }).then(res => {
				setPost(res.data);
				setValue('title', res.data?.title);
				setValue('content', res.data?.content);
				setValue('isNotice', res.data?.isNotice);
				setValue('upload', res.data?.upload);
			});
		} catch (e) {
			// error
		}
	};

	const deletePost = async () => {
		try {
			await apiDeleteBoardDetail({ communityId, postId });
			await Swal.fire({
				icon: 'success',
				text: '게시글이 삭제되었습니다.',
			});
			navigate('');
		} catch (e) {
			// error
			await Swal.fire({
				icon: 'error',
				text: '삭제 실패, 새로 고침 후, 다시 시도하세요.',
			});
		}
	};

	const handleDelete = async () => {
		await Swal.fire({
			title: '정말 삭제하시겠습니까?',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#dd3333',
			cancelButtonText: '취소',
			confirmButtonText: '삭제',
		}).then(result => {
			if (result.isConfirmed) {
				deletePost();
			}
		});
	};

	const onValidSubmit = async () => {
		const { title, content, isNotice, upload } = getValues();

		try {
			await apiPutBoardDetail({
				communityId,
				postId,
				title,
				content,
				isNotice,
				upload,
			}).then(res => {
				setPost(res.data);
			});
			await Swal.fire({
				icon: 'success',
				text: '성공',
			});
			setUpdating(false);
		} catch (e) {
			// error
			await Swal.fire({
				icon: 'error',
				text: '실패',
			});
		}
	};

	const contents = isUpdating ? (
		<ComMain>
			<Background>
				<TextTitle>글 수정</TextTitle>
				<Form onSubmit={handleSubmit(onValidSubmit)}>
					<Label htmlFor='title'>
						<input
							{...register('title', {
								required: true,
							})}
							type='title'
							placeholder='제목 없음'
						/>
					</Label>
					<Label htmlFor='isNotice'>
						공지여부
						<input {...register('isNotice')} type='checkbox' />
					</Label>
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
          <Label htmlFor='upload'>
            파일첨부
            <input {...register('upload')} type='file' multiple />
          </Label>
					<SubmitButton type='submit'>수정</SubmitButton>
				</Form>
			</Background>
		</ComMain>
	) : (
		<ComMain>
			<Background>
				<p>제목 : {post?.title}</p>
				<p>작성자 : {post?.author}</p>
				<p>작성시간 : {post?.date}</p>
				<p>내용 : {post?.content}</p>
				<p>첨부파일</p>
				<button type='button' onClick={() => setUpdating(true)}>
					수정
				</button>
				<button type='button' onClick={() => handleDelete()}>
					삭제
				</button>
			</Background>
		</ComMain>
	);

	return (
		<div>
			{contents}
			<p>댓글</p>
		</div>
	);
}

export default PostDetail;
