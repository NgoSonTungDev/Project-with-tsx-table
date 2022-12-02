import { LoadingButton } from "@mui/lab";
import React, { useEffect, useState } from "react";
import "./App.scss";
import NavbarComponent from "./components/navbar/navbar";
import useGetStatus from "./hooks/useGetStatus";

import { resetState } from "./redux_store/product/product_slice";
import { useAppDispatch, useAppSelector } from "./redux_store/store";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { ImMonitors } from "./interface";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationInput } from "./helpers/inputValidation";
import FormInput from "./FormInput";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import Typography from "@mui/material/Typography";
import queryString from "query-string";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  createProduct,
  deleteProduct,
  getByIdProduct,
  getProducts,
  updateProduct,
} from "./redux_store/product/product_action";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  height: 450,
  bgcolor: "background.paper",
  border: "2px solid #000",
  justifyContent: "space-between",
  boxShadow: 24,
  p: 4,
};

const defaultValues = {
  id: 0,
  name: "",
  type: "",
  overVoltage: 0,
  underVoltage: 0,
  phaseLoss: 0,
  phaseUnbalanced: 0,
  overLoad: 0,
  overFlow: 0,
  underFlow: 0,
  overPressure: 0,
  underPressure: 0,
  cosPhi: 0,
  THDi: 0,
};

function AppReactTable() {
  const [open, setOpen] = useState(false);
  const [check, setCheck] = useState(true);
  const { data } = useAppSelector((state) => state.product);
  const [loading, error] = useGetStatus("getProducts");
  const [loadingCreate, errorCreate] = useGetStatus("createProduct");
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const columnHelper = createColumnHelper<ImMonitors>();
  const dispatch = useAppDispatch();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const parsed = queryString.parse(location.search);
  const totalPage = Math.floor(data.total / data.pageSize + 1);

  const { control, handleSubmit, reset } = useForm<ImMonitors>({
    defaultValues,
    resolver: yupResolver(validationInput),
  });
  console.log(parsed);

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
    columnHelper.accessor("type", {
      header: () => <span>Type</span>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("overVoltage", {
      header: "OverVoltage",
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("underVoltage", {
      header: "UnderVoltage",
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("phaseLoss", {
      header: "PhaseLoss",
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("phaseUnbalanced", {
      header: "PhaseUnbalanced",
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("overLoad", {
      header: "OverLoad",
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("overFlow", {
      header: "OverFlow",
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("underFlow", {
      header: "UnderFlow",
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("overPressure", {
      header: "OverPressure",
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("cosPhi", {
      header: "CosPhi",
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("THDi", {
      header: "THDi",
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
              await dispatch(getProducts(page));
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

  const handleChange = async (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    await dispatch(getProducts(value));
    setPage(value);
    searchParams.set("page", String(value));
    navigate({
      pathname: "/",
      search: searchParams.toString(),
    });
  };

  const handleUpdate = async (id: number) => {
    const found = await data.items.find((element) => element.id === id);
    reset(found);
    handleOpen();
  };

  const table = useReactTable({
    data: data.items,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const customHandleSubmit = (data: ImMonitors) => {
    dispatch(createProduct(data));
    handleClose();
    dispatch(getProducts(page));
  };

  const customHandleSubmitUpdate = (data: ImMonitors) => {
    dispatch(updateProduct(data));
    handleClose();
    reset();
    dispatch(getProducts(page));
  };

  useEffect(() => {
    dispatch(getProducts(Number(parsed.page)));
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
            reset(defaultValues);
            handleOpen();
            setCheck(true);
            setPage(1);
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
            <button onClick={() => dispatch(getProducts(page))}>Thu lai</button>
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
        <Stack
          spacing={1}
          sx={{
            padding: "20px",
            marginLeft: "40%",
          }}
        >
          <Pagination
            count={totalPage}
            page={Number(parsed.page)}
            onChange={handleChange}
          />
        </Stack>
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
                    <FormInput control={control} name="type" label="type" />
                    <FormInput
                      control={control}
                      name="overVoltage"
                      label="overVoltage"
                    />
                    <FormInput
                      control={control}
                      name="underVoltage"
                      label="underVoltage"
                    />
                    <FormInput
                      control={control}
                      name="phaseLoss"
                      label="phaseLoss"
                    />
                    <FormInput
                      control={control}
                      name="phaseUnbalanced"
                      label="phaseUnbalanced"
                    />
                    <FormInput
                      control={control}
                      name="overLoad"
                      label="overLoad"
                    />
                    <FormInput control={control} name="cosPhi" label="cosPhi" />
                    <FormInput control={control} name="THDi" label="THDi" />
                    <FormInput
                      control={control}
                      name="overFlow"
                      label="overFlow"
                    />
                    <FormInput
                      control={control}
                      name="underFlow"
                      label="underFlow"
                    />
                    <FormInput
                      control={control}
                      name="overPressure"
                      label="overPressure"
                    />
                    <FormInput
                      control={control}
                      name="underPressure"
                      label="underPressure"
                    />
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
                  Chinh sua
                </Typography>
                <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                  <div style={{ width: "100%" }}>
                    <FormInput control={control} name="id" label="id" />
                    <FormInput control={control} name="name" label="name" />
                    <FormInput control={control} name="type" label="type" />
                    <FormInput
                      control={control}
                      name="overVoltage"
                      label="overVoltage"
                    />
                    <FormInput
                      control={control}
                      name="underVoltage"
                      label="underVoltage"
                    />
                    <FormInput
                      control={control}
                      name="phaseLoss"
                      label="phaseLoss"
                    />
                    <FormInput
                      control={control}
                      name="phaseUnbalanced"
                      label="phaseUnbalanced"
                    />
                    <FormInput
                      control={control}
                      name="overLoad"
                      label="overLoad"
                    />
                    <FormInput control={control} name="cosPhi" label="cosPhi" />
                    <FormInput control={control} name="THDi" label="THDi" />
                    <FormInput
                      control={control}
                      name="overFlow"
                      label="overFlow"
                    />
                    <FormInput
                      control={control}
                      name="underFlow"
                      label="underFlow"
                    />
                    <FormInput
                      control={control}
                      name="overPressure"
                      label="overPressure"
                    />
                    <FormInput
                      control={control}
                      name="underPressure"
                      label="underPressure"
                    />
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
