import { toast } from "@/hooks/use-toast";

const API_BASE_URL = "https://rwws.vercel.app/rwws/v1/auth";

export interface AuthResponse {
  success: boolean;
  message: string;
  data: any;
  code?: number;
}

export interface Tokens {
  access: string;
  refresh: string;
}

export const auth = {
  async signUp(email: string, username: string): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, username }),
      });
      return await response.json();
    } catch (error) {
      return {
        success: false,
        message: "Failed to sign up",
        data: null,
      };
    }
  },

  async signIn(email: string, password: string): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.success) {
        // Store tokens
        localStorage.setItem("accessToken", data.data.access);
        localStorage.setItem("refreshToken", data.data.refresh);
      }
      return data;
    } catch (error) {
      return {
        success: false,
        message: "Failed to sign in",
        data: null,
      };
    }
  },

  async changePassword(
    oldPassword: string,
    newPassword: string
  ): Promise<AuthResponse> {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        return {
          success: false,
          message: "Not authenticated",
          data: null,
        };
      }

      const response = await fetch(`${API_BASE_URL}/change-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ oldPassword, newPassword }),
      });
      return await response.json();
    } catch (error) {
      return {
        success: false,
        message: "Failed to change password",
        data: null,
      };
    }
  },

  async forgotPassword(email: string): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      return await response.json();
    } catch (error) {
      return {
        success: false,
        message: "Failed to process forgot password request",
        data: null,
      };
    }
  },

  async resetPassword(email: string, tempPass: string): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, tempPass }),
      });
      return await response.json();
    } catch (error) {
      return {
        success: false,
        message: "Failed to reset password",
        data: null,
      };
    }
  },

  logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  },
};
