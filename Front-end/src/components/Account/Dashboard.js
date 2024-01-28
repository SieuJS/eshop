import { useState, useEffect, useContext } from "react";
import { useHttpClient } from "../../hooks/http-hook";
import { AuthContext } from "../../context/AuthContext";
import LoadingSpinner from "../UIElements/LoadingSpinner";
import {ACCOUNT_API as accountApi} from "../../keys/BackEndKeys.js"

export default function Dashboard() {
    const { userId, role } = useContext(AuthContext);
    const { isLoading, sendRequest, error, clearError } = useHttpClient();
    const [userInfo, setUserInfo] = useState({});
    useEffect(() => {
        async function fetchUser() {
            const pathToUser = (role == "user" ? "" : "/google");
            const apiGetAccount = `${accountApi}${pathToUser}/${userId}`;
            //console.log("api get in dashboard", apiGetAccount);
            if (userId) {
                try {
                    const data = await sendRequest(
                        apiGetAccount,
                        "GET",
                        { "Content-type": "application/json" });
                    setUserInfo({ ...data.user });
                }
                catch (err) {
                    throw err;
                }
            }
        }
        fetchUser();
    }, [role]);
    console.log("Dashboard rendered");
    return (
        <>
            {isLoading && (<LoadingSpinner asOverlay />)}
            <div className="info-title mb-4">
                <h3>Your personal information</h3>
                <p></p>
            </div>
            <div className="info-content p-4">
                {role === "user" && (
                    <div className="container">
                        <div className="row">
                            <div className="col-4 text-end">
                                <p>Username:</p>
                            </div>
                            <div className="col-8">
                                <p>{userInfo.Username}</p>
                            </div>
                        </div>
                    </div>
                )}
                <div className="container">
                    <div className="row">
                        <div className="col-4 text-end">
                            <p>Your fullname:</p>
                        </div>
                        <div className="col-8">
                            <p>{userInfo.Name}</p>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-4 text-end">
                            <p>Email:</p>
                        </div>
                        <div className="col-8">
                            <p>{userInfo.Email}</p>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-4 text-end">
                            <p>Date of birth:</p>
                        </div>
                        <div className="col-8">
                            <p>{userInfo.DOB}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}