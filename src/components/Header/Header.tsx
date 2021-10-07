import { FC } from "react";
import s from './Header.module.css'
import { HomeOutlined, SearchOutlined, TeamOutlined, UserOutlined, LoginOutlined, LogoutOutlined } from '@ant-design/icons'
import { NavLink } from 'react-router-dom'
import auth from "../../store/auth";
import { observer } from "mobx-react-lite";

const Header: FC = observer(() => {
    const loginEl = auth.isAuth 
    ? <button onClick={() => auth.logout()} style={{border:"none", background: "none", fontSize:"2.5rem", color:"white"}}><LogoutOutlined /></button>
    : <div>
    <NavLink to={'/login'}>
    <LoginOutlined />
    </NavLink>
</div>
    return (
        <div className={s.header}>
            <div>
                <NavLink to={'/'}>
                    <HomeOutlined style={{ "fontSize": "3rem" }} />
                </NavLink>
            </div>
            <div className={s.title}>
                Gallery
            </div>
            <div>
                <NavLink to={'/search'}>
                    <SearchOutlined />
                </NavLink>
            </div>
            <div>
            <NavLink to={'/users'}>
            <TeamOutlined />
                </NavLink>
            </div>
            <div>
            <NavLink to={'/profile'}>
            <UserOutlined />
                </NavLink>
            </div>
            {loginEl}
        </div>
    )
})

export default Header