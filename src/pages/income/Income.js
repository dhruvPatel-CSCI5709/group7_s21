import React, { useState, useEffect } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import ButtonNew from "../../components/Button/Button";
import Notification from "../../components/Notifications/Notifications";
import { notificationTypes } from "../../constants";
import axios, { Routes } from "../../services/axios";
import moment from "moment";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

const columns = [
  { id: "title", label: "Title" },
  { id: "category", label: "Category" },
  {
    id: "amount",
    label: "Amount",
    align: "right",
  },
  {
    id: "dateOfExp",
    label: "Date of Income",
    align: "right",
  },
  {
    id: "paymentMethod",
    label: "Payment Method",
    align: "right",
  },
  {
    id: "actions",
    label: "Actions",
    minWidth: 170,
    align: "center",
  },
];

const Options = ({ options }) => {
  return options.map((option, index) => (
    <option key={option.id} value={option.value}>
      {option.label}
    </option>
  ));
};

function Income() {
  let formData = {};
  const classes = useStyles();

  const [show, setShow] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [rowData, setRowData] = useState(null);
  const [categoryList, setCategoryList] = useState([]);
  const [createCategoryName, setCreateCategoryName] = useState(null);
  const [title, setTitle] = useState(null);
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState(null);
  const [dateOfIncome, setDateOfIncome] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [incomeId, setIncomeId] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    if (incomeId) {
      const incomeData = rowData.find((row) => row.id === incomeId);
      if (incomeData) {
        setTitle(incomeData.title);
        setCategory(incomeData.categoryId);
        setAmount(incomeData.amount);
        setDateOfIncome(incomeData.dateOfExp);
        setPaymentMethod(incomeData.paymentMethod);
      }
      console.log(incomeData);
    }
  }, [incomeId]);

  useEffect(() => {
    if (!showForm) {
      setIncomeId(null);
      setTitle(null);
      setCategory(null);
      setDateOfIncome(null);
      setPaymentMethod(null);
      setAmount(null);
    }
  }, [showForm]);

  useEffect(() => {
    loadIncomeData();
    getCategoryList();
  }, []);

  const loadIncomeData = async () => {
    const userId = localStorage.getItem("userId")
      ? localStorage.getItem("userId")
      : "";
    try {
      const { url, method } = Routes.api.getAllIncome(userId);
      const { data } = await axios[method](url);
      processData(data.data);
    } catch (err) {
      Notification(notificationTypes.ERROR, err);
    }
  };

  const getCategoryList = async () => {
    const userId = localStorage.getItem("userId")
      ? localStorage.getItem("userId")
      : "";
    try {
      const { url, method } = Routes.api.getAllIncomeCategory(userId);
      const { data } = await axios[method](url);
      setCategoryList(data.data);
    } catch (err) {
      Notification(notificationTypes.ERROR, err);
    }
  };

  const createIncomeCategory = async () => {
    const userId = localStorage.getItem("userId")
      ? localStorage.getItem("userId")
      : "";
    console.log(createCategoryName);
    if (
      createCategoryName === null ||
      createCategoryName === "" ||
      isCategoryAlreadyExist(createCategoryName)
    ) {
      Notification(
        notificationTypes.WARNING,
        "Please Enter Category Name or Category is already exist"
      );
      setShow(false);
      return;
    }
    try {
      console.log("Welcome to goa singham");
      const { url, method } = Routes.api.createIncomeCategory();
      const { data } = await axios[method](url, {
        name: createCategoryName,
        userId,
      });
      getCategoryList();
      Notification(
        notificationTypes.SUCCESS,
        "Category with name: " + createCategoryName + " successfully"
      );
    } catch (err) {
      Notification(notificationTypes.ERROR, err);
    } finally {
      setShow(false);
    }
  };

  const createIncome = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId")
      ? localStorage.getItem("userId")
      : "";
    try {
      const { url, method } = Routes.api.saveIncome();
      const { data } = await axios[method](url, {
        title,
        categoryId: category,
        amount,
        dateOfIncome: +new Date(dateOfIncome),
        paymentMethod,
        userId,
      });
      loadIncomeData();
      Notification(
        notificationTypes.SUCCESS,
        "Income has been added successfully"
      );
      setShowForm(false);
    } catch (err) {
      Notification(notificationTypes.ERROR, err);
    }
  };

  const editIncome = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId")
      ? localStorage.getItem("userId")
      : "";
    try {
      const { url, method } = Routes.api.editIncome(incomeId);
      const { data } = await axios[method](url, {
        title,
        categoryId: category,
        amount,
        dateOfIncome: +new Date(dateOfIncome),
        paymentMethod,
        userId,
      });
      loadIncomeData();
      Notification(
        notificationTypes.SUCCESS,
        "Income has been updated successfully"
      );
      setShowForm(false);
    } catch (err) {
      Notification(notificationTypes.ERROR, err);
    }
  };

  const deleteIncome = async (incomeId) => {
    const userId = localStorage.getItem("userId")
      ? localStorage.getItem("userId")
      : "";
    try {
      const { url, method } = Routes.api.deleteIncome(incomeId);
      const { data } = await axios[method](url);
      loadIncomeData();
      Notification(notificationTypes.SUCCESS, "Income Deleted Successfully");
    } catch (err) {
      Notification(notificationTypes.ERROR, err);
    }
  };

  const isCategoryAlreadyExist = (newCategoryName) => {
    if (categoryList) {
      const index = categoryList.findIndex(
        (category) =>
          newCategoryName.toLowerCase() === category.name.toLowerCase()
      );
      if (index !== -1) {
        return true;
      }
    }
    return false;
  };

  const processData = (rows) => {
    const rowsData = rows.map((data, index) => {
      return {
        id: data._id,
        title: data.title,
        category: data.categoryName,
        categoryId: data.categoryId,
        amount: data.amount,
        dateOfExp: moment(data.dateOfIncome).format("YYYY-MM-DD"),
        paymentMethod: data.paymentMethod,
        actions: (
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <ButtonNew
              handleClick={() => handleEdit(data._id)}
              buttonTitle={"Edit"}
            />{" "}
            <ButtonNew
              handleClick={() => deleteIncome(data._id)}
              buttonTitle={"Delete"}
            />
          </div>
        ),
      };
    });
    setRowData(rowsData);
  };

  const handleClose = () => {
    const { category } = formData;
    categoryList.push({
      id: category,
      value: category,
    });
    setShow(false);
  };

  const handleShow = () => setShow(true);

  const handleEdit = (id) => {
    setIncomeId(id);
    setShowForm(true);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div>
      <ButtonNew
        style={{ margin: "10px" }}
        buttonTitle={showForm ? "View Incomes" : "Create Income"}
        handleClick={() => setShowForm(!showForm)}
      />

      {showForm ? (
        <div
          style={{
            display: "flex",
            border: "5px solid #2a95bf",
            borderRadius: "10px",
            margin: "auto",
            maxWidth: "400px",
          }}
        >
          <Form
            style={{ width: "100%", margin: "auto", padding: "20px" }}
            onSubmit={(e) => (incomeId ? editIncome(e) : createIncome(e))}
          >
            <Form.Group
              controlId="exampleForm.ControlSelect1"
              style={{ margin: "10px", width: "100%" }}
            >
              <Form.Label style={{ color: "#2a95bf" }}>Category</Form.Label>
              <Form.Control
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                as="select"
                required
              >
                <option value="">--Select Category--</option>
                <Options
                  options={categoryList.map((category) => {
                    return {
                      id: category._id,
                      value: category._id,
                      label: category.name,
                    };
                  })}
                />
              </Form.Control>
              <br />
              <ButtonNew
                buttonTitle="Create Category"
                handleClick={handleShow}
              />
            </Form.Group>

            <Form.Group
              controlId="formBasicTitle"
              style={{ margin: "10px", width: "100%" }}
            >
              <Form.Label style={{ color: "#2a95bf" }}>Title</Form.Label>
              <Form.Control
                value={title}
                type="text"
                name="title"
                placeholder="Title"
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group
              controlId="formBasicAmount"
              style={{ margin: "10px", width: "100%" }}
            >
              <Form.Label style={{ color: "#2a95bf" }}>Amount $</Form.Label>
              <Form.Control
                value={amount}
                type="number"
                placeholder="Amount"
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group
              controlId="formBasicPassword"
              style={{ margin: "10px", width: "100%" }}
            >
              <Form.Label style={{ color: "#2a95bf" }}>
                Date of Income{" "}
              </Form.Label>
              <Form.Control
                value={dateOfIncome}
                onChange={(e) => setDateOfIncome(e.target.value)}
                type="date"
                required
              />
            </Form.Group>
            <Form.Group
              controlId="exampleForm.ControlSelect2"
              style={{ margin: "10px", width: "100%" }}
            >
              <Form.Label style={{ color: "#2a95bf" }}>
                Payment method
              </Form.Label>
              <Form.Control
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                as="select"
                required
              >
                <option value="">--Payment Method--</option>
                <option value="Cash">Cash</option>
                <option value="Card">Card</option>
                <option value="Online">Online</option>
              </Form.Control>
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              style={{ background: "#2a95bf", margin: "10px" }}
            >
              {incomeId ? "Update Details" : "Submit Income"}
            </Button>
          </Form>
        </div>
      ) : (
        <div
          style={{ display: "flex", flexDirection: "column", margin: "10px" }}
        >
          <TableContainer
            style={{ margin: "auto", borderRadius: "10px" }}
            className={classes.container}
          >
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{
                        minWidth: column.minWidth,
                        color: "#fff",
                        backgroundColor: "#2a95bf",
                      }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rowData &&
                  rowData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.code}
                        >
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {column.format && typeof value === "number"
                                  ? column.format(value)
                                  : value}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
              </TableBody>
            </Table>
          </TableContainer>
          {rowData && (
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={rowData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          )}
        </div>
      )}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Create Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formBasicSelectCategory">
            <Form.Label>Category Name</Form.Label>
            <Form.Control
              type="text"
              name="category"
              placeholder="Category Name"
              value={createCategoryName}
              onChange={(e) => setCreateCategoryName(e.target.value)}
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <ButtonNew buttonTitle={"Close"} handleClick={handleClose} />
          <ButtonNew
            handleClick={() => createIncomeCategory()}
            buttonTitle={"Submit"}
          />
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Income;
