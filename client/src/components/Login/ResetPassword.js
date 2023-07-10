import Input from "./Input";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import { useState } from "react";
// import { resetPassword } from "../../Api/Api";
import { useNavigate, useParams } from "react-router-dom";
import login from "../../assets/login.png";
import Headerr from "../header/Header";

const ResetPassword = () => {
  const { resetToken } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (password && confirmPassword && password === confirmPassword) {
  //     resetPassword(resetToken, password)
  //       .then((response) => {
  //         console.log(response.data);
  //         // TODO: show success message to user
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //         // TODO: show error message to user
  //       });
  //   }
  // };

  return (
    <div>
      <Headerr/>
    <div className="w-full max-w-md mx-auto mt-40">
      <form
        className="shadow-md rounded px-8 pt-6 pb-8 mb-4"
        // onSubmit={handleSubmit}
      >
        <div className="flex justify-center">
          {" "}
          <img className="h-20 w-20 " alt="logo" src={login} />
        </div>
        <p>Enter your new password:</p>
        <div className="mb-4">
          <Input
            handleChange={(e) => setPassword(e.target.value)}
            value={password}
            labelText="New Password"
            labelFor="newPassword"
            id="newPassword"
            name="newPassword"
            type="password"
            isRequired={true}
            placeholder="Enter your new password"
          />
          <Input
            handleChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            labelText="Confirm Password"
            labelFor="confirmPassword"
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            isRequired={true}
            placeholder="Confirm your new password"
          />
        </div>

        <FormAction text="Reset Password" />
      </form>
    </div>
    </div>
  );
};

export default ResetPassword;