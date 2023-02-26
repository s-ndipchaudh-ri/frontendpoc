import axios from 'axios';

class ApiService {
  constructor(baseURL) {
    this.baseURL = baseURL;
    this.axiosInstance = axios.create({
      baseURL: this.baseURL,
    });
  }

  async get(endpoint) {
    try {
      const response = await this.axiosInstance.get(endpoint);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async post(endpoint, data) {
    try {
      const response = await this.axiosInstance.post(endpoint, data);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async patch(endpoint, data) {
    try {
      const response = await this.axiosInstance.patch(endpoint, data);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async delete(endpoint) {
    try {
      const response = await this.axiosInstance.delete(endpoint);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default ApiService;
