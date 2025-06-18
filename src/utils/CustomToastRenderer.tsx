import CustomToast from '../components/CustomToast';
import {useToast} from '../context/ToastContext';

export const CustomToastRenderer = () => {
  const {toast} = useToast();

  return (
    <CustomToast
      title={toast.title || ''}
      visible={toast.visible}
      message={toast.message}
      type={toast.type}
    />
  );
};
