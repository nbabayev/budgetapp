import React, { Component } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

class Addform extends Component {

    constructor(props) {
        super(props);

    } 

    render() {

        let categories = this.props.categories;

        let budget = this.props.data;

        if (!budget) budget = {};

        let categoriesOptions = categories.map(function (data) {
            return (<option
                key={data.id}
                value={data.id}>
                {data.name}
            </option>);
        });

        return (
                    <form onSubmit={this.props.addData} className="budget-add-form pb-3">
                        <InputGroup className="mb-3">
                            <FormControl name="type" value={budget.type} style={{maxWidth: 60}} as="select">
                                <option>+</option>
                                <option>-</option>
                            </FormControl>
                            <FormControl name="category" value={budget.category} as="select">
                                {categoriesOptions}
                            </FormControl>
                            <FormControl name="note"
                                placeholder="Qeyd"
                                         value={budget.note}
                            />
                            <FormControl name="amount"
                                         type="number"
                                         value={budget.amount}
                                         placeholder="Miqdar"
                            />
                            {this.props.editModal ? '' : <Button type="submit">Elave et</Button>}
                        </InputGroup>
                        {this.props.errored ? <div className='alert alert-warning'>
                            Miqdar mutleq yazilmalidir
                        </div> : '' }
                    </form>
        );
    }
}

export default Addform;
