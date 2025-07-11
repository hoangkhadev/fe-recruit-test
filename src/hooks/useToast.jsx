import { toast } from "sonner";
import { CheckCircle, ExclamationCircle } from "@/assets/icons";

export const useToast = () => {
  const showSucess = (message) => {
    toast.success(message, {
      icon: <CheckCircle className="text-green-500" />,
    });
  };

  const showError = (message) => {
    toast.error(message, {
      icon: <ExclamationCircle className="text-red-500" />,
    });
  };

  return { showSucess, showError };
};
