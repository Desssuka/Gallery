import { FC, useEffect, useState } from 'react'
import MainPost from '../../components/MainPost/MainPost'
import s from './MainPage.module.css';
import { useWebPSupportCheck } from './../../hooks/useWebPSupportCheck'
import posts from '../../store/posts';
import { observer } from 'mobx-react-lite';
import users from '../../store/users';
import { Button } from 'antd';

const MainPage: FC = observer(() => {
    const supportsWebP = useWebPSupportCheck();
    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(1)
    useEffect(() => {
        posts.getAllPosts(limit,page)
    }, [page])

    const postEl = posts.mainPosts.map((v, i): JSX.Element => <MainPost id={v.id} description={v.description}
        pic={`http://localhost:8080/${v.img}`} userId={v.userId}
        author={v.author} />)

    return (
        <div className={s.page}>
            <div>
                {supportsWebP ? (
                    <span>WebP is supported!</span>
                ) : (
                    <span>WebP is not supported</span>
                )}
            </div>
            <div className={s.title}>
                Main page
            </div>
            <div className={s.pictures}>
                {postEl}
            </div>
            <div className={s.loadBtn}>
                <Button onClick={() => setPage(prev=> prev+1)}>Load More!</Button>
            </div>
        </div>
    )
})

export default MainPage