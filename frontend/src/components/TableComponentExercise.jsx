import { Table } from "antd";
import React from "react";
import ExerciseStatusTypography from "../pages/ExerciseStatusTypography";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../context/auth'; 
import axios from 'axios'

const TableComponentExercise = () => {
  const [auth, setAuth] = useAuth();
  const token = auth?.token;

  const [exerciseHistory, setExerciseHistory] = React.useState([]);
  // const [selectedRowKeys, setSelectedRowKeys] = React.useState([]);

  React.useEffect(() => {
    fetchData();
    // eslint-disable-line no-console
  }, []);

  const fetchData = async () => {
    try {
      const allExercisesResponse = await axios.get("http://localhost:8080/api/v1/history/all/exercise", {
        headers: {
          Authorization: `${token}`
        }
      });
  
      if (allExercisesResponse.status !== 200) {
        toast.error(allExercisesResponse.message);
      }
  
      const allExercisesData = allExercisesResponse.data;
  
      // Transforming data
      const transformedData = allExercisesData.map((item, index) => ({
        index: index + 1,
        id: item._id,
        name: item.goalId.name,
        category: item.goalId.category,
        sets: item.goalId.sets,
        time: item.goalId.time,
        status: item.status,
        date: item.createdAt
      }));
  
      setExerciseHistory(transformedData); // Assuming you have a state variable named allExercises to store the transformed data
    } catch (error) {
    }
  };

  const columns = [
    { dataIndex: "index", title: "S.No.", width: 50 },
    { dataIndex: "name", title: "Exercise Name", width: 130 },
    { dataIndex: "category", title: "Category", width: 130 },
    {
      dataIndex: "sets",
      title: "Sets",
      width: 90,
    },
    {
      dataIndex: "time",
      title: "Estimated Time",
    },
    {
      dataIndex: "status",
      title: "Status",
      className: "my-font",
      render: (value, row) => (
        <ExerciseStatusTypography
          done={value}
        />
      ),
    },
    {
      dataIndex: "date",
      title: "Date",
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
        <ToastContainer/>
      <div className="d-flex justify-content-between">
        <div>
          <h4 className="text-lg font-bold mb-2" style={{ color: "#4154f1" }}>
            <strong>Exercise History</strong>
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

export default TableComponentExercise;
