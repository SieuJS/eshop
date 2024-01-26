import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import cartSlice from "../redux/cartSlice"
import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";

export default function ProductList(props) {
    const navigate = useNavigate();
    const params = new URLSearchParams(window.location.search);
    const disPatch = useDispatch();
    const products = props.products;
    const pages = props.pages;
    const page = props.page;
    const pageNumbers = Array.from({ length: pages }, (_, index) => index + 1);
    const onPageChange = props.onPageChange;
    const { data: categories, isPending, error } = useFetch('/api/categories');

    //price filter
    const [min, setMin] = useState(params.get('min'));
    const [max, setMax] = useState(params.get('max'));
    const handleFilterPrice = () => {
        if (min && max) {
            params.set('min', min);
            params.set('max', max);

            params.set('page', 1);
            const newURL = `${window.location.pathname}?${params.toString()}`;
            navigate(newURL);
        }
    }

    //name filter
    const [name, setName] = useState('');
    const onNameSubmit = (e) => {
        e.preventDefault();
        params.set('keyword', name);

        params.set('page', 1);
        const newURL = `${window.location.pathname}?${params.toString()}`;
        navigate(newURL);
    }

    //category filter
    const [currentCatIds, setCurrentCatIds] = useState(); // các tham số dưới dạng chuỗi
    useEffect(() => {
        setCurrentCatIds(params.get('catid'))
    }, [params])
    const handleCategoryChange = (id, isCheck) => {
        params.delete('catid');
        if (isCheck) {
            if (currentCatIds === null) {
                params.set('catid', id)
            }
            else {
                const temp = currentCatIds.split(',');
                temp.push(id.toString());
                let result = temp.join(',')
                params.set('catid', result);
            }
        }
        else {
            // Loại bỏ giá trị cần xóa
            let result = currentCatIds.split(",").filter(n => n != id).join(",");
            if (result == "") {
                params.delete('catid');
            }
            else {
                params.set('catid', result);
            }
        }
        params.set('page', 1);
        const newURL = `${window.location.pathname}?${params.toString()}`;
        navigate(newURL);
    }

    return (
        <div className="container-fluid pt-5">
            <div className="text-center mb-4">
                <h2 className="section-title px-5"><span className="px-2">Trandy Products</span></h2>
            </div>
            <div className="row px-xl-5 pb-3">
                {
                    products && products.map((product) => (
                        <div className="col-lg-4 col-md-6 col-sm-12 pb-1" key={product.ProID}>
                            <div className="card product-item border-0 mb-4">
                                <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                                    <img className="img-fluid w-100" src={product.Image} alt="" />
                                </div>
                                <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
                                    <h6 className="text-truncate mb-3">{product.ProName}</h6>
                                    <div className="d-flex justify-content-center">
                                        <h6>{product.Price} VND</h6>
                                    </div>
                                </div>
                                <div className="card-footer d-flex justify-content-between bg-light border">
                                    <Link to={`/product/${product.ProID}`} className="btn btn-sm text-dark p-0">
                                        <i className="fas fa-eye text-primary mr-1" />
                                        View Detail
                                    </Link>
                                    <button className="btn btn-sm text-dark p-0" onClick={() => disPatch(cartSlice.actions.add({ ...product, orderQuantity: 1 }))}>
                                        <i className="fas fa-shopping-cart text-primary mr-1" />
                                        Add To Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                    )
                }

                <div className="col-12 pb-1">
                    <nav aria-label="Page navigation">
                        <ul className="pagination justify-content-center mb-3">
                            <li className="page-item">
                                <button className="page-link" aria-label="Previous" onClick={() => {
                                    if (page != 1) {
                                        onPageChange(page - 1);
                                    }
                                }}>
                                    <span aria-hidden="true">«</span>
                                    <span className="sr-only">Previous</span>
                                </button>
                            </li>
                            {
                                pageNumbers && pageNumbers.map((index) => (
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
                                    if (page != pages) {
                                        onPageChange(page + 1);
                                    }
                                }}>
                                    <span aria-hidden="true">»</span>
                                    <span className="sr-only">Next</span>
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>

    )
}