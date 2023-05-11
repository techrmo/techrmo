import {
  expect,
  describe,
  it,
} from 'vitest';
import { render } from '@testing-library/react';

import { InputBox } from '@/modules/game/components/RowInput/InputBox';

describe('Input box component', () => {
  it('should be rendered', () => {
    const { container } = render(<InputBox />);

    const input = container.firstElementChild;

    expect(input).toBeDefined();
  });
});
