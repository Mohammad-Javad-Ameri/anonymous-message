import React, { useContext, useEffect, useRef, useState } from "react";
import Headerr from "../../header/Header";
import SideMenu from "../../SideMenu";
import { Form, Input, Popconfirm, Table } from "antd";
import { useAuth } from "../../../context/AuthProvider";
import MessageModal from "./MessageModal";
import {
  fetchConversations,
  deleteConversation,
  getReplyComments,
} from "../../../Api/Api";
import ConversationModal from "./ConvarsationModal";
import GetLinkModal from "./GetLinkModal";
const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};
const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);
  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };
  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({
        ...record,
        ...values,
      });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };
  let childNode = children;
  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }
  return <td {...restProps}>{childNode}</td>;
};

export default function Messages() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [editingKey, setEditingKey] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { conversationChangeCount, changeConversation } = useAuth();
  const [isConversationModalOpen, setIsConversationModalOpen] = useState(false);
  const [isGetLinkModalOpen, setIsGetLinkModalOpen] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState(null);

  useEffect(() => {
    setLoading(true);
    let token = JSON.parse(localStorage.getItem("user") || "{}")?.token;
    const id = "m";

    fetchConversations(1, 100, token)
      .then((conversations) => {
        setDataSource(
          conversations.map((conv, i) => ({
            ...conv,
            title: conv.title,
            key: i,
            conversationId: conv.conversationId,
          }))
        );
      })
      .catch((error) => {
        console.log("Error fetching conversations:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [conversationChangeCount]);

  const handleDelete = async (key) => {
    try {
      // Find the conversationId of the selected record
      const getToken = JSON.parse(localStorage.getItem("user") || "{}")?.token;
      const selectedRecord = dataSource.find((item) => item.key === key);
      const conversationId = selectedRecord.conversationId;

      // Delete the conversation
      await deleteConversation(conversationId, getToken);

      // Fetch the updated conversations
      const conversations = await fetchConversations(1, 10, getToken);
      setDataSource(
        conversations.map((conv, i) => ({
          ...conv,
          title: conv.title,
          key: i,
          conversationId: conv.conversationId,
        }))
      );
      changeConversation();
    } catch (error) {
      console.log("Error deleting conversation:", error);
    }
  };
  const handleShowConversation = async (record) => {
    setSelectedConversation(record);
    setIsConversationModalOpen(true);

    try {
      let token = JSON.parse(localStorage.getItem("user") || "{}")?.token;

      const comments = await getReplyComments(record.commentId, token);

      const updatedDataSource = dataSource.map((item) => {
        if (item.conversationId === record.conversationId) {
          return {
            ...item,
            commentReply: comments.data,
          };
        }
        return item;
      });
      setDataSource(updatedDataSource);
    } catch (error) {
      console.log("Error fetching reply comments:", error);
    }
  };

  const handleGetLink = (record) => {
    setSelectedConversation(record);
    setIsGetLinkModalOpen(true);
  };

  const defaultColumns = [
    {
      title: "Title",
      dataIndex: "title",
      editable: true,
    },
    {
      title: "Date",
      dataIndex: "Date",
    },

    {
      title: "Action",
      dataIndex: "Action",
      render: (_, record) => (
        <div className="flex justify-end">
          <button className="mx-3" onClick={() => handleGetLink(record)}>
            Get Link
          </button>
          <button
            className="mx-3"
            onClick={() => handleShowConversation(record)}
          >
            Show Conversation
          </button>
          {dataSource.length >= 1 ? (
            <Popconfirm
              title="Sure to delete?"
              className=""
              onConfirm={() => handleDelete(record.key)}
            >
              <a>Delete</a>
            </Popconfirm>
          ) : null}
        </div>
      ),
    },
  ];

  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onAddLead = async (newLeadObj) => {
    // Handle adding the new lead here
    console.log("New lead added:", newLeadObj);
    closeModal();

    try {
      changeConversation();
    } catch (error) {
      console.log("Error fetching conversations:", error);
    }
  };

  return (
    <div className="">
      <div className="flex flex-auto h-screen">
        <SideMenu />

        <div className="grow">
          <Headerr />
          <div className="flex justify-between mt-10 sm:mx-14 border-b-2 ">
            <p className="mt-2 mb-2 text-xl text-">Messages Dashboard</p>
            <label
              className="btn mb-2 sm:mx-3 "
              htmlFor="my_modal_6"
              onClick={openModal}
              type="primary"
            >
              Add a Message
            </label>
          </div>

          <Table
            className="mt-4 sm:mx-14"
            loading={loading}
            components={components}
            columns={columns}
            bordered
            dataSource={dataSource}
            rowClassName={() => "editable-row"}
            pagination={{
              pageSize: 5,
            }}
          />
        </div>
      </div>
      {isModalOpen && (
        <MessageModal closeModal={closeModal} onAddLead={onAddLead} />
      )}
      {isConversationModalOpen && (
        <ConversationModal
          visible={isConversationModalOpen}
          onClose={() => setIsConversationModalOpen(false)}
          conversation={selectedConversation}
        />
      )}
      {isGetLinkModalOpen && (
        <GetLinkModal
          conversationId={selectedConversation}
          onClose={() => setIsGetLinkModalOpen(false)}
        />
      )}
    </div>
  );
}
