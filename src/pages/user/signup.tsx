import SignUpForm from "@/components/SignUpForm";
import { Role } from "@/types/types";

function SignUp() {
	return <SignUpForm role={Role.USER} />;
}

export default SignUp;
