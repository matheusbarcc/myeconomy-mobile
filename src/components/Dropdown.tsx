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

type Option = {
    label: string;
    value: string;
};

type DropdownProps = {
    label?: string;
    options: Option[];
    value?: string;
    onChange: (value: string) => void;
    errorMessage?: string | null;
    isInvalid?: boolean;
};

export function Dropdown({
    label,
    options,
    value,
    onChange,
    errorMessage = null,
    isInvalid = false,
}: DropdownProps) {
    const [open, setOpen] = useState(false);

    const invalid = !!errorMessage || isInvalid;
    const selectedLabel = options.find((o) => o.value === value)?.label ?? "Selecione";

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
                    {options.map((option) => (
                        <Pressable
                            key={option.value}
                            px="$4"
                            py="$3"
                            onPress={() => {
                                onChange(option.value);
                                setOpen(false);
                            }}
                        >
                            <Text color="$black">{option.label}</Text>
                        </Pressable>
                    ))}
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
