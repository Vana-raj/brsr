import { Form, Input, Switch, Row, Col, message } from 'antd';
import './EmailForm.scss';
import CustomButton from '../../../component/buttons/CustomButton';
import { useEffect } from 'react';

interface EmailFormProps {
    tlsSwitch: boolean;
    setTlsSwitch: (value: boolean) => void;
}

interface FormValues {
    host: string;
    port: number;
    fromEmail: string;
    username: string;
    displayName: string;
    password: string;
    useTLS: boolean;
    useSSL: boolean;
    failSilently: boolean;
    primaryServer: boolean;
    timeout: number;
    companyId: string;
}
const EmailForm: React.FC<EmailFormProps> = ({ setTlsSwitch, tlsSwitch }) => {
    const [form] = Form.useForm<FormValues>();

    useEffect(() => {
        const savedValues = localStorage.getItem('emailFormValues');
        if (savedValues) {
            form.setFieldsValue(JSON.parse(savedValues));
        }
    }, [form]);

    const handleSubmit = (values: FormValues) => {
        localStorage.setItem('emailFormValues', JSON.stringify(values));
        message.success('Settings saved successfully!');
    };
    const handleSwitch = (e: any) => {
        setTlsSwitch(e)
    }
    return (
        <div className='email-main'>
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item className='label-name' label="Email Host" name="host">
                            <Input placeholder="smtp.example.com" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item className='label-name' label="Email Port" name="port">
                            <Input placeholder="587" type="number" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item className='label-name' label="Default From Email" name="fromEmail">
                            <Input placeholder="noreply@example.com" type="email" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item className='label-name' label="Email Host Username" name="username">
                            <Input placeholder="username" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item className='label-name' label="Display Name" name="displayName">
                            <Input placeholder="Company Name" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item className='label-name' label="Email Authentication Password" name="password">
                            <Input.Password placeholder="••••••••" />
                        </Form.Item>
                    </Col>
                </Row>

                <div>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Use TLS" name="useTLS" valuePropName="checked">
                                <Switch onChange={(e) => handleSwitch(e)} defaultChecked={tlsSwitch} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Use SSL" name="useSSL" valuePropName="checked">
                                <Switch />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Fail Silently" name="failSilently" valuePropName="checked">
                                <Switch />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Primary Mail Server" name="primaryServer" valuePropName="checked">
                                <Switch />
                            </Form.Item>
                        </Col>
                    </Row>
                </div>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item className='label-name' label="Email Send Timeout (seconds)" name="timeout">
                            <Input placeholder="30" type="number" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item className='label-name' label="Company ID" name="companyId">
                            <Input placeholder="COMP-12345" />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item>
                    <CustomButton
                        className='cus-button'
                        label="Save"
                        htmlType="submit"
                    />
                </Form.Item>
            </Form>
        </div>
    );
};

export default EmailForm;