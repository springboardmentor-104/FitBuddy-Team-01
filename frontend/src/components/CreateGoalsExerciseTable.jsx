import { Table } from "antd";
import React, { useEffect } from "react";
import CreateGoalsExerciseActions from "./CreateGoalsExerciseActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../context/auth";
import axios from "axios";

const CreateGoalsExerciseTable = () => {
  const [exerciseHistory, setExerciseHistory] = React.useState([]);
  // console.log(token)
  const [auth, setAuth] = useAuth();
  useEffect(() => {
    fetchExerciseData();
  }, [auth]);
  const token = auth?.token;
  const fetchExerciseData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/goal/exercises",
        {
          headers: {
            Authorization: `${auth?.token}`,
          },
        }
      );

      if (response.status !== 200) {
        toast.error("Failed to fetch exercise data");
      } else {
        const data = response.data;
        if (data.length > 0) {
          const exerciseData = data.map((item, index) => ({
            ...item,
            index: index + 1,
          }));
          setExerciseHistory(exerciseData);
        }
      }
    } catch (error) {
      toast.error("Error fetching data:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/v1/goal/exercise/${id}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Exercise deleted successfully");
        setExerciseHistory(exerciseHistory.filter((item) => item._id !== id));
      } else {
        toast.error("Failed to delete exercise");
      }
    } catch (error) {
      toast.error("Error deleting exercise:", error);
    }
  };

  const columns = [
    { dataIndex: "index", title: "S.No.", width: 20 },
    { dataIndex: "name", title: "Exercise Name", width: 20 },
    { dataIndex: "category", title: "Exercise Category", width: 20 },
    { dataIndex: "sets", title: "Exercise Sets", width: 20 },
    { dataIndex: "time", title: "Estimated Time(Mins)", width: 20 },
    // { dataIndex: "date", title: "Date", width: 20 },
    {
      dataIndex: "status",
      title: "Delete",
      render: (value, row) => (
        <CreateGoalsExerciseActions onDelete={() => handleDelete(row._id)} />
      ),
      width: 20,
    },
  ];

  return (
    <>
      <ToastContainer />
      <div
        className="d-flex justify-content-between"
        style={{ marginTop: "40px" }}
      >
        <div>
          <h4 className="text-lg font-bold mb-2" style={{ color: "#4154f1" }}>
            {/* <strong>Exercise Table</strong> */}
          </h4>
        </div>
      </div>
      <Table
        rowKey={(record) => record.id}
        dataSource={exerciseHistory || []}
        columns={columns || null}
        // rowSelection={rowSelection}
        pagination={{
          defaultPageSize: 5,
          total: exerciseHistory.length,
          pageSizeOptions: ["5", "10", "20", "25", "50", "100"],
          showSizeChanger: true,
        }}
        scroll={{ x: true }}
      />
    </>
  );
};

export default CreateGoalsExerciseTable;
