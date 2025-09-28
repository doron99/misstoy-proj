// const Router = ReactRouterDOM.BrowserRouter
// const Router = ReactRouterDOM.HashRouter
// const { Route, Routes } = ReactRouterDOM
// const { Provider } = ReactRedux

import './assets/style/main.css'
import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store.js'

import { AppHeader } from './cmps/AppHeader.jsx'
import { AppFooter } from './cmps/AppFooter.jsx'

import { HomePage } from './pages/HomePage.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
import { CarIndex } from './pages/CarIndex.jsx'
import { CarEdit } from './pages/CarEdit.jsx'
import { CarDetails } from './pages/CarDetails.jsx'
import { UserDetails } from './pages/UserDetails.jsx'
import { ToyIndex } from './pages/ToyIndex.jsx'


export default function App() {

    return (
        <Provider store={store}>
            <Router>
                <section className="app">
                    <AppHeader />
                    <main className='main-layout'>
                        <Routes>
                            <Route element={<HomePage />} path="/" />
                            <Route element={<AboutUs />} path="/about" />
                            <Route element={<CarIndex />} path="/car" />
                            <Route element={<CarEdit />} path="/car/edit/:carId?" />
                            <Route element={<CarDetails />} path="/car/:carId" />
                            <Route element={<UserDetails />} path="/user/:userId" />
                            <Route element={<ToyIndex />} path="/toy" />

                        </Routes>
                    </main>
                    <AppFooter />
                </section>
            </Router>
        </Provider>

    )
}


