import { toast } from "@/hooks/use-toast";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}auth`;

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

// Cookie helper functions
const setCookie = (name: string, value: string, days = 1) => {
  if (typeof document !== "undefined") {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
  }
};

const getCookie = (name: string): string | null => {
  if (typeof document !== "undefined") {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  }
  return null;
};

const deleteCookie = (name: string) => {
  if (typeof document !== "undefined") {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }
};

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
        setCookie("accessToken", data.data.access);
        setCookie("refreshToken", data.data.refresh);
        // Set token expiry time (access token expires in 1 hour)
        const expiryTime = new Date().getTime() + 60 * 60 * 1000; // 1 hour
        localStorage.setItem("tokenExpiry", expiryTime.toString());
        setCookie("tokenExpiry", expiryTime.toString());
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

  async refreshToken(): Promise<boolean> {
    try {
      // Try cookies first, fall back to localStorage
      const refreshToken =
        getCookie("refreshToken") || localStorage.getItem("refreshToken");
      if (!refreshToken) {
        this.logout();
        return false;
      }

      const response = await fetch(`${API_BASE_URL}/refresh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${refreshToken}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        // Update both storage methods
        localStorage.setItem("accessToken", data.data.access);
        setCookie("accessToken", data.data.access);

        const expiryTime = new Date().getTime() + 60 * 60 * 1000;
        localStorage.setItem("tokenExpiry", expiryTime.toString());
        setCookie("tokenExpiry", expiryTime.toString());

        return true;
      }

      this.logout();
      return false;
    } catch (error) {
      this.logout();
      return false;
    }
  },

  async checkTokenExpiry(): Promise<boolean> {
    // First check cookies
    const accessToken = this.getAccessToken();
    const tokenExpiry =
      getCookie("tokenExpiry") || localStorage.getItem("tokenExpiry");

    if (!accessToken || !tokenExpiry) {
      this.logout();
      return false;
    }

    const expiryTime = parseInt(tokenExpiry);
    const currentTime = new Date().getTime();

    if (currentTime >= expiryTime) {
      return this.refreshToken();
    }
    return true;
  },

  async logout(): Promise<void> {
    try {
      const accessToken =
        getCookie("accessToken") || localStorage.getItem("accessToken");
      if (accessToken) {
        await fetch(`${API_BASE_URL}/logout`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Clear both storage methods
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("tokenExpiry");

      deleteCookie("accessToken");
      deleteCookie("refreshToken");
      deleteCookie("tokenExpiry");

      window.location.href = "admin/login";
    }
  },

  async changePassword(
    oldPassword: string,
    newPassword: string
  ): Promise<AuthResponse> {
    try {
      const isValid = await this.checkTokenExpiry();
      if (!isValid) {
        return {
          success: false,
          message: "Session expired",
          data: null,
        };
      }

      const accessToken = localStorage.getItem("accessToken");
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

  getAccessToken(): string | null {
    // Try cookies first, fall back to localStorage
    return getCookie("accessToken") || localStorage.getItem("accessToken");
  },
};
