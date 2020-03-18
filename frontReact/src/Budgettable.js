import React, {Component} from 'react';
import Button from "react-bootstrap/Button";


class Budgettable extends Component {

    render() {

        const {data, categories, handleShow, handleShowEdit} = this.props;

        const DeleteButton = params => {
            return (
                <Button data-id={params.budgetid}
                        variant="danger" 
                        size='sm'
                        onClick={handleShow}>
                    Delete
                </Button>
            )
        }

        const EditButton = params => {
            return (
                <Button data-id={params.budgetid}
                        data-type={params.datatype}
                        variant="info"
                        size='sm'
                        onClick={handleShowEdit}>
                    Edit
                </Button>
            )
        }

        const List_item_income = data.incomes.map((data, j) => {

            let categoryName;
            for (let j = 0; j < categories.length; j++) {
                if (categories[j].id == data.category) {
                    categoryName = categories[j].name;
                }
            }

            return (
                <div key={j} className="budget-list-item">
                    <div className="item-note">
                        {data.note} ({categoryName})
                    </div>
                    <div className="item-budget">
                        {data.amount} AZN
                    </div>
                    <DeleteButton budgetid={data._id}/>
                    <EditButton datatype={data.type} budgetid={data._id}/>
                    <div className="clearfix"></div>
                </div>
            )
        });

        const List_item_expense = data.expense.map((data, i) => {

            let categoryName;
            for (let j = 0; j < categories.length; j++) {
                if (categories[j].id == data.category) {
                    categoryName = categories[j].name;
                }
            }

            return (
                <div key={i} className="budget-list-item">
                    <div className="item-note">
                        {data.note} ({categoryName})
                    </div>
                    <div className="item-budget">
                        {data.amount} AZN
                    </div>
                    <DeleteButton budgetid={data._id}/>
                    <EditButton datatype={data.type} budgetid={data._id}/>
                    <div className="clearfix"></div>
                </div>
            )
        });

        return (
            <div className="budget-table container mt-4">
                <div className="row">
                    <div className="col-sm-6">
                        <h2 className="text-dark">Income</h2>
                        {List_item_income}
                    </div>
                    <div className="col-sm-6">
                        <h2 className="text-danger">Expense</h2>
                        {List_item_expense}
                    </div>
                </div>
            </div>
        )
    }

}

export default Budgettable;
