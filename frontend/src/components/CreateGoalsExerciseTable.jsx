import { Table } from "antd";
import React from "react";
import CreateGoalsExerciseActions from "./CreateGoalsExerciseActions";

const CreateGoalsExerciseTable = () => {
  const [exerciseHistory, setExerciseHistory] = React.useState([]);
  // const [selectedRowKeys, setSelectedRowKeys] = React.useState([]);

  React.useEffect(() => {
    fetchExerciseData();
  }, []);

  const fetchExerciseData = async () => {
    try {
      const exerciseResponse = await fetch(
        "https://api.github.com/users/mralexgray/repos"
      );
      if (exerciseResponse.status !== 200) {
        throw new Error("Failed to fetch exercise data");
      }
      const exerciseData = await exerciseResponse.json();
      setExerciseHistory(exerciseData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const columns = [
    { dataIndex: "id", title: "S.No.", width: 20 },
    { dataIndex: "name", title: "Exercise Name", width: 20 },
    { dataIndex: "category", title: "Exercise Category", width: 20 },
    {
      dataIndex: "sets",
      title: "Exercise Sets",
      width: 20,
    },
    {
      dataIndex: "estimatedTime",
      title: "Estimated Time(Mins)",
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
      render: (value, row) => <CreateGoalsExerciseActions />,
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
        dataSource={exerciseHistory}
        columns={columns}
        // rowSelection={rowSelection}
        pagination={{
          defaultPageSize: 5,
          total: exerciseHistory.length,
          pageSizeOptions: ["5", "10", "20", "25", "50", "100"],
          showSizeChanger: true,
        }}
      />
    </>
  );
};

export default CreateGoalsExerciseTable;
