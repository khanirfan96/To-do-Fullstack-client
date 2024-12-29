import { useState } from 'react'
import API_URL from '../../utils/api_url';
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

    const handleDeleteAll = () => {[
        deleteAllTodo()
    ]}

    return (
        <>
        <div className='flex justify-center items-center mt-6 p-2'>
            <input
                className='rounded-sm p-2 w-1/2'
                type="text"
                id="todo"
                placeholder='Add Todo'
                value={todo}
                onChange={handletodoChange}
            />
            <button className='bg-[green] text-[white] rounded-sm p-2' onClick={() => handleSubmit()}>ADD</button>
            <ToastContainer />
            {/* <div className='right'> */}
            <button className='bg-red-500 text-[white] p-2' onClick={handleDeleteAll}>Delete All</button>
            {/* </div> */}
        </div>
        
        </>
    )
}

export default AddTodo