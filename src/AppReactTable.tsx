import { LoadingButton } from "@mui/lab";
import React, { useEffect, useState } from "react";
import "./App.scss";
import NavbarComponent from "./components/navbar/navbar";
import useGetStatus from "./hooks/useGetStatus";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  createProduct,
  getProducts,
  deleteProduct,
  getByIdProduct,
  updateProduct,
} from "./redux_store/product/product_action";
import { resetState } from "./redux_store/product/product_slice";
import { useAppDispatch, useAppSelector } from "./redux_store/store";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { IProduct } from "./interface";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationInput } from "./helpers/inputValidation";
import FormInput from "./FormInput";
import { isAwaitExpression } from "typescript";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  justifyContent: "space-between",
  boxShadow: 24,
  p: 4,
};

const defaultValues = {
  id: "",
  name: "",
  avatar: "",
  description: "",
  type: "",
  price: 0,
};

function AppReactTable() {
  const [open, setOpen] = useState(false);
  const [check, setCheck] = useState(true);
  const { data } = useAppSelector((state) => state.product);
  const [loading, error] = useGetStatus("getProducts");
  const [loadingCreate, errorCreate] = useGetStatus("createProduct");
  const columnHelper = createColumnHelper<IProduct>();
  const dispatch = useAppDispatch();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { control, handleSubmit, reset, setValue } = useForm<IProduct>({
    defaultValues,
    resolver: yupResolver(validationInput),
  });

  const columns = [
    columnHelper.accessor("id", {
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("name", {
      header: () => "Name",
      cell: (info) => info.renderValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("avatar", {
      header: () => <span>Avatar</span>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("type", {
      header: "Type",
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("description", {
      header: "Description",
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("price", {
      header: "Price",
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("id", {
      header: "Delete",
      cell: (info) => {
        return (
          <button
            style={{
              padding: "5px 30px",
              backgroundColor: "transparent",
              color: "#d35400",
              border: "1px solid #d35400",
              cursor: "pointer",
              marginLeft: "50%",
              transform: "translateX(-50%)",
              fontWeight: "600",
            }}
            onClick={async () => {
              await dispatch(deleteProduct(String(info.row._valuesCache.id)));
              await dispatch(getProducts(""));
            }}
          >
            Delete
          </button>
        );
      },
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("id", {
      header: "Update",
      cell: (info) => {
        return (
          <button
            style={{
              padding: "5px 30px",
              backgroundColor: "transparent",
              color: "#d35400",
              border: "1px solid #d35400",
              cursor: "pointer",
              marginLeft: "50%",
              transform: "translateX(-50%)",
              fontWeight: "600",
            }}
            onClick={async () => {
              const id: any = info.row._valuesCache.id;
              handleUpdate(id);
              setCheck(false);
            }}
          >
            Update
          </button>
        );
      },
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("id", {
      header: "See",
      cell: (info) => {
        return (
          <button
            style={{
              padding: "5px 30px",
              backgroundColor: "transparent",
              color: "#d35400",
              border: "1px solid #d35400",
              cursor: "pointer",
              marginLeft: "50%",
              transform: "translateX(-50%)",
              fontWeight: "600",
            }}
            onClick={async () => {
              await dispatch(getByIdProduct(String(info.row._valuesCache.id)));
            }}
          >
            See
          </button>
        );
      },
      footer: (info) => info.column.id,
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleUpdate = async (id: string) => {
    const found = await data.find((element) => element.id === id);
    reset(found);
    handleOpen();
  };

  const customHandleSubmit = (data: IProduct) => {
    dispatch(createProduct(data));
    handleClose();
    reset();
  };

  const customHandleSubmitUpdate = (data: IProduct) => {
    dispatch(updateProduct(data));
    handleClose();
    reset();
    dispatch(getProducts(""));
  };

  useEffect(() => {
    dispatch(getProducts(""));
  }, []);

  return (
    <div className="container">
      <NavbarComponent />

      <div className="container_top_text">
        <p style={{ marginBottom: "0" }}>Practice Typescript</p>
        <LoadingButton
          variant="contained"
          loading={loadingCreate}
          onClick={() => {
            reset();
            handleOpen();
            setCheck(true);
          }}
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
          <table>
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {check === true ? (
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <form onSubmit={handleSubmit(customHandleSubmit)}>
              <Box sx={style}>
                <Typography
                  id="transition-modal-title"
                  variant="h6"
                  component="h2"
                  style={{
                    textAlign: "center",
                    fontWeight: "600",
                    textTransform: "uppercase",
                  }}
                >
                  Thêm mới
                </Typography>
                <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                  <div style={{ width: "100%" }}>
                    <FormInput control={control} name="id" label="id" />
                    <FormInput control={control} name="name" label="name" />
                    <FormInput control={control} name="avatar" label="avatar" />
                    <FormInput
                      control={control}
                      name="description"
                      label="description"
                    />
                    <FormInput control={control} name="type" label="type" />
                    <FormInput control={control} name="price" label="price" />
                  </div>
                </Typography>
                <Typography>
                  <button
                    style={{
                      padding: "5px 30px",
                      backgroundColor: "transparent",
                      color: "#d35400",
                      border: "1px solid #0984e3",
                      cursor: "pointer",
                      marginTop: "30px",
                      marginLeft: "50%",
                      transform: "translateX(-50%)",
                    }}
                    type="submit"
                  >
                    Send
                  </button>
                </Typography>
              </Box>
            </form>
          </Fade>
        </Modal>
      ) : (
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <form onSubmit={handleSubmit(customHandleSubmitUpdate)}>
              <Box sx={style}>
                <Typography
                  id="transition-modal-title"
                  variant="h6"
                  component="h2"
                  style={{
                    textAlign: "center",
                    fontWeight: "600",
                    textTransform: "uppercase",
                  }}
                >
                  Chỉnh sửa
                </Typography>
                <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                  <div style={{ width: "100%" }}>
                    <FormInput control={control} name="id" label="id" />
                    <FormInput control={control} name="name" label="name" />
                    <FormInput control={control} name="avatar" label="avatar" />
                    <FormInput
                      control={control}
                      name="description"
                      label="description"
                    />
                    <FormInput control={control} name="type" label="type" />
                    <FormInput control={control} name="price" label="price" />
                  </div>
                </Typography>
                <Typography>
                  <button
                    style={{
                      padding: "5px 30px",
                      backgroundColor: "transparent",
                      color: "#d35400",
                      border: "1px solid #0984e3",
                      cursor: "pointer",
                      marginTop: "30px",
                      marginLeft: "50%",
                      transform: "translateX(-50%)",
                    }}
                    type="submit"
                  >
                    Send
                  </button>
                </Typography>
              </Box>
            </form>
          </Fade>
        </Modal>
      )}
    </div>
  );
}

export default AppReactTable;