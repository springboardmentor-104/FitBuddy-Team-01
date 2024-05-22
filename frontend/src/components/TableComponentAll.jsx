import { Table } from "antd";
import React from "react";
import ExerciseStatusTypography from "../pages/ExerciseStatusTypography";
import DietStatusTypography from "../pages/DietStatusTypography";
import "./Table.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../context/auth'; 
import axios from 'axios'

const TableComponentAll = () => {
  const[auth, setAuth] = useAuth();
  const token = auth?.token;
  
  const [AllExercises, setAllExercises] = React.useState([]);
  const [AllDiets, setAllDiets] = React.useState([]);
  // const [selectedRowKeys, setSelectedRowKeys] = React.useState([]);

  React.useEffect(() => {
    fetchDataAllExercises();
    // eslint-disable-line no-console
  }, []);

  React.useEffect(() => {
    fetchDataAllDiets();
    // eslint-disable-line no-console
  }, []);

  const fetchDataAllExercises = async () => {
    try {
      const allExercisesResponse = await axios.get("http://localhost:8080/api/v1/history/today/exercise", {
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
  
      setAllExercises(transformedData); // Assuming you have a state variable named allExercises to store the transformed data
    } catch (error) {
    }
  };
  
  const fetchDataAllDiets = async () => {
    try {
      const alldietsResponse = await axios.get("http://localhost:8080/api/v1/history/today/diet", {
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
  
      setAllDiets(transformedData);
    } catch (error) {
    }
  };
  const handleStatusClick = async (id, type,currentStatus) => {
    const newStatus = currentStatus === 'pending' ? 'completed' : 'pending';

    try {
      const response = await axios.put(`http://localhost:8080/api/v1/goal/update/${id}/status`, {
        status: newStatus,
      }, {
        headers: {
          Authorization: `${token}`, // replace with actual token
        },
      });

      if (response.status === 200) {
        toast.success("Status updated successfully!");
        // Conditionally update state based on the type
        if (type === 'exercise') {
          setAllExercises((prevExercises) =>
            prevExercises.map((exercise) =>
              exercise.id === id ? { ...exercise, status: newStatus } : exercise
            )
          );
        } else if (type === 'diet') {
          setAllDiets((prevDiets) =>
            prevDiets.map((diet) =>
              diet.id === id ? { ...diet, status: newStatus } : diet
            )
          );
        }
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      toast.error("Error updating status: " + error.message);
    }
  };

    const AllExercisesColumns = [
    { dataIndex: "index", title: "S.No.", width: 50, className: "my-font" },
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
      dataIndex: "time",
      title: "Estimated Time",
      className: "my-font",
    },
    {
      dataIndex: "status",
      title: "Status",
      className: "my-font",
      render: (value, row) => (
        <ExerciseStatusTypography
          done={value}
          onClick={() => handleStatusClick(row.id, 'exercise', value)}
        />
      ),
    },
    {
      dataIndex: "date",
      title: "Date",
      className: "my-font",
    },
  ];

  //   S.No.	Diet Name	Quantity	Calories	Time to Eat	Status	Date
  const AllDietsColumns = [
    { dataIndex: "index", title: "S.No.", width: 50, className: "my-font" },
    { dataIndex: "name", title: "Diet Name", width: 130, className: "my-font" },
    {
      dataIndex: "quantity",
      title: "Quantity",
      width: 130,
      className: "my-font",
    },
    {
      dataIndex: "calories",
      title: "Calories",
      width: 90,
      className: "my-font",
    },
    {
      dataIndex: `category`,
      title: "Time to Eat",
      className: "my-font",
    },
    {
      dataIndex: "status",
      title: "Status",
      className: "my-font",
      render: (value, row) => (
        <DietStatusTypography
          done={value}
          onClick={() => handleStatusClick(row.id, 'diet',value)}
        />
      ),   
    },
    {
      dataIndex: "date",
      title: "Date",
      className: "my-font",
    },
  ];
  
  return (
    <>
      <ToastContainer/>

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
        rowKey={(record) => record?.id}
        dataSource={AllExercises || []}
        columns={AllExercisesColumns || null}
        // rowSelection={rowSelection}
        pagination={{
          defaultPageSize: 5,
          total: AllExercises.length,
          pageSizeOptions: ["5", "10", "20", "25", "50", "100"],
          showSizeChanger: true,
        }}
        scroll={{ x: true }}
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
        scroll={{ x: true }}
      />
    </>
  );
};

export default TableComponentAll;
