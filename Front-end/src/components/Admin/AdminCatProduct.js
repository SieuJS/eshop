import { Outlet, NavLink} from "react-router-dom";
import {useContext, useState } from "react"
import {CatContext} from "../../context/CatContext";

export default function AdminCatProduct() {
    const { allCategories, setAllCategories, isLoading, isError } = useContext(CatContext);
    
    const [page, setPage] = useState(1)
    const pageSize = 4
    const lastIndex = page * pageSize;
    const firstIndex = lastIndex - pageSize;
    const categories = allCategories.slice(firstIndex, lastIndex);
    const totalPage = Math.ceil(allCategories.length / pageSize);
    const pageNumbers = Array.from({ length: totalPage }, (_, index) => index + 1);

    const onPageChange = (index) => {
        setPage(index)
      }

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
                        categories.map((cat) => {
                        return <NavLink to={`/admin/product/${cat.CatID}`} className="list-group-item list-group-item-action" style = {{'borderRadius': '6px', 'margin': '2px 0'}} key={cat.CatID}>{cat.CatName}</NavLink>
                        })
                    }
                    </div>
                </div>
                <div className="card-footer">
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                    <li className="page-item">
                        <button className="page-link" aria-label="Previous" onClick={() => {
                            if (page != 1) {
                                onPageChange(page-1);
                            }
                        }}>
                        <span aria-hidden="true">&laquo;</span>
                        </button>
                    </li>
                    {
                        pageNumbers.map((index) => (
                            <li key={index} className={`page-item ${index === page ? 'active' : ''}`}>
                                <button className="page-link" onClick={() => onPageChange(index)}>
                                    {index}
                                </button>
                            </li>
                        )
                        )
                    }               
                    <li className="page-item">
                        <button className="page-link" aria-label="Next" onClick={() => {
                            if (page != totalPage) {
                                onPageChange(page+1);
                            }
                        }}>
                        <span aria-hidden="true">&raquo;</span>
                        </button>
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