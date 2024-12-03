import { toast, Toaster } from 'react-hot-toast';

export const showToast = (message, type = 'error') => {
    switch (type) {
        case 'success':
            toast.success(message);
            break;
        case 'loading':
            toast.loading(message);
            break;
        case 'error':
        default:
            toast.error(message);
            break;
    }
};
