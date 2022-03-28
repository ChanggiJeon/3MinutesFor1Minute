import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import { apiGetBoards } from '../../api/board';
import routes from '../../routes';
import Table from '../../components/common/Table';
import ComMain from '../../components/community/MainStart';
import Background from '../../components/community/board/list/Background';
import BackBtn from '../../components/community/board/list/BackBtn';
import WriteBtn from '../../components/community/board/list/WriteBtn';
import SLink from '../../components/community/board/list/SLink';
import Header from '../../components/community/board/list/Header';
import BoardTitle from '../../components/community/board/list/BoardTitle';
import PostPagination from './PostPagination';

const TableContainer = styled.div`
  height: 80%;
`

function Posts() {
	// const posts = useSelector((state) => state.posts)
	const { communityId } = useParams();
	const [posts, setPosts] = useState([]);
	const [limit, setLimit] = useState(10);
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
				setPosts(res.data);
			});
		} catch (e) {
			// error
		}
	};

	return (
		<ComMain>
			Community Title
			<Background>
				<Header>
					<BoardTitle>글 목록</BoardTitle>
					<WriteBtn onClick={() => navigate(`${routes.community}/${communityId}/${routes.postCreate}`)}>
							작성하기
					</WriteBtn>
				</Header>
        <TableContainer>
				<Table>
					<thead>
						<tr>
							<th width='20%'>ID</th>
							<th width='40%'>Title</th>
							<th width='20%'>Date</th>
							<th width='20%'>Author</th>
						</tr>
					</thead>
					<tbody>
						{posts.slice(offset, offset + limit).map(post => (
							<tr key={post.id}>
								<td>{post.id}</td>
								<td>
                  <SLink to={`${routes.community}/${communityId}/${routes.posts}/${post.id}`}>
										{post.title}
									</SLink>
								</td>
								<td>{post.date}</td>
								<td>{post.author}</td>
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
