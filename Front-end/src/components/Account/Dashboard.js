import {useState, useEffect} from "react";

export default function Dashboard({userId}) {
    const [userInfo, setUserInfo] = useState({});
    useEffect(() => {
        async function fettUserInfo() {
            const response = await fetch(`http://localhost:3000/api/account/11`);
            const info = await response.json();
            setUserInfo(info);
        }
        fettUserInfo();
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