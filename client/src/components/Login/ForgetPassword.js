import Input from "./Input";
import { forgotPasswordFields } from "../../constants/formFields";
import FormAction from "./FormAction";
import { useState } from "react";
import { forgetPassword } from "../../Api/Api";
import { useNavigate } from "react-router-dom";
import login from "../../assets/login.png";
import Headerr from "../header/Header";

const ForgetPassword = () => {
  const fields = forgotPasswordFields;
  const fieldsState = {};
  fields.map((field) => (fieldsState[field.id] = ""));
  const [forgotPasswordState, setForgotPasswordState] = useState(fieldsState);

  function handleChange(e) {
    setForgotPasswordState({
      ...forgotPasswordState,
      [e.target.id]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { Email } = forgotPasswordState;
    console.log(Email);
    forgetPassword(Email)
      .then((response) => {
        console.log(response.data);
        // TODO: show success message to user
      })
      .catch((error) => {
        console.log(error);
        // TODO: show error message to user
      });
  }

  return (
    <div>
         <Headerr/>
    <div className="w-full max-w-md mx-auto mt-40">
       
      <form
        className=" shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        
        <div className="flex justify-center">
          {" "}
          <img className="h-20 w-20 " alt="logo" src={login} />
        </div>
        <p>Please Enter Your Email:</p>
        <div className="mb-4">
          {fields.map((field) => (
            <Input
              key={field.id}
              handleChange={handleChange}
              value={forgotPasswordState[field.id]}
              labelText={field.labelText}
              labelFor={field.labelFor}
              id={field.id}
              name={field.name}
              type={field.type}
              isRequired={field.isRequired}
              placeholder={field.placeholder}
            />
          ))}
        </div>

       

        <FormAction text="Reset Password" />
      </form>
    </div>
    </div>
  );
};

export default ForgetPassword;
