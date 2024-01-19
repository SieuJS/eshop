import { Outlet, NavLink} from "react-router-dom";
import {useContext } from "react"
import {CatContext} from "../../context/CatContext";

export default function AdminCatProduct() {
    const {allCategories, setAllCategories, isLoading, isError} = useContext(CatContext);

    return (
        <>
            {
                isLoading == true &&
                                        <div style={{textAlign: 'center'}}>  
                                            <div className="spinner-border" role="status">
                                                <span className="sr-only">Loading...</span>
                                            </div>
                                        </div>
            }
            <div className="side-title col-sm-3">
            <div className="table-cards">
            <div className="cat-card card">
                <div className="card-header">
                    Category
                </div>
                <div className="card-body">
                    <div className="list-group list-group-flush">
                    { isError == false && isLoading == false && allCategories &&
                        allCategories.map((cat) => {
                        return <NavLink to={`/admin/product/${cat.CatID}`} className="list-group-item list-group-item-action" style = {{'borderRadius': '6px', 'margin': '2px 0'}} key={cat.CatID}>{cat.CatName}</NavLink>
                        })
                    }
                    </div>
                </div>
                <div className="card-footer">
                    <nav aria-label="Page navigation example">
                        <ul className="pagination">
                        <li className="page-item">
                            <a className="page-link" href="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                            </a>
                        </li>
                        <li className="page-item"><a className="page-link" href="#">1</a></li>
                        <li className="page-item active"><a className="page-link" href="#">2</a></li>
                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                        <li className="page-item">
                            <a className="page-link" href="#" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                            </a>
                        </li>
                        </ul>
                    </nav>
                </div>
            </div>               
            </div>
            </div>
            <Outlet/>
        </>
    );
};