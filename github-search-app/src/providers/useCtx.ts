import { createContext, useContext } from "react";

export default function createCtx<T>() {
  const ctx = createContext<T | undefined>(undefined);
  function useCtx() {
    const c = useContext(ctx);
    if (!c) throw new Error("useCtx must be inside a Provider with a value");
    return c;
  }
  return [useCtx, ctx.Provider] as const;
}
