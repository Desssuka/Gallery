import { FC, useState } from 'react'
import s from './LoginPage.module.css'
import { Form, Input, Checkbox, Button } from 'antd'
import { useHistory } from 'react-router'
import auth from './../../store/auth'

const LoginPage: FC = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const history = useHistory()

    return (
        <div className={s.page}>
            <div>
                <p className={s.title}>Authorization page</p>
            </div>
                    <Form
                        className={s.card}
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        initialValues={{ remember: true }}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input value={email} onChange={e=> setEmail(e.target.value)} />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password value={password} onChange={e=> setPassword(e.target.value)}/>
                        </Form.Item>

                        <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" onClick={e => {
                                auth.login(email, password)
                            }}>
                                Log in
                            </Button>
                            <Button type="default" onClick={() => history.push('/register')}>
                                Register
                            </Button>
                        </Form.Item>
                    </Form>
        </div>
    )
}

export default LoginPage