import styled from 'styled-components'
import Container from '../../../components/community/Container';
import Main from '../../../components/community/MainCenter';
import TextSubTitle from '../../../components/common/TextSubTitle'
import DivLine from '../../../components/community/main/DivLine';
import MainBox from '../../../components/community/minutes/list/MainBox';
import ContentsList from '../../../components/community/minutes/list/ContentsList';

const MinutesContainer = styled(Container)`
  align-content: flex-start;
`

function MinutesList() {
  return (
    <Main>
      <MinutesContainer>
        <TextSubTitle>회의록 목록</TextSubTitle>
				<DivLine />
        <MainBox>
          <ContentsList />
        </MainBox>
      </MinutesContainer>
    </Main>
  )
}

export default MinutesList;