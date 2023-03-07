import { useEffect, useState } from "react"
import { collection, query, onSnapshot, where } from "firebase/firestore"
import db from '../firebase/firebase';
import './home.css';
import { useNavigate } from "react-router-dom";
import { useCollectionData } from "react-firebase-hooks/firestore";

export default function Home() {
    const [technoloy, setTechnoloy] = useState([]);
    const navigate = useNavigate();
    const query = collection(db, 'techology');
    const [docs, loading, error] = useCollectionData(query);

    return (
        <>
            <div className="tech-card">
                {loading && "Loading..."}
                {docs?.map(doc => (
                    <div key={doc.name} onClick={() => navigate(`/${doc.name}`, { state: { id: doc.name } })}>
                        {doc.name}
                    </div>
                ))}
            </div>
        </>
    )
}