import Topbar from "../components/Topbar.js";
import Navbar from "../components/Navbar.js";
import PageHeader from "../components/PageHeader.js";
import Checkout from "../components/Checkout.js"

export default function Cart(props) {
    return (
        <>
            <Topbar />
            <Navbar />
            <PageHeader />
            <Checkout />
        </>
    )
}