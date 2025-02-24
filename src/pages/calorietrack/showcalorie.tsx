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
import useAuthStore from '../../store/todo'
import AddCalorie from './addcalorie'
import {  Recipe, RecipeHeader, UpdateType } from './types'

const ShowCalorie = () => {
    const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
    const [updateType, setUpdateType] = useState<UpdateType>(null);
    const toast = useToast();

    // Get store functions and data
    const { data, fetchData, deleteOneData, deleteData } = useAuthStore();
    const calories = data.calories as Recipe[];

    console.log(calories, 'fhohfhs')

    useEffect(() => {
        const loadData = async () => {
            try {
                await fetchData('calorie', 'getrecipe');
            } catch (error) {
                toast({ title: "Error", description: "Failed to load calories data", status: "error", duration: 3000, isClosable: true });
            }
        };
        loadData();
    }, [fetchData, toast]);

    const getHeaders = (): RecipeHeader[] => {
        if (!calories.length) return ['dish', 'ingredients', 'calories', 'fat'] as RecipeHeader[];
    
        const allKeys = calories.reduce((keys, obj) => {
            Object.keys(obj).forEach(key => {
                if (key !== '_id' && typeof obj[key] !== 'number') {
                    keys.add(key as RecipeHeader);
                }
            });
            return keys;
        }, new Set<RecipeHeader>());
        return Array.from(allKeys);
    };
    
    const getDisplayHeader = (header: string): string => {
        return header.charAt(0).toUpperCase() + header.slice(1).toLowerCase();
    };

    const headers = getHeaders()

    const getValue = (recipe: Recipe, header: RecipeHeader):string => {
        const value = recipe[header];
        return value?.toString() || '';
    }

    const handleAddEntry = (recipe: Recipe) => {
        setSelectedRecipe(recipe);
        setUpdateType('calories');
    }

   
    const handleDelete = async (id: number) => {
        try {
            await deleteOneData('calorie', `deleterecipe/`, id);
            toast({ title: "Success", description: "Recipe deleted successfully", status: "success", duration: 3000, isClosable: true });
            // Data will be automatically refreshed by the store
        } catch (error) {
            toast({ title: "Error", description: "Failed to delete recipe", status: "error", duration: 3000, isClosable: true });
        }
    };

    const handleDeleteAll = async () => {
        try {
            await deleteData('calorie', 'deleterecipe');
            toast({ title: "Success", description: "All calories deleted successfully", status: "success", duration: 3000, isClosable: true });
            // Data will be automatically refreshed by the store
        } catch (error) {
            toast({ title: "Error", description: "Failed to delete all recipes", status: "error", duration: 3000, isClosable: true });
        }
    };

    const handleAddIngredient = (recipe: Recipe) => {
        setSelectedRecipe(recipe);
        setUpdateType('ingredients');

    }

    return (
        <div>
            <div className='flex flex-row justify-between px-5 items-center'>
                <AddCalorie selectedRecipe={selectedRecipe} setSelectedRecipe={setSelectedRecipe} updateType={updateType} />
                <AlertDialogExample buttonName='Delete Calories' heading='Delete All Calories' body='Are you sure, you want to delete all your calories?' finalButton='Delete' onClick={handleDeleteAll} />
            </div>
            <TableContainer>
                <Table variant='striped' colorScheme='teal'>
                    <Thead>
                        <Tr>
                            {headers.map((header) => (
                                <Th key={header}>{getDisplayHeader(header)}</Th>
                            ))}
                            <Th>Actions</Th>
                        </Tr>
                    </Thead>

                    <Tbody>
                        {calories.map((recipe, index) => (
                            <Tr key={recipe._id || index}>
                                {headers.map((header) => (
                                    <Td key={`${index}-${header}`}>
                                        {getValue(recipe, header)}
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