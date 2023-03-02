import { doc, setDoc, set, updateDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import db from '../firebase/firebase.js'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function AddRationale(props) {
    const [rationale, setRationale] = useState();

    const addRationale = async () => {
        props.detail.item[props.item].rationale.push(rationale);
        await updateDoc(doc(db, props.id, props.detail.id), {
            item: props.detail.item
        })
    }
    return (
        <>
            <Modal show={true} onHide={() => props.change(false)}
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add Rationale</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Control as="textarea" rows={3} onChange={(e) => setRationale(e.target.value)} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => addRationale()}>Save</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}