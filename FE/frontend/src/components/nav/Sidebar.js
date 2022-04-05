import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { FaCog } from 'react-icons/fa';
import sidebarData from './SidebarData';
import SidebarMenu from './SidebarMenu';
import SideItems from './SideItmes';
import SideItemLinks from './SideItemLinks';
import SideItem from './SideItem';

const SubText = styled.h3`
	font-size: 20px;
	margin-left: 25px;
`;

const SideSubItemLinks = styled(SideItemLinks)`
	padding: 0 0.5rem;
	width: 90%;
	height: 25%;
	font-size: 20px;
`;

function Sidebar() {
	const dataSet = sidebarData();
	const { is_admin: isAdmin } = useSelector(state => state.member);

	return (
		<SidebarMenu>
			{dataSet.map(item => (
				<SideItems key={item.name}>
					<SideItemLinks to={item.path}>
						{item.icon}
						<span style={{ marginLeft: '16px' }}>{item.title}</span>
					</SideItemLinks>
				</SideItems>
			))}
			{isAdmin && (
				<SideItems>
					<SideItemLinks to='admin'>
						<FaCog />
						<span style={{ marginLeft: '16px' }}>커뮤니티 관리</span>
					</SideItemLinks>
				</SideItems>
			)}
		</SidebarMenu>
	);
}

export default Sidebar;
