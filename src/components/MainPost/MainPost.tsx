import { Modal } from "antd"
import { FC, useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import users from "../../store/users"
import s from './MainPost.module.css'

interface Props {
    pic: string
    id: number
    userId: number
    description: string
    author: string
}

const MainPost: FC<Props> = ({ pic, id, userId, description, author }) => {
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
    useEffect(()=>{
        if(userId){
            users.getOneUser(userId)
            console.log(users.currentUser)
        }
    },[])
    const handleOk = () => setIsModalVisible(false)
    const handleCancel = () => setIsModalVisible(false)
    const showModal = () => setIsModalVisible(true)
    return (
        <div>
            <img src={pic} alt="" onClick={showModal} className={s.pic}/>
            <Modal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} className={s.modal}>
                <div className={s.modalPic}>
                    <img src={pic} alt="" />
                </div>
                <div className={s.info}>
                    <NavLink to={`/profile/${userId}`}><p>{author}: </p></NavLink>
                    <p>{description}</p>
                </div>
            </Modal>
        </div>
    )
}

export default MainPost