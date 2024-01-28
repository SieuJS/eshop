import { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import cartSlice from "../redux/cartSlice";
import { Link, NavLink } from "react-router-dom";

export default function CartPage(props) {
    const disPatch = useDispatch();
    const cartItems = useSelector(state => state.cart)
    const [cart, setCart] = useState();
    const [total, setTotal] = useState("")
    useEffect(() => {
        setCart(cartItems);
        let total = 0;
        cartItems.forEach(element => {
            total += element.Price * element.orderQuantity;
        });
        const totalCustom = formatWithDot(total);
        setTotal(totalCustom);
    }, [cartItems]);
    function formatWithDot(n) {
        return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    return (
        <div className="container-fluid pt-5">
            <div className="row px-xl-5">
                <div className="col-lg-8 table-responsive mb-5">
                    <table className="table table-bordered text-center mb-0" style={{ "--bs-table-color": "black" }}>
                        <thead className="bg-secondary text-dark">
                            <tr>
                                <th>Products</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th>Remove</th>
                            </tr>
                        </thead>
                        <tbody className="align-middle">
                            {
                                cart && cart.map((item) => (
                                    <tr key={item.ProID} style={{borderBottom: "none", borderTop: "none"}}>
                                        <td className="align-middle d-flex align-items-center">
                                            <div className="item-image" >
                                                <img 
                                                src={item.Image}
                                                 style={{maxWidth: "50px", maxHeight: "50px"}}
                                                  alt="product's item"/>
                                            </div>
                                            <div>
                                                <Link 
                                                className="m-0 mx-2"
                                                to={`/product/${item.ProID}`}
                                                >
                                                    {item.ProName}
                                                </Link>
                                            </div>
                                        </td>
                                        <td className="align-middle">{formatWithDot(item.Price)} đ</td>
                                        <td className="align-middle">
                                            <div
                                                className="input-group quantity mx-auto"
                                                style={{ width: 100 }}
                                            >
                                                <div className="input-group-btn">
                                                    <button className="btn btn-sm btn-primary btn-minus" onClick={() => disPatch(cartSlice.actions.add({ ...item, orderQuantity: -1 }))}>
                                                        <i className="fa fa-minus" />
                                                    </button>
                                                </div>
                                                <input
                                                    type="text"
                                                    className="form-control form-control-sm bg-secondary text-center"
                                                    value={item.orderQuantity}
                                                />
                                                <div className="input-group-btn">
                                                    <button className="btn btn-sm btn-primary btn-plus" onClick={() => disPatch(cartSlice.actions.add({ ...item, orderQuantity: 1 }))}>
                                                        <i className="fa fa-plus" />
                                                    </button>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="align-middle">{formatWithDot(item.Price * item.orderQuantity) }đ</td>
                                        <td className="align-middle">
                                            <button className="btn btn-sm btn-primary" onClick={() => disPatch(() => disPatch(cartSlice.actions.add({ ...item, orderQuantity: item.orderQuantity * -1 })))}>
                                                <i className="fa fa-times" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                <div className="col-lg-4">
                    <div className="card border-secondary mb-5">
                        <div className="card-header bg-secondary border-0">
                            <h4 className="font-weight-semi-bold m-0">Cart Summary</h4>
                        </div>
                        <div className="card-body">
                            <div className="d-flex justify-content-between mb-3 pt-1">
                                <h6 className="font-weight-medium">Subtotal</h6>
                                <h6 className="font-weight-medium">{total} đ</h6>
                            </div>
                            <div className="d-flex justify-content-between">
                                <h6 className="font-weight-medium">Shipping</h6>
                                <h6 className="font-weight-medium">0đ</h6>
                            </div>
                        </div>
                        <div className="card-footer border-secondary bg-transparent">
                            <div className="d-flex justify-content-between mt-2">
                                <h5 className="font-weight-bold">Total</h5>
                                <h5 className="font-weight-bold">{total} đ</h5>
                            </div>
                            <NavLink to="/checkout" className="btn btn-block btn-primary my-3 py-3">
                                Proceed To Checkout
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}