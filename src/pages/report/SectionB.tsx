import React, { useEffect, useState } from "react";
import { CheckOutlined, CopyTwoTone, FileAddTwoTone } from "@ant-design/icons";
import { Card, Radio, Input, List, Modal, Progress, Space, Tooltip, Upload, message,Form } from "antd";
import CustomButton from "../../component/buttons/CustomButton";
import { allCategories2 } from "../../utils/Options2";
import { primaryColor } from '../../style/ColorCode';
import SelectDropDown from "../../component/select/SelectDropDown";
import TableInput from "../../component/InputTable/InputTable2";
import Loader from "../../component/loader/Loader";
import "../questionnaire/Questionnaire.scss"


const { TextArea } = Input;


interface Category {
  id: number;
  categoryNo: string;
  question_no: string;
  answer: string;
  section: string;
  title: string;
  subtitle: string;
  question: string;
  created_at: string;
}



interface BaseQuestion {
    text: string;
    isMandatory: boolean;
    parent?: boolean;
    isNone?: boolean;
}

interface TextQuestion extends BaseQuestion {
    choices: null;
    type?: 'text';
}
interface SectionPartConfig {
    category: string;
    startIndex: number;
    questionMap?: Record<string, string>;
}

interface ChoiceQuestion extends BaseQuestion {
    choices: string[];
    type?: 'radio' | 'checkbox';
}

interface TableQuestion extends BaseQuestion {
    choices: string[] | null;
    type: 'table';
    columns: string[];
    rows?: string[];
}

type Question = TextQuestion | ChoiceQuestion | TableQuestion;
// interface Question {
//     text: string;
//     choices: string[] | null;
//     isMandatory: boolean;
//     type?: 'text' | 'radio' | 'checkbox' | 'table';
//     columns?: string[];
//     rows?: string[];
//     parent?: boolean;
//     isNone?: boolean;
// }

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


interface SectionBProps {
  putdata: Category[];
  selectedindex:string;
  editOnly:boolean;
  setSectionBProgressPercentage: (percentage: number) => void;
}


const SectionB: React.FC<SectionBProps> = ({ putdata,selectedindex,editOnly,setSectionBProgressPercentage}) => {
    const [activeCategory, setActiveCategory] = useState<string>("policy");
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
    const [questionAnswerMap, setQuestionAnswerMap] = useState<Record<string, string>>({});
    const [texts,setTexts]= useState<{ [key: string]: any }>({});
    const [rdata,setRdata]= useState<{ [key: string]: any }>({}); 
    const [brsrFilename,setBrsrFilename] = useState<string>("");


    const confirmNavigation = (action: () => void) => {
        if (hasUnsavedChanges && showQuestions) {
            setPendingAction(() => action);
            setIsUnsavedModalVisible(true);
        } else {
            action();
        }
    };



useEffect(() => {
  // Clear localStorage on page refresh
  const handleBeforeUnload = () => {
    localStorage.removeItem('answeredQuestions');
  };

  window.addEventListener('beforeunload', handleBeforeUnload);

  return () => {
    window.removeEventListener('beforeunload', handleBeforeUnload);
  };
}, []);




    const handleInputChange = (section: string, key: string, value: any, questionIndex: number ,text:string) => {
        const questionKey = generateQuestionKey(section, key, questionIndex);
        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionKey]: value,
        }));
const question = generateQuestion(text);
      setTexts((prevText) => ({
    ...prevText,
    [question]: value,
}));


        setHasUnsavedChanges(answers[questionKey] === "" ? false : true);

    };

        console.log("*****",texts)

const output: Record<string, any> = {};

for (const key in texts) {
  if (typeof texts[key] === "object" && !Array.isArray(texts[key])) {
    output[key] = [texts[key]];  // wrap object in array
  } else {
    output[key] = texts[key];    // keep as is
  }
}



const rout: Record<string, any> = {};

for (const key in rdata) {
  if (typeof rdata[key] === "object" && !Array.isArray(rdata[key])) {
    rout[key] = [rdata[key]];  // wrap object in array
  } else {
    rout[key] = rdata[key];    // keep as is
  }
}






const handlePost = async () => {
try {

    console.log("editonly",editOnly)
if(editOnly==true){

const bodyData = {
texts: Object.keys(rout).length > 0 ? rout : output,
sectionfind: "section_b",  // Replace with your actual section identifier
currentsection:currentCategory?.section,
indexName:selectedindex
};

console.log("This is if bodydata",bodyData)
  const response = await fetch(`http://192.168.2.27:1000/edit_pdf_report_put`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bodyData),

  });
 
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();

  if (Object.keys(texts).length > 0) {
    message.success(`${data.filename} File edit successfully!`);
  } else {
    message.warning("Please edit the file!");
  }


}


