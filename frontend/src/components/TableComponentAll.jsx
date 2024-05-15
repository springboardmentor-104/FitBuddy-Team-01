import { Table } from "antd";
import React from "react";
import ExerciseStatusTypography from "../pages/ExerciseStatusTypography";
import DietStatusTypography from "../pages/DietStatusTypography";
import "./Table.css";

const TableComponentAll = () => {
  const [AllExercises, setAllExercises] = React.useState([]);
  const [AllDiets, setAllDiets] = React.useState([]);
  // const [selectedRowKeys, setSelectedRowKeys] = React.useState([]);

  React.useEffect(() => {
    fetchDataAllExercises();
  }, []);

  React.useEffect(() => {
    fetchDataAllDiets();
  }, []);

  const fetchDataAllExercises = async () => {
    try {
      const allexerciseResponse = await fetch(
        "https://api.github.com/users/mralexgray/repos"
      );
      if (allexerciseResponse.status !== 200) {
        throw new Error("Failed to fetch exercise data");
      }
      const allexerciseData = await allexerciseResponse.json();
      setAllExercises(allexerciseData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchDataAllDiets = async () => {
    try {
      const alldietsResponse = await fetch(
        "https://api.github.com/users/mralexgray/repos"
      );
      if (alldietsResponse.status !== 200) {
        throw new Error("Failed to fetch exercise data");
      }
      const alldietsData = await alldietsResponse.json();
      setAllDiets(alldietsData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  //   S.No.	Exercise Name	Category	Sets	Estimated Time	Status	Date
  const AllExercisesColumns = [
    { dataIndex: "id", title: "S.No.", width: 50, className: "my-font" },
    {
      dataIndex: "name",
      title: "Exercise Name",
      width: 130,
      className: "my-font",
    },
    {
      dataIndex: "category",
      title: "Category",
      width: 130,
      className: "my-font",
    },
    {
      dataIndex: "sets",
      title: "Sets",
      width: 90,
      className: "my-font",
    },
    {
      dataIndex: "estimatedTime",
      title: "Estimated Time",
      className: "my-font",
    },
    {
      dataIndex: "status",
      title: "Status",
      className: "my-font",
      render: (value, row) => <ExerciseStatusTypography done={value} />,
    },
    {
      dataIndex: "date",
      title: "Date",
      className: "my-font",
    },
  ];

  //   S.No.	Diet Name	Quantity	Calories	Time to Eat	Status	Date
  const AllDietsColumns = [
    { dataIndex: "id", title: "S.No.", width: 50, className: "my-font" },
    { dataIndex: "name", title: "Diet Name", width: 130, className: "my-font" },
    {
      dataIndex: "category",
      title: "Quantity",
      width: 130,
      className: "my-font",
    },
    {
      dataIndex: "sets",
      title: "Calories",
      width: 90,
      className: "my-font",
    },
    {
      dataIndex: "estimatedTime",
      title: "Time to Eat",
      className: "my-font",
    },
    {
      dataIndex: "status",
      title: "Status",
      className: "my-font",
      render: (value, row) => <DietStatusTypography done={value} />,
    },
    {
      dataIndex: "date",
      title: "Date",
      className: "my-font",
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
      {/* All Exercises */}
      <div className="d-flex justify-content-between">
        <div>
          <h4 className="text-lg font-bold mb-2" style={{ color: "#4154f1" }}>
            <strong>All Exercises</strong>
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
        dataSource={AllExercises}
        columns={AllExercisesColumns}
        // rowSelection={rowSelection}
        pagination={{
          defaultPageSize: 5,
          total: AllExercises.length,
          pageSizeOptions: ["5", "10", "20", "25", "50", "100"],
          showSizeChanger: true,
        }}
      />

      {/* All Diets */}
      <div className="d-flex justify-content-between">
        <div>
          <h4 className="text-lg font-bold mb-2" style={{ color: "#4154f1" }}>
            <strong>All Diets</strong>
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
        dataSource={AllDiets}
        columns={AllDietsColumns}
        // rowSelection={rowSelection}
        pagination={{
          defaultPageSize: 5,
          total: AllDiets.length,
          pageSizeOptions: ["5", "10", "20", "25", "50", "100"],
          showSizeChanger: true,
        }}
      />
    </>
  );
};

export default TableComponentAll;
