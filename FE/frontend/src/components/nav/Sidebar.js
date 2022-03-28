import styled from 'styled-components'
import sidebarData from './SidebarData'
import SidebarMenu from './SidebarMenu'
import SideItems from './SideItmes'
import SideItemLinks from './SideItemLinks'
import SideItem from './SideItem'

const SubText = styled.h3`
  font-size: 20px;
  margin-left: 30px;
` 

const SideSubItemLinks = styled(SideItemLinks)`
  padding: 0 0.5rem;
  width: 70%;
  height: 25%;
  font-size: 20px;
`

function Sidebar() {
  const dataSet = sidebarData()

  return (
    <SidebarMenu>
      {dataSet.map((item) => (
        item.name === 'Minutes' ? (
          <SideItem key={item.name}>
            {item.icon}
            <span style={{marginLeft: '16px'}}>{item.title}</span>
            <SideSubItemLinks to={item.path.List}>
              <SubText>- 리스트형</SubText>
            </SideSubItemLinks>
            <SideSubItemLinks to={item.path.Calander}>
              <SubText>- 달력형</SubText>
            </SideSubItemLinks>
          </SideItem>
        ) : (
          <SideItems key={item.name}>
            <SideItemLinks to={item.path}>
              {item.icon}
              <span style={{marginLeft: '16px'}}>{item.title}</span>
            </SideItemLinks>
          </SideItems>
        )
      ))}
    </SidebarMenu>
  )
}

export default Sidebar