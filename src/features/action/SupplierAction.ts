import axios from 'axios';
import { endpoint, json_url } from '../../api/Api';

interface FetchSupplierListDataProps {
  setData: React.Dispatch<React.SetStateAction<any>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  calculateCompliancePercentages: () => void;
}


export const fetchSupplierListData = async ({
  setData,
  setLoading,
  calculateCompliancePercentages
}: FetchSupplierListDataProps) => {
  try {
    setLoading(true);
    const response = await axios.get(json_url);
    setData(response.data);
    calculateCompliancePercentages();
  } catch (error) {
    console.error("Error fetching the data:", error);
  } finally {
    setLoading(false);
  }
};


export const postData = async (data: FormData, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
  setLoading(true);
  try {
    const response = await axios.post(`${endpoint}webscraping/`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error during POST call:", error);
    throw error;
  }
  finally {
    setLoading(false);
  }

};

const API_URL = "https://ml-api.infony.in/nmav_parser_api/";

export const postDatas = async (
  text: string,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setLoading(true);
  try {
    const payload = { text }; // Payload with "text" field

    const response = await axios.post(API_URL, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error during POST call:", error);
    throw error;
  } finally {
    setLoading(false);
  }
};



export const loginApi = async (data: { email: string; password: string; }, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
  setLoading(true)
  try {
    const response = await axios.post('https://api.escuelajs.co/api/v1/auth/login', data, {
    });

    return response.data;
  } catch (error) {
    console.error('Error during POST call:', error);
    throw error;
  }
  finally {
    setLoading(false)
  }
};


