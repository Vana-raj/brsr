import React from "react";
import { Input, Switch, Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "./CreateCompany.scss";
import SelectDropDown from "../../../component/select/SelectDropDown";
import { data } from "../../../utils/Options";

interface CompanyProps {
    formData: any;
    setFormData: any;
    handleSubmit: any;
}

const CreateCompanyForm: React.FC<CompanyProps> = ({ formData, setFormData, handleSubmit }) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSwitchChange = (checked: boolean) => {
        setFormData({
            ...formData,
            hq: checked,
        });
    };

    const handleSelectChange = (value: string, field: string) => {
        setFormData({
            ...formData,
            [field]: value,
        });
    };

    const handleFileChange = (info: any) => {
        if (info.file.status === "done") {
            setFormData({
                ...formData,
                icon: info.file.originFileObj,
            });
        }
    };

    return (
        <div className="create-company-form">
            <form onSubmit={handleSubmit}>
                {/* Example: Two Input Fields in One Row */}
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="company">Company</label>
                        <Input
                            name="company"
                            id="company"
                            value={formData.company}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Address</label>
                        <Input
                            name="address"
                            id="address"
                            value={formData.address}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label>HQ</label>
                    <Switch checked={formData.hq} onChange={handleSwitchChange} />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="country">Country</label>
                        <SelectDropDown
                            value={formData.country}
                            options={data?.countries}
                            onChange={(value) => handleSelectChange(value, "country")}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="state">State</label>
                        <SelectDropDown
                            className="state"
                            value={formData.state}
                            onChange={(value) => handleSelectChange(value, "state")}
                            options={data.states}
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="city">City</label>
                        <SelectDropDown
                            className="city"
                            value={formData.city}
                            onChange={(value) => handleSelectChange(value, "city")}
                            options={data.cities}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="zip">Zip</label>
                        <Input
                            name="zip"
                            id="zip"
                            value={formData.zip}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label>Icon</label>
                    <Upload
                        name="icon"
                        listType="text"
                        beforeUpload={() => false}
                        onChange={handleFileChange}
                    >
                        <Button icon={<UploadOutlined />}>Choose file</Button>
                    </Upload>
                </div>
            </form>
        </div>
    );
};

export default CreateCompanyForm;