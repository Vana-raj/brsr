import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from './pages/home/Home';
import Report from "./pages/report/Report";
import Analytics from "./pages/analytics/Analytics";
import Quality from "./pages/quality/Quality";
import SupplierDetailsPage from "./pages/supplierdetails/SupplierDetails";
import Dashboard from "./pages/dashboard/Dashboard";
import OverView from "./pages/supplierdetails/overview/OverView";
import Governance from "./pages/supplierdetails/governance/Governance";
import Analyse from "./pages/supplierdetails/analyse/Analyse";
import Performance from "./pages/supplierdetails/performance/Performance";
import Carbon from "./pages/supplierdetails/carbon/Carbon";
import ProfilePage from "./pages/profile/ProfilePage";
import SingleReport from "./pages/supplierdetails/singlereport/SingleReport";
import Waste from "./pages/supplierdetails/waste/Waste";
import BenchmarkSustainability from "./pages/supplierdetails/benchmark/BenchmarkSustainability";
import StrategyRoadMap from "./pages/supplierdetails/supplierstrategy/StrategyRoadMap";
import Questionnaire from "./pages/questionnaire/Questionnaire";
import CompanyDetailsForm from "./pages/form/FormPage";
import SupplierManage from "./pages/supplier/SupplierManage";
import UserManagement from "./pages/usermanagement/UserManagement";
import UserCreation from "./pages/usercreation/UserCreation";
import LandingPage from "./pages/landingpage/LandingPage";
import QuestionnaireWrapper from "./pages/questionnaire/QuestionnaireWrapper";
// import ProtectedRoute from "./ProdectedRoute";

const RouterConfig = createBrowserRouter([

    {
        path: '/',
        element: <Navigate to="/brsr/dashboard" replace />,
    },
    // {
    //     path: 'login',
    //     element: <LandingPage />
    // },
    {
        element: <Home />,
        children: [
            {
                path: 'brsr/dashboard',
                element:
                    // <ProtectedRoute>
                    <Dashboard />
                // </ProtectedRoute>
            },
            {
                path: 'brsr/user-creation',
                element:
                    // <ProtectedRoute>
                    <UserCreation />
                // </ProtectedRoute>
            },
           {
  path: 'brsr/reports',
  element: <Report />, 
  children: [
    {
      path: 'questionnaire/:mode/:section',
      element: (
        <QuestionnaireWrapper
          addData={() => {}}
          putdata={[]}
          selectedindex={""}
          editOnly={false}
          setSectionProgressPercentage={() => {}}
          setSectionBProgressPercentage={() => {}}
          setSectionCProgressPercentage={() => {}}
          singledata={[]} 
        />
      )
    }
  ]
},
            {
                path: 'brsr/quality',
                element:
                    // <ProtectedRoute>
                    <Quality />
                // </ProtectedRoute>,
            },
            {
                path: 'brsr/analytics',
                element:
                    // <ProtectedRoute>
                    <Analytics />
                // </ProtectedRoute>,
            },
            {
                path: 'brsr/company',
                element:
                    // <ProtectedRoute>
                    <CompanyDetailsForm />
                // </ProtectedRoute>
            },
            {
                path: 'brsr/profile',
                element:
                    //  <ProtectedRoute>
                    <ProfilePage />
                // </ProtectedRoute>
            },
            {
                path: 'brsr/questionnaire',
                element: 
                    // <ProtectedRoute>
                    <Questionnaire putdata={[]} selectedindex={""} editOnly={false} setSectionProgressPercentage={(percentage) => {
                    console.log('Progress percentage:', percentage);
                }} />
                // </ProtectedRoute>
            },
            {
                path: 'brsr/user-management',
                element:
                    // <ProtectedRoute>
                    <UserManagement />
                // </ProtectedRoute>
            },
            {
                path: 'brsr/supplier-management',
                element:
                    // <ProtectedRoute>
                    <SupplierManage />
                // </ProtectedRoute>
            }
        ],
    },
    {
        path: "brsr/supplier/:id",
        element:
            // <ProtectedRoute>
            <SupplierDetailsPage />,
        // </ProtectedRoute>,
        children: [
            {
                path: 'overview',
                element:
                    // <ProtectedRoute>
                    <OverView />
                // </ProtectedRoute>,
            },
            {
                path: 'company',
                element:
                    // <ProtectedRoute>
                    <Governance />
                // </ProtectedRoute>,
            },
            {
                path: 'products&services',
                element:
                    // <ProtectedRoute>
                    <Governance />
                // </ProtectedRoute>,
            },
            {
                path: 'location',
                element:
                    // <ProtectedRoute>
                    <Governance />
                // </ProtectedRoute>,
            },
            {
                path: 'governance',
                element:
                    // <ProtectedRoute>
                    <Governance />
                // </ProtectedRoute>,
            },
            {
                path: 'carbon',
                element:
                    // <ProtectedRoute>
                    <Carbon />
                // </ProtectedRoute>,
            },
            {
                path: 'performance',
                element:
                    // <ProtectedRoute>
                    <Performance />
                // </ProtectedRoute>,
            },
            {
                path: 'analyse',
                element:
                    // <ProtectedRoute>
                    <Analyse />
                // </ProtectedRoute>,
            },
            {
                path: 'waste-consumption',
                element:
                    // <ProtectedRoute>
                    <Waste />
                // </ProtectedRoute>,
            },
            {
                path: 'reports',
                element:
                    // <ProtectedRoute>
                    <SingleReport />
                //</ProtectedRoute>,
            },
            {
                path: 'benchmark-sustainability',
                element:
                    // <ProtectedRoute>
                    <BenchmarkSustainability />
                //</ProtectedRoute>,
            },
            {
                path: 'strategy-road-map',
                element:
                    // <ProtectedRoute>
                    <StrategyRoadMap />
                // </ProtectedRoute>,
            },
        ]
    },


]);

export default RouterConfig;
