import { Pressable } from "react-native";
import { Box, Text } from "@gluestack-ui/themed";
import { ComponentProps } from "react";

type ButtonProps = ComponentProps<typeof Pressable> & {
  label: string;
  bgColor?: string;
  textColor?: string;
};

export function Button({
  label,
  bgColor = "$green600",
  textColor = "$white",
  ...rest
}: ButtonProps) {
  return (
    <Pressable {...rest}>
      <Box
        mt="$2"
        bg={bgColor}
        p="$3"
        w="100%"
        rounded="$md"
        alignItems="center"
        alignSelf="center"
      >
        <Text color={textColor} fontWeight="$bold">
          {label}
        </Text>
      </Box>
    </Pressable>
  );
}
