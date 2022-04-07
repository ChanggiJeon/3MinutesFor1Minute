import React, { useEffect, useState } from 'react';
import { AiFillNotification } from 'react-icons/ai';
import styled from 'styled-components';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import dayjs from 'dayjs';
import { apiGetBoards } from '../../api/board';
import routes from '../../routes';
import Table from '../../components/common/Table';
import ComMain from '../../components/community/MainStart';
import SLink from '../../components/community/board/list/SLink';
import Header from '../../components/community/board/list/Header';
import BoardTitle from '../../components/community/board/list/BoardTitle';
import PostPagination from './PostPagination';
import BlueMdBtn from '../../components/common/BlueMdBtn';

const TableContainer = styled.div`
	margin-bottom: 20px;
`;
const CreateBtn = styled(BlueMdBtn)`
	margin-right: 20px;
`;
const Background = styled.div`
  width: 96%;
  padding-bottom: 15px;
  margin: 20px;
  background-color: inherit;

`

function Posts() {
	// const posts = useSelector((state) => state.posts)
	const { communityId } = useParams();
	const [posts, setPosts] = useState([]);
	const [notices, setNotices] = useState([]);
	const [limit, setLimit] = useState(5);
	const [currentPage, setCurrentPage] = useState(1);
	const offset = (currentPage - 1) * limit;
	const location = useLocation();

	const navigate = useNavigate();

	useEffect(() => {
		getPosts(currentPage);
	}, [currentPage, location]);

	const getPosts = async page => {
		try {
			await apiGetBoards({ communityId }).then(res => {
				setPosts(res.data.filter(post => post.is_notice === false).reverse());
				setNotices(res.data.filter(post => post.is_notice === true));
			});
		} catch (e) {
			// error
		}
	};

	return (
		<ComMain>
			{/* 커뮤니티 이름 */}
			<Background>
				<Header>
					<BoardTitle>글 목록</BoardTitle>
					<CreateBtn
						onClick={() =>
							navigate(`${routes.community}/${communityId}/${routes.postCreate}`)
						}
					>
						작성하기
					</CreateBtn>
				</Header>
				<TableContainer>
					<Table>
						<thead>
							<tr>
								<th width='20%'>No.</th>
								<th width='40%'>Title</th>
								<th width='20%'>Date</th>
								<th width='20%'>Author</th>
							</tr>
						</thead>
						<tbody>
							{notices
								.reverse()
								.map(post => (
									<tr key={post.id}>
										<td>
											<AiFillNotification />
										</td>
										<td>
											<SLink
												to={`${routes.community}/${communityId}/${routes.posts}/${post.id}`}
											>
												{post.title}
											</SLink>
										</td>
										<td>{dayjs(post.created_at).format('YYYY-MM-DD')}</td>
										<td>{post.member.nickname}</td>
									</tr>
								))}
							{posts
								.slice(offset, offset + limit)
								.map(post => (
									<tr key={post.id}>
										<td>{post.id}</td>
										<td>
											<SLink
												to={`${routes.community}/${communityId}/${routes.posts}/${post.id}`}
											>
												{post.title}
											</SLink>
										</td>
										<td>{dayjs(post.created_at).format('YYYY-MM-DD')}</td>
										<td>{post.member.nickname}</td>
									</tr>
								))}
						</tbody>
					</Table>
				</TableContainer>
				<PostPagination
					total={posts.length}
					limit={limit}
					page={currentPage}
					setPage={setCurrentPage}
				/>
			</Background>
		</ComMain>
	);
}

export default Posts;
