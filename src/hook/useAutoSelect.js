import { useRef } from "react";

export const useAutoSelect = (defaultValue) => {
  const inputRef = useRef(defaultValue);

  const handleFocus = () => {
    inputRef.current.select();
  };

  return [inputRef, handleFocus];
};
