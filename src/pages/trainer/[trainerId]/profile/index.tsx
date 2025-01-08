import { useUser } from "@/contexts/UserProvider";
import { useRouter } from "next/router";
import StarPoints from "@/components/Common/StarPoints";

function Profile() {
  const router = useRouter();
  const { trainerId } = router.query;
  const user = useUser();
  const myPage = trainerId === user.id;

  return (
    <main className="flex flex-col justify-normal items-start gap-[24px] w-[1400px] max-w-full">
      <StarPoints rating={0.93} />
    </main>
  );
}

export default Profile;
