import { TODO_API_URL } from "./api_url";
import { CALORIE_API_URL } from "./api_url";
import axios from 'axios';
interface GetCallParams {
    type: string;
    url: string;
}

interface PostData {
    [key: string]: any;
}

interface TodoPayload {
    task: string;
}

interface CaloriePayload {
    calorie: number;
    dish: string;
    fat: number;
    ingredients: string;
}

type PayloadType = TodoPayload | CaloriePayload;


export const getCall = async ({ type, url }: GetCallParams) => {
    const baseUrl = type === 'todo' ? TODO_API_URL : CALORIE_API_URL;
    try {
        const response = await axios.get(baseUrl + url)
        return response.data;
    } catch (error: any) {
        console.error(error.message);
        return [];
    }
}

export const deleteAllCall = async (url: string, successMessage: string = 'Deleted Successfully',toast:any) => {
    try {
        const response = await axios.delete(TODO_API_URL + url)
        toast({
            title: 'Deleted successfully',
            description: successMessage,
            status: 'success',
            duration: 5000, 
            isClosable: true,
          });
        return response.data;
    } catch (error: any) {
        console.error(error.message);
        toast({
            title: 'Error',
            description: error.message || 'An error occurred!',
            status: 'error',
            duration: 5000,
            isClosable: true,
        });
        return [];
    }
}

export const postCall = async (type: 'todo' | 'calorie', endpoint: string, data: PostData, successMessage: string = 'Added Successfully', toast: any) => {
    try {
        const baseUrl = type === 'todo' ? TODO_API_URL : CALORIE_API_URL;
        const response = await axios.post(baseUrl + endpoint, data,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        toast({
            title: 'Created successful',
            description: successMessage,
            status: 'success',
            duration: 5000, 
            isClosable: true,
          });
        return response.data;
    } catch (error: any) {
        console.error(error.message);
        toast({
            title: 'Error',
            description: error.message || 'An error occurred!',
            status: 'error',
            duration: 5000,
            isClosable: true,
        });
    }
}

export const putCall = async (type: 'todo' | 'calorie', endpoint: string, id: number, payload: PayloadType, successMessage: string = 'Added Successfully', toast: any) => {
    try {
        const baseUrl = type === 'todo' ? TODO_API_URL : CALORIE_API_URL;
        let response
        {type === 'todo' ?  response = await axios.put(baseUrl + endpoint + id,
            {
                task: payload
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ) : 
        response = await axios.put(baseUrl + endpoint + id,
            {
                task: payload
            },
        )}
       
        const data = await response.data;
        toast({
            title: 'Created successful',
            description: data.message || successMessage,
            status: 'success',
            duration: 5000, 
            isClosable: true,
          });
        // toast("Task updated successfully");
    } catch (error: any) {
        console.error(error.message);
        toast({
            title: 'Error',
            description: error.message || 'An error occurred!',
            status: 'error',
            duration: 5000,
            isClosable: true,
        });
        
    }
}

export const deleteCall = async (type:'todo' | 'calorie', endpoint: string, id: number, toast: any) => {
    try {
        const baseUrl = type === 'todo' ? TODO_API_URL : CALORIE_API_URL;
        const response = await axios.delete(baseUrl + endpoint + id, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            }
        })
        const data = await response.data;
        toast({
            title: 'Deleted successfully',
            description: data.Message || 'Deleted Successfully',
            status: 'success',
            duration: 5000, 
            isClosable: true,
          });
    } catch (error: any) {
        console.error(error.message); // Log error if any
        toast({
            title: 'Error',
            description: error.message || 'An error occurred!',
            status: 'error',
            duration: 5000,
            isClosable: true,
        });
    }
}

// export const createRecipe = async (formData: any) => {
//     try {
//         const response = await axios.post(CALORIE_API_URL + 'postrecipe', {
//             calorie: parseInt(formData.calorie),
//             dish: formData.dish,
//             fat: parseInt(formData.fat),
//             ingredients: formData.ingredient,
//         })
//         toast("New Calorie added successfully")
//         return response;
//     } catch (error) {
//         console.log(error)
//     }


// }
