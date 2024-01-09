import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, Form, Button, Row, Col, Input, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import data from "../data";
import { Helmet } from "react-helmet-async";
import { LuRefreshCw, LuSearch } from "react-icons/lu";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import NavbarInner from "../components/NavbarInner";
import { Oval } from "react-loader-spinner";

interface DataType {
  _id: number;
  key: string;
  artName: string;
  category: string;
  startDate: string;
  endDate: string;
  status: boolean;
  images: number[];
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
    render: (_, art, _id) => (
      <span className="flex justify-evenly items-center flex-col sm:flex-row">
        {art.status ? (
          <Tag color="green" key={art._id}>
            on display
          </Tag>
        ) : (
          <Tag color="red" key={art._id}>
            not display
          </Tag>
        )}

        <Link to={`/art/${art._id}`} className="!m-0">
          <EyeOutlined /> view
        </Link>
      </span>
    ),
  },
];

const HomePage: React.FC = () => {
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [searchText, setSearchText] = useState<String>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const response = {
        status: "success",
        data: data,
      };
      if (response) {
        setDataSource(response.data);
        setIsLoading(false);
      }
    }, 1000);
  }, []);

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

  const handleSearch = () => {
    console.log("s: ", searchText);
    const newDataSource = data.filter((art, _id) => {
      return art.artName.toLowerCase().includes(searchText.toLowerCase());
    });
    setDataSource(newDataSource);
  };

  const onFinish = (values: any) => {
    console.log("Received values:", values);
    handleSearch();
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
    showLessItems: true,
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

  return isLoading ? (
    <div className="flex justify-center items-center min-vh-50">
      <Oval strokeWidth={4} />
    </div>
  ) : (
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
        <div>
          <NavbarInner />
          <Card className="card-sm-0 bg-gray-200 sm:pt-4 sm:pb-12 rounded-3xl border-0">
            <h3 className="font-bold">Dashboard</h3>
            <div className="bg-white rounded-lg drop-shadow-md p-2 sm:p-4">
              <Row gutter={10} className="mb-2">
                <Col span={18} md={12}>
                  <Form.Item
                    name="searchText"
                    wrapperCol={{ span: 24 }}
                    label={
                      <div className="font-medium ml-2 mr-5 sm:ml-0 sm:mr-0">
                        Search
                      </div>
                    }
                    colon={false}
                  >
                    <Input
                      onChange={(e) => setSearchText(e.target.value)}
                      placeholder="art name"
                    />
                  </Form.Item>
                </Col>

                <Col span={4} className="flex space-x-2">
                  <Form.Item wrapperCol={{ span: 12 }}>
                    <Button
                      htmlType="submit"
                      style={{ lineHeight: "100%" }}
                      icon={
                        <LuSearch
                          className="text-white"
                          style={{ fontSize: "16px" }}
                        />
                      }
                      className="bg-blue-900 hover:bg-blue-800"
                    ></Button>
                  </Form.Item>
                  <Form.Item wrapperCol={{ span: 12 }}>
                    <Button
                      onClick={() => {
                        setDataSource(data);
                      }}
                      icon={<LuRefreshCw style={{ fontSize: "16px" }} />}
                      className="bg-gray-100 hover:bg-gray-200"
                      style={{ lineHeight: "100%" }}
                    ></Button>
                  </Form.Item>
                </Col>

                <Col
                  span={24}
                  md={8}
                  className="flex space-x-2 mb-6 md:justify-end "
                >
                  <Button
                    onClick={deleteSelected}
                    icon={<DeleteOutlined />}
                    className="shadow-md"
                  ></Button>
                  <Button
                    onClick={deleteAllData}
                    icon={<DeleteOutlined style={{ fontSize: "16px" }} />}
                    className="shadow-md"
                  >
                    Delete All
                  </Button>
                </Col>
              </Row>

              <p>
                {dataSource.length}/{data.length} results
              </p>
              <Table
                columns={columns}
                dataSource={dataSource}
                pagination={paginationConfig}
                rowSelection={{ ...rowSelectionConfig, type: "checkbox" }}
              />
            </div>
          </Card>
        </div>
      </Form>
    </div>
  );
};

export default HomePage;
