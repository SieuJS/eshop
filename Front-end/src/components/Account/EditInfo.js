import { useState, useEffect, useImperativeHandle } from "react";
import { useHttpClient } from "../../hooks/http-hook";

export default function EditInfo({ userId }) {
    const {isLoading, sendRequest, error, clearError} = useHttpClient();
    const [userFormData, setUserFormData] = useState({
        newName: "",
        newUsername: "",
        newEmail: "",
        newDOB: ""
    });
    useEffect(() => {
        /* async function fettUserInfo() {
            const response = await fetch(`http://localhost:3000/api/account/11`);
            const info = await response.json();
            setUserFormData({
                newName: info.Name,
                newUsername: info.Username,
                newEmail: info.Email,
                newDOB: info.DOB
            });
        }
        fettUserInfo(); */

        async function fetchUser() {
            try {
                const info = await sendRequest(
                    "http://localhost:3000/api/account/11",
                    "GET",
                    {
                        'Content-Type': 'application/json'
                    });
                setUserFormData({
                    newName: info.Name,
                    newUsername: info.Username,
                    newEmail: info.Email,
                    newDOB: info.DOB.substring(0, 10)
                });
            }
            catch (err) {
                throw err;
            }
        }
        fetchUser();
    }, []);

    function handleChange(event) {
        const targetName = event.target.name;
        const targetValue = event.target.value;
        setUserFormData(prevFormData => {
            return {
                ...prevFormData,
                [targetName]: targetValue
            }
        });
        console.log("formdata", userFormData);
    }
    function handleSubmit(event) {
        event.preventDefault();
        console.log(userFormData);
    }
    return (
        <>
            <div className="info-title mb-4">
                <h3>Hồ sơ của tôi</h3>
                <p>Quản lý thông tin tài khoản</p>
            </div>
            <form onSubmit={handleSubmit} className="info-content">
                <div className="container">
                    <div className="row">
                        <div className="col-4 text-end">
                            <p>Tên tài khoản:</p>
                        </div>
                        <div className="col-8">
                            <input
                                type="text"
                                onChange={handleChange}
                                name="newUsername"
                                value={userFormData.newUsername}
                                style={{ width: "200px" }}>
                            </input>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-4 text-end">
                            <p>Tên người dùng:</p>
                        </div>
                        <div className="col-8">
                            <input
                                type="text"
                                onChange={handleChange}
                                name="newName"
                                value={userFormData.newName}
                                style={{ width: "200px" }}>
                            </input>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-4 text-end">
                            <p>Email:</p>
                        </div>
                        <div className="col-8">
                            <input
                                type="text"
                                onChange={handleChange}
                                name="newEmail"
                                value={userFormData.newEmail}
                                style={{ width: "200px" }}>
                            </input>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-4 text-end">
                            <p>Ngày sinh:</p>
                        </div>
                        <div className="col-8">
                            <input
                                type="date"
                                onChange={handleChange}
                                name="newDOB"
                                value={userFormData.newDOB}
                                style={{ width: "200px" }}>
                            </input>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-4 text-end">
                        </div>
                        <div className="col-8">
                            <button className="btn btn-success">Lưu</button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
}