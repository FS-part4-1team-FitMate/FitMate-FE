import { useSetUser } from "@/contexts/UserProvider";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Role, User } from "@/types/types";
import Loading from "@/components/Common/Loading";
import PopUp, { CustomError } from "@/components/Common/PopUp";

// http://172.21.104.225:3001/sns-login?accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIwNTdjZDA3MC1mNmUwLTRjNGItYThlOC03NzA3OGFlNGE2YTEiLCJyb2xlIjoiVFJBSU5FUiIsImlhdCI6MTczOTkzNjkzNSwiZXhwIjoxNzM5OTQwNTM1fQ.QttG9PG2HCFLa8_U6CEw1cf-GloIVIjH31JDmS4l5_k&refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIwNTdjZDA3MC1mNmUwLTRjNGItYThlOC03NzA3OGFlNGE2YTEiLCJyb2xlIjoiVFJBSU5FUiIsImlhdCI6MTczOTkzNjkzNSwiZXhwIjoxNzQwNTQxNzM1fQ.MOl9mj8n-Pp9tTRr89wYmEwgYGo4-77FYI8WtFsYaJs&user=%7B%22id%22%3A%22057cd070-f6e0-4c4b-a8e8-77078ae4a6a1%22%2C%22email%22%3A%22kipacti%40gmail.com%22%2C%22nickname%22%3A%22%EC%9D%B4%EA%B0%95%EC%88%98%20(kipid)%22%2C%22refreshToken%22%3Anull%2C%22role%22%3A%22TRAINER%22%2C%22createdAt%22%3A%222025-02-19T03%3A32%3A08.227Z%22%2C%22updatedAt%22%3A%222025-02-19T03%3A32%3A08.227Z%22%7D&hasProfile=false
// http://172.21.104.225:3001/sns-login?message=%ED%95%B4%EB%8B%B9%20%EC%9C%A0%EC%A0%80%EB%A5%BC%20%EC%B0%BE%EC%9D%84%20%EC%88%98%20%EC%97%86%EC%8A%B5%EB%8B%88%EB%8B%A4.
interface QueryParams {
  accessToken?: string;
  refreshToken?: string;
  user?: string;
  hasProfile?: string;
  message?: string;
}

interface PageProps {
  initialQuery: QueryParams;
}

// 초기 로딩시 router.query 도 빈 JSON 객체이고, useSearchParams() 도 빈 JSON 객체이기 때문에 getServerSideProps 에서 초기값을 설정해 주어야 함.
export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
  const {
    accessToken = "",
    refreshToken = "",
    user = "",
    hasProfile = "",
    message = "",
  } = context.query;

  return {
    props: {
      initialQuery: {
        accessToken: accessToken as string,
        refreshToken: refreshToken as string,
        user: decodeURIComponent(user as string),
        hasProfile: hasProfile as string,
        message: decodeURIComponent(message as string),
      },
    },
  };
};

function SNSLogIn({ initialQuery }: PageProps) {
  const router = useRouter();
  const setUser = useSetUser();
  const [error, setError] = useState<CustomError>(null);

  const message = initialQuery?.message;
  const accessToken = initialQuery?.accessToken;
  const refreshToken = initialQuery?.refreshToken;
  let user: User;
  try {
    user = JSON.parse(initialQuery?.user!);
  } catch (err) {
    console.error(err);
  }
  const hasProfileString = initialQuery?.hasProfile;
  let hasProfile = false;
  if (hasProfileString === "true") {
    hasProfile = true;
  }

  useEffect(() => {
    if (message) {
      toast.error(decodeURIComponent(message));
      const toLoginSetTimeout = setTimeout(() => {
        router.replace("/login");
      }, 7000);
      setError({
        message: decodeURIComponent(message),
        onCancel: () => {
          clearTimeout(toLoginSetTimeout);
          router.push(`/login`);
        },
      });
      return;
    }

    if (accessToken && refreshToken && user) {
      localStorage.setItem(
        "userData",
        JSON.stringify({ accessToken, refreshToken, user, hasProfile }),
      );

      // 사용자 정보 업데이트
      setUser({ ...user, hasProfile });
      toast.success("로그인에 성공하였습니다.");

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
    }
  }, []);

  return (
    <>
      <Loading />
      <PopUp error={error} setError={setError} onlyCancel={true} />
    </>
  );
}

export default SNSLogIn;
