import { useEffect, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Divider from '../components/auth/Divider';
import Form from '../components/auth/Form';
import FormContainer from '../components/auth/FormContainer';
import SubmitButton from '../components/auth/SubmitButton';
import TextSubTitle from '../components/common/TextSubTitle';
import TextTitle from '../components/common/TextTitle';
import UpdatePassword from '../components/main/UpdatePassword';
import Withdraw from '../components/main/Withdraw';
import routes from '../routes';

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

function Profile() {
	const {
		id: userId,
		username,
		name,
		email,
		profile_image: profileImage,
	} = useSelector(state => state.user);
	const { id } = useParams();
	const navigate = useNavigate();
	const [updateMode, setUpdateMode] = useState('');

	useEffect(() => {
		if (userId === 0) {
			navigate(routes.main);
		}
		if (id && userId && userId !== parseInt(id, 10)) {
			navigate(routes.main);
		}
	}, [id, userId]);

	const toggleMode = modename => {
		if (updateMode === modename) {
			setUpdateMode('');
		} else {
			setUpdateMode(modename);
		}
	};

	const updateBtns = userId === parseInt(id, 10) && (
		<Container>
			<SubmitButton type='button' onClick={() => toggleMode('password')}>
				비밀번호 변경
			</SubmitButton>
			{/* <SubmitButton type='button' onClick={() => toggleMode('profile')}>
				프로필 사진 변경
			</SubmitButton> */}
			<SubmitButton type='button' onClick={() => toggleMode('withdraw')}>
				회원 탈퇴
			</SubmitButton>
		</Container>
	);

	const updateForm = () => {
		if (updateMode === 'password') {
			return <UpdatePassword />;
		}
		if (updateMode === 'withdraw') {
			return <Withdraw />;
		}
		return null;
	};

	return (
		<Divider>
			<FormContainer>
				<Form>
					<ProfileImgContainer>
						{profileImage ? <img src={profileImage} alt='' /> : <FaUserCircle />}
					</ProfileImgContainer>
					<TextTitle>{name}</TextTitle>
					<span>@{username}</span>
					<TextSubTitle>
						<MdEmail />
						{email}
					</TextSubTitle>
					{updateBtns}
				</Form>
			</FormContainer>
			{updateForm()}
		</Divider>
	);
}

export default Profile;
