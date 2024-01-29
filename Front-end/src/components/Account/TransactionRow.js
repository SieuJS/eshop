import { useEffect, useState } from "react";
import { useHttpClient } from "../../hooks/http-hook";

export default function TransactionRow({ transaction, count }) {
    const [status, setStatus] = useState(false);
    const [moneyStatus, setMoneyStatus] = useState(false);
    const [transInfo, setTransInfo] = useState({
        transDate: "",
        transTime: "",
        amount: "",
        balance: ""
    })
    useEffect(() => {
        //console.log("useEffect TranRow", status);
        const statusFromProp = (transaction.Status == "fail") ? false : true;
        setStatus(statusFromProp);
        const moneyState = (parseInt(transaction.Amount) > 0) ? true : false;
        setMoneyStatus(moneyState);
        
        // styling for data
        const date = new Date(Date.parse(transaction.Date)).toString().split(' GMT')[0];
        const transTime = date.substring(11, 16);
        const tempAmount = parseInt(transaction.Amount);
        const tempBalance = parseInt(transaction.Balance);
        const amount = formatWithDot(tempAmount);
        const balance = formatWithDot(tempBalance);
        setTransInfo({
            transDate: date,
            transTime: transTime,
            amount: amount,
            balance: balance
        })
    }, [transaction]);
    function formatWithDot(n) {
        return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }

    //console.log("status", status);
    return (
        <>
            <tr className="text-center">
                <td>{count}</td>
                <td>{transInfo.transDate}</td>
                <td><p className={status ? "text-success" : "text-danger"}>{transaction.Status}</p></td>
                <td><p className={moneyStatus ? "text-primary" : "text-warning"}>{transInfo.amount}</p></td>
                <td>{transInfo.balance}</td>
            </tr>
        </>
    );
}