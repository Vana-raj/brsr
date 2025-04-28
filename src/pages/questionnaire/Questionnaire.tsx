import React, { useEffect, useState } from "react";
import { Radio } from "antd";
import { CheckOutlined, CopyTwoTone, FileAddTwoTone } from "@ant-design/icons";
import { Card, Input, List, Modal, Progress, Space, Tooltip, Upload, message } from "antd";
import CustomButton from "../../component/buttons/CustomButton";
import { allCategories } from "../../utils/Options";
import { primaryColor } from '../../style/ColorCode';
import SelectDropDown from "../../component/select/SelectDropDown";
import TableInput from "../../component/InputTable/InputTable";
import Loader from "../../component/loader/Loader";
import "./Questionnaire.scss";


const { TextArea } = Input;

interface Question {
    text: string;
    choices: string[] | null;
    isMandatory: boolean;
    type?: string;
    columns?: any[];
    rows?: any[];
    parent?: boolean;
    isNone?: boolean;
}
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

const Questionnaire: React.FC = () => {
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


    const findQuestionByKey = (formKey: string): Question | null => {
        const parts = formKey.split('_');
        if (parts.length < 3) return null;

        const [categoryKey, sectionKey, questionIndex] = parts;
        const category = allCategories.find(cat => cat.key === categoryKey);
        if (!category) return null;

        const section = (category.questions as Array<{ key: string, question: Question[] }>).find(
            (sec) => sec.key === sectionKey
        );
        if (!section || !Array.isArray(section.question)) return null;

        const index = parseInt(questionIndex);
        if (isNaN(index)) return null;

        return section.question[index] || null;
    };

    const confirmNavigation = (action: () => void) => {
        if (hasUnsavedChanges && showQuestions) {
            setPendingAction(() => action);
            setIsUnsavedModalVisible(true);
        } else {
            action();
        }
    };

    const handleInputChange = (section: string, key: string, value: any, questionIndex: number) => {
        const questionKey = generateQuestionKey(section, key, questionIndex);
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

            const response = await fetch('https://5729-125-17-238-190.ngrok-free.app/extract/', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) throw new Error(`Upload failed with status ${response.status}`);

            const responseData: ApiResponse = await response.json();
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

    const transformApiResponseToAnswers = (apiResponse: any) => {
        const answers: { [key: string]: any } = {};

        if (!apiResponse.data || !Array.isArray(apiResponse.data)) return answers;

        // Map API parts to form categories
        const sectionPartMap: Record<string, Record<string, string>> = {
            'section_a': {
                'one': 'details',
                'two': 'product_service',
                'three': 'operations',
                'four': 'employees',
                'five': 'holding',
                'six': 'csr_details',
                'seven': 'transparency'
            },
            'section_b': {
                'one': 'policy_management',
                'two': 'governance_leadership'
            }
        };

        apiResponse.data.forEach((section: any) => {
            const sectionKey = section.section; // 'section_a' or 'section_b'
            const partsMap = sectionPartMap[sectionKey] || {};

            section.parts?.forEach((part: any) => {
                const partNo = String(part.partNo).toLowerCase();
                const categoryKey = partsMap[partNo];

                if (!categoryKey || !part.questions) return;

                part.questions.forEach((question: any) => {
                    const answer = question.questionAnswer;
                    if (answer === null || answer === undefined) return;

                    // Generate question index from questionNo
                    const questionIndex = parseInt(question.questionNo.split('.')[0]) - 1;
                    const formKey = `${categoryKey}_${categoryKey}_${questionIndex}`;

                    // Find matching question in allCategories
                    const targetQuestion = allCategories
                        .find(c => c.key === categoryKey)
                        ?.questions?.[0] // Each category has one question group
                        ?.question?.[questionIndex];

                    if (!targetQuestion) return;

                    if (targetQuestion && 'type' in targetQuestion && targetQuestion.type === 'table') {
                        try {
                            answers[formKey] = typeof answer === 'string' ? JSON.parse(answer) : answer;
                        } catch {
                            answers[formKey] = [{ value: answer }];
                        }
                    }
                    else if (targetQuestion && 'choices' in targetQuestion && targetQuestion.choices) {
                        const cleanAnswer = String(answer).toLowerCase().trim();
                        const match = targetQuestion.choices.find((c: string) =>
                            c.toLowerCase().trim() === cleanAnswer
                        );
                        answers[formKey] = match || answer;
                    }
                    else if (targetQuestion) {
                        answers[formKey] = answer;
                    }
                });
            });
        });

        return answers;
    };

    const generateFormKey = (sectionKey: string, subsectionKey: string, questionNo: string): string => {
        const sectionMap: Record<string, string> = {
            'section_a': 'details',
            'section_b': 'product_service',
            'section_c': 'operations',
            'section_d': 'employees',
            'section_e': 'holding',
            'section_f': 'csr_details',
            'section_g': 'transparency'
        };

        const subsectionMap: Record<string, string> = {
            'one': 'details',
            'two': 'product_service',
            'three': 'operations',
            'four': 'employees',
            'five': 'holding',
            'six': 'csr_details',
            'seven': 'transparency'
        };

        const categoryKey = sectionMap[sectionKey] || sectionKey.toLowerCase();

        const subKey = subsectionMap[subsectionKey] || subsectionKey.toLowerCase();

        const questionIndex = parseInt(questionNo.split('.')[0]) - 1;

        return `${categoryKey}_${subKey}_${questionIndex}`;
    };


    const handleSubmitAll = (item: any) => {
        setTrust(item?.isTrusted);
        setSubmittedAnswers((prev) => ({
            ...prev,
            [item]: true,
        }));

        let anyAnswered = false;
        const currentCategory = allCategories.find((cat) => cat.key === activeCategory);

        if (currentCategory) {
            const answeredData: any = [];

            currentCategory.questions.forEach((section: any) => {
                let answered = 0;
                const total = section.question.length;
                section.question.forEach((_: any, questionIndex: any) => {
                    const questionKey = `${activeCategory}_${section.key}_${questionIndex}`;
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

            const selectedCategory = allCategories.find((cat) => cat.key === categoryKey);
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

    const generateQuestionKey = (section: string, key: string, index: number): string => {
        return `${section}_${key}_${index}`.toLowerCase();
    };

    const cleanAnswerKeys = (answers: { [key: string]: any }) => {
        const cleaned: { [key: string]: any } = {};

        Object.entries(answers).forEach(([key, value]) => {
            const cleanKey = key.toLowerCase().replace(/-/g, '_');
            if (!cleaned[cleanKey]) {
                cleaned[cleanKey] = value;
            }
        });

        return cleaned;
    };

    useEffect(() => {
        const savedAnswers: any = localStorage.getItem('answeredQuestions');
        if (savedAnswers) {
            setAnswers(cleanAnswerKeys(JSON.parse(savedAnswers)));
        }
    }, []);


    useEffect(() => {
        if (!trust) {
            setAnswers((prevAnswers) => {
                const updatedAnswers = { ...prevAnswers };
                Object.keys(updatedAnswers).forEach((key) => {
                    const value = updatedAnswers[key];
                    // Check if value is a string before trimming
                    const isEmptyString = typeof value === 'string' ? value.trim() === "" : !value;

                    if (!submittedAnswers[key] && (!value || isEmptyString)) {
                        updatedAnswers[key] = "";
                    }
                });
                return updatedAnswers;
            });
        }
    }, [trust, submittedAnswers]);
    const mapApiKeyToFormKey = (apiKey: string): string => {
        const parts = apiKey.split('-');
        if (parts.length < 3) return apiKey.toLowerCase().replace(/-/g, '_');

        const sectionMap: Record<string, string> = {
            'section_a': 'details',
            'section_b': 'product_service',
            'section_c': 'operations',
            'section_d': 'employees',
            'section_e': 'holding',
            'section_f': 'csr_details',
            'section_g': 'transparency'
        };

        const subsectionMap: Record<string, string> = {
            'one': 'details',
            'two': 'product_service',
            'three': 'operations',
            'four': 'employees',
            'five': 'holding',
            'six': 'csr_details',
            'seven': 'transparency'
        };

        const section = parts[0];
        const subsection = parts[1];
        const questionNum = parseInt(parts[2]) - 1;

        if (section in sectionMap && subsection in subsectionMap) {
            return `${sectionMap[section]}_${subsectionMap[subsection]}_${questionNum}`;
        }

        return apiKey.toLowerCase().replace(/-/g, '_');
    };

    const renderQuestionInput = (
        section: string,
        key: string,
        question: {
            text: string;
            choices: string[] | null;
            isMandatory: boolean,
            type: string,
            columns: [],
            rows: [],
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
                const alphabet = String.fromCharCode(97 + subQuestionIndex);
                return `${alphabet}.`;
            }
        };
        const questionKey = generateQuestionKey(section, key, questionIndex);
        const answerValue = answers[questionKey];
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
                            columns={question.columns || []}
                            rows={question.rows || []}
                            header={"S.No"}
                            value={Array.isArray(answerValue) ? answerValue : []}
                            onChange={(value: any) => handleInputChange(section, key, value, questionIndex)}
                        />
                    </div>
                </div>
            );
        }
        if (loading) {
            return <Loader />;
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
                            value={Array.isArray(answerValue) ? answerValue : []}
                            onChange={(value) => handleInputChange(section, key, value, questionIndex)}
                        />
                    ) : (
                        <div className="question-options">
                            {question.choices.map((option) => (
                                <label key={option}>
                                    <Space direction="vertical">
                                        <Radio
                                            value={option}
                                            checked={answerValue === option}
                                            onChange={() => handleInputChange(section, key, option, questionIndex)}
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

    const currentCategory = allCategories.find((cat) => cat.key === activeCategory);
    const questions: any = currentCategory?.questions[currentSectionIndex];

    const countNonEmptyAnswers = () => {
        let nonEmptyCount = 0;
        if (currentCategory) {
            currentCategory.questions[currentSectionIndex]?.question.forEach((_, questionIndex) => {
                const questionKey = `${activeCategory}_${questions.key}_${questionIndex} `;
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
    if (loading) {
        return <Loader />;
    }
    return (
        <div className="questionnaire-main">
            {/* <div className="questionnaire-title">BRSR</div> */}
            <div className="questionnaire-container">
                <div className="category-card">
                    <Card title={"Categories"} bordered>
                        <List
                            key={activeCategory}
                            dataSource={allCategories}
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
                                        onChange={(info) => handleFileUpload(info, '')}
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

export default Questionnaire;
