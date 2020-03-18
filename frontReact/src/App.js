import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Addform from './Addform';
import Budgettable from './Budgettable';
import Button from "react-bootstrap/es/Button";
import DeleteModal from './components/deleteModal';
import EditModal from './components/editModal';

const categories = [ 
    {'id': '1', 'name': 'Meiset'},
    {'id': '2', 'name': 'Neqliyyat'},
    {'id': '3', 'name': 'Texnologiya'},

]

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            errored: false,
            incomes: [],
            expense: [],
            showData: true,
            deleteModal: false,
            deleteDataId: null,
            editModal: false,
            editData: {}
        }

        this.getDatas = this.getDatas.bind(this);
        this.addData = this.addData.bind(this);
        this.deleteData = this.deleteData.bind(this);
        this.toggleData = this.toggleData.bind(this);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.editData = this.editData.bind(this);
        this.handleShowEdit = this.handleShowEdit.bind(this);
        this.handleCloseEdit = this.handleCloseEdit.bind(this);

    }

    getDatas() {

        let self = this;

        fetch('http://localhost:3001/getBudgets').then(function (res) {
                return res.json()
            }).then(function (data) {
                let expenses = data.filter(function (data) {
                    if (data.type == "-") {
                        return data;
                    }
                });
                let incomes = data.filter(function (data) {
                    if (data.type == "+") {
                        return data;
                    }
                });
                self.setState({
                    expense: expenses,
                    incomes: incomes
                })
            }).catch(function (err) {
            console.log(err)
        })
    }

    componentDidMount() {
        this.getDatas();
    }

    addData(e) {
        e.preventDefault();

        let _target = e.target;

        let self = this;

        let type = _target.type.value,
            amount = parseInt(_target.amount.value),
            note = _target.note.value,
            category = _target.category.value;

        let data = {
            type,
            amount,
            note,
            category
        }

        fetch('http://localhost:3001/addBudget', {
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            method: 'post',
            body: JSON.stringify(data),
        }).then(data => {
            if (data.status && (data.status == 200)) {
                self.getDatas();
            }
        });

    }

    deleteData(e) {
        let self = this;
        let id = e.target.dataset.id;

        fetch(`http://localhost:3001/deleteBudget/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            method: 'delete',
        }).then(data => {
            if (data.status && (data.status == 200)) {
                self.getDatas();
                self.handleClose();
            }
        });
    }

    toggleData() {

        this.setState({
            showData: !this.state.showData
        })

    }

    handleClose() {
        this.setState({
            deleteModal: false,
            deleteDataId: null
        });
    }

    handleShow(e) {
        let id = e.target.dataset.id;

        this.setState({
            deleteModal: true,
            deleteDataId: id
        });
    }

    handleCloseEdit() {
        this.setState({
            editModal: false,
            editData: {}
        });
    }

    handleShowEdit(e) {
        let type = e.target.dataset.type;
        let id = e.target.dataset.id;

        let expenses = this.state.expense;
        let incomes = this.state.incomes;

        let data = {};

        if (type === '+') {
            incomes.find((obj) => {
                if (obj._id === id) {
                    data = obj;
                }
            });
        } else {
            expenses.find((obj) => {
                if (obj._id === id) {
                    data = obj;
                }
            });
        }

        console.log(data)

        this.setState({
            editModal: true,
            editData: data
        });
    }

    editData(e) {
        console.log('a')
    }

    render() {

        let incomes = this.state.incomes;
        let expense = this.state.expense;

        const data = {expense, incomes};

        let incomesSum = 0;
        for (let i = 0; i < incomes.length; i++) {
            incomesSum += incomes[i].amount;
        }

        let expenseSum = 0;
        for (let i = 0; i < expense.length; i++) {
            expenseSum += expense[i].amount;
        }

        return (
            <div className="App">
                <DeleteModal
                    deleteDataId={this.state.deleteDataId}
                    handleClose={this.handleClose}
                    deleteData={this.deleteData}
                    show={this.state.deleteModal}/>
                <EditModal
                    editData={this.editData}
                    data={this.state.editData}
                    categories={categories}
                    errored={this.state.errored}
                    handleClose={this.handleCloseEdit}
                    show={this.state.editModal}/>
                <div className="top-side">
                    <Button variant='info' onClick={this.toggleData}> Toggle </Button>
                    <h3 className="text-white text-center pt-3">Bu ay üçün büdcəniz</h3>
                    <div className="all_money text-center text-white">
                        {incomesSum - expenseSum} AZN
                    </div>
                    <div className="budget-total mt-3">
                        <Row>
                            <Col>
                                <Alert variant="primary">
                                    Gelir: {incomesSum} AZN
                                </Alert>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Alert variant="danger">
                                    Xerc: {expenseSum} AZN
                                </Alert>
                            </Col>
                        </Row>
                    </div>

                    <Addform
                        addData={this.addData}
                        categories={categories}
                        errored={this.state.errored}/>
                    <div className="clearfix"></div>
                </div>

                {this.state.showData ? <Budgettable
                    deleteData={this.deleteData}
                    handleShow={this.handleShow}
                    handleShowEdit={this.handleShowEdit}
                    categories={categories} data={data}/> : undefined}
            </div>
        );
    }
}

export default App;
