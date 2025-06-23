import React, { useEffect, useState } from "react";
import { ArrowLeftOutlined, BoldOutlined, CheckOutlined, CopyTwoTone, DeleteOutlined, FileAddTwoTone } from "@ant-design/icons";
import { Card, Input, List, Modal, Progress, Space, Table, Tooltip, Upload, message,Radio } from "antd";
import CustomButton from "../../component/buttons/CustomButton";
import { allCategories3 } from "../../utils/Options3";
import { primaryColor } from '../../style/ColorCode';
import SelectDropDown from "../../component/select/SelectDropDown";
import TableInput from "../../component/InputTable/InputTable";
import Loader from "../../component/loader/Loader";
import "../questionnaire/Questionnaire.scss"
import { info } from "sass";


const { TextArea } = Input;

interface BaseQuestion {
    text: string;
    choices: string[] | null;
    isMandatory: boolean;
    parent?: boolean;
    isNone?: boolean;
    label?: string;
}

interface TableQuestion extends BaseQuestion {
    type: "table";
    columns: string[];
    rows: string[];
}

interface TextQuestion extends BaseQuestion {
    type?: undefined;
    choices: null;
}

interface ChoiceQuestion extends BaseQuestion {
    type?: undefined;
    choices: string[];
}

type Question = TableQuestion | TextQuestion | ChoiceQuestion;

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

