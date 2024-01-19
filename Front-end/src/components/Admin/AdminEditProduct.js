import { Link, useParams, useSearchParams } from "react-router-dom";
import FileInput from "./FileInput";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import useFetch from "../../customize/useFetch";
import { CatContext } from "../../context/CatContext";

export default function AdminEditProduct() {
    const [searchParams] = useSearchParams()
    const catID = searchParams.get("catID")
    const proID = searchParams.get("proID")
    const navigate = useNavigate();

    const [fileList, setFileList] = useState([])
    const { dataFetch, isLoading, isError } = useFetch(`/api/product/get-by-pro/${proID}`);
    const { allCategories, setAllCategories} = useContext(CatContext);
    const [proInfo, setProInfo] = useState({})

    useEffect(() => {
        console.log(dataFetch);
        if (dataFetch.data && dataFetch.data.length > 0) {
            setProInfo(dataFetch.data[0]);
        }
    }, [dataFetch])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const entity = {
            proName: proInfo.ProName,
            proPrice: proInfo.Price,
            proQuantity: proInfo.Quantity,
            proTinyDes: proInfo.TinyDes,
            proFullDes: proInfo.FullDes,
            catID: proInfo.CatID,
            proID: proID
        }

        console.log(entity);

        const formData = new FormData();

        for (const key in entity) {
            formData.append(key, entity[key]);
        }

        if (fileList && fileList.length > 0) {
            formData.append('proImage', fileList[0]);
        }

        const res = await fetch('/api/product/update', {
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
                <Link to={`/admin/product/${catID}`} className="btn btn-secondary">
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
                        <div style={{'textAlign': 'center'}}>
                            <img src={proInfo.Image} alt="" className = "file-input-label_image"/>
                            <p style={{'marginTop': '8px'}}>Current Image</p>
                        </div>
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
                            <div className="row mb-3">
                                <div className="col">
                                    <label htmlFor="inputProductName" className="form-label">Name Product</label>
                                    <input type="text" className="form-control" id="productName" name="productName" onChange={(e) => setProInfo({...proInfo, ProName: e.target.value})} value={proInfo.ProName || '' } />
                                </div>
                                <div className="col">
                                    <label htmlFor="inputProductName" className="form-label">Category</label>
                                    <select id="editCategory" name="editCategory" className="form-control" onChange={(e) => setProInfo({...proInfo, CatID: e.target.value})} value={proInfo.CatID}>
                                        {allCategories && allCategories.length > 0 &&
                                            allCategories.map(cat => {
                                                return <option key={cat.CatID} value={cat.CatID}>{cat.CatName}</option>
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col">
                                    <label htmlFor="inputProductPrice" className="form-label">Price</label>
                                            <input type="number" className="form-control" id="productPrice" name="productPrice" value={parseFloat(proInfo.Price) || '' } onChange={(e) => setProInfo({...proInfo, Price: e.target.value})}  />
                                </div>
                                <div className="col">
                                    <label htmlFor="inputProductQuantity" className="form-label">Quantity</label>
                                            <input type="text" className="form-control" id="productQuantity" name="productQuantity" value={proInfo.Quantity || '0' } onChange={(e) => setProInfo({...proInfo, Quantity: e.target.value})}  />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
                                        <textarea className="form-control" id="description" name="description" rows="3" value={proInfo.TinyDes || ''} onChange={(e) => setProInfo({...proInfo, TinyDes: e.target.value})} ></textarea>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlTextarea1" className="form-label">Full Description</label>
                                <textarea className="form-control" id="fullDescription" name="fullDescription" rows="3" value = {proInfo.FullDes || '' } onChange={(e) => setProInfo({...proInfo, FullDes: e.target.value})}  ></textarea>
                            </div>
                            <Link to={`http://localhost:3001/admin/product/${catID}`} className="btn btn-secondary">Back</Link>
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