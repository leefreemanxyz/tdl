import { ReactChild } from "react";
import { URLDispatch, useURLSearchParams } from "../hooks/useURLSearchParams";
import createCtx from "./useCtx";

interface WindowLocationContextType {
  params: URLSearchParams;
  urlDispatch: (a: URLDispatch) => any;
}

export const [
  useWindowLocation,
  WindowContext,
] = createCtx<WindowLocationContextType>();

export const WindowProvider = ({ children }: { children: ReactChild }) => {
  const { params, urlDispatch } = useURLSearchParams();
  const context = {
    params,
    urlDispatch,
  };
  return <WindowContext value={context}>{children}</WindowContext>;
};
