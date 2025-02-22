
import { Input, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { MdEdit, MdSaveAlt } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import AlertDialogExample from "../../components/ui/deletedialog";
import { deleteCall, getCall, putCall } from "../../utils/methods";

interface TaskData {
    task: string;
    // Add other properties if needed
  }

const ShowTodo = () => {
    const [todoData, setTodoData] = useState([])
    const [checkedTasks, setCheckedTasks] = useState<boolean[]>([]);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [editValue, setEditValue] = useState<string>("");
    const toast = useToast();

    // const { isOpen, onOpen, onClose } = useDisclosure()
    // const cancelRef = React.useRef()

    useEffect(() => {
        const fetchData = async () => {
            const data = await getCall({ type: 'todo', url: 'gettodo' });
            setTodoData(data);
        };
        fetchData();
    }, []);

    const handleDeleteTodo = async (todo: any) => {
        deleteCall('todo', 'deleteonetodo/', todo._id, toast)
        setTodoData((prev) => prev.filter((item: any) => item._id !== todo._id));
    }

    const handleEditTask = (index: number, currentTask: string) => {
        setEditingIndex(index);
        setEditValue(currentTask);
    };

    const handleSaveEdit = async (todo: any) => {
        await putCall('todo','puttodo/',todo._id, { task: editValue }, 'Task updated successfully', toast);
        setTodoData((prev: any) => prev.map((item: any, idx: number) => idx === editingIndex ? { ...item, editValue } : item));
        setEditingIndex(null);
        setEditValue("");
    };

    const handleCheck = (index: number) => {
        const updatedCheckedTasks = [...checkedTasks];
        updatedCheckedTasks[index] = !updatedCheckedTasks[index];
        setCheckedTasks(updatedCheckedTasks);
    };

    return (
        <div className="justify-center items-center grid grid-cols-3 px-6 gap-6">
            {todoData?.map((todo: any, index: number) =>
                <div className="flex border rounded-md items-center justify-between shadow-md hover:shadow-none" key={index}>{editingIndex === index ? (
                    <Input
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
                            <MdSaveAlt className="bg-green-600 text-white rounded-lg text-xl p-1 cursor-pointer" onClick={() => handleSaveEdit(todo)} />
                        ) : (
                            <>
                                <FaCheck className="bg-green-600 text-white rounded-lg text-xl p-1 cursor-pointer" onClick={() => handleCheck(index)} />
                                <div>
                                    <AlertDialogExample buttonName={<RxCross2 className="bg-red-600 text-white rounded-lg text-xl p-1 cursor-pointer"/>} 
                                    heading='Delete Task' body='Are you sure, you want to delete this particular task?' finalButton='Delete' onClick={() => handleDeleteTodo(todo)} />
                                </div>
                                {/* <RxCross2 className="bg-red-600 text-white rounded-lg text-xl p-1 cursor-pointer" onClick={() => handleDeleteTodo(todo)} /> */}
                                <MdEdit className="bg-black text-white rounded-lg text-xl p-1 cursor-pointer" onClick={() => handleEditTask(index, todo.task)} />
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default ShowTodo