import React, { ReactNode } from "react";

import { useURLSearchParams, URLDispatch } from "../hooks/useURLSearchParams";
import { useLocation, useHistory } from "react-router-dom";
import createCtx from "./useCtx";
import { History, Location } from "history";

interface LocationContextInterface {
  params: URLSearchParams;
  urlDispatch: ({ type, payload }: URLDispatch) => void;
}

export const [
  useLocationContext,
  LocationContextProvider,
] = createCtx<LocationContextInterface>();

export const LocationProvider = ({ children }: { children: ReactNode }) => {
  const location: Location = useLocation();
  const history: History = useHistory();
  const { params, urlDispatch } = useURLSearchParams({
    location,
    history,
  });

  const context = {
    params,
    urlDispatch,
  };

  return (
    <LocationContextProvider value={context}>
      {children}
    </LocationContextProvider>
  );
};
