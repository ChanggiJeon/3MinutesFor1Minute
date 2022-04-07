import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import {
	FaUserCircle,
	FaSearch,
	FaUserSlash,
	FaUserCheck,
} from 'react-icons/fa';
import {
	apiApproveMember,
	apiDeleteCommunity,
	apiDeleteMember,
	apiGetCommunityMembers,
	apiInviteUser,
	apiSearchUser,
} from '../../api/community';
import Table from '../../components/common/Table';
import Form from '../../components/auth/Form';
import Label from '../../components/auth/Label';
import IconBtn from '../../components/auth/IconBtn';
import EmptyBtn from '../../components/auth/EmptyBtn';
import routes from '../../routes';
import TextSubTitle from '../../components/common/TextSubTitle';
import TextTitle from '../../components/common/TextTitle';
import UpdateCommunity from '../../components/community/admin/UpdateCommunity';
import UpdateImage from '../../components/community/admin/UpdateImage';

const Divider = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;

	label {
		max-width: 300px;
	}
`;

const AdminContainer = styled.div`
	padding: 20px;
`;

const AdminContents = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;

	button {
		height: 30px;
		background-color: ${props => props.theme.accentColor};
		color: ${props => props.theme.subFontColor};
	}
`;

const Main = styled.div`
	display: flex;
	flex-direction: column;
	padding: 20px;
`;

const TableContainer = styled.div`
	height: 100%;

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

const ResultContainer = styled.div`
	margin: 20px 0;
	max-width: 350px;
`;

const ResultWrapper = styled.div`
	height: 200px;
	overflow-y: scroll;
	margin-top: 20px;
	border: 1px solid black;
	border-radius: 5px;
`;

const ResultList = styled.div`
	display: flex;
	flex-direction: column;
	overflow: hidden;
	align-items: start;
	padding: 5px;

	button {
		width: 100%;
		padding: 5px;

		&:hover {
			background-color: ${props => props.theme.confirmColor}33;
		}
	}
`;

const ResultBtn = styled(EmptyBtn)`
	font-size: 18px;
