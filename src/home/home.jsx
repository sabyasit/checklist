import { useEffect, useState } from "react"
import { collection, query, onSnapshot, where } from "firebase/firestore"
import db from '../firebase/firebase';
import './home.css';
import { useNavigate } from "react-router-dom";

export default function Home() {
    const [technoloy, setTechnoloy] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const taskRef = query(collection(db, 'technology'));
        onSnapshot(taskRef, (snapshot) => {
            setTechnoloy(snapshot.docs.map(x => {
                return {
                    id: x.id,
                    name: x.data().name
                }
            }))
        })
    }, [])

    return (
        <>
            <div className="tech-card">
                {technoloy.map(name => (
                    <div key={name.id} onClick={() => navigate(`/${name.name}`, { state: name.id })}>
                        <img src={require(`../logo/${name.id}.svg`)} />
                        <br></br>
                        {name.id}
                    </div>
                ))}
            </div>
        </>
    )
}