import { Input } from "@/components/CustomTextInput";
import { Box, Center, Text, VStack } from "@gluestack-ui/themed";
import { useState } from "react";

export function Expenses() {

  const [value, setValue] = useState('');
  const [month, setMonth] = useState('');

  return (
    <Center flex={1} px='$12'>
        <Box p="$4">
          <Text fontWeight="$bold" fontSize="$3xl" color="$black">
            Despesa
          </Text>
        </Box>
        <Box w='$full'>
          <Input
            label="Valor"
            placeholder="Valor"
            value={value}
            onChangeText={setValue}
          />
          <Input
            label="Mês"
            placeholder="Mês"
            value={month}
            onChangeText={setMonth}
          />
        </Box>
    </Center>
  );
}
