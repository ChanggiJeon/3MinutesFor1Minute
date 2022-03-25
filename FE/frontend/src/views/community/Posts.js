import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { apiGetBoards } from '../../api/board';
import routes from '../../routes';
import Container from '../../components/common/Container';
import TextTitle from '../../components/common/TextTitle';
import ComMain from '../../components/community/main/ComMain';
import SubmitButton from '../../components/auth/SubmitButton';
import Background from '../../components/community/board/list/Background';
import Header from '../../components/community/board/list/Header';
import Board from '../../components/community/board/list/Board';

const Table = styled.table`
	width: 100%;
  height: 100%;

	thead {
		border-bottom: 1px solid black;
	}

	td {
		text-align: center;
	}

	th,
	td {
		padding: 10px;
	}
`;

const SLink = styled(Link)`
  text-decoration: none;
	color: inherit;
  
  :visited {
    color: inherit;
	}
`;

function Posts() {
	// const posts = useSelector((state) => state.posts)
	// const { communityId } = useParams();
	const communityId = 1;
	const [posts, setPosts] = useState([]);
	const [page, setPage] = useState(1);

	useEffect(() => {
		getPosts(page);
	}, [page]);

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
			SSAMSUNG
			<Background>
				<Header>
					<TextTitle>글 목록</TextTitle>
					<SLink to={`${routes.community}/${communityId}${routes.postCreate}`}>작성하기</SLink>
				</Header>
				<Board>
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
							{posts.map(post => (
								<tr key={post.id}>
									<td>{post.id}</td>
									<td>
										<SLink to={`${routes.community}/${communityId}${routes.postDetail}/${post.id}`}>{post.title}</SLink>
									</td>
									<td>{post.date}</td>
									<td>{post.author}</td>
								</tr>
							))}
						</tbody>
					</Table>
				</Board>
			</Background>
		</ComMain>
	);
}

export default Posts;
