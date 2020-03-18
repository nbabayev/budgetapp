import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import Addform from '../Addform';

class EditModal extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <>
                <Modal show={this.props.show} onHide={this.props.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete data</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Addform
                        data={this.props.data}
                        editModal={true}
                        categories={this.props.categories}
                        errored={this.props.errored}
                    />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.handleClose}>
                            Cancel
                        </Button>
                        <Button variant="primary"
                                onClick={this.props.editData}>
                            Edit!
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default EditModal;
