import Sidebar from "../../components/nav/Sidebar";
import Main from "../../components/community/main/ComMain";
import TextSubTitle from "../../components/common/TextSubTitle";
import DivLine from "../../components/community/main/DivLine";
import MainBox from "../../components/community/main/MainBox";
import SubBox from "../../components/community/main/SubBox";

function Community() {
  return (
    <>
      <Sidebar />
      <Main>
        <MainBox>
          <TextSubTitle>회의록</TextSubTitle>
          <DivLine />
        </MainBox>
        <SubBox>
          <TextSubTitle>게시글</TextSubTitle>
          <DivLine />
        </SubBox>
        <SubBox>
          <TextSubTitle>회원 목록</TextSubTitle>
          <DivLine />
        </SubBox>
        <SubBox>
          <TextSubTitle>일정 관리</TextSubTitle>
          <DivLine />
        </SubBox>
      </Main>
    </>
  )
}

export default Community;