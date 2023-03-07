import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import './header.css'
import AddTech from './text-add';

export default function Header() {
    const [path, setPath] = useState();
    const [openCreateTech, setOpenCreateTech] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        setPath(location?.state?.id);
    }, [location.state]);

    const addTech = () => {
        setOpenCreateTech(true);
    }

    return (
        <>
            <div className="header">
                <span style={{ cursor: "pointer" }} onClick={() => navigate('/')}>Technology Checklist</span>
                {!path ? null : (
                    <span>{` > ${path}`}</span>
                )
                }
                <Button variant="success" size="sm" style={{ float: "right" }} onClick={() => addTech()}>Add</Button>
            </div>
            {
                !openCreateTech ? null : (<AddTech change={setOpenCreateTech} />)
            }
        </>
    )
}