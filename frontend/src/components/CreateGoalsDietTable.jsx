import { Table } from "antd";
import React from "react";
import CreateGoalsDietActions from "./CreateGoalsDietActions";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../context/auth';
import axios from 'axios'

const CreateGoalsDietTable = () => {
  const [auth, setAuth] = useAuth();
  const token = auth.token;

  const [DietHistory, setDietHistory] = React.useState([]);
  // const [selectedRowKeys, setSelectedRowKeys] = React.useState([]);

  React.useEffect(() => {
    fetchDietData();
    // eslint-disable-line no-console
  }, []);

  // const fetchDietData = async () => {
  //   try {
  //     const DietResponse = await fetch(
  //       "https://api.github.com/users/mralexgray/repos"
  //     );
  //     if (DietResponse.status !== 200) {
  //       throw new Error("Failed to fetch exercise data");
  //     }
  //     const DietData = await DietResponse.json();
  //     setDietHistory(DietData);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  // const fetchDietData = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:8080/api/v1/goal/diets", {
  //       headers: {
  //         Authorization: `${token}`
  //       }
  //     });

  //     if (response.status !== 200) {
  //       toast.danger("Failed to fetch exercise data");
  //     }

  //     const DietData =  response.data;
  //     setDietHistory(DietData);
  //   } catch (error) {
  //     toast.danger("Error fetching data:", error);
  //   }
  // };

  const fetchDietData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/goal/diets", {
        headers: {
          Authorization: `${token}`
        }
      });

      if (response.status !== 200) {
        toast.error("Failed to fetch diet data");
        return;
      }

      const data = response.data;
      const dietData = [];

      for (let i = 0; i < data.length; i++) {
        const item = {
          ...data[i],
          index: i + 1 // Add an index for serial number
        };
        dietData.push(item);
      }

      setDietHistory(dietData);
    } catch (error) {
      toast.error("Error fetching data:", error);
    }
  };
  const columns = [
    { dataIndex: "index", title: "S.No.", width: 20 },
    { dataIndex: "name", title: "Diet Name", width: 20 },
    { dataIndex: "category", title: "Time to Eat", width: 20 },
    {
      dataIndex: "quantity",
      title: "Quantity",
      width: 20,
    },
    {
      dataIndex: "calories",
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
    <ToastContainer/>
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
        dataSource={DietHistory}
        columns={columns}
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
