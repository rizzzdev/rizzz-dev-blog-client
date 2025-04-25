"use client";

import { Check, X } from "@phosphor-icons/react";
import { atom, useAtom } from "jotai";
import { useEffect } from "react";

export interface ToastType {
  type: "success" | "failure";
  isVisible: boolean;
  message: string;
  duration?: number;
}

interface ToastProps {
  position?: string;
}

export const initialToast: ToastType = {
  isVisible: false,
  message: "",
  type: "success",
  duration: 3000,
};
export const toastAtom = atom<ToastType>(initialToast);

const Toast = (props: ToastProps) => {
  const { position } = props;
  const [toast, setToast] = useAtom(toastAtom);

  useEffect(() => {
    if (toast.isVisible) {
      const timer = setTimeout(() => {
        setToast({ ...toast, isVisible: false });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [toast, setToast]);

  if (!toast.isVisible) {
    return null;
  }

  return (
    <div
      className={`w-fit fixed ${position ? position : "bottom-10 right-10"}`}
    >
      {toast && (
        <div className="w-fit flex justify-center items-center gap-2 md:gap-4 p-2 md:p-4 border-2 border-primary rounded-lg bg-primary text-white ">
          {toast.type === "success" && (
            <>
              <Check
                size={32}
                className="text-green-400 hidden md:block"
                weight="fill"
              />
              <Check
                size={24}
                className="text-green-400 md:hidden"
                weight="fill"
              />
            </>
          )}
          {toast.type === "failure" && (
            <>
              <X
                size={32}
                className="text-red-400 hidden md:block"
                weight="fill"
              />
              <X size={24} className="text-red-400 md:hidden" weight="fill" />
            </>
          )}
          <p className="flex-1 font-semibold text-sm md:text-lg">
            {toast.message}
          </p>
        </div>
      )}
    </div>
  );
};

export default Toast;
