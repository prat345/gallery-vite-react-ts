import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, Form, Button, Row, Col, Input, Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import data from "../data";
import { Helmet } from "react-helmet-async";
import {
  DeleteOutlined,
  ReloadOutlined,
  SearchOutlined,
} from "@ant-design/icons";

interface DataType {
  _id: number;
  key: string;
  artName: string;
  category: string;
  startDate: string;
  endDate: string;
  status: boolean;
}

const columns: ColumnsType<DataType> = [
  {
    title: "ID",
    dataIndex: "_id",
    key: "_id",
    sorter: (a, b) => a._id - b._id,
    sortDirections: ["ascend", "descend"],
    responsive: ["lg"],
  },
  {
    title: "artName",
    dataIndex: "artName",
    key: "artName",
    sorter: (a, b) => a.artName.localeCompare(b.artName),
    sortDirections: ["ascend"],
  },
  {
    title: "category",
    dataIndex: "category",
    key: "category",
    responsive: ["md"],
  },
  {
    title: "startDate",
    key: "startDate",
    responsive: ["md"],
    render: (_, art, _id) => (art.status ? art.startDate : "-"),
  },
  {
    title: "endDate",
    key: "endDate",
    responsive: ["md"],
    render: (_, art, _id) => (art.status ? art.endDate : "-"),
  },
  {
    title: "status",
    key: "status",
    filters: [
      {
        text: "On Display",
        value: true,
      },
      {
        text: "Not Display",
        value: false,
      },
    ],
    onFilter: (value, record) => record.status === value,
    render: (_, art, id) => (
      <Space size="middle">
        {art.status ? (
          <Tag color="green" key={id}>
            on display
          </Tag>
        ) : (
          <Tag color="red" key={id}>
            not display
          </Tag>
        )}

        <Link to={`/art/${id}`}>
          <Button>view</Button>
        </Link>
      </Space>
    ),
  },
];

const onFinish = (values: any) => {
  // Handle form submission here
  console.log("Received values:", values);
};

const HomePage: React.FC = () => {
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  useEffect(() => {
    setDataSource(data);
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);

  const deleteAllData = () => {
    setDataSource([]);
  };

  const deleteSelected = () => {
    const newDataSource = dataSource.filter(
      (record) => !selectedRowKeys.includes(record.key)
    );
    setDataSource(newDataSource);
    setSelectedRowKeys([]);
  };

  // Pagination
  const handlePageSizeChange = (_currentSize: number, newSize: number) => {
    setPageSize(newSize);
  };
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };
  const paginationConfig = {
    showSizeChanger: true, // Show page size changer
    pageSizeOptions: ["3", "5", "7", "10"], // Define available page sizes
    defaultPageSize: 3, // Default page size
    onShowSizeChange: handlePageSizeChange,
    pageSize: pageSize,
    total: dataSource.length,
    current: currentPage,
    onChange: handlePageChange,
  };

  // Row Select
  const onSelectChange = (
    newSelectedRowKeys: React.Key[],
    _selectedRows: DataType[]
  ) => {
    console.log("Delete Rows: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelectionConfig = {
    selectedRowKeys,
    selections: [Table.SELECTION_ALL, Table.SELECTION_NONE],
    onChange: onSelectChange,
  };

  return (
    <div className="container">
      <Helmet>
        <title>Dashboard</title>
      </Helmet>

      <Form
        onFinish={onFinish}
        initialValues={{
          remember: true,
        }}
      >
        <Card className="card-sm-0 bg-gray-200">
          <h2 className="text-black">Board</h2>
          <div className="bg-white p-3 rounded-2 drop-shadow-md">
            <Row>
              <Col span={16} className="flex justify-start space-x-2">
                <Form.Item
                  label={
                    <div className="font-semibold ml-2 mr-5 sm:ml-0 sm:mr-0">
                      Search
                    </div>
                  }
                  colon={false}
                >
                  <Input />
                </Form.Item>
                <Form.Item wrapperCol={{ span: 4 }}>
                  <Button icon={<SearchOutlined />}></Button>
                </Form.Item>
                <Form.Item wrapperCol={{ span: 4 }}>
                  <Button
                    onClick={() => {
                      setDataSource(data);
                    }}
                    icon={<ReloadOutlined />}
                  ></Button>
                </Form.Item>
              </Col>
              <Col span={8} className="flex justify-end space-x-2">
                <Button onClick={deleteSelected} icon={<DeleteOutlined />}>
                  Delete
                </Button>
                <Button onClick={deleteAllData} icon={<DeleteOutlined />}>
                  Delete All
                </Button>
              </Col>
            </Row>

            <Table
              columns={columns}
              dataSource={dataSource}
              pagination={paginationConfig}
              rowSelection={{ ...rowSelectionConfig, type: "checkbox" }}
            />
          </div>
        </Card>
      </Form>
    </div>
  );
};

export default HomePage;
