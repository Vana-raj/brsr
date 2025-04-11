export const options = [
  { label: "This Month", value: "1" },
  { label: "Last Year", value: "2" },
];


export const userInfo = {
  name: "Mugesh",
  email: "mugesh.raj09@email.com",
  phone: "9637892021",
  user: "Admin",
};

export const dateFormatOptions = [
  { value: 'MMM. d, yyyy', label: 'Abbreviated month (Jan. 1, 2025)' },
  { value: 'MMMM d, yyyy', label: 'Full month (January 1, 2025)' },
  { value: 'MM/dd/yyyy', label: 'Numeric (01/01/2025)' },
  { value: 'yyyy-MM-dd', label: 'ISO (2025-01-01)' },
];

export const timeFormatOptions = [
  { value: '12h', label: '12 Hour Format' },
  { value: '24h', label: '24 Hour Format' },
];


export const data = {
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

export const allCategories = [
  {
    key: "details",
    section: "Details of the listed entity",
    questionsAnswer: "1/3",
    percentComplete: "40%",
    questions: [
      {
        key: "details",
        quesSection: "Details of the listed entity",
        questionsAnswer: "0/9",
        percentComplete: "0",
        question: [
          { text: "Corporate Identity Number (CIN) of the Listed Entity", choices: null, isMandatory: true },
          { text: "Name of the Listed Entity", choices: null, isMandatory: true },
          { text: "Year of incorporation", choices: null, isMandatory: true },
          {
            text: "Registered office address", choices: null, isMandatory: true
          },
          {
            text: "Corporate address",
            choices: null, isMandatory: true,
          },
          {
            text: "E-mail", choices: null, isMandatory: true
          },
          { text: "Telephone", choices: null, isMandatory: true },
          { text: "Website", choices: null, isMandatory: true },
          { text: "Financial year for which reporting is being done", choices: null, isMandatory: true },
          { text: "Name of the Stock Exchange(s) where shares are listed", choices: null, isMandatory: true },
          { text: "Paid-up Capital", choices: null, isMandatory: true },
          { text: "Name and contact details (telephone, email address) of the person who may be contacted in case of any queries on the BRSR report", choices: null, isMandatory: true },
          { text: "Reporting boundary - Are the disclosures under this report made on a standalone basis (i.e. only for the entity) or on a consolidated basis (i.e. for the entity and all the entities which form a part of its consolidated financial statements, taken together).", choices: null, isMandatory: true },
          { text: "Name of assurance provider", choices: null, isMandatory: true },
          { text: "Type of assurance obtained ", choices: null, isMandatory: true },

        ],
      },
    ],
  },
  {
    key: "product_service",
    section: "Products / Services",
    questionsAnswer: "3/3",
    percentComplete: "90%",
    questions: [
      {
        key: "product_service",
        quesSection: "Products / Services",
        questionsAnswer: "0/4",
        percentComplete: "0",
        question: [
          {
            text: "Details of business activities (accounting for 90% of the turnover):", choices: ["Yes", "No", "In Progress"], isMandatory: false,
            type: "table",
            columns: [
              "S. No.",
              "Description of Main Activity",
              "Description of Business Activity",
              "% of Turnover of the entity",
            ],
          },
          {
            text: "Products/Services sold by the entity (accounting for 90% of the entity’s Turnover):", choices: ["Yes", "No", "In Progress"],
            type: "table",
            columns: [
              "S. No.",
              "Product/Service",
              "NIC Code",
              "% of total Turnover contributed",
            ], isMandatory: false
          },
        ],
      }
    ],
  },
  {
    key: "operations",
    section: "Operations",
    questionsAnswer: "1/3",
    percentComplete: "40%",
    questions: [
      {
        key: "operations",
        quesSection: "Operations",
        questionsAnswer: "0/0",
        percentComplete: "0",
        question: [
          {
            text: "No. of locations where plants and/or operations/ offices of the entity are situated:", columns: [
              "Location",
              "No. of plants",
              "No. of offices",
              "Total",
            ], type: "table", choices: null, isMandatory: true, parent: true,
          },
          {
            text: "Markets served by the entity", choices: null,
            isMandatory: true, parent: true, isNone: true,
          },
          {
            text: "No. of Locations", columns: [
              "Location",
              "Number"
            ], type: "table", choices: null, isMandatory: true, parent: false
          },
          { text: "What is the contribution of exports as a percentage of the total turnover of the entity?", choices: null, isMandatory: true, parent: false },
        ],
      },
    ]
  },
  {
    key: "employees",
    section: "Employees",
    questionsAnswer: "1/3",
    percentComplete: "40%",
    questions: [
      {
        key: "employees",
        quesSection: "Employees",
        questionsAnswer: "0/3",
        percentComplete: "0",
        question: [
          {
            text: "Details as at the end of Financial Year:",
            choices: null,
            isMandatory: true,
            type: "sectionHeader",
            parent: true,
            isNone: true
          },
          {
            text: "Employees and workers (including differently abled):",
            type: "table",
            columns: [
              "Particulars",
              "Total (A)",
              "Male (No. (B))",
              "Female (No. (B))",
              "Male % (B/A)",
              "Female % (C/A)",
              "N"
            ],
            "isMandatory": true,
            rows: [
              "Employees - Permanent (D)",
              "Employees - Other than Permanent (E)",
              "Total employees (D + E)",
            ],
            parent: false
          },
          {
            text: "Differently abled Employees and workers:",
            type: "table",
            columns: [
              "Particulars",
              "Total (A)",
              "Male (No. (B))",
              "Female (No. (B))",
              "Male % (B/A)",
              "Female % (C/A)",
              "N"
            ],
            isMandator: true,
            rows: [
              "Differently-abled Employees - Permanent (D)",
              "Differently-abled Employees - Other than Permanent (E)",
              "Total employees (D + E)",
            ],
            parent: false
          },
          {
            text: "Participation/Inclusion/Representation of women", choices: null, type: "table", isMandatory: true, parent: true, columns: [
              "Total",
              "No. and percentage of Females (No. (B)",
              "No. and percentage of Females % (B / A)",
              "Total",
            ],
          },
          {
            text: "Turnover rate for permanent employees and workers (Disclose trends for the past 3 years)", choices: null, type: "table", isMandatory: true, parent: true, columns: [
              "Category",
              " FY (2024-25) Male",
              " FY (2024-25) Female",
              " FY (2024-25) Total",
              " FY (2023-24) Male",
              " FY (2023-24) Female",
              " FY (2023-24) Total",
              " FY (2022-23) Male",
              " FY (2022-23) Female",
              " FY (2022-23) Total",
            ],
          },

        ]
      }
    ]
  },
  {
    key: "holding",
    section: "Holding, Subsidiary and Associate Companies (including joint ventures)",
    questionsAnswer: "1/3",
    percentComplete: "40%",
    questions: [
      {
        key: "holding",
        quesSection: "Holding, Subsidiary and Associate Companies (including joint ventures)",
        questionsAnswer: "0/0",
        percentComplete: "0",
        question: [
          {
            text: "How many products have undergone a carbon footprint assessment?", type: "table", choices: null, isMandatory: true,
            parent: true, columns: [
              "S. No.",
              " Name of the holding / subsidiary / associate companies / joint ventures (A)",
              " Indicate whether holding/ Subsidiary/ Associate/ Joint Venture",
              "% of shares held by listed entity",
              "Does the entity indicated at column A, participate in the Business Responsibility initiatives of the listed entity? (Yes/No)",
            ],
          },


        ],
      },
    ]
  },
  {
    key: "csr_details",
    section: "CSR Details",
    questionsAnswer: "1/3",
    percentComplete: "40%",
    questions: [
      {
        key: "csr_details",
        quesSection: "CSR Details",
        questionsAnswer: "0/4",
        percentComplete: "0",
        question: [
          {
            text: "CSR Details", choices: ["Yes", "No"], isMandatory: true,
            parent: true,
            isNone: true
          },
          {
            text: "Whether CSR is applicable as per section 135 of Companies Act, 2013: (Yes/No)", choices: ["Yes", "No"], isMandatory: true,
            parent: false,
          },
          {
            text: "Turnover (in Rs.)", choices: null, isMandatory: true,
            parent: false,
          }, {
            text: "Net worth (in Rs.)", choices: null, isMandatory: true,
            parent: false,
          },
        ],
      },
    ]
  },
  {
    key: "transparency",
    section: "Transparency and Disclosures Compliances",
    questionsAnswer: "1/3",
    percentComplete: "40%",
    questions: [
      {
        key: "transparency",
        quesSection: "Transparency and Disclosures Compliances",
        questionsAnswer: "0/5",
        percentComplete: "0",
        question: [
          {
            text: "Complaints/Grievances on any of the principles (Principles 1 to 9) under the National Guidelines on Responsible Business Conduct:", choices: null, isMandatory: true,
            type: "table",
            columns: [
              "Stakeholder group from whom complaint is received ",
              "Grievance Redressal Mechanism in Place (Yes/No) (If Yes, then provide web-link for grievance redress policy)",
              "Number of complaints filed during the year(FY 2024-25)",
              "Number of complaints pending resolution at close of the year(FY 2024-25)",
              "Remark(FY 2024-25)",
              "Number of complaints filed during the year(FY 2023-24)",
              "Number of complaints pending resolution at close of the year(FY 2023-24)",
              "Remark(FY 2023-24)",
            ],
            parent: true,
          },
          {
            text: "Overview of the entity’s material responsible business conduct issues", choices: null, isMandatory: false, parent: true, isNone: true
          },
          {
            text: "Please indicate material responsible business conduct and sustainability issues pertaining to environmental and social matters that present a risk or an opportunity to your business, rationale for identifying the same, approach to adapt or mitigate the risk along-with its financial implications, as per the following format.", choices: null, isMandatory: false, parent: false, type: "table", columns: [
              "S. No.",
              "Material issue identified",
              "Indicate whether risk or opportunity (R/O)",
              "Rationale for identifying the risk / opportunity",
              "In case of risk, approach to adapt or mitigate",
              "Financial implications of the risk or opportunity (Indicate positive or negative implications)"
            ],
          },
        ],
      },
      {
        key: "monitoring",
        quesSection: "Monitoring",
        questionsAnswer: "0/2",
        percentComplete: "0",
        question: [
          { text: "What percentage of electricity used at your site in the last calendar year came from renewable sources?", choices: ["0-25%", "26-50%", "51-75%", "76-100%"], isMandatory: true },
          { text: "What percentage of heating/cooling used at your site in the last calendar year came from renewable sources?", choices: ["0-25%", "26-50%", "51-75%", "76-100%"], isMandatory: true },
        ],
      },
    ]
  },
];