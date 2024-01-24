import { useState, useEffect, useContext } from "react";
import { useHttpClient } from "../../hooks/http-hook";
import { AuthContext } from "../../context/AuthContext";
import Auth from "../../pages/Auth";

export default function Dashboard() {
    const { userId } = useContext(AuthContext);
    console.log("userID dashboard", userId);
    const { isLoading, sendRequest, error, clearError } = useHttpClient();
    const [userInfo, setUserInfo] = useState({});
    useEffect(() => {
        async function fetchUser() {
            if (userId) {
                try {
                    const data = await sendRequest(
                        `/api/account/${userId}`,
                        "GET");
    
                    setUserInfo({ ...data });
                }
                catch (err) {
                    throw err;
                }
            }
        }
        fetchUser();
    }, []);
    return (
        <>
            <div className="info-title mb-4">
                <h3>Your personal information</h3>
                <p></p>
            </div>
            <div className="info-content">
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