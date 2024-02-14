/* 마이페이지 - 회원정보 조회/수정/탈퇴 컴포넌트 */
import React, { useContext, useEffect, useState } from "react";
import "./MemberInfo.scss";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import { userUrl, uploadImgUrl, presignedUrl } from "../../apis/apiURLs";
import { Alert, Backdrop, TextField } from "@mui/material";
import { EditAttributes, ErrorOutline, ImageSearchRounded, WarningRounded } from "@mui/icons-material";
import { AlertCustom } from "../common/alert/Alerts";
import { useNavigate } from "react-router-dom";
import { AlertContext } from "../../App";

const regex = /[0-9]|[\[\]{}()<>?|`~!@#$%^&*-_+=,.;:\"'\\]/;

function MemberInfo({ user, setUserData }) {
  const [inputNickname, setInputNickname] = useState(user?.nickname);
  const [profileURL, setProfileURL] = useState(user?.profile_url);
  const [errorImage, setErrorImage] = useState("");
  const [selectedRegion, setSelectedRegion] = useState(user?.interested_area);
  const [errorNickname, setErrorNickname] = useState("");
  const [isUnique, setIsUnique] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [openComplete, setOpenComplete] = useState(false);

  const { setOpenFetchErrorAlert } = useContext(AlertContext);
  const nav = useNavigate();

  const handleChangeProfile = async (e) => {
    setIsHovered(false);
    if (!e.target.files.length) return;
    const file = e.target.files[0];

    if (file.size > 1024 * 1024 * 5) {
      return setErrorImage("사진은 최대 5MB까지 업로드 가능합니다.");
    }

    try {
      let res = await fetch(presignedUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: file.name }),
      });

      if (!res.ok) {
        if (res.status === 401 || res.status === 403) {
          const loginRes = await fetch(`${userUrl}`, { credentials: "include" });
          if (loginRes.ok) {
            const data = await loginRes.json();
            setUserData({ isLoggedIn: true, user: data.user });
          } else {
            setUserData({ isLoggedIn: false });
            return nav(`/signup-in`);
          }
        } else {
          const data = await res.json();
          console.error(data);
        }
        return setErrorImage("사진 업로드에 실패했습니다. 다시 시도해주세요");
      }

      res = await fetch(data.presigned_url, {
        method: "PUT",
        headers: { "Content-Type": file.type },
        body: file,
      });

      if (!res.ok) {
        if (res.status === 401 || res.status === 403) {
          const loginRes = await fetch(`${userUrl}`, { credentials: "include" });
          if (loginRes.ok) {
            const data = await loginRes.json();
            setUserData({ isLoggedIn: true, user: data.user });
          } else {
            setUserData({ isLoggedIn: false });
            return nav(`/signup-in`);
          }
        }
        return setErrorImage("사진 업로드에 실패했습니다. 다시 시도해주세요");
      }
      setProfileURL(data.public_url);
      setErrorImage("");
    } catch (e) {
      setOpenFetchErrorAlert(true);
    }
  };

  const handleChangeNickname = (e) => {
    const input = e.target.value.trimStart();
    setInputNickname(input);
    setIsUnique(false);

    if (regex.test(input)) {
      setErrorNickname("특수 문자 및 숫자는 사용이 불가합니다.");
    } else if (input.length < 1) {
      setErrorNickname("최소 1자 이상 적어주세요.");
    } else {
      setErrorNickname("");
    }
  };

  const handleCheckNickname = async (e) => {
    try {
      const res = await fetch(`${userUrl}/nickname`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user.user_id,
          nickname: inputNickname.trim(),
        }),
      });

      if (res.ok) {
        setIsUnique(true);
      } else {
        setErrorNickname(
          <div className="nick-err">
            <WarningRounded sx={{ fontSize: 16, marginRight: "6px" }} />
            중복된 닉네임 입니다.
          </div>
        );
      }
    } catch (e) {
      setOpenFetchErrorAlert(true);
    }
  };

  const handleSubmit = async () => {
    try {
      const bodyData = {
        user_id: user.user_id,
        nickname: inputNickname.trim(),
        social_provider: user.social_provider,
        profile_url: profileURL,
        interested_area: selectedRegion,
      };
      const res = await fetch(`${userUrl}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(bodyData),
      });

      if (res.ok) {
        setUserData({ isLoggedIn: true, user: { ...user, ...bodyData } });
        setOpenComplete(true);
        setIsUnique(false);
      } else if (res.status === 401 || res.status === 403) {
        const loginRes = await fetch(`${userUrl}`, { credentials: "include" });
        if (loginRes.ok) {
          const data = await loginRes.json();
          setUserData({ isLoggedIn: true, user: data.user });
          handleSubmit();
        } else {
          setUserData({ isLoggedIn: false });
          return nav(`/signup-in`);
        }
      } else {
        const data = await res.json();
        console.error(data);
      }
    } catch (e) {
      setOpenFetchErrorAlert(true);
    }
  };

  const validateSubmit = () => {
    if (inputNickname === user.nickname && profileURL === user.profile_url && selectedRegion === user.interested_area) return false;
    if (inputNickname && profileURL && selectedRegion) {
      if (inputNickname === user.nickname || isUnique) return true;
    }
    return false;
  };

  return (
    <>
      {user && (
        <div className="member-info-container">
          <div className="header">
            <h1>회원정보 수정</h1>
          </div>
          <div className="member-info-profile-box">
            <div className="flex-row">
              <div className="profile-photo" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                {user && <img src={profileURL} />}
                {isHovered && (
                  <label className="profile-edit" htmlFor="inputFile">
                    <ImageSearchRounded className="icon" fontSize="large" />
                  </label>
                )}
                <input type="file" id="inputFile" onChange={handleChangeProfile} />
              </div>
              <div className="profile-nickname">
                <p>"{user?.nickname || "user"}"님의 회원정보 페이지 입니다.</p>
              </div>
            </div>
            {errorImage && (
              <div className="error">
                <ErrorOutline fontSize="inherit" />
                {errorImage}
              </div>
            )}
          </div>
          <div className="member-info-box">
            <div className="member-id-box">
              <p>연동 계정</p>
              <div className="member-id">{user?.social_provider}</div>
            </div>
            <div className="member-nickname-box">
              <p>닉네임</p>
              <span>
                <TextField
                  className="textfield"
                  size="small"
                  error={Boolean(errorNickname)}
                  helperText={errorNickname}
                  value={inputNickname}
                  onChange={handleChangeNickname}
                  color="orange"
                  inputProps={{ maxLength: 10 }}
                />
                <Button
                  onClick={handleCheckNickname}
                  variant="outlined"
                  color="orange"
                  disabled={isUnique || errorNickname || user?.nickname === inputNickname}
                  sx={{ margin: "3px 0 0 8px" }}
                >
                  중복 확인
                </Button>
                {isUnique && (
                  <Alert severity={"success"} sx={{ padding: 0, border: "none" }} variant="outlined">
                    사용 가능한 닉네임 입니다.
                  </Alert>
                )}
              </span>
            </div>
            <div className="member-preferred-region-box">
              <p>선호지역</p>
              <div className="member-preferred-region-check-list">
                <FormControl
                  required
                  // error={error}
                  component="fieldset"
                  variant="standard"
                >
                  <FormGroup
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      flexDirection: "row",
                    }}
                  >
                    {["서울", "경기/인천", "대전/충청", "강원", "대구/경상", "부산/울산", "광주/전라", "제주"].map((region, idx) => (
                      <FormControlLabel
                        key={idx}
                        control={<Checkbox name={region} checked={region === selectedRegion} onClick={() => setSelectedRegion(region)} color="secondary" />}
                        sx={{ marginRight: "16px" }}
                        label={region}
                      />
                    ))}
                  </FormGroup>
                  <FormHelperText sx={{ fontSize: "15px" }}>변경하고자 하는 선호 지역을 체크해주세요.</FormHelperText>
                </FormControl>
              </div>
            </div>
          </div>
          <div className="member-info-btn-box">
            <Button onClick={handleSubmit} disabled={!validateSubmit()} variant="contained" sx={{ width: "120px", height: "48px" }}>
              회원정보 수정
            </Button>
          </div>
          <Backdrop open={openComplete} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <AlertCustom
              open={openComplete}
              onclose={() => setOpenComplete(false)}
              onclick={() => setOpenComplete(false)}
              title={"teenybox.com 내용:"}
              content={"회원정보 수정이 완료되었습니다!"}
              btnCloseHidden={true}
              time={1000}
            />
          </Backdrop>
        </div>
      )}
    </>
  );
}

export default MemberInfo;
