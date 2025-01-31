import axios from "axios";

export const fetchApi = async (url: string) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/${url}`,
      
   
    );

    return res.data;
  } catch (error) {
    console.error("Error in fetchApi:", error);
    throw error;
  }
};




export const postApi = async (url: string, bodyData?: any,accessToken?:any) => {
  try {
    const isFormData = bodyData instanceof FormData;

    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/${url}`,
      bodyData,
      {
        headers: {
          "Content-Type": isFormData ? "multipart/form-data" : "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return res.data;
  } catch (error) {
    console.error("Error in postApi:", error);
    throw error;
  }
};
