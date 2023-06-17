import Header from "../components/Login/Header";
import Login from "../components/Login/Login";
import Headerr from "../components/header/Header";
export default function LoginPage() {
  return (
    <div className="  ">
      <Headerr />
      <div className=" h-[90vh] flex  items-center  justify-center">
        <div className="border border-solid p-10 flex rounded-2xl shadow-lg max-w-3xl  items-center ">
          <div className=" max-w-md w-full space-y-8 ">
            <Header
              heading="Login to your account"
              paragraph="Don't have an account yet? "
              linkName="Signup"
              linkUrl="/signup"
            />
            <Login />
          </div>
        </div>
      </div>
    </div>
  );
}
