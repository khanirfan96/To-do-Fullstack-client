import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, useDisclosure } from "@chakra-ui/react"
import { useState } from "react";
import { FaFireFlameCurved } from "react-icons/fa6";
import { createRecipe } from "../../utils/methods";



const AddCalorie = () => {

    const [formData, setFormData] = useState({ dish: '', ingredient: '', calorie: '', fat: '' });
    const { isOpen, onOpen, onClose } = useDisclosure()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSaveCalorie = () => {
        createRecipe(formData)
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
                    <ModalHeader>Add your Calories to track</ModalHeader>
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
                                type="text"
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
                            Save
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default AddCalorie;
