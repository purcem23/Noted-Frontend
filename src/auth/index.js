import { createAuthProvider } from "react-token-auth";

export const [useAuth, authFetch, login, logout] = createAuthProvider({
  accessTokenKey: "access_token",
  onUpdateToken: (token) =>
    fetch("/refresh", {
      method: "POST",
      body: token.access_token,
    }).then((r) => r.json()),
});

function setUser(username) {
  localStorage.setItem("logged_user", username);
}

function getUser() {
  return localStorage.getItem("logged_user");
}

function removeUser() {
  return localStorage.removeItem("logged_user");
}

export { setUser, getUser, removeUser };
