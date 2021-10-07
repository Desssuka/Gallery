import {FC, useEffect, useState, useCallback} from 'react'
import { Input } from 'antd'
import s from "./SearchPage.module.css"
import debounce from 'lodash/debounce'
import posts from '../../store/posts'
import ProfilePost from '../../components/ProfilePost/ProfilePost'
import { observer } from 'mobx-react-lite'

const SearchPage:FC = observer(() => {
    const [search, setSearch] = useState('')
    const [filtered, setFiltered] = useState(false)
    const searchForPost = useCallback(debounce(() => {
        posts.filterPosts(search)
        setFiltered(true)
    },1000),[search])

    useEffect(() => {
        posts.getSearchPosts()
    }, [])

    useEffect(() => {
        if(search.length > 3){
            searchForPost()
        } else {
            setFiltered(false)
        }
    }, [search])

    const postsEl = (!filtered 
        ? posts.searchPosts.map(v => <ProfilePost userId={v.userId} description={v.description} author={v.author} id={v.id} pic={`http://localhost:8080/${v.img}`}/>) 
        : posts.filteredPosts.map(v => <ProfilePost userId={v.userId} description={v.description} author={v.author} id={v.id} pic={`http://localhost:8080/${v.img}`}/>))

    return (
        <div className={s.page}>
            <div>
                <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search for photo" size="large" style={{marginTop:"2rem"}}/>
            </div>
            <div className={s.posts}>
                {postsEl}
            </div>
        </div>
    )
})

export default SearchPage