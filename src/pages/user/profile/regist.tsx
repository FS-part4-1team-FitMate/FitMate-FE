import ImageUploader from "@/components/ImageUploader";
import clsx from "clsx";

const profile_menu = clsx(
  "flex flex-col items-start gap-[16px]"
);

function Regist() {

  return (
    <form encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
    <main className="flex flex-col justify-normal items-start gap-[16px] w-[384px] max-w-full mx-auto p-[4px] my-[24px]">
      <div className={profile_menu}>
        <h1 className="text-xl font-bold">프로필 등록</h1>
        <p className="text-md">추가 정보를 입력하여 회원가입을 완료해주세요.</p>
      </div>
      <hr className="w-full border-[1px] border-solid border-gray-300" />
      <div className={profile_menu}>
        <label htmlFor="profileImage" className="text-lg font-regular">프로필 이미지</label>
        <ImageUploader />
      </div>
    </main>
    </form>
  );
}

export default Regist;
