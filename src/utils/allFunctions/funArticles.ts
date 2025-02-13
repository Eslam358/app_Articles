import axios from "axios";

import { toast } from 'react-toastify';
import { BASE_URL } from "@/utils/axiosCreat"

// article
export const updateArticle = async (
    title: string,
    description: string,
    id: number,

): Promise<any> => {
    try {
        const response = await axios.put(`${BASE_URL}/api/articles/${+id}`, {
            description,
            title
        });

        if (response.status === 200) {
            toast.success("Article updated successfully");
            return response;

        } else {
            toast.error("Failed to update Article");
        }
    } catch (error: any) {
        toast.error("Failed to update Article");
        console.error(
            "Error adding Article:",
            error.response?.data || error.message
        );
        console.log("error", error);
        
        // throw new Error("Failed to add Article. Please try again later.");
    }
};
export const deleteArticle = async (
    id: number,

): Promise<any> => {
    try {
        const response = await axios.delete(`${BASE_URL}/api/articles/${+id}`);


        if (response.status === 200) {
            toast.success("Article deleted successfully");
            return response;

        } else {
            toast.error("Failed to delete Article");
        }

    } catch (error: any) {
        toast.error(error.response?.data.error);
        console.error(
            "Error adding Article:",
            error.response?.data.error || error.message
        );
        throw new Error("Failed to add Article. Please try again later.");
    }
};
