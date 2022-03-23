import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { apiGetBoards } from '../../api/board';
import routes from '../../routes';
import Container from '../../components/common/Container';
import TextTitle from '../../components/common/TextTitle';


function Posts () {
  // const posts = useSelector((state) => state.posts)
  // const { communityId } = useParams();
  const communityId = 1;
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  
  useEffect(() => {
    getPosts(page);
  }, [page]);

  const getPosts = async (page) => {
    try {
      await apiGetBoards({ communityId }).then(res => {
        setPosts(res.data);
      });
    } catch (e) {
      // error
    }
  }

  return (
  <Container>
    <TextTitle>글 목록</TextTitle>
    <table>
      <thead>
    <tr>
      <th width="20%">ID</th>
      <th width="40%">Title</th>
      <th width="20%">Date</th>
      <th width="20%">Author</th>
    </tr>
    </thead>
    <tbody>
    {
      posts.map((post) =>
        ( <tr key={post.id}>
            <td>{post.id}</td>
            <td>
              <Link to={{ pathname: `/postdetail/${post.id}`}}>
                {post.title}
              </Link>
            </td>
            <td>{post.date}</td>
            <td>{post.author}</td>
          </tr>
        )
      )
    }
    </tbody>
    </table>
    <Link to={routes.postCreate}>작성하기</Link>
  </Container>
  )
}

export default Posts