else{
    const bodyData = {
    texts: Object.keys(rout).length > 0 ? rout : output,
    sectionfind: "section_b",  // Replace with your actual section identifier
    brsrfilename:brsrFilename
};
    console.log(bodyData)
    const response = await fetch('http://192.168.2.27:1000/submit/', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    // body: JSON.stringify(output),
    body:  JSON.stringify(bodyData),

});

    if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Response:', data);
    if (data!=null){
        message.success(`${data} form submited sucessfully!`);
        }
        else{
            message.warning("upload file!")
        }}
} catch (error) {
    console.error('Error posting data:', error);
}
};

  



// async function Download_pdf() {
//   try {
//     const response = await fetch("http://192.168.2.27:1000/download_pdf/", {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }

//     const data = await response.json();
//     console.log("Received data:", data);
//     // Do something with the data (e.g., show in table, trigger PDF download)
//   } catch (error) {
//     console.error("Fetch error:", error);
//   }
// }
  



    const handleFileUpload = async (info: any, questionKey: string,principleKey:string) => {
        const { file } = info;

        if (!file || file.status === "uploading") return;
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append('file', file.originFileObj || file);
            formData.append('questionKey', questionKey);
            formData.append('principleKey',principleKey );


            console.log("Sending request to server...");
            const response = await fetch('http://192.168.2.27:1000/extract/', {
                method: 'POST',
                body: formData,
            });

            console.log("Received response status:", response.status);

            if (!response.ok) {
                const errorText = await response.text();
                console.error("Server responded with error:", errorText);
                throw new Error(`Server error: ${response.status} - ${errorText}`);
            }

            // First, get the response as text
            const data = await response.json();
            const filename = data.brsrfilename;
            // const responseText =data.response.text();
            console.log(filename)
            setBrsrFilename(filename)
            // console.log(responseText)
            // console.log("Raw response text:", data.response);
           
            const responseText =data.response;
            console.log("Raw response text:", responseText);


            // Try to parse it as JSON
            let responseData;
            try {
                responseData =responseText;
                console.log("Parsed response data:", responseData);
            } catch (jsonError) {
                console.error("Failed to parse JSON:", jsonError);
                // If parsing fails, check if it's a simple string response
                if (responseText.trim().length > 0) {
                    console.log("Treating response as plain text");
                    responseData = {
                        data: [{
                            section: "section_b",
                            parts: [{
                                partNo: "one",
                                subtitle: "Extracted Data",
                                questions: [{
                                    questionNo: "1",
                                    question: "Extracted content",
                                    questionOptions: [],
                                    questionAnswer: responseText
                                }]
                            }]
                        }]
                    };
                } else {
                    throw new Error("Empty response from server");
                }
            }
const extractQA = (data: any): { [key: string]: any } => {
  const result: { [key: string]: any } = {};
  data?.data?.parts?.forEach((part: any) => {
    part?.questions?.forEach((q: any) => {
      result[q.question] = q.questionAnswer;
    });
  });
  return result;
};
setRdata(extractQA(responseData))


            // Ensure we have some data structure to work with
            if (!responseData) {
                throw new Error("No data received from server");
            }

            // Flexible response validation - handle both direct array and {data: array} formats
            const responseDataToProcess = responseData.data || responseData;
            if (!responseDataToProcess) {
                throw new Error("Response does not contain processable data");
            }

            // Process the file upload info
            const fileSize = `${(file.size / 1024).toFixed(2)} KB`;
            setUploadedFiles(prev => ({
                ...prev,
                [questionKey]: { name: file.name, size: fileSize },
            }));

            // Transform the API response to answers
            const newAnswers = transformApiResponseToAnswers(
                Array.isArray(responseDataToProcess) ?
                    responseDataToProcess :
                    [responseDataToProcess]
                
            );

            console.log("Transformed answers:", newAnswers);

            // Update the answers state
            setAnswers(prev => {
                const updated = { ...prev };
                Object.entries(newAnswers).forEach(([key, value]) => {
                    if (value !== undefined && value !== null && value !== "") {
                        updated[key] = value;
                    }
                });
                return updated;
            });

            // Save to localStorage
            localStorage.setItem('answeredQuestions', JSON.stringify({
                ...answers,
                ...newAnswers
            }));

            message.success(`${file.name} processed successfully!`);
        } catch (error) {
            console.error('Full upload error:', error);
            let errorMessage = 'Upload failed';
            if (error instanceof Error) {
                errorMessage += `: ${error.message}`;
            } else if (typeof error === 'string') {
                errorMessage += `: ${error}`;
            }
            message.error(errorMessage);
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



 const sectionPartMap: Record<string, Record<string, SectionPartConfig>> = {
        'section_b': {
            'one': {
                category: 'policy',
                startIndex: 0,
                questionMap: {
                    '1': `Whether your entity’s policy/policies cover each principle and its core elements of the NGRBCs. (Yes/No)`,
                    '2': `Has the policy been approved by the Board? (Yes/No)`,
                    '3': `Web Link of the Policies, if available.`,
                    '4': `Whether the entity has translated the policy into procedures. (Yes / No)`,
                    '5': `Do the enlisted policies extend to your value chain partners? (Yes/No)`,
                    '6': `Name of the national and international codes/ certifications/labels/ standards (e.g. Forest Stewardship Council, Fairtrade, Rainforest Alliance,Trustea) standards (e.g. SA 8000, OHSAS, ISO, BIS) adopted by your entity and mapped to each principle.`,
                    '7': `Specific commitments, goals and targets set by the entity with defined timelines, if any.`,
                    '8': `Performance of the entity against the specific commitments, goals and targets along-with reasons in case the same are not met.`,

                }
            },
            'two': {
                category: 'governance',
                startIndex: 0,
                questionMap: {
                    '1': 'Statement by director responsible for the business responsibility report, highlighting ESG related challenges, targets and achievements (listed entity has flexibility regarding the placement of this disclosure)',
                    '2': 'Details of the highest authority responsible for implementation and oversight of the Business Responsibility policy (ies).',
                    '3': 'Does the entity have a specified Committee of the Board/ Director responsible for decision making on sustainability related issues? (Yes / No). If yes, provide details.',
                    '4':'Indicate whether review was undertaken by Director / Committee of the Board/ Any other Committee',
                    '5':'Frequency(Annually/ Half yearly/ Quarterly/ Any other – please specify)',
                    '6': 'Has the entity carried out independent assessment/ evaluation of the working of its policies by an external agency? (Yes/No). If yes, provide name of the agency.',
                    '7': 'If answer to question (1) above is “No” i.e. not all Principles are covered by a policy, reasons to be stated, as below:',
                    '8': 'Upstream (Suppliers & Logistics Partners)',
                    '9': 'Downstream (Distributors & Customers)y'
                }
            }
        }
    };
    const transformApiResponseToAnswers = (apiData: any[]) => {
        const answers: { [key: string]: any } = {};

        if (!Array.isArray(apiData)) {
            if (apiData && typeof apiData === 'object') {
                apiData = [apiData];
            } else {
                console.error("Expected array or object, got:", apiData);
                return answers;
            }
        }


        try {
            apiData.forEach((section: any) => {
                const sectionName = section.section || 'section_b';
                const partsMap = sectionPartMap[sectionName as keyof typeof sectionPartMap] || {};

                const parts = section.parts || [];
                parts.forEach((part: any) => {
                    const partNo = part.partNo?.toLowerCase();
                    if (!partNo) return;

                    const partConfig = partsMap[partNo];
                    if (!partConfig || !part.questions || !partConfig.questionMap) return;
                    const { category, questionMap } = partConfig;
                    const categoryConfig = allCategories2.find(c => c.key === category);
                    if (!categoryConfig) return;

                    part.questions.forEach((apiQuestion: any) => {
                        const answer = apiQuestion.questionAnswer;
                        if (answer === null || answer === "Not provided in the text") return;
                        const expectedQuestionText = questionMap[apiQuestion.questionNo];
                        if (!expectedQuestionText) {
                            console.warn(`No mapping for question ${apiQuestion.questionNo}`);
                            return;
                        }

                        let matchingQuestionIndex = -1;
                        let targetQuestion: Question | undefined;
                        let sectionKey = '';

                        for (const section of categoryConfig.questions) {
                            const index = section.question.findIndex((q: any) => {
                                if (!q || !q.text) return false;
                                return q.text.trim() === expectedQuestionText.trim();
                            });

                            if (index !== -1) {
                                matchingQuestionIndex = index;
                                targetQuestion = section.question[index] as Question;
                                sectionKey = section.key;
                                break;
                            }
                        }

                        if (matchingQuestionIndex === -1 || !targetQuestion) {
                            console.warn(`Question not found: ${expectedQuestionText}`);
                            return;
                        }

                        const formKey = `${category}_${sectionKey}_${matchingQuestionIndex}`;

                        if (isTableQuestion(targetQuestion)) {
                            try {
                                answers[formKey] = typeof answer === 'string' ?
                                    JSON.parse(answer) :
                                    answer;
                            } catch (e) {
                                console.warn(`Failed to parse table answer for ${formKey}`, e);
                                answers[formKey] = [{ value: answer }];
                            }
                        } else {
                            answers[formKey] = answer;
                        }
                    });
                });
            });
        } catch (error) {
            console.error("Error in transformApiResponseToAnswers:", error);
        }

        return answers;
    };

    function isTableQuestion(question: Question): question is TableQuestion {
        return question.type === 'table';
    }


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
                    const questionKey = `${activeCategory}_${section.key}_${questionIndex}`;
                    const subobj: Record<string, string> = {};
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

    const generateQuestionKey = (section: string, key: string, index: number): string => {
        return `${section}_${key}_${index}`.toLowerCase();
    };

     const generateQuestion = (text: string): string => {
        return `${text}`.toLowerCase();
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
                    const isEmptyString = typeof value === 'string' ? value.trim() === "" : !value;
                    if (!submittedAnswers[key] && (!value || isEmptyString)) {
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
        



function editfindanswertextarea(data:any[],editquestion:string): string|null {
const found = data.find(item => item.question.includes(editquestion));
  return found ? found.answer : null;
}


function editfindanswertable(data: any[], editquestion: string): any[] | null {
  const found = data.find(item => item.question.includes(editquestion));

  if (!found || !found.answer) return null;

  try {
    const parsed = JSON.parse(found.answer);
    const firstObject = parsed[0];

    // return Array.isArray(parsed) ? parsed : [parsed];
    return firstObject
  } catch (error) {
    console.error("Failed to parse answer as JSON:", error);
    return null;
  }
}
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
                        columns={question.columns}
                        rows={question.rows}
                        header={"S.No"}
                        // value={Array.isArray(answerValue) ? answerValue : []}
                        onChange={(value: any) => handleInputChange(section, key, value, questionIndex,question.text)}
                        value={answerValue||editfindanswertable(putdata,question.text)||[]}
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
                            onChange={(e) => handleInputChange(section, key, e.target.value, questionIndex,question.text)}
                            // value={answers[questionKey] || ""}
                            value={answers[questionKey] ||editfindanswertextarea(putdata,question.text) ||""}
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
                        onChange={(value) => handleInputChange(section, key, value, questionIndex,question.text)}
                    />
                ) : (
                    <div className="question-options">
                        {question.choices.map((option) => (
                            <label key={option}>
                                <Space direction="vertical">
                                    <Radio
                                        value={option}
                                        checked={answerValue === option}
                                        onChange={() => handleInputChange(section, key, option, questionIndex,question.text)}
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
    let answered = 0;

    allCategories2.forEach(category => {
        const section = category.questions[currentSectionIndex];
        if (section) {
            section.question.forEach((_, questionIndex) => {
                const questionKey = `${category.key}_${section.key}_${questionIndex}`;
                if (answers[questionKey]) {
                    answered++;
                }
            });
        }
    });

    return answered;
};

const totalTextAreasInSection = allCategories2.reduce((total, category) => {
    const section = category.questions[currentSectionIndex];
    return section ? total + section.question.length : total;
}, 0);

   const sectionProgressPercent = totalTextAreasInSection > 0
    ? Math.round((countNonEmptyAnswers() / totalTextAreasInSection) * 100)
    : 0;

        const totalInSection = currentCategory?.questions[currentSectionIndex]?.question.length || 0;
    const sectionBProgressPercentage = totalInSection > 0
        ? Math.round((countNonEmptyAnswers() / totalInSection) * 100)
        : 0;
setSectionBProgressPercentage(sectionProgressPercent);
 const totaloneTextAreasInSection = questions?.question.length || 0;
    useEffect(() => {
        setsingleSectionTextArea(totaloneTextAreasInSection);
    }, [totaloneTextAreasInSection, questions]);

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
                                    onChange={(info) => handleFileUpload(info, 'section_b',"null")}
                                >
                                    <FileAddTwoTone className="upload-icon" />
                                </Upload>
                            </Tooltip>
                            <Progress
                                type="circle"
                                percent={sectionBProgressPercentage}
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

                    < div className="subbutton">
                        <div className="common-submit-btn">
                            <CustomButton
                                label="Submit Answers"
                                type="primary"
                                onClick={handlePost}
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
