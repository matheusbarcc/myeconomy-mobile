import {
  Box,
  Center,
  Text,
  VStack,
  Input,
  InputField,
  Progress,
  HStack,
  ProgressFilledTrack,
} from "@gluestack-ui/themed";
import { LinearGradient } from "expo-linear-gradient";
import { gluestackUIConfig } from "../../config/gluestack-ui.config";

export function Home() {
  const theme = gluestackUIConfig.tokens.colors;

  const valorAtual = 1300;
  const valorMeta = 1500;
  const progresso = (valorAtual / valorMeta) * 100;

  return (
    <Box flex={1}>
      <Box mt="$8" ml="$8">
        <Text fontSize="$4xl" fontWeight="$bold" mb="$2" color="$black">
          Olá João 👋
        </Text>
        <Text color="$black">É bom te ver por aqui!</Text>
      </Box>

      <Center flex={1} px="$8" py="$8">
        <VStack space="xs" w="80%">
          {/* Campo de mês */}
          <Box gap="$6">
            <Input variant="outline" borderRadius="$md" borderColor="$black">
              <InputField
                keyboardType="numeric"
                maxLength={10}
                placeholder="Selecione o mês"
                bg="grey"
              />
            </Input>
            <LinearGradient
              colors={[theme.green, theme.green200]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={{
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Center mb="$3" p="$11" borderRadius="$xl">
                <Text textAlign="center" fontSize="$7xl">
                  🙂
                </Text>
                <Text color="$black" fontSize="$lg">
                  Continue assim!
                </Text>
              </Center>
            </LinearGradient>
          </Box>

          <Box>
            <HStack justifyContent="space-between" mb="$2" mt="$4">
              <Text fontWeight="$bold">Progresso</Text>
              <Text color="$black">
                R${valorAtual}/{`R$${valorMeta}`}
              </Text>
            </HStack>

            <Progress
              value={progresso}
              w="$full"
              h="$10"
              bg="$coolGray200"
              borderRadius="$xl"
            >
              <ProgressFilledTrack bg="$green" />
            </Progress>
          </Box>
        </VStack>
      </Center>
    </Box>
  );
}
