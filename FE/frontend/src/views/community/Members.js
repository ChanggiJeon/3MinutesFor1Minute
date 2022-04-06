import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { FaUserCircle } from 'react-icons/fa';
import { apiGetCommunityMembers } from '../../api/community';
import Table from '../../components/common/Table';
import TextTitle from '../../components/common/TextTitle';

const Main = styled.div`
	display: flex;
	flex-direction: column;
	padding: 20px;
`;

const TableContainer = styled.div`
	height: 80%;

	img {
		width: 18px;
		height: 18px;
		object-fit: cover;
		border-radius: 50%;
	}

	a {
		text-decoration: none;
		color: inherit;
	}
`;

function Members() {
	const { communityId } = useParams();
	const [members, setMembers] = useState([]);

	const getMembers = async () => {
		try {
			const response = await apiGetCommunityMembers({ communityId });
			setMembers(response.data);
		} catch (e) {
			// error
		}
	};

	useEffect(() => getMembers(), [communityId]);

	return (
		<Main>
			<TextTitle>멤버 목록</TextTitle>
			<TableContainer>
				<Table>
					<thead>
						<tr>
							<th width='20%'>닉네임</th>
							<th width='50%'>소개</th>
							<th width='30%'>가입일</th>
						</tr>
					</thead>
					<tbody>
						{members.map(e => (
							<tr key={e.id}>
								<td>
									<Link to={`/community/${communityId}/member/${e.nickname}`}>
										{e.profile_image ? (
											<img
												src={`${process.env.REACT_APP_MEDIA_URL}${e.profile_image}`}
												alt=''
											/>
										) : (
											<FaUserCircle />
										)}
										{e.nickname}
										{e.is_admin && '[관리자]'}
										{!e.is_active && '[미승인]'}
									</Link>
								</td>
								<td>{e.bio}</td>
								<td>{e.created_at.split('T')[0].split('-').join('. ')}.</td>
							</tr>
						))}
					</tbody>
				</Table>
			</TableContainer>
		</Main>
	);
}

export default Members;
