import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { ModerationHistoryUpdate, ProfileUpdate } from '../_redux/TutorManagementAction';
import { useDispatch } from 'react-redux';

const TaskRejectionModal = (props) => {
    const { itemId, item, filterObj, userInfo } = props || {}
    const [comment, setComment] = useState('');
    const dispatch = useDispatch()
    const handleAction = () => {
        let postData = { reviewStatus: "requestInitiated", assignedModerator: userInfo?._id, comment, taskRejection: true }
        dispatch(ModerationHistoryUpdate(postData, item, userInfo, filterObj))
        props.onHide(); // Close modal after action
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Task Rejection
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5>Please describe in details why you want to reject this task?</h5>

                <Form.Group className="mt-3">
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Add any notes or reason for the rejection..."
                    />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-between flex-wrap">
                <Button variant="primary" onClick={() => handleAction()}>
                    Reject Task
                </Button>
                <Button variant="secondary" onClick={props.onHide}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default TaskRejectionModal;
