import { AuthNavigatorRoutesProps } from "@/routes/auth.routes";
import {
  Box,
  Button,
  ButtonText,
  Center,
  Input,
  InputField,
  Pressable,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";

export function SignUp() {
  const { navigate } = useNavigation<AuthNavigatorRoutesProps>();

  return (
    <Box flex={1}>
      <Center flex={1} px="$8" py="$8">
        <Text fontSize="$4xl" fontWeight="$bold" mb="$8" color="$black">
          CRIAR
        </Text>

        <VStack space="lg" w="70%">
          <Box>
            <Text fontWeight="$bold" color="$black">
              Nome
            </Text>
            <Input variant="outline" borderRadius="$md" borderColor="$black">
              <InputField />
            </Input>
          </Box>

          <Box>
            <Text fontWeight="$bold" color="$black">
              Email
            </Text>
            <Input variant="outline" borderRadius="$md" borderColor="$black">
              <InputField keyboardType="email-address" />
            </Input>
          </Box>

          {/*Alterar para um date picker melhor  */}
          <Box>
            <Text fontWeight="$bold" color="$black">
              Data de nascimento
            </Text>
            <Input variant="outline" borderRadius="$md" borderColor="$black">
              <InputField keyboardType="numeric" maxLength={10} />
            </Input>
          </Box>

          <Box>
            <Text fontWeight="$bold" color="$black">
              Senha
            </Text>
            <Input variant="outline" borderRadius="$md" borderColor="$black">
              <InputField secureTextEntry={true} />
            </Input>
          </Box>

          <Box>
            <Text fontWeight="$bold" color="$black">
              Confirmar senha
            </Text>
            <Input variant="outline" borderRadius="$md" borderColor="$black">
              <InputField secureTextEntry={true} />
            </Input>
          </Box>
        </VStack>

        <Button mt="$10" bg="$green" borderRadius="$xl" w="70%" height={50}>
          <ButtonText fontSize="$lg">Criar</ButtonText>
        </Button>

        <Pressable p="$2" onPress={() => navigate("signIn")}>
          <Text color="$black" fontSize="$sm">
            Voltar
          </Text>
        </Pressable>
      </Center>
    </Box>
  );
}
