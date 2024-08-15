const { cookies } = require("next/headers");

const TOKEN_AGE = 3600;
const TOKEN_NAME = "auth-token";
const TOKEN_REFRESH_NAME = "auth-refresh-token";

// api requests
export function getToken() {
  const myAuthToken = cookies().get(TOKEN_NAME);
  return myAuthToken?.value;
}

// api requests
export function getRefreshToken() {
  const myAuthToken = cookies().get(TOKEN_REFRESH_NAME);
  return myAuthToken?.value;
}

// login
export function setToken(authToken) {
  return cookies().set({
    name: TOKEN_NAME,
    value: authToken,
    httpOnly: true, // limit client side js
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
    maxAge: TOKEN_AGE,
  });
}

// login
export function setRefreshToken(authRefreshToken) {
  return cookies().set({
    name: TOKEN_REFRESH_NAME,
    value: authRefreshToken,
    httpOnly: true, // limit client side js
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
    maxAge: TOKEN_AGE,
  });
}

// logout
export function deleteToken() {
  cookies().delete(TOKEN_REFRESH_NAME);
  return cookies().delete(TOKEN_NAME);
}
