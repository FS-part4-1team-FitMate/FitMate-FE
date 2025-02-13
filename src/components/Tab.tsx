import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";

const tab_container = clsx(
  "flex items-end gap-8 max-w-[192rem] h-[5.4rem] m-auto pt-4",
  "border-b border-line-100",
  "pc:gap-[3.6rem] pc:h-auto pc:pt-[1.6rem] pc:px-[26rem]",
  "tablet:px-[7.2rem]",
  "mobile:px-[2.4rem]",
);

export default function Tab() {
  const router = useRouter();
  const isActiveMenu = (path: string) =>
    router.pathname === path
      ? "py-[1.6rem] border-b-2 border-blue-400 text-nowrap text-black-400 font-bold pc:text-xl tablet:text-lg mobile:text-sm"
      : "py-[1.6rem] text-nowrap text-gray-400 font-semibold pc:text-xl tablet:text-lg mobile:text-sm";

  if (
    router.pathname === "/user/my-lesson/pending-request" ||
    router.pathname === "/user/my-lesson/active-lesson" ||
    router.pathname === "/user/my-lesson/past-lesson" ||
    router.pathname === "/user/my-lesson/lesson-history"
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
        <div className={isActiveMenu("/user/my-lesson/lesson-history")}>
          <Link href="/user/my-lesson/lesson-history">레슨 내역</Link>
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
