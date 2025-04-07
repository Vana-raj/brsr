import React, { useEffect, useState } from "react";
import { Card, Input, List, Modal, Progress, Space, Table, Tooltip, Upload, message } from "antd";
import { Radio } from "antd";
import { ArrowLeftOutlined, CheckOutlined, CopyTwoTone, DeleteOutlined, FileAddTwoTone } from "@ant-design/icons";
import CustomButton from "../../component/buttons/CustomButton";
// import { allCategories3 } from "../../utils/Options2";
import { allCategories3 } from "../../utils/Options3";
import { primaryColor } from '../../style/ColorCode';
import '../questionnaire/Questionnaire.scss';
import SelectDropDown from "../../component/select/SelectDropDown";

const { TextArea } = Input;
const columns: any = [
    {
        title: "Section",
        dataIndex: "quesSection",
        key: "section",
        sorter: false,
        render: (text: string) => <span className="supplier-name">{text}</span>,
    },
    {
        title: "Questions Answered / Total",
        dataIndex: "questionsAnswer",
        key: "questionsAnswer",
        sorter: false,
        align: "center",
    },
    {
        title: "Percent Complete",
        dataIndex: "percentComplete",
        key: "percentComplete",
        sorter: false,
        align: "center",
        render: (percentComplete: number) => `${percentComplete}%`
    },
];

