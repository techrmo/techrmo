import * as ToastRadix from '@radix-ui/react-toast';

import type { Toast, ToastVariant } from '@/shared/stores/toastStore';

import Button, { type ButtonVariant } from '../Button';

import styles from './styles.module.scss';

interface ToastProps {
  toast: Toast;
  removeToast: (id: string) => void;
}

const getButtonVariant = (variant: ToastVariant): ButtonVariant => {
  if (variant === 'error') {
    return 'outlined-red';
  }

  if (variant === 'success') {
    return 'outlined-green';
  }

  if (variant === 'warning') {
    return 'outlined-yellow';
  }

  return 'outlined-green';
};

export const ToastUI = ({ toast, removeToast }: ToastProps) => {
  return (
    <ToastRadix.Root
      className={styles.root}
      type="foreground"
      key={toast.id}
      duration={toast.duration}
      onOpenChange={() => removeToast(toast.id)}
      data-variant={toast.variant}
    >
      <ToastRadix.Title className={styles.title}>
        {toast.title}
      </ToastRadix.Title>
      <ToastRadix.Description className={styles.description}>
        {toast.description}
      </ToastRadix.Description>
      <ToastRadix.Action altText="Fechar Toast" asChild>
        <Button
          type="button"
          size="extra-small"
          variant={getButtonVariant(toast.variant)}
          onClick={() => removeToast(toast.id)}
          className={styles.action}
        >
          Fechar
        </Button>
      </ToastRadix.Action>
    </ToastRadix.Root>
  );
};
