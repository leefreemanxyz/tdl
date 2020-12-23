import { useState, useCallback } from "react";
import { History, Location } from "history";

export type URLDispatch = {
  type: "append" | "delete" | "set" | "sort";
  payload: Payload;
};

type Payload = {
  key: string;
  value: string;
};

type CustomLocation = {
  location: Location;
  history: History;
};

export const useURLSearchParams = (customLocation: CustomLocation) => {
  const { history, location } = customLocation;
  const URLParams = new URLSearchParams(location.search);
  const [params, setParams] = useState(URLParams);

  const urlDispatch = useCallback(
    ({ type, payload }: URLDispatch) => {
      const { key, value } = payload;

      // Create new URLSearchParams object with updated values
      params[type](key, value);

      // Cleanup URL (empty query values)
      params.forEach((_, key) => {
        if (!params.get(key)) {
          params.delete(key);
        }
      });

      // Update the browser's URL
      history.replace(`${location.pathname}?${params}`);

      setParams(new URLSearchParams(params));
    },
    [history, params, location.pathname]
  );

  return { params, urlDispatch };
};
