import { api } from "@/lib/axios";

export type ProgressResponse = {
  date: string;
  spentInCents: number;
  budgetInCents: number;
  status: string;
};

export async function getUserProgress(date?: string) {
  try {
    const url = date ? `/progress/${date}` : "/progress";
    const response = await api.get(url);

    return response.data;
  } catch (error) {
    throw error;
  }
}
