import styled from 'styled-components';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import routes from '../../../routes';
import Container from '../../../components/community/Container';
import TextSubTitle from '../../../components/common/TextSubTitle';
import DivLine from '../../../components/community/main/DivLine';
import BlueMdBtn from '../../../components/common/BlueMdBtn';
import { fetchMinutesByComId } from '../../../store/minutes';
import HeaderBox from '../../../components/community/HeaderBox';
import MinutesPagination from './MinutesPagination';
import MinutesItem from '../../../components/community/minutes/list/MinutesItem';
import NumBox from '../../../components/community/minutes/list/textBox/NumBox';
import TitleBox from '../../../components/community/minutes/list/textBox/TitleBox';
import DateBox from '../../../components/community/minutes/list/textBox/DateBox';
import AuthorBox from '../../../components/community/minutes/list/textBox/AuthorBox';
import DeadlineBox from '../../../components/community/minutes/list/textBox/DeadlineBox';

const Main = styled.div`
	display: flex;
	flex-wrap: wrap;
	align-content: center;
	justify-content: center;
	width: 100%;
	margin-bottom: 20px;
`;

const MinutesContainer = styled.div`
	align-content: flex-start;
	align-items: center;
	justify-content: center;
	width: 85%;
	display: flex;
	flex-wrap: wrap;
	background-color: #ffffff;
	border-radius: 50px;
	padding: 10px;
	margin-top: 20px;
`;
const CreateBtn = styled(BlueMdBtn)`
	margin-right: 20px;
`;

const ListBox = styled.ul`
	width: 100%;
	padding: 10px;
	margin-top: 10px;
`;
const Divider = styled(DivLine)`
	height: 1.5px;
	margin: 15px 0;
`;

const MainBox = styled.div`
	display: flex;
	width: 100%;
	padding: 10px;
`;

function MinutesList() {
	const { communityId } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchMinutesByComId(communityId));
	}, []);
	const [posts, setPosts] = useState([]);
	const [limit, setLimit] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);
	const offset = (currentPage - 1) * limit;
	const location = useLocation();

	useEffect(() => {
		dispatch(fetchMinutesByComId(communityId)).then(({ payload }) => {
			setPosts(payload);
		});
	}, [currentPage, location]);

	let cnt = posts.length - offset + 1;

	return (
		<Main>
			<MinutesContainer>
				<HeaderBox>
					<TextSubTitle>회의록 목록</TextSubTitle>
					<CreateBtn
						onClick={() =>
							navigate(`${routes.community}/${communityId}/${routes.minutesCreate}`)
						}
					>
						작성하기
					</CreateBtn>
				</HeaderBox>
				<DivLine />
				<MainBox>
					<ListBox>
						<NumBox>번호</NumBox>
						<TitleBox>제목</TitleBox>
						<DateBox>작성 일자</DateBox>
						<AuthorBox>작성자</AuthorBox>
						<DeadlineBox>D-day</DeadlineBox>
						<Divider />
						{posts[0] ? (
							[...posts]
								.reverse()
								.slice(offset, offset + limit)
								.map(minutes => (
									<MinutesItem
										no={(cnt -= 1)}
										key={minutes.id}
										minId={minutes.id}
										title={minutes.title}
										date={minutes.created_at}
										deadline={minutes.deadline}
										author={minutes.assignee.member.nickname}
										isClosed={minutes.is_closed}
									/>
								))
						) : (
							<TextSubTitle>회의록을 작성해주세요.</TextSubTitle>
						)}
					</ListBox>
				</MainBox>
				<MinutesPagination
					total={posts.length}
					limit={limit}
					page={currentPage}
					setPage={setCurrentPage}
				/>
			</MinutesContainer>
		</Main>
	);
}

export default MinutesList;
