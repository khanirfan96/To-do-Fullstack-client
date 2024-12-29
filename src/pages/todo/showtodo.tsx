
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { MdSaveAlt } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { BiSolidEditAlt } from "react-icons/bi";
import { deleteTodo, getTodo, updateTodo } from "../../utils/methods";

const ShowTodo = () => {
    const [todoData, setTodoData] = useState([])
    const [checkedTasks, setCheckedTasks] = useState<boolean[]>([]);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [editValue, setEditValue] = useState<string>("");

    useEffect(() => {
        const fetchData = async () => {
            const data = await getTodo();
            setTodoData(data);
        };
        fetchData();
    }, []);

    const handleDeleteTodo = async (todo: any) => {
        deleteTodo(todo._id)
        setTodoData((prev) => prev.filter((item:any) => item._id !== todo._id));
    }

    const handleEditTask = (index: number, currentTask: string) => {
        setEditingIndex(index);
        setEditValue(currentTask);
    };

    const handleSaveEdit = async (todo: any) => {
        await updateTodo(todo._id, editValue);
        setTodoData((prev: any) =>prev.map((item: String, idx: number) =>idx === editingIndex ? { ...item, task: editValue } : item));
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
        <div className="justify-center items-center grid grid-cols-3 px-6 gap-6">
            {todoData?.map((todo: any, index: number) =>
                <div className="flex border rounded-md items-center justify-between shadow-md hover:shadow-none" key={index}>{editingIndex === index ? (
                    <input
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="bg-white p-2 w-full border focus:border-none focus:outline-none rounded-md"
                    />
                    ) : (
                    <p className={`bg-white p-2 ${checkedTasks[index] ? "line-through" : ""}`}>
                        {todo.task}
                    </p>
                    )}
                        <div className="flex gap-2 p-2">
                        {editingIndex === index ? (
                                <MdSaveAlt className="bg-green-600 text-white rounded-lg text-xl p-1 cursor-pointer" onClick={() => handleSaveEdit(todo)}/>
                        ) : (
                            <>
                                    <FaCheck className="bg-green-600 text-white rounded-lg text-xl p-1 cursor-pointer" onClick={() => handleCheck(index)}/>
                                    <RxCross2 className="bg-red-600 text-white rounded-lg text-xl p-1 cursor-pointer" onClick={() => handleDeleteTodo(todo)}/>
                                    <MdEdit className="bg-black text-white rounded-lg text-xl p-1 cursor-pointer" onClick={() => handleEditTask(index, todo.task)}/>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default ShowTodo