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
      section: "PolicyPolicy and management processes",
      questionsAnswer: "1/3",
      percentComplete: "40%",
      questions: [
        {
          key: "details",
          quesSection: "Policy and management processes",
          questionsAnswer: "0/9",
          percentComplete: "0",
          question: [
            { text: "Whether your entity’s policy/policies cover each principle and its core elements of the NGRBCs. (Yes/No)", choices: null, isMandatory: true },
            { text: "Whether the entity has translated the policy into procedures. (Yes / No)", choices: null, isMandatory: true },
            { text: "Do the enlisted policies extend to your value chain partners? (Yes/No)", choices: null, isMandatory: true },
            {
              text: "Name of the national and international codes/certifications/labels/ standards (e.g. Forest Stewardship Council, Fairtrade, Rainforest Alliance, Trustea) standards (e.g. SA 8000, OHSAS, ISO, BIS) adopted by your entity and mapped to each principle.", choices: null, isMandatory: true
            },
            {
              text: "Specific commitments, goals and targets set by the entity with defined timelines, if any.",
              choices: null, isMandatory: true,
            },
            {
              text: "Performance of the entity against the specific commitments, goals and targets along-with reasons in case the same are not met.", choices: null, isMandatory: true
            }
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
            { text: "Statement by director responsible for the business responsibility report, highlighting ESG related challenges, targets and achievements (listed entity has flexibility regarding the placement of this disclosure)", choices: ["Yes", "No", "In Progress"], isMandatory: false },
            { text: "Details of the highest authority responsible for implementation and oversight of the Business Responsibility policy (ies).", choices: null, isMandatory: false },
            { text: "Does the entity have a specified Committee of the Board/ Director responsible for decision making on sustainability related issues? (Yes / No). If yes, provide details.", choices: null, isMandatory: false },
            { text: "Details of Review of NGRBCs by the Company:", choices: null, isMandatory: false },
            { text: "Has the entity carried out independent assessment/ evaluation of the working of its policies by an external agency? (Yes/No). If yes, provide name of the agency.", choices: null, isMandatory: false },
            { text: "If answer to question (1) above is “No” i.e. not all Principles are covered by a policy, reasons to be stated, as below:", choices: null, isMandatory: false },
            { text: "Supply Chain Mangement", choices: null, isMandatory: false },


          ],
        },

      ],
    },

  ];