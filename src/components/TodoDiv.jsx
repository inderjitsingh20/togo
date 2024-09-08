import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { GrCompliance } from "react-icons/gr";
import { MdOutlineIncompleteCircle } from "react-icons/md";

function TodoDiv({ text, AllTodoArray, SetTodoList, index, setLocalValue }) {

    const [checkComp, SetCheckComp] = useState(false)

    function changeCheckComp() {
        if (checkComp == false) {
            SetCheckComp(true)
        }
        else {
            SetCheckComp(false)
        }
    }

    function handeldel(index) {
        AllTodoArray.pop(index)
        if(AllTodoArray.length === 0){
            SetTodoList(AllTodoArray.length)
        }
        SetTodoList(AllTodoArray.length)
        setLocalValue()
    }

    return (
        <>
            <div className="todo-div w-[150px] px-2 py-2 rounded-2xl h-fit bg-slate-100">
                <p className={`text-[14px] mt-1  ${checkComp == true ? ('line-through') : ('none')}`}>{text}</p>
                <div className="div w-full h-[40px] overflow-hidden bg-orange-500 mt-2 rounded-lg flex">
                    {/* comp Div */}
                    {checkComp == false ?
                        (
                            <div onClick={changeCheckComp} className="Comp-div w-[50%] h-[100%]  bg-green-500 cursor-pointer select-none hover:bg-green-600 flex justify-center items-center text-white text-[20px]">
                                <MdOutlineIncompleteCircle />
                            </div>
                        ) :
                        (
                            <div onClick={changeCheckComp} className="No-Comp-div w-[50%] h-[100%]  bg-green-400 cursor-pointer select-none hover:bg-green-500 flex justify-center items-center text-white text-[20px]">
                                <GrCompliance />
                            </div>
                        )
                    }
                    {/* Del Div */}
                    <div onClick={() => handeldel(index)} className="del-div w-[50%] h-[100%] bg-red-500 cursor-pointer select-none hover:bg-red-600 flex justify-center items-center text-white text-[20px]">
                        <MdDelete />
                    </div>
                </div>
            </div>
        </>
    )
}

export default TodoDiv;