import { useState } from "react";
import {
  FormControl,
  Text,
  Box,
  Pressable,
  HStack,
  View,
} from "@gluestack-ui/themed";
import { CaretDown } from "phosphor-react-native";
import { FlatList } from "react-native";
import { MonthValue } from "@/utils/getFirstDayOfMonth";

type Option = {
  label: string;
  value: MonthValue;
};

type DropdownProps = {
  label?: string;
  options: Option[];
  value?: MonthValue;
  onChange: (value: MonthValue) => void;
  errorMessage?: string | null;
  isInvalid?: boolean;
  placeholder?: string;
};

export function Dropdown({
  label,
  options,
  value,
  onChange,
  errorMessage = null,
  isInvalid = false,
  placeholder,
}: DropdownProps) {
  const [open, setOpen] = useState(false);

  const invalid = !!errorMessage || isInvalid;
  const selectedLabel =
    options.find((o) => o.value === value)?.label ?? placeholder ?? "Selecione";

  return (
    <FormControl isInvalid={invalid} w="$full">
      {label && (
        <Text size="md" fontWeight="$bold" marginBottom="$2" color="$black">
          {label}
        </Text>
      )}

      <Pressable
        onPress={() => setOpen((prev) => !prev)}
        px="$4"
        h="$12"
        bg="$base600"
        borderWidth={1}
        borderColor={invalid ? "$red500" : "$base500"}
        rounded="$lg"
        justifyContent="center"
      >
        <HStack alignItems="center" justifyContent="space-between" w="100%">
          <Text color={value ? "$black" : "$base400"}>{selectedLabel}</Text>
          <CaretDown size={20} color={invalid ? "#f43f5e" : "#6b7280"} />
        </HStack>
      </Pressable>

      {open && (
        <Box
          bg="$base600"
          borderWidth={1}
          borderColor="$base500"
          mt="$2"
          rounded="$md"
          maxHeight={150}
          overflow="hidden"
        >
          <FlatList
            data={options}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => (
              <Pressable
                px="$4"
                py="$3"
                onPress={() => {
                  onChange(item.value);
                  setOpen(false);
                }}
              >
                <Text color="$black">{item.label}</Text>
              </Pressable>
            )}
          />
        </Box>
      )}

      {errorMessage && (
        <Text color="$red500" mt="$2">
          {errorMessage}
        </Text>
      )}
    </FormControl>
  );
}
