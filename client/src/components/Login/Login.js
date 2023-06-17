import Input from "./Input";
import { loginFields } from "../../constants/formFields";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import { useState } from "react";

const fields = loginFields;
const fieldsState = {};
fields.map((field) => (fieldsState[field.id] = ""));

export default function Login() {
  const [loginState, setLoginState] = useState(fieldsState);

  function handleChange(e) {
    setLoginState({ ...loginState, [e.target.id]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    authenticateUser();
  }

  function authenticateUser() {}

  return (
    <form className="mt-8 space-y-6">
      <div className="-space-y-px m-5">
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={loginState[field.id]}
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
      <FormExtra />
      <FormAction handleSubmit={handleSubmit} text="Login" />
    </form>
  );
}
