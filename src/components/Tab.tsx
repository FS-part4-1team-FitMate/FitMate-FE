import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";

const tab_container = clsx(
  "flex items-end gap-[3.2rem] m-auto",
  "border-b border-line-100",
  "pc:max-w-[192rem] pc:h-auto pc:pt-[1.6rem] pc:px-[26rem]",
  "tablet:max-w-[74.5rem] tablet:h-[5.4rem] tablet:pt-4 tablet:px-[7.2rem]",
  "mobile:max-w-[37.5rem] mobile:h-[5.4rem] mobile:pt-4 mobile:px-[2.4rem]",
);

export default function Tab() {
  const router = useRouter();
  const isActiveMenu = (path: string) =>
    router.pathname === path
      ? "py-[1.6rem] border-b-2 border-blue-400 text-black-400 font-bold pc:text-xl tablet:text-md mobile:text-md"
      : "py-[1.6rem] text-gray-400 font-bold pc:text-xl tablet:text-md mobile:text-md";

  if (
    router.pathname === "/user/my-lesson/pending-request" ||
    router.pathname === "/user/my-lesson/active-lesson" ||
    router.pathname === "/user/my-lesson/past-lesson"
  ) {
    return (
      <div className={tab_container}>
        <div className={isActiveMenu("/user/my-lesson/pending-request")}>
          <Link href="/user/my-lesson/pending-request">대기 중인 견적</Link>
        </div>
        <div className={isActiveMenu("/user/my-lesson/active-lesson")}>
          <Link href="/user/my-lesson/active-lesson">진행 중인 레슨</Link>
        </div>
        <div className={isActiveMenu("/user/my-lesson/past-lesson")}>
          <Link href="/user/my-lesson/past-lesson">받았던 레슨</Link>
        </div>
      </div>
    );
  }

  if (
    router.pathname === "/user/lesson-review/awaiting-review" ||
    router.pathname === "/user/lesson-review/written-review"
  ) {
    return (
      <div className={tab_container}>
        <div className={isActiveMenu("/user/lesson-review/awaiting-review")}>
          <Link href="/user/lesson-review/awaiting-review">작성 가능한 리뷰</Link>
        </div>
        <div className={isActiveMenu("/user/lesson-review/written-review")}>
          <Link href="/user/lesson-review/written-review">내가 작성한 리뷰</Link>
        </div>
      </div>
    );
  }

  if (
    router.pathname === "/trainer/managing-request/sent-request" ||
    router.pathname === "/trainer/managing-request/rejected-request"
  ) {
    return (
      <div className={tab_container}>
        <div className={isActiveMenu("/trainer/managing-request/sent-request")}>
          <Link href="/trainer/managing-request/sent-request">보낸 견적 조회</Link>
        </div>
        <div className={isActiveMenu("/trainer/managing-request/rejected-request")}>
          <Link href="/trainer/managing-request/rejected-request">반려 요청</Link>
        </div>
      </div>
    );
  }
}
