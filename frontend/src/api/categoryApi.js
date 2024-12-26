import axiosInstance from './axiosInstance';

export const fetchCategoriesByAlphabet = async (letter) => {
    try {
        const response = await axiosInstance.get('/api/categories', {
          params: { letter },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
  

export const getVideosByCategory = async (page, id) => {
    try {
      const response = await axiosInstance.get(`/api/categories/${id}/videos`, {
        params: { page },
      });
      return response.data;
    } catch (error) {
        throw error;
    }
};
