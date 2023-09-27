import { expect, describe, it } from 'vitest';
import { render } from '@testing-library/react';

import InputBox from '@/app/(modules)/(game)/components/InputGroup/InputRow/InputBox';

describe('Input box component', () => {
  it('should be rendered', () => {
    const { container } = render(
      <InputBox columnIndex={0} rowIndex={0} isOnboarding={false} />
    );

    const input = container.firstElementChild;

    expect(input).toBeDefined();
  });
});
