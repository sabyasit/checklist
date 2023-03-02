import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './header.css'

export default function Header() {
    const [path, setPath] = useState();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        setPath(location.state);
    }, [location.state]);

    return (
        <>
            <div className="header">
                <span style={{ cursor: "pointer" }} onClick={() => navigate('/')}>Technology Checklist</span>
                {!path ? null : (
                    <span>{` > ${path}`}</span>
                )
                }
            </div>
        </>
    )
}