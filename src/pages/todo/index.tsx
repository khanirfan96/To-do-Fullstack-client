import React from 'react'
import AddTodo from './addtodo'
import ShowTodo from './showtodo'

const Index = () => {
  return (
    <div className='bg-cyan-300 h-full w-full p-0 m-0'>
        <AddTodo />
        <ShowTodo/>
    </div>
  )
}

export default Index