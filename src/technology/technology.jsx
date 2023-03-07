import { Outlet, useParams } from "react-router-dom";
import Category from "../category/category";
import './technology.css';

export default function Technology() {
    const { id } = useParams();

    return (
        <>
            <div className="tech-container">
                <div className="tech-container-leftnemu">
                    <Category id={id} />
                </div>
                <div className="tech-container-main">
                    <Outlet></Outlet>
                </div>
            </div>
        </>
    )
}