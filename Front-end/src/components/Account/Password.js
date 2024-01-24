import { useContext, useEffect, useState } from "react";
import { useHttpClient } from "../../hooks/http-hook";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import {ACCOUNT_API as accountApi} from "../../keys/BackEndKeys.js"

export default function Password() {
    const { sendRequest } = useHttpClient();
    const { userId, token } = useContext(AuthContext);
    const navigate = useNavigate();
    const [passwordForm, setPasswordForm] = useState({
        oldPw: "",
        newPw: "",
        newPwAgain: ""
    });
    const [matchNewPw, setMatchNewPw] = useState(true);
    const [matchOldPw, setMatchOldPw] = useState(true);

    function handleChange(e) {
        e.preventDefault();
        const targetName = e.target.name;
        const targetValue = e.target.value;
        setPasswordForm(prevDataForm => {
            return ({
                ...prevDataForm,
                [targetName]: targetValue
            });
        })
    }

    //console.log("password form", passwordForm);
    async function handleSubmit(e) {
        e.preventDefault();
        // firstly, check the old password be correct
        const apiPost = `${accountApi}/checkpassword`;
        console.log("Api post in password component", apiPost)
        try {
            const data = await sendRequest(
                apiPost,
                "POST",
                {
                    "Content-type": "application/json",
                    "Authorization": `Bear ${token}`
                },
                JSON.stringify({
                    password: passwordForm.oldPw
                })
            );
            console.log("checkpw in handleSubmit function", data);
            const match = data?.match ? data.match : false;
            setMatchOldPw(match);
            if (match && matchNewPw) {
                // try to send request to update
                const result = await sendRequest(
                    `${accountApi}/update`,
                    "POST",
                    {
                        "Content-type": "application/json",
                        "Authorization": `Bear ${token}`
                    },
                    JSON.stringify({
                        newPassword: passwordForm.newPw
                    })
                )
                console.log("result after update password", result);
                navigate("/account");
            }
        } catch (err) {
            throw err;
        }
    }

    function checkMatchNewPw() {
        setMatchNewPw(() => {
            return passwordForm.newPw == passwordForm.newPwAgain;
        });
    }
    useEffect(() => {
        checkMatchNewPw();
    }, [passwordForm.newPwAgain]);

    return (
        <>
            <div className="info-title mb-4">
                <h3>Change password</h3>
            </div>
            <form onSubmit={handleSubmit} className="info-content">
                <div className="container">
                    <div className="row">
                        <div className="col-4 text-end">
                            <p>Old password:</p>
                        </div>
                        <div className="col-8">
                            <input
                                type="password"
                                onChange={handleChange}
                                name="oldPw"
                                value={passwordForm.oldPw}
                                style={{ width: "200px" }}
                            >
                            </input>
                            {!matchOldPw && (
                                <p className="text-danger">* The old pass word is incorrect</p>
                            )}
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-4 text-end">
                            <p>New password:</p>
                        </div>
                        <div className="col-8">
                            <input
                                type="password"
                                onChange={handleChange}
                                name="newPw"
                                value={passwordForm.newPw}
                                style={{ width: "200px" }}
                            >
                            </input>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-4 text-end">
                            <p>Rewrite new password:</p>
                        </div>
                        <div className="col-8">
                            <input
                                type="password"
                                onChange={handleChange}
                                name="newPwAgain"
                                value={passwordForm.newPwAgain}
                                style={{ width: "200px" }}
                            >
                            </input>
                            {!matchNewPw && (
                                <p className="text-danger">* New password does not match</p>
                            )}
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-4 text-end">
                        </div>
                        <div className="col-8">
                            <button
                                className="btn btn-success"
                                type="submit"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
}