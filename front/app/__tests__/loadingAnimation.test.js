import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import LoadingAnimation from '../src/components/loadingAnimation';

describe('LoadingAnimation', () => {
    it('renders the loading animation with the correct attributes', () => {
        render(<LoadingAnimation />);

        // Check if the SVG element is present
        const svgElement = screen.getByRole('status').querySelector('svg');
        expect(svgElement).toBeInTheDocument();
        expect(svgElement).toHaveClass('inline w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600');

        // Check if the span element with the sr-only class is present
        const spanElement = screen.getByText('Loading...');
        expect(spanElement).toBeInTheDocument();
        expect(spanElement).toHaveClass('sr-only');
    });
});