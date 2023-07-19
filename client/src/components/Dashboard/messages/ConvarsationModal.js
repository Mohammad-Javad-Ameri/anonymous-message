import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Input, Modal, Table } from "antd";
import {
  fetchComments,
  postCommentReply,
  getReplyComments,
} from "../../../Api/Api";

export default function ConversationModal({ conversation, visible, onClose }) {
  const [loadingComments, setLoadingComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [replies, setReplies] = useState([]);
  const [replyText, setReplyText] = useState("");
  const [selectedCommentId, setSelectedCommentId] = useState(null);

   const loadComments = async () => {
    setLoadingComments(true);
    let token = JSON.parse(localStorage.getItem("user") || "{}")?.token;

    fetchComments(conversation.conversationId, 1, 100, token)
      .then(async (comments) => {
        const fetchedReplies = await Promise.all(
          comments.map(async (comment) => {
            try {
              const replyResponse = await getReplyComments(comment.commentId);
              return {
                commentId: comment.commentId,
                replies: replyResponse.data.text,
              };
            } catch (error) {
              console.log("Error fetching replies:", error);
              return { commentId: comment.commentId, replies: [] };
            }
          })
        );
        const replyMap = fetchedReplies.reduce(
          (acc, { commentId, replies }) => {
            acc[commentId] = replies;
            return acc;
          },
          {}
        );
        setReplies(replyMap);
        setComments(comments);
        console.log(comments);
      })
      .catch((error) => {
        console.log("Error fetching comments:", error);
      })
      .finally(() => {
        setLoadingComments(false);
      });
  }
    useEffect(() => {
    loadComments()
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
        selectedCommentId
      );
      setReplyText("");
      setSelectedCommentId(null);

      loadComments()  // fetch comments after a reply has been posted 
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
      title: "Replies",
      dataIndex: "commentId",
      render: (commentId) => {
        const commentReplies = replies[commentId] || [];

        return (
          <ul>
            {/* {commentReplies.map((reply) => (
            <li key={reply.commentId}>{reply.text}</li>
          ))} */}
            {<p>{commentReplies}</p>}
          </ul>
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
            <Button type="link" onClick={() => handleReplyClick(commentId)}>
              Reply
            </Button>
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
        <Button type="text" key="back" onClick={onClose}>
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
      {selectedCommentId && (
        <Form>
          <Form.Item>
            <Input.TextArea
              className="mt-1"
              placeholder="Enter your reply"
              value={replyText}
              onChange={handleReplyTextChange}
              ref={inputRef}
            />
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
}
