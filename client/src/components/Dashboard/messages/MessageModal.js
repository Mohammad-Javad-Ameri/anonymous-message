import { useState } from "react";
import InputText from "../inputText";
import { createConversation } from "../../../Api/Api";
import { useAuth } from "../../../context/AuthProvider";

const INITIAL_LEAD_OBJ = {
  Title: "",
};

export default function MessageModal({ closeModal, onAddLead, visible }) {
  // const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [leadObj, setLeadObj] = useState(INITIAL_LEAD_OBJ);
  const { conversationIds, setConversationIds } = useAuth();

  const close = () => {
    setLeadObj(INITIAL_LEAD_OBJ);
    setErrorMessage("");
    closeModal();
  };

  const saveNewLead = async () => {
    if (leadObj.Title.trim() === "")
      return setErrorMessage("Title is required!");
    else {
      try {
        const token = JSON.parse(localStorage.getItem("user") || "{}")?.token;

        const response = await createConversation(leadObj.Title, token);

        setConversationIds([...conversationIds, response]);
        onAddLead(response);
        close();
      } catch (error) {
        console.error(error); // handle error
        setErrorMessage("Failed to save lead");
      }
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
