import { FC } from 'react';
import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, useDisclosure, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaFireFlameCurved } from "react-icons/fa6";
import useAuthStore from "../../store/todo";
import { AddCalorieProps, UpdateType } from "./types";

const AddCalorie: FC<AddCalorieProps> = ({ selectedRecipe, setSelectedRecipe, updateType = null }) => {

    const initialFormData = { dish: '', ingredient: '', calories: '', fat: '' };
    const [formData, setFormData] = useState(initialFormData);
    const [currentUpdateType, setCurrentUpdateType] = useState<UpdateType>(updateType);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const { postData, fetchData, putData } = useAuthStore();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    useEffect(() => {
        if (selectedRecipe) {
            setFormData({
                dish: selectedRecipe.dish,
                ingredient: selectedRecipe.ingredients,
                calories: selectedRecipe.calories,
                fat: selectedRecipe.fat
            });
            setCurrentUpdateType(updateType);
            onOpen();
        }
    }, [selectedRecipe, updateType]);



    const handleClose = () => {
        setFormData(initialFormData);
        setSelectedRecipe(null);
        setCurrentUpdateType(null);
        onClose();
    };

    const handleSaveCalorie = async () => {
        try {
            if (selectedRecipe && updateType === 'calories') {
                // Handle calories update
                await putData('calorie', `putrecipe/`,selectedRecipe._id, {
                    calories: parseInt(formData.calories),
                    dish: formData.dish,
                    fat: parseInt(formData.fat),
                    ingredients: formData.ingredient,
                });
                toast({ title: "Added", description: "Recipe updated successfully", status: "success", duration: 3000, isClosable: true });
            } else if (selectedRecipe && updateType === 'ingredients') {
                // Handle ingredients update
                await putData('calorie', `putingredients/`,selectedRecipe._id, {
                    ingredients: formData.ingredient
                });
                toast({
                    title: "Added",
                    description: "Recipe ingredients updated successfully",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
            } else {
                // Handle new entry
                await postData('calorie', 'postrecipe', {
                    calories: parseInt(formData.calories),
                    dish: formData.dish,
                    fat: parseInt(formData.fat),
                    ingredients: formData.ingredient,
                });
                toast({
                    title: "Success",
                    description: "New Calorie added successfully",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
            }

            // Refresh the calories data
            await fetchData('calorie', 'getrecipe');
            handleClose();
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.message || "Failed to save recipe",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const validateForm = () => {
        if (!updateType || updateType === 'calories') {
            return !formData.dish || !formData.calories || !formData.fat;
        }
        return !formData.ingredient;
    };


    return (
        <div >
            <Stack direction='row' spacing={4} mt={4} w={"2xl"}>
                <Button onClick={onOpen} rightIcon={<FaFireFlameCurved />} colorScheme='blue' variant='outline'>
                    Add your Calories
                </Button>
            </Stack>
            <Modal isOpen={isOpen} onClose={handleClose} >
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
                                disabled={updateType === 'ingredients'}
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
                                type="text"
                                id="calories"
                                placeholder='Calories'
                                disabled={updateType === 'ingredients'}
                                value={formData.calories}
                                onChange={handleChange}
                            />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Fat</FormLabel>
                            <Input
                                type="text"
                                id="fat"
                                placeholder='Fat'
                                disabled={updateType === 'ingredients'}
                                value={formData.fat}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={handleClose}>Cancel</Button>
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
