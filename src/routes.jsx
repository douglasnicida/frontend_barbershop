import { BrowserRouter, Route, Routes } from "react-router-dom";

import App from './App';
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import BarbershopDetails from "./pages/barbershop_details/BarbershopDetails";

 export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" Component={App} />
                <Route path="/barbearia/:id" Component={BarbershopDetails} />
            </Routes>
            <Footer />
        </BrowserRouter>
    )
 }