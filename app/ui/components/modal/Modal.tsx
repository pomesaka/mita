import { clsx } from "clsx";
import { useEffect, useRef } from "react";
import type { DependencyList } from "react";

export const useOutsideClick = (
  callback: () => void,
  deps?: DependencyList,
) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };
    document.addEventListener("click", handleClick, true);
    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, [ref, ...(deps ?? [])]);

  return ref;
};

export interface ModalProps {
  isOpen: boolean;
  close: () => void;
  className?: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  close,
  isOpen,
  children,
  className,
}) => {
  const ref = useOutsideClick(close);
  return (
    <div
      className={clsx(
        "fixed top-0 left-0 z-30 flex h-screen w-screen items-center justify-center bg-white/60 transition duration-300 ease-in-out",
        isOpen ? "opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      <div
        ref={ref}
        className={clsx(
          className,
          "flex rounded border bg-white shadow-gray-400 shadow-lg",
        )}
      >
        {children}
      </div>
    </div>
  );
};
