import axios from "axios";

export const fetchApi = async (url: string, locale: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/${url}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application-json",
        //   "Accept-Language": locale,
        },
        cache : "no-cache"
      
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};



export const postApi = async (url: string, bodyData?: any) => {
  try {
    const isFormData = bodyData instanceof FormData;

    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/${url}`,
      bodyData,
      {
        headers: {
          "Content-Type": isFormData ? "multipart/form-data" : "application/json",
        },
      }
    );

    return res.data;
  } catch (error) {
    console.error("Error in postApi:", error);
    throw error;
  }
};
