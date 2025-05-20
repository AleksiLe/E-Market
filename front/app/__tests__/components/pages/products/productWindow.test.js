import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import ProductWindow from '@/app/products/productWindow';
import getProducts from '@/services/getProducts';

jest.mock('@/services/getProducts', () => jest.fn());

describe('ProductWindow Component', () => {
    const mockProducts = [
        { _id: '1', name: 'Product 1', description: 'Description 1' },
        { _id: '2', name: 'Product 2', description: 'Description 2' },
    ];

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders loading animation initially', () => {
        render(<ProductWindow />);
        expect(screen.getByRole('status')).toBeInTheDocument(); // Assuming LoadingAnimation has a role="status"
    });

    test('fetches and displays products after loading', async () => {
        getProducts.mockResolvedValueOnce(mockProducts);

        render(<ProductWindow />);

        // Wait for the products to be rendered
        await waitFor(() => {
            expect(screen.getByText('Product 1')).toBeInTheDocument();
            expect(screen.getByText('Product 2')).toBeInTheDocument();
        });

        // Ensure the loading animation is no longer displayed
        expect(screen.queryByRole('status')).not.toBeInTheDocument();
    });

    test('handles fetch errors gracefully', async () => {
        getProducts.mockRejectedValueOnce(new Error('Failed to fetch products'));

        render(<ProductWindow />);

        // Ensure the loading animation is displayed initially
        expect(screen.getByRole('status')).toBeInTheDocument();

        // Wait for the error to be logged (no UI changes expected in this case)
        await waitFor(() => {
            expect(getProducts).toHaveBeenCalledTimes(1);
        });

        // Ensure the loading animation is no longer displayed
        expect(screen.queryByRole('status')).not.toBeInTheDocument();
    });

    test('renders no products if the API returns an empty array', async () => {
        getProducts.mockResolvedValueOnce([]);

        render(<ProductWindow />);

        // Wait for the products to be rendered
        await waitFor(() => {
            expect(screen.queryByText('Product 1')).not.toBeInTheDocument();
            expect(screen.queryByText('Product 2')).not.toBeInTheDocument();
        });

        // Ensure the loading animation is no longer displayed
        expect(screen.queryByRole('status')).not.toBeInTheDocument();
    });
});