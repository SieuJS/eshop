import { Link } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux'
import cartSlice from "../redux/cartSlice"
import { useRef } from "react";

export default function ProductList(props) {
    const cart = useSelector((state) => state.cart)
    const disPatch = useDispatch();
    const products = props.products;
    const pages = props.pages;
    const page = props.page;
    const pageNumbers = Array.from({ length: pages }, (_, index) => index + 1);
    const onPageChange = props.onPageChange;
    const handleFilterPrice = props.handleFilterPrice;
    
    const min = props.min;
    const max = props.max;
    const minRef = useRef(null);
    const maxRef = useRef(null);

    return (
        <div className="container-fluid pt-5">
            <div className="row px-xl-5">
                {/* Shop Sidebar Start */}
                <div className="col-lg-3 col-md-12">
                    {/* Price Start */}
                    <div className="border-bottom mb-4 pb-4">
                        <h5 className="font-weight-semi-bold mb-4">Filter by price</h5>
                        
                            <div className="d-flex align-items-center justify-content-between mb-3">
                                <input
                                    type="number"
                                    className="w-100 m-3"
                                    placeholder="MIN"
                                    id="price-min"
                                    defaultValue={min}
                                    ref={minRef}
                                />
                                <input
                                    type="number"
                                    className="w-100 m-3"
                                    placeholder="MAX"
                                    id="price-max"
                                    defaultValue={max}
                                    ref={maxRef}
                                />
                            </div>
                            <div className="d-flex align-items-center justify-content-between mb-3">
                                <button className="w-100" onClick={()=>handleFilterPrice(minRef.current.value,maxRef.current.value)}>Filter</button>
                            </div>
                        
                    </div>
                    {/* Price End */}
                    {/* Color Start */}
                    <div className="border-bottom mb-4 pb-4">
                        <h5 className="font-weight-semi-bold mb-4">Filter by color</h5>
                        <form>
                            <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                                <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    defaultChecked=""
                                    id="color-all"
                                />
                                <label className="custom-control-label" htmlFor="price-all">
                                    All Color
                                </label>
                                <span className="badge border font-weight-normal">1000</span>
                            </div>
                            <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                                <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id="color-1"
                                />
                                <label className="custom-control-label" htmlFor="color-1">
                                    Black
                                </label>
                                <span className="badge border font-weight-normal">150</span>
                            </div>
                            <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                                <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id="color-2"
                                />
                                <label className="custom-control-label" htmlFor="color-2">
                                    White
                                </label>
                                <span className="badge border font-weight-normal">295</span>
                            </div>
                            <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                                <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id="color-3"
                                />
                                <label className="custom-control-label" htmlFor="color-3">
                                    Red
                                </label>
                                <span className="badge border font-weight-normal">246</span>
                            </div>
                            <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                                <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id="color-4"
                                />
                                <label className="custom-control-label" htmlFor="color-4">
                                    Blue
                                </label>
                                <span className="badge border font-weight-normal">145</span>
                            </div>
                            <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between">
                                <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id="color-5"
                                />
                                <label className="custom-control-label" htmlFor="color-5">
                                    Green
                                </label>
                                <span className="badge border font-weight-normal">168</span>
                            </div>
                        </form>
                    </div>
                    {/* Color End */}
                </div>
                {/* Shop Sidebar End */}
                {/* Shop Product Start */}
                <div className="col-lg-9 col-md-12">
                    <div className="row pb-3">
                        <div className="col-12 pb-1">
                            <div className="d-flex align-items-center justify-content-between mb-4">
                                <form action="">
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Search by name"
                                        />
                                        <div className="input-group-append">
                                            <span className="input-group-text bg-transparent text-primary">
                                                <i className="fa fa-search" />
                                            </span>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
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
                                            <button className="btn btn-sm text-dark p-0" onClick={() => disPatch(cartSlice.actions.add({ProID: product.ProID,ProName: product.ProName, Price: product.Price,Quantity: 1}))}>
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
                                                onPageChange(page-1);
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
                                                onPageChange(page+1);
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
                {/* Shop Product End */}
            </div>
        </div>
    )
}