import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { detailMinutesById, deleteMinutesById } from '../../../store/minutes';
import routes from '../../../routes';
import Container from '../../../components/community/Container';
import Main from '../../../components/community/MainStart';
import TextSubTitle from '../../../components/common/TextSubTitle';
import TextContent from '../../../components/common/TextContent';
import DivLine from '../../../components/community/main/DivLine';
import ContentBox from '../../../components/common/ContentBox';
import HeaderBox from '../../../components/community/HeaderBox';
import BlueMdBtn from '../../../components/common/BlueMdBtn';
import RedMdBtn from '../../../components/common/RedMdBtn';
import BtnBox from '../../../components/community/BtnBox';

const ContentsContainer = styled(Container)`
	flex-direction: column;
	border-radius: 15px;
	margin-top: 15px;
	width: 50%;
	height: 600px;
	overflow-y: scroll;
`;
const SpeechContainer = styled(Container)`
	flex-direction: column;
	align-content: flex-start;
	border-radius: 15px;
	margin-top: 15px;
	width: 40%;
`;
const TopBtnBox = styled(BtnBox)`
	width: 60%;
`;
const UpdateBtn = styled(BlueMdBtn)`
	margin-right: 10px;
`;
const DeleteBtn = styled(RedMdBtn)`
	margin-right: 10px;
`;
const SpeechBox = styled.div`
	display: flex;
	flex-direction: column;
	height: 500px;
`;
const SpeechCreateBtn = styled(BlueMdBtn)`
	margin-right: 10px;
`;

function MinutesDetail() {
	const [isDeleted, setIsDeleted] = useState(undefined);
	const params = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	// 리덕스에서 데이터 받아오기
	useEffect(() => {
		dispatch(detailMinutesById(params));
	}, []);
	const singleMinutes = useSelector(state => state.minutes.singleMinutes);
	const deleteMinutes = () => {
		setIsDeleted('deleted');
	};
	useEffect(() => {
		if (isDeleted) {
			dispatch(deleteMinutesById(params)).then(
				navigate(`/community/${params.communityId}/minutes/`)
			);
		}
	}, [isDeleted]);

	return (
		<Main>
			<ContentsContainer>
				<HeaderBox>
					<TextSubTitle>회의 내용</TextSubTitle>
					<TopBtnBox>
						<UpdateBtn
							onClick={() =>
								navigate(
									`${routes.community}/${params.communityId}/minutes/${params.minutesId}/update`
								)
							}
						>
							수정
						</UpdateBtn>
						<DeleteBtn onClick={deleteMinutes}>삭제</DeleteBtn>
					</TopBtnBox>
				</HeaderBox>
				<DivLine />
				<TextContent>작성 일자 : {singleMinutes.createdAt}</TextContent>
				<TextContent>작성자 : {singleMinutes.author}</TextContent>
				<TextContent>회의 제목 : {singleMinutes.title}</TextContent>
				<TextContent>
					참여자 :
					{singleMinutes.participants.map(p => (
						<TextContent key={p}>{p}</TextContent>
					))}
				</TextContent>
				<TextContent>종료 일자 : {singleMinutes.Dday}</TextContent>
				<TextContent>회의 내용</TextContent>
				<ContentBox>{singleMinutes.content}</ContentBox>
				<TextContent>첨부 파일 : {singleMinutes.referenceFile}</TextContent>
			</ContentsContainer>
			<SpeechContainer>
				<HeaderBox>
					<TextSubTitle>스피치</TextSubTitle>
				</HeaderBox>
				<DivLine />
				<SpeechBox>speech</SpeechBox>
				<BtnBox>
					<SpeechCreateBtn
						onClick={() =>
							navigate(
								`${routes.community}/${params.communityId}/minutes/${params.minutesId}/recordCreate`
							)
						}
					>
						스피치 등록
					</SpeechCreateBtn>
				</BtnBox>
			</SpeechContainer>
		</Main>
	);
}

export default MinutesDetail;
