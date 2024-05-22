import { Table } from "antd";
import React from "react";
import CreateGoalsDietActions from "./CreateGoalsDietActions";

const CreateGoalsDietTable = () => {
  const [DietHistory, setDietHistory] = React.useState([]);
  // const [selectedRowKeys, setSelectedRowKeys] = React.useState([]);

  React.useEffect(() => {
    fetchDietData();
  }, []);

  const fetchDietData = async () => {
    try {
      const DietResponse = await fetch(
        "https://api.github.com/users/mralexgray/repos"
      );
      if (DietResponse.status !== 200) {
        throw new Error("Failed to fetch exercise data");
      }
      const DietData = await DietResponse.json();
      setDietHistory(DietData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const columns = [
    { dataIndex: "id", title: "S.No.", width: 20 },
    { dataIndex: "name", title: "Diet Name", width: 20 },
    { dataIndex: "category", title: "Time to Eat", width: 20 },
    {
      dataIndex: "sets",
      title: "Quantity",
      width: 20,
    },
    {
      dataIndex: "estimatedTime",
      title: "Total Calories",
      width: 20,
    },
    {
      dataIndex: "date",
      title: "Date",
      width: 20,
    },
    {
      dataIndex: "status",
      title: "Actions",
      render: (value, row) => <CreateGoalsDietActions />,
      width: 20,
    },
  ];

  // const onSelectChange = (newSelectedRowKeys) => {
  //   console.log("selectedRowKeys changed: ", newSelectedRowKeys);
  //   setSelectedRowKeys(newSelectedRowKeys);
  // };

  // const rowSelection = {
  //   selectedRowKeys,
  //   onChange: onSelectChange,
  // };

  return (
    <>
      <div
        className="d-flex justify-content-between"
        style={{ marginTop: "40px" }}
      >
        <div>
          <h4 className="text-lg font-bold mb-2" style={{ color: "#4154f1" }}>
            {/* <strong>Exercise Table</strong> */}
          </h4>
        </div>
        {/* <div>
          {selectedRowKeys?.length > 0 && (
            <button className="btn btn-sm btn-danger">Delete</button>
          )}
        </div> */}
      </div>
      <Table
        rowKey={(record) => record.id}
        dataSource={DietHistory || []}
        columns={columns || null}
        // rowSelection={rowSelection}
        pagination={{
          defaultPageSize: 5,
          total: DietHistory.length,
          pageSizeOptions: ["5", "10", "20", "25", "50", "100"],
          showSizeChanger: true,
        }}
      />
    </>
  );
};

export default CreateGoalsDietTable;
