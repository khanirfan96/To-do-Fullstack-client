import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import useAuthStore from '../../store/todo';
import { putCall } from '../apimethods';

const ChangePassword = ({ password, setPassword }: { password: boolean; setPassword: (value: boolean) => void }) => {
    const logout = useAuthStore(state => state.logout);
    const initialFormData = { old_password: '', new_password: '', confirm_password: '' };
    const [formData, setFormData] = useState(initialFormData);
    const user = JSON.parse(sessionStorage.getItem('auth-storage') || '{}');
    const toast = useToast();
    const userId = user.state.user.user_id

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const changePassword = async () => {
        try {
            const response = await putCall({
                url: 'change-password/', id: userId, data: {
                    current_password: formData.old_password,
                    new_password: formData.new_password
                }
            })
            if (response && response.data?.status === 200) {
                toast({ title: "Password Changed!", description: response?.data?.message || "Password Changed updated successfully", status: "success", duration: 3000, isClosable: true });
                await logout()
            } else {
                toast({ title: "Please Try Again", status: "error", duration: 3000, isClosable: true });
                console.error('Error: Response is null or status is not 200');
            }
        } catch (error) {
            console.log(error, 'error');
        }
    }

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
                        <Button colorScheme='blue' ml={3} onClick={changePassword}>Change Password</Button>
                    </ModalFooter>
                </ModalContent>


            </Modal>
        </div>
    )
}

export default ChangePassword