import { useParams } from "react-router-dom";
import { collection } from "firebase/firestore"
import { useState } from "react";
import db from '../firebase/firebase';
import { useCollectionData } from "react-firebase-hooks/firestore";
import AddChecklist from "./checklist-add";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import AddDetail from "./detail-add";

export default function Checklist() {
    const { id, cat } = useParams();

    const [openCreateChecklist, setOpenCreateChecklist] = useState(false);
    const [openCreateInput, setOpenCreateInput] = useState(false);
    const [selectedItem, setSelectedItem] = useState();

    const query = collection(db, 'techology', id, 'children', cat, 'children');
    const [lists, loading, error] = useCollectionData(query);

    const addDetails = (item, type) => {
        setSelectedItem({...item, type: type, cat: cat, parentId: id});
        setOpenCreateInput(true);
    }

    return (
        <>
            {lists?.map((item, index) => (
                <Card style={{ marginBottom: "10px" }} key={item.id}>
                    <Card.Header>{item.name}</Card.Header>
                    <Card.Body>
                        <Card.Title>Sample Code
                            <Button variant="outline-primary" size="sm" style={{ float: "right" }} onClick={() => addDetails(item, 'Code')}>Add</Button>
                        </Card.Title>
                        {item.code.map(code => (
                            <div className="code" key={code}>{code}</div>
                        ))}
                        <Card.Title>Compliant
                            <Button variant="outline-primary" size="sm" style={{ float: "right" }} onClick={() => addDetails(item, 'Compliant')}>Add</Button>
                        </Card.Title>
                        {item.compliant.map(compliant => (
                            <div className="nocode" key={compliant}>{compliant}</div>
                        ))}
                        <Card.Title>Rationale
                            <Button variant="outline-primary" size="sm" style={{ float: "right" }} onClick={() => addDetails(item, 'Rationale')}>Add</Button>
                        </Card.Title>
                        {item.rationale.map(rationale => (
                            <div className="nocode" key={rationale}>{rationale}</div>
                        ))}
                    </Card.Body>
                </Card>
            ))}
            <div style={{ textAlign: "right" }}>
                <Button style={{ marginBottom: "10px" }} variant="outline-primary" onClick={() => setOpenCreateChecklist(true)}>
                    Add Check list
                </Button>
            </div>
            {
                !openCreateChecklist ? null : (<AddChecklist change={setOpenCreateChecklist} id={id} cat={cat} />)
            }
            {
                !openCreateInput ? null : (<AddDetail change={setOpenCreateInput} item={selectedItem} />)
            }
        </>
    )
}