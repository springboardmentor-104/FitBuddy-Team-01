import { Table } from "antd";
import React from "react";
import DietStatusTypography from "../pages/DietStatusTypography";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../context/auth'; 
import axios from 'axios';

const TableComponentDiet = () => {
  const[auth, setAuth] = useAuth();
  const token = auth?.token;
  const [dietHistory, setDietHistory] = React.useState([]);
  // const [selectedRowKeys, setSelectedRowKeys] = React.useState([]);

  React.useEffect(() => {
    fetchData();
    // eslint-disable-line no-console
  }, []);

  const fetchData = async () => {
    try {
      const alldietsResponse = await axios.get("http://localhost:8080/api/v1/history/all/diet", {
        headers: {
          Authorization: `${token}`
        }
      });
  
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
        status:item.status,
        date:item.createdAt
      }));
  
      setDietHistory(transformedData);
    } catch (error) {
    }
  };

  const columns = [
    { dataIndex: "index", title: "S.No.", width: 50 },
    { dataIndex: "name", title: "Diet Name", width: 130 },
    { dataIndex: "quantity", title: "Quantity", width: 130 },
    { dataIndex: "calories", title: "Calories", width: 90 },
    { dataIndex: "category", title: "Time to Eat" },
    {
      dataIndex: "status",
      title: "Status",
      className: "my-font",
      render: (value, row) => (
        <DietStatusTypography
          done={value}
        />
      ),   
    },
    { dataIndex: "date", title: "Date" },
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
          <h4 className="text-lg font-bold mb-2" style={{ color: "#4caf50" }}>
            <strong>Diet History</strong>
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
        dataSource={dietHistory}
        columns={columns}
        // rowSelection={rowSelection}
        pagination={{
          defaultPageSize: 5,
          total: dietHistory.length,
          pageSizeOptions: ["5", "10", "20", "25", "50", "100"],
          showSizeChanger: true,
        }}
      />
    </>
  );
};

export default TableComponentDiet;
