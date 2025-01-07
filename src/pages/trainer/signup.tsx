import { Role } from "@/types/types";
import SignUpForm from "@/components/SignUp/SignUpForm";

function SignUp() {
  return <SignUpForm role={Role.TRAINER} />;
}

export default SignUp;
