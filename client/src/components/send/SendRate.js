import React, { useState } from "react";
import Axios from "axios";
import RateLogo from "../../assets/rate.jpg";
import Headerr from "../header/Header";
import { Rate } from "antd";

const desc = ["terrible", "bad", "normal", "good", "wonderful"];
export default function SendRate() {
  const initialInputState = { description: "" };
  const [newRate, setNewRate] = useState(initialInputState);
  const [value, setValue] = useState(3);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleRateChange = (event) => {
    setValue(event);
    setNewRate({ description: desc[event - 1] });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newRate.description === "") {
      setToastMessage("Please Pick one of the stars.");
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 5000);
      return;
    }
    Axios({
      method: "POST",
      url: "http://localhost:5000/send",
      data: desc[value - 1],
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.data.msg === "suc") {
          console.log("Rate has been sent");
          setValue(3);
          setToastMessage("Your Rate has been sent successfully.");
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
          <figure className=" max-w-sm rounded-2xl ">
            <img src={RateLogo} className="" alt="message" />
          </figure>

          <div className="card-body rounded-2xl  py-3 max-sm:p-3">
            <h2 className="card-title text-xl font-bold flex justify-center">
              Please Rate this Opinion.
            </h2>
            <div className="">
              <form className="">
                <h2 className="mb-2 flex justify-center">Opinion </h2>
                <span className="flex justify-center items-center">
                  <Rate
                    tooltips={desc}
                    onChange={handleRateChange}
                    value={value}
                  />
                  {value ? (
                    <span className="ant-rate-text ">{desc[value - 1]}</span>
                  ) : (
                    ""
                  )}
                </span>
                <div className="card-actions mt-4 justify-center ">
                  <button
                    className=" btn btn-outline font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={handleSubmit}
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
