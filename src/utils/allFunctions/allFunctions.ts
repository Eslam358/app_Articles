import { error } from 'console';
import { BASE_URL } from "@/utils/axiosCreat"

import axios from "axios";
import axiosCreate from "@/utils/axiosCreat";
import { toast } from 'react-toastify';
// Comments
export const addComment = async (
  text: string,
  articleId: number,

): Promise<any> => {
  try {
    const response = await axiosCreate.post("api/commants", {
      text,
      articleId,
    });


    if (response.status === 201) {
      toast.success("Comment updated successfully");
    }
    return response.data;
  } catch (error: any) {
    console.error(
      "Error adding comment:",
      error.response?.data || error.message
    );
    throw new Error("Failed to add comment. Please try again later.");
  }
};
export const updateComment = async (
  text: string,
  id: number,

): Promise<any> => {
  try {
    const response = await axiosCreate.put(`api/commants/${+id}`, {
      text,
    });

    if (response.status === 200) {
      toast.success("Comment updated successfully");
      return response;

    } else {
      toast.error("Failed to update comment");
    }
  } catch (error: any) {
    toast.error("Failed to update comment");
    console.error(
      "Error adding comment:",
      error.response?.data || error.message
    );
    throw new Error("Failed to add comment. Please try again later.");
  }
};
export const deleteComment = async (
  id: number,

): Promise<any> => {
  try {
    const response = await axiosCreate.delete(`api/commants/${+id}`);


    if (response.status === 200) {
      toast.success("Comment deleted successfully");
      return response;

    } else {
      toast.error("Failed to delete comment");
    }

  } catch (error: any) {
    toast.error(error.response?.data.error);
    console.error(
      "Error adding comment:",
      error.response?.data.error || error.message
    );
    throw new Error("Failed to add comment. Please try again later.");
  }
};
//------------------------------------------------------------------
//user
export const createUser = async (formJson: {
  [k: string]: FormDataEntryValue;
}): Promise<any> => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/user/register`,
      formJson
    );
    if (response.status === 201) {
      toast.success("User registered successfully");
      return response;
    } else {
      toast.error("Failed to register user");
    }

  } catch (error: any) {
    toast.error("Failed to register user");
    console.error(
      "Error adding comment:",
      error.response?.data || error.message
    );
    throw new Error("Failed to add comment. Please try again later.");
  }
};
export const logOutUser = async (): Promise<any> => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/user/logout`

    );
    if (response.status === 200) {
      toast.success("User logout successfully");
      return response;
    } else {
      toast.error("Failed to logout user");
    }

  } catch (error: any) {
    toast.error("Failed to logout user");
    console.error(
      "Error adding comment:",
      error.response?.data || error.message
    );
    throw new Error("Failed to logout. Please try again later.");
  }
};
export const logInUser = async (formJson: {
  [k: string]: FormDataEntryValue;
}): Promise<any> => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/user/sigin`,
      formJson
    );
    if (response.status === 200) {
      toast.success("User signed successfully");
      return response
    } else {
      toast.error("Failed to signed user");
    }

  } catch (error: any) {
    toast.error("Failed to signed user error in server");
    console.error(
      "Error adding comment:",
      error.response?.data || error.message
    );
    throw new Error("Failed to add comment. Please try again later.");
  }
};



