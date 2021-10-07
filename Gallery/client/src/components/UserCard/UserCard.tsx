import { FC } from "react"
import { useHistory } from "react-router"
import s from "./UserCard.module.css"

interface IProps {
    id: number
    username: string
}

const UserCard:FC<IProps> = (props) => {
    const history = useHistory()
    return(
        <div className={s.user} onClick={() => {
            history.push(`/profile/${props.id}`)
        }}>
            <img src="https://cdn-icons-png.flaticon.com/128/727/727399.png" alt="" />
            {props.username}
        </div>
    )
}
export default UserCard