import axiosInstance from './axiosInstance';

// Fetch all videos
export const getVideos = async (page, query) => {
  try {
    const response = await axiosInstance.get('/api/videos', {
      params: { page, query },
    });
    return response.data; // Return list of videos
  }  catch (error) {
    throw error;
  }
};

// Fetch a specific video by ID
export const getVideoById = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/videos/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
