import styled from 'styled-components'
import Container from '../../../components/community/Container';
import Main from '../../../components/community/MainCenter';
import TextSubTitle from '../../../components/common/TextSubTitle'
import DivLine from '../../../components/community/main/DivLine';

const ContentsContainer = styled(Container)`
  align-content: flex-start;
  width: 50%;
`

const SpeechContainer = styled(Container)`
  align-content: flex-start;
  margin-left: 20px;
  width: 45%;
`

function MinutesDetail() {
  return (
    <Main>
      <ContentsContainer>
        <TextSubTitle>회의 내용</TextSubTitle>
				<DivLine />
      </ContentsContainer>
      <SpeechContainer>
        <TextSubTitle>스피치</TextSubTitle>
				<DivLine />
      </SpeechContainer>
    </Main>
  )
}

export default MinutesDetail;