import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CloseIconArea from "../../components/user/additional-info/CloseIconArea";
import PageTitleArea from "../../components/user/additional-info/PageTitleArea";
import UserInfoArea from "../../components/user/additional-info/UserInfoArea";
import PreferredRegionsArea from "../../components/user/additional-info/PreferredRegionsArea";
import SubmitBtnsArea from "../../components/user/additional-info/SubmitBtnsArea";
import "./InputAdditionalInfo.scss";

// 이 페이지는 회원가입/로그인 페이지로부터 이동한 것이 아니면 접근 불가한 페이지가 되어야 함. (useNavigate의 state를 이용해야 함.)
export function InputAdditionalInfo() {
  const navigate = useNavigate();
  const location = useLocation();
  const [info, setInfo] = useState(null);

  // 닉네임 정보(중복 확인이 되었는지 여부까지)
  const [nicknameInfo, setNicknameInfo] = useState(null);
  // 프로필 이미지
  const [selectedImg, setSelectedImg] = useState(null);
  // 선호 지역
  const [selectedRegion, setSelectedRegion] = useState("서울");

  useEffect(() => {
    if (!location.state || !location.state.isFromSignUpPage) {
      navigate("/forbidden");
      return;
    }

    setInfo(location.state);
  }, [location, navigate]);

  useEffect(() => {
    if (info) {
      setNicknameInfo({
        nickname: info.existingNickname,
        isDuplicationChecked: false,
      });
      setSelectedImg(info.profileUrl);
    }
  }, [info]);

  return (
    <>
      {info && selectedImg && nicknameInfo ? (
        <div className="input-additional-info-container">
          <CloseIconArea />
          <main>
            <PageTitleArea />
            <UserInfoArea
              selectedImg={selectedImg}
              setSelectedImg={setSelectedImg}
              nicknameInfo={nicknameInfo}
              setNicknameInfo={setNicknameInfo}
              profileUrl={info.profileUrl}
              user_id={info.id}
            />
            <PreferredRegionsArea selectedRegion={selectedRegion} setSelectedRegion={setSelectedRegion} />
            <SubmitBtnsArea
              additionalUserInfo={{
                id: info.id,
                nicknameInfo,
                selectedImg,
                selectedRegion,
                socialProvider: info.socialProvider,
              }}
            />
          </main>
        </div>
      ) : null}
    </>
  );
}
