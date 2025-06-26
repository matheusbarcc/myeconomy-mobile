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
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// cria o schema para validacao dos campos do formulario
const signUpSchema = yup.object({
  name: yup.string().required("O nome é obrigatório."),
  email: yup
    .string()
    .required("O e-mail é obrigatório.")
    .email("O e-mail deve ser válido."),
  birthday: yup.date().required("A data de nascimento é obrigatória."),
  password: yup
    .string()
    .required("A senha é obrigatória.")
    .min(3, "A senha deve ter no mínimo 3 dígitos."),
  password_confirmation: yup
    .string()
    .required("Confirme a senha.")
    .oneOf([yup.ref("password")], "As senhas não conferem."),
});

// cria uma tipagem com base no schema
type signUpData = yup.InferType<typeof signUpSchema>;

export function SignUp() {
  /*
    desestrutura o objeto retornado pelo useForm, retirando as propriedades
    nescessarias 
  */
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    // define o schema criado antes como "validador" do formulario
    resolver: yupResolver(signUpSchema),
  });

  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  async function handleSignUp(data: signUpData) {
    console.log(data);
  }

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

            <Controller
              name="name"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  variant="outline"
                  borderRadius="$md"
                  borderColor="$black"
                >
                  <InputField
                    placeholder="Nome"
                    onChangeText={onChange}
                    value={value}
                  />
                </Input>
              )}
            />
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

        <Pressable p="$2" onPress={() => navigation.navigate("signIn")}>
          <Text color="$black" fontSize="$sm">
            Voltar
          </Text>
        </Pressable>
      </Center>
    </Box>
  );
}
