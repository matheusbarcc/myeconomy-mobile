import { Input } from "@/components/Input";
import { Dropdown } from "@/components/Dropdown";
import { Box, Center, Text, VStack } from "@gluestack-ui/themed";
import { useState } from "react";
import { Pressable } from 'react-native';

export function Expenses() {

  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [month, setMonth] = useState('');

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
        <Pressable>
          <Box
            mt="$2"
            bg="$green600"
            p="$3"
            w="100%"
            rounded="$md"
            alignItems="center"
            alignSelf="center"
          >
            <Text color="$white" fontWeight="$bold">
              SALVAR
            </Text>
          </Box>
        </Pressable>
      </VStack>
    </Center>
  );
}
