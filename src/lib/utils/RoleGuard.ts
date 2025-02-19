import { useUser } from "@/contexts/UserProvider";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const RoleGuard = () => {
  const user = useUser();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setIsLoading(false);
    } else {
      setIsLoading(false);
      setIsLoggedOut(true);
    }
  }, []);

  const commonAccess =
    router.pathname === "/" ||
    router.pathname === "/404" ||
    router.pathname === "/login" ||
    router.pathname === "/user/signup" ||
    router.pathname === "/trainer/signup" ||
    router.pathname === "/user/find-trainer" ||
    router.pathname.startsWith("/user/detail-trainer") ||
    router.pathname === "/sns-login";

  useEffect(() => {
    if (isLoading) return;

    if (!user) {
      if (!commonAccess && isLoggedOut) {
        router.push("/login");
        toast.error("로그인이 필요합니다!");
      }
    } else {
      if (
        user.role === "USER" &&
        !commonAccess &&
        !router.pathname.startsWith("/user") &&
        router.pathname !== "/chat" &&
        router.pathname !== "/noti"
      ) {
        router.push("/no-access");
        toast.error("접근할 수 없는 페이지입니다!");
      } else if (
        user.role === "TRAINER" &&
        !commonAccess &&
        !router.pathname.startsWith("/trainer") &&
        router.pathname !== "/chat" &&
        router.pathname !== "/noti"
      ) {
        router.push("/access");
        toast.error("접근할 수 없는 페이지입니다!");
      }
    }
  }, [user, router.pathname, isLoading, isLoggedOut]);

  return null;
};

export default RoleGuard;
