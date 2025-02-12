import Link from "next/link";

function LogInButton() {
  return (
    <Link href="/login">
      <button className="px-[16px] py-[4px] text-lg rounded-xl bg-blue-500 text-white">
        로그인
      </button>
    </Link>
  );
}

export default LogInButton;
