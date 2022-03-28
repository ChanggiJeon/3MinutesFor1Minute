import styled from 'styled-components';
import SubmitButton from '../../../auth/SubmitButton';

// 글 상세보기(postDetail)페이지 수정,삭제 버튼
const SmallBtn = styled(SubmitButton)`
  display: inline-block;
  width: 5%;
  margin: 5px;
  padding: 0px;
  font-size: 15px;
`;

export default SmallBtn;