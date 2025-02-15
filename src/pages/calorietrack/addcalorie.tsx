import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, useDisclosure, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaFireFlameCurved } from "react-icons/fa6";
import { postCall, putCall } from "../../utils/methods";

interface Recipe {
    _id: number;
    calories: string;
    dish: string;
    fat: string;
    ingredients: string;
}

type UpdateType = 'calories' | 'ingredients' | 'add' | null;
interface AddCalorieProps {
    selectedRecipe: Recipe | null;
    setSelectedRecipe: (recipe: Recipe | null) => void;
    updateType?: UpdateType;
}

const AddCalorie = ({ selectedRecipe, setSelectedRecipe, updateType = null }: AddCalorieProps) => {

    const initialFormData = { dish: '', ingredient: '', calories: '', fat: '' };
    const [formData, setFormData] = useState(initialFormData);
    const [currentUpdateType, setCurrentUpdateType] = useState<UpdateType>(updateType);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    console.log(updateType, 'updateTypeupdateType')

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

    // useEffect(()=>{

    // },[handleClose()])

    const handleSaveCalorie = async () => {
        if (selectedRecipe && updateType === 'calories') {
            // Handle update
            await putCall('calorie', `putrecipe/`, selectedRecipe._id, { calories: parseInt(formData.calories), dish: formData.dish, fat: parseInt(formData.fat), ingredients: formData.ingredient, },
                'Recipe updated successfully',
                toast
            );
        } else if (selectedRecipe && updateType === 'ingredients') {
            await putCall('calorie', `putingredients/`, selectedRecipe._id, { ingredients: formData.ingredient },
                'Recipe updated successfully',
                toast
            );
        } else {
            // Handle new entry
            await postCall('calorie', 'postrecipe', { calories: parseInt(formData.calories), dish: formData.dish, fat: parseInt(formData.fat), ingredients: formData.ingredient, },
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
                                disabled={updateType==='ingredients'}
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
                                disabled={updateType==='ingredients'}
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
                                disabled={updateType==='ingredients'}
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
