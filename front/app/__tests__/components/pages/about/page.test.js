import { render, screen } from '@testing-library/react';
import About from '@/app/about/page'; 

describe('About page', () => {
  it('renders about text', () => {
    render(<About />);

    expect(screen.getByText('This is an about page.')).toBeInTheDocument();
  });
});