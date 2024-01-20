import { useState, useEffect } from "react";
import { useHttpClient } from "../../hooks/http-hook";

export default function Dashboard({ userId }) {
    const { isLoading, sendRequest, error, clearError } = useHttpClient();
    const [userInfo, setUserInfo] = useState({});
    useEffect(() => {
        async function fetchUser() {
            try {
                const data = await sendRequest(
                    "http://localhost:3000/api/account/11",
                    "GET",
                    {
                        'Content-Type': 'application/json'
                    });
                
                setUserInfo({...data});
            }
            catch (err) {
                throw err;
            }
        }
        fetchUser();
    }, []);
    return (
        <>
            <div className="info-title mb-4">
                <h3>Thông tin tài khoản</h3>
                <p></p>
            </div>
            <div className="info-content">
                <div className="container">
                    <div className="row">
                        <div className="col-4 text-end">
                            <p>Tên tài khoản:</p>
                        </div>
                        <div className="col-8">
                            <p>{userInfo.Username}</p>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-4 text-end">
                            <p>Tên người dùng:</p>
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
                            <p>Ngày sinh:</p>
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