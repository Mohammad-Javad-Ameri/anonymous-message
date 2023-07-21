import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Table } from "antd";
import messageLogo from "../../assets/message.jpg";
import Headerr from "../header/Header";
import { fetchComments, postComment, getReplyComments } from "../../Api/Api";

export default function SendMessage() {
  const initialInputState = { message: "" };
  const [newMessage, setNewMessage] = useState(initialInputState);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [conversationId, setConversationId] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const { message } = newMessage;

  const handleInputChange = (e) => {
    setNewMessage({ ...newMessage, [e.target.name]: e.target.value });
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!message) {
      setToastMessage("Please fill out all fields.");
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 5000);
      return;
    }
    try {
      let token = JSON.parse(localStorage.getItem("user") || "{}").token;
      await postComment(conversationId, message, token); // post the comment

      setNewMessage(initialInputState);
      setToastMessage("Message sent successfully.");
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 5000);

      // refetch the comments if the message is successfully sent
      fetchConversationComments(conversationId);
    } catch (error) {
      setToastMessage("Failed to send message.");
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 5000);
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const conversationIdParam = searchParams.get("conversationId");
    if (conversationIdParam) {
      setConversationId(conversationIdParam);
      fetchConversationComments(conversationIdParam);
    }
  }, [location.search]);

  const fetchConversationComments = async (conversationId) => {
    setLoading(true);
    try {
      let token = JSON.parse(localStorage.getItem("user") || "{}").token;
      const commentsResponse = await fetchComments(
        conversationId,
        1,
        100,
        token
      );
      let commentsWithReply = [];
      for (let comment of commentsResponse) {
        let replyCommentResponse = await getReplyComments(comment.commentId);

        commentsWithReply.push({
          text: comment.text,
          reply: replyCommentResponse.data.text,
        });
      }
      setComments(commentsWithReply);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const dataSource = comments.map((comment, index) => {
    return {
      key: index,
      commentText: comment.text,
      replyComment: comment.reply,
    };
  });

  const columns = [
    {
      title: "Comment",
      dataIndex: "commentText",
      key: "commentText",
    },
    {
      title: "Reply",
      dataIndex: "replyComment",
      key: "replyComment",
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
    },
  ];

  return (
    <div>
      <Headerr />
      <div className="flex justify-center my-3 ">
        <div className="card-side rounded-2xl border bg-base-100 shadow-xl">
          <figure className=" max-w-md rounded-2xl ">
            <img src={messageLogo} className="" alt="message" />
          </figure>

          <div className="card-body rounded-2xl  py-3 ">
            <h2 className="card-title text-xl font-bold">
              Send a Secret Message
            </h2>
            <div className="">
              <form>
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
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </form>
              <div className="border-t-2 my-6">
                <h2 className="card-title text-xl font-bold my-5 ">
                  All Conversations
                </h2>
                <div className="">
                  <Table
                    dataSource={dataSource}
                    columns={columns}
                    loading={loading}
                    pagination={{ pageSize: 3 }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showToast && (
        <div className="toast toast-top toast-end z-10 mt-20">
          <div className="alert alert-warning">
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
}
