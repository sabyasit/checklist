import { collection } from "firebase/firestore"
import { useEffect, useRef, useState } from "react";
import db from '../firebase/firebase';
import { useCollectionData, useCollectionDataOnce } from "react-firebase-hooks/firestore";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import AddCategory from "../category/category-add";
import { useLocation, useNavigate } from "react-router-dom";

export default function Category(props) {
    const navigate = useNavigate();
    const location = useLocation();

    const [path, setPath] = useState();
    const [openCreateCategory, setOpenCreateCategory] = useState(false);

    const query = collection(db, 'techology', props.id, 'children');
    const [category, loading, error] = useCollectionData(query);

    const onCategorySelect = (cat) => {
        navigate(`/${props.id}/${cat}`, { state: { id: props.id, cat: cat } });
    }

    useEffect(() => {
        setPath(location?.state?.cat);
    }, [location.state]);

    return (
        <>
            <Card>
                <Card.Header>Category
                    <Button variant="outline-primary" size="sm" style={{ float: "right" }} onClick={() => setOpenCreateCategory(true)}>Add</Button>
                </Card.Header>
                <ListGroup className="list-group-flush">
                    {loading && "Loading..."}
                    {category?.map(cat => (
                        <ListGroup.Item action active={cat.name === path} key={cat.name} onClick={() => onCategorySelect(cat.name)}>
                            {cat.name}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Card>
            {
                !openCreateCategory ? null : (<AddCategory change={setOpenCreateCategory} id={props.id} />)
            }
        </>
    )
}