import { Button, FormControl, Input, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import AlertDialogExample from '../../components/ui/deletedialog';
import useAuthStore from '../../store/todo';

const AddTodo = () => {
    const [todo, setTodo] = useState('')
    const toast = useToast();
    const { postData, deleteData } = useAuthStore();

    const handletodoChange = (e: any) => {
        setTodo(e.target.value)
    }

    const handleSubmit = async () => {
        if (!todo.trim()) {
            toast({ title: "Error", description: "Todo cannot be empty", status: "error", duration: 3000, isClosable: true });
            return;
        }
        try {
            await postData('todo', 'posttodo', { task: todo, status: true });
            toast({ title: "Added", description: "New Task added successfully", status: "success", duration: 3000, isClosable: true });
            setTodo(''); // Clear input after successful addition
        } catch (error) {
            toast({ title: "Error", description: "Failed to add task", status: "error", duration: 3000, isClosable: true });
        }
    };

    const handleDeleteAll = async () => {
        try {
            await deleteData('todo', 'deletetodo');
            toast({ title: "Success", description: "All Tasks deleted successfully", status: "success", duration: 3000, isClosable: true });
        } catch (error) {
            toast({ title: "Error", description: "Failed to delete tasks", status: "error", duration: 3000, isClosable: true });
        }
    };

    return (
        <>
            <div className='flex justify-center items-center my-8 p-2 gap-4'>
                <FormControl>
                    <Input
                        className='rounded-md p-2 w-1/2 shadow-md border focus:border-green-300 focus:outline-none'
                        type="text"
                        id="todo"
                        placeholder='Add Todo'
                        value={todo}
                        onChange={handletodoChange}
                    />
                </FormControl>

                <Button colorScheme='teal' variant='outline' onClick={handleSubmit} isDisabled={!todo.trim()}>ADD</Button>
                <AlertDialogExample buttonName='Delete' heading='Delete All Task' body='Are you sure, you want to delete all the task?'
                    finalButton='Delete All' onClick={handleDeleteAll} />
            </div>
        </>
    )
}

export default AddTodo