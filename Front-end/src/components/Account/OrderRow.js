import { useEffect, useState } from "react";
import { useHttpClient } from "../../hooks/http-hook";
import { ORDERS_API as ordersApi } from "../../keys/BackEndKeys";

export default function OrderRow({ anOrder, count }) {
    const { sendRequest } = useHttpClient();
    const [details, setDetails] = useState([]);
    const totalOrigin = anOrder.Total;
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
                //console.log("Detail in order row", data.detail);
            } catch (err) {
                console.log("error in order row", err);
            }
        }
        fetchDetail();
    }, [anOrder.OrderID]);
    return (
        <>
            <tr>
                <td>{count}</td>
                <td>{anOrder.Date}</td>
                <td>{anOrder.Address} {anOrder.Phone}</td>
                <td>
                    {details.length > 0 && details.map(detail => {
                        const productName = detail.ProductName;
                        const priceString = detail.Price;
                        const price = priceString.substring(0, priceString.indexOf("."));
                        const quantity = detail.Quantity;
                        return `${productName}: ${price} x ${quantity}; `;
                    })}
                </td>
                <td>{totalOrigin.substring(0, totalOrigin.indexOf("."))}</td>
            </tr>
        </>
    );
}