import axios, { AxiosError } from "axios";

// Axios instance
const apiClient = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

export interface ReportResponse {
  description: string;
  parameters_for_report_generate: string[];
  report_code: string;
}


export const ChatBotService = {
  generateReport : async (user_question: string): Promise<ReportResponse> => {
    try {
      const response = await apiClient.post<ReportResponse>(
        "/report-generate/predict",
        { user_question }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios Error:", error.message);
        throw error;
      } else {
        console.error("Unexpected Error:", error);
        throw error;
      }
    }
  }
}