import React, { useEffect, useState } from 'react'

import Input from '../../components/Auth/Input'
import { useForm } from '../../hooks/form-hook'
import {
    VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE 
} from "../../utils/validators"

import { Button } from '@mui/material'

import "./CrudAccount.css"

const fakeUser = {
    username : "admin",
    password : "123123",
}

function CrudAccount() {

    const [disableEdit, setDisableEdit] = useState(true)

    const [formState, inputHandler, setFormData] = useForm ({
        username : {
            value : '',
            isValid : false,
        },
        password : {
            value : '',
            isValid : false,
        },     
    }, false)

    useEffect(()=> {

        setFormData({
            username : {
                value : fakeUser.username,
                isValid : true
            },
            password : {
                value : fakeUser.password,
                isValid : true
            },
        },true)
    },[disableEdit])

  return (
    <div className='crud-container d-flex justify-content-center'>
    <div className = "cat-card card" >
        <div className='card-header text-center'>
            Account
        </div>
        <div className='card-body'>
            <form>
            <Input
                className = "form-control"
                element = "input"
                id = "username"
                onInput = {inputHandler}
                type = "text"
                lable = "User name"
                initialValue = {fakeUser.username}
                validators = {[
                    VALIDATOR_MINLENGTH(6),
                    VALIDATOR_REQUIRE()
                ]}
                errorText = {
                    {
                        MINLENGTH: "Chiều dài lớn hơn 5",
                        REQUIRE: "Ô này không được để trống",
                    }
                }
                disabled = {true}
            />
            <Input
                className = "form-control"
                element = "input"
                id = "password"
                onInput = {inputHandler}
                type = "password"
                lable = "Password"
                initialValue = {fakeUser.password}
                validators = {[
                    VALIDATOR_MINLENGTH(6),
                    VALIDATOR_REQUIRE()
                ]}
                errorText = {
                    {
                        MINLENGTH: "Chiều dài lớn hơn 5",
                        REQUIRE: "Ô này không được để trống",
                    }
                }
                disabled = {disableEdit}
            />
            <div className='d-flex justify-content-center gap-3'>
            <button className='btn btn-primary'
                onClick={()=> setDisableEdit(prev => !prev)}
                type = "button"
            >{disableEdit ? "EDIT" : "LOCK"}
            </button>
            {   !disableEdit &&
            <button className='btn btn-primary'>
                SUBMIT
            </button>
            }   
            </div>
            </form>
        </div>
        </div>
   </div>
  )
}

export default CrudAccount