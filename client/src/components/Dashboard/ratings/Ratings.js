import React, { useContext, useEffect, useRef, useState } from "react";
import Header from "../../header/Header";
import SideMenu from "../../SideMenu";
import { Form, Input, Popconfirm, Table } from "antd";
import RatingModal from "./RatingModal";
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

export default function Polls() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [editingKey, setEditingKey] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // useEffect(() => {
  //   setLoading(true);
  //   getInventory().then((res) => {
  //     setDataSource(res.products);
  //     setLoading(false);
  //   });
  // }, []);

  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };
  const [count, setCount] = useState(2);
  const defaultColumns = [
    {
      title: "Title",
      dataIndex: "Title",

      editable: true,
    },
    {
      title: "Star",
      dataIndex: "Star",
    },
    {
      title: "Date",
      dataIndex: "Date",
    },
    {
      title: "Action",
      dataIndex: "Action",
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            className=""
            onConfirm={() => handleDelete(record.key)}
          >
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];
  // const handleAdd = () => {
  //   const newData = {
  //     key: count,
  //     name: `Edward King ${count}`,
  //     age: "32",
  //     address: `London, Park Lane no. ${count}`,
  //   };
  //   setDataSource([...dataSource, newData]);
  //   setCount(count + 1);
  // };
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

  const onAddLead = (newLeadObj) => {
    const newData = {
      key: count,
      Title: newLeadObj.Title,
      Star: newLeadObj.Star,

      Date: new Date().toLocaleDateString(),
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
    // Handle adding the new lead here
    console.log("New lead added:", newLeadObj);
    closeModal();
  };

  return (
    <div className="">
      <div className="flex flex-auto h-screen">
        <SideMenu />

        <div className="grow">
          <Header />
          <div className="flex justify-between mt-10 sm:mx-14 border-b-2 ">
            <p className="mt-2 mb-2 text-xl text-">Rating Dashboard</p>
            <label
              className="btn mb-2 sm:mx-3 "
              htmlFor="my_modal_6"
              onClick={openModal}
              type="primary"
            >
              Add a Rate
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
        <RatingModal closeModal={closeModal} onAddLead={onAddLead} />
      )}
    </div>
  );
}
