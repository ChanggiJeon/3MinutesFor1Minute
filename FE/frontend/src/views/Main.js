import styled from 'styled-components';

const Test = styled.div`
  background-color: ${props => props.theme.backgroundColor};
  color: ${props => props.theme.fontColor};
`;

function Main () {
  return <Test>Hello~</Test>
}

export default Main