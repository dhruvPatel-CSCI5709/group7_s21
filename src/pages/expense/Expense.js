/**
 * Author: Kirtan Revinbhai Dudhatra
 * Description: Handles expenses of the user: Add, Delete, and Edit
 */
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

/**
 * Description: Overrides the CSS of material UI
 * @type {(props?: any) => ClassNameMap<"container"|"root">}
 */
const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

/**
 * Description: Column Configuration for showing users' expenses on the page
 * @type {({id: string, label: string}|{id: string, label: string}|{id: string, label: string, align: string}|{id: string, label: string, align: string}|{id: string, label: string, align: string})[]}
 */
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
    label: "Date of Expense",
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

/**
 * Description: Generates list of options for select component
 * @param options
 * @returns {React.node}
 * @constructor
 */
const Options = ({ options }) => {
  return options.map((option, index) => (
    <option key={option.id} value={option.value}>
      {option.label}
    </option>
  ));
};

function Expense() {
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
  const [dateOfExpense, setDateOfExpense] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [expenseId, setExpenseId] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  /**
   * Description: loads data from the database: All expenses by User and Category List of User
   */
  useEffect(() => {
    loadExpenseData();
    getCategoryList();
  }, []);

  /**
   * Description: When user choose to edit particular expense it sets the state of expenseId and allows user to edit the existing expenses.
   */
  useEffect(() => {
    if (expenseId) {
      const expenseData = rowData.find((row) => row.id === expenseId);
      if (expenseData) {
        setTitle(expenseData.title);
        setCategory(expenseData.categoryId);
        setAmount(expenseData.amount);
        setDateOfExpense(expenseData.dateOfExp);
        setPaymentMethod(expenseData.paymentMethod);
      }
      console.log(expenseData);
    }
  }, [expenseId]);

  /**
   * Description: When user switches between create expense and view expense component it should erase the existing expense details from the state
   */
  useEffect(() => {
    if (!showForm) {
      setExpenseId(null);
      setTitle(null);
      setCategory(null);
      setDateOfExpense(null);
      setPaymentMethod(null);
      setAmount(null);
    }
  }, [showForm]);

  /**
   * Description: Retrieves all Expense data of user from database
   * @returns {Promise<void>}
   */
  const loadExpenseData = async () => {
    const userId = localStorage.getItem("userId")
      ? localStorage.getItem("userId")
      : "";
    try {
      const { url, method } = Routes.api.getAllExpense(userId);
      const { data } = await axios[method](url);
      processData(data.data);
    } catch (err) {
      Notification(notificationTypes.ERROR, err);
    }
  };

  /**
   * Description: Retrieves all category list of user from database
   * @returns {Promise<void>}
   */
  const getCategoryList = async () => {
    const userId = localStorage.getItem("userId")
      ? localStorage.getItem("userId")
      : "";
    try {
      const { url, method } = Routes.api.getAllExpenseCategory(userId);
      const { data } = await axios[method](url);
      setCategoryList(data.data);
    } catch (err) {
      Notification(notificationTypes.ERROR, err);
    }
  };

  /**
   * Description: Creates user defined category and stores into the database via API call.
   * Flow 1: Check if category name is valid or not
   * Flow 2: Check if category already exists
   * Flow 3: Fetches the list of category from the database
   * @returns {Promise<void>}
   */
  const createExpenseCategory = async () => {
    const userId = localStorage.getItem("userId")
      ? localStorage.getItem("userId")
      : "";
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
      const { url, method } = Routes.api.createExpenseCategory();
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

  /**
   * Description: Creates new expense, data is validated with material-ui then data is stored into db using api.
   * Params: e: Event
   * @returns {Promise<void>}
   */
  const createExpense = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId")
      ? localStorage.getItem("userId")
      : "";
    try {
      const { url, method } = Routes.api.saveExpense();
      const { data } = await axios[method](url, {
        title,
        categoryId: category,
        amount,
        dateOfExpense: +new Date(dateOfExpense),
        paymentMethod,
        userId,
      });
      loadExpenseData();
      Notification(
        notificationTypes.SUCCESS,
        "Expense has been added successfully"
      );
      setShowForm(false);
    } catch (err) {
      Notification(notificationTypes.ERROR, err);
    }
  };

  /**
   * Description: Allows to edit the existing expense and update into the database
   * @param e: Event
   * @returns {Promise<void>}
   */
  const editExpense = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId")
      ? localStorage.getItem("userId")
      : "";
    try {
      const { url, method } = Routes.api.editExpense(expenseId);
      const { data } = await axios[method](url, {
        title,
        categoryId: category,
        amount,
        dateOfExpense: +new Date(dateOfExpense),
        paymentMethod,
        userId,
      });
      loadExpenseData();
      Notification(
        notificationTypes.SUCCESS,
        "Expense has been updated successfully"
      );
      setShowForm(false);
    } catch (err) {
      Notification(notificationTypes.ERROR, err);
    }
  };

  /**
   * Description: Delete the expense using expenseId provided by User
   * @param expenseId: String
   * @returns {Promise<void>}
   */
  const deleteExpense = async (expenseId) => {
    const userId = localStorage.getItem("userId")
      ? localStorage.getItem("userId")
      : "";
    try {
      const { url, method } = Routes.api.deleteExpense(expenseId);
      const { data } = await axios[method](url);
      loadExpenseData();
      Notification(notificationTypes.SUCCESS, "Expense Deleted Successfully");
    } catch (err) {
      Notification(notificationTypes.ERROR, err);
    }
  };

  /**
   * Description: Checks wheather the category is exist in db or not
   * @param newCategoryName: String
   * @returns {boolean}
   */
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

  /**
   * Description: Prepares rowsList for material UI and click events for edit and delete buttons
   * @param rows: Array[]
   */
  const processData = (rows) => {
    const rowsData = rows.map((data, index) => {
      return {
        id: data._id,
        title: data.title,
        category: data.categoryName,
        categoryId: data.categoryId,
        amount: data.amount,
        dateOfExp: moment(data.dateOfExpense).format("YYYY-MM-DD"),
        paymentMethod: data.paymentMethod,
        actions: (
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <ButtonNew
              handleClick={() => handleEdit(data._id)}
              buttonTitle={"Edit"}
            />{" "}
            <ButtonNew
              handleClick={() => deleteExpense(data._id)}
              buttonTitle={"Delete"}
            />
          </div>
        ),
      };
    });
    setRowData(rowsData);
  };

  /**
   * Description: handles switch between create expense and show expenses view
   */
  const handleClose = () => {
    const { category } = formData;
    categoryList.push({
      id: category,
      value: category,
    });
    setShow(false);
  };

  /**
   * Description: shows create expense page
   */
  const handleShow = () => setShow(true);

  /**
   * Handles edit of particular expense using expenseId
   * @param id: String
   */
  const handleEdit = (id) => {
    setExpenseId(id);
    setShowForm(true);
  };

  /**
   * Description: Handles page change in view all expenses
   * @param event: Event
   * @param newPage: Integer
   */
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  /**
   * Description: To change number of rows per page in table
   * @param event: Event
   */
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div>
      <ButtonNew
        style={{ margin: "10px" }}
        buttonTitle={showForm ? "View Expenses" : "Create Expense"}
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
            onSubmit={(e) => (expenseId ? editExpense(e) : createExpense(e))}
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
                steps="any"
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
                Date of Expense{" "}
              </Form.Label>
              <Form.Control
                value={dateOfExpense}
                onChange={(e) => setDateOfExpense(e.target.value)}
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
              {expenseId ? "Update Details" : "Submit Expense"}
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
            handleClick={() => createExpenseCategory()}
            buttonTitle={"Submit"}
          />
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Expense;
