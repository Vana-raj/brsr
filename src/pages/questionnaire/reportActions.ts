import api from '../../api/Api';

export const fetchReportList = async (): Promise<{ rows: any[] } | null> => {
  try {
    const response = await api.get('/report_list/');
    return { rows: response.data };
  } catch (error) {
    console.error('Error fetching report list:', error);
    return null;
  }
};
