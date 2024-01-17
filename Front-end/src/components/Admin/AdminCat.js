import $ from 'jquery'
// import './AdminCat.css'
import { useEffect, useContext } from 'react';
import { CatContext } from '../../context/CatContext.js';

export default function AdminCat() {
  const {allCategories, setAllCategories, isLoading, isError} = useContext(CatContext);

  function openAddItemForm() {
      window.$('#addItemModal').modal('show');
  }

  function cancelAddItemForm() {
      window.$('#addItemModal').modal('hide');
  }

  async function submitAddItemForm() {
    const entity = {
      CatName : $('#catName').val()
    }

    const data = await fetch('https://localhost:3000/api/categories/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(entity),
    })
    const res = await data.json();
    if (res.success) {
      entity.CatID = res.data.CatID;
      setAllCategories([...allCategories, entity])
    }
    window.$('#addItemModal').modal('hide');
  }

  async function deleteRow(icon, id) {
    // var row = $(icon).closest('tr');
    var confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa hàng này không?');

    if (confirmDelete) {
      try {
        const result = await fetch(`https://localhost:3000/api/categories/delete?CatID=${id}`);
        const data = await result.json();
        if (data.success) {
          setAllCategories(allCategories.filter((item) => item.CatID !== id));
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  async function editRow(icon) {
      const row = $(icon).closest('tr');
      const catCode = row.find('th:nth-child(1)').text();
      const catName = row.find('td:nth-child(2)').text();

      $('#editCatCode').val(catCode);
      $('#editCatName').val(catName);

      window.$('#editItemModal').modal('show');
  }
  async function saveChanges() {
    const entity = {
      CatID: $('#editCatCode').val(),
      CatName: $('#editCatName').val(),
    }
    const data = await fetch('https://localhost:3000/api/categories/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(entity),
    })
    const res = await data.json();
    if (res.success) {
      setAllCategories(prevCategories => {
        const updatedCategories = [...prevCategories];
        updatedCategories.forEach(cat => {
          if (cat.CatID == entity.CatID) {
            cat.CatName = entity.CatName
          }
        })
        return updatedCategories;
      })
    }

    window.$('#editItemModal').modal('hide');
  }
  function cancelEdit() {
      window.$('#editItemModal').modal('hide');
  }

  return (
    <>
      <main className="main-container">
          <div className="main-title">
            <h2>CATEGORIES</h2>
          </div>

          <div className="table-cards">
            <div className="card-body">
                <div className="row mb-3">
                    <div className="search container-fluid col-sm-5 col-6 offset-sm-0 offset-0">
                    <form className="d-flex search-item" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                        <button className="btn btn-primary" type="submit">Search</button>
                    </form>
                    </div>
                    <div className="btn-add-item d-flex col-sm-4 col-4">
                  <button type="button" className="btn btn-primary ms-auto" onClick = {()=>openAddItemForm()}>
                        <i className="fa-solid fa-circle-plus"></i>
                        Add Category
                    </button>
                    </div>
                </div>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">Category Name</th>
                      <th scope="col" className="text-center" >Option</th>
                    </tr>
                  </thead>
                  <tbody>
                  { isError == false && isLoading == false && allCategories &&
                  allCategories.map(cat => {
                    return <tr key={cat.CatID} >
                              <th scope="row">{cat.CatID }</th>
                              <td>{cat.CatName}</td>
                              <td className="text-center">
                              <button className="btn btn-primary btn-sm me-2" onClick={(event)=>editRow(event.target)}>
                                  <i className="fa fa-pencil"></i>
                              </button>
                              <button href="" className="btn btn-danger btn-sm" onClick={(event)=>deleteRow(event.target, cat.CatID)}>
                                <i className="fa fa-trash"></i>
                              </button>
                              </td>
                            </tr>
                  })}
                  {
                  isLoading == true && <th colSpan={5} style={{textAlign: 'center'}}>
                                          <div>  
                                          <div class="spinner-border" role="status">
                                            <span class="sr-only">Loading...</span>
                                          </div>
                                          </div>
                                      </th>
                  }
                  </tbody>
                </table>
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
      </main>

      {/* <!-- Modal for Add Item --> */}
      <div className="modal fade" id="addItemModal" tabIndex="-1" role="dialog" aria-labelledby="addItemModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <form className="modal-content" method="post" action="/">
            <div className="modal-header">
              <h5 className="modal-title" id="addItemModalLabel">Add Category</h5>
                          <button type="button" className="btn btn-danger btn-sm" data-dismiss="modal" aria-label="Close" onClick={() => cancelAddItemForm()}>
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <div className="modal-body">
              <label for="catName">Category name:</label>
              <input type="text" id="catName" name="catName" className="form-control"/>
            </div>
            <div className="modal-footer">
                          <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => cancelAddItemForm()}>Cancel</button>
                          <button type="button" className="btn btn-primary" onClick={() => submitAddItemForm()}>Add</button>
            </div>
          </form>
        </div>
      </div>
      
      {/* <!-- Modal for Edit Item --> */}
      <div className="modal fade" id="editItemModal" tabIndex="-1" role="dialog" aria-labelledby="editItemModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <form className="modal-content" method="post" action="/">
            <div className="modal-header">
              <h5 className="modal-title" id="editItemModalLabel">Edit Category</h5>
                          <button type="button" className="btn btn-danger btn-sm" data-dismiss="modal" aria-label="Close" onClick={() => cancelEdit()}>
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <div className="modal-body">
              <label for="catCode">Category number:</label>
              <input type="text" id="editCatCode" name="editCatCode" className="form-control" readOnly/>
      
              <label for="catName">Category name:</label>
              <input type="text" id="editCatName" name="editCatName" className="form-control"/>
            </div>
            <div className="modal-footer">
                          <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => cancelEdit()}>Cancel</button>
              <button type="button" className="btn btn-primary" onClick={() => { saveChanges() }}>Save</button>
            </div>
          </form>
        </div>
      </div>
    </>  
    );
};