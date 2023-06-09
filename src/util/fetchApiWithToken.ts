import { ApiResponse } from "@/types/types";
import request from "@/util/request";

const fetchApiWithToken = async (
  url: Array<string>,
  method: "get" | "post" | "delete" | "put",
  AT: string,
  RT: string,
  data?: any,
  contentype: string = "application/json"
): Promise<{
  results?: Array<ApiResponse>;
  status: "success" | "unauthenticated";
  newAT?: string;
}> => {
  try {
    const results: Array<ApiResponse> = await Promise.all<any>(
      url.map((i) =>
        request.request({
          url: i,
          method: method,
          headers: {
            Authorization: `Bearer ${AT}`,
            "Content-Type": contentype,
          },
          data: data,
        })
      )
    );
    return { results, status: "success" };
  } catch (error: any) {
    //console.log(error);
    if (error.response.status === 401) {
      try {
        const refeshToken: ApiResponse = await request.get(
          "account/token/refesh",
          {
            headers: { Authorization: `Bearer ${RT}` },
          }
        );
        const results: Array<ApiResponse> = await Promise.all<any>(
          url.map((i) =>
            request.request({
              url: i,
              method: method,
              headers: {
                Authorization: `Bearer ${refeshToken.payload}`,
                "Content-Type": contentype,
              },
              data: data,
            })
          )
        );
        return {
          results,
          status: "success",
          newAT: refeshToken.payload,
        };
      } catch (error: any) {
        console.log(error.response.status);
        return { status: "unauthenticated" };
      }
    } else {
      throw error;
    }
  }
};
export default fetchApiWithToken;
