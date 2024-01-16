import { NavLink } from "react-router-dom";

export default function CatCard({category}) {
    return (
        <div className="col-lg-4 col-md-6 pb-1">
            <div className="cat-item d-flex flex-column border mb-4" style={{ padding: "30px" }}>
                <p className="text-right">{category.productQuantity} products</p>
                <NavLink to={"/category/" + category.id} className="cat-img position-relative overflow-hidden mb-3">
                    <img className="img-fluid" src={category.image} alt="category image" />
                </NavLink>
                <h5 className="font-weight-semi-bold m-0 text-center">{category.name}</h5>
            </div>
        </div>
    );
}