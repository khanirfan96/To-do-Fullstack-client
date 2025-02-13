import { useState } from 'react'
import { deleteAllCall, postCall } from '../../utils/methods';
import { Button, FormControl, Input, useToast } from '@chakra-ui/react';

const AddTodo = () => {
    const [todo, setTodo] = useState('')
    const toast = useToast();

    const handletodoChange = (e: any) => {
        setTodo(e.target.value)
    }

    const handleSubmit = () => {
        postCall('todo', 'posttodo', { task: todo, status: true }, 'New Task added successfully', toast)
    };

    const handleDeleteAll = async () => {
        await deleteAllCall('deletetodo', "All Task deleted successfully", toast)
    }

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

                <Button colorScheme='teal' variant='outline' onClick={() => handleSubmit()}>ADD</Button>
                <Button variant='outline' className='bg-red-500 text-[white] rounded-md p-2 w-24 hover:shadow-md' onClick={handleDeleteAll}>Delete All</Button>
            </div>
        </>
    )
}

export default AddTodo