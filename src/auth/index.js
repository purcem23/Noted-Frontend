import { createAuthProvider } from "react-token-auth";

export const [useAuth, authFetch, login, logout] = createAuthProvider({
  accessTokenKey: "access_token",
  onUpdateToken: (token) =>
    fetch(process.env.REACT_APP_API_URL + "/refresh", {
      method: "POST",
      body: token.access_token,
    }).then((r) => r.json()),
});

function getUser() {
  const reactAuth = JSON.parse(localStorage.getItem("REACT_TOKEN_AUTH_KEY"));
  return reactAuth.username;
}

export { getUser };
