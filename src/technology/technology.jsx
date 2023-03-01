import { collection, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './technology.css';
import db from '../firebase/firebase';

export default function Technology() {
    const { id } = useParams();
    const [category, setCategory] = useState([]);
    const [detail, setDetail] = useState();

    useEffect(() => {
        const taskRef = query(collection(db, id));
        onSnapshot(taskRef, (snapshot) => {
            setCategory(snapshot.docs.map(x => {
                return {
                    id: x.id,
                    cat: x.data()
                }
            }))
        })
    }, [])

    const onCategorySelect = (cat) => {
        setDetail(cat);
    }

    return (
        <>
            <div className="tech-container">
                <div className="tech-container-leftnemu">
                    <div className="tech-container-leftnemu-header">Category</div>
                    {category.map(cat => (
                        <div className="tech-container-leftnemu-item" key={cat.id} onClick={() => onCategorySelect(cat)}>
                            {cat.id}
                        </div>
                    ))}
                </div>
                <div className="tech-container-main">
                    ddddddddd
                </div>
            </div>
        </>
    )
}