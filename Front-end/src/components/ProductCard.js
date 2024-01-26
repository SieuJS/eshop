import { NavLink } from "react-router-dom";

export default function ProductCard({ item }) {
    return (
        <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
            <div className="card product-item border-0 mb-4">
                <div className="card-header product-img overflow-hidden bg-transparent border p-0">
                    <NavLink to={"/products/detail/" + item.CatID}>
                        <div className="w-100 h-100" style={{maxHeight: "250px"}}>
                            <img className="w-100 object-fit-cover"src={item.Images} alt="product's image" />
                        </div>
                    </NavLink>
                </div>
                <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
                    <h6 className="text-truncate mb-3 mx-3">{item.ProName}</h6>
                    <div className="d-flex justify-content-center">
                        <h6>{item.Price}</h6><h6 className="text-muted ml-2"><del>{item.Price}</del></h6>
                    </div>
                </div>
                <div className="card-footer d-flex justify-content-between bg-light border">
                    <NavLink to={"/products/detail/" + item.CatID} className="btn btn-sm text-dark p-0"><i className="fas fa-eye text-primary mr-1"></i>View Detail</NavLink>
                    <NavLink to="/products/detail/" className="btn btn-sm text-dark p-0"><i className="fas fa-shopping-cart text-primary mr-1"></i>Add To Cart</NavLink>
                </div>
            </div>
        </div>
    );
}