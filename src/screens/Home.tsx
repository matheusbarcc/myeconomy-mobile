import {
  Box,
  Center,
  Text,
  VStack,
  Button,
  ButtonText,
  Input,
  InputField,
  Progress,
  HStack,
} from "@gluestack-ui/themed";

export function Home() {
  const valorAtual = 1100;
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
        <VStack space="lg" w="80%">
          {/* Campo de mês */}
          <Box>
            <Input variant="outline" borderRadius="$md" borderColor="$black">
              <InputField
                keyboardType="numeric"
                maxLength={10}
                placeholder="Selecione o mês"
                bg="grey"
              />
            </Input>
          </Box>

          <Box>
            <HStack justifyContent="space-between" mb="$2">
              <Text fontWeight="$bold">Progresso</Text>
              <Text color="$green600">
                R${valorAtual}/{`R$${valorMeta}`}
              </Text>
            </HStack>

            <Progress
              value={progresso}
              w="$full"
              h="$10"
              bg="$coolGray200"
              borderRadius="$xl"
            />
          </Box>
        </VStack>
      </Center>
    </Box>
  );
}
