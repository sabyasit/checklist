import { doc, setDoc, set, updateDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import db from '../firebase/firebase.js'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function AddDetail(props) {
    const [detail, setDetails] = useState();

    const addDetail = async () => {
        const docRef = doc(db, 'techology', props.item.parentId, 'children', props.item.cat, 'children', props.item.id);
        if (props.item.type === 'Code') {
            await updateDoc(docRef, {
                code: [...props.item.code, detail]
            });
        }
        if (props.item.type === 'Compliant') {
            await updateDoc(docRef, {
                compliant: [...props.item.compliant, detail]
            });
        }
        if (props.item.type === 'Rationale') {
            await updateDoc(docRef, {
                rationale: [...props.item.rationale, detail]
            });
        }
        props.change(false);
    }

    return (
        <>
            <Modal show={true} onHide={() => props.change(false)}
                aria-labelledby="contained-modal-title-vcenter" size="lg"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add {props.item.type}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Control as="textarea" rows={15} onChange={(e) => setDetails(e.target.value)} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => addDetail()}>Add</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}