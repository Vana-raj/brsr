import Column from "antd/es/table/Column";
import { Fa500Px } from "react-icons/fa";

export const options2 = [
  { label: "This Month", value: "1" },
  { label: "Last Year", value: "2" },
];


export const userInfow = {
  name: "Mugesh",
  email: "mugesh.raj09@email.com",
  phone: "9637892021",
  user: "Admin",
};

export const dateFormatOptions2 = [
  { value: 'MMM. d, yyyy', label: 'Abbreviated month (Jan. 1, 2025)' },
  { value: 'MMMM d, yyyy', label: 'Full month (January 1, 2025)' },
  { value: 'MM/dd/yyyy', label: 'Numeric (01/01/2025)' },
  { value: 'yyyy-MM-dd', label: 'ISO (2025-01-01)' },
];

export const timeFormatOptions2 = [
  { value: '12h', label: '12 Hour Format' },
  { value: '24h', label: '24 Hour Format' },
];


export const data2 = {
  countries: [
    { label: "usa", value: "United States" },
    { label: "uk", value: "United Kingdom" },
    { label: "canada", value: "Canada" },
    { label: "australia", value: "Australia" },
    { label: "germany", value: "Germany" }
  ],
  states: [
    { label: "california", value: "California" },
    { label: "texas", value: "Texas" },
    { label: "new-york", value: "New York" },
    { label: "florida", value: "Florida" },
    { label: "illinois", value: "Illinois" }
  ],
  cities: [
    { label: "los-angeles", value: "Los Angeles" },
    { label: "san-francisco", value: "San Francisco" },
    { label: "new-york-city", value: "New York City" },
    { label: "chicago", value: "Chicago" },
    { label: "miami", value: "Miami" }
  ]
};

