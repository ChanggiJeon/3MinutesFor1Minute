import styled from 'styled-components';

const Table = styled.table`
	width: 100%;
	margin-top: 15px;

	thead {
		border-bottom: 1px solid black;
	}

	td {
		text-align: center;
	}

	th,
	td {
		padding: 15px;
    font-size: 17px;
	}
`;

export default Table;