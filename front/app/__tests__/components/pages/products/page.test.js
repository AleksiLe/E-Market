import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Product from '@/app/products/page';

describe('Product Component', () => {
    test('renders the product page correctly', () => {
        render(<Product />);
        expect(screen.getByRole('status')).toBeInTheDocument();
    });
});