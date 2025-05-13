import React, {createContext, useState, useContext} from 'react';

type ToastType = 'success' | 'error';

interface ToastState {
  visible: boolean;
  message: string;
  type: ToastType;
  actionLabel?: string;
  onActionPress?: () => void;
}

interface ToastContextType {
  showToast: (toast: Partial<ToastState>) => void;
  hideToast: () => void;
  toast: ToastState;
}

const ToastContext = createContext<ToastContextType | null>(null);

export const ToastProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [toast, setToast] = useState<ToastState>({
    visible: false,
    message: '',
    type: 'success',
  });

  const showToast = (toastData: Partial<ToastState>) => {
    setToast({
      visible: true,
      message: toastData.message || '',
      type: toastData.type || 'success',
      actionLabel: toastData.actionLabel,
      onActionPress: toastData.onActionPress,
    });

    setTimeout(() => {
      setToast(prev => ({...prev, visible: false}));
    }, 2000);
  };

  const hideToast = () => setToast(prev => ({...prev, visible: false}));

  return (
    <ToastContext.Provider value={{showToast, hideToast, toast}}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
};
