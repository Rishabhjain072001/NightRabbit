import axiosInstance from './axiosInstance';

export const getSearchSuggestions = async (query) => {
  try {
    const response = await axiosInstance.get(`/api/videos/search_suggestions`, {
      params: { query },
    });
    return response.data;
  }  catch (error) {
    throw error;
  }
};
