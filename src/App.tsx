import { Button } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { LoadingButton } from "@mui/lab";
import React, { useEffect, useState } from "react";
import "./App.scss";
import NavbarComponent from "./components/navbar/navbar";
import useGetStatus from "./hooks/useGetStatus";

import {
  createProduct,
  getProducts,
} from "./redux_store/product/product_action";
import { resetState } from "./redux_store/product/product_slice";
import { useAppDispatch, useAppSelector } from "./redux_store/store";
import { useReactTable } from "@tanstack/react-table";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Name", width: 130 },
  { field: "avatar", headerName: "Avatar", width: 130 },
  {
    field: "type",
    headerName: "Type",
    // type: "number",
    width: 90,
  },
  {
    field: "description",
    headerName: "Description",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
  },
  {
    field: "price",
    headerName: "Price",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
  },
  {
    field: "Update",
    headerName: "Update",
    sortable: false,
    width: 160,
    renderCell: (id) => {
      return (
        <button
          style={{
            padding: "5px 30px",
            backgroundColor: "transparent",
            color: "#d35400",
            border: "1px solid #d35400",
            cursor: "pointer",
          }}
          onClick={() => {
            console.log(id.id);
          }}
        >
          Update
        </button>
      );
    },
  },
  {
    field: "Delete",
    headerName: "Delete",
    sortable: false,
    width: 160,
    renderCell: () => {
      return (
        <button
          style={{
            padding: "5px 30px",
            backgroundColor: "transparent",
            color: "#d63031",
            border: "1px solid #d63031",
            cursor: "pointer",
          }}
        >
          Delete
        </button>
      );
    },
  },
];

function App() {
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(false);
  // const [data, setData] = useState<IProduct[]>([]);

  // const fetchData = async () => {
  //   try {
  //     setLoading(true);
  //     setError(false);
  //     const res = await productApi.getProducts();
  //     setData(res.data);
  //     setLoading(false);
  //   } catch (error) {
  //     setLoading(false);
  //     setError(true);
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  const { data } = useAppSelector((state) => state.product);
  const [loading, error] = useGetStatus("getProducts");
  const [loadingCreate, errorCreate] = useGetStatus("createProduct");

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProducts(""));
  }, []);

  const AddProduct = () => {
    dispatch(
      createProduct({
        id: "123",
        name: "321123",
        avatar: "1222",
        description: "242343",
        type: "1334",
        price: 13,
      })
    );
  };

  return (
    <div className="container">
      <NavbarComponent />

      <div className="container_top_text">
        <p style={{ marginBottom: "0" }}>Practice Typescript</p>
        <LoadingButton
          variant="contained"
          loading={loadingCreate}
          onClick={AddProduct}
        >
          Thêm
        </LoadingButton>
      </div>
      <div className="container_body_table" style={{ marginTop: "5px" }}>
        {loading ? (
          <span>Loading...</span>
        ) : error ? (
          <span>
            Co loi thu lai{" "}
            <button onClick={() => dispatch(getProducts(""))}>Thu lai</button>
          </span>
        ) : (
          <DataGrid
            rows={data}
            columns={columns}
            pageSize={8}
            rowsPerPageOptions={[8]}
            checkboxSelection
            // onSelectionModelChange={(itm) => console.log(itm)}
          />
        )}
      </div>
    </div>
  );
}

export default App;
