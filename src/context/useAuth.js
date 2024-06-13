import { useContext } from "react";
import { AuthContext } from "./Authcontext";
export function useAuth() {
    return useContext(AuthContext);
  }