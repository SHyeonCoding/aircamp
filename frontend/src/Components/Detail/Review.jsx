import styled from "@emotion/styled";
import { useState } from "react";
import { FcBusinessman } from "react-icons/fc";
import { getMemberInfo } from "../../Utils/MemberFunctions";
import { AiFillCloseCircle, AiFillEdit } from "react-icons/ai";
import { handleDeleteReview } from "../../Utils/ReviewFunctions";
import { handleUpdateReview } from "../../Utils/ReviewFunctions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 868px) {
    width: 100%;
  }
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  border-radius: 10px;
`;

const UserIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--gray-100);
  margin-right: 10px;
`;

const UserInfo = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;

const UserName = styled.p`
  font-size: 15px;
`;

const Content = styled.div`
  width: 100%;
  padding: 20px;
`;

const ReviewInfo = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  border-radius: 10px;
`;

const Icons = styled.div`
  width: 80px;
  height: 100%;
  gap: 10px;
  display: flex;
  align-items: center;
`;

const Score = styled.p``;

const DateDisplay = styled.p``;

const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  z-index: 5;
`;

const Modal = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto auto;
  width: 600px;
  height: 150px;
  background-color: white;
  z-index: 10;
  border-radius: 20px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
    rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Inputs = styled.form`
  width: 100%;
  height: 50px;
  display: grid;
  grid-template-columns: 6fr 1fr 1fr;
  gap: 10px;
  padding: 0 10px;
`;

const TextInput = styled.input`
  width: 100%;
  height: 100%;
  font-size: 18px;
  padding-left: 10px;
  background-color: var(--white);
  color: var(--black);
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
  outline: none;
  border: none;
  line-height: 1.15;
  box-shadow: 0px 10px 20px -18px;
  margin: 0 auto;

  &:focus {
    border-bottom: 2px solid var(--black);
    border-radius: 4px 4px 2px 2px;
    border-color: var(--black-700);
  }
  &:hover {
    outline: 1px solid lightgrey;
    border: 1px solid var(--black-700);
  }
`;

const ScoreInput = styled.select`
  border-radius: 10px;
`;

const PostBtn = styled.button`
  overflow: hidden;
  background-color: #27374d;
  color: var(--white);
  font-size: 13px;
  line-height: 13px;
  padding: 16px 16px 15px;
  text-decoration: none;
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  margin-right: 10px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;

  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset;
  }

  &:active {
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset,
      rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
  }
`;

const getScore = (score) => {
  if ((score * 10) % 10 === 0) return String(score) + ".0";
  else return score + "";
};

const getDate = (date) => {
  return date.slice(0, 10);
};

export default function Review({ review, userId }) {
  const [update, setUpdate] = useState(false);
  const [updatedContent, setUpdatedContent] = useState(review.content);
  const [updatedScore, setUpdatedScore] = useState(review.score + "");
  const userState = useSelector((state) => state.userReducer);
  const navigate = useNavigate();

  const handleUpdateContent = (event) => {
    setUpdatedContent((prev) => event.target.value);
  };

  const handleUpdateScore = (event) => {
    setUpdatedScore((prev) => event.target.value);
  };

  const updateReview = async (event) => {
    event.preventDefault();

    const myInfo = await getMemberInfo(userState.userInfo);

    if (myInfo === null) {
      toast("토큰이 만료되었습니다.");
      navigate("/login");
      return;
    }

    const updatedReview = {
      content: updatedContent,
      score: updatedScore,
    };

    const result = await handleUpdateReview(review.reviewId, updatedReview);

    if (result) {
      toast("리뷰를 수정하였습니다.");
    } else {
      toast("리뷰 수정이 실패했습니다.");
    }

    setUpdate(false);

    window.location.reload();
  };

  const deleteReview = async () => {
    const myInfo = await getMemberInfo(userState.userInfo);

    if (myInfo === null) {
      toast("토큰이 만료되었습니다.");
      navigate("/login");
      return;
    }

    const success = await handleDeleteReview(
      review.reviewId,
      userState.userInfo
    );

    if (success) {
      toast("성공적으로 삭제했습니다!");
      window.location.reload();
    } else {
      toast("삭제 실패");
    }
  };

  return (
    <>
      <Container>
        <Header>
          <UserInfo>
            <UserIcon>
              <FcBusinessman size={"30px"} />
            </UserIcon>
            <UserName>익명의 이용객</UserName>
          </UserInfo>
          {review.memberId === userId && (
            <Icons>
              <AiFillEdit onClick={() => setUpdate(true)} size={"25px"} />
              <AiFillCloseCircle onClick={deleteReview} size={"30px"} />
            </Icons>
          )}
        </Header>
        <Content>{review.content}</Content>
        <ReviewInfo>
          <Score>{`별점: ${getScore(review.score)}`}</Score>
          <DateDisplay>{`작성일: ${getDate(review.createdAt)}`}</DateDisplay>
        </ReviewInfo>
      </Container>
      {update && (
        <>
          <Overlay onClick={() => setUpdate(false)} />
          <Modal>
            <h2>리뷰 수정</h2>
            <Inputs onSubmit={updateReview}>
              <TextInput
                value={updatedContent}
                onChange={handleUpdateContent}
                placeholder="리뷰를 수정해 주세요."
              />
              <ScoreInput value={updatedScore} onChange={handleUpdateScore}>
                <option value="-">별점</option>
                <option value="0.0">0.0</option>
                <option value="0.5">0.5</option>
                <option value="1.0">1.0</option>
                <option value="1.5">1.5</option>
                <option value="2.0">2.0</option>
                <option value="2.5">2.5</option>
                <option value="3.0">3.0</option>
                <option value="3.5">3.5</option>
                <option value="4.0">4.0</option>
                <option value="4.5">4.5</option>
                <option value="5.0">5.0</option>
              </ScoreInput>
              <PostBtn>리뷰 작성</PostBtn>
            </Inputs>
          </Modal>
        </>
      )}
    </>
  );
}
