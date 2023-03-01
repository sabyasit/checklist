import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './header.css'

export default function Header() {
    const [path, setPath] = useState();
    const location = useLocation();

    useEffect(() => {
        setPath(location.state);
    }, [location.state]);

    return (
        <>
            <div className="header">
                Technology Checklist 
                { !path ? null : (
                        <span>{` > ${path}`}</span>
                    ) 
                }
            </div>
        </>
    )
}