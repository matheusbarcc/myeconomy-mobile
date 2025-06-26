import { Box, Center, FlatList, Text, VStack } from "@gluestack-ui/themed";
import { useState } from "react";
import { Card } from "@/components/Card";

type BudgetItem = {
    id: string;
    description: string;
    value: string;
};

export function Consult() {
    // const [budgets] = useState<BudgetItem[]>([
    //     { id: "1", description: "Janeiro/2024", value: "R$2.000" },
    //     { id: "2", description: "Fevereiro/2024", value: "R$1.800" },
    //     { id: "3", description: "Março/2024", value: "R$2.100" },
    //     { id: "4", description: "Abril/2024", value: "R$2.000" },
    //     { id: "5", description: "Maio/2024", value: "R$1.900" },
    //     { id: "6", description: "Junho/2024", value: "R$2.300" },
    //     { id: "6", description: "Junho/2024", value: "R$2.300" },
    //     { id: "6", description: "Junho/2024", value: "R$2.300" },
    //     { id: "6", description: "Junho/2024", value: "R$2.300" },
    //     { id: "6", description: "Junho/2024", value: "R$2.300" },
    //     { id: "6", description: "Junho/2024", value: "R$2.300" },
    //     { id: "6", description: "Junho/2024", value: "R$2.300" },
    //     // ...adicione os outros meses conforme desejar
    // ]);

    // const handleEdit = (id: string) => {
    //     console.log("Editar", id);
    // };

    // const handleDelete = (id: string) => {
    //     console.log("Excluir", id);
    // };

    // const renderItem = ({ item }: { item: BudgetItem }) => (
    //     <Box mb="$4">
    //         <Card
    //             description={item.description}
    //             value={item.value}
    //             onEdit={() => handleEdit(item.id)}
    //             onDelete={() => handleDelete(item.id)}
    //         />
    //     </Box>
    // );

    // return (
    //     <Center flex={1} px="$12">
    //         <VStack w="100%" pt="$16" space="md">
    //             <Text fontWeight="$bold" fontSize="$2xl" textAlign="center" mb="$4">
    //                 Consulta
    //             </Text>

    //             <FlatList<BudgetItem>
    //                 data={budgets}
    //                 keyExtractor={(item) => item.id}
    //                 renderItem={renderItem}
    //                 showsVerticalScrollIndicator={false}
    //                 contentContainerStyle={{ paddingBottom: 20 }}
    //             />
    //         </VStack>
    //     </Center>
    // );
}
