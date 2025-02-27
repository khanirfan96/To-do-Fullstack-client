import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import { useState } from 'react';

const ChangePassword = ({ password, setPassword }: { password: boolean; setPassword: (value: boolean) => void }) => {
    const initialFormData = { old_password: '', new_password: '', confirm_password: '' };
    const [formData, setFormData] = useState(initialFormData);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleClose = () => {
        setPassword(false)
    }

    return (
        <div>
            <Modal isOpen={password} onClose={handleClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Change Password</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl className='p-2'>
                            <FormLabel>Old Password</FormLabel>
                            <Input
                                type="text"
                                id="old_password"
                                placeholder='Enter Old Password'
                                value={formData.old_password}
                                onChange={handleChange}
                            />
                        </FormControl>
                        <FormControl className='p-2'>
                            <FormLabel>New Password</FormLabel>
                            <Input
                                type="text"
                                id="new_password"
                                placeholder='Enter New Password'
                                value={formData.new_password}
                                onChange={handleChange}
                            />
                        </FormControl>
                        <FormControl className='p-2'>
                            <FormLabel>Confirm New Password</FormLabel>
                            <Input
                                type="text"
                                id="confirm_password"
                                placeholder='Enter New Password'
                                value={formData.confirm_password}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' ml={3}>Change Password</Button>
                    </ModalFooter>
                </ModalContent>


            </Modal>
        </div>
    )
}

export default ChangePassword