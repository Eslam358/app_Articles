"use server"
import axiosCreate from "@/utils/axiosCreat";


export const getArticle = async (
    id: number,

): Promise<any> => {
    try {
        const response = await axiosCreate.get(`api/articles/${+id}`);


        if (response.status === 200) {


            return response;

        } else {
            console.error(
                "Error get Article:",
                response
            );
            return response;
        }

    } catch (error: any) {
    
        console.error(
            "Error adding Article:",
            error.response?.data.error || error.message
        );
        return ;
    }
};
export const getAllArticles = async (
    page: number,

): Promise<any> => {
    try {
        const response = await axiosCreate.get(
                `api/articles?page=${page}`
              );


        if (response.status === 200) {


            return response;

        } else {
            console.error(
                "Error get Article:",
                response
            );
            return response;
        }

    } catch (error: any) {
    
        console.error(
            "Error adding Article:",
            error.response?.data.error || error.message
        );
        return ;
    }
};
