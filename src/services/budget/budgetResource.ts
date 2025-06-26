import { api } from "../../lib/axios";

type BudgetDTO = {
  amountInCents: number;
  date: Date;
};

type UpdateBudgetDTO = {
  id: string;
  amountInCents: number;
  date: Date;
};

type BudgetResponse = {
  id: string;
  amount_in_cents: number;
  date: Date;
};

async function createBudget({ amountInCents, date }: BudgetDTO) {
  try {
    const { data } = await api.post("/budgets", {
      amountInCents,
      date,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

async function updateBudget({ id, amountInCents, date }: UpdateBudgetDTO) {
  try {
    const { data } = await api.put("/budgets", {
      id,
      amountInCents,
      date,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

async function deleteBudget(id: string) {
  try {
    await api.delete(`/budgets/${id}`);
  } catch (error) {
    throw error;
  }
}

async function fetchUserBudgets() {
  try {
    const { data } = await api.get("/budgets");
    return data;
  } catch (error) {
    throw error;
  }
}

async function getBudgetById(id: string) {
  try {
    const { data } = await api.get(`/budgets/id/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
}

export {
  BudgetDTO,
  BudgetResponse,
  createBudget,
  deleteBudget,
  fetchUserBudgets,
  getBudgetById,
  updateBudget,
  UpdateBudgetDTO,
};
