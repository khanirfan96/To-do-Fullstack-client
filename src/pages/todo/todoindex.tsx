import Navbar from '../navbar'
import AddTodo from './addtodo'
import ShowTodo from './showtodo'

const TodoIndex = () => {
  return (
    <div className='h-full w-full p-0 m-0'>
      <Navbar />
      <AddTodo />
      <ShowTodo />
    </div>
  )
}

export default TodoIndex