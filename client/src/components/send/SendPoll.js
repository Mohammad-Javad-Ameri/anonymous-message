import React, { useState } from "react";
import Axios from "axios";
import PollLogo from "../../assets/poll.jpg";
import Headerr from "../header/Header";
export default function SendPoll() {
  const initialInputState = { selectedOption: "" };
  const [newPoll, setNewPoll] = useState(initialInputState);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleOptionChange = (event) => {
    setNewPoll({ selectedOption: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newPoll.selectedOption === "") {
      setToastMessage("Please Pick one the options.");
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 5000);
      return;
    }
    Axios({
      method: "POST",
      url: "http://localhost:5000/send",
      data: newPoll,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.data.msg === "suc") {
          setNewPoll(initialInputState);
          setToastMessage("Poll has been sent succesfully.");
          setShowToast(true);
          setTimeout(() => {
            setShowToast(false);
          }, 5000);
        } else {
          console.log("FAILURE");
        }
      })
      .catch((error) => {
        console.log(error);
        setToastMessage("Failed to send message.");
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 5000);
      });
  };

  return (
    <div>
      <Headerr />
      <div className="flex  justify-center my-5">
        <div className="card-side rounded-2xl  bg-base-100 shadow-xl">
          <figure className=" max-w-md rounded-2xl ">
            <img src={PollLogo} className="" alt="message" />
          </figure>

          <div className="card-body rounded-2xl  py-3 ">
            <h2 className="card-title text-xl font-bold">
              Share your opinion in this anonymous poll.
            </h2>
            <div className="">
              <form className="">
                <div className="form-control  w-full max-w-xs mb-4 justify-center">
                  <label className="label">
                    <span className="label-text">Pick One</span>
                  </label>
                  <select
                    className=" select select-bordered "
                    value={newPoll.selectedOption}
                    onChange={handleOptionChange}
                    required
                  >
                    <option value="" disabled>
                      Pick one
                    </option>
                    <option>Star Wars</option>
                    <option>Harry Potter</option>
                    <option>Lord of the Rings</option>
                    <option>Planet of the Apes</option>
                    <option>Star Trek</option>
                  </select>
                </div>
                <div className="card-actions justify-end ">
                  <button
                    className=" btn btn-outline font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={handleSubmit}
                    type="button"
                  >
                    Submit
                  </button>
                  {showToast && (
                    <div className="toast toast-top toast-end">
                      <div className="alert alert-success">
                        <span>{toastMessage}</span>
                      </div>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
