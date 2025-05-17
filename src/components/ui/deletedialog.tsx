import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button,
    useDisclosure
} from '@chakra-ui/react';
import { ReactNode, useRef } from 'react';

interface AlertDialogProps {
    buttonName: ReactNode;
    heading: string;
    body: string;
    finalButton: string;
    onClick: () => void;
}

export default function AlertDialogExample(props: AlertDialogProps) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef<HTMLButtonElement>(null)

    const handleFinalAction = () => {
        props.onClick();
        onClose();
    }

    return (
        <>
            {typeof props.buttonName === 'string' ? (
                <Button colorScheme='red' onClick={onOpen}>
                    {props.buttonName}
                </Button>
            ) : (
                <div onClick={onOpen}>
                    {props.buttonName}
                </div>
            )}

            <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            {props.heading}
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            {props.body}
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme='red' onClick={handleFinalAction} ml={3}>
                                {props.finalButton}
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    )
}