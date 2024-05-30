import { Table } from "antd";
import React from "react";
import DietStatusTypography from "../pages/DietStatusTypography";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../context/auth";
import axios from "axios";

const TableComponentDiet = () => {
  const [auth, setAuth] = useAuth();
  const token = auth?.token;
  const [dietHistory, setDietHistory] = React.useState([]);

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const alldietsResponse = await axios.get(
        "http://localhost:8080/api/v1/history/all/diet",
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      if (alldietsResponse.status !== 200) {
        toast.error(alldietsResponse.message);
      }

      const alldietsData = alldietsResponse.data;

      // Transforming data
      const transformedData = alldietsData.map((item, index) => ({
        index: index + 1,
        id: item._id,
        name: item.goalId.name,
        category: item.goalId.category,
        quantity: item.goalId.quantity,
        calories: item.goalId.calories,
        status: item.status,
        date: new Date(item.createdAt).toLocaleDateString(), // Formatting the date
      }));

      setDietHistory(transformedData);
    } catch (error) {
      toast.error("Failed to fetch data.");
    }
  };

  const columns = [
    { dataIndex: "index", title: "S.No.", width: 50 },
    { dataIndex: "name", title: "Diet Name", width: 130 },
    { dataIndex: "quantity", title: "Quantity", width: 130 },
    { dataIndex: "calories", title: "Calories", width: 90 },
    { dataIndex: "category", title: "Time to Eat", width: 150 },
    {
      dataIndex: "status",
      title: "Status",
      width: 100,
      className: "my-font",
      render: (value, row) => <DietStatusTypography done={value} />,
    },
    { dataIndex: "date", title: "Date", width: 100 },
  ];

  const totalWidth = columns.reduce((sum, column) => sum + column.width, 0);

  return (
    <>
      <ToastContainer />
      <div className="flex justify-between items-center mb-4">
        <div>
          <h4 className="text-lg font-bold" style={{ color: "#4caf50" }}>
            <strong>Diet History</strong>
          </h4>
        </div>
        {/* Additional button or actions can be added here */}
      </div>
      <div className="overflow-x-auto">
        <Table
          rowKey={(record) => record.id}
          dataSource={dietHistory || []}
          columns={columns || null}
          pagination={{
            defaultPageSize: 5,
            total: dietHistory.length,
            pageSizeOptions: ["5", "10", "20", "25", "50", "100"],
            showSizeChanger: true,
          }}
          scroll={{ x: totalWidth }}
          className="min-w-full bg-white rounded-lg shadow-md"
          rowClassName={(record, index) =>
            index % 2 === 0 ? "bg-gray-50" : "bg-white"
          }
          style={{
            borderCollapse: "separate",
            borderSpacing: "0 10px",
          }}
        />
      </div>
    </>
  );
};

export default TableComponentDiet;
