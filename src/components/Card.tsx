import { Box, HStack, Text } from "@gluestack-ui/themed";
import { Actions } from "./Actions";

type CardProps = {
    description: string;
    value: string;
    onEdit?: () => void;
    onDelete?: () => void;
};

export function Card({ description, value, onEdit, onDelete }: CardProps) {
    return (
        <HStack space="sm" alignItems="center" w="100%">
            {/* Área verde para texto - ocupa a maior parte do espaço */}
            <Box
                flex={1}
                bg="$green500"
                p="$4"
                borderRadius="$lg"
            >
                <HStack justifyContent="space-between" alignItems="center">
                    <Text
                        fontWeight="$semibold"
                        color="$white"
                        fontSize="$md"
                        flex={1}
                        mr="$3"
                    >
                        {description}
                    </Text>
                    <Text
                        fontWeight="$semibold"
                        color="$white"
                        fontSize="$md"
                        flexShrink={0}
                    >
                        {value}
                    </Text>
                </HStack>
            </Box>

            {/* Botões fora da área verde */}
            <Actions onEdit={onEdit} onDelete={onDelete} />
        </HStack>
    );
}