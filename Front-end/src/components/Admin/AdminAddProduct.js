import { Link, useParams } from "react-router-dom";
import FileInput from "./FileInput";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function AdminAddProduct() {
    const { catID } = useParams()
    const [fileList, setFileList] = useState([])
    const navigate = useNavigate();

    const [proName, setProName] = useState([]);
    const [proPrice, setProPrice] = useState([]);
    const [proQuantity, setProQuantity] = useState([]);
    const [proTinyDes, setProTinyDes] = useState([]);
    const [proFullDes, setProFullDes] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const entity = {
            proName: proName,
            proPrice: proPrice,
            proQuantity: proQuantity,
            proTinyDes: proTinyDes,
            proFullDes: proFullDes,
            catID: catID,
        }

        const formData = new FormData();

        for (const key in entity) {
            formData.append(key, entity[key]);
        }

        if (fileList && fileList.length > 0) {
            formData.append('proImage', fileList[0]);
        }

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
                        fileList={fileList}
                        setFileList={setFileList}/>
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
                              <input type="text" className="form-control" id="productName" name="productName" onChange={(e) => setProName(e.target.value)}/>
                            </div>
                            <div className="row mb-3">
                                <div className="col">
                                    <label htmlFor="inputProductPrice" className="form-label">Price</label>
                                    <input type="text" className="form-control" id="productPrice" name="productPrice" onChange={(e) => setProPrice(e.target.value)}/>
                                </div>
                                <div className="col">
                                    <label htmlFor="inputProductQuantity" className="form-label">Quantity</label>
                                    <input type="text" className="form-control" id="productQuantity" name="productQuantity" onChange={(e) => setProQuantity(e.target.value)}/>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
                                <textarea className="form-control" id="description" name="description" rows="3" onChange={(e) => setProTinyDes(e.target.value)}></textarea>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlTextarea1" className="form-label">Full Description</label>
                                <textarea className="form-control" id="fullDescription" name="fullDescription" rows="3" onChange={(e) => setProFullDes(e.target.value)} ></textarea>
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