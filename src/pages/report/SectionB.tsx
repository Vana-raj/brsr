import React, { useEffect, useState } from "react";
import { Card, Input, List, Modal, Progress, Space, Table, Tooltip, Upload, message } from "antd";
import { Radio } from "antd";
import { ArrowLeftOutlined, BoldOutlined, CheckOutlined, CopyTwoTone, DeleteOutlined, FileAddTwoTone } from "@ant-design/icons";
import CustomButton from "../../component/buttons/CustomButton";
import { allCategories2 } from "../../utils/Options2";
import { primaryColor } from '../../style/ColorCode';
import SelectDropDown from "../../component/select/SelectDropDown";
import TableInput from "../../component/InputTable/InputTable";
import "../questionnaire/Questionnaire.scss"
import Loader from "../../component/loader/Loader";


const { TextArea } = Input;

interface ApiQuestion {
    questionNo: string;
    question: string;
    questionOptions: Array<{ option: string; value: any }>;
    questionAnswer: string | null;
}

interface ApiPart {
    partNo: string;
    subtitle: string;
    questions: ApiQuestion[];
}

interface ApiSection {
    title: string;
    section: string;
    parts: ApiPart[];
}

interface ApiResponse {
    data: ApiSection[];
}

const SectionB: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState<string>("details");
    const [showQuestions, setShowQuestions] = useState<boolean>(false);
    const [answers, setAnswers] = useState<{ [key: string]: any }>({});
    const [uploadedFiles, setUploadedFiles] = useState<{ [key: string]: { name: string; size: string } | null }>({});
    const [currentSectionIndex, setCurrentSectionIndex] = useState<number>(0);
    const [isViewMode, setIsViewMode] = useState(false);
    const [singleSectionTextArea, setsingleSectionTextArea] = useState<any>();
    const [trust, setTrust] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
    const [isUnsavedModalVisible, setIsUnsavedModalVisible] = useState(false);
    const [pendingAction, setPendingAction] = useState<() => void | null>();
    const [submittedAnswers, setSubmittedAnswers] = useState<Record<string, boolean>>({});


    const handleRowClick = (record: any, sectionIndex: number) => {
        setShowQuestions(true);
        setCurrentSectionIndex(sectionIndex);
    };

    const confirmNavigation = (action: () => void) => {
        if (hasUnsavedChanges && showQuestions) {
            setPendingAction(() => action);
            setIsUnsavedModalVisible(true);
        } else {
            action();
        }
    };


    const handleBackToCategories = () => {
        confirmNavigation(() => {
            const savedAnswers = localStorage.getItem('answeredQuestions');
            if (savedAnswers) {
                setAnswers(JSON.parse(savedAnswers));
            }
            setActiveCategory(activeCategory || "");
            setShowQuestions(false);
            setCurrentSectionIndex(0);
            handleClearUnsubmittedAnswers()
        });

    };

    const handleNextSection = () => {
        setCurrentSectionIndex((prev) => Math.min(prev + 1, allCategories2[0].questions.length - 1));
    };

    const handlePreviousSection = () => {
        setCurrentSectionIndex((prev) => Math.max(prev - 1, 0));
    };

    const handleInputChange = (section: string, key: string, value: any, questionIndex: number) => {
        const questionKey = `${section}-${key}-${questionIndex}`;
        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionKey]: value,
        }));

        setHasUnsavedChanges(answers[questionKey] === "" ? false : true);
    };



    const handleFileUpload = async (info: any, questionKey: string) => {
        const { file } = info;

        if (!file || file.status === "uploading") return;
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append('file', file.originFileObj || file);
            formData.append('questionKey', questionKey);

            const response = await fetch('http://192.168.2.75:8000/extract/', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`Upload failed with status ${response.status}`);
            }

            let responseData: ApiResponse;
            try {
                responseData = await response.json();
            } catch (jsonError) {
                throw new Error("Failed to parse JSON response.");
            }

            // Check if the expected structure exists
            if (!responseData?.data || !Array.isArray(responseData.data)) {
                throw new Error("Invalid response structure received from the server.");
            }

            const fileSize = `${(file.size / 1024).toFixed(2)} KB`;

            setUploadedFiles(prev => ({
                ...prev,
                [questionKey]: { name: file.name, size: fileSize },
            }));

            const newAnswers = transformApiResponseToAnswers(responseData);

            setAnswers(prev => {
                const updated = { ...prev };
                Object.entries(newAnswers).forEach(([key, value]) => {
                    if (value !== undefined && value !== null && value !== "") {
                        updated[key] = value;
                    }
                });
                return updated;
            });

            localStorage.setItem('answeredQuestions', JSON.stringify({
                ...answers,
                ...newAnswers
            }));

            message.success(`${file.name} processed successfully!`);
        } catch (error) {
            console.error('Upload error:', error);
            message.error(`Upload failed: ${error instanceof Error ? error.message : String(error)}`);
        } finally {
            setLoading(false);
        }
    };

    type SectionBMap = {
        one: { category: 'policy_management'; startIndex: number };
        two: { category: 'governance_leadership'; startIndex: number };
    };

    const sectionPartMap: Record<string, Record<string, { category: string; startIndex: number }>> = {
        'section_b': {
            'one': { category: 'policy_management', startIndex: 0 },
            'two': { category: 'governance_leadership', startIndex: 0 }
        }
    };

    type SectionKey = keyof typeof sectionPartMap;
    type SectionBPartKey = keyof SectionBMap;
    const transformApiResponseToAnswers = (apiResponse: any) => {
        const answers: { [key: string]: any } = {};
        if (!apiResponse.data || !Array.isArray(apiResponse.data)) return answers;

        apiResponse.data.forEach((section: any) => {
            const sectionKey = section.section as SectionKey;

            if (sectionKey === 'section_b') {
                const partsMap = sectionPartMap.section_b;

                section.parts?.forEach((part: any) => {
                    const partKey = part.partNo.toLowerCase() as SectionBPartKey;
                    const partConfig = partsMap[partKey];
                    if (!partConfig || !part.questions) return;

                    const { category, startIndex } = partConfig;
                    const categoryConfig = allCategories2.find(c => c.key === category);

                    part.questions.forEach((question: any, qIndex: number) => {
                        const answer = question.questionAnswer;
                        if (!answer || answer === "Not provided in the text") return;

                        const questionIndex = startIndex + qIndex;
                        const sectionKey = categoryConfig?.questions[0]?.key || category;
                        const formKey = `${category}_${sectionKey}_${questionIndex}`;
                        answers[formKey] = answer;
                    });
                });
            }
        });

        return answers;
    };
    const handleRemoveFile = (questionKey: string) => {
        setUploadedFiles((prevFiles) => {
            const updatedFiles = { ...prevFiles };
            delete updatedFiles[questionKey];
            return updatedFiles;
        });

        message.success("File removed successfully.");
    };

    const handleCopyText = (text: string) => {
        if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
            navigator.clipboard.writeText(text)
                .then(() => {
                    message.success("Question text copied to clipboard!");
                })
                .catch((err) => {
                    console.error("Clipboard copy failed:", err);
                    message.error("Failed to copy text to clipboard.");
                });
        } else {
            const textArea = document.createElement("textarea");
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand("copy");
                message.success("Question text copied to clipboard!");
            } catch (err) {
                console.error("Fallback clipboard copy failed:", err);
                message.error("Failed to copy text to clipboard.");
            }
            document.body.removeChild(textArea);
        }
    };



    const hasNonEmptyValues = Object.values(answers).some(value => value !== "");

    const handleSubmitAll = (item: any) => {
        setTrust(item?.isTrusted);
        setSubmittedAnswers((prev) => ({
            ...prev,
            [item]: true,
        }));

        let anyAnswered = false;
        const currentCategory = allCategories2.find((cat) => cat.key === activeCategory);

        if (currentCategory) {
            const answeredData: any = [];

            currentCategory.questions.forEach((section: any) => {
                let answered = 0;
                const total = section.question.length;
                section.question.forEach((_: any, questionIndex: any) => {
                    const questionKey = `${activeCategory}-${section.key}-${questionIndex}`;
                    if (answers[questionKey]) {
                        answered += 1;
                        anyAnswered = true;
                    }
                });

                const questionsAnswer = `${answered}/${total}`;
                const percentComplete = total > 0 ? Math.round((answered / total) * 100) : 0;

                section.questionsAnswer = questionsAnswer;
                section.percentComplete = percentComplete;

                answeredData.push({
                    sectionKey: section.key,
                    questionsAnswer,
                    percentComplete,
                });
            });

            localStorage.setItem(`${activeCategory}-answeredData`, JSON.stringify(answeredData));

            if (!anyAnswered) {
                message.warning("Please answer at least one question before submitting.");
            } else {
                message.success("Submitted successfully!");
                setShowQuestions(false);
            }
        }
    };

    const loadAnsweredData = (categoryKey: string, questions: any[]) => {
        const storedData = localStorage.getItem(`${categoryKey}-answeredData`);
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            questions.forEach((section) => {
                const storedSection = parsedData.find((data: any) => data.sectionKey === section.key);
                if (storedSection) {
                    section.questionsAnswer = storedSection.questionsAnswer;
                    section.percentComplete = storedSection.percentComplete;
                }
            });
        }
    };

    const handleClearUnsubmittedAnswers = () => {
        setAnswers((prevAnswers) => {
            const updatedAnswers = { ...prevAnswers };
            Object.keys(updatedAnswers).forEach((key) => {
                if (!submittedAnswers[key]) {
                    const value = updatedAnswers[key];

                    if (typeof value === 'string') {
                        if (value.trim() === "") {
                            delete updatedAnswers[key];
                        }
                    } else if (Array.isArray(value)) {
                        if (value.length === 0) {
                            delete updatedAnswers[key];
                        }
                    } else {
                        if (!value) {
                            delete updatedAnswers[key];
                        }
                    }
                }
            });
            return updatedAnswers;
        });
    };

    const handleCategoryClick = (categoryKey: string) => {
        confirmNavigation(() => {

            const selectedCategory = allCategories2.find((cat) => cat.key === categoryKey);
            if (selectedCategory) {
                loadAnsweredData(categoryKey, selectedCategory.questions);
            }
            setActiveCategory(categoryKey);
            const savedAnswers = localStorage.getItem('answeredQuestions');

            if (savedAnswers) {
                setAnswers(JSON.parse(savedAnswers));
            }
            handleClearUnsubmittedAnswers()
        })
    };



    useEffect(() => {
        const savedAnswers: any = localStorage.getItem('answeredQuestions');
        if (savedAnswers) {
            setAnswers(JSON.parse(savedAnswers));
        }
    }, []);


    useEffect(() => {
        if (!trust) {
            setAnswers((prevAnswers) => {
                const updatedAnswers = { ...prevAnswers };
                Object.keys(updatedAnswers).forEach((key) => {
                    if (!submittedAnswers[key] && (!updatedAnswers[key] || updatedAnswers[key].trim() === "")) {
                        updatedAnswers[key] = "";
                    }
                });
                return updatedAnswers;
            });
        }
    }, [trust, submittedAnswers]);




    const renderQuestionInput = (
        section: string,
        key: string,
        question: {
            text: string; choices: string[] | null; isMandatory: boolean, type: string, columns: [], rows: [],
            parent?: boolean;
            isNone?: boolean;
        },
        questionIndex: number,
        questionsArray: any[],
        qusSection: string,
    ) => {

        const getQuestionNumber = () => {
            if (question.parent) {
                let parentCount = 0;
                for (let i = 0; i <= questionIndex; i++) {
                    if (questionsArray[i].parent) {
                        parentCount++;
                    }
                }
                return `${parentCount}.`;
            } else {
                let lastParentIndex = -1;
                for (let i = questionIndex - 1; i >= 0; i--) {
                    if (questionsArray[i].parent) {
                        lastParentIndex = i;
                        break;
                    }
                }

                if (lastParentIndex === -1) return `${questionIndex + 1}.`;

                const subQuestionIndex = questionIndex - lastParentIndex - 1;
                const alphabet = String.fromCharCode(97 + subQuestionIndex); // 97 = 'a'
                return `${alphabet}.`;
            }
        };

        const questionKey = `${section}-${key}-${questionIndex}`;
        const isFileUploaded = !!uploadedFiles[questionKey];
        const isAnswered = !!answers[questionKey];
        if (isViewMode && !isAnswered) {
            return null;
        }
        if (question?.type === 'table') {
            return (
                <div>
                    <div className="question-text">
                        <div>{qusSection}. {getQuestionNumber()} {question.text}

                            {question.isMandatory && <span className="mandatory-asterisk">*</span>}
                            {isAnswered && (
                                <Tooltip title="Answered">
                                    <CheckOutlined className="answered-icon" />
                                </Tooltip>

                            )}
                        </div>
                        <Tooltip title="Copy Question">
                            <button
                                className="copy-border"
                                onClick={() => handleCopyText(question?.text)}>
                                <CopyTwoTone
                                    className="copy-icon"
                                />
                            </button>
                        </Tooltip>
                    </div>
                    <div >
                        <TableInput
                            columns={question?.columns}
                            rows={question?.rows}
                            header={"S.No"}
                            value={answers[questionKey] || []}
                            onChange={(value: any) =>
                                handleInputChange(section, key, value, questionIndex)
                            }
                        />
                    </div>
                </div>
            );
        }
        return (
            <div>
                <div className="question-text">
                    <div>{qusSection}. {getQuestionNumber()} {question.text}
                        {question.isMandatory && <span className="mandatory-asterisk">*</span>}
                        {isAnswered && (
                            <Tooltip title="Answered">
                                <CheckOutlined className="answered-icon" />
                            </Tooltip>

                        )}
                    </div>
                    <Tooltip title="Copy Question">
                        <button
                            className="copy-border"
                            onClick={() => handleCopyText(question?.text)}>
                            <CopyTwoTone
                                className="copy-icon"
                            />
                        </button>
                    </Tooltip>
                </div>
                {question.isNone ? null : (
                    question.choices === null ? (
                        <div className="area-upload">
                            <TextArea
                                rows={3}
                                placeholder="Type your answer here"
                                size="small"
                                onChange={(e) => handleInputChange(section, key, e.target.value, questionIndex)}
                                value={answers[questionKey] || ""}
                            />
                        </div>
                    ) : question.choices.length > 4 ? (
                        <SelectDropDown
                            mode="multiple"
                            options={question.choices.map((choice) => ({
                                label: choice,
                                value: choice,
                            }))}
                            placeholder="Select options"
                            value={answers[`${section}-${key}-${questionIndex}`] || []}
                            onChange={(value) => handleInputChange(section, key, value, questionIndex)}
                        />
                    ) : (
                        <div className="question-options">
                            {question.choices.map((option, idx) => (
                                <label key={`${option}-${idx}`}>
                                    <Space direction="vertical">
                                        <Radio
                                            value={option}
                                            checked={answers[`${section}-${key}-${questionIndex}`] === option}
                                            onChange={() => handleInputChange(section, key, option, questionIndex)}
                                            className="radio-qbutton"
                                        >
                                            {option}
                                        </Radio>
                                    </Space>
                                </label>
                            ))}
                        </div>
                    )
                )}

            </div>
        );
    };

    const currentCategory = allCategories2.find((cat) => cat.key === activeCategory);
    const questions: any = currentCategory?.questions[currentSectionIndex];

    const countNonEmptyAnswers = () => {
        let nonEmptyCount = 0;
        if (currentCategory) {
            currentCategory.questions[currentSectionIndex]?.question.forEach((_, questionIndex) => {
                const questionKey = `${activeCategory}-${questions.key}-${questionIndex} `;
                if (answers[questionKey]) {
                    nonEmptyCount += 1;
                }
            });
        }

        return nonEmptyCount;
    };

    const totalTextAreasInSection = questions?.question.length || 0;

    useEffect(() => {
        setsingleSectionTextArea(totalTextAreasInSection);
    }, [totalTextAreasInSection, questions]);


    const progressPercent = singleSectionTextArea > 0
        ? Math.round((countNonEmptyAnswers() / singleSectionTextArea) * 100)
        : 0;
    return (
        <div className="questionnaire-main">
            {loading && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1000
                }}>
                    <Loader />
                </div>
            )}
            <div className="questionnaire-container">
                <div className="category-card">
                    <Card title={"Categories"} bordered>
                        <List
                            key={activeCategory}
                            dataSource={allCategories2}
                            renderItem={(category, id: number) => (
                                <List.Item
                                    key={category.key}
                                    onClick={() => handleCategoryClick(category.key)}
                                    className={`category-item ${activeCategory === category.key ? "active" : ""} `}
                                >
                                    {category.section}
                                </List.Item>
                            )}
                        />
                    </Card>
                </div>
                <div className="question-card">
                    <Card
                        title={
                            <div>
                                {questions?.quesSection}
                            </div>
                        }
                        extra={
                            <div style={{ textAlign: "center", display: "flex", gap: "10px", alignItems: 'center' }}>
                                <Tooltip title="Upload">
                                    <Upload
                                        showUploadList={false}
                                        customRequest={(options) => {
                                            const { onSuccess } = options;
                                            setTimeout(() => onSuccess?.("ok"), 0);
                                        }}
                                        onChange={(info) => handleFileUpload(info, 'section_b')}
                                    >
                                        <FileAddTwoTone className="upload-icon" />
                                    </Upload>
                                </Tooltip>
                                <Progress
                                    type="circle"
                                    percent={progressPercent}
                                    width={50}
                                    strokeColor={primaryColor}
                                    format={() => `${countNonEmptyAnswers()}/${singleSectionTextArea}`
                                    }
                                />

                            </div >
                        }
                        bordered
                    >
                        {
                            questions?.question.map((q: any, idx: any) => {
                                return (
                                    <div key={`${questions.key}-${idx}`}>
                                        {renderQuestionInput(activeCategory, questions.key, q, idx, questions.question, questions.section)}
                                    </div>
                                );
                            })
                        }

                        < div className="subbutton" >
                            <div className="common-submit-btn">
                                <CustomButton
                                    label="Submit Answers"
                                    type="primary"
                                    onClick={(item: any) => handleSubmitAll(item)}
                                />
                            </div>
                        </div >

                    </Card >
                </div >
                {/* )
                } */}
            </div >
            <Modal
                title="Unsaved Changes!!!"
                visible={isUnsavedModalVisible}
                onOk={() => {
                    setIsUnsavedModalVisible(false);
                    setHasUnsavedChanges(false);
                    if (pendingAction) pendingAction();
                }}
                onCancel={() => setIsUnsavedModalVisible(false)}
                okText="Yes"
                cancelText="No"
                centered
            >
                <div className="model-ques-content">Do You Want to Exit Without Saving?</div>
            </Modal>


        </div >

    );

};

export default SectionB;
