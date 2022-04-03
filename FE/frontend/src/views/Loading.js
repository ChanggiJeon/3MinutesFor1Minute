import LoadingScreen from 'react-loading-screen';
import logo from '../assets/logo.png';

function Loading() {
	return (
		<LoadingScreen
			loading
			logoSrc={logo}
			spinnerColor={props => props.theme.fontColor}
			text='AI is working for your minutes!'
		/>
	);
}

export default Loading;
