import { TODO_API_URL } from "./api_url";
import { CALORIE_API_URL } from "./api_url";
import { toast } from 'react-toastify';
import axios from 'axios';

export const getTodo = async () => {
    const url = TODO_API_URL + 'gettodo';
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

export const postTodo = async (todo: string) => {
    const request = new Request(TODO_API_URL + 'posttodo', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
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



export const updateTodo = async (id: string, task: any) => {
    const request = new Request(TODO_API_URL + 'puttodo/' + id, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
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

export const deleteTodo = async (id: string) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    const request = new Request(TODO_API_URL + 'deleteonetodo/' + id, {
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
    const request = new Request(TODO_API_URL + 'deletetodo', {
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

export const getRecipe = async () => {
    try {
        const response = await axios.get(CALORIE_API_URL + 'getrecipe')
        return response.data;
    } catch (error) {
        console.log(error);
        return [];
    }
}

export const createRecipe = async (formData: any) => {
    try {
        const response = await axios.post(CALORIE_API_URL + 'postrecipe', {
            calorie: parseInt(formData.calorie),
            dish: formData.dish,
            fat: parseInt(formData.fat),
            ingredients: formData.ingredient,
        })
        toast("New Calorie added successfully")
        return response;
    } catch (error) {
        console.log(error)
    }


}
