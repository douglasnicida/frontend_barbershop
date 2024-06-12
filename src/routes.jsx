import { BrowserRouter, Route, Routes } from "react-router-dom";

import App from './App';
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import BarbershopDetails from "./pages/barbershop_details/BarbershopDetails";
import UserAppointmentList from "./pages/user_appointment_list/UserAppointmentList";
import BarberAppointmentList from "./pages/barbershop_appointment_list/BarberAppointmentList";
import UserBarbershopList from "./pages/user_barbershop_list/UserBarbershopList";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

 export default function AppRoutes() {
    return (
        <BrowserRouter>
            <ToastContainer />
            <Header />
            <Routes>
                <Route path="/" Component={App} />
                <Route path="/barbearia/:id" Component={BarbershopDetails} />
                <Route path="/meus_agendamentos" Component={UserAppointmentList} />
                <Route path="/minhas_barbearias" Component={UserBarbershopList} />
                <Route path="/minhas_barbearias/barbearia" Component={BarberAppointmentList} />
            </Routes>
            <Footer />
        </BrowserRouter>
    )
 }