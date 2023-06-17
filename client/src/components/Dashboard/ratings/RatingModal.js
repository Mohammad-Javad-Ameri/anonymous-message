import { useState } from "react";
import InputText from "../inputText";
import { Rate } from "antd";
const desc = ["terrible", "bad", "normal", "good", "wonderful"];

const INITIAL_LEAD_OBJ = {
  Title: "",
  Star: "",
  CreateAt: "",
};

export default function RatingModal({ closeModal, onAddLead, visible }) {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [leadObj, setLeadObj] = useState(INITIAL_LEAD_OBJ);
  const [value, setValue] = useState(3);

  const close = () => {
    setLeadObj(INITIAL_LEAD_OBJ);
    setErrorMessage("");
    closeModal();
  };

  const saveNewLead = () => {
    if (leadObj.Title.trim() === "")
      return setErrorMessage("Title is required!");
    else if (leadObj.Star.trim() === "")
      return setErrorMessage("Star  is required!");
    else {
      let newLeadObj = {
        Title: leadObj.Title,
        Star: leadObj.Star,
      };
      onAddLead(newLeadObj);
      close();
    }
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    if (updateType === "Star") {
      setValue(value);
      setLeadObj({ ...leadObj, Star: desc[value - 1] });
    }
    if (updateType === "Title") {
      setLeadObj({ ...leadObj, [updateType]: value });
    }
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

          <span>
            <Rate
              tooltips={desc}
              onChange={(value) =>
                updateFormValue({ updateType: "Star", value })
              }
              value={value}
            />
            {value ? (
              <span className="ant-rate-text">{desc[value - 1]}</span>
            ) : (
              ""
            )}
          </span>

          <p styleClass="mt-16">{console.log(leadObj)}</p>
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
