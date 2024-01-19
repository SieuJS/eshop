// import './AdminProduct.css'
import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom";
import useFetch from '../../customize/useFetch';

export default function AdminProduct() {
  const { catID } = useParams()
  const [allProducts, setAllProducts] = useState([]);
  const { dataFetch, isLoading, isError} = useFetch(`/api/product/${catID}`);

  // const fetchData = async () => {
  //   try {
  //     let proData = await fetch(`https://localhost:3000/api/product/${catID}`);
  //     let proRes = await proData.json();
  //     setAllProducts(proRes.data)
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  const openAddItemForm = () => {
    console.log('open');
  }

  useEffect(() => {
    setAllProducts(dataFetch.data)
  }, [dataFetch, isLoading])

  async function deleteRow(proID) {
    // var row = $(icon).closest('tr');
    var confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa hàng này không?');

    if (confirmDelete) {
      try {
        const result = await fetch(`/api/product/delete?proID=${proID}`);
        const data = await result.json();
        if (data.success) {
          setAllProducts(allProducts.filter((item) => item.ProID !== proID));
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

    return (
      <div className="side-title col-sm-9">
          <div className="table-cards">
            <div className="cat-card card">
              <div className="card-header">
                Product
              </div>
              <div className="card-body">
                  <div className="row mb-3">
                      <div className="search col-sm-5 col-5 offset-sm-0 offset-0">
                        <form className="d-flex search-item" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                            <button className="btn btn-primary" type="submit">Search</button>
                        </form>
                      </div>
                      <div className="btn-add-item d-flex col-sm-3 col-3">
                        <div className="dropdown">
                          <a className="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Sort by
                          </a>

                          <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="#">Action</a></li>
                            <li><a className="dropdown-item" href="#">Another action</a></li>
                            <li><a className="dropdown-item" href="#">Something else here</a></li>
                          </ul>
                        </div>
                      </div>
                      <div className="btn-add-item d-flex col-sm-4 col-4">
                        <Link to={`/admin/product/add/${catID}`} type="button" className="btn btn-primary ms-auto" onClick={(e) => openAddItemForm()}>
                            <i className="fa-solid fa-circle-plus"></i>
                              Add Product 
                        </Link>
                      </div>
                  </div>
                  <table className="table">
                    <thead>
                      <tr className="text-center" >
                        <th scope="col">ID</th>
                        <th scope="col">Image</th>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Option</th>
                      </tr>
                    </thead>
                    <tbody>
                    { isError == false && isLoading == false && allProducts?.length > 0 && allProducts.map(pro => {
                      return <tr className="text-center" key={pro.ProID} style={{verticalAlign: 'middle'}}>
                              <th scope="row">{pro.ProID}</th>
                              <th><img src={pro.Image || "https://myshoes.vn/image/cache/catalog/2023/adidas/adi2/giay-adidas-galaxy-6-nam-den-01-500x500.jpg"} alt="" width="52px" className="rounded-2"/></th>
                              <td>{pro.ProName}</td>
                              <td>{parseFloat(pro.Price).toLocaleString()}</td>
                              <td>{pro.Quantity}</td>
                              <td>
                                <Link to={`/admin/product/edit?catID=${catID}&proID=${pro.ProID}`} className="btn btn-primary btn-sm me-2">
                                  <i className="fa fa-pencil"></i>
                                </Link>
                                <button href="" className="btn btn-danger btn-sm" onClick={(e) => deleteRow(pro.ProID)}>
                                  <i className="fa fa-trash"></i>
                                </button>
                              </td>
                            </tr>
                    })
                    }
                    {
                    isLoading == true && <tr>
                                        <th colSpan={6} style={{ textAlign: 'center' }}>
                                            <div>  
                                            <div className="spinner-border" role="status">
                                              <span className="sr-only">Loading...</span>
                                            </div>
                                            </div>
                                        </th>
                                        </tr>
                                        
                    }
                    </tbody>
                  </table>
              </div>
              <div className="card-footer">
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                      <li className="page-item">
                        <a className="page-link" href="#" aria-label="Previous">
                          <span aria-hidden="true">&laquo;</span>
                        </a>
                      </li>
                      <li className="page-item"><a className="page-link" href="#">1</a></li>
                      <li className="page-item active"><a className="page-link" href="#">2</a></li>
                      <li className="page-item"><a className="page-link" href="#">3</a></li>
                      <li className="page-item">
                        <a className="page-link" href="#" aria-label="Next">
                          <span aria-hidden="true">&raquo;</span>
                        </a>
                      </li>
                    </ul>
                  </nav>
              </div>
            </div>
          </div>
      </div>
    )
}