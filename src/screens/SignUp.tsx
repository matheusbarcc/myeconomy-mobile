import { AuthNavigatorRoutesProps } from "@/routes/auth.routes";
import {
  Box,
  Center,
  Pressable,
  Text,
  useToast,
  VStack,
} from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "@/components/Input";
import { DatePicker } from "@/components/DatePicker";
import { Button } from "@/components/Button";
import { useAuth } from "@/hooks/useAuth";
import { ToastMessage } from "@/components/ToastMessage";
import { AppError } from "@/utils/AppError";

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
  const { signUp, isLoading } = useAuth();

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

  // toast para exibir mensagens de erro ou sucesso usado no metodo handleSignUp
  const toast = useToast();

  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  async function handleSignUp(data: signUpData) {
    try {
      await signUp(data);

      // toast de sucesso
      toast.show({
        placement: "top",
        duration: 1000 * 2,
        render: ({ id }) => (
          <ToastMessage
            id={id}
            title="Conta criada com sucesso!"
            action="success"
          />
        ),
      });

      navigation.navigate("signIn");
    } catch (error) {
      // verifica se é um erro conhecido
      const isAppError = error instanceof AppError;

      /* 
        se for conhecido exibe a mensagem retornada pelo backend, se nao, exibe
        uma mensagem generica
      */
      const title = isAppError
        ? error.message
        : "Não foi possível criar a conta. Tente novamente mais tarde.";

      // toast de erro
      toast.show({
        placement: "top",
        render: ({ id }) => (
          <ToastMessage id={id} title={title} action="error" />
        ),
      });
    }
  }

  return (
    <Box flex={1}>
      <Center flex={1} px="$8" py="$8">
        <Text fontSize="$4xl" fontWeight="$bold" mb="$8" color="$black">
          CADASTRAR-SE
        </Text>

        <VStack space="lg" w="70%">
          <Box>
            <Text fontWeight="$bold" color="$black">
              Nome
            </Text>

            {/*
              o componente controller recebe propriedade control retirada do 
              useForm para poder relacionar o input com useForm, 
              tambem recebe o nome do campo que vai ser relacionado e o render é o 
              componente de input que vai ser renderizado
            */}
            <Controller
              name="name"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Nome"
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.name?.message}
                />
              )}
            />
          </Box>

          <Box>
            <Text fontWeight="$bold" color="$black">
              Email
            </Text>

            <Controller
              name="email"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="E-mail"
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.email?.message}
                />
              )}
            />
          </Box>

          <Box>
            <Text fontWeight="$bold" color="$black">
              Data de nascimento
            </Text>

            <Controller
              name="birthday"
              control={control}
              render={({ field: { onChange, value } }) => (
                <DatePicker
                  value={value}
                  onChange={onChange}
                  placeholder="Data de nascimento"
                  errorMessage={errors.birthday?.message}
                />
              )}
            />
          </Box>

          <Box>
            <Text fontWeight="$bold" color="$black">
              Senha
            </Text>

            <Controller
              name="password"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Senha"
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.password?.message}
                  secureTextEntry
                />
              )}
            />
          </Box>

          <Box>
            <Text fontWeight="$bold" color="$black">
              Confirmar senha
            </Text>

            <Controller
              name="password_confirmation"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Confirme a senha"
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.password_confirmation?.message}
                  secureTextEntry
                />
              )}
            />
          </Box>
        </VStack>

        {/* 
          quando clicar no botao a funcao handleSubmit retirada do useForm
          executa a funcao handleSignUp passando os dados do formulario como
          parametro
        */}
        <Button
          label="Cadastrar-se"
          disabled={isSubmitting || isLoading}
          onPress={handleSubmit(handleSignUp)}
        />

        <Pressable p="$2" onPress={() => navigation.navigate("signIn")}>
          <Text color="$black" fontSize="$sm">
            Voltar
          </Text>
        </Pressable>
      </Center>
    </Box>
  );
}
