import { Button } from "@/components/Button";
import { Dropdown } from "@/components/Dropdown";
import { Input } from "@/components/Input";
import { ToastMessage } from "@/components/ToastMessage";
import { AppNavigatorRoutesProps } from "@/routes/app.routes";
import {
  BudgetResponse,
  getBudgetById,
  updateBudget,
} from "@/services/budget/budgetResource";
import { AppError } from "@/utils/AppError";
import { getFirstDayOfMonth, MonthValue } from "@/utils/getFirstDayOfMonth";
import { getMonthFromDate } from "@/utils/getMonthFromDate";
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

const updateBudgetSchema = yup.object({
  amountInCents: yup
    .number()
    .required("O valor é obrigatório.")
    .min(1, "O valor deve ser maior que zero.")
    .transform((value) => value * 100),
  date: yup.date().required("A data é obrigatória."),
});

type updateBudgetData = yup.InferType<typeof updateBudgetSchema>;

type RouteParams = {
  id: string;
};

export function UpdateBudget() {
  const [month, setMonth] = useState<MonthValue | undefined>();

  const route = useRoute();
  const { id } = route.params as RouteParams;

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(updateBudgetSchema),
  });

  const toast = useToast();

  const { navigate } = useNavigation<AppNavigatorRoutesProps>();

  async function getUserBudgetById(budgetId: string) {
    const data = await getBudgetById(budgetId);

    const budget: BudgetResponse = data.budget;

    setValue("amountInCents", budget.amount_in_cents / 100);
    setValue("date", new Date(budget.date));
    setMonth(getMonthFromDate(new Date(budget.date)));
  }

  async function handleUpdateBudget(data: updateBudgetData) {
    try {
      await updateBudget({ ...data, id });

      toast.show({
        placement: "top",
        duration: 1000 * 2,
        render: ({ id }) => (
          <ToastMessage
            id={id}
            title="Limite editado com sucesso!"
            action="success"
          />
        ),
      });

      setMonth(undefined);
      navigate("consult");
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError
        ? error.message
        : "Não foi possível editar o limite. Tente novamente mais tarde.";

      toast.show({
        placement: "top",
        render: ({ id }) => (
          <ToastMessage id={id} title={title} action="error" />
        ),
      });
    }
  }

  function handleNavigateToConsult() {
    navigate("consult");
  }

  function onChangeDropdown(value: MonthValue) {
    setMonth(value);

    setValue("date", new Date(getFirstDayOfMonth(value)), {
      shouldValidate: true,
    });
  }

  useFocusEffect(
    useCallback(() => {
      getUserBudgetById(id);
    }, [id])
  );

  return (
    <Center flex={1} px="$12">
      <Box p="$4">
        <Text fontWeight="$bold" fontSize="$3xl" color="$black" mb="$6">
          Limite
        </Text>
      </Box>
      <VStack space="md" w="80%" alignSelf="center">
        <Controller
          name="amountInCents"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input
              label="Valor do limite"
              placeholder="Valor do limite"
              onChangeText={(text) => onChange(Number(text) || 0)}
              value={value?.toString() || ""}
              keyboardType="decimal-pad"
              errorMessage={errors.amountInCents?.message}
            />
          )}
        />

        <Text size="md" fontWeight="$bold" marginBottom="-$2" color="$black">
          Mês do limite
        </Text>
        <Dropdown
          placeholder="Selecione um Mês:"
          options={[
            { label: "Janeiro", value: "JAN" },
            { label: "Fevereiro", value: "FEB" },
            { label: "Março", value: "MAR" },
            { label: "Abril", value: "APR" },
            { label: "Maio", value: "MAY" },
            { label: "Junho", value: "JUN" },
            { label: "Julho", value: "JUL" },
            { label: "Agosto", value: "AUG" },
            { label: "Setembro", value: "SEP" },
            { label: "Outubro", value: "OCT" },
            { label: "Novembro", value: "NOV" },
            { label: "Dezembro", value: "DEC" },
          ]}
          value={month}
          onChange={onChangeDropdown}
        />
        {errors.date?.message && (
          <Text color="$red500" size="sm" mt="-$2">
            {errors.date?.message}
          </Text>
        )}

        <Button label="SALVAR" onPress={handleSubmit(handleUpdateBudget)} />
        <Button label="CONSULTAR" onPress={handleNavigateToConsult} />
      </VStack>
    </Center>
  );
}
