import { useEffect } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import routes from '../../../routes';
import { createMinutesByData } from '../../../store/minutes';
import Container from '../../../components/community/Container';
import BlueMdBtn from '../../../components/common/BlueMdBtn';
import RedMdBtn from '../../../components/common/RedMdBtn';
import TextSubTitle from '../../../components/common/TextSubTitle';
import DivLine from '../../../components/community/main/DivLine';
import Form from '../../../components/auth/Form';
import Label from '../../../components/auth/Label';
import TextContent from '../../../components/common/TextContent';
import AreaLabel from '../../../components/auth/AreaLabel';
import ContentBox from '../../../components/community/minutes/create/ContentBox';
import DateTime from '../../../components/community/minutes/create/DateTime';
import InputFile from '../../../components/community/minutes/create/InputFile';
import LabelFile from '../../../components/community/minutes/create/LabelFile';

const CreateForm = styled(Form)`
	flex-direction: row;
	flex-wrap: wrap;
	align-items: center;
	background-color: inherit;
	width: 100%;
`;
const CreateContainer = styled(Container)`
	align-content: flex-start;
	align-items: center;
	width: 750px;
	height: auto;
	margin: 15px 20%;
`;
const InputLabel = styled(Label)`
	width: 600px;

	input {
		width: 100%;
	}
`;
const TextLabel = styled(AreaLabel)`
	margin-left: 10px;
	textarea {
		margin: 0;
		width: 650px;
	}
`;
const CompleteBtn = styled(BlueMdBtn)`
	margin-left: 350px;
`;
const CancelBtn = styled(RedMdBtn)`
	margin-left: 10px;
`;
const ErrorMsg = styled.div`
	padding-top: 5px;
	width: 670px;
	text-align: end;
	font-size: 15px;
	color: ${props => props.theme.warnColor};
`;
const Br = styled.div`
	width: 100%;
	margin-top: 10px;
`;
const TextUpload = styled(TextContent)`
	font-size: 16px;
`;

function MinutesUpdate() {
	// 필요한 함수 설정
	const { communityId } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	// 기본 데이터 입력
	const singleMinutes = useSelector(state => state.minutes.singleMinutes);
	// useform 설정
	const {
		register,
		handleSubmit,
		watch,
		getValues,
		formState: { errors },
	} = useForm({
		mode: 'onChange',
		defaultValues: singleMinutes,
	});
	// form 제출 로직
	function onValidSubmit(data) {
		const request = {
			comId: communityId,
			title: data.title,
			content: data.content,
			deadline: data.Dday,
			participants: [],
			reference_file: data.upload,
		};
		dispatch(createMinutesByData(request)).then(res => {
			const { community, id } = res.payload;
			navigate(`/community/${community}/minutes/${id}`);
		});
	}
	// 업로드 된 파일 표시하기 위한 변수
	const uploadedFiles = watch('upload');
	const fileList = uploadedFiles ? Object.values(uploadedFiles) : [];

	return (
		<CreateContainer>
			{/* 헤더 */}
			<TextSubTitle>회의록 작성</TextSubTitle>
			<CompleteBtn type='submit' form='createForm'>
				작성 완료
			</CompleteBtn>
			<CancelBtn
				onClick={() =>
					navigate(`${routes.community}/${communityId}/${routes.minutesList}`)
				}
			>
				작성 취소
			</CancelBtn>
			<DivLine />
			{/* 폼바디 */}
			<ContentBox>
				<CreateForm id='createForm' onSubmit={handleSubmit(onValidSubmit)}>
					{/* 제목 */}
					<TextContent>제목 :</TextContent>
					<InputLabel htmlFor='title'>
						<input
							{...register('title', {
								required: '제목을 입력해주세요.',
								maxLength: { value: 100, message: '100자 이내로 입력해주세요.' },
							})}
							type='title'
							placeholder='제목 없음'
						/>
					</InputLabel>
					<ErrorMsg>{errors?.title?.message}</ErrorMsg>
					<Br />
					{/* 참여자 */}
					<TextContent>참여자 : Member랑 연계필요</TextContent>
					<Br />
					{/* 종료일 */}
					<TextContent>
						종료일 :{' '}
						<DateTime
							{...register('deadline', {
								required: '회의 종료일을 입력해주세요',
							})}
							type='datetime-local'
						/>
						<ErrorMsg style={{ textAlign: 'center' }}>
							{errors?.Dday?.message}
						</ErrorMsg>
					</TextContent>
					<Br />
					<TextContent>회의 내용</TextContent>
					<Br />
					<TextLabel htmlFor='content'>
						<textarea
							{...register('content', {
								required: '내용을 입력해주세요.',
								maxLength: { value: 300, message: '300자 이내로 입력해주세요.' },
							})}
							cols='90'
							rows='10'
							placeholder='내용 없음'
						/>
					</TextLabel>
					<ErrorMsg>{errors?.content?.message}</ErrorMsg>
					<Br />
					<TextUpload>파일 첨부 : </TextUpload>
					<LabelFile htmlFor='file'>업로드</LabelFile>
					<InputFile
						{...register('upload')}
						id='file'
						type='file'
						multiple
						accept='.ppt, .pptx, .docs, .pdf, .word, .hwp, .png'
					/>
					<Br style={{ margin: '0' }} />
					{fileList.map(file => (
						<TextUpload>{file.name}</TextUpload>
					))}
				</CreateForm>
			</ContentBox>
		</CreateContainer>
	);
}

export default MinutesUpdate;
