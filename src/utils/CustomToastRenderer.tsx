import CustomToast from '../components/CustomToast';
import {useToast} from '../context/ToastContext';

export const CustomToastRenderer = () => {
  const {toast} = useToast();

  return (
    <CustomToast
      visible={toast.visible}
      message={toast.message}
      type={toast.type}
      actionLabel={toast.actionLabel}
      onActionPress={toast.onActionPress}
    />
  );
};
