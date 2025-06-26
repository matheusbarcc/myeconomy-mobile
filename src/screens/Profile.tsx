import { Button } from "@/components/Button";
import { useAuth } from "@/hooks/useAuth";
import { Box, Center, Text, VStack } from "@gluestack-ui/themed";

export function Profile() {
  const { user, signOut } = useAuth();

  return (
    <Box flex={1}>
      <Center flex={1} px="$8" py="$8">
        <Text fontSize="$4xl" fontWeight="$bold" mb="$8" color="$black">
          Meus Dados
        </Text>

        <VStack space="lg" alignItems="flex-start" w="70%">
          <Box>
            <Text fontWeight="$bold" color="$black">
              Nome
            </Text>
            <Text color="$black">{user.name}</Text>
          </Box>

          <Box>
            <Text fontWeight="$bold" color="$black">
              Email
            </Text>
            <Text color="$black">{user.email}</Text>
          </Box>

          <Box>
            <Text fontWeight="$bold" color="$black">
              Data de nascimento
            </Text>
            <Text color="$black">
              {new Date(user.birthday).toLocaleDateString("pt-br")}
            </Text>
          </Box>
        </VStack>

        <Button label="Sair" onPress={signOut} />
      </Center>
    </Box>
  );
}
