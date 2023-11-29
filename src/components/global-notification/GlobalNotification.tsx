import { useEffect } from "react";

import { CheckCircle, Warning, WarningCircle, X } from "@phosphor-icons/react";

interface GlobalNotificationProps {
  message: string;
  description?: string;
  type?: "success" | "warning" | "error";
  show: boolean;
  onClose: (alertTypes: boolean) => void;
  timeToClose?: number;
}

export default function GlobalNotification({
  message,
  description,
  type = "success",
  show,
  onClose,
  timeToClose = undefined,
}: GlobalNotificationProps) {
  useEffect(() => {
    show &&
      timeToClose &&
      setTimeout(() => {
        onClose(false);
      }, timeToClose);
  }, []);

  return (
    <div
      className={`${show ? "flex" : "hidden"} z-20 gap-2 ${
        type === "success"
          ? "bg-[#4BB543]"
          : type === "warning"
          ? "bg-[#FFCC00]"
          : "bg-[#CC3300]"
      } w-[85%] min-[420px]:w-[35%] text-gray-100 rounded-md px-4 py-3 fixed top-[5%] left-[50%] -translate-x-2/4`}
    >
      {type === "success" ? (
        <CheckCircle size={20} weight="fill" />
      ) : type === "warning" ? (
        <Warning size={20} weight="fill" />
      ) : (
        <WarningCircle size={20} weight="fill" />
      )}
      <div className="flex flex-col">
        <b>{message}</b>
        <span>{description}</span>
      </div>
      <X
        className="absolute right-4 mt-1 ml-5 hover:opacity-60 transition-all cursor-pointer"
        size={20}
        onClick={() => onClose(false)}
      />
    </div>
  );
}
