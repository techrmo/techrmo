import { expect, describe, it } from 'vitest';
import { render } from '@testing-library/react';

import InputBox from '@/app/(game)/components/Inputs/InputBox';

describe('Input box component', () => {
  it('should be rendered', () => {
    const { container } = render(<InputBox columnIndex={0} rowIndex={0} />);

    const input = container.firstElementChild;

    expect(input).toBeDefined();
  });
});
