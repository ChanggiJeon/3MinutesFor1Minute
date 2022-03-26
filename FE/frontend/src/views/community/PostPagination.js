import styled from 'styled-components';

const Nav = styled.nav`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 5px;
`;

const Button = styled.button`
	border: none;
	border-radius: 8px;
	padding: 8px;
	background: ${props => props.theme.sidebarColor};
	color: white;
	// font-size: 1rem;

	&:hover {
		background: ${props => props.theme.accentColor};
		cursor: pointer;
		transform: translateY(-2px);
	}

	&[disabled] {
		background: ${props => props.theme.sidebarColor};
		cursor: revert;
		transform: revert;
	}

	&[aria-current] {
		background: ${props => props.theme.accentColor};
		font-weight: bold;
		cursor: revert;
		transform: revert;
	}
`;

function PostPagination({ total, limit, page, setPage }) {
	const numPages = Math.ceil(total / limit);
  
	return (
		<Nav>
			<Button onClick={() => setPage(page - 1)} disabled={page === 1}>
				&lt;
			</Button>

			{numPages > 0 && Array(numPages)
				.fill()
				.map((_, i) => (
					<Button
						key={Math.random()}
						onClick={() => setPage(i + 1)}
						aria-current={page === i + 1 ? 'page' : null}
					>
						{i + 1}
					</Button>
				))}
			<Button onClick={() => setPage(page + 1)} disabled={page === numPages}>
				&gt;
			</Button>
		</Nav>
	);
}

export default PostPagination;
