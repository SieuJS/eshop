import { Link, useParams } from "react-router-dom";
import FileInput from "./FileInput";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function AdminAddProduct() {
    const { catID } = useParams()
    const [file, setFile] = useState(null)
    const navigate = useNavigate();
    const [proInfo, setProInfo] = useState({
        proName : '',
        proPrice : '',
        proQuantity : '',
        proTinyDes: '',
        proFullDes : '',
    })

    const [errorInput, setErrorInput] = useState({});

    const handleInput = (e) => {
        const newProInfo = { ...proInfo, [e.target.name]: e.target.value }
        setProInfo(newProInfo);
    }

    const validation = (value) => {
        const errors = {}

        const regexNumber = /^[0-9]\d*$/;
        if (value.proName === '') {
            errors.proName = 'Name is required'
        }

        if (!regexNumber.test(value.proPrice)) {
            errors.proPrice = 'Price is invalid'
        }

        if (!regexNumber.test(value.proQuantity)) {
            errors.proQuantity = 'Quantity is invalid'
        }
        return errors   
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validation(proInfo)
        setErrorInput(errors)
        if (Object.keys(errors).length > 0) {
            return;
        }

        const entity = proInfo
        entity.catID = catID

        const formData = new FormData();

        for (const key in entity) {
            formData.append(key, entity[key]);
        }

        if (file) {
            formData.append('proImage', file);
        }

        console.log(file);
        console.log(entity);
        

        const res = await fetch('/api/product/add', {
            method: 'POST',
            body: formData,
        })

        const data = await res.json();
        navigate(-1);
    }
    
    return (
        <>    
        <div className="main-title">
            <h2>           
                <Link to={`/admin/product/${catID}`} className="btn btn-secondary me-3">
                    <i className="fa-solid fa-left-long"></i>
                </Link>
                ADD PRODUCT
            </h2>
        </div>

        <div className="row">
            <div className="side-title col-sm-4">
              <div className="table-cards">
                <div className="cat-card card">
                    <div className="card-header">
                        Add Images
                    </div>
                    <div className="card-body">
                        <FileInput
                        file={file}
                        setFile={setFile}/>
                    </div>
                </div>               
              </div>
            </div>
            <div className="side-title col-sm-8">
                <div className="table-cards">
                  <div className="cat-card card">
                    <div className="card-header">
                      Add Information
                    </div>
                    <div className="card-body">
                        <form method="post">
                            <div className="mb-3">
                              <label htmlFor="inputProductName" className="form-label">Name Product</label>
                              <input type="text" className="form-control" id="productName" name="proName" onChange={(e) => handleInput(e)}/>
                              {errorInput.proName && <span style={{color:'red'}}>{errorInput.proName}</span>}
                            </div>
                            <div className="row mb-3">
                                <div className="col">
                                    <label htmlFor="inputProductPrice" className="form-label">Price</label>
                                    <input type="number" className="form-control" id="productPrice" name="proPrice" onChange={(e) => handleInput(e)}/>
                                    {errorInput.proPrice && <span style={{color:'red'}}>{errorInput.proPrice}</span>}
                                    
                                </div>
                                <div className="col">
                                    <label htmlFor="inputProductQuantity" className="form-label">Quantity</label>
                                    <input type="number" className="form-control" id="productQuantity" name="proQuantity" onChange={(e) => handleInput(e)}/>
                                    {errorInput.proQuantity && <span style={{color:'red'}}>{errorInput.proQuantity}</span>}
                                    
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
                                <textarea className="form-control" id="description" name="proTinyDes" rows="3" onChange={(e) => handleInput(e)}></textarea>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlTextarea1" className="form-label">Full Description</label>
                                <textarea className="form-control" id="fullDescription" name="proFullDes" rows="3" onChange={(e) => handleInput(e)} ></textarea>
                            </div>
                            <Link to={`/admin/product/${catID}`} className="btn btn-secondary me-2">Back</Link>
                            <button type="submit" onClick={(e) => handleSubmit(e)} className="btn btn-primary">Save</button>
                        </form>
                    </div>
                  </div>
                </div>
            </div>
        </div>
        </>
    );
};