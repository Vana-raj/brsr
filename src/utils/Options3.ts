import { Row } from "antd";

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

export const allCategories3 = [
  {
    key: "business",
    section: "C-I.Principle 1",
    questionsAnswer: "1/3",
    percentComplete: "40%",
    questions: [
      {
        key: "business",
        quesSection: "Principle 1 : Businesses should conduct and govern themselves with integrity, and in a manner that is Ethical, Transparent and Accountable",
        questionsAnswer: "0/9",
        percentComplete: "0",
        section: "C I",
        question: [
          {
            text: "Percentage coverage by training and awareness programmes on any of the Principles during the financial year:", choices: null, isMandatory: true, parent: true,
            type: "table",
            label: "Percentage",
            columns: [
        "Segment",
        "Total number of training and awareness programmes held",
        "Topics / principles covered under the training and its impact",
        "% of persons in respective category covered by the awareness programmes"
            ],
          },

          { text: "Details of fines / penalties /punishment/ award/ compounding fees/ settlement amount paid in proceedings (by the entity or by directors / KMPs) with regulators/ law enforcement agencies/ judicial institutions, in the financial year, in the following format (Note: the entity shall make disclosures on the basis of materiality as specified in Regulation 30 of SEBI (Listing Obligations and Disclosure Obligations) Regulations, 2015 and as disclosed on the entity’s website", choices: null, isMandatory: true, parent: true,label: "Percentage",
 },
          {
            text: "Monetary", choices: null, isMandatory: true, parent: true,
            type: "table",
            label: "Percentage",
            columns: [
        "Category",
        "NGRBC Principle",
        "Name of the regulatory/ enforcement agencies/ judicial institutions",
        "Amount (In INR)",
        "Brief of the Case",
        "Has an appeal been preferred? (Yes/No)"
            ],
          },
          {
            text: "Non-Monetary", choices: null, isMandatory: true, parent: true,
            type: "table",
            label: "Percentage",
            columns: [
        "Category",
        "NGRBC Principle",
        "Name of the regulatory/ enforcement agencies/ judicial institutions",
        "Brief of the Case",
        "Has an appeal been preferred? (Yes/No)"
            ],
          },
          {
            text: "Of the instances disclosed in Question 2 above, details of the Appeal/ Revision preferred in cases where monetary or non-monetary action has been appealed.", choices: null, isMandatory: true, parent: true,
            type: "table",
            label: "Percentage",
            columns: [
              "Case Details",
              "Name of the regulatory/ enforcement agencies/ judicial institutions",
            ],

          },
          { text: "Does the entity have an anti-corruption or anti-bribery policy? If yes, provide details in brief and if available, provide a web-link to the policy.", choices: null, isMandatory: true, parent: true },

          {
            text: "Number of Directors/KMPs/employees/workers against whom disciplinary action was taken by any law enforcement agency for the charges of bribery/ corruption", choices: null, isMandatory: true, parent: true,
            type: "table",
            columns: [
        "catagory",
        "FY 2023-2024",
        "FY 2022-2023"
            ],


          },
          {
            text: "Details of complaints with regard to conflict of interest", choices: null, isMandatory: true, parent: true,
            type: "table",
            columns: [
        "category",
        "FY 2023-2024 Number",
        "FY 2023-2024 Remarks",
        "FY 2022-2023 numbers",
        "FY 2022-2023 Remarks"
            ],
            row: [
              "Number of complaints received in relation to issues of Conflict of Interest of the Directors",
              "Number of complaints received in relation to issues of Conflict of Interest of the KMPs",
            ]

          },
          { text: "Provide details of any corrective action taken or underway on issues related to fines / penalties / action taken by regulators/ law enforcement agencies/ judicial institutions, on cases of corruption and conflicts of interest.", choices: null, isMandatory: true, parent: true },
          {
            text: "Number of days of accounts payables ((Accounts payable *365) / Cost of goods/services procured) in the following format:", choices: null, isMandatory: true, parent: true,
            type: "table",
            columns: [
        "Particulars",
        "FY 2023 -24 (Current Financial year)",
        "FY 2022 -23 (Previous Financial year)"

            ],
            rows: [
              "Number of days of accounts payables",
            ]
          },

          {
            text: "Provide details of concentration of purchases and sales with trading houses, dealers, and related parties along-with loans and advances & investments, with related parties, in the following format:", choices: null, isMandatory: true, parent: true,
            type: "table",
            columns: [
        "Parameter",
        "Metrics",
        "FY 2023-2024",
        "FY 2022-2023"

            ],
            rows: [
              "Concentration of Purchases",
              "Concentration of Sales",
              "Share of RPTs in",
            ]

          },


          {
            text: "Awareness programmes conducted for value chain partners on any of the Principles during the financial year:", choices: null, isMandatory: false, parent: true,
            type: "table",
            columns: [
        "Total no of awareness programs held",
        "Topics / principles covered under the training",
        "% of value chain partners covered (by value of business done withsuch partners) under the awarenessprogrammes"

            ],
          },
          {
            text: "Does the entity have processes in place to avoid/ manage conflict of interests involving members of the Board? (Yes/No) If Yes, provide details of the same.", choices: null, isMandatory: false, parent: true
          },

        ],
      },
    ],
  },
  {
    key: "sustainable_and_safe",
    section: "C-II.Principle 2",
    questionsAnswer: "3/3",
    percentComplete: "90%",
    questions: [
      {
        key: "sustainable_and_safe",
        quesSection: "Principle 2 : Businesses should provide goods and services in a manner that is sustainable and safe",
        questionsAnswer: "0/4",
        percentComplete: "0",
        section: "C II",
        question: [
          {
            text: "Percentage of R&D and capital expenditure (capex) investments in specific technologies to improve the environmental and social impacts of product and processes to total R&D and capex investments made by the entity, respectively.", choices: null, isMandatory: true,
            type: "table",
            label: "",
            parent: true,
            columns: [
              "Category",
              "FY 2024-25(Current Financial Year)",
              "FY 2023-24(Previous Financial Year)",
              "Details of improvements in environmental and social impacts",
            ],

          },

          { text: "Does the entity have procedures in place for sustainable sourcing? (Yes/No)", choices: null, isMandatory: true, parent: true },
          { text: "If yes, what percentage of inputs were sourced sustainably?", choices: null, isMandatory: true, parent: true },
          { text: "Describe the processes in place to safely reclaim your products for reusing, recycling and disposing at the end of life, for :", choices: null, isMandatory: true, parent: true },
          { text: "Whether Extended Producer Responsibility (EPR) is applicable to the entity’s activities (Yes / No). If yes, whether the waste collection plan is in line with the Extended Producer Responsibility (EPR) plan submitted to Pollution Control Boards? If not, provide steps taken to address the same.", choices: null, isMandatory: true, parent: true },
          {
            text: "Has the entity conducted Life Cycle Perspective / Assessments (LCA) for any of its products (for manufacturing industry) or for its services (for service industry)? If yes, provide details in the following format?", choices: null, isMandatory: false, parent: true,
            type: "table",
            label: "",
            columns: [
              "S.No",
              "NIC Code",
              "Name of Product /Service",
              "% of total Turnover contributed",
              "Boundary for which the Life Cycle Perspective / Assessment was conducted",
              "Whether conducted by independent external agency(Yes/No)",
              "Results communicated in public domain (Yes/No). If yes, provide the web-link."

            ],
          },
          {
            text: "If there are any significant social or environmental concerns and/or risks arising from production or disposal of your products / services, as identified in the Life Cycle Perspective / Assessments (LCA) or through any other means, briefly describe the same along-with action taken to mitigate the same.", choices: null, isMandatory: false, parent: true,
            type: "table",
            label: "",
            columns: [
              "Name of Product / Service",
              "Description of the risk / concern",
              "Action Taken"
            ],

          },
          {
            text: "Percentage of recycled or reused input material to total material (by value) used in production (for manufacturing industry) or providing services (for service industry)", choices: null, isMandatory: false, parent: true,
            type: "table",
            label: "",
            columns: [
              "Indicate input material",
              "Recycled or re-used input material to total material(FY 2024-25(Current Financial Year))",
              "Recycled or re-used input material to total material(FY 2023-24(Previous Financial Year))",
            ],
          },
          {
            text: "Of the products and packaging reclaimed at end of life of products, amount (in metric tonnes) reused, recycled, and safely disposed, as per the following format:", choices: null, isMandatory: false, parent: true,
            type: "table",
            label: "",
            columns: [
              "Category",
              "Reused FY 2024-25",
              "Recycled FY 2024-25",
              "Safely Disposed FY 2024-25",
              "Reused FY 2022-23",
              "Recycled FY 2022-23",
              "Safely Disposed FY 2022-23"

            ],


          },
          {
            text: "Reclaimed products and their packaging materials (as percentage of products sold) for each product category.", choices: null, isMandatory: false, parent: true,
            type: "table",
            label: "",
            columns: [
              "Indicate product category",
              "Reclaimed products and their packaging materials as % of total products sold in respective category",

            ],
            Row: [""]

          },
        ],
      },


    ],
  },
  {
    key: "value chains",
    section: "C-III.Principle 3",
    questionsAnswer: "1/3",
    percentComplete: "40%",
    questions: [
      {
        key: "value chains",
        quesSection: "Principle 3 : Businesses should respect and promote the well-being of all employees, including those in their value chains",
        questionsAnswer: "0/3",
        percentComplete: "0",
        section: "C III",
        question: [
          // { text: "Details of measures ", choices: null, isMandatory: true, parent: true, isNone: true },

          {
            text: "Details of measures for the well-being of employees:", choices: null, isMandatory: true, parent: true,
            type: "table",
            label: "",
            columns: [
        "Category",
        "Total (A)",
        "Health insurance (Number (B))",
        "Health insurance (% (B / A))",
        "Accident insurance (Number (C))",
        "Accident insurance (% (C / A))",
        "Maternity Benefits (Number (D))",
        "Maternity Benefits (% (D / A))",
        "Paternity Benefits (Number (E))",
        "Paternity Benefits (% (E / A))",
        "Day Care Facilities (Number (F))",
        "Day Care Facilities (% (F / A))"

            ],
            rows: [
              "Permanent Workers (Male )",
              "Permanent Workers (Female)",
              "Permanent Workers (Total)",
              "Other than Permanent Workers (Male )",
              "Other than Permanent Workers (Female)",
              "Other than Permanent Workers (Total)",
            ]

          },
          {
            text: "Details of measures for the well-being of workers:", choices: null, isMandatory: true, parent: true
            , type: "table",
            label: "",
            columns: [
        "Category",
        "Total (A)",
        "Health insurance (Number (B))",
        "Health insurance (% (B / A))",
        "Accident insurance (Number (C))",
        "Accident insurance (% (C / A))",
        "Maternity Benefits (Number (D))",
        "Maternity Benefits (% (D / A))",
        "Paternity Benefits (Number (E))",
        "Paternity Benefits (% (E / A))",
        "Day Care Facilities (Number (F))",
        "Day Care Facilities (% (F / A))"

            ],
            rows: [
              "Permanent Employees (Male )",
              "Permanent Employees (Female)",
              "Permanent Employees (Total)",
              "Other than Permanent Workers (Male )",
              "Other than Permanent Workers (Female)",
              "Other than Permanent Workers (Total)",
            ]


          },
          // {
          //   text: "Spending on measures towards well-being of employees and workers (including permanent and other than permanent) in the following format –", choices: null, isMandatory: true, parent: true
          //   ,
          //   type: "table",
          //   label: "",
          //   columns: [
          //     "Category",
          //     "FY 2043-25(Current Financial Year)",
          //     "FY 2023-24(Previous Financial Year)"

          //   ],
          //   rows: [
          //     "Cost incurred on wellbeing measures as a % of total revenue of the company",
          //   ]

          // }
          ,
          {
            text: "Details of retirement benefits, for Current and Previous FY", choices: null, isMandatory: true
            , parent: true,
            type: "table",
            label: "",
            columns: [
        "Benefits",
        "No. of employees covered as a % of total employees",
        "No. of workers covered as a % of total workers",
        "Deducted and deposited with the authority(Y/N/N.A.)",
        "No. of employees covered as a % of total employees",
        "No. of workers covered as a % of total worker",
        "Deducted and deposited with the authority(Y/N/N.A.)"
                  ],
            rows: [
              "PF",
              "Gratuity",
              "ESI",
              "Others - please specify"
            ]

          },
          { text: "Accessibility of workplaces", choices: null, isMandatory: true, parent: true },
          { text: "Does the entity have an equal opportunity policy as per the Rights of Persons with Disabilities Act, 2016? If so, provide a web-link to the policy.", choices: null, isMandatory: true, parent: true },
          {
            text: "Return to work and Retention rates of permanent employees and workers that took parental leave.", choices: null, isMandatory: true,parent: true,
            type: "table",
            label: "",
            columns: [
            "Gender",
            "Return to work rate",
            "Retention rate",
            "Return to work rate",
            "Retention rate"   

            ],
            rows: [
              "Male",
              "Female",
              "Total",
            ]

          },
          {
            text: "Is there a mechanism available to receive and redress grievances for the following categories of employees and worker? If yes, give details of the mechanism in brief", choices: null, isMandatory: true
            , parent: true,
            type: "table",
            label: "",
            columns: [
            "Particulars",
            "Yes/No(If Yes, then give details of the mechanism in brief)"

            ],
            rows: [
              "Permanent Workers",
              "Other than Permanent Workers",
              "Permanent Employees",
              "Other than Permanent Employees",
            ]

          },
          {
            text: "Membership of employees and worker in association(s) or Unions recognised by the listed entity:", choices: null, isMandatory: true, parent: true
            , type: "table",
            label: "",
            columns: [
            "category",
            "FY 2024-25(Current Financial Year)-(Total employees / workers in respective category(A))",
            "FY 2024-25(Current Financial Year)-(No. of employees / workers in respective category, who are part of association(s) or Union(B))",
            "FY 2024-25(Current Financial Year)-(% (B / A))",
            "FY 2023-24(Previous Financial Year)-(Total employees / workers in respective category(C))",
            "FY 2023-24(Previous Financial Year)-(No. of employees / workers in respective category, who are part of association(s) or Union(D))",
            "FY 2023-24(Previous Financial Year)-(% (D / C))"

            ],
            rows: [
              "Total Permanent Employees (Male)",
              "Total Permanent Employees (Female)",
              "Total Permanent Workers (Male)",
              "Total Permanent Workers (Female)",

            ]
          },
          {
            text: "Details of training given to employees and workers:", choices: null, isMandatory: true, parent: true
            ,
            type: "table",
            label: "",
            columns: [
            "category",
            "Total (A)",
            "On Health and safety measures (No. (B))",
            "On Health and safety measures (% (B / A))",
            "On Skill upgradation (No. (C))",
            "On Skill upgradation (% (C / A))",
            "Total (D)",
            "On Health and safety measures (No. (E))",
            "On Health and safety measures (% (E / D))",
            "On Skill upgradation (No. (F))",
            "On Skill upgradation (% (F / D))"
            ],
            rows: [
              "FY 2023-24(Current Financial Year)",
              "Empolyees (Male)",
              "Employees (Female)",
              "Employees (Total)",
              "Workers (Male)",
              "Workers (Female)",
              "Workers (Total)",

              "FY 2022-23(Previous Financial Year)",
              "Employees (Female)",
              "Employees (Total)",
              "Workers (Male)",
              "Workers (Female)",
              "Workers (Total)",
            ]
          },
          {
            text: "Details of performance and career development reviews of employees and workers:", choices: null, isMandatory: true, parent: true
            ,
            type: "table",
            label: "",
            columns: [
        "category",
        "FY 2024-25(Current Financial Year)-(Total (A))",
        "FY 2024-25(Current Financial Year)-(No. (B))",
        "FY 2024-25(Current Financial Year)-(% (B / A))",
        "FY 2023-24(Previous Financial Year)-(Total (C))",
        "FY 2023-24(Previous Financial Year)-(No. (D))",
        "FY 2023-24(Previous Financial Year)-(% (D / C))"        
            ],
            rows: [
              "Total Permanent Employees (Male)",
              "Total Permanent Employees (Female)",
              "Total Permanent Employees (Total)",
              "Total Permanent Workers(Male)",
              "Total Permanent Workers(Female)",
              "Total Permanent Workers(Total)",

            ]



          },
          
          // { text: "Health and safety management system:", choices: null, isMandatory: true, parent: true},
          { text: "Whether an occupational health and safety management system has been implemented by the entity? (Yes/ No). If yes, the coverage such system?", choices: null, isMandatory: true, parent: true },
          { text: "What are the processes used to identify work-related hazards and assess risks on a routine and non-routine basis by the entity?", choices: null, isMandatory: true, parent: true },
          { text: "Whether you have processes for workers to report the work related hazards and to remove themselves from such risks. (Y/N)", choices: null, isMandatory: true, parent: true },
          { text: "Do the employees/ worker of the entity have access to non-occupational medical and healthcare services? (Yes/ No)", choices: null, isMandatory: true, parent: true },

          {
            text: "Details of safety related incidents, in the following format:", choices: null, isMandatory: true,parent: true,
            type: "table",
            label: "",
            columns: [
            "Safety Incident/Number",
            "Category",
            "FY 2022",
            "FY 2021"

            ],
            rows: [
              "Lost Time Injury Frequency Rate (LTIFR) (per one million-person hours worked)",
              "Total recordable work-related injuries",
              "No. of fatalities",
              "High consequence work-related injury or ill-health (excluding fatalities)",
            ]

          },
          { text: "Describe the measures taken by the entity to ensure a safe and healthy work place", choices: null, isMandatory: true, parent: true },
          {
            text: "Number of Complaints on the following made by employees and workers:", choices: null, isMandatory: true
            , parent: true,
            type: "table",
            label: "",
            columns: [
            "Category",
            "Filed during the year",
            "Pending resolution at the end of year",
            "Remarks",
            "Filed during the year",
            "Pending resolution at the end of year",
            "Remarks"

            ],
            rows: [
              "Category",
              "Working Conditions",
              "Health & Safety",
            ]

          },
          {
            text: "Assessments for the year:", choices: null, isMandatory: true
            , parent: true,
            type: "table",
            label: "",
            columns: [
            "Category",
            "% of your plants and offices that were assessed (by entity or statutory authorities or third parties"
            ],
            rows: [
              "Health & Safety Practices",
              "Working Conditions"
            ]

          },
          { text: "Provide details of any corrective action taken or underway to address safety-related incidents (if any) and on significant risks / concerns arising from assessments of health & safety practices and working conditions.", choices: null, isMandatory: true, parent: true },

          { text: "Does the entity extend any life insurance or any compensatory package in the event of death of (A) Employees (Y/N)", choices: null, isMandatory: false, parent: true },

          { text: "Provide the measures undertaken by the entity to ensure that statutory dues have been deducted and deposited by the value chain partners", choices: null, isMandatory: false, parent: true },
          {
            text: "Provide the number of employees / workers having suffered high consequence work-related injury / ill-health / fatalities (as reported in Q11 of Essential Indicators above), who have been are rehabilitated and placed in suitable employment or whose family members have been placed in suitable employment:", choices: null, isMandatory: false, parent: true
            ,
            type: "table",
            label: "",
            columns: [
              "Category",
              "Total no. of affected employees/ workers (FY 2024-25(Current Financial Year))",
              "Total no. of affected employees/ workers (FY 2023-24(Previous Financial Year))",
              "No. of employees/workers that are rehabilitated and placed in suitable employment or whose family members have been placed in suitable employment (FY 2024-25(Current Financial Year))",
              "No. of employees/workers that are rehabilitated and placed in suitable employment or whose family members have been placed in suitable employment (FY 2023-24(Previous Financial Year))"

            ],
            rows: [
              "Employees",
              "Workers",
            ]



          },
          { text: "Does the entity provide transition assistance programs to facilitate continued employability and the management of career endings resulting from retirement or termination of employment? (Yes/ No)", choices: null, isMandatory: false, parent: true },
          {
            text: "Details on assessment of value chain partners:", choices: null, isMandatory: false, parent: true
            ,
            type: "table",
            label: "",
            columns: [
              "Category",
              "% of value chain partners (by value of business done with such partners) that were assessed",
            ],
            rows: [
              "Health & Safety Practices",
              "Working Conditions"
            ]

          },
          { text: "Provide details of any corrective actions taken or underway to address significant risks / concerns arising from assessments of health and safety practices and working conditions of value chain partners.", choices: null, isMandatory: false, parent: true },
        ],
      },
    ]
  },
  {
    key: "operations",
    section: "C-IV.Principle 4",
    questionsAnswer: "1/3",
    percentComplete: "40%",
    questions: [
      {
        key: "stakeholders",
        quesSection: "Principle 4 : Businesses should respect the interests of and be responsive to all its stakeholders",
        questionsAnswer: "0/3",
        percentComplete: "0",
        section: "C IV",
        question: [
          { text: "Describe the processes for identifying key stakeholder groups of the entity.", choices: null, isMandatory: false, parent: true },
          {
            text: "List stakeholder groups identified as key for your entity and the frequency of engagement with each stakeholder group.", choices: null, isMandatory: true
            , parent: true,
            type: "table",
            label: "",
            columns: [
        "Stakeholder Group",
        "Whether identified as Vulnerable & Marginalized Group (Yes/No)",
        "Channels of communication(Email, SMS, Newspaper, Pamphlets, Advertisement, Community Meetings, Notice Board, Website), Other",
        "Frequency of engagement(Annually/ Half yearly/ Quarterly / others – please specify)",
        "Purpose and scope of engagement including key topics and concerns raised during such engagement",
            ],
            rows: [
              "",
              "",
              "",
              "",
              ""
            ]

          },
          { text: "Provide the processes for consultation between stakeholders and the Board on economic, environmental, and social topics or if consultation is delegated, how is feedback from such consultations provided to the Board.", choices: null, isMandatory: false, parent: true },
          { text: "Whether stakeholder consultation is used to support the identification and management of environmental, and social topics (Yes / No). If so, provide details of instances as to how the inputs received from stakeholders on these topics were incorporated into policies and activities of the entity", choices: null, isMandatory: false, parent: true },
          { text: "Provide details of instances of engagement with, and actions taken to, address the concerns of vulnerable/ marginalized stakeholder groups.", choices: null, isMandatory: false, parent: true },

        ],
      },
    ]
  },
  {
    key: "rights",
    section: "C-V.Principle 5",
    questionsAnswer: "1/3",
    percentComplete: "40%",
    questions: [

      {
        key: "rights-innovation",
        quesSection: "Principle 5 : Businesses should respect and promote human rights",
        questionsAnswer: "0/2",
        percentComplete: "0",
        section: "C V",
        question: [
          {
            text: "Employees and workers who have been provided training on human rights issues and policy(ies) of the entity, in the following format:", choices: null, isMandatory: true, parent: true
            ,
            type: "table",
            label: "",
            columns: [
            "Category",
            "FY 2024-25Current Financial Year (Total (A))",
            "FY 2024-25Current Financial Year (No. of employees / workers covered (B))",
            "FY 2024-25Current Financial Year (% (B / A))",
            "FY 2023-24Previous Financial Year (Total (C))",
            "FY 2023-24Previous Financial Year (No. of employees / workers covered (D))",
            "FY 2023-24Previous Financial Year (% (D / C))                  "
            ],
            rows: [
              "Employees (Permanent)",
              "Employees (Other than permanent)",
              "Employees (Total)",
              "Workers (Permanent)",
              "Workers (Other than permanent)",
              "Workers (Total)",
            ]

          },
          {
            text: "Details of minimum wages paid to employees and workers, in the following format:", choices: null, isMandatory: true, parent: true,
            type: "table",
            label: "",
            columns: [
        "Category",
        "Total (A)",
        "Equal to Minimum Wage (No. (B))",
        "Equal to Minimum Wage (% (B / A))",
        "More than Minimum Wage (No. (C))",
        "More than Minimum Wage (% (C / A))",
        "Total (D)",
        "Equal to Minimum Wage (No. (E))",
        "Equal to Minimum Wage (% (E / D))",
        "More than Minimum Wage (No. (F))",
        "More than Minimum Wage (% (F / D))"
            ],
            rows: [
              "Employees (Permanent)",
              "Employees (Male)",
              "Employees (Female)",
              "Employees (Other then permanent)",
              "Employees (Male)",
              "Employees (Female)",
              "Employees (Total)",
              "Workers (Permanent)",
              "Workers (Male)",
              "Workers (Female)",
              "Workers (Other then permanent)",
              "Workers (Male)",
              "Workers (Female)",
              "Workers (Total"


            ]

          },
          // { text: "Details of remuneration/salary/wages", choices: null, isMandatory: true, isNone: true, parent: true },
          {
            text: "Details of remuneration/salary/wages", choices: null, isMandatory: true, parent: true
            ,
            type: "table",
            label: "",
            columns: [
            "category",
            "2023-24 Male Number",
            "2023-24 Male Median remuneration/ salary/ wages of respective category",
            "2023-24 Female Number",
            "2023-24 Female Median remuneration/ salary/ wages of respective category",
            "2022-23 Male Number",
            "2022-23 Male Median remuneration/ salary/ wages of respective category",
            "2022-23 Female Number",
            "2022-23 Female Median remuneration/ salary/ wages of respective category",
            ],
            rows: [
              "Board of Directors (BoD)",
              "Key Managerial Personnel",
              "Employees other than BoD and KMP",
              "Workers",
            ]

          },
          { text: "Do you have a focal point (Individual/ Committee) responsible for addressing human rights impacts or issues caused or contributed to by the business? (Yes/ No)", choices: null, isMandatory: true, parent: true },
          { text: "Describe the internal mechanisms in place to redress grievances related to human rights issues.", choices: null, isMandatory: true, parent: true },
          {
            text: "Number of Complaints on the following made by employees and workers:", choices: null, isMandatory: true,
            parent: true,
            type: "table",
            label: "",
            columns: [
              "Category",
              "FY 2024-25Current Financial Year (Filed during the year)",
              "FY 2024-25Current Financial Year (Pending resolution at the end of year)",
              "FY 2024-25Current Financial Year (Remarks)",

              "FY 2023-24Previous Financial Year (Filed during the year)",
              "FY 2023-24Previous Financial Year (Pending resolution at the end of year)",
              "FY 2023-24Previous Financial Year (Remarks)",

            ],
            rows: [
              "Sexual Harassment",
              "Discrimination at workplace",
              "Child Labour",
              "Forced Labour/Involuntary Labour",
              "Wages",
              "Other human rights related issues"
            ]

          },
          {
            text: "Complaints filed under the Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013, in the following format:", choices: null, isMandatory: true, parent: true
            ,
            type: "table",
            label: "",
            columns: [
            "Category",
            "FY 2024-25(Current Financial Year)",
            "FY 2023-24(Previous Financial Year)"

            ],
            rows: [
              "Total Complaints reported under Sexual Harassment on of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013 (POSH) ",
              "Complaints on POSH as a % of female employees / workers ",
              "Complaints on POSH upheld",
            ]



          },
          { text: "Mechanisms to prevent adverse consequences to the complainant in discrimination and harassment cases.", choices: null, isMandatory: true, parent: true },
          { text: "Do human rights requirements form part of your business agreements and contracts? (Yes/ No)", choices: null, isMandatory: true, parent: true },
          {
            text: "Assessments for the year:", choices: null, isMandatory: true, parent: true
            ,
            type: "table",
            label: "",
            columns: [
            "Category",
            "% of your plants and offices that were assessed (by entity or statutory authorities or third parties)"

            ],
            rows: [
              "Child labour",
              "Forced/involuntary labour",
              "Sexual harassment",
              "Discrimination at workplace",
              "Wages",
              "Others – please specify",
            ]



          },
          { text: "Provide details of any corrective actions taken or underway to address significant risks / concerns arising from the assessments at Question 10 above.", choices: null, isMandatory: true, parent: true },
          { text: "Details of a business process being modified / introduced as a result of addressing human rights grievances/complaints.", choices: null, isMandatory: false, parent: true },
          { text: "Details of the scope and coverage of any Human rights due-diligence conducted", choices: null, isMandatory: false, parent: true },
          { text: "Is the premise/office of the entity accessible to differently abled visitors, as per the requirements of the Rights of Persons with Disabilities Act, 2016?", choices: null, isMandatory: false, parent: true },
          {
            text: "Details on assessment of value chain partners:", choices: null, isMandatory: false, parent: true
            ,
            type: "table",
            label: "",
            columns: [
            "Category",
            "% of value chain partners (by value of business done with such partners) that were assessed"

            ],
            rows: [
              "Child labour",
              "Forced/involuntary labour",
              "Sexual harassment",
              "Discrimination at workplace",
              "Wages",
              "Others – please specify"
            ]
          },
          { text: "Provide details of any corrective actions taken or underway to address significant risks / concerns arising from the assessments at Question 4 above.", choices: null, isMandatory: false, parent: true },

        ],
      },
    ]
  },
  {
    key: "environment",
    section: "C-VI.Principle 6",
    questionsAnswer: "1/3",
    percentComplete: "40%",
    questions: [
      {
        key: "environment",
        quesSection: "Principle 6 : Businesses should respect and make efforts to protect and restore the environment",
        questionsAnswer: "0/0",
        percentComplete: "0",
        section: "C VI",
        question: [
          {
            text: "Details of total energy consumption (in Joules or multiples) and energy intensity, in the following format:", choices: null, isMandatory: true, parent: true
            ,
            type: "table",
            label: "",
            columns: [
        "Parameter",
        "FY 2024-25(Current Financial Year)",
        "FY 2023-24(Previous Financial Year)"

            ],
            rows: [
              "From renewable sources",
              "Total electricity consumption (A)",
              "Total fuel consumption (B)",
              "Energy consumption through other sources (C)",
              "Total energy consumed from renewable sources (A+B+C)",
              "From non-renewable sources",
              "Total electricity consumption (D)",
              "Total fuel consumption (E)",
              "Energy consumption through other sources (F)",
              "Total energy consumed from non-renewable sources (D+E+F)",
              "Total energy consumed (A+B+C+D+E+F)",
              "Energy intensity per rupee of turnover(Total energy consumed / Revenue from operations)",
              "Energy intensity per rupee of turnover adjusted for Purchasing Power Parity (PPP)(Total energy consumed / Revenue from operations adjusted for PPP)",
              "Energy intensity in terms of physical output",
              "Energy intensity (optional) – the relevant metric may be selected by the entity",
              "Note: Indicate if any independent assessment/ evaluation/assurance has been carried out by an external agency? (Y/N) If yes, name of the external agency.",
            ]



          },
          { text: "Does the entity have any sites / facilities identified as designated consumers (DCs) under the Performance, Achieve and Trade (PAT) Scheme of the Government of India? (Y/N) If yes, disclose whether targets set under the PAT scheme have been achieved. In case targets have not been achieved, provide the remedial action taken, if any.", choices: null, isMandatory: true, parent: true },
          {
            text: "Provide details of the following disclosures related to water, in the following format:", choices: null, isMandatory: true, parent: true
            ,
            type: "table",
            label: "",
            columns: [
            "Parameter",
            "FY 2023-2024",
            "FY 2022-2023"

            ],
            rows: [
              "Surface water",
              "Groundwater",
              "Third party water",
              "Seawater / desalinated water",
              "Other",
              "Total volume of water withdrawal (in kilolitres) (i + ii + iii + iv + v)",
              "Total volume of water consumption (in kilolitres)",
              "Water intensity per rupee of turnover (Water consumed / REVENUE FROM OPERATIONS)",
              "Water intensity per rupee of turnover adjusted for Purchasing Power Parity (PPP)(Total water consumption / Revenue from operations adjusted for PPP)",
              "Water intensity in terms of physical output",
              "Water intensity (optional) – the relevant metric may be selected by the entity",
              "Note: Indicate if any independent assessment/ evaluation/assurance has been carried out by an external agency? (Y/N) If yes, name of the external agency."
            ]


          },
          {
            text: "Provide the following details related to water discharged:", choices: null, isMandatory: true, parent: true
            ,
            type: "table",
            label: "",
            columns: [
            "Parameter",
            "FY 2023-2024",
            "FY 2022-2023"

            ],
            rows: [
              "Water discharge by destination and level of treatment (in kilolitres)",
              "(i) To Surface water",
              "'- No treatment",
              "'- With treatment – please specify level of treatment",
              "(ii) To Groundwater",
              "'- No treatment",
              "'- With treatment – please specify level of treatment",
              "(iii) To Seawater",
              "'- No treatment",
              "'- With treatment – please specify level of treatment",
              "(iv) Sent to third-parties ",
              "'- No treatment",
              "'- With treatment – please specify level of treatment",
              "(v) Others",
              "'- No treatment",
              "'- With treatment – please specify level of treatment",
              "Total water discharged (in kilolitres) ",

            ]

          },
          { text: "Has the entity implemented a mechanism for Zero Liquid Discharge? If yes, provide details of its coverage and implementation", choices: null, isMandatory: true, parent: true },
          {
            text: "Please provide details of air emissions (other than GHG emissions) by the entity, in the following format:", choices: null, isMandatory: true, parent: true
            , type: "table",
            label: "",
            columns: [
              "Parameter",
              "Please specify unit",
              "FY 2024-25(Current Financial Year)",
              "FY 2023-24(Previous Financial Year)",
              ""

            ],
            rows: [
              "NOx",
              "SOx",
              "Particulate Matter (PM)",
              "Persistent organic pollutants (POP)",
              "Volatile organic compounds (VOC)",
              "Hazardous air pollutants (HAP)",
              "Others – please specify",
              "Note: Indicate if any independent assessment/ evaluation/assurance has been carried out by an external agency? (Y/N) If yes, name of the external agency"
            ]


          },
          {
            text: "Provide details of greenhouse gas emissions (Scope 1 and Scope 2 emissions) & its intensity, in the following format:", choices: null, isMandatory: true, parent: true
            ,
            type: "table",
            label: "",
            columns: [
              "Parameter",
              "Unit",
              "FY 2023-24(Current Financial Year)",
              "FY 2022-23(Previous Financial Year)"
            ],
            rows: [
              "Total Scope 1 emissions (Break-up of the GHG into CO2, CH4, N2O, HFCs, PFCs, SF6, NF3, if available)",
              "Total Scope 2 emissions(Break-up of the GHG into CO2, CH4, N2O, HFCs, PFCs, SF6, NF3, if available)",
              "Total Scope 1 and Scope 2 emission intensity per rupee of turnover(Total Scope 1 and Scope 2 GHG emissions / Revenue from operations)",
              "Total Scope 1 and Scope 2 emission intensity per rupee of turnover adjusted for Purchasing Power Parity (PPP)(Total Scope 1 and Scope 2 GHG emissions / Revenue from operations adjusted for PPP)",
              "Total Scope 1 and Scope 2 emission intensity in terms of physical output",
              "Total Scope 1 and Scope 2 emission intensity (optional) – the relevant metric may be selected by the entity",
              "Note: Indicate if any independent assessment/ evaluation/assurance has been carried out by an external agency? (Y/N) If yes, name of the external agency.",
            ]



          },
          { text: "Does the entity have any project related to reducing Green House Gas emission? If Yes, then provide details.", choices: null, isMandatory: true, parent: true },
          {
            text: "Provide details related to waste management by the entity, in the following format:", choices: null, isMandatory: true, parent: true
            ,
            type: "table",
            label: "",
            columns: [
              "Total Waste generated (in metric tonnes)",
              "FY 2023 - 2024",
              "FY 2022 – 2023"

            ],
            rows: [
              "Total Waste generated (in metric tonnes)",
              "Plastic waste (A)",
              "E-waste (B)",
              "Bio-medical waste ©",
              "Construction and demolition waste (D)",
              "Battery waste (E)",
              "Radioactive waste (F)",
              "Other Hazardous waste. Please specify, if any. (G)",
              "Other Non-hazardous waste generated (H). Please specify, if any.(Break-up by composition i.e. by materials relevant to the sector)",
              "Total (A+B + C + D + E + F + G + H)",
              "Waste intensity per rupee of turnover(Total waste generated / Revenue from operations)",
              "Waste intensity per rupee of turnover adjusted for Purchasing Power Parity (PPP)(Total waste generated / Revenue from operations adjusted for PPP)",
              "Waste intensity in terms of physical output",
              "Waste intensity (optional) – the relevant metric may be selected by the entity",
              "For each category of waste generated, total waste recovered through recycling, re-using or other recovery operations (in metric tonnes)",
              "Category of waste",
              "Recycled",
              "Reused",
              "Other recovery operations",
              "Total",
              "For each category of waste generated, total waste disposed by nature of disposal method (in metric tonnes)",
              "Category of waste",
              "Incineration",
              "Landfill",
              "Other disposal methods",
              "Total",
              "Note: Indicate if any independent assessment/ evaluation/assurance has been carried out by an external agency? (Y/N) If yes, name of the external agency.",
            ]



          },
          { text: "Briefly describe the waste management practices adopted in your establishments. Describe the strategy adopted by your company to reduce usage of hazardous and toxic chemicals in your products and processes and the practices adopted to manage such wastes.", choices: null, isMandatory: true, parent: true },
          {
            text: "If the entity has operations/offices in/around ecologically sensitive areas (such as national parks, wildlife sanctuaries, biosphere reserves, wetlands, biodiversity hotspots, forests, coastal regulation zones etc.) where environmental approvals / clearances are required, please specify details in the following format:", choices: null, isMandatory: true, parent: true
            ,
            type: "table",
            label: "",
            columns: [
            "Location of operations/offices",
            "Type of operations",
            "Whether the conditions of environmental approval / clearance are being complied with? (Y/N) If no, the reasons thereof and corrective action taken, if any"

            ],
            rows: [
              "",
              "",
              "",
            ]



          },
          {
            text: "Details of environmental impact assessments of projects undertaken by the entity based on applicable laws, in the current financial year:", choices: null, isMandatory: true, parent: true
            ,
            type: "table",
            label: "",
            columns: [
              "Name and brief details of project",
              "EIA Notification No",
              "Date",
              "Whether conducted by independent external agency (Yes / No)",
              "Results communicated in public domain(Yes / No)",
              "Relevant Web link"

            ],
            rows: [
              "",
              "",
              "",
              "",
              ""
            ]



          },
          {
            text: "Is the entity compliant with the applicable environmental law/ regulations/ guidelines in India; such as the Water (Prevention and Control of Pollution) Act, Air (Prevention and Control of Pollution) Act, Environment protection act and rules thereunder (Y/N). If not, provide details of all such non-compliances, in the following format:", choices: null, isMandatory: true, parent: true
            ,
            type: "table",
            label: "",
            columns: [
              "S. No.",
              "Specify the law / regulation / guidelines which was not complied with",
              "Provide details of the non-compliance",
              "Any fines / penalties / action taken by regulatory agencies such as pollution control boards or by courts",
              "Corrective action taken, if any"

            ],
            rows: [
              "",
              "",
              "",
              "",
              ""
            ]




          },
          {
            text: "Water withdrawal, consumption and discharge in areas of water stress (in kilolitres):", choices: null, isMandatory: false, parent: true,
            type: "table",
            label: "",
            columns: [
              "Parameter",
              "FY 2023-2024",
              "FY 2022-2023"
            ],
              rows: [
              "Total Scope 3 emissions(Break-up of the GHG into CO2, CH4, N2O, HFCs, PFCs, SF6, NF3, if available)",
              "Total Scope 3 emissions per rupee of turnover",
              "Total Scope 3 emission intensity (optional) – the relevant metric may be selected by the entity",
            ],


          },
          {
            text: "Please provide details of total Scope 3 emissions & its intensity, in the following format", choices: null, isMandatory: false, parent: true
            ,
            type: "table",
            label: "",
            columns: [
            "Parameter",
            "Unit",
            "FY 2023-24",
            "FY 2022-23"
            ],
            rows: [
              "Total Scope 3 emissions(Break-up of the GHG into CO2, CH4, N2O, HFCs, PFCs, SF6, NF3, if available)",
              "Total Scope 3 emissions per rupee of turnover",
              "Total Scope 3 emission intensity (optional) – the relevant metric may be selected by the entity",
            ],

          },
          { text: "With respect to the ecologically sensitive areas reported at Question 10 of Essential Indicators above, provide details of significant direct & indirect impact of the entity on biodiversity in such areas along-with prevention and remediation activities", choices: null, isMandatory: false, parent: true },
          {
            text: "If the entity has undertaken any specific initiatives or used innovative technology or solutions to improve resource efficiency, or reduce impact due to emissions / effluent discharge / waste generated, please provide details of the same as well as outcome of such initiatives, as per the following format:", choices: null, isMandatory: false, parent: true
            ,
            type: "table",
            label: "",
            columns: [
              "S. No.",
              "Initiative undertaken",
              "Details of the initiative (Web-link, if any, may be provided along-with summary)",
              "Outcome of the initiative"
            ],
            rows: [
              "",
              ""
            ]
          },
          { text: "Does the entity have a business continuity and disaster management plan? Give details in 100 words/ web link.", choices: null, isMandatory: false, parent: true },
          { text: "Disclose any significant adverse impact to the environment, arising from the value chain of the entity. What mitigation or adaptation measures have been taken by the entity in this regard.", choices: null, isMandatory: false, parent: true },
          { text: "Percentage of value chain partners (by value of business done with such partners) that were assessed for environmental impacts.", choices: null, isMandatory: false, parent: true },
          // { text: "How many Green Credits have been generated or procured:", choices: null, isMandatory: false, parent: true },
          // { text: "By the listed entity", choices: null, isMandatory: false, parent: false },
          // { text: "By the top ten (in terms of value of purchases and sales,respectively) value chain partners”", choices: null, isMandatory: false, parent: false },

        ],
      },
    ]
  },
  {
    key: "transparent",
    section: "C-VII.Principle 7",
    questionsAnswer: "1/3",
    percentComplete: "40%",
    questions: [
      {
        key: "transparent",
        quesSection: "Principle 7 : Businesses, when engaging in influencing public and regulatory policy, should do so in a manner that is responsible and transparent",
        questionsAnswer: "0/0",
        percentComplete: "0",
        section: "C VII",
        question: [
          // { text: "Trade and industry", choices: null, isMandatory: true, isNone: true, parent: true },
          { text: "Number of affiliations with trade and industry chambers/ associations.", choices: null, isMandatory: false, parent: true },

          {
            text: "List the top 10 trade and industry chambers/ associations (determined based on the total members of such body) the entity is a member of/ affiliated to, in the following format", choices: null, isMandatory: true, parent: true
            ,
            type: "table",
            label: "",
            columns: [
            "Name of the trade and industry chambers/ associations",
            "Reach of trade and industry chambers/ associations (State/ National)"

            ],
            rows: [
              "",
              "",
              "",
              "",
              ""
            ]



          },
          {
            text: "Provide details of corrective action taken or underway on any issues related to anti-competitive conduct by the entity, based on adverse orders from regulatory authorities.", choices: null, isMandatory: true, parent: true
            ,
            type: "table",
            label: "",
            columns: [
              "Name of authority",
              "Brief of the case",
              "Corrective action taken"

            ],
            rows: [
              "",
              "",
              "",
              "",
              ""
            ]



          },
          {
            text: "Details of public policy positions advocated by the entity:", choices: null, isMandatory: false, parent: true
            ,
            type: "table",
            label: "",
            columns: [
              "Public Policy Educated",
              "Method resorted for such advocacy",
              "Whether information available in public domain? (Yes/No)",
              "Frequency of Review by Board (annually/ Half Yearly/Quarterly/ Others – please specify)",
              "Web link, if available"

            ],
            rows: [
              "",
              "",
              "",
              "",
              ""
            ]



          },
        ],
      },
    ]
  },
  {
    key: "development",
    section: "C-VIII.Principle 8",
    questionsAnswer: "1/3",
    percentComplete: "40%",
    questions: [
      {
        key: "development",
        quesSection: "Principle 8 : Businesses should promote inclusive growth and equitable development",
        questionsAnswer: "0/0",
        percentComplete: "0",
        section: "C VIII",
        question: [
          {
            text: "Details of Social Impact Assessments (SIA) of projects undertaken by the entity based on applicable laws, in the current financial year.", choices: null, isMandatory: true
            ,
            type: "table",
            label: "",
            parent: true,
            columns: [
              "Name and brief details of project",
              "SIA Notification No.",
              "Date of notification",
              "Whether conducted by independent external agency (Yes / No)",
              "Results communicated in public domain (Yes / No)",
              "Relevant Web link"

            ],
            rows: [
              "",
              "",
              "",
              "",
              ""
            ]



          },
          {
            text: "Provide information on project(s) for which ongoing Rehabilitation and Resettlement (R&R) is being undertaken by your entity, in the following format", choices: null, isMandatory: true
            ,
            type: "table",
            label: "",
            parent: true,

            columns: [
            "Name of Project for which R&R is ongoing",
            "State",
            "District",
            "No. of Project Affected Families (PAFs)",
            "% of PAFs covered by R&R",
            "Amounts paid to PAFs in the FY (In INR)"

            ],
            rows: [
              "",
              "",
            ]

          },
          {
            text: "Describe the mechanisms to receive and redress grievances of the community.", choices: null, isMandatory: true,
            parent: true,

          },
          {
            text: "Percentage of input material (inputs to total inputs by value) sourced from suppliers", choices: null, isMandatory: true
            ,
            type: "table",
            label: "",
            parent: true,
            columns: [
            "Particulars",
            "FY 2023-24 (Current Financial Year)",
            "FY 2022-23 (Previous Financial year)"

            ],
            rows: [
              "Directly sourced from MSMEs/ small producers",
              "Directly from within India",
            ]
          },
          {
            text: "Job creation in smaller towns – Disclose wages paid to persons employed (including employees or workers employed on a permanent or non-permanent / on contract basis) in the following locations, as % of total wage cost", choices: null, isMandatory: true
            ,
            type: "table",
            label: "",
            parent: true,
            columns: [
              "Location",
              "FY 2024-25Current Financial Year",
              "FY 2023-24Previous Financial Year"

            ],
            rows: [
              "Rural",
              "Semi-urban",
              "Urban",
              "Metropolitan",
              "(Categorized as per RBI Classification System - rural / semi-urban / urban / metropolitan)"
            ]



          },
          {
            text: "Provide details of actions taken to mitigate any negative social impacts identified in the Social Impact Assessments (Reference: Question 1 of Essential Indicators above):", choices: null, isMandatory: false, parent: true
            ,
            type: "table",
            label: "",
            columns: [
              "Details of negative social impact identified",
              "Corrective action taken"

            ],
            rows: [
              "",
              "",
              "",
              "",
              ""
            ]



          },
          {
            text: "Provide the following information on CSR projects undertaken by your entity in designated aspirational districts as identified by government bodies", choices: null, isMandatory: false, parent: true
            ,
            type: "table",
            label: "",
            columns: [
            "State",
            "Aspirational District",
            "Amount Spent in INR"   

            ],
            rows: [
              "",
              "",
              "",
              "",
              ""
            ]



          },
          { text: "Do you have a preferential procurement policy where you give preference to purchase from suppliers comprising marginalized /vulnerable groups? (Yes/No)", choices: null, isMandatory: false, parent: true },
          { text: "From which marginalized /vulnerable groups do you procure?", choices: null, isMandatory: false, parent: true },
          { text: "What percentage of total procurement (by value) does it constitute?", choices: null, isMandatory: false, parent: true },

          {
            text: "Details of the benefits derived and shared from the intellectual properties owned or acquired by your entity (in the current financial year), based on traditional knowledge:", choices: null, isMandatory: false, parent: true
            ,
            type: "table",
            label: "",
            columns: [
            "Intellectual property based on traditional knowledge",
            "Owned/Acquired (Yes/No)",
            "Benefit Shared (Yes/No)",
            "Basis of calculating benefit share"

            ],
            rows: [
              "",
              "",
              "",
              "",
              ""
            ]



          },
          {
            text: "Details of corrective actions taken or underway, based on any adverse order in intellectual property related disputes wherein usage of traditional knowledge is involved.", choices: null, isMandatory: false, parent: true
            ,
            type: "table",
            label: "",
            columns: [
              "Name of authority",
              "Brief of the Case",
              "Corrective action taken"

            ],
            rows: [
              "",
            ]



          },
          {
            text: "Details of beneficiaries of CSR Projects:", choices: null, isMandatory: false, parent: true
            ,
            type: "table",
            label: "",
            columns: [
            "CSR Project",
            "No. of persons benefited from CSR Projects",
            "% of beneficiaries from vulnerable and marginalized groups"
            ],
            rows: [
              "",
              "",
              "",
              "",
              ""
            ]

          },

        ],
      },
    ]
  },
  {
    key: "responsible_manner",
    section: "C-IX.Principle 9",
    questionsAnswer: "1/3",
    percentComplete: "40%",
    questions: [
      {
        key: "responsible_manner",
        quesSection: "Principle 9 : Businesses should engage with and provide value to their consumers in a responsible manner",
        questionsAnswer: "0/0",
        percentComplete: "0",
        section: "C IX",
        question: [
          { text: "Describe the mechanisms in place to receive and respond to consumer complaints and feedback.", choices: null, isMandatory: true, parent: true },
          {
            text: "Turnover of products and/ services as a percentage of turnover from all products/service that carry information about:", choices: null, isMandatory: true,parent:true

            , type: "table",
            label: "",
            columns: [
            "Particulars",
            "As a percentage of total turnover"

            ],
            rows: [
              "Environmental and social parameters relevant to the product",
              "Safe and responsible usage",
              "Recycling and/or safe disposal",
            ]

          },
          {
            text: "Number of consumer complaints in respect of the following:", choices: null, isMandatory: true, parent: true,
            type: "table",
            label: "",
            columns: [
              "Category",
              "FY 2024-25(Current Financial Year)-(Received during the year)",
              "FY 2024-25(Current Financial Year)-(Pending resolution at end of year)",
              "FY 2024-25(Current Financial Year)-(Remarks)",
              "FY 2023-24(Previous Financial Year)-(Received during the year)",
              "FY 2023-24(Previous Financial Year)-(Pending resolution at end of year)",
              "FY 2023-24(Previous Financial Year)-(Remarks)"

            ],
            rows: [
              "Data privacy",
              "Advertising",
              "Cyber-security",
              "Delivery of essential services",
              "Restrictive Trade Practices",
              "Unfair Trade Practices",
              "Other"
            ]


          },
          {
            text: "Details of instances of product recalls on account of safety issues:", choices: null, isMandatory: true, parent: true
            ,
            type: "table",
            label: "",
            columns: [
            "category",
            "Number",
            "Reasons for recall"

            ],
            rows: [
              "Voluntary recalls",
              "Forced recalls",
            ]



          },
          { text: "Does the entity have a framework/policy on cyber security and risks related to data privacy? (Yes/No). If available, provide weblink of the policy.", choices: null, isMandatory: true, parent: true },
          { text: "Provide details of any corrective actions taken or underway on issues relating to advertising, and delivery of essential services; cyber security and data privacy of customers; re-occurrence of instances of product recalls; penalty / action taken by regulatory authorities on safety of products / services.", choices: null, isMandatory: true, parent: true },
          { text: "Provide the following information relating to data breaches:", choices: null, isMandatory: true, parent: true},

          { text: "Channels / platforms where information on products and services of the entity can be accessed (provide web link, if available).", choices: null, isMandatory: false, parent: true },
          { text: "Steps taken to inform and educate consumers about safe and responsible usage of products and/or services.", choices: null, isMandatory: false, parent: true },
          { text: "Mechanisms in place to inform consumers of any risk of disruption/discontinuation of essential services.", choices: null, isMandatory: false, parent: true },
          { text: "Does the entity display product information on the product over and above what is mandated as per local laws? (Yes/No/Not Applicable) If yes, provide details in brief. Did your entity carry out any survey with regard to consumer satisfaction relating to the major products / services of the entity, significant locations of operation of the entity or the entity as a whole? (Yes/No)", choices: null, isMandatory: false, parent: true },
          { text: "Provide the following information relating to data breaches:", choices: null, isMandatory: false, parent: true },
          // { text: "Number of instances of data breaches along-with impact", choices: null, isMandatory: false, parent: false },
          // { text: "Percentage of data breaches involving personally identifiable information of customers", choices: null, isMandatory: false, parent: false },


        ],
      },
    ]
  },
];