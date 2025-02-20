import { useRouter } from "next/router";
import { Dispatch, SetStateAction, createContext, useContext, useState } from "react";
import { useEffect } from "react";
import { LSUserData, Role, User } from "@/types/types";

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
  const router = useRouter();
  const [user, setUser] = useState<null | User>(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      try {
        const userDataLS: LSUserData = JSON.parse(storedUserData);
        userDataLS.user = {
          ...userDataLS.user,
          hasProfile: !!userDataLS.user.profile?.id,
        };
        userDataLS.hasProfile = !!userDataLS.user.profile?.id;
        setUser(() => userDataLS.user);
        if (
          !user?.hasProfile &&
          user?.role === Role.USER &&
          router.pathname !== "/user/profile/regist" &&
          router.pathname !== `/trainer/${user?.id}/profile/regist`
        ) {
          if (user?.role === Role.USER) {
            router.push("/user/profile/regist");
          } else if (user?.role === Role.TRAINER) {
            router.push(`/trainer/${user?.id}/profile/regist`);
          }
        }
        localStorage.setItem("userData", JSON.stringify(userDataLS as LSUserData));
      } catch (err) {
        console.error(err);
        localStorage.removeItem("userData");
        setUser(null);
        if (
          router.pathname !== "/" &&
          router.pathname !== "/user/find-trainer" &&
          router.pathname !== "/user/signup" &&
          router.pathname !== "/trainer/signup" &&
          router.pathname !== "/sns-login"
        ) {
          router.push(`/login`);
        }
      }
    }
  }, [router.pathname]);

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
