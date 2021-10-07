import { FC, useEffect } from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import s from './ProfilePage.module.css'
import ProfileInfo from '../../components/ProfileInfo/ProfileInfo'
import ProfileAddPosts from '../../components/ProfileAddPost/ProfileAddPost'
import ProfilePost from '../../components/ProfilePost/ProfilePost'
import posts from '../../store/posts'
import auth from '../../store/auth'
import { observer } from 'mobx-react-lite'
import users from '../../store/users'

type PathParamType = {
    id: string
}
type PropsType = RouteComponentProps<PathParamType>

const ProfilePage: FC<PropsType> = observer((props) => {
    const id = parseInt(props.match.params.id) || auth.id
    useEffect(() => {
        posts.getUserPosts(id)
        users.getOneUser(id)
    }, [])

    const postsEl = posts.posts.map((v) => <ProfilePost description={v.description} 
                                            pic={`http://localhost:8080/${v.img}`}
                                            id={v.id} author={v.author} userId={v.userId}
                                            />)
    return (
        <div className={s.page}>
            <div className={s.title}>
                Profile {id}
            </div>
            <div className={s.content}>
                {(!props.match.params.id ? <div className={s.info}>
                    <ProfileInfo />
                    <ProfileAddPosts />
                </div> : null)}
                
                <div className={s.posts}>
                    <div>
                        <p className={s.titlePosts}>Posts</p>
                    </div>
                    <div className={s.grid}>
                        {postsEl}
                    </div>
                </div>
            </div>
        </div>
    )
})

export default withRouter(ProfilePage)