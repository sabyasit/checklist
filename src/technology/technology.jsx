import { collection, doc, onSnapshot, query } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import './technology.css';
import db from '../firebase/firebase';
import AddCategory from "./category-add";
import AddChecklist from "./checklist-add";
import AddCode from "./code-add";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import AddCompliant from "./compliant-add";
import AddRationale from "./rationale-add";

export default function Technology() {
    const selectedCat = useRef();
    const { id } = useParams();
    const [category, setCategory] = useState([]);
    const [detail, setDetail] = useState();
    const [item, setItem] = useState();
    const [openCreateCategory, setOpenCreateCategory] = useState(false);
    const [openCreateChecklist, setOpenCreateChecklist] = useState(false);
    const [openCreateCode, setOpenCode] = useState(false);
    const [openCreatecompliant, setOpencompliant] = useState(false);
    const [openRationale, setOpenRationale] = useState(false);

    useEffect(() => {
        const taskRef = query(collection(db, id));
        onSnapshot(taskRef, (snapshot) => {
            setCategory(snapshot.docs.map(x => {
                return {
                    id: x.id,
                    cat: x.data(),
                    select: x.id === selectedCat.current
                }
            }))
        })
    }, [])

    const onCategorySelect = (cat) => {
        console.log(cat);
        const taskRef = query(doc(db, id, cat.id));
        onSnapshot(taskRef, (snapshot) => {
            setDetail({ id: cat.id, ...snapshot.data() });
            category.forEach(item => {
                if(item.id === cat.id) {
                    item.select = true;
                } else {
                    item.select = false;
                }
            })
            selectedCat.current = cat.id;
        })
    }

    return (
        <>
            <div className="tech-container">
                <div className="tech-container-leftnemu">
                    <Card>
                        <Card.Header>Category
                            <Button variant="outline-primary" size="sm" style={{ float: "right" }} onClick={() => setOpenCreateCategory(true)}>Add</Button>
                        </Card.Header>
                        <ListGroup className="list-group-flush">
                            {category.map(cat => (
                                <ListGroup.Item action active={cat.select} key={cat.id} onClick={() => onCategorySelect(cat)}>
                                    {cat.cat.name}
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Card>
                </div>
                <div className="tech-container-main">
                    {detail?.item.map((item, index) => (
                        <Card style={{ marginBottom: "10px" }} key={item.checklist} onClick={() => setItem(index)}>
                            <Card.Header>{item.checklist}</Card.Header>
                            <Card.Body>
                                <Card.Title>Sample Code
                                    <Button variant="outline-primary" size="sm" style={{ float: "right" }} onClick={() => setOpenCode(true)}>Add</Button>
                                </Card.Title>
                                {item.code.map(code => (
                                    <div className="code" key={code}>{code}</div>
                                ))}
                                <Card.Title>Compliant
                                    <Button variant="outline-primary" size="sm" style={{ float: "right" }} onClick={() => setOpencompliant(true)}>Add</Button>
                                </Card.Title>
                                {item.compliant.map(compliant => (
                                    <div className="nocode" key={compliant}>{compliant}</div>
                                ))}
                                <Card.Title>Rationale
                                    <Button variant="outline-primary" size="sm" style={{ float: "right" }} onClick={() => setOpenRationale(true)}>Add</Button>
                                </Card.Title>
                                {item.rationale.map(rationale => (
                                    <div className="nocode" key={rationale}>{rationale}</div>
                                ))}
                            </Card.Body>
                        </Card>
                    ))}
                    {detail ? <div style={{ textAlign: "right" }}><Button style={{ marginBottom: "10px" }} variant="outline-primary" onClick={() => setOpenCreateChecklist(true)}>Add Check list</Button></div> : null}
                </div>
            </div>
            {
                !openCreateCategory ? null : (<AddCategory change={setOpenCreateCategory} id={id} />)
            }
            {
                !openCreateChecklist ? null : (<AddChecklist change={setOpenCreateChecklist} id={id} detail={detail} />)
            }
            {
                !openCreateCode ? null : (<AddCode change={setOpenCode} id={id} detail={detail} item={item} />)
            }
            {
                !openCreatecompliant ? null : (<AddCompliant change={setOpencompliant} id={id} detail={detail} item={item} />)
            }
            {
                !openRationale ? null : (<AddRationale change={setOpenRationale} id={id} detail={detail} item={item} />)
            }
        </>
    )
}