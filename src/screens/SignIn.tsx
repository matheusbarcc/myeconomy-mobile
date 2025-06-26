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

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "@/hooks/useAuth";
import { Controller, useForm } from "react-hook-form";
import { AppError } from "@/utils/AppError";
import { ToastMessage } from "@/components/ToastMessage";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";

const signInSchema = yup.object({
  email: yup
    .string()
    .required("Preencha o e-mail.")
    .email("O e-mail deve ser válido."),
  password: yup.string().required("Preencha a senha."),
});

type signInData = yup.InferType<typeof signInSchema>;

export function SignIn() {
  const { signIn } = useAuth();

  const toast = useToast();

  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(signInSchema),
  });

  async function handleSignIn(data: signInData) {
    try {
      await signIn(data.email, data.password);
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError
        ? error.message
        : "Não foi possível fazer login. Tente novamente mais tarde.";

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
          ENTRAR
        </Text>

        <VStack space="lg" w="70%">
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
        </VStack>

        <Button label="Entrar" onPress={handleSubmit(handleSignIn)} />

        <Pressable p="$2" onPress={() => navigation.navigate("signUp")}>
          <Text color="$black" fontSize="$sm">
            Não possui conta? Crie aqui
          </Text>
        </Pressable>
      </Center>
    </Box>
  );
}
