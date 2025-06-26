import { Box, HStack, Pressable } from "@gluestack-ui/themed";
import { PencilSimple, Trash } from "phosphor-react-native";

type ActionsProps = {
    onEdit?: () => void;
    onDelete?: () => void;
};

export function Actions({ onEdit, onDelete }: ActionsProps) {
    return (
        <HStack space="sm">
            {/* Botão de Editar */}
            <Pressable onPress={onEdit}>
                <Box
                    w="$12"           // largura maior
                    h="$12"           // altura maior
                    bg="$green500"
                    borderRadius="$lg"
                    justifyContent="center"
                    alignItems="center"
                >
                    <PencilSimple size={22} color="white" />
                </Box>
            </Pressable>

            {/* Botão de Deletar */}
            <Pressable onPress={onDelete}>
                <Box
                    w="$12"           // largura maior
                    h="$12"           // altura maior
                    bg="$green500"
                    borderRadius="$lg"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Trash size={22} color="white" />
                </Box>
            </Pressable>
        </HStack>
    );
}
