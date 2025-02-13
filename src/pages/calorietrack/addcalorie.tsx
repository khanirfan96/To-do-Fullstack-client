import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, useDisclosure, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaFireFlameCurved } from "react-icons/fa6";
import { postCall, putCall } from "../../utils/methods";

interface Recipe {
    _id: number;
    calories: number;
    dish: string;
    fat: number;
    ingredients: string;
}
interface AddCalorieProps {
    selectedRecipe: Recipe | null;
    setSelectedRecipe: (recipe: Recipe | null) => void;
}

const AddCalorie = ({ selectedRecipe, setSelectedRecipe }: AddCalorieProps) => {

    const initialFormData = { dish: '', ingredient: '', calorie: 0, fat: 0 };
    const [formData, setFormData] = useState(initialFormData);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    useEffect(() => {
         console.log(formData, 'ffjfja')
         console.log(selectedRecipe, 'selectedRecipeselectedRecipe')
        if (selectedRecipe) {
            setFormData({
                dish: selectedRecipe.dish,
                ingredient: selectedRecipe.ingredients,
                calorie: selectedRecipe.calories,
                fat: selectedRecipe.fat
            });
            onOpen();
        }
    }, [selectedRecipe]);

    

    const handleClose = () => {
        setFormData(initialFormData);
        setSelectedRecipe(null);
        onClose();
    };

    const handleSaveCalorie = async() => {
        if (selectedRecipe) {
            // Handle update
            await putCall('calorie',`putrecipe/`,selectedRecipe._id,{calorie: formData.calorie, dish: formData.dish, fat: formData.fat, ingredients: formData.ingredient,},
                'Recipe updated successfully',
                toast
            );
        } else {
            // Handle new entry
            await postCall('calorie', 'postrecipe',{ calorie: formData.calorie, dish: formData.dish, fat: formData.fat, ingredients: formData.ingredient,},
                'New Calorie added successfully',
                toast
            );
        }
        handleClose();
    }

    return (
        <div >
            <Stack direction='row' spacing={4} mt={4} w={"2xl"}>
                <Button onClick={onOpen} rightIcon={<FaFireFlameCurved />} colorScheme='blue' variant='outline'>
                    Add your Calories
                </Button>
            </Stack>
            <Modal isOpen={isOpen} onClose={onClose} >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>   {selectedRecipe ? 'Edit Recipe' : 'Add your Calories to track'} </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Dish</FormLabel>
                            <Input
                                type="text"
                                id="dish"
                                placeholder='Dish'
                                value={formData.dish}
                                onChange={handleChange}
                            />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Ingredients</FormLabel>
                            <Input
                                type="text"
                                id="ingredient"
                                placeholder='Ingredients'
                                value={formData.ingredient}
                                onChange={handleChange}
                            />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Calories</FormLabel>
                            <Input
                                type="number"
                                id="calorie"
                                placeholder='Calories'
                                value={formData.calorie}
                                onChange={handleChange}
                            />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Fat</FormLabel>
                            <Input
                                type="number"
                                id="fat"
                                placeholder='Fat'
                                value={formData.fat}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button colorScheme='blue' ml={3} onClick={handleSaveCalorie}>
                        {selectedRecipe ? 'Update' : 'Save'}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default AddCalorie;
