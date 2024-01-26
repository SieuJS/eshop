import { useContext, useEffect, useState } from "react";
import { useHttpClient } from "../../hooks/http-hook.js"
import { AuthContext } from "../../context/AuthContext.js";
import {
    TRANSACTION_API as transactionApi,
    ACCOUNT_API as accountApi
} from "../../keys/BackEndKeys.js";

import ReactPaginate from "react-paginate";
import TransactionRow from "./TransactionRow.js";

export default function Transaction() {
    const perPage = 5;
    const { sendRequest } = useHttpClient();
    const { token, userId } = useContext(AuthContext);
    const [transactionList, setTransactionList] = useState([]);
    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [balance, setBalance] = useState(0);
    useEffect(() => {
        async function fetchBalance() {
            const result = await sendRequest(
                `${accountApi}/get-balance/${userId}`,
                "GET",
                {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${token}`
                });
            setBalance(result?.balance);
        }
        fetchBalance();
        fetchTransactions(1);
    }, []);

    async function fetchTransactions(page) {
        let apiPageRequest = transactionApi;
        if (page > 0) {
            apiPageRequest += `?page=${page}&per_page=5`;
        }
        //console.log("api page request", apiPageRequest);
        const result = await sendRequest(
            `http://localhost:5000/api/trans?page=${page}&per_page=5&userID=${userId}`,
            "GET",
            {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
            });
        //console.log("result ", result);
        setTransactionList(result?.data);
        setTotalPage(result?.totalPage);
    }

    function handlePageClick(event) {
        const pageCliked = event.selected + 1;
        setCurrentPageIndex(event.selected);
        fetchTransactions(pageCliked);
    }

    return (
        <>
            <div className="info-title mb-4">
                <h2>Transaction history{transactionList?.length < 1 && "is empty"}</h2>
            </div>
            <div className="info-title mb-4">
                <h4 className="text-primary">Current balance: {balance}</h4>
            </div>
            <div className="bg-white w-100">
                <table className="table table-striped" style={{ "--bs-table-color": "black" }}>
                    <thead>
                        <tr className="text-center">
                            <th scope="col" style={{ width: "5%" }}>N.o</th>
                            <th scope="col" style={{ width: "25%" }}>Date</th>
                            <th scope="col" style={{ width: "20%" }}>Status</th>
                            <th scope="col" style={{ width: "25%" }}>Amount</th>
                            <th scope="col" style={{ width: "25%" }}>Balance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactionList?.length > 0 && transactionList.map((transaction, index) => (
                            <TransactionRow transaction={{ ...transaction }} count={index + currentPageIndex * perPage + 1} />
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