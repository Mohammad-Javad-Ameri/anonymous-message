import Header from "../components/Login/Header";
import Signup from "../components/Login/Signup";
import Headerr from "../components/header/Header";
export default function SignupPage() {
  return (
    <div className="">
      <Headerr />
      <div className="min-h-full h-[89vh] flex items-center justify-center  bg-base-200 py-12 px-4 sm:px-6 lg:px-8">
        <div className="border border-solid p-10 rounded-2xl">
          <div className="max-w-md w-full space-y-8">
            <Header
              heading="Signup to create an account"
              paragraph="Already have an account? "
              linkName="Login"
              linkUrl="/Login"
            />
            <Signup />
          </div>
        </div>
      </div>
    </div>
  );
}
