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
          { text: "Details of business activities (accounting for 90% of the turnover):", choices: ["Yes", "No", "In Progress"], isMandatory: false },
          { text: "Products/Services sold by the entity (accounting for 90% of the entity’s Turnover):", choices: null, isMandatory: false },
        ],
      },
      {
        key: "risk-screening",
        quesSection: "Risk Screening",
        questionsAnswer: "0/3",
        percentComplete: "0",
        question: [
          { text: "Do you have a sustainability risk assessment process for suppliers?", choices: ["Yes", "No", "In Progress", "Under development"], isMandatory: false },
          { text: "Are suppliers categorized based on sustainability risk levels (high, medium, low)?", choices: ["Yes", "No", "In Progress", "Under development"], isMandatory: false },
          {
            text: "What are the most significant sustainability risks across your supplier base?", choices: ["Environmental impacts",
              "Social impacts",
              "Governance and compliance risks",
              "Financial and market risks"], isMandatory: false
          },
          {
            text: "How frequently are high-risk suppliers monitored for compliance and improvements?", choices: ["Monthly",
              "Quarterly",
              "Annually",
              "Not monitored"], isMandatory: false
          },
        ],
      },
      {
        key: "certification-compliance",
        quesSection: "Certification Compliance",
        questionsAnswer: "0/3",
        percentComplete: "0",
        question: [
          {
            text: "Does your company hold any recognized environmental certifications?", choices: ["Yes, currently certified",
              "Certification in progress",
              "No, but planning to apply",
              "No, and no plans to apply"], isMandatory: false
          },
          {
            text: "Does your company hold any social certifications?", choices: ["Yes, currently certified",
              "Certification in progress",
              "No, but planning to apply",
              "No, and no plans to apply"], isMandatory: false
          },
          {
            text: "Does your company adhere to any sustainability reporting or management standards?", choices: ["Yes, currently certified",
              "Certification in progress",
              "No, but planning to apply",
              "No, and no plans to apply"], isMandatory: false
          },
          {
            text: "Does your company hold any governance or supply chain certifications?", choices: ["Yes, currently certified",
              "Certification in progress",
              "No, but planning to apply",
              "No, and no plans to apply"], isMandatory: false
          },
          {
            text: "How often are you audited for compliance with these certifications?", choices: ["Annually",
              "Bi-annually",
              "Less frequently",
              "Not audited"], isMandatory: false
          },
          {
            text: "Are there any additional certifications you are pursuing? If yes, please apply.", choices: null, isMandatory: false
          },
        ],
      },
      {
        key: "sustainbility-performance",
        quesSection: "Sustainability Performance",
        questionsAnswer: "0/3",
        percentComplete: "0",
        question: [
          {
            text: "Do you provide annual sustainability performance reports?", choices: ["Yes, public reports",
              "Yes, internal reports only",
              "No, but planning to start",
              "No, and no plans to start"], isMandatory: false
          },
          {
            text: "What KPIs do you use to measure your sustainability performance?", choices: ["Environmental Impact KPIs",
              "Resource Efficiency and Innovation KPIs",
              "Governance and Compliance KPIs",
              "Social and Economic Impact KPIs"], isMandatory: false
          },
          {
            text: "How transparent are you about your sustainability progress and challenges?", choices: ["Fully transparent",
              "Partially transparent",
              "Not transparent",
              "Committed to increasing transparency in the future"], isMandatory: false
          },
        ],
      },
      {
        key: "collabration-innovation",
        quesSection: "Collaboration & Innovation",
        questionsAnswer: "0/2",
        percentComplete: "0",
        question: [
          {
            text: "Do you engage in sustainability innovation (e.g., circular economy, low-carbon products)?", choices: ["Yes, fully engaged",
              "Partially engaged",
              "Not engaged",
              "Planning to engage in the near future"], isMandatory: false
          },
          {
            text: "What challenges do you face in improving sustainability performance", choices: ["Financial Constraints",
              "Technical Gaps",
              "Regulatory and Compliance Barriers",
              "Monitoring and Reporting Challenges"], isMandatory: false
          },
        ],
      },
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
          { text: "No. of locations where plants and/or operations/ offices of the entity are situated:", choices: null, isMandatory: true },
          { text: "Markets served by the entity(No. of Locations)", choices: null, isMandatory: true },
          { text: "What is the contribution of exports as a percentage of the total turnover of the entity?", choices: null, isMandatory: true },
          { text: "Markets served by the entity(A brief on types of customers)", choices: null, isMandatory: true },
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
          { text: "What is your current CDP score for Climate Change?", choices: null, isMandatory: false },
          { text: "What is your current CDP score for Water?", choices: null, isMandatory: false },
          { text: "What is your current CDP score for Forests?", choices: null, isMandatory: false },
        ],
      },
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
          { text: "How many products have undergone a carbon footprint assessment?", choices: null, isMandatory: true },
          { text: "What is the product name, type, and function?", choices: null, isMandatory: true },
          { text: "What is the weight or volume of the product? (kg/L)", choices: null, isMandatory: true },
          { text: "What is the declared carbon footprint of the product (kg CO2e)?", choices: null, isMandatory: true },
          { text: "What raw materials are used in production?", choices: null, isMandatory: false },
          { text: "Provide % of raw materials sourced locally, regionally, and internationally.", choices: null, isMandatory: false },
          { text: "What is the embodied carbon of the raw materials (kg CO2e) used in the product?", choices: null, isMandatory: false },
          { text: "Are suppliers certified for sustainable practices?", choices: ["Yes", "No", "In Progress", "Not applicable"], isMandatory: false },
          { text: "Do suppliers disclose their carbon footprint data? ", choices: ["Yes", "No", "In Progress", "Not applicable"], isMandatory: true },
          { text: "What is the average transport distance for raw materials and finished goods (km)?", choices: null, isMandatory: false },
          { text: "Are logistics providers certified for sustainability? ", choices: ["Yes", "No", "In Progress", "Not applicable"], isMandatory: false },
          { text: "What is the total energy consumption (kWh) during production?", choices: null, isMandatory: true },
          { text: "What percentage of energy used during production comes from renewable sources?", choices: null, isMandatory: false },
          { text: "Are emissions mitigation technologies employed?", choices: ["Yes", "No", "In Progress", "Not applicable"], isMandatory: false },
          { text: "What emissions are associated with end-of-life processes (kg CO2e)?", choices: null, isMandatory: false },


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
          { text: "Does your company hold an ISO 14001 certification for environmental management?", choices: ["Yes", "No", "In Progress", "Not applicable"], isMandatory: true },
          { text: "Has your company obtained any other environmental management system certifications, eg EMAS (Eco-Management and Audit Scheme) ?", choices: null, isMandatory: true },
          { text: "Does your company hold an ISO 50001 certification for energy management?", choices: ["Yes", "No", "In Progress", "Not applicable"], isMandatory: true },
          { text: "Has your company obtained any other energy-related certifications/framework (e.g., IPMVP – International Performance Measurement and Verification Protocol)?", choices: null, isMandatory: true },

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
          { text: "Does your company have a formal environmental policy that includes a commitment to legal compliance, continuous measurement, and continuous improvement in environmental performance?", choices: null, isMandatory: true },
          {
            text: "Which of the following areas are included in your environmental policy?", choices: ["Legal compliance",
              "Continuous measurement of environmental performance",
              "Continuous improvement in environmental performance",
              "Waste management",
              "Water management",
              "Resource efficiency",
              "Biodiversity conservation",
              "Energy management",
              "Other (please specify)"], isMandatory: false
          },
          { text: "Does your company organize training for employees on the environmental policy?", choices: ["Yes", "No", "In Progress", "Not applicable"], isMandatory: true },
          { text: "Does your site have an environmental management system (EMS) in place?", choices: ["Yes", "No", "In Progress", "Not applicable"], isMandatory: true },
          { text: "Does your site have an energy management system (EnMS) in place?", choices: ["Yes", "No", "In Progress", "Not applicable"], isMandatory: true },
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