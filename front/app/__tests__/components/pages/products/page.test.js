import { render, screen } from '@testing-library/react';
import Products from '@/app/products/page';

jest.mock('@/app/products/productWindow', () => {
  return function ProductWindowMock() {
    return <div data-testid="product-window">ProductWindow</div>;
  };
});

describe('Products page', () => {
  it('renders ProductWindow', () => {
    render(<Products />);

    expect(screen.getByTestId('product-window')).toBeInTheDocument();
  });
});