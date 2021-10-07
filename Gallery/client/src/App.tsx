import { FC, useEffect } from 'react'
import { Redirect } from 'react-router'
import { Switch, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage/LoginPage'
import MainPage from './pages/MainPage/MainPage'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import SearchPage from './pages/SearchPage/SearchPage'
import UsersPage from './pages/UsersPage/UsersPage'
import 'antd/dist/antd.css'
import { observer } from 'mobx-react-lite'
import auth from './store/auth'
import Header from "./components/Header/Header"
import RegisterPage from './pages/RegisterPage/RegisterPage'

const App: FC = observer(() => {
    useEffect(() => {
        auth.auth()
    }, [])
    const router = auth.isAuth
        ? <Switch>
            <Route exact path="/"
                render={() => <MainPage />} />
            <Route path="/profile/:id?"
                render={() => <ProfilePage />} />
            <Route path="/search"
                render={() => <SearchPage />} />
            <Route path="/users"
                render={() => <UsersPage />} />
            <Redirect to={"/"} />
        </Switch>
        : <Switch>
            <Route exact path="/login" 
                render={() => <LoginPage />} />
            <Route path="/register"
                render={() => <RegisterPage />} />
            <Redirect to={"/login"} />
        </Switch>


    return (
        <>
            <Header />
            {router}
        </>
    )
})

export default App