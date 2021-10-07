/* eslint-disable no-template-curly-in-string */
import { FC, useState } from "react"
import { Form, Input, Button } from 'antd'
import s from './RegisterPage.module.css'
import auth from "../../store/auth"

const RegisterPage: FC = () => {

    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [email, setEmail] = useState<string>('')

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    }
    const validateMessages = {
        required: '${label} is required!',
        types: {
          email: '${label} is not a valid email!',
          number: '${label} is not a valid number!',
        },
      };

    return (
        <div className={s.page}>
            <div className={s.title}>
                <p>Registration Page</p>
            </div>
            <Form {...layout} name="nest-messages" validateMessages={validateMessages}>
                <Form.Item name={['user', 'username']} label="Username" rules={[{ required: true }]}>
                    <Input value={username} onChange={e => setUsername(e.target.value)}/>
                </Form.Item>
                <Form.Item name={['user', 'email']} label="Email" rules={[{ type: 'email', required:true }]}>
                    <Input value={email} onChange={e => setEmail(e.target.value)}/>
                </Form.Item>
                <Form.Item name={['user', 'password']} label="Password" rules={[{ required: true, message: 'Please input your password!' }]}>
                    <Input.Password value={password} onChange={e => setPassword(e.target.value)} />
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Button type="primary" onClick={()=>auth.register(username, email, password)}>
                        Register
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default RegisterPage