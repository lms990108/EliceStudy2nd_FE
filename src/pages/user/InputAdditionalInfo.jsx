import { useState } from "react";
import { useLocation } from "react-router-dom";
import CloseIconArea from "../../components/user/additional-info/CloseIconArea";
import PageTitleArea from "../../components/user/additional-info/PageTitleArea";
import UserInfoArea from "../../components/user/additional-info/UserInfoArea";
import PreferredRegionsArea from "../../components/user/additional-info/PreferredRegionsArea";
import SubmitBtnsArea from "../../components/user/additional-info/SubmitBtnsArea";
import "./InputAdditionalInfo.scss";

// 이 페이지는 회원가입/로그인 페이지로부터 이동한 것이 아니면 접근 불가한 페이지가 되어야 함. (useNavigate의 state를 이용해야 함.)
export default function InputAdditionalInfo() {
  const location = useLocation();
  const { id, existingNickname, profileUrl, socialProvider, isFromSignUpPage } =
    location.state;

  // 닉네임 정보(중복 확인이 되었는지 여부까지)
  const [nicknameInfo, setNicknameInfo] = useState({
    nickname: existingNickname,
    isDuplicationChecked: false,
  });
  // 프로필 이미지
  const [selectedImg, setSelectedImg] = useState(profileUrl);
  // 선호 지역
  const [selectedRegion, setSelectedRegion] = useState("서울");

  return (
    <>
      <div className="input-additional-info-container">
        <CloseIconArea />
        <main>
          <PageTitleArea />
          <UserInfoArea
            selectedImg={selectedImg}
            setSelectedImg={setSelectedImg}
            nicknameInfo={nicknameInfo}
            setNicknameInfo={setNicknameInfo}
            profileUrl={profileUrl}
            user_id={id}
          />
          <PreferredRegionsArea
            selectedRegion={selectedRegion}
            setSelectedRegion={setSelectedRegion}
          />
          <SubmitBtnsArea
            additionalUserInfo={{
              id,
              nicknameInfo,
              selectedImg,
              selectedRegion,
              socialProvider,
            }}
          />
        </main>
      </div>
    </>
  );
}
