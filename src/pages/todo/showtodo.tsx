
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { MdSaveAlt } from "react-icons/md";
import { LiaUndoAltSolid } from "react-icons/lia";
import { BiSolidEditAlt } from "react-icons/bi";
import { deleteTodo, getTodo, updateTodo } from "../../utils/methods";

const ShowTodo = () => {
    const [todoData, setTodoData] = useState([])
    const [checkedTasks, setCheckedTasks] = useState<boolean[]>([]);
    const [editingIndex, setEditingIndex] = useState<number | null>(null); // Track the editing todo index
    const [editValue, setEditValue] = useState<string>("");

    useEffect(() => {
        const fetchData = async () => {
            const data = await getTodo();
            setTodoData(data);
        };
        fetchData();
    }, []);

    function handlDeleteTodo(todo: any) {
        deleteTodo(todo._id)
    }

    const handleEditTask = (index: number, currentTask: string) => {
        setEditingIndex(index);
        setEditValue(currentTask);
    };

    const handleSaveEdit = async (todo: any) => {
        await updateTodo(todo._id, editValue);
        setTodoData((prev: any) =>prev.map((item: String, idx: number) =>
                idx === editingIndex ? { ...item, task: editValue } : item)
        );
        setEditingIndex(null);
        setEditValue("");
    };


    const handleCheck = (index: number) => {
        console.log([...checkedTasks])
        const updatedCheckedTasks = [...checkedTasks];
        updatedCheckedTasks[index] = !updatedCheckedTasks[index];
        setCheckedTasks(updatedCheckedTasks);
    };

    return (
        <div className="justify-center items-center mx-10">
            {todoData?.map((todo: any, index: number) =>
                <div className="grid grid-cols-2 gap-2 p-4 items-center" key={index}>{editingIndex === index ? (
                    <input
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="bg-white border rounded-lg p-2"
                    />
                ) : (
                    <p className={`bg-white border rounded-lg p-2 ${checkedTasks[index] ? "line-through" : ""}`}>
                        {todo.task}
                    </p>
                )}
                    <div className="flex gap-2">
                        {editingIndex === index ? (
                            <button className="bg-green-600 text-white h-5 w-10 items-center justify-center" onClick={() => handleSaveEdit(todo)}>
                                <MdSaveAlt />
                            </button>
                        ) : (
                            <>
                                <button className="bg-green-600 text-white h-5 w-5 items-center justify-center" onClick={() => handleCheck(index)}>
                                    <FaCheck />
                                </button>
                                <button className="bg-red-600 text-white h-5 w-5" onClick={() => handlDeleteTodo(todo)}>
                                    <RxCross2 />
                                </button>
                                <button className="bg-black text-white h-5 w-5" onClick={() => handleEditTask(index, todo.task)}>
                                    <BiSolidEditAlt />
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default ShowTodo