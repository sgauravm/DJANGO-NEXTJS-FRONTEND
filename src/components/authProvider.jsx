"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const { createContext, useContext, useState, useEffect } = require("react");

const AuthContext = createContext(null);
const LOCAL_STORAGE_KEY = "is-logged-in";
const LOCAL_USERNAME_KEY = "username";
const LOGIN_REDIRECT_URL = "/";
const LOGOUT_REDIRECT_URL = "/login";
const LOGIN_REQUIRED_URL = "/login";

export function AuthProvider({ children }) {
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // This is to keep the value of login on page refresh
  useEffect(() => {
    const storedAuthStatus = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (storedAuthStatus) {
      const storedAuthStatusInt = parseInt(storedAuthStatus);
      setisAuthenticated(storedAuthStatusInt === 1);
    }

    const storedUn = localStorage.getItem(LOCAL_USERNAME_KEY);

    if (storedUn) {
      setUsername(storedUn);
    }
  }, []);

  const login = (username) => {
    setisAuthenticated(true);
    localStorage.setItem(LOCAL_STORAGE_KEY, "1");

    if (username) {
      localStorage.setItem(LOCAL_USERNAME_KEY, `${username}`);
      setUsername(username);
    } else {
      localStorage.removeItem(LOCAL_USERNAME_KEY);
    }

    const nextUrl = searchParams.get("next");
    const invalidNextUrl = ["/login", "/logout"];
    const nextUrlValid =
      nextUrl && nextUrl.startsWith("/") && !invalidNextUrl.includes(nextUrl);

    if (nextUrlValid) {
      router.replace(nextUrl);
    } else {
      router.replace(LOGIN_REDIRECT_URL);
    }
  };

  const logout = () => {
    setisAuthenticated(false);
    localStorage.setItem(LOCAL_STORAGE_KEY, "0");
    router.replace(LOGOUT_REDIRECT_URL);
  };

  const loginrequiredRedirect = () => {
    setisAuthenticated(false);
    localStorage.setItem(LOCAL_STORAGE_KEY, "0");

    let loginWithNextUrl = `${LOGIN_REQUIRED_URL}?next=${pathname}`;
    if (pathname === LOGIN_REQUIRED_URL) {
      loginWithNextUrl = LOGIN_REQUIRED_URL;
    }
    router.replace(loginWithNextUrl);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        loginrequiredRedirect,
        username,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
