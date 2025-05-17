import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { ProfileUpdate } from '../_redux/TutorManagementAction';
import { useDispatch } from 'react-redux';

const MyVerticallyCenteredModal = (props) => {
    const { itemId, filterObj, userInfo } = props || {}
    const [comment, setComment] = useState('');
    const [historyData, setHistory] = useState('');
    const dispatch = useDispatch()
    const handleAction = (status) => {
        let postData = { reviewStatus: status, assignedModerator: userInfo?._id, comment }


        dispatch(ProfileUpdate(postData, itemId, userInfo, filterObj, historyData))
        props.onHide(); // Close modal after action
    }
    useEffect(() => {
        const info = localStorage.getItem("history")
        console.log('info', info)
        setHistory(info ? null : JSON.parse(info))
    }, [])
    console.log('historyData', historyData)
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Review Decision
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5>Please review the tutor profile and select an action below.</h5>

                <Form.Group className="mt-3">
                    <Form.Label>Comment (optional)</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Add any notes or reason for the decision..."
                    />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-between flex-wrap">
                <div className="d-flex gap-2">
                    <Button variant="success" onClick={() => handleAction('approved')}>
                        Approved
                    </Button>
                    <Button variant="danger" onClick={() => handleAction('rejected')}>
                        Rejected
                    </Button>
                    <Button variant="warning" onClick={() => handleAction('missingDoc')}>
                        Send User For Review
                    </Button>
                </div>
                <Button variant="secondary" onClick={props.onHide}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default MyVerticallyCenteredModal;
