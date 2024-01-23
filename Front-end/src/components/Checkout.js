import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import cartSlice from "../redux/cartSlice"
import { useState } from "react";
import useFetch from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
    const navigate = useNavigate();
    const products = useSelector((state) => state.cart);
    var total = 0;
    products.forEach(element => {
        total += element.Price * element.Quantity;
    });
    console.log(products);
    return (
        <div className="container-fluid pt-5">
            <div className="row px-xl-5">
                <div className="col-lg-8">
                    <div className="mb-4">
                        <h4 className="font-weight-semi-bold mb-4">Billing Address</h4>
                        <div className="row">
                            <div className="col-md-6 form-group">
                                <label>First Name</label>
                                <input className="form-control" type="text" placeholder="John" />
                            </div>
                            <div className="col-md-6 form-group">
                                <label>Last Name</label>
                                <input className="form-control" type="text" placeholder="Doe" />
                            </div>
                            <div className="col-md-6 form-group">
                                <label>E-mail</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="example@email.com"
                                />
                            </div>
                            <div className="col-md-6 form-group">
                                <label>Mobile No</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="+123 456 789"
                                />
                            </div>
                            <div className="col-md-12 form-group">
                                <label>Address Line</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="123 Street"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="collapse mb-4" id="shipping-address">
                        <h4 className="font-weight-semi-bold mb-4">Shipping Address</h4>
                        <div className="row">
                            <div className="col-md-6 form-group">
                                <label>First Name</label>
                                <input className="form-control" type="text" placeholder="John" />
                            </div>
                            <div className="col-md-6 form-group">
                                <label>Last Name</label>
                                <input className="form-control" type="text" placeholder="Doe" />
                            </div>
                            <div className="col-md-6 form-group">
                                <label>E-mail</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="example@email.com"
                                />
                            </div>
                            <div className="col-md-6 form-group">
                                <label>Mobile No</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="+123 456 789"
                                />
                            </div>
                            <div className="col-md-6 form-group">
                                <label>Address Line 1</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="123 Street"
                                />
                            </div>
                            <div className="col-md-6 form-group">
                                <label>Address Line 2</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="123 Street"
                                />
                            </div>
                            <div className="col-md-6 form-group">
                                <label>Country</label>
                                <select className="custom-select">
                                    <option selected="">United States</option>
                                    <option>Afghanistan</option>
                                    <option>Albania</option>
                                    <option>Algeria</option>
                                </select>
                            </div>
                            <div className="col-md-6 form-group">
                                <label>City</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="New York"
                                />
                            </div>
                            <div className="col-md-6 form-group">
                                <label>State</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="New York"
                                />
                            </div>
                            <div className="col-md-6 form-group">
                                <label>ZIP Code</label>
                                <input className="form-control" type="text" placeholder={123} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="card border-secondary mb-5">
                        <div className="card-header bg-secondary border-0">
                            <h4 className="font-weight-semi-bold m-0">Order Total</h4>
                        </div>
                        <div className="card-body">
                            <h5 className="font-weight-medium mb-3">Products</h5>
                            {
                                products && products.map((item) => (
                                    <div className="d-flex justify-content-between">
                                        <p>{item.ProName} x{item.Quantity} </p>
                                        <p>{item.Quantity * item.Price}đ</p>
                                    </div>
                                ))
                            }
                            <hr className="mt-0" />
                            <div className="d-flex justify-content-between mb-3 pt-1">
                                <h6 className="font-weight-medium">Subtotal</h6>
                                <h6 className="font-weight-medium">{total}đ</h6>
                            </div>
                            <div className="d-flex justify-content-between">
                                <h6 className="font-weight-medium">Shipping</h6>
                                <h6 className="font-weight-medium">0đ</h6>
                            </div>
                        </div>
                        <div className="card-footer border-secondary bg-transparent">
                            <div className="d-flex justify-content-between mt-2">
                                <h5 className="font-weight-bold">Total</h5>
                                <h5 className="font-weight-bold">{total}đ</h5>
                            </div>
                        </div>
                        <div className="card-footer border-secondary bg-transparent">
                            <button className="btn btn-lg btn-block btn-primary font-weight-bold my-3 py-3">
                                Place Order
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}