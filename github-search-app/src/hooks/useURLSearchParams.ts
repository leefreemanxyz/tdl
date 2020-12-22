import { useState } from "react";

export interface URLDispatch {
  type: "append" | "delete" | "set" | "sort";
  payload: any;
}

export const useURLSearchParams = () => {
  const { history, location } = window;
  const URLParams = new URLSearchParams(location.search);
  const [params, setParams] = useState(URLParams);

  const urlDispatch = ({ type, payload }: URLDispatch) => {
    const { key, value } = payload;

    // Create new URLSearchParams object with updated values
    params[type](key, value);

    // Cleanup URL (empty query values)
    params.forEach((_, key) => {
      if (!params.get(key)) {
        params.delete(key);
      }
    });

    history.replaceState({}, "", `${location.pathname}?${params}`);

    setParams(new URLSearchParams(params));
  };

  return { params, urlDispatch };
};
