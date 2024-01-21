/* 마이페이지 - 회원정보 조회/수정/탈퇴 컴포넌트 */
import React from "react";
import "./MemberInfo.scss";
import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";

function MemberInfo() {
  return (
    <>
      <div className="member-info-container">
        <h1>회원정보 수정</h1>
        <div className="member-info-profile-box">
          <div className="profile-photo"></div>
          <div className="profile-nickname">
            <p>"허대장"님의 회원정보 페이지 입니다.</p>
          </div>
        </div>
        <div className="member-info-box">
          <div className="member-id-box">
            <p>아이디</p>
            <div className="member-id">user_naver123</div>
          </div>
          <div className="member-nickname-box">
            <p>닉네임</p>
            <span>
              <OutlinedInput
                color="orange"
                sx={{ height: "48px", marginRight: "8px" }}
                inputProps={{ maxLength: 10 }}
              />
              <Button variant="outlined" color="orange">
                중복 확인
              </Button>
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
                  {[
                    "서울",
                    "경기/인천",
                    "대전/충청",
                    "강원",
                    "대구/경상",
                    "부산/울산",
                    "광주/전라",
                    "제주",
                  ].map((region) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          //defaultChecked={region === selectedRegion}
                          name={region}
                          //checked={region === selectedRegion}
                          //onClick={() => setSelectedRegion(region)}
                          color="secondary"
                        />
                      }
                      sx={{ marginRight: "16px" }}
                      label={region}
                    />
                  ))}
                </FormGroup>
                <FormHelperText sx={{ fontSize: "15px" }}>
                  변경하고자 하는 선호 지역을 체크해주세요.
                </FormHelperText>
              </FormControl>
            </div>
          </div>
        </div>
        <div className="member-info-btn-box">
          <Button
            variant="contained"
            sx={{ width: "120px", height: "48px" }}
          >
            회원정보 수정
          </Button>
        </div>
      </div>
    </>
  );
}

export default MemberInfo;
