import styled from 'styled-components';
import { Link } from 'react-router-dom';

// a tag 관련 색상 설정(text decoration없애고 방문해도 색상 그대로)
const SLink = styled(Link)`
  text-decoration: none;
	color: inherit;
  width: 100%;
  :visited {
    color: inherit;
	}
`;

export default SLink;