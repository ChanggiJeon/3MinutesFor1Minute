import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { FaUserCircle } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { IoMdText } from 'react-icons/io';
import styled from 'styled-components';
import Divider from '../../components/auth/Divider';
import Form from '../../components/auth/Form';
import FormContainer from '../../components/auth/FormContainer';
import TextSubTitle from '../../components/common/TextSubTitle';
import TextTitle from '../../components/common/TextTitle';
import { apiGetMemberProfile, apiWithdrawMember } from '../../api/community';
import SubmitButton from '../../components/auth/SubmitButton';
import routes from '../../routes';
import UpdateMember from '../../components/community/member/UpdateMember';

const ProfileImgContainer = styled.div`
	border-radius: 50%;
	align-self: center;

	svg,
	img {
		width: 250px;
		height: 250px;
	}
`;

const Container = styled.div`
	display: flex;
	flex-direction: column;
`;

function MemberProfile() {
	const { id, nickname, bio, image } = useSelector(state => state.member);
	const { communityId, memberId } = useParams();
	const navigate = useNavigate();
	const [updateMode, setUpdateMode] = useState('');
	const [member, setMember] = useState({});

	const getMember = async () => {
		const response = await apiGetMemberProfile({ communityId, memberId });
		setMember(response.data);
	};

	useEffect(() => {
		if (memberId) {
			getMember();
		}
	}, [memberId, communityId]);

	const toggleMode = modename => {
		if (updateMode === modename) {
			setUpdateMode('');
		} else {
			setUpdateMode(modename);
		}
	};

	const handleWithdraw = async () => {
		try {
			const res = await Swal.fire({
				icon: 'warning',
				text: '커뮤니티 탈퇴를 진행하시겠습니까?',
				showCancelButton: true,
				confirmButtonText: '탈퇴',
				cancelButtonText: '취소',
			});
			if (res.isConfirmed) {
				await apiWithdrawMember({ communityId, memberId });
				await Swal.fire({
					icon: 'success',
					text: '커뮤니티에서 탈퇴되었습니다.',
				});
				navigate(routes.main);
			}
		} catch (e) {
			// error
		}
	};

	const updateBtns = id === parseInt(memberId, 10) && (
		<Container>
			<SubmitButton type='button' onClick={() => toggleMode('info')}>
				멤버 정보 변경
			</SubmitButton>
			{/* <SubmitButton type='button' onClick={() => toggleMode('profile')}>
				프로필 사진 변경
			</SubmitButton> */}
			<SubmitButton type='button' onClick={handleWithdraw}>
				커뮤니티 탈퇴
			</SubmitButton>
		</Container>
	);

	const updateForm = () => {
		if (updateMode === 'info') {
			return <UpdateMember toggleMode={toggleMode} />;
		}
		return null;
	};

	return (
		<Divider>
			<FormContainer>
				<Form>
					<ProfileImgContainer>
						<FaUserCircle />
					</ProfileImgContainer>
					<TextTitle>{member.nickname}</TextTitle>
					<TextSubTitle>
						<IoMdText />
						{member.bio}
					</TextSubTitle>
					{updateBtns}
				</Form>
			</FormContainer>
			{updateForm()}
		</Divider>
	);
}

export default MemberProfile;
