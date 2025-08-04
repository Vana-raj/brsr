import React from 'react';
import { useParams } from 'react-router-dom';
import Questionnaire from './Questionnaire';
import SectionB from '../report/SectionB';
import SectionC from '../report/SectionC';

interface QuestionnaireWrapperProps {
  addData: (data: any) => void;
  putdata:Category[]
  selectedindex: string;
  editOnly: boolean;
  setSectionProgressPercentage: (percentage: number) => void;
  setSectionBProgressPercentage: (percentage: number) => void;
  setSectionCProgressPercentage: (percentage: number) => void;
  singledata?: any;
}

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
const QuestionnaireWrapper: React.FC<QuestionnaireWrapperProps> = ({addData, putdata, selectedindex, editOnly, setSectionProgressPercentage, setSectionBProgressPercentage, setSectionCProgressPercentage,singledata}) => {
  const { mode, section } = useParams();

  const isEditMode = mode === 'edit';
  const commonProps = {
    putdata: putdata,
    selectedindex:selectedindex,
    editOnly: isEditMode,
    addData:addData,
    setSectionProgressPercentage:setSectionProgressPercentage,
    setSectionBProgressPercentage:setSectionBProgressPercentage,
    setSectionCProgressPercentage:setSectionCProgressPercentage,
    singledata: singledata
  };

  switch (section) {
    case 'section_a':
      return <Questionnaire {...commonProps} />

    case 'section_b':
      return  <SectionB {...commonProps} />

    case 'section_c':
      return  <SectionC {...commonProps} />

    default:
      return <div>Invalid section</div>;
  }
};

export default QuestionnaireWrapper;