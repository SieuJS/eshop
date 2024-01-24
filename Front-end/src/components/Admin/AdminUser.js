import { Link } from "react-router-dom"
export default function AdminUser() {
    return (
      <div className="side-title">
          <div className="table-cards">
            <div className="cat-card card">
              <div className="card-header">
                Product
              </div>
              <div className="card-body">
                  <div className="row mb-3">
                      <div className="search col-sm-5 col-5 offset-sm-0 offset-0">
                        <form className="d-flex search-item" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <div className="btn btn-primary">Search</div>
                        </form>
                      </div>
                      <div className="btn-add-item d-flex col-sm-3 col-3">
                        <div className="dropdown">
                        <select className="form-select" aria-label="Default select example">
                          <option value="none">None Sort</option>
                          <option value="asc">Price ASC</option>
                          <option value="desc">Price DSC</option>
                        </select>
                        </div>
                      </div>
                      <div className="btn-add-item d-flex col-sm-4 col-4">
                        {/* <Link to={`/admin/product/add/`} type="button" className="btn btn-primary ms-auto">
                            <i className="fa-solid fa-circle-plus m-1"></i>
                              Add Product 
                        </Link> */}
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
                    <tr className="text-center" style={{verticalAlign: 'middle'}}>
                        <th scope="row">test</th>
                        <th><img src={"https://as1.ftcdn.net/v2/jpg/04/34/72/82/1000_F_434728286_OWQQvAFoXZLdGHlObozsolNeuSxhpr84.jpg"} alt="" width="52px" className="rounded-2"/></th>
                        <td>test</td>
                        <td>test</td>
                        <td>test</td>
                        <td>
                        <Link to='test' className="btn btn-primary btn-sm m-1">
                            <i className="fa fa-pencil"></i>
                        </Link>
                        <button href="" className="btn btn-danger btn-sm m-1">
                            <i className="fa fa-trash"></i>
                        </button>
                        </td>
                    </tr>
                    {/* {
                    isLoading == true && <tr>
                                        <th colSpan={6} style={{ textAlign: 'center' }}>
                                            <div>  
                                            <div className="spinner-border" role="status">
                                              <span className="sr-only">Loading...</span>
                                            </div>
                                            </div>
                                        </th>
                                        </tr>
                                        
                    } */}
                    </tbody>
                  </table>
              </div>
              <div className="card-footer">
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                      <li className="page-item">
                        <button className="page-link" aria-label="Previous" onClick={() => {
                            //   if (page != 1) {
                            //       onPageChange(1);
                            //   }
                          }}>
                          <span aria-hidden="true">&laquo;</span>
                        </button>
                      </li>
                      <li className="page-item">
                        <button className="page-link" aria-label="Previous" onClick={() => {
                            //   if (page != 1) {
                            //       onPageChange(page-1);
                            //   }
                          }}>
                          <span aria-hidden="true">&lt;</span>
                        </button>
                      </li>
                      <button className="page-link">1</button>
                      {
                        //   renderPagination().map((index) => (
                        //       <li key={index} className={`page-item ${index === page ? 'active' : ''}`}>
                        //           <button className="page-link" onClick={() => onPageChange(index)}>
                        //               {index}
                        //           </button>
                        //       </li>
                        //   )
                        //   )
                      }
                      <li className="page-item">
                        <button className="page-link" aria-label="Next" onClick={() => {
                            // if (page != totalPage) {
                            //     onPageChange(page+1);
                            // }
                        }}>
                          <span aria-hidden="true">&gt;</span>
                        </button>
                      </li>               
                      <li className="page-item">
                        <button className="page-link" aria-label="Next" onClick={() => {
                            // if (page != totalPage) {
                            //     onPageChange(totalPage);
                            // }
                        }}>
                          <span aria-hidden="true">&raquo;</span>
                        </button>
                      </li>
                    </ul>
                  </nav>
              </div>
            </div>
          </div>
      </div>
    )
}