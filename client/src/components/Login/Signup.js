import { useState } from "react";
import { signupFields } from "../../constants/formFields";
import FormAction from "./FormAction";
import Input from "./Input";
import { signup } from "../../Api/Api";
import { useNavigate } from "react-router-dom";

const fields = signupFields;
let fieldsState = {};
  
fields.forEach((field) => (fieldsState[field.id] = ""));

export default function Signup() {
  const [signupState, setSignupState] = useState(fieldsState);
  const [error, setError] = useState(null);

  const handleChange = (e) =>
    setSignupState({ ...signupState, [e.target.id]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    createAccount();
  };
console.log(signupState);
const createAccount = () => {
  const { Email, FristName , LastName , Password , ConfirmPassword} = signupState;
  signup(Email, FristName , LastName , Password , ConfirmPassword)
    .then((response) => {
      console.log(response.data);
     
      navigate("/login");
    })
    .catch((error) => {
      console.log(error.response.data.description);
      setError(error.response.data.description);
    });
};
const navigate = useNavigate();
  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="">
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={signupState[field.id]}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
          />
        ))}
        {error && <p className="text-red-500">{error}</p>}
        <FormAction text="Signup" />
      </div>
    </form>
  );
}