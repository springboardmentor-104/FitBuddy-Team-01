import { Table } from "antd";
import React from "react";
import CreateGoalsDietActions from "./CreateGoalsDietActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../context/auth";
import axios from "axios";

const CreateGoalsDietTable = () => {
  const [auth, setAuth] = useAuth();
  const token = auth.token;

  const [DietHistory, setDietHistory] = React.useState([]);

  React.useEffect(() => {
    fetchDietData();
  }, []);

  const fetchDietData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/goal/diets",
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      if (response.status !== 200) {
        toast.error("Failed to fetch diet data");
        return;
      }

      const data = response.data;
      const dietData = data.map((item, index) => ({
        ...item,
        index: index + 1, // Add an index for serial number
      }));

      setDietHistory(dietData);
    } catch (error) {
      toast.error("Error fetching data:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/v1/goal/diet/${id}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Diet deleted successfully");
        setDietHistory(DietHistory.filter((item) => item._id !== id));
      } else {
        toast.error("Failed to delete diet");
      }
    } catch (error) {
      toast.error("Error deleting diet:", error);
    }
  };

  const columns = [
    { dataIndex: "index", title: "S.No.", width: 20 },
    { dataIndex: "name", title: "Diet Name", width: 20 },
    { dataIndex: "category", title: "Time to Eat", width: 20 },
    { dataIndex: "quantity", title: "Quantity", width: 20 },
    { dataIndex: "calories", title: "Total Calories", width: 20 },
    { dataIndex: "date", title: "Date", width: 20 },
    {
      dataIndex: "status",
      title: "Delete",
      render: (value, row) => (
        <CreateGoalsDietActions onDelete={() => handleDelete(row._id)} />
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
            {/* <strong>Diet Table</strong> */}
          </h4>
        </div>
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
        scroll={{ x: true }}
      />
    </>
  );
};

export default CreateGoalsDietTable;
