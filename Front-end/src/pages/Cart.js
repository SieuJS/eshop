import Topbar from "../components/Topbar.js";
import Navbar from "../components/Navbar.js";
import PageHeader from "../components/PageHeader.js";
import CartPage from "../components/CartPage.js"

export default function Cart(props) {
    return (
        <>
            <Topbar />
            <Navbar />
            <PageHeader title={"Shop Cart"} />
            <CartPage />
        </>
    )
}