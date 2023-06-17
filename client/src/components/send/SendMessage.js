import React, { useState } from "react";
import Axios from "axios";
import messageLogo from "../../assets/message.jpg";
import Headerr from "../header/Header";
export default function SendMessage() {
  const initialInputState = { name: "", message: "" };
  const [newMessage, setNewMessage] = useState(initialInputState);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const { title, message } = newMessage;

  const handleInputChange = (e) => {
    setNewMessage({ ...newMessage, [e.target.name]: e.target.value });
  };

  const sendMessage = (e) => {
    if (!title || !message) {
      setToastMessage("Please fill out all fields.");
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 5000);
      return;
    }
    Axios({
      method: "POST",
      url: "http://localhost:5000/send",
      data: { title, message },
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.data.msg === "suc") {
          console.log("Message has been sent");
          setNewMessage(initialInputState);
          setToastMessage("Message sent successfully.");
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
      <div className="flex  justify-center my-3 ">
        <div className="card-side rounded-2xl border  bg-base-100 shadow-xl">
          <figure className=" max-w-md rounded-2xl ">
            <img src={messageLogo} className="" alt="message" />
          </figure>

          <div className="card-body rounded-2xl  py-3 ">
            <h2 className="card-title text-xl font-bold">
              Send a Secret Message
            </h2>
            <div className="">
              <form>
                <div className="mb-4">
                  <label className="block  font-bold mb-2" htmlFor="title">
                    Title
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full   leading-tight focus:outline-none focus:shadow-outline"
                    name="title"
                    onChange={handleInputChange}
                    value={title}
                    type="text"
                    placeholder="Enter your Title here"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="block  font-bold mb-1" htmlFor="message">
                    Message
                  </label>
                  <textarea
                    className="shadow appearance-none border rounded w-full h-20  leading-tight focus:outline-none focus:shadow-outline"
                    value={message}
                    onChange={handleInputChange}
                    required
                    name="message"
                    placeholder="What's on your mind?"
                  />
                </div>
                <div className="card-actions justify-end ">
                  <button
                    className=" btn btn-outline font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={sendMessage}
                    type="button"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {showToast && (
        <div className="toast toast-top toast-end">
          <div className="alert alert-warning">
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
}
