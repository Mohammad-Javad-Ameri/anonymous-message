import { useState } from "react";
import InputText from "../inputText";

const INITIAL_LEAD_OBJ = {
  Title: "",
  Poll1: "",
  Poll2: "",
  Poll3: "",
  Poll4: "",
  CreateAt: "",
};

export default function PollsModal({ closeModal, onAddLead, visible }) {
  // const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [leadObj, setLeadObj] = useState(INITIAL_LEAD_OBJ);

  const close = () => {
    setLeadObj(INITIAL_LEAD_OBJ);
    setErrorMessage("");
    closeModal();
  };

  const saveNewLead = () => {
    if (leadObj.Title.trim() === "")
      return setErrorMessage("Title is required!");
    else if (leadObj.Poll1.trim() === "")
      return setErrorMessage("Poll 1  is required!");
    else if (leadObj.Poll2.trim() === "")
      return setErrorMessage("Poll 2  is required!");
    else if (leadObj.Poll3.trim() === "")
      return setErrorMessage("Poll 3 is required!");
    else if (leadObj.Poll4.trim() === "")
      return setErrorMessage("Poll 4 is required!");
    else {
      let newLeadObj = {
        Title: leadObj.Title,
        Poll1: leadObj.Poll1,
        Poll2: leadObj.Poll2,
        Poll3: leadObj.Poll3,
        Poll4: leadObj.Poll4,
      };
      onAddLead(newLeadObj);
      close();
    }
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setLeadObj({ ...leadObj, [updateType]: value });
  };

  return (
    <>
      <input
        type="checkbox"
        id="my_modal_6"
        className={`modal-toggle  ${visible ? "visible" : ""}`}
      />
      <div className="modal">
        <div className="modal-box">
          <InputText
            type="text"
            defaultValue={leadObj.Title}
            updateType="Title"
            containerStyle="mt-4"
            labelTitle="Title"
            updateFormValue={updateFormValue}
          />

          <InputText
            type="text"
            defaultValue={leadObj.Poll1}
            updateType="Poll1"
            containerStyle="mt-4"
            labelTitle="Poll1"
            updateFormValue={updateFormValue}
          />
          <InputText
            type="text"
            defaultValue={leadObj.Poll2}
            updateType="Poll2"
            containerStyle="mt-4"
            labelTitle="Poll2"
            updateFormValue={updateFormValue}
          />
          <InputText
            type="text"
            defaultValue={leadObj.Poll3}
            updateType="Poll3"
            containerStyle="mt-4"
            labelTitle="Poll3"
            updateFormValue={updateFormValue}
          />
          <InputText
            type="text"
            defaultValue={leadObj.Poll4}
            updateType="Poll4"
            containerStyle="mt-4"
            labelTitle="Poll4"
            updateFormValue={updateFormValue}
          />

          <p styleClass="mt-16">{errorMessage}</p>
          <div className="modal-action">
            <button className="btn btn-ghost" onClick={() => close()}>
              Cancel
            </button>
            <button
              className="btn btn-primary px-6"
              onClick={() => saveNewLead()}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