`;

function Admin() {
	const { is_admin: isAdmin } = useSelector(state => state.member);
	const { communityId } = useParams();
	const navigate = useNavigate();
	const location = useLocation();
	const [members, setMembers] = useState([]);
	const [result, setResult] = useState([]);
	const {
		register,
		getValues,
		handleSubmit,
		formState: { isValid },
	} = useForm({
		mode: 'all',
	});
	const [isUpdateMode, setUpdateMode] = useState(false);
	const [isImageMode, setImageMode] = useState(false);

	const onValidSubmit = async () => {
		const { keyword } = getValues();
		try {
			const response = await apiSearchUser({ keyword });
			setResult(response.data);
		} catch (e) {
			// error
			setResult([]);
			Swal.fire({
				icon: 'info',
				text: '검색 결과가 없습니다.',
			});
		}
	};

	const handleInvite = async e => {
		const { id, name } = e;

		try {
			await apiInviteUser({ communityId, id });
			Swal.fire({
				icon: 'success',
				text: `${name}님을 초대하였습니다.`,
			});
			getMembers();
		} catch (error) {
			// error
			Swal.fire({
				icon: 'info',
				text: `${error.response.data}`,
			});
		}
	};

	const handleDeleteMember = async e => {
		const { id, nickname } = e;

		try {
			const res = await Swal.fire({
				icon: 'warning',
				text: `${nickname}님을 추방하시겠습니까?`,
				showCancelButton: true,
				confirmButtonText: '추방',
				cancelButtonText: '취소',
			});
			if (res.isConfirmed) {
				await apiDeleteMember({ communityId, memberId: id });
				Swal.fire({
					icon: 'info',
					text: `${nickname}님이 추방되었습니다.`,
				});
			}
			getMembers();
		} catch (error) {
			// error
		}
	};

	const handleApproveMember = async e => {
		const { id, nickname } = e;

		try {
			// api
			await apiApproveMember({ communityId, memberId: id });
			Swal.fire({
				icon: 'success',
				text: `${nickname} 님의 가입이 승인되었습니다.`,
			});
			getMembers();
		} catch (error) {
			// error
		}
	};

	const handleDeleteCommunity = async () => {
		try {
			const res = await Swal.fire({
				icon: 'warning',
				text: '커뮤니티를 삭제하시겠습니까? "삭제하겠습니다"를 입력하세요.',
				input: 'text',
				showCancelButton: true,
				confirmButtonText: '삭제',
				cancelButtonText: '취소',
			});
			if (res.isConfirmed) {
				if (res.value === '삭제하겠습니다') {
					await apiDeleteCommunity({ communityId });
					await Swal.fire({
						icon: 'info',
						text: '삭제되었습니다.',
					});
					navigate(routes.main);
				}
			}
		} catch (e) {
			// error
			if (e.response.status === 500) {
				Swal.fire({
					icon: 'error',
					text: '커뮤니티 삭제에 오류가 발생했습니다.',
				});
			}
		}
	};

	const getMembers = async () => {
		try {
			const response = await apiGetCommunityMembers({ communityId });
			setMembers(response.data);
		} catch (e) {
			// error
		}
	};

	useEffect(() => {
		if (!isAdmin) {
			navigate(`/community/${communityId}`);
		}
		getMembers();
	}, [communityId, location, isAdmin]);

	const searchResults = (
		<ResultContainer>
			검색된 유저
			<ResultWrapper>
				<ResultList>
					{result?.map(e => (
						<ResultBtn key={e.id} onClick={() => handleInvite(e)}>
							{e?.name} - {e?.username}
						</ResultBtn>
					))}
				</ResultList>
			</ResultWrapper>
		</ResultContainer>
	);

	return (
		<Main>
			<Divider>
				<Form onSubmit={handleSubmit(onValidSubmit)}>
					<TextTitle>멤버 초대</TextTitle>
					<Label htmlFor='keyword'>
						<input
							{...register('keyword', {
								required: true,
							})}
							type='text'
							placeholder='이름, 아이디로 초대하기'
						/>
						<IconBtn type='submit' disabled={!isValid}>
							<FaSearch />
						</IconBtn>
					</Label>
					{result.length > 0 && searchResults}
				</Form>
				<AdminContainer>
					<TextTitle>커뮤니티 관리</TextTitle>
					<AdminContents>
						<TextSubTitle>커뮤니티 정보 변경</TextSubTitle>
						<button type='button' onClick={() => setUpdateMode(true)}>
							변경
						</button>
					</AdminContents>
					<AdminContents>
						<TextSubTitle>커뮤니티 이미지 변경</TextSubTitle>
						<button type='button' onClick={() => setImageMode(true)}>
							변경
						</button>
					</AdminContents>
					<AdminContents>
						<TextSubTitle>커뮤니티 삭제</TextSubTitle>
						<button type='button' onClick={handleDeleteCommunity}>
							삭제
						</button>
					</AdminContents>
				</AdminContainer>
			</Divider>
			<TableContainer>
				<TextTitle>멤버 관리</TextTitle>
				<Table>
					<thead>
						<tr>
							<th width='25%'>닉네임</th>
							<th width='45%'>소개</th>
							<th width='10%'>관리</th>
							<th width='20%'>가입일</th>
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
								<td>
									{!e.is_active && (
										<IconBtn
											title='가입 승인'
											type='button'
											style={{ color: 'blue' }}
											onClick={() => handleApproveMember(e)}
										>
											<FaUserCheck />
										</IconBtn>
									)}
									{!e.is_admin && (
										<IconBtn
											title='추방'
											type='button'
											style={{ color: 'red' }}
											onClick={() => handleDeleteMember(e)}
										>
											<FaUserSlash />
										</IconBtn>
									)}
								</td>
								<td>{e.created_at.split('T')[0].split('-').join('. ')}.</td>
							</tr>
						))}
					</tbody>
				</Table>
			</TableContainer>
			{isUpdateMode && <UpdateCommunity setMode={setUpdateMode} />}
			{isImageMode && <UpdateImage setMode={setImageMode} />}
		</Main>
	);
}

export default Admin;
