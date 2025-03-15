import { toast } from "@/hooks/use-toast";

const API_BASE_URL = "https://rwws.vercel.app/rwws/v1/news";

const newsService = {
  async getAll(page = 1, pageSize = 10) {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await fetch(
        `${API_BASE_URL}?page=${page}&pageSize=${pageSize}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error("Failed to fetch news:", error);
      throw error;
    }
  },

  async getById(id) {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error("Failed to fetch news:", error);
      throw error;
    }
  },

  async create(formData) {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await fetch(API_BASE_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      });
      return await response.json();
    } catch (error) {
      console.error("Failed to create news:", error);
      throw error;
    }
  },

  async update(id, formData) {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      });
      return await response.json();
    } catch (error) {
      console.error("Failed to update news:", error);
      throw error;
    }
  },

  async delete(id) {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return await response.json();
    } catch (error) {
      console.error("Failed to delete news:", error);
      throw error;
    }
  },
};

export default newsService;
