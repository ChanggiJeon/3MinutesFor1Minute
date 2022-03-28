import styled from 'styled-components'
import Container from '../../../components/community/Container';
import Main from '../../../components/community/MainCenter';
import TextSubTitle from '../../../components/common/TextSubTitle'
import DivLine from '../../../components/community/main/DivLine';

const SpeechMain = styled(Main)`
  align-content: flex-start;
`

const LeftContainer = styled(Container)`
  align-content: flex-start;
  background-color: ${props => props.theme.backgroundColor};
  width: 35%;
`

const WordCloudContainer = styled(Container)`
  align-content: flex-start;
  height: 55%;
  width: 100%;
`

const SpeechRecognitionContainer = styled(Container)`
  align-content: flex-start;
  margin-top: 20px;
  height: 120%;
  width: 100%;
`

const SpeechInfoContainer = styled(Container)`
  align-content: flex-start;
  margin-top: 10px;
  margin-left: 20px;
  height: 150%;
  width: 50%;
`

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
  )
}

export default SpeechCreate;