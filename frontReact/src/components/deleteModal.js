import React from 'react';
import { Button, Modal } from 'react-bootstrap';

class DeleteModal extends React.Component {

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
                    <Modal.Body> Are you sure?!</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.handleClose}>
                            No!
                        </Button>
                        <Button variant="primary"
                                data-id={this.props.deleteDataId}
                                onClick={this.props.deleteData}>
                            Yes!
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default DeleteModal;
