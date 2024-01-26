import { useEffect, useState } from "react";
import { useHttpClient } from "../../hooks/http-hook";

export default function TransactionRow({ transaction, count}) {
    const [status, setStatus] = useState(false);
    const [moneyStatus, setMoneyStatus] = useState(false);
    useEffect(() => {
        //console.log("useEffect TranRow", status);
        const statusFromProp = transaction.Status == "fail" ? false: true;
        setStatus(statusFromProp);
        const moneyState = (parseInt(transaction.Amount) > 0) ? true: false; 
        setMoneyStatus(moneyState);
    }, []);

    //console.log("status", status);
    return (
        <>
            <tr className="text-center">
                <td>{count}</td>
                <td>{transaction.Date}</td>
                <td><p className={status ? "text-success": "text-danger"}>{transaction.Status}</p></td>
                <td><p className={moneyStatus ? "text-primary": "text-warning"}>{transaction.Amount}</p></td>
                <td>{transaction.Balance}</td>
            </tr>
        </>
    );
}