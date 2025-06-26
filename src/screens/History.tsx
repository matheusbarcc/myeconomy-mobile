import { Dropdown } from "@/components/Dropdown";
import {
    Box,
    VStack,
    Text,
} from "@gluestack-ui/themed";
import { useState } from "react";
import { Card } from "@/components/Card";
import { FlatList } from 'react-native';

export function History() {

    const [month, setMonth] = useState('');

    type ExpenseItem = {
        id: string;
        description: string;
        value: string;
    };

    const mockData: ExpenseItem[] = [
        { id: '1', description: 'Ifood', value: 'R$100' },
        { id: '2', description: 'Uber', value: 'R$30' },
        { id: '3', description: 'Supermercado', value: 'R$250' },
    ];

    const handleEdit = (id: string) => {
        console.log('Editar item:', id);
    };

    const handleDelete = (id: string) => {
        console.log('Deletar item:', id);
    };

    const renderItem = ({ item }: { item: ExpenseItem }) => (
        <Box mb="$3">
            <Card
                description={item.description}
                value={item.value}
                onEdit={() => handleEdit(item.id)}
                onDelete={() => handleDelete(item.id)}
            />
        </Box>
    );

    return (
        <VStack flex={1} bg="$white" p="$4" pt="$16">
            {/* Título */}
            <Text
                fontSize="$2xl"
                fontWeight="$bold"
                textAlign="center"
                mb="$6"
                color="$black"
            >
                Histórico
            </Text>

            {/* Dropdown de seleção de mês */}
            <Box mb="$4">
                <Dropdown
                    placeholder="Selecione um Mês:"
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
            </Box>

            {/* Lista de cards */}
            <Box flex={1}>
                <FlatList
                    data={mockData}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 20 }}
                />
            </Box>
        </VStack>
    );
}
