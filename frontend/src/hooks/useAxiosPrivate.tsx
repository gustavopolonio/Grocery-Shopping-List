import { useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import { axiosPrivate } from "@/lib/axiosPrivate";

export function useAxiosPrivate() {
  const { getToken } = useAuth();

  useEffect(() => {
    const requestInterceptor = axiosPrivate.interceptors.request.use(
      async (config) => {
        const token = await getToken();

        if (token && config.headers) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestInterceptor);
    };
  }, [getToken]);

  return axiosPrivate;
}
