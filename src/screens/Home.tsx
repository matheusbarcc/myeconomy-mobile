import { Button } from "@/components/Button";
import { Dropdown } from "@/components/Dropdown";
import { useAuth } from "@/hooks/useAuth";
import { AppNavigatorRoutesProps } from "@/routes/app.routes";
import {
  getUserProgress,
  ProgressResponse,
} from "@/services/progress/progressResource";
import { getFirstDayOfMonth, MonthValue } from "@/utils/getFirstDayOfMonth";
import {
  Box,
  Center,
  HStack,
  Progress,
  ProgressFilledTrack,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useState } from "react";

export function Home() {
  const [progress, setProgress] = useState<ProgressResponse>(
    {} as ProgressResponse
  );

  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const [month, setMonth] = useState<MonthValue | undefined>();

  const { user } = useAuth();

  async function getProgress() {
    const data = await getUserProgress(month && getFirstDayOfMonth(month));

    if (data.progress !== null) {
      setProgress(data.progress);
    }
  }

  // object keys, verifica se o estado tem atributos ou nao, ou seja,
  // se tiver vazio (sem progresso encontrado) é false
  const hasProgressData = progress && Object.keys(progress).length > 0;
  const percentage = hasProgressData
    ? (progress.spentInCents / progress.budgetInCents) * 100
    : 0;
  const isCompleted = progress?.status === "completed";
  const isPercentageGood = percentage <= 100;

  const getUIState = () => {
    if (!hasProgressData) return "no-progress";
    if (isCompleted && isPercentageGood) return "success";
    if (isCompleted && !isPercentageGood) return "exceeded";
    if (!isPercentageGood) return "exceeded";
    return "ongoing";
  };

  useFocusEffect(
    useCallback(() => {
      setProgress({} as ProgressResponse);

      getProgress();
    }, [month])
  );

  useFocusEffect(
    useCallback(() => {
      setMonth(undefined);
    }, [])
  );

  return (
    <Box flex={1}>
      <Box mt="$16" ml="$8">
        <Text fontSize="$4xl" fontWeight="$bold" mb="$2" color="$black">
          Olá {user.name} 👋
        </Text>
        <Text color="$black">É bom te ver por aqui!</Text>
      </Box>

      <Center flex={1} px="$8" py="$8">
        <VStack space="xs" w="80%">
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

          {(() => {
            switch (getUIState()) {
              case "success":
                return (
                  <>
                    <Center mb="$3" p="$11" borderRadius="$xl" bg="$green">
                      <Text textAlign="center" fontSize="$7xl">
                        🤑
                      </Text>
                      <Text color="$black" fontSize="$lg" textAlign="center">
                        Parabéns você economizou
                      </Text>
                      <Text color="$black" fontSize="$2xl" fontWeight="$bold">
                        {(
                          (progress.budgetInCents - progress.spentInCents) /
                          100
                        ).toLocaleString("pt-br", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </Text>
                    </Center>
                  </>
                );

              case "exceeded":
                return (
                  <>
                    <Center mb="$3" p="$11" borderRadius="$xl" bg="$green">
                      <Text textAlign="center" fontSize="$7xl">
                        😰
                      </Text>
                      <Text color="$black" fontSize="$lg" textAlign="center">
                        Objetivo não atingido
                      </Text>
                      <Text color="$black" fontSize="$2xl" fontWeight="$bold">
                        -
                        {(
                          (progress.spentInCents - progress.budgetInCents) /
                          100
                        ).toLocaleString("pt-br", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </Text>
                    </Center>
                  </>
                );

              case "ongoing":
                return (
                  <>
                    <Center mb="$3" p="$11" borderRadius="$xl" bg="$green">
                      <Text textAlign="center" fontSize="$7xl">
                        😊
                      </Text>
                      <Text color="$black" fontSize="$lg">
                        Continue assim!
                      </Text>
                    </Center>
                  </>
                );

              default:
                return (
                  <>
                    <Center mb="$3" p="$11" borderRadius="$xl" bg="$green">
                      <Text textAlign="center" fontSize="$7xl">
                        😴
                      </Text>
                      <Text color="$black" fontSize="$lg">
                        Progresso não encontrado
                      </Text>
                    </Center>
                    <Button
                      label="Começar"
                      onPress={() => navigation.navigate("budgets")}
                    />
                  </>
                );
            }
          })()}

          {hasProgressData && (
            <Box>
              <HStack justifyContent="space-between" mb="$2" mt="$4">
                <Text fontWeight="$bold">Progresso</Text>
                <Text color="$black">
                  {(progress.spentInCents / 100).toLocaleString("pt-br", {
                    style: "currency",
                    currency: "BRL",
                  })}
                  /
                  {(progress.budgetInCents / 100).toLocaleString("pt-br", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </Text>
              </HStack>
              <Progress
                value={Math.min(percentage, 100)}
                w="$full"
                h="$10"
                bg="$coolGray200"
                borderRadius="$xl"
              >
                <ProgressFilledTrack bg="$green" />
              </Progress>
            </Box>
          )}
        </VStack>
      </Center>
    </Box>
  );
}
