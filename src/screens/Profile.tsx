import {
  Box,
  Center,
  Text,
  VStack,
  Button,
  ButtonText
} from "@gluestack-ui/themed";

export function Profile() {
  return (
    <Box flex={1}>
      <Center flex={1} px="$8" py="$8">
        <Text fontSize="$4xl" fontWeight="$bold" mb="$8" color="$black">
          Meus Dados
        </Text>

        <VStack space="lg" alignItems="flex-start" w="70%">
          <Box>
            <Text fontWeight="$bold" color="$black">Nome</Text>
            <Text color="$black">João</Text>
          </Box>

          <Box>
            <Text fontWeight="$bold" color="$black">Email</Text>
            <Text color="$black">joao@gmail.com</Text>
          </Box>

          <Box>
            <Text fontWeight="$bold" color="$black">Data de nascimento</Text>
            <Text color="$black">09/12/1987</Text>
          </Box>
        </VStack>

        <Button mt="$10" bg="$green600" borderRadius="$xl" w="70%" height={50}>
          <ButtonText fontSize="$lg">SAIR</ButtonText>
        </Button>
      </Center>
    </Box>
  );
}
