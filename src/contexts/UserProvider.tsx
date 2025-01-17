import { Dispatch, SetStateAction, createContext, useContext, useState } from "react";
import { useEffect } from "react";
import { User } from "@/types/types";

const UserContext = createContext<{
  user: null | User;
  setUser: Dispatch<SetStateAction<User | null>>;
}>({
  user: null,
  setUser: () => {},
});

interface Props {
  children: React.ReactNode;
}

export function UserProvider({ children }: Props) {
  const [user, setUser] = useState<null | User>(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUser(JSON.parse(storedUserData).user);
    }
  }, []);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
}

export function useUser(): User | null {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("반드시 UserProvider 안에서 사용해야 합니다.");
  }

  const { user } = context;
  return user;
}

export function useSetUser(): Dispatch<SetStateAction<null | User>> {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("반드시 UserProvider 안에서 사용해야 합니다.");
  }

  const { setUser } = context;
  return setUser;
}
