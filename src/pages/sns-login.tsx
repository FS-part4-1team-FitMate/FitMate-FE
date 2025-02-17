import { useSetUser } from "@/contexts/UserProvider";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";
import { Role } from "@/types/types";
import Loading from "@/components/Common/Loading";
import PopUp, { CustomError } from "@/components/Common/PopUp";

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
        user: user as string,
        hasProfile: hasProfile as string,
        message: message as string,
      },
    },
  };
};

function SNSLogIn({ initialQuery }: PageProps) {
  const router = useRouter();
  const setUser = useSetUser();
  const [error, setError] = useState<CustomError>(null);

  const message = initialQuery?.message;
  if (message) {
    setError({
      message: decodeURIComponent(message),
      onCancel: () => {
        router.push(`/login`);
      },
    });
    toast.error(decodeURIComponent(message));
    setTimeout(() => {
      router.replace("/login");
    }, 7000);
    return (
      <>
        <Loading />
        <PopUp error={error} setError={setError} onlyCancel={true} />
      </>
    );
  }
  const accessToken = initialQuery?.accessToken;
  const refreshToken = initialQuery?.refreshToken;
  let user;
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

  return (
    <>
      <Loading />
      <PopUp error={error} setError={setError} onlyCancel={true} />
    </>
  );
}

export default SNSLogIn;
