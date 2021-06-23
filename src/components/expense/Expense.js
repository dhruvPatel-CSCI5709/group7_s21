import React, {useState, Fragment, useEffect} from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import Header from "../header/Header";
import Sidebar from "../sidebar/Sidebar";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import ButtonNew from '../../reusables/Button/Button'

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
});

function Expense() {

    let formData = {};
    let categoryList = [
        {
            id: 'Food',
            value: 'Food'
        }, {
            id: 'Education',
            value: 'Education'
        }, {
            id: 'Investment',
            value: 'Investment'
        }, {
            id: 'Other',
            value: 'Other'
        }
    ];

    const [show, setShow] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [expenseData, setExpenseData] = useState(null);
    const [title, setTitle] = useState(null);
    const [category, setCategory] = useState(null);
    const [amount, setAmount] = useState(null);
    const [dateOfExpense, setDateOfExpense] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState(null);

    useEffect(() => {
        if(expenseData) {
            setTitle(expenseData.title);
            setCategory(expenseData.category);
            setAmount(expenseData.amount);
            setDateOfExpense(expenseData.dateOfExp);
            setPaymentMethod(expenseData.paymentMethod);
        }
    }, [expenseData])

    useEffect(() => {
        setExpenseData(null);
    }, [showForm])

    const handleClose = () => {
        const {category} = formData;
        categoryList.push({
            id: category,
            value: category
        });
        setShow(false);
    }
    const handleShow = () => setShow(true);

    const Options = ({ options }) => {
        return (
            options.map(option =>
                <option key={option.id} value={option.value}>
                    {option.value}
                </option>)
        );
    }

    const changeHandler = (event) => {
        const {name, value} = event.target;
        formData[name] = value;
    }

    const submitHandler = (event) => {
        event.preventDefault();
        setShowForm(false);
        if(/[^0-9a-zA-Z]/.test(formData.title)){
            alert("Title should only include alphanumeric characters.");
        } else {
            alert("Success!");
            formData = {};
            window.location.reload();
        }
    }

    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const columns = [
        { id: 'title', label: 'Title' },
        { id: 'category', label: 'Category' },
        {
            id: 'amount',
            label: 'Amount',
            align: 'right'
        },
        {
            id: 'dateOfExp',
            label: 'Date of Expense',
            align: 'right'
        },
        {
            id: 'paymentMethod',
            label: 'Payment Method',
            align: 'right'
        },
        {
            id: 'actions',
            label: 'Actions',
            minWidth: 170,
            align: 'center'
        },
    ];

    const rowData = [
        {title: "Pizza2", category: "Education", amount: 100, dateOfExp: "28/05/1998", paymentMethod: "Card"},
        {title: "Pizza", category: "Food", amount: 50, dateOfExp: "28/05/1998", paymentMethod: "Cash", actions: <div style={{display:"flex", justifyContent:"space-evenly"}}><ButtonNew buttonTitle={"Edit"}/> <ButtonNew buttonTitle={"Delete"}/></div>},
        {title: "Pizza", category: "Food", amount: 50, dateOfExp: "28/05/1998", paymentMethod: "Cash", actions: <div style={{display:"flex", justifyContent:"space-evenly"}}><ButtonNew buttonTitle={"Edit"}/> <ButtonNew buttonTitle={"Delete"}/></div>},
        {title: "Pizza", category: "Food", amount: 50, dateOfExp: "28/05/1998", paymentMethod: "Cash", actions: <div style={{display:"flex", justifyContent:"space-evenly"}}><ButtonNew buttonTitle={"Edit"}/> <ButtonNew buttonTitle={"Delete"}/></div>},
        {title: "Pizza", category: "Food", amount: 50, dateOfExp: "28/05/1998", paymentMethod: "Cash", actions: <div style={{display:"flex", justifyContent:"space-evenly"}}><ButtonNew buttonTitle={"Edit"}/> <ButtonNew buttonTitle={"Delete"}/></div>},
        {title: "Pizza", category: "Food", amount: 50, dateOfExp: "28/05/1998", paymentMethod: "Cash", actions: <div style={{display:"flex", justifyContent:"space-evenly"}}><ButtonNew buttonTitle={"Edit"}/> <ButtonNew buttonTitle={"Delete"}/></div>},
        {title: "Pizza", category: "Food", amount: 50, dateOfExp: "28/05/1998", paymentMethod: "Cash", actions: <div style={{display:"flex", justifyContent:"space-evenly"}}><ButtonNew buttonTitle={"Edit"}/> <ButtonNew buttonTitle={"Delete"}/></div>},
        {title: "Pizza", category: "Food", amount: 50, dateOfExp: "28/05/1998", paymentMethod: "Cash", actions: <div style={{display:"flex", justifyContent:"space-evenly"}}><ButtonNew buttonTitle={"Edit"}/> <ButtonNew buttonTitle={"Delete"}/></div>},
        {title: "Pizza", category: "Food", amount: 50, dateOfExp: "28/05/1998", paymentMethod: "Cash", actions: <div style={{display:"flex", justifyContent:"space-evenly"}}><ButtonNew buttonTitle={"Edit"}/> <ButtonNew buttonTitle={"Delete"}/></div>},
        {title: "Pizza", category: "Food", amount: 50, dateOfExp: "28/05/1998", paymentMethod: "Cash", actions: <div style={{display:"flex", justifyContent:"space-evenly"}}><ButtonNew buttonTitle={"Edit"}/> <ButtonNew buttonTitle={"Delete"}/></div>},
        {title: "Pizza", category: "Food", amount: 50, dateOfExp: "28/05/1998", paymentMethod: "Cash", actions: <div style={{display:"flex", justifyContent:"space-evenly"}}><ButtonNew buttonTitle={"Edit"}/> <ButtonNew buttonTitle={"Delete"}/></div>},
        {title: "Pizza", category: "Food", amount: 50, dateOfExp: "28/05/1998", paymentMethod: "Cash", actions: <div style={{display:"flex", justifyContent:"space-evenly"}}><ButtonNew buttonTitle={"Edit"}/> <ButtonNew buttonTitle={"Delete"}/></div>},
    ]

    const rows = rowData.map((data, index) => {
        return {title: data.title,
            category: data.category,
            amount: data.amount,
            dateOfExp: data.dateOfExp,
            paymentMethod: data.paymentMethod,
            actions: <div style={{display:"flex", justifyContent:"space-evenly"}}><ButtonNew handleClick={() => handleEdit(data)} buttonTitle={"Edit"}/> <ButtonNew buttonTitle={"Delete"}/></div>}
    })

    const handleEdit = (data) => {
        setExpenseData(data);
        setShowForm(true);
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <div>

            <Header title="Expense" />
            <Sidebar />

            <ButtonNew style={{margin: "10px"}} buttonTitle={showForm ? "View Expenses" : "Create Expense"} handleClick={() => setShowForm(!showForm)}/>

            {showForm ? <div style={{display: "flex", border: "5px solid #2a95bf", borderRadius: "10px", margin: "auto", maxWidth: "400px"}}>
                <Form style={{width: "100%", margin: "auto", padding: "20px"}} onSubmit={submitHandler}>
                    <Form.Group controlId="exampleForm.ControlSelect1" style={{margin: "10px"}}>
                        <Form.Label style={{color: "#2a95bf"}}>Category</Form.Label>
                        <Form.Control value={category} as="select" required>
                            <Options options={categoryList} />
                        </Form.Control>
                        <br/>
                        <ButtonNew buttonTitle="Create Category" handleClick={handleShow} />
                    </Form.Group>

                    <Form.Group controlId="formBasicTitle" style={{margin: "10px"}}>
                        <Form.Label style={{color: "#2a95bf"}}>Title</Form.Label>
                        <Form.Control value={title} type="text" name='title' placeholder="Title" onChange={(e) => setTitle(e.target.value)} required/>
                    </Form.Group>

                    <Form.Group controlId="formBasicAmount" style={{margin: "10px"}}>
                        <Form.Label style={{color: "#2a95bf"}}>Amount $</Form.Label>
                        <Form.Control value={amount} type="number" placeholder="Amount" required/>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword" style={{margin: "10px"}}>
                        <Form.Label style={{color: "#2a95bf"}}>Date of Expense </Form.Label>
                        <Form.Control value={dateOfExpense} type="date" required/>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect2" style={{margin: "10px"}}>
                        <Form.Label style={{color: "#2a95bf"}}>Payment method</Form.Label>
                        <Form.Control value={paymentMethod} as="select" required>
                            <option>Cash</option>
                            <option>Card</option>
                            <option>Online</option>
                        </Form.Control>
                    </Form.Group>
                    <Button variant="primary" type="submit" style={{background: "#2a95bf", margin: "10px"}}>
                        Submit
                    </Button>
                </Form>
            </div> : <div style={{display: "flex", flexDirection: "column", margin: "10px"}}>
                <TableContainer style={{margin:"auto", borderRadius: "10px"}} className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth, color:"#fff", backgroundColor: "#2a95bf"}}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format && typeof value === 'number' ? column.format(value) : value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </div>}

            <Modal show={show} onHide={handleClose}>
                <Modal.Header >
                    <Modal.Title>Create Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="formBasicSelectCategory">
                        <Form.Label>Category Name</Form.Label>
                        <Form.Control type="text" name='category' placeholder="Category Name" onChange={changeHandler} required/>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <ButtonNew buttonTitle={"Close"} handleClick={handleClose} />
                    <ButtonNew handleClick={handleClose} buttonTitle={"Submit"} />
                </Modal.Footer>
            </Modal>

        </div>
    );
}

export default Expense;