
import { Input, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { MdEdit, MdSaveAlt } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import AlertDialogExample from "../../components/ui/deletedialog";
import useAuthStore from "../../store/todo";

const ShowTodo = () => {
    const toast = useToast();
    const { data, fetchData, deleteData, putData} = useAuthStore();
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [editValue, setEditValue] = useState<string>("");
    const [checkedTasks, setCheckedTasks] = useState<boolean[]>([]);

    const todos = data.todos;

    const loadTodos = async () => {
        try {
            await fetchData('todo', 'gettodo');
            setCheckedTasks(new Array(data.todos.length).fill(false));
        } catch (error) {
            toast({ title: "Error", description: "Failed to load todos", status: "error", duration: 3000, isClosable: true });
        }
    };

    useEffect(() => {
        loadTodos();
    }, [fetchData, toast]);

    const handleDeleteTodo = async (todo: any) => {
        try {
            await deleteData('todo', `deleteonetodo/${todo._id}`);
            toast({ title: "Success", description: "Task deleted successfully", status: "success", duration: 3000, isClosable: true });
            // Refresh todos after deletion
            await fetchData('todo', 'gettodo');
        } catch (error) {
            toast({ title: "Error", description: "Failed to delete task", status: "error", duration: 3000, isClosable: true });
        }
    };

    const handleEditTask = (index: number, currentTask: string) => {
        setEditingIndex(index);
        setEditValue(currentTask);
    };

    const handleSaveEdit = async (todo: any) => {
        try {
            await putData('todo', `puttodo/`,todo._id, { task: editValue });
            toast({ title: "Success", description: "Task updated successfully", status: "success", duration: 3000, isClosable: true });
            setEditingIndex(null);
            setEditValue("");
            // Refresh todos after update
            await fetchData('todo', 'gettodo');
        } catch (error) {
            toast({ title: "Error", description: "Failed to update task", status: "error", duration: 3000, isClosable: true });
        }
    };

    const handleCheck = (index: number) => {
        setCheckedTasks(prev => {
            const updated = [...prev];
            updated[index] = !updated[index];
            return updated;
        });
    };

    const handleCancelEdit = () => {
        setEditingIndex(null);
        setEditValue("");
    };

    return (
        <div className="justify-center items-center grid grid-cols-3 px-6 gap-6">
            {todos?.map((todo: any, index: number) =>
                <div className="flex border rounded-md items-center justify-between shadow-md hover:shadow-none" key={todo._id || index}>{editingIndex === index ? (
                    <Input
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="bg-white p-2 w-full border focus:border-none focus:outline-none rounded-md"
                        autoFocus
                    />
                ) : (
                    <p className={`p-2 ${checkedTasks[index] ? "line-through" : ""}`}>
                        {todo.task}
                    </p>
                )}
                    <div className="flex gap-2 p-2">
                        {editingIndex === index ? (
                            <>
                                <MdSaveAlt className="bg-green-600 text-white rounded-lg text-xl p-1 cursor-pointer" onClick={() => handleSaveEdit(todo)} />
                                <RxCross2
                                    className="bg-red-600 text-white rounded-lg text-xl p-1 cursor-pointer"
                                    onClick={handleCancelEdit}
                                />
                            </>
                        ) : (
                            <>
                                <FaCheck className="bg-green-600 text-white rounded-lg text-xl p-1 cursor-pointer" onClick={() => handleCheck(index)} />
                                <AlertDialogExample buttonName={<RxCross2 className="bg-red-600 text-white rounded-lg text-xl p-1 cursor-pointer" />}
                                    heading='Delete Task' body='Are you sure, you want to delete this particular task?' finalButton='Delete' onClick={() => handleDeleteTodo(todo)} />
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
