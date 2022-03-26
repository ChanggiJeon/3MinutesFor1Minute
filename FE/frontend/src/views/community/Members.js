import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { apiGetCommunityMembers } from '../../api/community';

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
		<table>
			<thead>
				<tr>
					<th>닉네임</th>
					<th>소개</th>
					<th>가입일</th>
				</tr>
			</thead>
			<tbody>
				{members.map(e => (
					<tr key={e.id}>
						<td>
							<FaUserCircle />
						</td>
						<td>{e.nickname}</td>
						<td>{e.bio}</td>
						<td>{e.created_at}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}

export default Members;
