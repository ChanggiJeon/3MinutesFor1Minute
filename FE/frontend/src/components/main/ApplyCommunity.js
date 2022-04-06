import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaSearch } from 'react-icons/fa';
import Swal from 'sweetalert2';
import styled from 'styled-components';
import Form from '../auth/Form';
import IconBtn from '../auth/IconBtn';
import Label from '../auth/Label';
import RadioContainer from '../auth/RadioContainer';
import Title from '../auth/Title';
import EmptyBtn from '../auth/EmptyBtn';
import {
	apiSearchCommunityByCode,
	apiSearchCommunityByName,
} from '../../api/community';
import JoinCommunity from './JoinCommunity';

const ResultContainer = styled.div`
	margin: 20px 0;
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
		margin-bottom: 10px;
	}
`;

const ResultBtn = styled(EmptyBtn)`
	font-size: 18px;
`;

function ApplyCommunity({ setMode, getList }) {
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
		getValues,
		setValue,
	} = useForm({
		mode: 'all',
	});
	const [searchMode, setSearchMode] = useState('codeMode');
	const [results, setResults] = useState([]);
	const [target, setTarget] = useState({});

	const handleMode = e => {
		setSearchMode(e.target.value);
		setValue('name', null);
		setValue('code', null);
	};

	const onValidSubmit = async () => {
		const { code, name } = getValues();

		try {
			if (searchMode === 'codeMode') {
				await apiSearchCommunityByCode({ code }).then(res => {
					setResults([res.data]);
				});
			} else if (searchMode === 'nameMode') {
				await apiSearchCommunityByName({ name }).then(res => {
					setResults(res.data);
				});
			}
		} catch (e) {
			// error
			Swal.fire({
				icon: 'info',
				text: '검색 결과가 없습니다.',
			});
		}
	};

	const formContents =
		searchMode === 'codeMode' ? (
			<Label htmlFor='code'>
				<input {...register('code')} type='code' placeholder='참여코드' />
				<IconBtn>
					<FaSearch />
				</IconBtn>
			</Label>
		) : (
			<Label htmlFor='name'>
				<input {...register('name')} type='name' placeholder='이름' />
				<IconBtn>
					<FaSearch />
				</IconBtn>
			</Label>
		);

	const searchResults = (
		<ResultContainer>
			검색된 커뮤니티
			<ResultWrapper>
				<ResultList>
					{results?.map(e => (
						<ResultBtn key={e.id} onClick={() => setTarget(e)}>
							{e?.name}
						</ResultBtn>
					))}
				</ResultList>
			</ResultWrapper>
		</ResultContainer>
	);

	const applyContents = (
		<Form onSubmit={handleSubmit(onValidSubmit)}>
			<Title>커뮤니티 가입</Title>
			<RadioContainer>
				<label htmlFor='codeMode'>
					<input
						{...register('searchMode')}
						onClick={handleMode}
						checked={searchMode === 'codeMode'}
						type='radio'
						value='codeMode'
						id='codeMode'
					/>
					<span>참여코드</span>
				</label>
				<label htmlFor='nameMode'>
					<input
						{...register('mode')}
						onClick={handleMode}
						checked={searchMode === 'nameMode'}
						type='radio'
						value='nameMode'
						id='nameMode'
					/>
					<span>이름</span>
				</label>
			</RadioContainer>
			{formContents}
			{searchResults}
		</Form>
	);

	return target?.id ? (
		<JoinCommunity setMode={setMode} getList={getList} target={target} />
	) : (
		applyContents
	);
}

export default ApplyCommunity;
