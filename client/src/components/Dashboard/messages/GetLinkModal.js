import React from "react";
import { Modal, Button, Input } from "antd";
import copy from "copy-to-clipboard";

export default function GetLinkModal({ conversationId, onClose }) {
  console.log(conversationId);
  const url = `http://localhost:3000/sendmessage?conversationId=${conversationId.conversationId}`;

  const handleCopy = () => {
    copy(url);
    alert("Link copied to clipboard!");
  };

  return (
    <Modal className=""
      title="Get Link"
      visible={true}
      onCancel={onClose}
      onOk={onClose}
      footer={[
        <Button key="copy" onClick={handleCopy}>
          Copy to clipboard
        </Button>,
        <Button key="cancel" onClick={onClose}>
          Close
        </Button>,
      ]}
    >
      <p>Copy and share this link:</p>
      <Input value={url} readOnly style={{ width: "100%" }} />
    </Modal>
  );
}