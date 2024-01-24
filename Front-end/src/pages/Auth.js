import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import Input from "../components/Auth/Input";
import { useForm } from "../hooks/form-hook";
import { useHttpClient } from "../hooks/http-hook";
import { AuthContext } from "../context/AuthContext";
import { GoogleLogin } from "@react-oauth/google";

import { Button } from "@mui/material"

import {
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_COMPARE_STR,
} from "../utils/validators";

import {
  SIGN_IN_API as apiSignin,
  SIGN_UP_API as apiSignup,
} from "../keys/BackEndKeys";

function Auth() {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [isRegisterWithGoogle, setIsRegisterWithGoogle] = useState(false);
  const [googleFormData, setGoogleFormData] = useState({
    id: 0,
    email: ""
  });

  const [formState, inputHandler, setFormData] = useForm(
    {
      username: {
        value: "",
        isValid: false,
      },

      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          email: undefined,
          name: undefined,
          role: undefined,
          repassword: undefined,
          dob: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isVaslid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          email: {
            value: "",
            isValid: false,
          },
          repassword: {
            value: "",
            isValid: false,
          },
          name: {
            value: "",
            isValid: false,
          },
          dob: {
            value: "",
            isValid: false,
          },
          role: {
            value: 0,

            isValid: true,
          },
        },
        false
      );
    }
    setIsLoginMode((prev) => !prev);
  };

  const authSubmitHandler = async (event) => {
    event.preventDefault();
    // Continue with Google
    if (isRegisterWithGoogle) {
      console.log("Register btn submitted, google; formData", googleFormData);
      let data;
      try {
        data = await sendRequest(
          `/api/account/google/register`,
          "POST",
          {
            "Content-Type": "application/json",
          },
          JSON.stringify({
            id: googleFormData.id,
            name: formState.inputs.name.value,
            email: googleFormData.email,
            dob: formState.inputs.dob.value,
            role: "usergoogle"
          }));
      } catch (err) {
        console.log("error in register with Google", err);
      }
      console.log("data in auth register wG", data);
      auth.login(data.user.id, data.user.role.trim(), data.user.token);
      navigate("/");
      return;
    }

    let data;
    console.log('clicked')
    if (isLoginMode) {
      try {
        data = await sendRequest(
          apiSignin,
          "POST",
          {
            "Content-Type": "application/json",
          },
          JSON.stringify({
            // username: formState.inputs.name.value,
            username: formState.inputs.username.value,
            password: formState.inputs.password.value,
          })
        );
      } catch (err) {
        console.log(err)
      }
    } else {
      try {
        console.log(apiSignin);
        console.log(JSON.stringify({
          // username: formState.inputs.name.value,
          username: formState.inputs.username.value,
          password: formState.inputs.password.value,
          name: formState.inputs.name.value,
          email: formState.inputs.email.value,
          dob: formState.inputs.dob.value,
          role: 0
        }))
        data = await sendRequest(apiSignup, "POST", {
          "Content-Type": "application/json",
        },
          JSON.stringify({
            // username: formState.inputs.name.value,
            username: formState.inputs.username.value,
            password: formState.inputs.password.value,
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            dob: formState.inputs.dob.value,
            role: "user"
          }));
      } catch (err) {
        console.log(err)
      }
    }
    if (data) {
      console.log("data in auth login/signin", data);
      auth.login(data.user.id, data.user.role.trim(), data.user.token);
      navigate("/");
    } else {
    }
  };

  async function handleGoogleOAuthBtn(credentialResponse) {
    const credentialDecoded = jwtDecode(credentialResponse.credential);
    //console.log("from GG login", credentialDecoded);
    // get the sub to check whether this account has been register with our application
    const subjectIdentifier = credentialDecoded.sub;
    const email = credentialDecoded.email;
    setGoogleFormData({
      id: subjectIdentifier,
      email: email
    });
    let data;
    // fetch user to start register or navigate to home page
    try {
      data = await sendRequest(
        `/api/account/google/check/${subjectIdentifier}`,
        "GET",
        {
          "Content-Type": "application/json",
        }
      );
    } catch (err) {
      console.log(err)
    }
    console.log("data of checking existed Google OAuth", data);
    console.log("data in auth login/signin", data);
    if (data?.existed) {
      auth.login(data.user.id, data.user.role.trim(), data.user.token);
      navigate("/");
    } else {
      console.log("Fill out info to start using Login with Google")
      setIsLoginMode(false);
      setIsRegisterWithGoogle(true);
    }
  }

  return (
    <section className="vh-100" style={{ backgroundColor: " #9A616D" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card" style={{ borderRadius: "1rem" }}>
              <div className="row g-0">
                <div className="col-md-6 col-lg-5 d-none d-md-block">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                    alt="login form"
                    className="img-fluid"
                    style={{ borderRadius: "1rem 0 0 1rem" }}
                  />
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-black">
                    <form>
                      <div className="d-flex align-items-center mb-3 pb-1">
                        <h1 className="m-0 display-5 font-weight-semi-bold">
                          <span className="text-primary font-weight-bold border px-3 mr-1">E</span>Shopper
                        </h1>
                      </div>

                      <h5
                        className="fw-normal mb-3 pb-3"
                        style={{ letterSpacing: "1px" }}
                      >
                        Sign into your account
                      </h5>

                      {(!isLoginMode || isRegisterWithGoogle) && (
                        <>
                          <Input
                            element="input"
                            id="name"
                            type="text"
                            lable="Tên người dùng"
                            validators={[
                              VALIDATOR_REQUIRE(),
                              VALIDATOR_MINLENGTH(6),
                            ]}
                            errorText={{
                              MINLENGTH: "Chiều dài lớn hơn 5",
                              REQUIRE: "Ô này không được để trống",
                            }}
                            onInput={inputHandler}
                          />

                          <Input
                            element="input"
                            id="dob"
                            type="date"
                            lable="Ngày sinh nhật"
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText={{
                              REQUIRE: "Ô này không được để trống",
                            }}
                            onInput={inputHandler}
                          />

                          {!isRegisterWithGoogle && (
                            <Input
                              element="input"
                              id="email"
                              type="text"
                              lable="Email"
                              validators={[VALIDATOR_REQUIRE()]}
                              errorText={{
                                REQUIRE: "Ô này không được để trống",
                              }}
                              onInput={inputHandler}
                            />
                          )}
                        </>
                      )}
                      {(!isRegisterWithGoogle || isLoginMode) && (
                        <>
                          <Input
                            element="input"
                            id="username"
                            type="text"
                            lable="Tên đăng nhập"
                            validators={[
                              VALIDATOR_REQUIRE(),
                              VALIDATOR_MINLENGTH(6),
                            ]}
                            errorText={{
                              MINLENGTH: "Chiều dài lớn hơn 5",
                              REQUIRE: "Ô này không được để trống",
                            }}
                            onInput={inputHandler}
                          />

                          <Input
                            element="input"
                            id="password"
                            type="password"
                            lable="Mật khẩu"
                            validators={[
                              VALIDATOR_REQUIRE(),
                              VALIDATOR_MINLENGTH(6),
                            ]}
                            onInput={inputHandler}
                            errorText={{
                              REQUIRE: "Ô này không được để trống",
                              MINLENGTH: `Mật khẩu phải có độ dài lớn hơn ${6}`,
                            }}
                          />
                        </>
                      )}
                      {!isLoginMode && !isRegisterWithGoogle && (
                        <>
                          <Input
                            element="input"
                            id="repassword"
                            type="password"
                            lable="Nhập lại mật khẩu"
                            validators={[
                              VALIDATOR_REQUIRE(),
                              VALIDATOR_MINLENGTH(6),
                              VALIDATOR_COMPARE_STR(
                                formState.inputs.password.value
                              ),
                            ]}
                            errorText={{
                              REQUIRE: "Ô này không được để trống",
                              MINLENGTH: `Mật khẩu phải có độ dài lớn hơn ${6}`,
                              COMPARE_STR: "Mật khẩu không trùng khớp",
                            }}
                            onInput={inputHandler}
                            listenTo={{
                              ele: formState.inputs.password.value,
                              triggers: [
                                VALIDATOR_COMPARE_STR(
                                  formState.inputs.password.value
                                ),
                              ],
                            }}
                          />
                        </>
                      )}

                      <div className="pt-1 mb-4">
                        <Button
                          className="btn btn-dark btn-lg btn-block"
                          onClick={authSubmitHandler}
                          variant="contained"
                        >
                          {isLoginMode ? "Login" : "Register"}
                        </Button>
                      </div>
                    </form>
                    {!isRegisterWithGoogle && (
                      <div className="d-flex">
                        <span className="py-2 mr-2">Or continue with: </span>
                        <GoogleLogin
                          onSuccess={handleGoogleOAuthBtn}
                          onError={() => {
                            console.log('Login Failed with GG OAuth');
                          }}
                        />
                      </div>
                    )}
                    <a className="small text-muted" href="#!">
                      Forgot password?
                    </a>

                    {!isRegisterWithGoogle && (
                      <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                        {isLoginMode ? "Don't have an account ?" : "Already have an account ?"}{" "}
                        <Button
                          onClick={switchModeHandler}
                          style={{ color: "#393f81" }}
                          variant="text">
                          {isLoginMode ? "Register here" : "Login here"}
                        </Button>
                      </p>
                    )}
                    <a href="#!" className="small text-muted">
                      Terms of use.
                    </a>
                    <a href="#!" className="small text-muted">
                      Privacy policy
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Auth;
