import Input from "./Input";
import { loginFields } from "../../constants/formFields";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import { useState } from "react";
import { login } from "../../Api/Api";
import { useNavigate } from "react-router-dom";

const fields = loginFields;
const fieldsState = {};
fields.map((field) => (fieldsState[field.id] = ""));

export default function Login() {
  const [loginState, setLoginState] = useState(fieldsState);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function handleChange(e) {
    setLoginState({ ...loginState, [e.target.id]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault(); 
    authenticateUser();
    
  }

  function authenticateUser() {
    const { Email, Password } = loginState;
    login(Email, Password)
      .then((response) => {
        navigate("/dashboard");
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
        setError(error.response.data);
      });
  }

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
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
        <div className="p-0 m-0">{error && <p className="text-red-500">{error}</p>}</div>
      </div>
      
      <FormExtra />
      
      <FormAction text="Login" />
    </form>
  );
}