import { Button } from "@/components/Button";
import { DatePicker } from "@/components/DatePicker";
import { Input } from "@/components/Input";
import { ToastMessage } from "@/components/ToastMessage";
import { AppNavigatorRoutesProps } from "@/routes/app.routes";
import {
  updateExpense,
  ExpenseResponse,
  getExpenseById,
} from "@/services/expense/expenseResource";
import { AppError } from "@/utils/AppError";
import { Box, Center, Text, useToast, VStack } from "@gluestack-ui/themed";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

const updateExpenseSchema = yup.object({
  description: yup.string().required("A descrição é obrigatória."),
  amountInCents: yup
    .number()
    .min(1, "O valor deve ser maior que zero.")
    .required("O valor é obrigatório.")
    .transform((value) => value * 100),
  date: yup.date().required("A data é obrigatória."),
});

type updateExpenseData = yup.InferType<typeof updateExpenseSchema>;

type RouteParams = {
  id: string;
};

export function UpdateExpense() {
  const router = useRoute();
  const { id } = (router.params as RouteParams) || {};

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(updateExpenseSchema),
  });

  const toast = useToast();

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  async function getUserExpenseById(expenseId: string) {
    const data = await getExpenseById(expenseId);

    const expense: ExpenseResponse = data.expense;

    setValue("description", expense.description);
    setValue("amountInCents", expense.amount_in_cents / 100);
    setValue("date", new Date(expense.date));
  }

  async function handleUpdateExpense(data: updateExpenseData) {
    try {
      await updateExpense({ ...data, id });

      toast.show({
        placement: "top",
        duration: 1000 * 2,
        render: ({ id }) => (
          <ToastMessage
            id={id}
            title="Despesa atualizada com sucesso!"
            action="success"
          />
        ),
      });

      navigation.navigate("history");
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError
        ? error.message
        : "Não foi possível atualizar a despesa. Tente novamente mais tarde.";

      // toast de erro
      toast.show({
        placement: "top",
        render: ({ id }) => (
          <ToastMessage id={id} title={title} action="error" />
        ),
      });
    }
  }

  function handleNavigateToHistory() {
    navigation.navigate("history");
  }

  useFocusEffect(
    useCallback(() => {
      getUserExpenseById(id);
    }, [id])
  );

  return (
    <Center flex={1} px="$12">
      <Box p="$4">
        <Text fontWeight="$bold" fontSize="$3xl" color="$black" mb="$6">
          Despesa
        </Text>
      </Box>

      <VStack space="md" w="80%" alignSelf="center">
        <Controller
          name="description"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input
              label="Descrição"
              placeholder="Descrição"
              onChangeText={onChange}
              value={value}
              errorMessage={errors.description?.message}
            />
          )}
        />

        <Controller
          name="amountInCents"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input
              label="Valor"
              placeholder="Valor"
              onChangeText={(text) => onChange(Number(text) || 0)}
              value={value?.toString() || ""}
              keyboardType="decimal-pad"
              errorMessage={errors.amountInCents?.message}
            />
          )}
        />

        <Text size="md" fontWeight="$bold" marginBottom="-$2" color="$black">
          Data
        </Text>
        <Controller
          name="date"
          control={control}
          render={({ field: { onChange, value } }) => (
            <DatePicker
              value={value}
              onChange={onChange}
              placeholder="Escolher data"
              errorMessage={errors.date?.message}
            />
          )}
        />

        <Button label={"SALVAR"} onPress={handleSubmit(handleUpdateExpense)} />
        <Button label="HISTÓRICO" onPress={handleNavigateToHistory} />
      </VStack>
    </Center>
  );
}
