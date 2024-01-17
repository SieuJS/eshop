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

        const res = await fetch('https://localhost:3000/api/product/add', {
            method: 'POST',
            body: formData,
        })

        const data = await res.json();
        navigate(-1);
    }
    
    return (
        <>    
        <div class="main-title">
            <h2>           
                <Link to={`/admin/product/${catID}`} class="btn btn-secondary">
                    <i class="fa-solid fa-left-long"></i>
                </Link>
                ADD PRODUCT
            </h2>
        </div>

        <div class="row">
            <div class="side-title col-sm-4">
              <div class="table-cards">
                <div class="cat-card card">
                    <div class="card-header">
                        Add Images
                    </div>
                    <div class="card-body">
                        <FileInput
                        fileList={fileList}
                        setFileList={setFileList}/>
                    </div>
                </div>               
              </div>
            </div>
            <div class="side-title col-sm-8">
                <div class="table-cards">
                  <div class="cat-card card">
                    <div class="card-header">
                      Add Information
                    </div>
                    <div class="card-body">
                        <form method="post">
                            <input type="text" class="form-control" name="catID" value = {catID} hidden/>
                            <div class="mb-3">
                              <label for="inputProductName" class="form-label">Name Product</label>
                              <input type="text" class="form-control" id="productName" name="productName" onChange={(e) => setProName(e.target.value)}/>
                            </div>
                            <div class="row mb-3">
                                <div class="col">
                                    <label for="inputProductPrice" class="form-label">Price</label>
                                    <input type="text" class="form-control" id="productPrice" name="productPrice" onChange={(e) => setProPrice(e.target.value)}/>
                                </div>
                                <div class="col">
                                    <label for="inputProductQuantity" class="form-label">Quantity</label>
                                    <input type="text" class="form-control" id="productQuantity" name="productQuantity" onChange={(e) => setProQuantity(e.target.value)}/>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label for="exampleFormControlTextarea1" class="form-label">Description</label>
                                <textarea class="form-control" id="description" name="description" rows="3" onChange={(e) => setProTinyDes(e.target.value)}></textarea>
                            </div>
                            <div class="mb-3">
                                <label for="exampleFormControlTextarea1" class="form-label">Full Description</label>
                                <textarea class="form-control" id="fullDescription" name="fullDescription" rows="3" onChange={(e) => setProFullDes(e.target.value)} ></textarea>
                            </div>
                            <button class="btn btn-secondary">Back</button>
                            <button type="submit" onClick={(e) => handleSubmit(e)} class="btn btn-primary">Save</button>
                        </form>
                    </div>
                  </div>
                </div>
            </div>
        </div>
        </>
    );
};