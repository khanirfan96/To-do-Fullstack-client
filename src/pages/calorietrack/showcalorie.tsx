import {
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Button, useToast } from '@chakra-ui/react'
import AlertDialogExample from '../../components/ui/deletedialog'
import { deleteCall, getCall } from '../../utils/methods'
import AddCalorie from './addcalorie'

interface Recipe {
    _id: number;
    calories: number;
    dish: string;
    fat: number;
    ingredients: string;
}

const ShowCalorie = () => {
    const [calorie, showCalorie] = useState<Recipe[]>([])
    const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
    const toast = useToast();

    useEffect(() => {
        const fetchData = async () => {
            const data = await getCall({ type: 'calorie', url: 'getrecipe' })
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


    const handleDelete = async (id: number) => {
        console.log('Delete clicked for id:', id)
        await deleteCall('calorie', 'deleterecipe/', id, toast)        // Add your delete logic here
    }

    const handleAddIngredient = (recipe: Recipe) => {
        console.log('Add ingredient clicked for id:', recipe)
        setSelectedRecipe(recipe);
        // Add your add ingredient logic here
    }

    const handleAddEntry = (id: number) => {
        console.log('Add entry clicked for id:', id)
        // Add your add entry logic here
    }

    return (
        <div>
            <AddCalorie selectedRecipe={selectedRecipe} setSelectedRecipe={setSelectedRecipe} />
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
                            <Tr key={recipe._id || index}>
                                {headers.map((header) => (
                                    <Td key={`${index}-${header}`}>
                                        {getValue(recipe, header)?.toString()}
                                    </Td>
                                ))}
                                <Td className='flex flex-row space-x-2'>
                                    <div>
                                        <AlertDialogExample buttonName='Delete Dish' heading='Delete Dish' body='Are you sure, you want to delete this particular dish?' finalButton='Delete' onClick={() => handleDelete(recipe._id)} />
                                    </div>
                                    <Button colorScheme='blue' size='md' mr={2} onClick={() => handleAddIngredient(recipe)}>
                                        Change Ingredient
                                    </Button>
                                    <Button colorScheme='green' size='md' onClick={() => handleAddEntry(recipe._id)}>
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