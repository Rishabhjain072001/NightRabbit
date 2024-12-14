import axiosInstance from './axiosInstance';

// Fetch all videos
export const getAllVideos = async () => {
  try {
    const response = await axiosInstance.get('/api/videos');
    return response.data; // Return list of videos
  }  catch (error) {
    throw error;
  }
};

// Fetch a specific video by ID
export const getVideoById = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/video/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Search videos based on a query
// export const searchVideos = async (query) => {
//   try {
//     const response = await axiosInstance.get(`/videos/search`, {
//       params: { query },
//     });
//     return response.data; // Return search results
//   } catch (error) {
//     throw error;
//   }
// };
