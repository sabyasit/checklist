import { doc, setDoc, set, updateDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import db from '../firebase/firebase.js'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { wait } from '@testing-library/user-event/dist/utils/index.js';

export default function AddCode(props) {
    const [code, setCode] = useState();

    const addCode = async () => {
        props.detail.item[props.item].code.push(code);
        await updateDoc(doc(db, props.id, props.detail.id), {
            item: props.detail.item
        })
    }
    return (
        <>
            <Modal show={true} onHide={() => props.change(false)}
                aria-labelledby="contained-modal-title-vcenter" size="lg"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add Code</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Control as="textarea" rows={10} onChange={(e) => setCode(e.target.value)} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => addCode()}>Save</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}