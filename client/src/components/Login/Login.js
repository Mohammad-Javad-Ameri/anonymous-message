import Input from "./Input";
import { loginFields } from "../../constants/formFields";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import { useState } from "react";
import { login } from "../../Api/Api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";

const fields = loginFields;
const fieldsState = {};
fields.map((field) => (fieldsState[field.id] = ""));

export default function Login() {
  const [loginState, setLoginState] = useState(fieldsState);

  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { updateAccessToken } = useAuth();

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
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
          updateAccessToken(response.data.token, response.data.refreshToken);
        }
        navigate("/dashboard");
      })
      .catch((error) => {
        console.log(error);
      setError(
          error.response?.data?.code ||
            error.response?.data?.[0]?.code ||
            "An error occurred"
        );
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
        <div className="p-0 m-0">
          {error && <p className="text-red-500">{error}</p>}
        </div>
      </div>

      <FormExtra />

      <FormAction text="Login" />
    </form>
  );
}
