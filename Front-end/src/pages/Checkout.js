import Topbar from "../components/Topbar.js";
import Navbar from "../components/Navbar.js";
import PageHeader from "../components/PageHeader.js";
import Checkout from "../components/Checkout.js"

export default function (props) {
    return (
        <>
            <Topbar />
            <Navbar />
            <PageHeader title={"Shop Checkout"}/>
            <Checkout />
        </>
    )
}