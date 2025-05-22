import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { ModerationHistoryUpdate, ProfileUpdate } from '../_redux/TutorManagementAction';
import { useDispatch } from 'react-redux';
import { CreateNotification } from 'src/modules/auth/_redux/AuthAction';

const MyVerticallyCenteredModal = (props) => {
    const { itemId, item, filterObj, userInfo } = props || {}
    const [comment, setComment] = useState('');
    const dispatch = useDispatch()
    const handleAction = (status) => {
        let postData = { reviewStatus: status, assignedModerator: userInfo?._id, comment }
        dispatch(ModerationHistoryUpdate(postData, item, userInfo, filterObj))
        // dispatch(ProfileUpdate(postData, item, userInfo, filterObj, historyData, isHistoryUpdate))
        props.onHide(); // Close modal after action
        //create notification 
        const post = { clientInfo: itemId, title: `Your profile is ${status === "approved" ? "Approved" : status === "rejected" ? "Rejected" : "Sent to you for review"} by admin`, redirectUrl: "/dashboard?name=settings" }
        dispatch(CreateNotification(post))
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
                    <Button variant="warning" onClick={() => handleAction('sendForReview')}>
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
