import { useEffect, useState } from 'react'
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import { getRecipe } from '../../utils/methods'

interface Recipe {
    id: number;
    Calories: number;
    Dish: string;
    Fat: number;
    Ingredients: string;
}

const ShowCalorie = () => {
    const [calorie, showCalorie] = useState<Recipe[]>([])

    useEffect(() => {
        const fetchData = async () => {
            const data = await getRecipe()
            if (data) {
                showCalorie(data)
            }
        }
        fetchData()
    }, [])

    const getHeaders = () => {
        const allKeys = calorie.reduce((keys, obj) => {
            Object.keys(obj).forEach(key => {
                if (key !== '_id') {
                    // Capitalize first letter for consistency
                    const normalizedKey = key.charAt(0).toUpperCase() + key.slice(1).toLowerCase()
                    keys.add(normalizedKey)
                }
            })
            return keys
        }, new Set<string>())
        return Array.from(allKeys)
    }

    const headers = getHeaders()

    const getValue = (obj: Recipe, header: string) => {
        const lowerHeader = header.toLowerCase()
        const upperHeader = header.charAt(0).toUpperCase() + header.slice(1)
        return obj[lowerHeader as keyof Recipe] || obj[upperHeader as keyof Recipe]
    }


    const handleDelete = (id: number) => {
        console.log('Delete clicked for id:', id)
        // Add your delete logic here
    }

    const handleAddIngredient = (id: number) => {
        console.log('Add ingredient clicked for id:', id)
        // Add your add ingredient logic here
    }

    const handleAddEntry = (id: number) => {
        console.log('Add entry clicked for id:', id)
        // Add your add entry logic here
    }

    return (
        <div>
            <TableContainer>
                <Table variant='striped' colorScheme='teal'>
                    <Thead>
                        <Tr>
                            {headers.map((header) => (
                                <Th key={header}>{header}</Th>
                            ))}
                        </Tr>
                    </Thead>

                    <Tbody>
                        {calorie.map((recipe, index) => (
                            <Tr key={recipe.id || index}>
                                {headers.map((header) => (
                                    <Td key={`${index}-${header}`}>
                                        {getValue(recipe, header)?.toString()}
                                    </Td>
                                ))}
                                <Td>
                                    <Button
                                        colorScheme='red'
                                        size='sm'
                                        mr={2}
                                        onClick={() => handleDelete(recipe.id)}
                                    >
                                        Delete
                                    </Button>
                                    <Button
                                        colorScheme='blue'
                                        size='sm'
                                        mr={2}
                                        onClick={() => handleAddIngredient(recipe.id)}
                                    >
                                        Change Ingredient
                                    </Button>
                                    <Button
                                        colorScheme='green'
                                        size='sm'
                                        onClick={() => handleAddEntry(recipe.id)}
                                    >
                                        Edit Calories
                                    </Button>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>

        </div>
    )
}

export default ShowCalorie