import React from 'react'

import Input from '../../components/Auth/Input'
import { useForm } from '../../hooks/form-hook'
import {
    VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE 
} from "../../utils/validators"

const fakeUser = {
    username : "admin",
    password : "",
}

function CrudAccount() {
    const [formState, inputHandler, setFormData] = useForm ({
        username : {
            value : "",
            isValid : false,
        },
        password : {
            value : fakeUser.password,
            isValid : false,
        },     
    }, true)

  return (
    <div className='crud-container d-flex justify-content-center'>
    <div className = "cat-card card w-50" >
        <div className='card-header text-center'>
            Account
        </div>
        <div className='card-body'>
            <Input
                className = "form-control"
                element = "input"
                id = "username"
                onInput = {inputHandler}
                type = "text"
                lable = "User name"
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
            />
        </div>
        </div>
   </div>
  )
}

export default CrudAccount