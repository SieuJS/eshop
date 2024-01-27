import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Auth/Input";
import { useForm } from "../../hooks/form-hook";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE, VALIDATOR_COMPARE_STR } from "../../utils/validators";

import { Backdrop, Button , Typography, Fade, Box} from "@mui/material";
import ClipLoader from 'react-spinners/ClipLoader';


import { useHttpClient } from "../../hooks/http-hook";

import "./CrudAccount.css";
import { AuthContext } from "../../context/AuthContext";
import { BACK_END_SERVER } from "../../keys/BackEndKeys";
import Admin from "../../Admin";


import Modal from '@mui/material/Modal';
import { NavLink } from "react-router-dom";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

function Auth() {
    const navigate = useNavigate()
    const {login} = useContext(AuthContext)
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
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
      const submitHandler = async (event) => {
        event.preventDefault()
            let data ;
            try {
                data =await sendRequest(`${BACK_END_SERVER}/api/admin/login`, 'POST', {
                    "Content-Type": "application/json",
                }, JSON.stringify(
                    {
                        username : formState.inputs.username.value,
                        password : formState.inputs.password.value
                    }
                ))
            }
            catch(err){
                console.log("erro",err)
            }
    
            if(data) {
              login(data.user.id, data.user.role, data.user.token)
              navigate("/admin/dashboard")
            }

      };

  return (
    <div className="w-100 d-flex justify-content-center">
    { isLoading && <ClipLoader
        loading = {isLoading}
        size={200}
        aria-label="Loading Spinner"
      />}
    <div className="side-title col-sm-8">
        <div className="table-cards">

          <div className="cat-card card">
            <div className="card-header text-center">Account</div>
            <div className="card-body">
                
            <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={!!error}
            onClose={clearError}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
              backdrop: {
                timeout: 500,
              },
            }}
          >
            <Fade in={!!error}>
              <Box sx={style}>
                <Typography id="transition-modal-title" variant="h6" component="h2">
                  Password {error && "can't"} changed!!
                </Typography>
                <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                  {error}
                </Typography>
              </Box>
            </Fade>
          </Modal>

              <form>
                    <Input
                      className="form-control"
                      element="input"
                      id="username"
                      onInput={inputHandler}
                      type="text"
                      lable="User name"
                      validators={[VALIDATOR_MINLENGTH(6), VALIDATOR_REQUIRE()]}
                      errorText={{
                        MINLENGTH: "Chiều dài lớn hơn 5",
                        REQUIRE: "Ô này không được để trống",
                      }}
                    />
                      <Input
                        className="form-control"
                        element="input"
                        id="password"
                        onInput={inputHandler}
                        type="password"
                        lable="Password"
                        validators={[VALIDATOR_MINLENGTH(6), VALIDATOR_REQUIRE()]}
                        errorText={{
                          MINLENGTH: "Chiều dài lớn hơn 5",
                          REQUIRE: "Ô này không được để trống",
                        }}
                      />
                <div className="d-flex justify-content-center gap-3">
                  <button
                    className="btn btn-primary"
                    onClick={submitHandler}
                    type="submit"
                    disabled = {!formState.isValid}
                  >
                    LOGIN
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      </div>
  )
}

export default Auth