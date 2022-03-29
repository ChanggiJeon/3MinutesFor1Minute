import styled from 'styled-components';
import Container from '../../../components/community/Container';
import Main from '../../../components/community/MainCenter';
import TextSubTitle from '../../../components/common/TextSubTitle';
import DivLine from '../../../components/community/main/DivLine';

const SpeechMain = styled(Main)`
	align-content: flex-start;
	padding-top: 15px;
	overflow-y: scroll;
`;

const LeftContainer = styled(Container)`
	align-content: flex-start;
	background-color: ${props => props.theme.backgroundColor};
	width: 35%;
	padding: 0;
`;

const WordCloudContainer = styled(Container)`
	align-content: flex-start;
	height: 30%;
	width: 100%;
`;

const SpeechRecognitionContainer = styled(Container)`
	align-content: flex-start;
	margin-top: 15px;
	height: 60%;
	width: 100%;
`;

const SpeechInfoContainer = styled(Container)`
	align-content: flex-start;
	margin-left: 20px;
	height: 100%;
	width: 50%;
`;

function SpeechCreate() {
	return (
		<SpeechMain>
			<LeftContainer>
				<WordCloudContainer>
					<TextSubTitle>워드 클라우드</TextSubTitle>
					<DivLine />
				</WordCloudContainer>
				<SpeechRecognitionContainer>
					<TextSubTitle>스피치 전문</TextSubTitle>
					<DivLine />
				</SpeechRecognitionContainer>
			</LeftContainer>
			<SpeechInfoContainer>
				<TextSubTitle>스피치 정보</TextSubTitle>
				<DivLine />
			</SpeechInfoContainer>
		</SpeechMain>
	);
}

export default SpeechCreate;