export const allCategories2 = [
  {
    key: "details",
    section: "Policy and management processes",
    questionsAnswer: "1/3",
    percentComplete: "40%",
    questions: [
      {
        key: "details",
        quesSection: "Policy and management processes",
        questionsAnswer: "0/9",
        percentComplete: "0",
        question: [
          {
            text: "Whether your entity’s policy/policies cover each principle and its core elements of the NGRBCs. (Yes/No)", choices: ["Yes", "No", "In Progress"],
            type: "table",
            label: "Policy",
            columns: [
              "P1",
              "P2",
              "P3",
              "P4",
              "P5",
              "P6",
              "P7",
              "P8",
              "P9"
            ],
            "isMandatory": true,
            rows: [
              "Whether your entity’s policy/policies cover each principle and its core elements of the NGRBCs. (Yes/No)",
              "Has the policy been approved by the Board? (Yes/No)",
              "Web Link of the Policies, if available",
              "Whether the entity has translated the policy into procedures. (Yes / No)",
              "Do the enlisted policies extend to your value chain partners? (Yes/No)",
              "Name of the national and international codes/certifications/labels/ standards (e.g. Forest Stewardship Council, Fairtrade, Rainforest Alliance, Trustea) standards (e.g. SA 8000, OHSAS, ISO, BIS) adopted by your entity and mapped to each principle.",
              "Specific commitments, goals and targets set by the entity with defined timelines, if any.",
              "Performance of the entity against the specific commitments, goals and targets along-with reasons in case the same are not met.",
            ],
            parent: true

          },
        ],
      },
    ],
  },
  {
    key: "product_service",
    section: "Governance, leadership and oversight",
    questionsAnswer: "3/3",
    percentComplete: "90%",
    questions: [
      {
        key: "Governance",
        quesSection: "Governance, leadership and oversight",
        questionsAnswer: "0/4",
        percentComplete: "0",
        question: [
          {
            text: "Statement by director responsible for the business responsibility report, highlighting ESG related challenges, targets and achievements (listed entity has flexibility regarding the placement of this disclosure)", choices: ["Yes", "No", "In Progress"], isMandatory: false,
            label: "Disclosure",
            type: "table",
            columns: [
              "Disclosure",
              "P1",
              "P2",
              "P3",
              "P4",
              "P5",
              "P6",
              "P7",
              "P8",
              "P9"
            ],
            // "isMandatory":true,
            // rows: [
            //   "Statement by director responsible for the business responsibility report, highlighting ESG related challenges, targets and achievements (listed entity has flexibility regarding the placement of this disclosure)"
            // ],
            parent: true
          },
          { text: "Details of the highest authority responsible for implementation and oversight of the Business Responsibility policy (ies).", choices: null, isMandatory: false, parent: true },
          { text: "Does the entity have a specified Committee of the Board/ Director responsible for decision making on sustainability related issues? (Yes / No). If yes, provide details.", choices: null, isMandatory: false, parent: true },
          {
            text: "Details of Review of NGRBCs by the Company:", choices: null, isMandatory: false, parent: true, isNone: true,
            lablel: "Subject for Review",
          },
          {
            text: "Indicate whether review was undertaken by Director / Committee of the Board/ Any other Committee", choices: ["Yes", "No", "In Progress"], isMandatory: false, parent: false,
            label: "Performance against above policies and follow up action",
            type: "table",
            columns: [
              "Performance against above policies and follow up action",
              "P1",
              "P2",
              "P3",
              "P4",
              "P5",
              "P6",
              "P7",
              "P8",
              "P9"
            ],
            // rows: [
            //   "Performance against above policies and follow up action"
            // ],
          },

          {
            text: "Frequency(Annually/ Half yearly/ Quarterly/ Any other – please specify)", choices: ["Yes", "No", "In Progress"], isMandatory: false, parent: false,
            label: "Compliance with statutory requirements of relevance to the principles, and, rectification of any non-compliances",
            type: "table",
            columns: [
              "Compliance with statutory requirements of relevance to the principles, and, rectification of any non-compliances",
              "P1",
              "P2",
              "P3",
              "P4",
              "P5",
              "P6",
              "P7",
              "P8",
              "P9"
            ],
            // rows: [
            //   "Compliance with statutory requirements of relevance to the principles, and, rectification of any non-compliances"
            // ],
          },

          {
            text: "Has the entity carried out independent assessment/ evaluation of the working of its policies by an external agency? (Yes/No). If yes, provide name of the agency.", choices: null, isMandatory: false, parent: true,
            type: "table",
            label: "Has the entity carried out independent assessment/ evaluation of the working of its policies by an external agency? (Yes/No). If yes, provide name of the agency.",
            columns: [
              "S. No",
              "P1",
              "P2",
              "P3",
              "P4",
              "P5",
              "P6",
              "P7",
              "P8",
              "P9"
            ],
          },
          {
            text: "If answer to question (1) above is “No” i.e. not all Principles are covered by a policy, reasons to be stated, as below:", choices: null, isMandatory: false, parent: true,
            type: "table",
            label: "",
            columns: [
              "S. No",
              "P1",
              "P2",
              "P3",
              "P4",
              "P5",
              "P6",
              "P7",
              "P8",
              "P9"
            ],
            row: ["Question",
              "The entity does not consider the Principles material to its business (Yes/No)",
              "The entity is not at a stage where it is in a position to formulate and implement the policies on specified principles (Yes/No)",
              "The entity does not have the financial or/human and technical resources available for the task (Yes/No)",
              "It is planned to be done in the next financial year (Yes/No)",
              "Any other reason (please specify)"
            ]
          },

          {
            text: "Supply Chain Mangement", choices: null, isMandatory: false, parent: true, isNone: true
          },
          {
            text: "Upstream (Suppliers & Logistics Partners)", parent: false,
            type: "table",
            columns: ["List the top upstream partners that individually contribute 2% or more of your total purchases (by value).",
              "What percentage of total purchases (by value) is covered in this disclosure?",
              "Disclose the percentage of total purchases covered by value chain partners for which ESG disclosures are provided.", ,
              "What ESG performance metrics are tracked for these upstream partners?"

            ]
          },

          {
            text: "Downstream (Distributors & Customers)", parent: false,
            type: "table",
            columns: ["List the top downstream partners that individually contribute 2% or more of your total sales (by value).",
              "What percentage of total sales (by value) is covered in this disclosure?",
              "Disclose the percentage of total sales covered by value chain partners for which ESG disclosures are provided.", ,
              "What ESG criteria are assessed for downstream partners?"

            ]
          },
        ],
      },

    ],
  },

];