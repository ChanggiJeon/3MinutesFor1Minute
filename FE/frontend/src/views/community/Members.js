import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { FaUserCircle } from 'react-icons/fa';
import { apiGetCommunityMembers } from '../../api/community';
import Table from '../../components/common/Table';

const Main = styled.div`
	display: flex;
	flex-direction: column;
	padding: 20px;
`;

const TableContainer = styled.div`
	height: 80%;
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
									{e.profile_image ? (
										<img src={e.profile_image} alt='' />
									) : (
										<FaUserCircle />
									)}
									{e.nickname}
									{e.is_admin && '[관리자]'}
									{!e.is_active && '[미승인]'}
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
