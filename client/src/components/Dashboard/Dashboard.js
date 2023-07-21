import React from "react";
// import { useAuth } from "../../context/AuthProvider";
import { fetchConversations } from "../../Api/Api";
import Header from "../header/Header";
import SideMenu from "../SideMenu";
import { BiMessageDetail } from "react-icons/bi";
import { BsUiChecksGrid } from "react-icons/bs";
import { AiOutlineStar } from "react-icons/ai";
import { Card, Space, Statistic, Table, Typography } from "antd";
import { useEffect, useState } from "react";

export default function Dashboard() {
  //  const { conversationChangeCount } = useAuth();
  const [conversationLength, setConversationLength] = useState(0);

  function DashboardCard({ title, value, icon }) {
    return (
      <Card className="bg-inherit ">
        <Space direction="horizontal">
          {icon}
          <Statistic title={title} value={value} className="text-white" />
        </Space>
      </Card>
    );
  }

  function RecentMassages() {
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      setLoading(true);
      const token = JSON.parse(localStorage.getItem("user") || "{}")?.token;
      const pageNumber = 1;
      const pageSize = 100;
      fetchConversations(pageNumber, pageSize, token)
        .then((res) => {
          setConversationLength(res.length);
          const trimmedRes = res.slice(0, 5);
          setDataSource(trimmedRes);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching conversations:", error);
          setLoading(false);
        });
    }, []);

    return (
      <div>
        <Typography.Text className="flex justify-center text-inherit">
          Recent Messages
        </Typography.Text>
        <Table
          className={`flex justify-center`}
          columns={[
            {
              title: "Title",
              dataIndex: "title",
              width: 300,
              key: "title",
            },
            {
              title: "Date",
              dataIndex: "date",
              width: 300,
              key: "date",
            },
          ]}
          loading={loading}
          dataSource={dataSource}
          Key={(record) => record.id}
          pagination={{
            pageSize: 5,
            hideOnSinglePage: true,
            position: "bottomCenter",
          }}
        ></Table>
      </div>
    );
  }

  return (
    <div className="flex flex-auto h-screen">
      <SideMenu />

      <div className="grow">
        <Header />

        <div className="flex   sm:gap-10 md:gap-10 xl:gap-x-28 xl:gap-y-10 mt-5 mb-10  justify-center items-center flex-wrap">
          <DashboardCard
            key="0"
            icon={
              <BiMessageDetail
                style={{
                  color: "green",
                  backgroundColor: "rgba(0,255,0,0.25)",
                  borderRadius: 20,
                  fontSize: 35,
                  padding: 8,
                }}
              />
            }
            title={"Conversations"}
            value={conversationLength}
          />
          <DashboardCard
            key="1"
            className=""
            icon={
              <BsUiChecksGrid
                style={{
                  color: "blue",
                  backgroundColor: "rgba(0,0,255,0.25)",
                  borderRadius: 10,
                  fontSize: 35,
                  padding: 8,
                }}
              />
            }
            title={"Polls"}
            // value={inventory}
          />
          <DashboardCard
            key="2"
            icon={
              <AiOutlineStar
                style={{
                  color: "purple",
                  backgroundColor: "rgba(0,255,255,0.25)",
                  borderRadius: 20,
                  fontSize: 35,
                  padding: 8,
                }}
              />
            }
            title={"Ratings"}
            // value={customers}
          />
        </div>

        <div className="flex flex-1 justify-center items-center content-center">
          <RecentMassages />
        </div>
      </div>
    </div>
  );
}
