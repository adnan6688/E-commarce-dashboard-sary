import type { ReactNode } from "react";
import { useEffect } from "react";
import AuthReduxHook from "../Hook/AuthReduxHook";
import { useNavigate } from "react-router";

export default function AuthRoute({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const { authUser } = AuthReduxHook();

  useEffect(() => {
    if (authUser) {
      navigate("/deshboard"); 
    }
  }, [authUser, navigate]);

  if (authUser) {
    return null; 
  }

  return <div>{children}</div>;
}
