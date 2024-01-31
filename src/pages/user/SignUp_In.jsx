// 소셜 로그인 및 회원가입 페이지
import { createContext } from "react";
import { useLocation } from "react-router-dom";
import "./SignUp_In.scss";
import SnsButtons from "../../components/user/join/SnsButtons";

export const fromPageContext = createContext();

export function SignUp_In() {
  const location = useLocation();
  const pageFrom = location.state?.from;

  return (
    <>
      <section className="signupInContainer inner">
        <h1 className="signup-title">SIGN UP / LOGIN </h1>
        <p className="signup-description">
          소셜 로그인 및 이메일 계정으로 가입이 가능합니다.
        </p>

        <div className="social-buttons">
          <fromPageContext.Provider value={pageFrom}>
            <SnsButtons />
          </fromPageContext.Provider>
        </div>
      </section>
    </>
  );
}
