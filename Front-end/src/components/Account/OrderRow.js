import { useEffect, useState } from "react";
import { useHttpClient } from "../../hooks/http-hook";
import { ORDERS_API as ordersApi } from "../../keys/BackEndKeys";
import { fontGrid } from "@mui/material/styles/cssUtils";

export default function OrderRow({ anOrder, count }) {
    const { sendRequest } = useHttpClient();
    const [details, setDetails] = useState([]);
    const [orderInfo, setOrderInfo] = useState({
        orderDate: "",
        orderTime: "",
        total: ""
    });
    useEffect(() => {
        async function fetchDetail() {
            const apiGetDetail = `${ordersApi}/${anOrder.OrderID}/getdetail`;
            try {
                const data = await sendRequest(
                    apiGetDetail,
                    "GET",
                    {
                        "Content-type": "application/json"
                    }
                );
                setDetails(data.detail);
                const tempDate = anOrder.OrderDate;
                const date = tempDate.substring(0, 10);
                const ordTime = tempDate.substring(11, 16);
                const tempPrice = parseInt(anOrder.Total);
                const price = formatWithDot(tempPrice);
                setOrderInfo({
                    orderDate: date,
                    orderTime: ordTime,
                    total: price
                });
            } catch (err) {
                console.log("error in order row", err);
            }
        }
        fetchDetail();
    }, [anOrder.OrderID]);
    function formatWithDot(n) {
        return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }
    return (
        <>
            <tr className="text-center">
                <td>{count}</td>
                <td>{orderInfo.orderDate} {orderInfo.orderTime}</td>
                <td>{anOrder.Address} {anOrder.Phone}</td>
                <td>
                    {details.length > 0 && details.map(detail => {
                        const productName = detail.ProductName;
                        const priceString = detail.Price;
                        const price = parseInt(priceString.substring(0, priceString.indexOf(".")));
                        const quantity = detail.Quantity;
                        return `${productName}: ${price} x ${quantity}; `;
                    })}
                </td>
                <td>{orderInfo.total} VND</td>
                <td>{anOrder.Status}</td>
            </tr>
        </>
    );
}