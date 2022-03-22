import styled from 'styled-components';

const MainBtn = styled.button`
  background-color: none;
  font-size: 36px;
  padding: 18px 70px;
  border: 6px solid ${props => props.theme.fontColor};
  border-radius: 15px;
  margin: 40px 80px;
  cursor: pointer;
`

export default MainBtn;