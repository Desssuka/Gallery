import { Button, Input, Modal } from "antd"
import { observer } from "mobx-react-lite"
import { FC, useState } from "react"
import { NavLink, RouteComponentProps, withRouter } from "react-router-dom"
import posts from "../../store/posts"
import s from './ProfilePost.module.css'

interface Props {
    pic: string
    description:string
    id:number
    author: string
    userId: number
}

type PathParamType = {
    id: string
}
type PropsType = RouteComponentProps<PathParamType> & Props


const ProfilePost:FC<PropsType> = observer((props) => {
    const id = props.match.params.id

    const [description, setDescription] = useState(props.description)
    const [isDescEdit, setIsDescEdit] = useState(false)
    const [isModalVisible, setIsModalVisible] = useState(false)
    const handleOk = () => setIsModalVisible(false)
    const handleCancel = () => {
        setIsModalVisible(false)
    }
    const showModal = () => setIsModalVisible(true)
    const deleteBtn = id ? null : <Button danger onClick={() => {
        setIsModalVisible(false)
        posts.deletePost(props.id)
    }}>DeletePost</Button>
    return (
        <div>
            <img src={props.pic} alt="" onClick={showModal} className={s.pic}/>
            <Modal visible={isModalVisible} onCancel={handleCancel} 
            className={s.modal} cancelText="Delete post" footer={[
                deleteBtn,
                <Button type="primary" onClick={handleOk}>Ok</Button>
            ]}>
                <div className={s.modalPic}>
                    <img src={props.pic} alt="" />
                </div>
                <div className={s.info}>
                    <NavLink to={`/profile/${props.userId}`}>
                    <p>{props.author}: </p>
                    </NavLink>
                    
                    {!isDescEdit 
                    ? <p className={s.description} onDoubleClick={() => setIsDescEdit(true)}>{description}</p> 
                    : <Input value={description} onChange={e => setDescription(e.target.value)} onBlur={() => setIsDescEdit(false)}/>}
                </div>
            </Modal>
        </div>
    )
})

export default withRouter(ProfilePost)