import { Button, Input, Modal } from 'antd'
import { observer } from 'mobx-react-lite'
import { FC, useState } from 'react'
import auth from '../../store/auth'
import s from './ProfileInfo.module.css'

const ProfileInfo: FC = observer((props) => {
    const [username, setUsername] = useState<string | null>(null)
    const [email, setEmail] = useState<string | null>(null)
    const [password, setPassword] = useState<string | null>(null)
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
    const showModal = () => setIsModalVisible(true)
    const handleOk = () => {
        auth.updateUser(username, email, password)
        setIsModalVisible(false)
    }
    const handleCancel = () => setIsModalVisible(false)
    return (
        <div className={s.page}>
            <div className={s.title}>
                Profile info
            </div>
            <div className={s.info}>
                <p>Username: {auth.username}</p>
                <p>Email: {auth.email}</p>
            </div>
            <div className={s.settings}>
                <Button onClick={showModal}>
                    Open profile settings
                </Button>
                <Modal title="Profile settings" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} className={s.modal}>
                    <div className={s.modalInput}>
                        <p>Change username: </p>
                        <Input placeholder="username" value={username ?? ""} onChange={e => setUsername(e.target.value)}></Input>
                    </div>
                    <div className={s.modalInput}>
                        <p>Change email: </p>
                        <Input placeholder="email" value={email ?? ""} onChange={e => setEmail(e.target.value)}></Input>
                    </div>
                    <div className={s.modalInput}>
                        <p>Change password: </p>
                        <Input placeholder="password" value={password ?? ""} onChange={e => setPassword(e.target.value)}></Input>
                    </div>
                </Modal>
            </div>
        </div>
    )
})

export default ProfileInfo