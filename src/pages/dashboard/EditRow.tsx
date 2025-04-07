import React, { useState } from 'react';
import InputField from '../../component/inputfield/CustomInputField';
import './EditRow.scss';
import { Form } from 'antd';

interface EditRowProps {
    singleDeleteData: {
        supplier: string;
        industry: string;
        category: string;
        riskScore: number;
        compliance: string;
        status: boolean;
    };
    form: any
}

const EditRow: React.FC<EditRowProps> = ({ singleDeleteData, form }) => {
    const [formData, setFormData] = useState({
        supplier: singleDeleteData?.supplier || '',
        industry: singleDeleteData?.industry || '',
        category: singleDeleteData?.category || '',
        riskScore: singleDeleteData?.riskScore || 0,
        compliance: singleDeleteData?.compliance || '',
        status: singleDeleteData?.status || false,
    });

    const handleInputChange = (field: string, value: string | number | boolean) => {
        setFormData({ ...formData, [field]: value });
    };

    return (
        <Form form={form} className="edit-modal">
            <div className="input-field">
                <label>Supplier Name:</label>
                <InputField
                    type="text"
                    value={formData.supplier}
                    onChange={(e: any) => handleInputChange('supplier', e.target.value)}
                />
            </div>
            <div className="input-field">
                <label>Industry:</label>
                <InputField
                    type="text"
                    value={formData.industry}
                    onChange={(e: any) => handleInputChange('industry', e.target.value)}
                />
            </div>
            <div className="input-field">
                <label>Category:</label>
                <InputField
                    type="text"
                    value={formData.category}
                    onChange={(e: any) => handleInputChange('category', e.target.value)}
                />
            </div>
            <div className="input-field">
                <label>Risk Score:</label>
                <InputField
                    type="number"
                    value={formData.riskScore}
                    onChange={(e: any) => handleInputChange('riskScore', Number(e.target.value))}
                />
            </div>
            <div className="radio-group">
                <label>Compliance:</label>
                <div className='radio-flex'>
                    <label>
                        <input
                            type="radio"
                            value="Compliant"
                            checked={formData.compliance === 'Compliant'}
                            onChange={() => handleInputChange('compliance', 'Compliant')}
                        />
                        Compliant
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="Non-Compliant"
                            checked={formData.compliance === 'Non-Compliant'}
                            onChange={() => handleInputChange('compliance', 'Non-Compliant')}
                        />
                        Non-Compliant
                    </label>
                </div>
            </div>
            <div className="radio-group status-group">
                <label>Status:</label>
                <div className='radio-flex'>
                    <label className="active-label">
                        <input
                            type="radio"
                            value="true"
                            checked={formData.status === true}
                            onChange={() => handleInputChange('status', true)}
                        />
                        Active
                    </label>
                    <label className="inactive-label">
                        <input
                            type="radio"
                            value="false"
                            checked={formData.status === false}
                            onChange={() => handleInputChange('status', false)}
                        />
                        In-Active
                    </label>
                </div>
            </div>
        </Form>
    );
};

export default EditRow;
