import { Dropdown } from "@/components/Dropdown";
import { Box, VStack, Text, useToast } from "@gluestack-ui/themed";
import { useCallback, useEffect, useState } from "react";
import { Card } from "@/components/Card";
import { Alert, FlatList } from "react-native";
import {
  deleteExpense,
  ExpenseResponse,
  fetchUserExpenses,
} from "@/services/expense/expenseResource";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { getFirstDayOfMonth, MonthValue } from "@/utils/getFirstDayOfMonth";
import { AppNavigatorRoutesProps } from "@/routes/app.routes";
import { AppError } from "@/utils/AppError";
import { ToastMessage } from "@/components/ToastMessage";

export function History() {
  const [expenses, setExpenses] = useState<ExpenseResponse[]>([]);
  const [month, setMonth] = useState<MonthValue | undefined>();

  const toast = useToast();

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  // chama a api, se for selecionado um mes tras apenas as despesas daquele mes
  // se nao, tras todas as despesas
  async function fetchExpenses() {
    const data = await fetchUserExpenses(
      month ? getFirstDayOfMonth(month) : undefined
    );

    setExpenses(data.expenses);
  }

  function handleEdit(id: string) {
    navigation.navigate("updateExpense", { id });
  }

  async function handleDelete(id: string) {
    try {
      // dispara um alerta para confirmar se realmente deseja excluir a despesa
      Alert.alert(
        "Excluir despesa",
        "A despesa não poderá ser recuperada, você deseja excluí-la?",
        [
          {
            text: "Sim",
            onPress: async () => {
              // caso sim, executa metodo para remover do banco
              await deleteExpense(id);

              // atualiza estado com despesas para refletir na tela instantaneamente
              setExpenses((state) => state.filter((state) => state.id !== id));
            },
            style: "destructive",
          },
          {
            // caso nao, nao faz nada e fecha o alerta
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

  // useFocusEffect ao inves do useEffect por causa do cache de telas gerado pelo
  // react navigation, o useFocusEffect() junto com o useCallback() vai forcar o
  // metodo de buscar do banco, toda vez q entrar na tela ou o estado de month mudar
  useFocusEffect(
    useCallback(() => {
      fetchExpenses();
    }, [month])
  );

  // criei outro useFocusEffect pra limpar o filtro de mes quando entrar na tela,
  // fiz separado pq esse nao tem a dependencia do mes, so executando uma vez quando
  // o usuario entrar na tela
  useFocusEffect(
    useCallback(() => {
      setMonth(undefined);
    }, [])
  );

  return (
    <VStack flex={1} bg="$white" p="$4" pt="$16">
      {/* Título */}
      <Text
        fontSize="$2xl"
        fontWeight="$bold"
        textAlign="center"
        mb="$6"
        color="$black"
      >
        Histórico
      </Text>

      {/* Dropdown de seleção de mês */}
      <Box mb="$4">
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
          onChange={setMonth}
        />
      </Box>

      {/* Lista de cards */}
      <Box flex={1}>
        <FlatList
          data={expenses}
          renderItem={({ item }) => (
            <Box mb="$3">
              <Card
                description={item.description}
                value={(item.amount_in_cents / 100).toLocaleString("pt-br", {
                  style: "currency",
                  currency: "BRL",
                })}
                onEdit={() => handleEdit(item.id)}
                onDelete={() => handleDelete(item.id)}
              />
            </Box>
          )}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
          ListEmptyComponent={<Text>Nenhum dado encontrado</Text>}
        />
      </Box>
    </VStack>
  );
}
