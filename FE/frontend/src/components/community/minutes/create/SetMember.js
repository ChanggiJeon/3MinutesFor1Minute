import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { FaSearch } from 'react-icons/fa';
import Swal from 'sweetalert2';
import styled from 'styled-components';
import Label from '../../../auth/Label';
import Form from '../../../auth/Form';
import EmptyBtn from '../../../auth/EmptyBtn';
import Title from '../../../auth/Title';
import IconBtn from '../../../auth/IconBtn';
import BlueMdBtn from '../../../common/BlueMdBtn';
import EmptyMsg from '../../../auth/EmptyMsg';

const ResultContainer = styled.div`
	margin: 20px 0;
	font-size: 24px;
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
	justify-content: center;
	overflow: hidden;
	align-items: center;
	padding: 5px;

	button {
		padding: 5px;
		width: 100%;
	}
`;

const ResultBtn = styled(EmptyBtn)`
	font-size: 18px;

	:hover {
		background-color: ${props => props.theme.confirmColor}33;
	}
`;

const AddedMembers = styled.div`
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
	font-size: 20px;
`;

const AddedMemberContents = styled.div`
	display: flex;
	flex-wrap: wrap;
	margin: 5px;
`;

const AddedMemberBtn = styled(EmptyBtn)`
	margin-right: 5px;
	font-size: 18px;
`;

function SetMember({ setMode, members, setMembers }) {
	const { member_set: memberSet } = useSelector(state => state.community);
	const { id } = useSelector(state => state.member);
	const [keyword, setKeyword] = useState('');

	const addMember = target => {
		if (id === target.id) {
			Swal.fire({
				icon: 'info',
				text: '작성자 본인은 자동으로 추가됩니다.',
			});
		} else if (!members.some(e => e.id === target.id)) {
			setMembers([...members, target]);
		}
	};

	const handleName = e => setKeyword(e.target.value);

	const deleteMember = e => setMembers(members.filter(el => el.id !== e.id));

	const formContents = (
		<Label htmlFor='name'>
			<FaSearch />
			<input type='name' placeholder='닉네임으로 찾기' onInput={handleName} />
		</Label>
	);

	const searchResults = (
		<ResultContainer>
			멤버 목록
			<ResultWrapper>
				<ResultList>
					{memberSet
						?.filter(e => e.nickname.indexOf(keyword) !== -1 && e.id !== id)
						?.map(e => (
							<ResultBtn type='button' key={e.id} onClick={() => addMember(e)}>
								{e?.nickname}
							</ResultBtn>
						))}
				</ResultList>
			</ResultWrapper>
		</ResultContainer>
	);

	return (
		<Form>
			<Title>회의 대상자 추가</Title>
			{formContents}
			{searchResults}
			<AddedMembers>
				<AddedMemberContents>추가된 멤버(클릭하여 제거)</AddedMemberContents>
				<AddedMemberContents>
					{members.map(e => (
						<AddedMemberBtn key={e.id} type='button' onClick={() => deleteMember(e)}>
							{e.nickname}
						</AddedMemberBtn>
					))}
				</AddedMemberContents>
			</AddedMembers>
			<EmptyMsg />
			<BlueMdBtn type='button' onClick={() => setMode(false)}>
				추가 완료
			</BlueMdBtn>
		</Form>
	);
}

export default SetMember;
