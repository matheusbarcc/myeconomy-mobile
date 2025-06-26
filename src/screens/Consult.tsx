import { Box, Center, Text, useToast, VStack } from "@gluestack-ui/themed";
import { useCallback, useState } from "react";
import { Card } from "@/components/Card";
import { Alert, FlatList } from "react-native";
import {
  BudgetResponse,
  deleteBudget,
  fetchUserBudgets,
} from "@/services/budget/budgetResource";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { getPortugueseMonthAndYear } from "@/utils/getPortugueseMonthAndYear";
import { AppError } from "@/utils/AppError";
import { ToastMessage } from "@/components/ToastMessage";
import { AppNavigatorRoutesProps } from "@/routes/app.routes";

export function Consult() {
  const [budgets, setBudgets] = useState<BudgetResponse[]>([]);

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const toast = useToast();

  async function fetchBudgets() {
    const data = await fetchUserBudgets();

    setBudgets(data.budgets);
  }

  const handleEdit = (id: string) => {
    navigation.navigate("updateBudget", { id });
  };

  async function handleDelete(id: string) {
    try {
      Alert.alert(
        "Excluir limite",
        "A limite não poderá ser recuperada, você deseja excluí-la?",
        [
          {
            text: "Sim",
            onPress: async () => {
              await deleteBudget(id);

              setBudgets((state) => state.filter((state) => state.id !== id));
            },
            style: "destructive",
          },
          {
            text: "Não",
            onPress: () => {},
            style: "cancel",
          },
        ]
      );
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError
        ? error.message
        : "Não foi possível excluir a senha. Tente novamente mais tarde.";

      toast.show({
        placement: "top",
        render: ({ id }) => (
          <ToastMessage id={id} title={title} action="error" />
        ),
      });
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchBudgets();
    }, [])
  );

  return (
    <Center flex={1} px="$12">
      <VStack w="100%" pt="$16" space="md">
        <Text fontWeight="$bold" fontSize="$2xl" textAlign="center" mb="$4">
          Consulta
        </Text>

        <FlatList
          data={budgets}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Box mb="$4">
              <Card
                description={getPortugueseMonthAndYear(new Date(item.date))}
                value={(item.amount_in_cents / 100).toLocaleString("pt-br", {
                  style: "currency",
                  currency: "BRL",
                })}
                onEdit={() => handleEdit(item.id)}
                onDelete={() => handleDelete(item.id)}
              />
            </Box>
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </VStack>
    </Center>
  );
}
