import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ProductCard from '../src/components/productCard';

describe('ProductCard', () => {
    it('renders a product card with the correct name and description', () => {
        const productName = 'Test Product';
        const productDescription = 'This is a test product';

        render(<ProductCard productName={productName} productDescription={productDescription} />);

        expect(screen.getByText(productName)).toBeInTheDocument();
        expect(screen.getByText(productDescription)).toBeInTheDocument();
    });

    it('renders the product image with the correct alt text', () => {
        const productName = 'Test Product';
        const productDescription = 'This is a test product';

        render(<ProductCard productName={productName} productDescription={productDescription} />);

        const imgElement = screen.getByAltText(productName);
        expect(imgElement).toBeInTheDocument();
        expect(imgElement).toHaveAttribute('src', '/filler.jpg');
    });
});