import React, { useEffect, useState } from "react";
import { Radio } from "antd";
import { CheckOutlined, CopyTwoTone, FileAddTwoTone } from "@ant-design/icons";
import { Card, Input, List, Modal, Progress, Space, Tooltip, Upload, message,Form } from "antd";
import CustomButton from "../../component/buttons/CustomButton";
import { allCategories } from "../../utils/Options";
import { primaryColor } from '../../style/ColorCode';
import SelectDropDown from "../../component/select/SelectDropDown";
import TableInput from "../../component/InputTable/InputTable";
import Loader from "../../component/loader/Loader";
import "./Questionnaire.scss";
import { text } from "node:stream/consumers";



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



const { TextArea } = Input;


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


interface QuestionnaireProps {
  putdata: Category[];
  selectedindex:string;
  editOnly:boolean
}

const Questionnaire: React.FC<QuestionnaireProps> = ({ putdata,selectedindex,editOnly}) => {

    const [activeCategory, setActiveCategory] = useState<string>("details");
    const [showQuestions, setShowQuestions] = useState<boolean>(false);
    const [answers, setAnswers] = useState<{ [key: string]: any }>({});
    const [editAnswers, setEditAnswers] = useState<{ [key: string]: any }>({});
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
    const [value, setValue] = useState('');
    const [questionIndex, setQuestionIndex] = useState(0);
    

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

function editfindanswertextarea(data:any[],editquestion:string): any|null {

console.log(data)
console.log(editquestion)
    
const found = data.find(item => item.question.includes(editquestion));
  return found ? found.answer :"";
}

function editfindanswertable(data: any[], editquestion: string): any[] | null {
  const found = data.find(item => item.question.includes(editquestion));

  if (!found || !found.answer) return null;

  try {
    const parsed = JSON.parse(found.answer);
    return Array.isArray(parsed) ? parsed : [parsed];
  } catch (error) {
    console.error("Failed to parse answer as JSON:", error);
    return null;
  }
}



// const HandleInputChange = (
// section: string, key: string, value: any, questionIndex: number ,text:string,putdata:Category[]) => {
//     // console.log(section,"*",key,"*" ,value,"*",questionIndex,"*",text,"*")
//     const questionKey = generateQuestionKey(section, key, questionIndex);
//     const question = generateQuestion(text);
//     // ✅ Always allow user input
//     setAnswers((prevAnswers) => ({
//         ...prevAnswers,
//         [questionKey]: value,
//     }));

//     setTexts((prevText) => ({
//         ...prevText,
//         [question]: value,
//     }));
//     console.log(answers)
//     // console.log(texts)
//     setHasUnsavedChanges(value !== "");
// };






const HandleInputChange = (
section: string, key: string, value: any, questionIndex: number ,putdata:Category[],text:string) => {

if (editOnly === true) {
const questionKey = generateQuestionKey(section, key, questionIndex);
const question = generateQuestion(text);
console.log(value)
console.log(questionKey)
console.log(putdata)
const initialAnswers = putdata.reduce((acc, item) => {
acc[item.question] = item?.answer;
return acc;
}, {} as { [key: string]: any });
console.log(initialAnswers[questionIndex]?.answer)

    setAnswers((prevAnswers) => ({
        ...prevAnswers,
        [questionKey]: value,
    }));

console.log(answers)
    setTexts((prevText) => ({
        ...prevText,
        [question]: value,
    }));
console.log(texts)

// setEditAnswers(initialAnswers);

//   setHasUnsavedChanges(value !== "");

}       
    else {
        console.log("sese")
        console.log(value)
    const questionKey = generateQuestionKey(section, key, questionIndex);
    const question = generateQuestion(text);
    // ✅ Always allow user input
    setAnswers((prevAnswers) => ({
        ...prevAnswers,
        [questionKey]: value,
    }));

    setTexts((prevText) => ({
        ...prevText,
        [question]: value,
    }));
    console.log(answers)
    // console.log(texts)
    setHasUnsavedChanges(value !== "");
        
    }
};

// useEffect(() => {
//   if (questions.text) {
//     const answer = editAnswers[questions.text] || "";
//     setValue(answer);
//   }
// }, [texts, editAnswers]);


const handlePost = async () => {
    try {


if (editOnly==true) {
    const bodyData = {
    
    texts: texts,
    sectionfind: "section_a",
    currentsection: currentCategory?.section,
    indexName:selectedindex

  };
console.log("This is if bodydata",bodyData)
  const response = await fetch(`http://127.0.0.1:1000/edit_pdf_report_put`, {
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
      texts: Object.keys(rdata).length > 0 ? rdata : texts,
      sectionfind: "section_a" ,
      brsrfilename:brsrFilename // Replace with your actual section identifier
    };
    const response = await fetch('http://127.0.0.1:1000/submit/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data != null) {
      message.success(`${data} form submitted successfully!`);
    } else {
      message.warning("Please upload file or edit !");
    }
}

} catch (error) {
    console.error('Error posting data:', error);
  }
};



    const handleFileUpload = async (info: any, questionKey: string,principleKey:string) => {
        const { file } = info;

        if (!file || file.status === "uploading") return;
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append('file', file.originFileObj || file);
            formData.append('questionKey', questionKey);
            formData.append('principleKey',principleKey );


            const response = await fetch('http://127.0.0.1:1000/extract/', {
                method: 'POST',
                body: formData,
            });


            if (!response.ok) {
                const errorText = await response.text();
                console.error("Server responded with error:", errorText);
                throw new Error(`Server error: ${response.status} - ${errorText}`);
            }

            const data = await response.json();
            const filename = data.brsrfilename;
            setBrsrFilename(filename)           
            const responseText =data.response;
            console.log("Raw response text:", responseText);

            // Try to parse it as JSON
            let responseData;
            try {
                responseData =responseText;




            } catch (jsonError) {
                console.error("Failed to parse JSON:", jsonError);
                // If parsing fails, check if it's a simple string response
                if (responseText.trim().length > 0) {
                    responseData = {
                        data: [{
                            section: "section_a",
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


    interface SectionPartConfig {
        category: string;
        startIndex: number;
        questionMap?: Record<string, string>;
    }

    const sectionPartMap: Record<string, Record<string, SectionPartConfig>> = {
        'section_a': {
            'one': {
                category: 'details',
                startIndex: 0,
                questionMap: {
                    '1': 'Corporate Identity Number (CIN) of the Listed Entity',
                    '2': 'Name of the Listed Entity',
                    '3': 'Year of incorporation',
                    '4': 'Registered office address',
                    '5': 'Corporate address',
                    '6': 'Email',
                    '7': 'Telephone',
                    '8': 'Website',
                    '9': 'Financial year for which reporting is being done',
                    '10': 'Name of the Stock Exchange(s) where shares are listed',
                    '11': 'Paid-up Capital',
                    '12': 'Name and contact details (telephone, email address) of the person who may be contacted in case of any queries on the BRSR report',
                    '13': 'Reporting boundary - Are the disclosures under this report made on a standalone basis (i.e. only for the entity) or on a consolidated basis (i.e. for the entity and all the entities which form a part of its consolidated financial statements, taken together).',
                    '14': 'Name of assurance provider',
                    '15': 'Type of assurance obtained'
                }
            },
            'two': {
                category: 'product_service',
                startIndex: 0,
                questionMap: {
                    '1': 'Details of business activities (accounting for 90% of the turnover):',
                    '2': `Products/Services sold by the entity (accounting for 90% of the entity’s Turnover):`
                }
            },
            'three': {
                category: 'operations',
                startIndex: 0,
                questionMap: {
                    '1': 'Number of locations where plants and offices of the entity are situated:',
                    '2':'Number of locations',
                    '3':'What is the contribution of exports as a percentage of the total turnover of the entity?'  ,
                    '4':'A brief on types of customers'          }   
            },
            'four': {
                category: 'employees',
                startIndex: 0,
                questionMap: {
                    '1': 'Employees and workers (including differently abled):',
                    '2':'Differently abled Employees and workers:',
                    '3': 'Participation/Inclusion/Representation of women',
                    '4': 'Turnover rate for permanent employees and workers (Disclose trends for the past 3 years)'
                }
            },
            'five': {
                category: 'holding',
                startIndex: 0,
                questionMap: {
                    '1': 'How many products have undergone a carbon footprint assessment?'
                }
            },
            'six': {
                category: 'csr_details',
                startIndex: 1,
                questionMap: {
                    // '1': 'CSR_details',
                    '1':"Whether CSR is applicable as per section 135 of Companies Act, 2013: (Yes/No)",
                    '2':"Turnover (in Rs.)",
                    '3':"Net worth (in Rs.)"
                }   
            },
            'seven': {
                category: 'transparency',
                startIndex: 0,
                questionMap: {
                    '1': 'Complaints/Grievances on any of the principles (Principles 1 to 9) under the National Guidelines on Responsible Business Conduct:',
                    '2': `Please indicate material responsible business conduct and sustainability issues pertaining to environmental and social matters that present a risk or an opportunity to your business, rationale for identifying the same, approach to adapt or mitigate the risk along-with its financial implications, as per the following format.`
                }
            }
        },
        // 'section_b': {
        //     'one': {
        //         category: 'policy_management',
        //         startIndex: 0,
        //         questionMap: {}
        //     },
        //     'two': {
        //         category: 'governance_leadership',
        //         startIndex: 0,
        //         questionMap: {}
        //     }
        // }
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
                const sectionName = section.section || 'section_a';
                const partsMap = sectionPartMap[sectionName as keyof typeof sectionPartMap] || {};
                const parts = section.parts || [];
                parts.forEach((part: any) => {
                    const partNo = part.partNo?.toLowerCase();
                    if (!partNo) return;

                    const partConfig = partsMap[partNo];
                    if (!partConfig || !part.questions || !partConfig.questionMap) return;
                    const { category, questionMap } = partConfig;
                    const categoryConfig = allCategories.find(c => c.key === category);
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

    const generateQuestion = (text: string): string => {
    return text;
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


//   useEffect(() => {
//   const initialAnswers: Record<string, string> = {};

//   putdata.forEach((item, index) => {
//     const section = "section_a"
//     const key = item.categoryNo || "default_key";      
//     const questionIndex = index;                    

//     const generatedKey = generateQuestionKey(section, key, questionIndex);
//     initialAnswers[generatedKey] = item.answer;
//     // console.log(initialAnswers,section,'initialAnswers')
//   });
//   setAnswers(initialAnswers);
// }, [putdata]);



//     useEffect(() => {
//   if (putdata[questionIndex]) {
//     putdata[questionIndex].answer = ""; // ✅ clear the field
//   }
// }, [questionIndex]);




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
                            columns={question.columns}
                            rows={question.rows}
                            header={"S.No"}
                            onChange={(value: any) => HandleInputChange(section, key, value, questionIndex,putdata,question.text)}
                            value={Array.isArray(answerValue) ||editfindanswertable(putdata,question.text) ||[]}/>
                    </div>
                            {/* value={Array.isArray(answerValue) ? answerValue : []} */}
                    </div>
                     );
        }



// function editfindanswertable(data:any[],editquestion:string): string|null {
// const found = data.find(item => item.question.includes(editquestion));
//   return found ? found.answer : null;
// }
// console.log( putdata[questionIndex].answer)

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
                                value={answers[questionKey]||""}
                                
                                onChange={(e) => { 
                                     const value = e.target.value;
                        // putdata[questionIndex].answer = value; 
         HandleInputChange(section, key,value, questionIndex,putdata,question.text)}
                    }/>
                        </div>
                    ) : question.choices.length > 4 ? (
                        <SelectDropDown
                            mode="multiple"
                            options={question.choices.map((choice) => ({
                                label: choice,
                                value: choice,
                            }))}
                            placeholder="Select options"
                                onChange={(e) => HandleInputChange(section, key, e.target.value, questionIndex,putdata,question.text)}
                            value={Array.isArray(answerValue) ? answerValue : []}
                            // value={Array.isArray(answerValue) ||editfindanswertable(putdata,question.text) ||[]}
                            />
                    ) : (
                        <div className="question-options">
                            {question.choices.map((option) => (
                                <label key={option}>
                                    <Space direction="vertical">
                                        <Radio
                                            value={option}
                                            checked={answerValue === option}
                                onChange={(e) => HandleInputChange(section, key, e.target.value, questionIndex,putdata,question.text)}
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
                    <Card title={"Categories"} variant="outlined">
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
                                        onChange={(info) => handleFileUpload(info, 'section_a',"null")}
                                    >
                                        <FileAddTwoTone className="upload-icon" />
                                    </Upload>
                                </Tooltip>
                                <Progress
                                    type="circle"
                                    percent={progressPercent}
                                    size={50}
                                    strokeColor={primaryColor}
                                    format={() => `${countNonEmptyAnswers()}/${singleSectionTextArea}`
                                    }
                                />

                            </div >
                        }
                        // bordered
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
                                    label="Submit "
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
                open={isUnsavedModalVisible}
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
