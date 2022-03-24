import styled from 'styled-components'

const SidebarMenu = styled.ul`
  width: 250px;
  height: 100%;
  background-color: ${props => `${props.theme.sidebarColor}`};
  position: fixed;
  top: 80px;
  box-shadow: 5px 0px 10px rgba(0, 0, 0, 0.15);
`

export default SidebarMenu