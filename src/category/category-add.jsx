import { doc, setDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import db from '../firebase/firebase.js'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function AddCategory(props) {
    const [category, setCategory] = useState();

    const addCategory = async () => {
        const docRef = doc(db, 'techology', props.id, 'children', category);
        await setDoc(docRef, { name: category });
    }
    return (
        <>
            <Modal show={true} onHide={() => props.change(false)}
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Control type="text" onChange={(e) => setCategory(e.target.value)} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => addCategory()}>Save</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}