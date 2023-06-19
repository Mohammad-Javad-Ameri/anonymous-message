const loginFields = [
  {
    labelText: "Email address",
    labelFor: "email-address",
    id: "Email",
    name: "email",
    type: "email",
    autoComplete: "email",
    isRequired: true,
    placeholder: "Email address",
  },
  {
    labelText: "Password",
    labelFor: "password",
    id: "Password",
    name: "password",
    type: "password",
    autoComplete: "current-password",
    isRequired: true,
    placeholder: "Password",
  },
];

const signupFields = [
  {
    labelText: "Email address",
    labelFor: "email-address",
    id: "Email",
    name: "email",
    type: "email",
    autoComplete: "email",
    isRequired: true,
    placeholder: "Email address",
  },
  {
    labelText: "First Name",
    labelFor: "firstName",
    id: "FristName",
    name: "firstName",
    type: "text",
    autoComplete: "name",
    isRequired: true,
    placeholder: "Enter your first name",
  },
  {
    labelText: "Last Name",
    labelFor: "lastName",
    id: "LastName",
    name: "lastName",
    type: "text",
    autoComplete: "name",
    isRequired: true,
    placeholder: "Enter your last name",
  },

  {
    labelText: "Password",
    labelFor: "password",
    id: "Password",
    name: "password",
    type: "password",
    autoComplete: "current-password",
    isRequired: true,
    placeholder: "Password",
  },
  {
    labelText: "Confirm Password",
    labelFor: "confirm-password",
    id: "ConfirmPassword",
    name: "confirm-password",
    type: "password",
    autoComplete: "confirm-password",
    isRequired: true,
    placeholder: "Confirm Password",
  },
];

export { loginFields, signupFields };
