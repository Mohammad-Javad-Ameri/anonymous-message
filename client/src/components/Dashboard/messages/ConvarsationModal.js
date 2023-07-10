import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Input, Modal, Table } from "antd";
import { fetchComments, postCommentReply } from "../../../Api/Api";

export default function ConversationModal({ conversation, visible, onClose }) {
  const [loadingComments, setLoadingComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [replyText, setReplyText] = useState("");
  const [selectedCommentId, setSelectedCommentId] = useState(null);

  useEffect(() => {
    setLoadingComments(true);
    let token = JSON.parse(localStorage.getItem("user") || "{}")?.token;
    fetchComments(conversation.conversationId, 1, 5, token)
      .then((comments) => {
        setComments(comments);
        console.log(comments);
      })
      .catch((error) => {
        console.log("Error fetching comments:", error);
      })
      .finally(() => {
        setLoadingComments(false);
      });
  }, [conversation]);

  const handleReplyTextChange = (e) => {
  
    setReplyText(e.target.value);
  };

  const handleReplySubmit = async () => {
    try {
      let token = JSON.parse(localStorage.getItem("user") || "{}").token;
      const response = await postCommentReply(
        conversation.conversationId,
        replyText,
        token,
        selectedCommentId // add selectedCommentId parameter to API call
      );

      setReplyText("");
      setSelectedCommentId(null); // clear selectedCommentId after submitting reply
    } catch (error) {
      console.log("Error submitting reply:", error);
    }
  };

  const handleReplyClick = (commentId) => {
    setSelectedCommentId(commentId);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const columns = [
    {
      title: "Comment",
      dataIndex: "comment",
      render: (text, record) => {
        return (
          <div>
            <p>{record.text}</p>
          </div>
        );
      },
    },
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Action",
      dataIndex: "commentId",
      render: (commentId, record) => {
        return (
          <div className="flex justify-center">
            <Button type="link"   onClick={() => handleReplyClick(commentId)}>Reply</Button>
          </div>
        );
      },
    },
  ];

  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [visible]);

  return (
    <Modal
      title={conversation.title}
      onOk={onClose}
      open={visible}
      onCancel={onClose}
      footer={[
        <Button  type="text" key="back" onClick={onClose}>
          Close
        </Button>,
        <Button
          key="submit"
          type="text"
          onClick={handleReplySubmit}
          disabled={!replyText || !selectedCommentId} // disable submit button if no reply text or no comment selected
        >
          Submit
        </Button>,
      ]}
    >
      <Table
        dataSource={comments}
        columns={columns}
        pagination={{
          pageSize: 5,
        }}
        loading={loadingComments}
        rowKey={(record) => record.commentId}
      />
      {selectedCommentId &&<Form>
        <Form.Item>
          <Input.TextArea
            className="mt-1"
            placeholder="Enter your reply"
            value={replyText}
            onChange={handleReplyTextChange}
            ref={inputRef}
          />
        </Form.Item>
      </Form>}
    </Modal>
  );
}
