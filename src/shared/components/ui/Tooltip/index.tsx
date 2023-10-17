'use client';

import { ComponentProps, ReactNode } from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';

import styles from './styles.module.scss';

interface TooltipUIProps
  extends Omit<ComponentProps<typeof Tooltip.Content>, 'content'> {
  content: ReactNode;
  children: ReactNode;
}

const TooltipUI = ({
  content,
  children,
  sideOffset = 5,
  ...restContent
}: TooltipUIProps) => {
  return (
    <Tooltip.Provider delayDuration={0}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            {...restContent}
            className={styles.tooltipContent}
            sideOffset={sideOffset}
          >
            {content}
            <Tooltip.Arrow className={styles.tooltipArrow} />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export default TooltipUI;
