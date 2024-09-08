import { useEffect, useRef, useState } from 'react'
import './App.css'
import TodoDiv from './components/TodoDiv'
import { GiCancel } from "react-icons/gi";

function App() {

  const input = useRef();
  const [HideShow, SetHideShow] = useState(false)
  const [todoList, SetTodoList] = useState(0)

  function ChangeHideShow() {
    if (HideShow == false) {
      SetHideShow(true)
    }
    else {
      SetHideShow(false)
    }
  }

  const [AllTodoArray, SetAllTodo] = useState(getlocalValue())
  const [preTodo, SetPreTodo] = useState(null)

  useEffect(() => {
    SetTodoList(AllTodoArray.length)
    setLocalValue()
  }, [AllTodoArray])

  function HandelInput(e) {
    SetPreTodo(e.target.value)
  }

  function AddTODO() {
    if (input.current.value == '') {
      return
    }
    else {
      if (AllTodoArray.length === 0) {
        AllTodoArray.push(preTodo)
        SetHideShow(false)
        SetTodoList(AllTodoArray.length)
        input.current.value = ''
        setLocalValue()
      }
      else {
        SetAllTodo([...AllTodoArray, preTodo])
        SetHideShow(false)
        SetTodoList(AllTodoArray.length)
        input.current.value = ''
        setLocalValue()
      }
    }
  }

  function setLocalValue() {
    localStorage.setItem('todos', JSON.stringify(AllTodoArray));
  }

  function getlocalValue() {
    const StoreTodos = JSON.parse(localStorage.getItem('todos'));
    return StoreTodos
  }

  getlocalValue()

  return (
    <>
      {/* Background Todo */}
      <div className="bg-todo relative w-full h-screen flex justify-center items-center text-center">
        <h1 className=' fixed select-none text-8xl font-extrabold text-[#dadada] opacity-[0.2]'>Ask Todo<span className='text-orange-500 '>.</span></h1>
        {/* Front Todo */}
        <div className="front-todo absolute w-full h-full top-0 left-0 flex flex-col z-9">
          {/* Nav-bar */}
          <div className="nav w-full h-fit flex px-5 py-5 justify-between items-center border-b-2 border-[#dadada71] ">
            {/* Todo List */}
            <h1 className=' select-none text-[#dadada] font-medium'>Todo List<span className='text-orange-500 mx-2'>{todoList}</span></h1>
            {/* Add Todo */}
            <div onClick={ChangeHideShow} className="add-todo w-fit select-none h-fit px-2 py-1 bg-[#2b2c30] cursor-pointer rounded-full hover:bg-orange-500 hover:text-white flex justify-center items-center">
              <h1 className='text-white font-medium'><span className='text-orange-500 mx-2 pls'>+</span>Add Todo</h1>
            </div>
          </div>
          {/* Todo Container */}
          <div className="todo-cont w-full flex flex-wrap h-fit px-5 py-5 gap-5">
            {/* <TodoDiv /> */}
            {AllTodoArray.length >= 0 &&
              AllTodoArray.map((list, index) => {
                return (
                  <TodoDiv key={index} text={list} setLocalValue={setLocalValue} AllTodoArray={AllTodoArray} index={index} SetTodoList={SetTodoList} />
                )
              })
            }
          </div>  
        </div>
        {/* Search Div */}
        <div className={` ${HideShow == false ? ('hidden') : ('flex')}  Search-div gap-5 absolute z-10 flex items-center px-5 top-0 left-1/2  w-[100%] h-[70px] bg-[#232427] translate-x-[-50%] `}>
          {/* Search Cont */}
          <div className="search-Cont w-[95%] h-full flex justify-center items-center gap-2">
            <input ref={input} onChange={HandelInput} type="text" className='h-[40px] md:w-[80%] lg:w-[200px] text-start px-2 rounded-xl' placeholder='Enter ToDo Here...' />
            {/* Add Btn */}
            <div onClick={AddTODO} className="add w-fit h-fit px-3 py-2 bg-green-500 rounded-lg select-none cursor-pointer text-white">
              Add
            </div>
          </div>
          {/* Cancle cont */}
          <div onClick={ChangeHideShow} className="cancle text-white hover:text-orange-500 text-[30px] cursor-pointer">
            <GiCancel />
          </div>
        </div>
      </div>
    </>
  )
}

export default App
