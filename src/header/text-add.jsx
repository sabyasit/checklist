import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import db from '../firebase/firebase.js'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function AddTech(props) {
    const query = collection(db, 'techology');

    const [tech, setTech] = useState();

    const addTech = async () => {
        const docRef = doc(db, 'techology', tech);
        await setDoc(docRef, { name: tech });
    }
    return (
        <>
            <Modal show={true} onHide={() => props.change(false)}
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add Technology</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Control type="text" onChange={(e) => setTech(e.target.value)} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => addTech()}>Save</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}