import { useDispatch, useSelector } from 'react-redux';
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
import UpdateProfile from '../../components/community/member/UpdateProfile';
import { updateMemberData } from '../../store/member';

const ProfileImgContainer = styled.div`
	border-radius: 50%;
	align-self: center;

	svg,
	img {
		width: 250px;
		height: 250px;
		border-radius: 50%;
	}
`;

const Container = styled.div`
	display: flex;
	flex-direction: column;
`;

const BioContainer = styled.div`
	width: 250px;
	line-height: 25px;
`;

function MemberProfile() {
	const { id } = useSelector(state => state.member);
	const { communityId, memberId } = useParams();
	const navigate = useNavigate();
	const [updateMode, setUpdateMode] = useState('');
	const [member, setMember] = useState({});
	const dispatch = useDispatch();

	const getMember = async () => {
		const response = await apiGetMemberProfile({ communityId, memberId });
		setMember(response.data);
	};

	useEffect(() => {
		if (memberId) {
			getMember();
		}
	}, [memberId, communityId]);

	useEffect(() => {
		if (parseInt(memberId, 10) === id) {
			dispatch(updateMemberData({ ...member }));
		}
	}, [member]);

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
			<SubmitButton type='button' onClick={() => toggleMode('profile')}>
				프로필 사진 변경
			</SubmitButton>
			<SubmitButton type='button' onClick={handleWithdraw}>
				커뮤니티 탈퇴
			</SubmitButton>
		</Container>
	);

	const updateForm = () => {
		if (updateMode === 'info') {
			return <UpdateMember toggleMode={toggleMode} getMember={getMember} />;
		}
		if (updateMode === 'profile') {
			return <UpdateProfile toggleMode={toggleMode} getMember={getMember} />;
		}
		return null;
	};

	return (
		<Divider>
			<FormContainer>
				<Form>
					<ProfileImgContainer>
						{member.profile_image ? (
							<img
								src={`${process.env.REACT_APP_API_URL}${member.profile_image}`}
								alt=''
							/>
						) : (
							<FaUserCircle />
						)}
					</ProfileImgContainer>
					<TextTitle>{member.nickname}</TextTitle>
					<BioContainer>
						<IoMdText />
						{member.bio}
					</BioContainer>
					{updateBtns}
				</Form>
			</FormContainer>
			{updateForm()}
		</Divider>
	);
}

export default MemberProfile;
