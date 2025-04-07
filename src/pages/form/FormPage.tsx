import React, { useState } from "react";
import { Form, Input, Upload, message, Modal } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { RcFile } from "antd/lib/upload";
import "./FormPage.scss";
import CustomButton from "../../component/buttons/CustomButton";
import { postData, postDatas } from "../../features/action/SupplierAction";
import Loader from "../../component/loader/Loader";

const CompanyDetailsForm = () => {
    const [formData, setFormData] = useState({
        companyName: "",
        address: "",
        contactNumber: "",
        emailId: "",
        website: "",
    });
    const [tempData, setTempData] = useState<typeof formData | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

    const handleFileUpload = async (file: RcFile) => {
        const uploadData = new FormData();
        uploadData.append("file", file);

        try {
            const result = await postData(uploadData, setLoading);
            setTempData({
                companyName: result.company_name || "",
                address: result.address || "",
                contactNumber: result.contact_number || "",
                emailId: result.email || "",
                website: result.website || "",
            });

            setIsModalVisible(true);
            message.success(`File uploaded successfully.`);
        } catch (error) {
            console.error("Error during file upload:", error);
            message.error("File upload failed. Please try again.");
        }

        return false;
    };

    const [text, setText] = useState<string | any>('');

    const handleSubmit = async () => {
        if (!text.trim()) {
            alert("Please enter text before submitting.");
            return;
        }

        try {
            const response = await postDatas(text, setLoading);
            console.log("API Response:", response);
        } catch (error) {
            console.error("API Error:", error);
        }
    }

    const handleConfirm = () => {
        if (tempData) {
            setFormData(tempData);
        }
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setTempData(null);
        setIsModalVisible(false);
    };

    return (
        <div className="company-details-form">
            {!loading ? (
                <Form layout="vertical">
                    <Form.Item className="upload-file" label="Upload File">
                        <Upload
                            beforeUpload={handleFileUpload}
                            showUploadList={false}
                            accept=".pdf"
                        >
                            <CustomButton
                                icon={<UploadOutlined />}
                                label="Click to Upload"
                                type="primary"
                                className="upload-button"
                            />
                        </Upload>
                    </Form.Item>

                    <Form.Item className="form-item" label="Company Name">
                        <Input.TextArea
                            className="text-area"
                            value={formData.companyName}
                            readOnly
                            autoSize={{ minRows: 1 }}
                        />
                    </Form.Item>

                    <Form.Item className="form-item" label="Address">
                        <Input.TextArea
                            className="text-area"
                            value={formData.address}
                            readOnly
                            autoSize={{ minRows: 2 }}
                        />
                    </Form.Item>

                    <Form.Item className="form-item" label="Contact Number">
                        <Input.TextArea
                            className="text-area"
                            value={formData.contactNumber}
                            readOnly
                            autoSize={{ minRows: 1 }}
                        />
                    </Form.Item>

                    <Form.Item className="form-item" label="Email ID">
                        <Input.TextArea
                            className="text-area"
                            value={formData.emailId}
                            readOnly
                            autoSize={{ minRows: 1 }}
                        />
                    </Form.Item>

                    <Form.Item className="form-item" label="Website">
                        <Input.TextArea
                            className="text-area"
                            value={formData.website}
                            readOnly
                            autoSize={{ minRows: 1 }}
                        />
                    </Form.Item>
                </Form>
            ) : (
                <Loader />
            )}

            <Modal
                title="Confirm Data"
                visible={isModalVisible}
                onOk={handleConfirm}
                onCancel={handleCancel}
                okText="Confirm"
                cancelText="Cancel"
                centered
                className="custom-modal"
            >
                <div className="model-contents">Do you want to update the form with the uploaded file data?</div>
            </Modal>
        </div>
    );
};

export default CompanyDetailsForm;
