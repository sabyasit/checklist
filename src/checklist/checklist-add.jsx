import { doc, setDoc, set } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import db from '../firebase/firebase.js'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function AddChecklist(props) {
    const [checklist, setChecklist] = useState();
    const [code, setCode] = useState();
    const [compliant, setcompliant] = useState();
    const [rationale, setRationale] = useState();

    const addChecklist = async () => {
        const id  = Date.now().toString();
        const docRef = doc(db, 'techology', props.id, 'children', props.cat, 'children', id);
        await setDoc(docRef, { 
            name: checklist,
            code: [code],
            compliant: [compliant],
            rationale: [rationale],
            id: id
        });
    }
    return (
        <>
            <Modal show={true} onHide={() => props.change(false)}
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add Checklist</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" onChange={(e) => setChecklist(e.target.value)} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Code</Form.Label>
                            <Form.Control as="textarea" rows={3} onChange={(e) => setCode(e.target.value)} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Compliant</Form.Label>
                            <Form.Control type="text" onChange={(e) => setcompliant(e.target.value)} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Rationale</Form.Label>
                            <Form.Control as="textarea" rows={3} onChange={(e) => setRationale(e.target.value)} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => addChecklist()}>Save</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}