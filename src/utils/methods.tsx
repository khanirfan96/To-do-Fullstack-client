import API_URL from "./api_url";
import {toast} from 'react-toastify';

export const getTodo = async () => {
    const url = API_URL + 'gettodo';
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        return json; 
    } catch (error: any) {
        console.error(error.message);
        return [];
    }
}

export const postTodo = async (todo:string) =>{
    const request = new Request(API_URL + 'posttodo', {
        method: "POST",
        body: JSON.stringify({
            "task": todo,
            "status": true
        })
    })

    try {
        const response = await fetch(request);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        if (await response.json())
            toast("New Task added successfully")
    } catch (error: any) {
        console.error(error.message);
    }
}

export const updateTodo = async (id:string, task:any) =>{
    const request = new Request(API_URL +'puttodo/' + id, {
        method: "PUT",
        body: JSON.stringify({
            "task": task,
        })
    })

    try {
        const response = await fetch(request);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const data = await response.json();
        toast("Task updated successfully");
    } catch (error: any) {
        console.error(error.message); 
    }
}

export const deleteTodo = async (id:string) =>{
    const myHeaders = new Headers();
    myHeaders.append("Content-Type","application/x-www-form-urlencoded");
    const request = new Request(API_URL +'deleteonetodo/' + id, {
        method: "DELETE",
        headers: myHeaders,
    })

    try {
        const response = await fetch(request);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const data = await response.json();
        toast("Task deleted successfully");
    } catch (error: any) {
        console.error(error.message); // Log error if any
    }
}

export const deleteAllTodo = async () => {
    const request = new Request(API_URL + 'deletetodo', {
        method: "DELETE",
    })
    try {
        const response = await fetch(request);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const data = await response.json();
        toast("All Task deleted successfully");
    } catch (error: any) {
        console.error(error.message); // Log error if any
    }
}
