import { useSetUser } from "@/contexts/UserProvider";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Role } from "@/types/types";
import Loading from "@/components/Common/Loading";

function SNSLogIn() {
  const router = useRouter();
  const setUser = useSetUser();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const accessToken = query.get("accessToken");
    const refreshToken = query.get("refreshToken");
    const user = JSON.parse(query.get("user")!);
    const hasProfileString = query.get("hasProfile") as string;
    let hasProfile = false;
    if (hasProfileString === "true") {
      hasProfile = true;
    }

    if (accessToken && refreshToken && user) {
      localStorage.setItem(
        "userData",
        JSON.stringify({ accessToken, refreshToken, user, hasProfile }),
      );

      // 사용자 정보 업데이트
      setUser({ ...user, hasProfile });

      // 권한에 따라 페이지 이동
      if (user.role === Role.USER) {
        if (user.hasProfile) {
          router.replace("/user/my-lesson/active-lesson");
        } else {
          router.replace("/user/profile/regist");
        }
      } else if (user.role === Role.TRAINER) {
        if (user.hasProfile) {
          router.replace("/trainer/received-request");
        } else {
          router.replace(`/trainer/${user.id}/profile/regist`);
        }
      }
    } else {
      router.replace("/login");
    }
  }, [router, setUser]);

  return <Loading />;
}

export default SNSLogIn;