const SectionC: React.FC = () => {
    const [sections, setSections] = useState<number>(0);

    const [activeCategory, setActiveCategory] = useState<string>("business");
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
    const [gm, setGm] = useState<any>(null);
    const [pdf, setPdf] = useState<File | null>(null);
    const [selectedId, setSelectedId] = useState<number | null>(null);



    const handleRowClick = (record: any, sectionIndex: number) => {
        setShowQuestions(true);
        setCurrentSectionIndex(sectionIndex);
    };

    const getPrincipleLabel = (section: number): string => {
  if (section >= 0 && section < 9) {
    return `principle_${section + 1}`;
  }
  return "invalid_section";
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
        console.log("*",section,"*",key,"*",value,"*",questionIndex)
        
        const questionKey = `${section}-${key}-${questionIndex}`;
        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionKey]: value,
        }));

        setHasUnsavedChanges(answers[questionKey] === "" ? false : true);
    };

    interface SectionPartConfig {
        category: string;
        startIndex: number;
        questionMap?: Record<string, string>;
    }

    const sectionPartMap: Record<string, Record<string, SectionPartConfig>> = {
        'section_c': {
            'one': {
                category: 'business',
                startIndex: 0,
                questionMap: {
                    '1': 'Percentage coverage by training and awareness programmes on any of the Principles during the financial year:',
                    '2': 'Details of fines / penalties /punishment/ award/ compounding fees/ settlement amount paid in proceedings',
                    '3':'Monetary',
                    '4':'Non-Monetary',
                    '5': 'Of the instances disclosed in Question 2 above, details of the Appeal/ Revision preferred in cases where monetary or non-monetary action has been appealed.',
                    '6': 'Does the entity have an anti-corruption or anti-bribery policy? If yes, provide details in brief and if available, provide a web-link to the policy.',
                    '7': 'Number of Directors/KMPs/employees/workers against whom disciplinary action was taken by any law enforcement agency for the charges of bribery/ corruption',
                    '8': 'Details of complaints with regard to conflict of interest',
                    '9': 'Provide details of any corrective action taken or underway on issues related to fines / penalties / action taken by regulators/ law enforcement agencies/ judicial institutions, on cases of corruption and conflicts of interest.',
                    '10': 'Number of days of accounts payables ((Accounts payable *365) / Cost of goods/services procured) in the following format:',
                    '11':'Provide details of concentration of purchases and sales with trading houses, dealers, and related parties along-with loans and advances & investments, with related parties, in the following format:',
                    '12': 'Awareness programmes conducted for value chain partners on any of the Principles during the financial year:',
                    '13': 'Does the entity have processes in place to avoid/ manage conflict of interests involving members of the Board? (Yes/No) If Yes, provide details of the same.'
                }
            },
            'two': {
                category: 'sustainable_and_safe',
                startIndex: 0,
                questionMap: {
                    '1': 'Percentage of R&D and capital expenditure (capex) investments in specific technologies to improve the environmental and social impacts of product and processes to total R&D and capex investments made by the entity, respectively.',
                    '2': 'Does the entity have procedures in place for sustainable sourcing? (Yes/No)',
                    '3': 'If yes, what percentage of inputs were sourced sustainably?',
                    '4': 'Describe the processes in place to safely reclaim your products for reusing, recycling and disposing at the end of life, for :',
                    '5': 'Whether Extended Producer Responsibility (EPR) is applicable to the entity\'s activities (Yes / No). If yes, whether the waste collection plan is in line with the Extended Producer Responsibility (EPR) plan submitted to Pollution Control Boards? If not, provide steps taken to address the same.',
                    '6': 'Has the entity conducted Life Cycle Perspective / Assessments (LCA) for any of its products (for manufacturing industry) or for its services (for service industry)? If yes, provide details in the following format?',
                    '7': 'If there are any significant social or environmental concerns and/or risks arising from production or disposal of your products / services, as identified in the Life Cycle Perspective / Assessments (LCA) or through any other means, briefly describe the same along-with action taken to mitigate the same.',
                    '8': 'Percentage of recycled or reused input material to total material (by value) used in production (for manufacturing industry) or providing services (for service industry)',
                    '9': 'Of the products and packaging reclaimed at end of life of products, amount (in metric tonnes) reused, recycled, and safely disposed, as per the following format:',
                    '10': 'Reclaimed products and their packaging materials (as percentage of products sold) for each product category.'
                }
            },
            'three': {
                category: 'value chains',
                startIndex: 0,
                questionMap: {
                    '1':'Details of measures for the well-being of employees:',
                    '2':'Details of measures for the well-being of workers:',
                    '3': 'Details of retirement benefits, for Current and Previous FY',
                    '4': 'Accessibility of workplaces',
                    '5': 'Does the entity have an equal opportunity policy as per the Rights of Persons with Disabilities Act, 2016? If so, provide a web-link to the policy.',
                    '6': 'Return to work and Retention rates of permanent employees and workers that took parental leave.',
                    '7': 'Is there a mechanism available to receive and redress grievances for the following categories of employees and worker? If yes, give details of the mechanism in brief',
                    '8': 'Membership of employees and worker in association(s) or Unions recognised by the listed entity:',
                    '9': 'Details of training given to employees and workers:',
                    '10': 'Details of performance and career development reviews of employees and workers:',
                    '11':'Whether an occupational health and safety management system has been implemented by the entity? (Yes/ No). If yes, the coverage such system?',
                    '12':'What are the processes used to identify work-related hazards and assess risks on a routine and non-routine basis by the entity?',
                    '13':'Whether you have processes for workers to report the work related hazards and to remove themselves from such risks. (Y/N)',
                    '14':'Do the employees/ worker of the entity have access to non-occupational medical and healthcare services? (Yes/ No)',
                    '15': 'Details of safety related incidents, in the following format:',
                    '16': 'Describe the measures taken by the entity to ensure a safe and healthy work place',
                    '17': 'Number of Complaints on the following made by employees and workers:',
                    '18': 'Assessments for the year:',
                    '19': 'Provide details of any corrective action taken or underway to address safety-related incidents (if any) and on significant risks / concerns arising from assessments of health & safety practices and working conditions.',
                    '20': 'Does the entity extend any life insurance or any compensatory package in the event of death of (A) Employees (Y/N)',
                    '21': 'Provide the measures undertaken by the entity to ensure that statutory dues have been deducted and deposited by the value chain partners',
                    '22': 'Provide the number of employees / workers having suffered high consequence work-related injury / ill-health / fatalities (as reported in Q11 of Essential Indicators above), who have been are rehabilitated and placed in suitable employment or whose family members have been placed in suitable employment:',
                    '23': 'Does the entity provide transition assistance programs to facilitate continued employability and the management of career endings resulting from retirement or termination of employment? (Yes/ No)',
                    '24': 'Details on assessment of value chain partners:',
                    '25': 'Provide details of any corrective actions taken or underway to address significant risks / concerns arising from assessments of health and safety practices and working conditions of value chain partners.'
                }
            },
            // ... (continue with the rest of the parts following the same pattern)
            'four': {
                category: 'operations',
                startIndex: 0,
                questionMap: {
                    '1': 'Describe the processes for identifying key stakeholder groups of the entity.',
                    '2': 'List stakeholder groups identified as key for your entity and the frequency of engagement with each stakeholder group.',
                    '3': 'Provide the processes for consultation between stakeholders and the Board on economic, environmental, and social topics or if consultation is delegated, how is feedback from such consultations provided to the Board.',
                    '4': 'Whether stakeholder consultation is used to support the identification and management of environmental, and social topics (Yes / No). If so, provide details of instances as to how the inputs received from stakeholders on these topics were incorporated into policies and activities of the entity',
                    '5': 'Provide details of instances of engagement with, and actions taken to, address the concerns of vulnerable/ marginalized stakeholder groups.'
                }
            },
            'five': {
                category: 'rights',
                startIndex: 0,
                questionMap: {
                    '1': 'Employees and workers who have been provided training on human rights issues and policy(ies) of the entity, in the following format:',
                    '2': 'Details of minimum wages paid to employees and workers, in the following format:',
                    '3': 'Details of remuneration/salary/wages',
                    '4': 'Do you have a focal point (Individual/ Committee) responsible for addressing human rights impacts or issues caused or contributed to by the business? (Yes/ No)',
                    '5': 'Describe the internal mechanisms in place to redress grievances related to human rights issues.',
                    '6': 'Number of Complaints on the following made by employees and workers:',
                    '7': 'Complaints filed under the Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013, in the following format:',
                    '8': 'Mechanisms to prevent adverse consequences to the complainant in discrimination and harassment cases.',
                    '9': 'Do human rights requirements form part of your business agreements and contracts? (Yes/ No)',
                    '10': 'Assessments for the year:',
                    '11': 'Provide details of any corrective actions taken or underway to address significant risks / concerns arising from the assessments at Question 10 above.',
                    '12': 'Details of a business process being modified / introduced as a result of addressing human rights grievances/complaints.',
                    '13': 'Details of the scope and coverage of any Human rights due-diligence conducted',
                    '14': 'Is the premise/office of the entity accessible to differently abled visitors, as per the requirements of the Rights of Persons with Disabilities Act, 2016?',
                    '15': 'Details on assessment of value chain partners:',
                    '16': 'Provide details of any corrective actions taken or underway to address significant risks / concerns arising from the assessments at Question 4 above.'
                }
            },
            'six': {
                category: 'environment',
                startIndex: 0,
                questionMap: {
                    '1': 'Details of total energy consumption (in Joules or multiples) and energy intensity, in the following format:',
                    '2': 'Does the entity have any sites / facilities identified as designated consumers (DCs) under the Performance, Achieve and Trade (PAT) Scheme of the Government of India? (Y/N) If yes, disclose whether targets set under the PAT scheme have been achieved. In case targets have not been achieved, provide the remedial action taken, if any.',
                    '3': 'Provide details of the following disclosures related to water, in the following format:',
                    '4': 'Provide the following details related to water discharged:',
                    '5': 'Has the entity implemented a mechanism for Zero Liquid Discharge? If yes, provide details of its coverage and implementation',
                    '6': 'Please provide details of air emissions (other than GHG emissions) by the entity, in the following format:',
                    '7': 'Provide details of greenhouse gas emissions (Scope 1 and Scope 2 emissions) & its intensity, in the following format:',
                    '8': 'Does the entity have any project related to reducing Green House Gas emission? If Yes, then provide details.',
                    '9': 'Provide details related to waste management by the entity, in the following format:',
                    '10': 'Briefly describe the waste management practices adopted in your establishments. Describe the strategy adopted by your company to reduce usage of hazardous and toxic chemicals in your products and processes and the practices adopted to manage such wastes.',
                    '11': 'If the entity has operations/offices in/around ecologically sensitive areas (such as national parks, wildlife sanctuaries, biosphere reserves, wetlands, biodiversity hotspots, forests, coastal regulation zones etc.) where environmental approvals / clearances are required, please specify details in the following format:',
                    '12': 'Details of environmental impact assessments of projects undertaken by the entity based on applicable laws, in the current financial year:',
                    '13': 'Is the entity compliant with the applicable environmental law/ regulations/ guidelines in India; such as the Water (Prevention and Control of Pollution) Act, Air (Prevention and Control of Pollution) Act, Environment protection act and rules thereunder (Y/N). If not, provide details of all such non-compliances, in the following format:',
                    '14': 'Water withdrawal, consumption and discharge in areas of water stress (in kilolitres):',
                    '15': 'Please provide details of total Scope 3 emissions & its intensity, in the following format',
                    '16': 'With respect to the ecologically sensitive areas reported at Question 10 of Essential Indicators above, provide details of significant direct & indirect impact of the entity on biodiversity in such areas along-with prevention and remediation activities',
                    '17': 'If the entity has undertaken any specific initiatives or used innovative technology or solutions to improve resource efficiency, or reduce impact due to emissions / effluent discharge / waste generated, please provide details of the same as well as outcome of such initiatives, as per the following format:',
                    '18': 'Does the entity have a business continuity and disaster management plan? Give details in 100 words/ web link.',
                    '19': 'Disclose any significant adverse impact to the environment, arising from the value chain of the entity. What mitigation or adaptation measures have been taken by the entity in this regard.',
                    '20': 'Percentage of value chain partners (by value of business done with such partners) that were assessed for environmental impacts.',
                    '21': 'How many Green Credits have been generated or procured:'
                }
            },
            'seven': {
                category: 'transparent',
                startIndex: 0,
                questionMap: {
                    '1': 'Number of affiliations with trade and industry chambers/ associations.',
                    '2':'List the top 10 trade and industry chambers/ associations (determined based on the total members of such body) the entity is a member of/ affiliated to, in the following format',
                    '3': 'Provide details of corrective action taken or underway on any issues related to anti-competitive conduct by the entity, based on adverse orders from regulatory authorities.',
                    '4': 'Details of public policy positions advocated by the entity:'
                }
            },
            'eight': {
                category: 'development',
                startIndex: 0,
                questionMap: {
                    '1': 'Details of Social Impact Assessments (SIA) of projects undertaken by the entity based on applicable laws, in the current financial year.',
                    '2': 'Provide information on project(s) for which ongoing Rehabilitation and Resettlement (R&R) is being undertaken by your entity, in the following format',
                    '3': 'Describe the mechanisms to receive and redress grievances of the community.',
                    '4': 'Percentage of input material (inputs to total inputs by value) sourced from suppliers',
                    '5': 'Job creation in smaller towns – Disclose wages paid to persons employed (including employees or workers employed on a permanent or non-permanent / on contract basis) in the following locations, as % of total wage cost',
                    '6': 'Provide details of actions taken to mitigate any negative social impacts identified in the Social Impact Assessments (Reference: Question 1 of Essential Indicators above):',
                    '7': 'Provide the following information on CSR projects undertaken by your entity in designated aspirational districts as identified by government bodies',
                    '8': 'Do you have a preferential procurement policy where you give preference to purchase from suppliers comprising marginalized /vulnerable groups? (Yes/No)',
                    '9':'From which marginalized /vulnerable groups do you procure?',
                    '10':'What percentage of total procurement (by value) does it constitute?',
                    '11': 'Details of the benefits derived and shared from the intellectual properties owned or acquired by your entity (in the current financial year), based on traditional knowledge:',
                    '12': 'Details of corrective actions taken or underway, based on any adverse order in intellectual property related disputes wherein usage of traditional knowledge is involved.',
                    '13': 'Details of beneficiaries of CSR Projects:'
                }
            },
            'nine': {
                category: 'responsible_manner',
                startIndex: 0,
                questionMap: {
                    '1': 'Describe the mechanisms in place to receive and respond to consumer complaints and feedback.',
                    '2': 'Turnover of products and/ services as a percentage of turnover from all products/service that carry information about:',
                    '3': 'Number of consumer complaints in respect of the following:',
                    '4': 'Details of instances of product recalls on account of safety issues:',
                    '5': 'Does the entity have a framework/policy on cyber security and risks related to data privacy? (Yes/No). If available, provide weblink of the policy.',
                    '6': 'Provide details of any corrective actions taken or underway on issues relating to advertising, and delivery of essential services; cyber security and data privacy of customers; re-occurrence of instances of product recalls; penalty / action taken by regulatory authorities on safety of products / services.',
                    '7': 'Provide the following information relating to data breaches:',
                    '8': 'Channels / platforms where information on products and services of the entity can be accessed (provide web link, if available).',
                    '9': 'Steps taken to inform and educate consumers about safe and responsible usage of products and/or services.',
                    '10': 'Mechanisms in place to inform consumers of any risk of disruption/discontinuation of essential services.',
                    '11': 'Does the entity display product information on the product over and above what is mandated as per local laws? (Yes/No/Not Applicable) If yes, provide details in brief. Did your entity carry out any survey with regard to consumer satisfaction relating to the major products / services of the entity, significant locations of operation of the entity or the entity as a whole? (Yes/No)',
                    '12': 'Provide the following information relating to data breaches:'
                }
            }
        }
    };

    const findMatchingQuestion = (
        categoryConfig: any,
        apiQuestion: any,
        questionMap: Record<string, string> = {}
    ) => {
        // First try to match by questionNo if mapping exists
        if (apiQuestion.questionNo && questionMap[apiQuestion.questionNo]) {
            const mappedText = questionMap[apiQuestion.questionNo];
            for (const section of categoryConfig.questions) {
                for (let questionIndex = 0; questionIndex < section.question.length; questionIndex++) {
                    const targetQuestion = section.question[questionIndex];
                    if (targetQuestion.text.includes(mappedText)) {
                        return {
                            sectionKey: section.key,
                            questionIndex,
                            targetQuestion
                        };
                    }
                }
            }
        }

        // Fallback to text matching
        for (const section of categoryConfig.questions) {
            for (let questionIndex = 0; questionIndex < section.question.length; questionIndex++) {
                const targetQuestion = section.question[questionIndex];

                // Try matching the beginning of the question text
                const apiQuestionStart = apiQuestion.question.substring(0, 30).toLowerCase();
                const targetQuestionStart = targetQuestion.text.substring(0, 30).toLowerCase();

                if (apiQuestionStart === targetQuestionStart) {
                    return {
                        sectionKey: section.key,
                        questionIndex,
                        targetQuestion
                    };
                }
            }
        }

        return null;
    };

    const transformApiResponseToAnswers = (apiData: any[]) => {
        const answers: { [key: string]: any } = {};

        apiData.forEach((section: any) => {
            const sectionName = section.section || 'section_c';
            const partsMap = sectionPartMap[sectionName] || {};

            section.parts?.forEach((part: any) => {
                const partNo = part.partNo?.toLowerCase();
                const partConfig = partsMap[partNo];
                if (!partConfig || !part.questions) return;

                const { category } = partConfig;
                const categoryConfig = allCategories3.find(c => c.key === category);
                if (!categoryConfig) return;

                part.questions.forEach((apiQuestion: any) => {
                    // Find the matching question in the frontend configuration
                    const frontendQuestion = findMatchingQuestion(
                        categoryConfig,
                        apiQuestion,
                        partConfig.questionMap
                    );

                    if (!frontendQuestion) {
                        console.warn('No matching question found for:', apiQuestion.question);
                        return;
                    }

                    const { sectionKey, questionIndex, targetQuestion } = frontendQuestion;
                    const questionKey = `${category}_${sectionKey}_${questionIndex}`;

                    // Handle the answer based on the question type
                    if (apiQuestion.questionAnswer !== null) {
                        if (targetQuestion.type === 'table') {
                            // For table questions, ensure we have proper table data
                            answers[questionKey] = Array.isArray(apiQuestion.questionAnswer)
                                ? apiQuestion.questionAnswer
                                : [apiQuestion.questionAnswer];
                        } else {
                            // For simple questions, use the answer directly
                            answers[questionKey] = apiQuestion.questionAnswer;
                        }
                    }
                });
            });
        });

        return answers;
    };

    const transformToTableData = (
        answerData: any,
        columns: string[],
        rows?: string[]
    ): Record<string, any>[] => {
        if (!answerData) return [];

        // Handle string input (try to parse as JSON)
        if (typeof answerData === 'string') {
            try {
                answerData = JSON.parse(answerData);
            } catch {
                // If simple string, create a single row with first column
                return [{ [columns[0]]: answerData }];
            }
        }

        // Handle array input - assume it's already in table format
        if (Array.isArray(answerData)) {
            return answerData;
        }

        // Handle object input
        if (typeof answerData === 'object' && !Array.isArray(answerData)) {
            // If rows are defined, use them to structure the data
            if (rows && rows.length > 0) {
                return rows.map((row: string) => {
                    const rowData: Record<string, any> = {};
                    // For each column, try to find matching property in answerData
                    columns.forEach((col, colIndex) => {
                        // Try different ways to match the data
                        const colKey = col.toLowerCase().replace(/[^a-z0-9]/g, '_');
                        rowData[col] = answerData[col] ||
                            answerData[colKey] ||
                            answerData[`col${colIndex + 1}`] ||
                            '';
                    });
                    return rowData;
                });
            }

            // If no rows, assume object properties are row values
            return Object.entries(answerData).map(([key, value]) => ({
                [columns[0]]: key,
                [columns[1]]: value
            }));
        }

        return [];
    };

    const handleFileUpload = async (info: any, questionKey: string,principleKey:string) => {
        const { file } = info;
        setGm(info)
        setPdf(file)
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

            if (!response.ok) throw new Error('Upload failed');

            const responseData = await response.json();

            // Ensure we have an array of sections
            const apiData = Array.isArray(responseData.data)
                ? responseData.data
                : [responseData.data || responseData];

            // Transform the API response to our answer format
            const newAnswers = transformApiResponseToAnswers(apiData);
            console.log("answer",newAnswers)
            // Update state with the new answers
            setAnswers(prev => {
                const updatedAnswers = { ...prev, ...newAnswers };
                localStorage.setItem('answeredQuestions', JSON.stringify(updatedAnswers));
                return updatedAnswers;
            });

            // Mark all these answers as submitted
            const newSubmittedAnswers = { ...submittedAnswers };
            Object.keys(newAnswers).forEach(key => {
                if (newAnswers[key] !== null && newAnswers[key] !== undefined) {
                    newSubmittedAnswers[key] = true;
                }
            });
            setSubmittedAnswers(newSubmittedAnswers);

            // Track uploaded files
            setUploadedFiles(prev => ({
                ...prev,
                [questionKey]: {
                    name: file.name,
                    size: `${(file.size / 1024).toFixed(2)} KB`
                }
            }));

            message.success(`${file.name} processed successfully!`);
        } catch (error) {
            console.error('Upload error:', error);
            if (principleKey=="principle_1"){
                message.success("OK!")
            }
            else{
            message.error('Failed to process file');}
        } finally {
            setLoading(false);
        }
    };
 
    useEffect(() => {
        const savedAnswers = localStorage.getItem('answeredQuestions');
        if (savedAnswers) {
            try {
                const parsedAnswers = JSON.parse(savedAnswers);
                setAnswers(parsedAnswers);

                const answeredKeys = Object.keys(parsedAnswers);
                const newSubmittedAnswers = { ...submittedAnswers };
                answeredKeys.forEach(key => {
                    newSubmittedAnswers[key] = true;
                });
                setSubmittedAnswers(newSubmittedAnswers);
            } catch (e) {
                console.error("Failed to parse saved answers", e);
            }
        }
    }, []);

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

