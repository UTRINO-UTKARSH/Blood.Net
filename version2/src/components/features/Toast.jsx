import { useEffect } from "react";
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
  X,
} from "lucide-react";

const toastStyles = {
  success: {
    icon: CheckCircle,
    border: "border-green-500",
    bg: "bg-green-500/10",
    text: "text-green-400",
  },
  error: {
    icon: XCircle,
    border: "border-red-500",
    bg: "bg-red-500/10",
    text: "text-red-400",
  },
  warning: {
    icon: AlertTriangle,
    border: "border-yellow-500",
    bg: "bg-yellow-500/10",
    text: "text-yellow-400",
  },
  info: {
    icon: Info,
    border: "border-blue-500",
    bg: "bg-blue-500/10",
    text: "text-blue-400",
  },
};

export default function Toast({
  message,
  type = "success",
  duration = 3000,
  onClose,
}) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const style = toastStyles[type] || toastStyles.success;
  const Icon = style.icon;

  return (
    <div
      className={`
        fixed top-6 right-6 z-50
        flex items-center gap-3
        w-87.5
        rounded-xl
        border
        ${style.border}
        ${style.bg}
        backdrop-blur-md
        px-5 py-4
        shadow-2xl
        animate-[slideIn_.35s_ease]
      `}
    >
      <Icon className={`${style.text} w-6 h-6 shrink-0`} />

      <p className="flex-1 text-sm text-white">{message}</p>

      <button
        onClick={onClose}
        className="text-gray-400 hover:text-white transition"
      >
        <X size={18} />
      </button>
    </div>
  );
}