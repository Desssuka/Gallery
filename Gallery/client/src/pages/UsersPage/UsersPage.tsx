import { FC, useCallback, useEffect, useState } from 'react'
import { Input } from 'antd'
import s from './UsersPage.module.css'
import users from '../../store/users'
import UserCard from '../../components/UserCard/UserCard'
import { observer } from 'mobx-react-lite'
import { debounce } from 'lodash'

const UsersPage: FC = observer(() => {
    const [search, setSearch] = useState('')
    const [filtered, setFiltered] = useState(false)
    useEffect(() => {
        users.getUsers()
    }, [])

    const searchForUser = useCallback(debounce(() => {
        users.searchUsers(search)
        setFiltered(true)
        console.log(filtered)
    },1000),[search])

    const userEl = (!filtered 
        ? users.users.map(v => <UserCard id={v.id} username={v.username}/>) 
        : users.filteredUsers.map(v => <UserCard id={v.id} username={v.username}/>))
    
    useEffect(() => {
        if(search.length > 3){
            searchForUser()
        } else {
            setFiltered(false)
        }
    }, [search])

    
    return (
        <div className={s.page}>
            <div>
                <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search for user" size="large" style={{ marginTop: "2rem" }} />
            </div>
            <div className={s.users}>
                {userEl}
            </div>
        </div>
    )
})

export default UsersPage