const handleCategoryClick = (categoryKey: string, id: number) => {
  if (!pdf) {
    message.warning("Please upload a PDF before selecting a principle.");
    return;
  }

  setSections(id);

  const principles: { [key: number]: string } = {
    1: "principle_1",
    2: "principle_2",
    3: "principle_3",
    4: "principle_4",
    5: "principle_5",
    6: "principle_6",
    7: "principle_7",
    8: "principle_8",
    9: "principle_9",
  };

  const principleKey = principles[id + 1];
  const mockInfo = { file: pdf };

  if (principleKey=="principle_1"){
console.log("#")
  }
  else{
  handleFileUpload(mockInfo, "section_c", principleKey);
  }
  confirmNavigation(() => {
    const selectedCategory = allCategories3.find((cat) => cat.key === categoryKey);
    if (selectedCategory) {
      loadAnsweredData(categoryKey, selectedCategory.questions);
    }

    setActiveCategory(categoryKey);

    const savedAnswers = localStorage.getItem("answeredQuestions");
    if (savedAnswers) {
      setAnswers(JSON.parse(savedAnswers));
    }

    handleClearUnsubmittedAnswers();
  });
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
                    if (!submittedAnswers[key] && (!updatedAnswers[key])) {
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
                    if (questionsArray[i]?.parent) {
                        parentCount++;
                    }
                }
                return `${parentCount}.`;
            } else {
                let lastParentIndex = -1;
                for (let i = questionIndex - 1; i >= 0; i--) {
                    if (questionsArray[i]?.parent) {
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
        console.log("questions",question)
        console.log("ww",answers,questionKey)
         console.log("@@@",answers[`${section}_${key}_${questionIndex}`])
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
                            value={answers[`${section}_${key}_${questionIndex}`] || []}
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
                                value={answers[`${section}_${key}_${questionIndex}`] || ""}
                                // size="small"
                                onChange={(e) => handleInputChange(section, key, e.target.value, questionIndex)}
                                // value={answers[questionKey]}
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
                            value={answers[questionKey] || []}  // Ensure we handle undefined/null
                            onChange={(value) => handleInputChange(section, key, value, questionIndex)}
                        />
                    ) : (
                        <div className="question-options">
                            {question.choices.map((option, idx) => (
                                <label key={`${option}-${idx}`}>
                                    <Space direction="vertical">
                                        <Radio
                                            value={option}
                                            checked={answers[questionKey] === option}
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

    const currentCategory = allCategories3.find((cat) => cat.key === activeCategory);
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
                            dataSource={allCategories3}
                            renderItem={(category, id: number) => (
                                <List.Item
                                    key={category.key}
                                    onClick={() => handleCategoryClick(category.key,id)}
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

                                        onChange={(info) => {handleFileUpload(info,'section_c',getPrincipleLabel(sections))
                                        setGm(info)
                                        }}
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

                    </Card >
                </div >
                {/* )
                } */}
            </div >

        </div >

    );

};

export default SectionC;
