import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { deleteAllTodo, postTodo } from '../../utils/methods';

const AddTodo = () => {
    const [todo, setTodo] = useState('')

    const handletodoChange = (e: any) => {
        setTodo(e.target.value)
    }

    const handleSubmit = () => {
        postTodo(todo)
    };

    const handleDeleteAll = () => {
        deleteAllTodo()
    }

    return (
        <>
            <div className='flex justify-center items-center my-8 p-2 gap-4'>
                <input
                    className='rounded-md p-2 w-1/2 shadow-md border focus:border-green-300 focus:outline-none'
                    type="text"
                    id="todo"
                    placeholder='Add Todo'
                    value={todo}
                    onChange={handletodoChange}
                />
                <button className='bg-[green] text-[white] rounded-md p-2 w-24 hover:shadow-md' onClick={() => handleSubmit()}>ADD</button>
                <button className='bg-red-500 text-[white] rounded-md p-2 w-24 hover:shadow-md' onClick={handleDeleteAll}>Delete All</button>
                <ToastContainer />
            </div>
        </>
    )
}

export default AddTodo