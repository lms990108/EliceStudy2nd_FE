export default function useGetUser() {
  const user = {
    isLoggedIn: JSON.parse(localStorage.getItem("isLoggedIn")),
    role: localStorage.getItem("role"),
    nickname: localStorage.getItem("nickname"),
    profile_url: localStorage.getItem("profile_url"),
    interested_area: localStorage.getItem("interested_area"),
    social_provider: localStorage.getItem("social_provider"),
  };

  return user;
}
