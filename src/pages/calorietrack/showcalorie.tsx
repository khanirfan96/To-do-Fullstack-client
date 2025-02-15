import {
    Button,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    useToast
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import AlertDialogExample from '../../components/ui/deletedialog'
import { deleteAllCall, deleteCall, getCall } from '../../utils/methods'
import AddCalorie from './addcalorie'

interface Recipe {
    _id: number;
    calories: string;
    dish: string;
    fat: string;
    ingredients: string;
}

type UpdateType = 'calories' | 'ingredients' | 'add' | null;

const ShowCalorie = () => {
    const [calorie, showCalorie] = useState<Recipe[]>([])
    const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
    const [updateType, setUpdateType] = useState<UpdateType>(null);
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

    const handleAddEntry = (recipe: Recipe) => {
        setSelectedRecipe(recipe);
        setUpdateType('calories');
    }

    const handleDelete = async (id: number) => {
        await deleteCall('calorie', 'deleterecipe/', id, toast)     
    }

    const handleDeleteAll = async () =>{
        await deleteAllCall('calorie', 'deleterecipe', 'Deleted All Calories Successfully!!', toast)
    }

    const handleAddIngredient = (recipe: Recipe) => {
        setSelectedRecipe(recipe);
        setUpdateType('ingredients');

    }

    return (
        <div>
            <div className='flex flex-row justify-between px-5 items-center'>
                <AddCalorie selectedRecipe={selectedRecipe} setSelectedRecipe={setSelectedRecipe} updateType={updateType} />
                <AlertDialogExample buttonName='Delete Calories' heading='Delete All Calories' body='Are you sure, you want to delete all your calories?' finalButton='Delete' onClick={() => handleDeleteAll()} />
            </div>
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
                                    <Button colorScheme='green' size='md' onClick={() => handleAddEntry(recipe)}>
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