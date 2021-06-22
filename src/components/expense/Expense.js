import React, {useState} from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import Header from "../header/Header";
import Sidebar from "../sidebar/Sidebar";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

const columns = [
    { id: 'title', label: 'Title', minWidth: 170 },
    { id: 'category', label: 'Category', minWidth: 100 },
    {
        id: 'amount',
        label: 'Amount',
        minWidth: 100,
        align: 'right'
    },
    {
        id: 'dateOfExp',
        label: 'Date of Expense',
        minWidth: 170,
        align: 'right'
    },
    {
        id: 'paymentMethod',
        label: 'Payment Method',
        minWidth: 170,
        align: 'right'
    },
];

const rows = [
    {title: "Pizza", category: "Food", amount: 50, dateOfExp: "28/05/1998", paymentMethod: "Cash"}
];

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

            {/*<div style={{display: "flex"}}>*/}
            {/*    <Form style={{width: "80%", margin:"auto"}} onSubmit={submitHandler}>*/}
            {/*        <Form.Group controlId="exampleForm.ControlSelect1">*/}
            {/*            <Form.Label>Category</Form.Label>*/}
            {/*            <Form.Control as="select" required>*/}
            {/*                <Options options={categoryList} />*/}
            {/*            </Form.Control>*/}
            {/*        </Form.Group>*/}

            {/*        <br/>*/}

            {/*        <Button variant="primary" onClick={handleShow}>*/}
            {/*            Create Category*/}
            {/*        </Button>*/}

            {/*        <Form.Group controlId="formBasicTitle">*/}
            {/*            <Form.Label>Title</Form.Label>*/}
            {/*            <Form.Control type="text" name='title' placeholder="Title" onChange={changeHandler} required/>*/}
            {/*        </Form.Group>*/}

            {/*        <Form.Group controlId="formBasicAmount">*/}
            {/*            <Form.Label>Amount $</Form.Label>*/}
            {/*            <Form.Control type="number" placeholder="Amount" required/>*/}
            {/*        </Form.Group>*/}

            {/*        <Form.Group controlId="formBasicPassword">*/}
            {/*            <Form.Label>Date of Expense </Form.Label>*/}
            {/*            <Form.Control type="date" required/>*/}
            {/*        </Form.Group>*/}
            {/*        <Form.Group controlId="exampleForm.ControlSelect2">*/}
            {/*            <Form.Label>Payment method</Form.Label>*/}
            {/*            <Form.Control as="select" required>*/}
            {/*                <option>Cash</option>*/}
            {/*                <option>Card</option>*/}
            {/*                <option>Online</option>*/}
            {/*            </Form.Control>*/}
            {/*        </Form.Group>*/}
            {/*        <Button variant="primary" type="submit">*/}
            {/*            Submit*/}
            {/*        </Button>*/}
            {/*    </Form>*/}
            {/*</div>*/}

            <div style={{display: "flex", flexDirection: "column"}}>
                <TableContainer className={classes.container} style={{margin:"auto"}}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
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
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="formBasicSelectCategory">
                        <Form.Label>Category Name</Form.Label>
                        <Form.Control type="text" name='category' placeholder="Category Name" onChange={changeHandler} required/>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
}

export default Expense;