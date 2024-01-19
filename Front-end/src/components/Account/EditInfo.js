import { useState, useEffect } from "react";
export default function EditInfo({ userId }) {
    const [userInfo, setUserInfo] = useState({});
    const [userFormData, setUserFormData] = useState({
        newName: userInfo.Name || "",
        newUsername: userInfo.Username || "",
        newEmail: userInfo.Email || "",
        newDOB: userInfo.DOB || ""
    });
    useEffect(() => {
        async function fettUserInfo() {
            const response = await fetch(`http://localhost:3000/api/account/11`);
            const info = await response.json();
            setUserInfo(info);
        }
        //fettUserInfo();
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