import { Outlet } from 'react-router'
import '../styles/index.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function TiendaLayout() {
    return (
        <>
            <Navbar />
            <main className="container">
                <Outlet />
            </main>
            <Footer />
        </>
    )
}

export default TiendaLayout