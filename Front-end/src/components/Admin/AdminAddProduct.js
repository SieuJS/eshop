import { Link, useParams } from "react-router-dom";

export default function AdminAddProduct() {
    const { catID } = useParams()
    return (
        <>    
        <div class="main-title">
            <h2>           
                <Link to={`/admin/product/${catID}`} class="btn btn-secondary">
                    <i class="fa-solid fa-left-long"></i>
                </Link>
                PRODUCT
            </h2>
        </div>

        <div class="row">
            <div class="side-title col-sm-12">
                <div class="table-cards">
                  <div class="cat-card card">
                    <div class="card-header">
                      Add Product
                    </div>
                    <div class="card-body">
                        <form method="post" action="https://localhost:3000/api/product/add" enctype="multipart/form-data">
                            <input type="text" class="form-control" name="catID" value = {catID} hidden/>
                            <div class="mb-3">
                              <label for="inputProductName" class="form-label">Name Product</label>
                              <input type="text" class="form-control" id="productName" name="productName"/>
                            </div>
                            <div class="row mb-3">
                                <div class="col">
                                    <label for="inputProductPrice" class="form-label">Price</label>
                                    <input type="text" class="form-control" id="productPrice" name="productPrice"/>
                                </div>
                                <div class="col">
                                    <label for="inputProductQuantity" class="form-label">Quantity</label>
                                    <input type="text" class="form-control" id="productQuantity" name="productQuantity"/>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label for="exampleFormControlTextarea1" class="form-label">Description</label>
                                <textarea class="form-control" id="description" name="description" rows="3"></textarea>
                            </div>
                            <div class="mb-3">
                                <label for="exampleFormControlTextarea1" class="form-label">Full Description</label>
                                <textarea class="form-control" id="fullDescription" name="fullDescription" rows="3"></textarea>
                            </div>
                            <div class="mb-3">
                              <label for="inputProductImage" class="form-label">Picture</label>
                              <div class="file-loading">
                                <input type="file" class="form-control file-input" id="productImage" name="productImage" multiple/>
                              </div>
                              <div id="errorBlock" class="help-block"></div>
                            </div>
                            <button class="btn btn-secondary">Back</button>
                            <button type="submit" class="btn btn-primary">Save</button>
                        </form>
                    </div>
                  </div>
                </div>
            </div>
        </div>
        </>
    );
};