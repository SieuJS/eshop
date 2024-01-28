import { useContext, useEffect, useState } from "react";
import { useHttpClient } from "../../hooks/http-hook.js"
import { AuthContext } from "../../context/AuthContext.js";
import { ORDERS_API as ordersApi } from "../../keys/BackEndKeys.js";
import OrderRow from "./OrderRow.js";
import ReactPaginate from "react-paginate";


export default function Orders() {
    const perPage = 5;
    const { sendRequest } = useHttpClient();
    const { token } = useContext(AuthContext);
    const [orderList, setOrderList] = useState([]);
    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    const [totalPage, setTotalPage] = useState(0);

    useEffect(() => {
        fetchOrders(1);
    }, [token]);

    async function fetchOrders(page) {
        let apiPageRequest = ordersApi;
        if (page > 0) {
            apiPageRequest += `?page=${page}&per_page=5`;
        }
        //console.log("api page request", apiPageRequest);
        const orders = await sendRequest(
            apiPageRequest,
            "GET",
            {
                "Content-type": "application/json",
                "Authorization": `Bear ${token}`
            });
        //console.log("orders ", orders);
        setOrderList(orders.orders);
        setTotalPage(orders.total_pages);
    }

    function handlePageClick(event) {
        const pageCliked = event.selected + 1; 
        setCurrentPageIndex(event.selected);
        console.log("handler page click", event);
        fetchOrders(pageCliked);
    }
    console.log("Order rendered");
    return (
        <>
            <div className="info-title mb-4">
                <h2>Your orders {orderList.length < 1 && "is empty"}</h2>
            </div>


            <div className="bg-white w-100">
                <table className="table table-striped" style={{ "--bs-table-color": "black" }}>
                    <thead>
                        <tr className="text-center">
                            <th scope="col" style={{ width: "5%" }}>N.o</th>
                            <th scope="col" style={{ width: "15%" }}>Date</th>
                            <th scope="col" style={{ width: "25%" }}>Address, phone</th>
                            <th scope="col" style={{ width: "35%" }}>Details</th>
                            <th scope="col" style={{ width: "10%" }}>Total</th>
                            <th scope="col" style={{ width: "10%" }}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderList.length > 0 && orderList.map((order, index) => (
                            <OrderRow anOrder={{ ...order }} count={index + currentPageIndex*perPage + 1} />
                        ))}
                    </tbody>
                </table>
                <ReactPaginate
                    breakLabel="..."
                    nextLabel=" >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    pageCount={totalPage}
                    previousLabel="< "
                    containerClassName="pagination justify-content-center"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    activeClassName="active"
                />
            </div>
        </>
    );
}