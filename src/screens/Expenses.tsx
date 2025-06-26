import { Button } from "@/components/Button";
import { Dropdown } from "@/components/Dropdown";
import { Input } from "@/components/Input";
import { AppNavigatorRoutesProps } from "@/routes/app.routes";
import { Box, Center, Text, VStack } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

export function Expenses() {

  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [month, setMonth] = useState('');

  const { navigate } = useNavigation<AppNavigatorRoutesProps>();

  function handleNavigateToHistory() {
    navigate('history');
  }

  return (
    <Center flex={1} px="$12">
      <Box p="$4">
        <Text fontWeight="$bold" fontSize="$3xl" color="$black" mb="$6">
          Despesa
        </Text>
      </Box>

      <VStack space="md" w="80%" alignSelf="center">
        <Input
          label="Descrição"
          placeholder="Descrição"
          value={description}
          onChangeText={setDescription}
        />
        <Input
          label="Valor"
          placeholder="Valor"
          value={value}
          onChangeText={setValue}
        />
        <Dropdown
          label="Mês"
          options={[
            { label: "Janeiro", value: "janeiro" },
            { label: "Fevereiro", value: "fevereiro" },
            { label: "Março", value: "marco" },
            { label: "Abril", value: "abril" },
            { label: "Maio", value: "maio" },
            { label: "Junho", value: "junho" },
            { label: "Julho", value: "julho" },
            { label: "Agosto", value: "agosto" },
            { label: "Setembro", value: "setembro" },
            { label: "Outubro", value: "outubro" },
            { label: "Novembro", value: "novembro" },
            { label: "Dezembro", value: "dezembro" },
          ]}
          value={month}
          onChange={setMonth}
        />
        <Button label={"SALVAR"}></Button>
        <Button
          label="HISTÓRICO"
          onPress={handleNavigateToHistory}
        />
      </VStack>
    </Center>
  );
}
