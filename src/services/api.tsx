import axios from "axios";

// export const fetchApi = async (url: string, params?: object) => {
//   try {

//     const config = params ? { params } : {};

//     const res = await axios.get(
//       `${process.env.NEXT_PUBLIC_API_BASE_URL}/${url}`,
//       config
//     );

//     return res.data;
//   } catch (error) {
//     console.error("Error in fetchApi:", error);
//     throw error;
//   }
// };

export const fetchApi = async (url: string, params?: object) => {
  try {
    const queryParams = params
      ? "?" + new URLSearchParams(params as Record<string, string>).toString()
      : "";

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/${url}${queryParams}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next:{
          revalidate:60
        }
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in fetchApi:", error);
    throw error;
  }
};



export const getApiWithToken = async (url: string, accessToken?: any) => {
  try {
    // const config = params ? { params } : {};

    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/${url}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return res.data;
  } catch (error) {
    console.error("Error in getApi:", error);
    throw error;
  }
};




export const postApi = async (url: string, bodyData?: any, accessToken?: any) => {
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


export const putApi = async (url: string, bodyData?: any, accessToken?: any) => {
  try {
    const isFormData = bodyData instanceof FormData;

    const res = await axios.put(
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
    console.error("Error in putApi:", error);
    throw error;
  }
};

export const deleteApi = async (url: string, accessToken?: any) => {
  try {

    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/${url}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return res.data;
  } catch (error) {
    console.error("Error in deleteApi:", error);
    throw error;
  }
};
// export const patchApi = async (url: string, bodyData?: any, accessToken?: any) => {
//   try {
//     const isFormData = bodyData instanceof FormData;

//     const res = await axios.patch(
//       `${process.env.NEXT_PUBLIC_API_BASE_URL}/${url}`,
//       bodyData,
//       {
//         headers: {
//           "Content-Type": isFormData ? "multipart/form-data" : "application/json",
//           Authorization: `Bearer ${accessToken}`,
//         },
//       }
//     );

//     return res.data;
//   } catch (error) {
//     console.error("Error in patchApi:", error);
//     throw error;
//   }
// };
