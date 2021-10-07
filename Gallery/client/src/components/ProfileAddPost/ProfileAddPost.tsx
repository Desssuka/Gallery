import React, { FC, useState } from 'react'
import s from './ProfileAddPost.module.css'
// import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
// import {Upload, message} from 'antd'
import { Input, Button } from 'antd'
import { UploadOutlined, SendOutlined, ConsoleSqlOutlined } from '@ant-design/icons'
import posts from '../../store/posts'

const ProfileAddPosts: FC = (props) => {
    const [selectedFile, setSelectedFile] = useState<any>(null)
    const [description, setDescription] = useState<string>('')
    const [error, setError] = useState<string | null>(null)
    const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setError(null);
        if (!event.target.files) {
            console.log('not files');
            return;
        }
        console.log('ok');
        setSelectedFile(event.target.files[0]);
        event.target.value = '';
    }
    const onFileUpload = () => {
        if (selectedFile.size > 1024 * 1024 * 30) {
            setError('Файл больше 30МБ')
            return
        }

        const isJpgOrPng = selectedFile.type === 'image/jpeg' || selectedFile.type === 'image/png';
        if (!isJpgOrPng) {
            setError('You can only upload JPG/PNG file!')
            return
        }
        posts.createPost(description, selectedFile);
        setSelectedFile(null)
        setDescription('')
    }
    return (
        <div className={s.page}>
            <div className={s.title}>
                Profile posts
            </div>
            <div className={s.input}>
                <div>
                    <Input type="text" value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" />
                </div>
                <div className={s.inputWrapper}>
                    <UploadOutlined />
                    <input id="upload-file" type="file" onChange={onFileChange} />
                </div>
                <div>
                    <Button onClick={onFileUpload} icon={<SendOutlined />}>
                    </Button>
                </div>
            </div>
            <div>{selectedFile && !error
                ? `File name - ${selectedFile.name}, file size - ${Math.round(selectedFile.size / 1024 / 1024) === 0 
                    ? '1' 
                    : Math.round(selectedFile.size / 1024 / 1024)}MB`
                : null}</div>
            <div className={s.error}>{error ? error : null}</div>
            <div className={s.posts}></div>
        </div>
    )
}

export default ProfileAddPosts