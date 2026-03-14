import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ToursPage from './pages/ToursPage';
import TourDetailPage from './pages/TourDetailPage';

function App() {
    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/tours" element={<ToursPage/>}/>
                <Route path="/tours/:id" element={<TourDetailPage/>}/>
                <Route path="*" element={<Navigate to="/tours" replace/>}/>
            </Routes>
            <Footer/>
        </BrowserRouter>
    );
}

export default App;
