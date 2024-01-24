import { useContext, useEffect, useState } from "react";
import { useHttpClient } from "../../hooks/http-hook.js"
import { AuthContext } from "../../context/AuthContext.js";
import { ORDERS_API as ordersApi } from "../../keys/BackEndKeys.js";
import OrderRow from "./OrderRow.js";

export default function Orders() {
    const { sendRequest } = useHttpClient();
    const { token } = useContext(AuthContext);
    const [orderList, setOrderList] = useState([]);
    useEffect(() => {
        async function fetchOrders() {
            const orders = await sendRequest(
                ordersApi,
                "GET",
                {
                    "Content-type": "application/json",
                    "Authorization": `Bear ${token}`
                });
            console.log("orders ", orders.orders);
            setOrderList(orders.orders);
        }
        fetchOrders();
    }, []);
    return (
        <>
            <div className="info-title mb-4">
                <h2>Your orders {orderList.length < 1 && "is empty"}</h2>
            </div>


            <div className="bg-white w-100">
                <table class="table table-striped" style={{ "--bs-table-color": "black" }}>
                    <thead>
                        <tr className="text-center">
                            <th scope="col" style={{ width: "5%" }}>N.o</th>
                            <th scope="col" style={{ width: "20%" }}>Date</th>
                            <th scope="col" style={{ width: "25%" }}>Address, phone</th>
                            <th scope="col" style={{ width: "35%" }}>Details</th>
                            <th scope="col" style={{ width: "15%" }}>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderList.length > 0 &&  orderList.map((order, index) => (
                            <OrderRow anOrder = {{...order}} count={index+1} />
                        ))}
                   </tbody>
                </table>
            </div>
        </>
    );
}