const SectionC: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState<string>("general");
    const [showQuestions, setShowQuestions] = useState<boolean>(false);
    const [answers, setAnswers] = useState<{ [key: string]: any }>({});
    const [uploadedFiles, setUploadedFiles] = useState<{ [key: string]: { name: string; size: string } | null }>({});
    const [currentSectionIndex, setCurrentSectionIndex] = useState<number>(0);
    const [isViewMode, setIsViewMode] = useState(false);
    const [singleSectionTextArea, setsingleSectionTextArea] = useState<any>();
    const [trust, setTrust] = useState<boolean>(false);

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
        setCurrentSectionIndex((prev) => Math.min(prev + 1, allCategories3[0].questions.length - 1));
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


    const handleFileUpload = (info: any, questionKey: string) => {
        if (info.file.status !== "uploading") {
            const { name, size } = info.file;
            const fileSize = `${(size / 1024).toFixed(2)} KB`;

            setUploadedFiles((prevFiles) => ({
                ...prevFiles,
                [questionKey]: { name, size: fileSize },
            }));

            message.success(`${name} uploaded successfully.`);
        }
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
        const currentCategory = allCategories3.find((cat) => cat.key === activeCategory);

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
                    updatedAnswers[key] = "";
                }
            });
            return updatedAnswers;
        });
    };

    const handleCategoryClick = (categoryKey: string) => {
        confirmNavigation(() => {

            const selectedCategory = allCategories3.find((cat) => cat.key === categoryKey);
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
        question: { text: string; choices: string[] | null; isMandatory: boolean },
        questionIndex: number
    ) => {
        const questionKey = `${section}-${key}-${questionIndex}`;
        const isFileUploaded = !!uploadedFiles[questionKey];
        const isAnswered = !!answers[questionKey];
        if (isViewMode && !isAnswered) {
            return null;
        }
        return (
            <div>
                <div className="question-text">
                    <div>{questionIndex + 1}. {question.text}
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
                {question.choices === null ? (
                    <div className="area-upload">
                        <TextArea
                            rows={3}
                            placeholder="Type your answer here"
                            size="small"
                            onChange={(e) =>
                                handleInputChange(section, key, e.target.value, questionIndex)
                            }
                            value={answers[questionKey] || ""}
                        />

                        <div className="upload-section">
                            {!isFileUploaded && (
                                <Tooltip title="Upload">
                                    <Upload
                                        showUploadList={false}
                                        customRequest={(options) => {
                                            const { onSuccess } = options;
                                            setTimeout(() => onSuccess?.("ok"), 0);
                                        }}
                                        onChange={(info) => handleFileUpload(info, questionKey)}
                                    >
                                        <FileAddTwoTone className="upload-icon" />
                                    </Upload>
                                </Tooltip>
                            )}
                        </div>
                        {isFileUploaded && (
                            <div className="uploaded-file-info">
                                <div className="uploaded-file-details">
                                    File: {uploadedFiles[questionKey]?.name} ({uploadedFiles[questionKey]?.size})
                                    <button
                                        onClick={() => handleRemoveFile(questionKey)}
                                        className="remove-file-icon"
                                    >
                                        <DeleteOutlined />
                                    </button>
                                </div>
                            </div>
                        )}
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
                        onChange={(value: any) =>
                            handleInputChange(section, key, value, questionIndex)
                        }
                    />
                ) : (
                    <div className="question-options">
                        {question.choices.map((option, idx) => (
                            <label key={`${option}-${idx}`}>
                                <Space direction="vertical">
                                    <Radio
                                        value={option}
                                        checked={
                                            answers[`${section}-${key}-${questionIndex}`] ===
                                            option
                                        }
                                        onChange={() =>
                                            handleInputChange(
                                                section,
                                                key,
                                                option,
                                                questionIndex
                                            )
                                        }
                                        className="radio-qbutton"
                                    >
                                        {option}
                                    </Radio>
                                </Space>
                            </label>
                        ))}
                    </div>
                )}

            </div>
        );
    };

    const currentCategory = allCategories3.find((cat) => cat.key === activeCategory);
    const questions: any = currentCategory?.questions[currentSectionIndex];

    const totalQuestions = currentCategory?.questions.reduce((sum, section) => {
        const [, total] = section.questionsAnswer.split("/").map(Number);
        return sum + total;
    }, 0) ?? 0;

    const totalAnswered = currentCategory?.questions.reduce((sum, section) => {
        const [answered] = section.questionsAnswer.split("/").map(Number);
        return sum + answered;
    }, 0) ?? 0;
    const footer = () => {
        return (
            <div className="footer-main">
                <div className="footer-row">
                    <div className="footer-text empty-cell"></div>
                    <div className="footer-text total-label">
                        <strong>TOTAL</strong>
                    </div>
                    <div className={`footer-text ${activeCategory || "default"}`}>
                        {totalAnswered}/{totalQuestions}
                    </div>

                    <div className={`footer-text percentage ${activeCategory}`}>
                        {Math.round((totalAnswered / totalQuestions) * 100)}%
                    </div>

                </div>
            </div>
        )
    }

    const countNonEmptyAnswers = () => {
        let nonEmptyCount = 0;
        if (currentCategory) {
            currentCategory.questions[currentSectionIndex]?.question.forEach((_, questionIndex) => {
                const questionKey = `${activeCategory}-${questions.key}-${questionIndex}`;
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
            <div className="questionnaire-title">BRSR</div>
            <div className="questionnaire-container">
                <div className="category-card">
                    <Card title={"Categories"} bordered>
                        <List
                            key={activeCategory}
                            dataSource={allCategories3}
                            renderItem={(category, id: number) => (
                                <List.Item
                                    key={category.key}
                                    onClick={() => handleCategoryClick(category.key)}
                                    className={`category-item ${activeCategory === category.key ? "active" : ""}`}
                                >
                                    {category.section}
                                </List.Item>
                            )}
                        />
                    </Card>
                </div>
                {/* {!showQuestions ? (
                    <div className="question-card">
                        <Card title={currentCategory?.section} bordered>
                            <Table
                                columns={columns}
                                dataSource={(currentCategory?.questions || []).map((q, idx) => ({ ...q, key: idx }))}
                                bordered={false}
                                pagination={false}
                                onRow={(record: any, index: any) => ({
                                    onClick: () => handleRowClick(record, index),
                                })}
                                footer={footer}
                            />

                        </Card>
                    </div>
                ) : (    */}
                <div className="question-card">
                    <Card
                        title={
                            <div>
                                {questions?.quesSection}
                            </div>
                        }
                        extra={
                            <div style={{ textAlign: "center" }}>
                                <Progress
                                    type="circle"
                                    percent={progressPercent}
                                    width={50}
                                    strokeColor={primaryColor}
                                    format={() => `${countNonEmptyAnswers()}/${singleSectionTextArea}`}
                                />

                            </div>
                        }



                        bordered
                    >
                        {questions?.question.map((q: any, idx: any) => {
                            return (
                                <div key={`${questions.key}-${idx}`}>
                                    {renderQuestionInput(activeCategory, questions.key, q, idx)}
                                </div>
                            );
                        })}

                        <div className="subbutton">
                            <div className="navigation-buttons">
                                <CustomButton
                                    label="Previous Section"
                                    type="primary"
                                    onClick={handlePreviousSection}
                                    disabled={currentSectionIndex === 0}
                                />
                                <span className="current-section-text">
                                    {`Section ${currentSectionIndex + 1} of ${currentCategory?.questions.length}`}
                                </span>
                                <CustomButton
                                    label="Next Section"
                                    type="primary"
                                    onClick={handleNextSection}
                                    disabled={currentSectionIndex === (currentCategory?.questions.length ?? 1) - 1 || (isViewMode && hasNonEmptyValues)}
                                />
                            </div>
                            <div className="common-submit-btn">
                                <CustomButton
                                    label={isViewMode ? "Hide Answers" : "View Answers"}
                                    type="primary"
                                    onClick={() => setIsViewMode(prev => !prev)}
                                />

                                <CustomButton
                                    label="Submit Answers"
                                    type="primary"
                                    onClick={(item: any) => handleSubmitAll(item)}
                                    disabled={allCategories3.find((cat) => cat.key === activeCategory)?.questions.every(section =>
                                        section.question.every((_, questionIndex) => {
                                            const questionKey = `${activeCategory}-${section.key}-${questionIndex}`;
                                            return !answers[questionKey];
                                        })
                                    )}
                                />
                            </div>
                        </div>

                    </Card>
                </div>
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

export default SectionC;
