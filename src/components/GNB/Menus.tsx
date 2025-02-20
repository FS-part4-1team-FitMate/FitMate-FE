import Link from "next/link";
import { useRouter } from "next/router";
import { active_class } from "@/types/constants";
import { Role, User } from "@/types/types";

interface MenusProps {
  addClass?: boolean;
  user: User | null;
  router: ReturnType<typeof useRouter>;
}

function Menus({ addClass, user, router }: MenusProps) {
  if (user && user?.role === Role.USER) {
    return (
      <>
        <li
          className={
            addClass ? "w-[140px] h-auto text-lg flex justify-center items-center py-[10px]" : ""
          }
        >
          <Link
            href="/user/create-request"
            className={router.pathname === "/user/create-request" ? active_class : ""}
          >
            레슨 요청
          </Link>
        </li>
        <li
          className={
            addClass
              ? "w-[140px] h-auto text-lg border-t-[1px] border-solid border-slate-400 flex justify-center items-center py-[10px]"
              : ""
          }
        >
          <Link
            href="/user/find-trainer"
            className={router.pathname === "/user/find-trainer" ? active_class : ""}
          >
            강사님 찾기
          </Link>
        </li>
        <li
          className={
            addClass
              ? "w-[140px] h-auto text-lg border-t-[1px] border-solid border-slate-400 flex justify-center items-center py-[10px]"
              : ""
          }
        >
          <Link
            href="/user/my-lesson/lesson-history"
            className={router.pathname.startsWith("/user/my-lesson") ? active_class : ""}
          >
            내 레슨 관리
          </Link>
        </li>
        <li
          className={
            addClass
              ? "w-[140px] h-auto text-lg border-t-[1px] border-solid border-slate-400 flex justify-center items-center py-[10px]"
              : ""
          }
        >
          <Link href="/chat" className={router.pathname.startsWith("/chat") ? active_class : ""}>
            FitChat
          </Link>
        </li>
        <li
          className={
            addClass
              ? "w-[140px] h-auto text-lg border-t-[1px] border-solid border-slate-400 flex justify-center items-center py-[10px]"
              : ""
          }
        >
          <Link
            href="/ai-chatbot"
            className={router.pathname.startsWith("/ai-chatbot") ? active_class : ""}
          >
            AI 챗봇
          </Link>
        </li>
      </>
    );
  } else if (user && user?.role === Role.TRAINER) {
    return (
      <>
        <li
          className={
            addClass ? "w-[140px] h-auto text-lg flex justify-center items-center py-[10px]" : ""
          }
        >
          <Link
            href="/trainer/received-request"
            className={router.pathname === "/trainer/received-request" ? active_class : ""}
          >
            받은 요청
          </Link>
        </li>
        <li
          className={
            addClass
              ? "w-[140px] h-auto text-lg border-t-[1px] border-solid border-slate-400 flex justify-center items-center py-[10px]"
              : ""
          }
        >
          <Link
            href="/trainer/managing-request/sent-request"
            className={router.pathname.startsWith("/trainer/managing-request") ? active_class : ""}
          >
            내 견적 관리
          </Link>
        </li>
        <li
          className={
            addClass
              ? "w-[140px] h-auto text-lg border-t-[1px] border-solid border-slate-400 flex justify-center items-center py-[10px]"
              : ""
          }
        >
          <Link href="/chat" className={router.pathname.startsWith("/chat") ? active_class : ""}>
            FitChat
          </Link>
        </li>
        <li
          className={
            addClass
              ? "w-[140px] h-auto text-lg border-t-[1px] border-solid border-slate-400 flex justify-center items-center py-[10px]"
              : ""
          }
        >
          <Link
            href="/ai-chatbot"
            className={router.pathname.startsWith("/ai-chatbot") ? active_class : ""}
          >
            AI 챗봇
          </Link>
        </li>
      </>
    );
  } else {
    return (
      <li
        className={
          addClass ? "w-[140px] h-auto text-lg flex justify-center items-center py-[10px]" : ""
        }
      >
        <Link
          href="/user/find-trainer"
          className={router.pathname === "/user/find-trainer" ? active_class : ""}
        >
          강사님 찾기
        </Link>
      </li>
    );
  }
}

export default Menus;
