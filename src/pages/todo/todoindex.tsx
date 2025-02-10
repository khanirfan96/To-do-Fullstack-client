import React from 'react'
import AddTodo from './addtodo'
import ShowTodo from './showtodo'

const TodoIndex = () => {
  return (
    <div className='h-full w-full p-0 m-0'>
        <AddTodo />
        <ShowTodo/>
    </div>
  )
}

export default TodoIndex