import { api } from "../../lib/axios";

type ExpenseDTO = {
  description: string;
  amountInCents: number;
  date: Date;
};

type UpdateExpenseDTO = {
  id: string;
  description: string;
  amountInCents: number;
  date: Date;
};

type ExpenseResponse = {
  id: string;
  description: string;
  amount_in_cents: number;
  date: Date;
};

async function createExpense({ description, amountInCents, date }: ExpenseDTO) {
  try {
    const { data } = await api.post("/expenses", {
      description,
      amountInCents,
      date,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

async function updateExpense({
  id,
  description,
  amountInCents,
  date,
}: UpdateExpenseDTO) {
  try {
    const { data } = await api.put("/expenses", {
      id,
      description,
      amountInCents,
      date,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

async function deleteExpense(id: string) {
  try {
    await api.delete(`/expenses/${id}`);
  } catch (error) {
    throw error;
  }
}

async function fetchUserExpenses(month?: String) {
  try {
    const url = month ? `/expenses/${month}` : "/expenses";
    const { data } = await api.get(url);
    return data;
  } catch (error) {
    throw error;
  }
}

async function getExpenseById(id: string) {
  try {
    const { data } = await api.get(`/expenses/id/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
}

export {
  ExpenseDTO,
  UpdateExpenseDTO,
  ExpenseResponse,
  createExpense,
  updateExpense,
  deleteExpense,
  fetchUserExpenses,
  getExpenseById,
};
