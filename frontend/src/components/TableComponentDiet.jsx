import { Table } from "antd";
import React from "react";
import DietStatusTypography from "../pages/DietStatusTypography";

const TableComponentDiet = () => {
  const [dietHistory, setDietHistory] = React.useState([]);
  // const [selectedRowKeys, setSelectedRowKeys] = React.useState([]);

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const dietResponse = await fetch(
        "https://api.github.com/users/mralexgray/repos"
      );
      if (dietResponse.status !== 200) {
        throw new Error("Failed to fetch diet data");
      }
      const dietData = await dietResponse.json();
      setDietHistory(dietData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const columns = [
    { dataIndex: "id", title: "S.No.", width: 50 },
    { dataIndex: "name", title: "Diet Name", width: 130 },
    { dataIndex: "category", title: "Quantity", width: 130 },
    { dataIndex: "sets", title: "Calories", width: 90 },
    { dataIndex: "estimatedTime", title: "Time to Eat" },
    {
      dataIndex: "status",
      title: "Status",
      render: (value, row) => <DietStatusTypography done={value} />,
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

  // Calculate the total width
  const totalWidth = columns.reduce((sum, column) => sum + column.width, 0);

  return (
    <>
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
        dataSource={dietHistory || []}
        columns={columns || null}
        // rowSelection={rowSelection}
        pagination={{
          defaultPageSize: 5,
          total: dietHistory.length,
          pageSizeOptions: ["5", "10", "20", "25", "50", "100"],
          showSizeChanger: true,
        }}
        scroll={{ x: totalWidth }}
      />
    </>
  );
};

export default TableComponentDiet;
