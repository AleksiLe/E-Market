import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import ProductWindow from '@/app/products/productWindow';
import getProducts from '@/services/getProducts.js';

jest.mock('@/services/getProducts.js', () => jest.fn());

jest.mock('@/components/productCard.jsx', () => {
  return function ProductCardMock({ productName, productDescription }) {
    return (
      <div data-testid="product-card">
        <div>{productName}</div>
        <div>{productDescription}</div>
      </div>
    );
  };
});

jest.mock('@/components/loadingAnimation.jsx', () => {
  return function LoadingAnimationMock() {
    return <div data-testid="loading">Loading...</div>;
  };
});

describe('ProductWindow', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows LoadingAnimation initially', () => {
    getProducts.mockReturnValue(new Promise(() => {}));

    render(<ProductWindow />);

    expect(screen.getByTestId('loading')).toBeInTheDocument();
    expect(screen.queryByTestId('product-card')).not.toBeInTheDocument();
  });

  it('renders ProductCard items after products resolve', async () => {
    getProducts.mockResolvedValue([
      { _id: '1', name: 'Product A', description: 'Desc A' },
      { _id: '2', name: 'Product B', description: 'Desc B' },
    ]);

    render(<ProductWindow />);

    // Loading first
    expect(screen.getByTestId('loading')).toBeInTheDocument();

    // Then cards appear
    const cards = await screen.findAllByTestId('product-card');
    expect(cards).toHaveLength(2);

    expect(screen.getByText('Product A')).toBeInTheDocument();
    expect(screen.getByText('Desc A')).toBeInTheDocument();
    expect(screen.getByText('Product B')).toBeInTheDocument();
    expect(screen.getByText('Desc B')).toBeInTheDocument();

    // Loading disappears
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
  });

  it('calls getProducts only once (isMounted guard)', async () => {
    getProducts.mockResolvedValue([
      { _id: '1', name: 'Product A', description: 'Desc A' },
    ]);

    render(<ProductWindow />);

    await screen.findByText('Product A');

    expect(getProducts).toHaveBeenCalledTimes(1);
  });

  it('logs error if getProducts rejects and keeps showing loading', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    getProducts.mockRejectedValue(new Error('Network error'));

    render(<ProductWindow />);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalled();
    });

    // Still loading, since products never set
    expect(screen.getByTestId('loading')).toBeInTheDocument();
    expect(screen.queryByTestId('product-card')).not.toBeInTheDocument();

    consoleSpy.mockRestore();
  });
});