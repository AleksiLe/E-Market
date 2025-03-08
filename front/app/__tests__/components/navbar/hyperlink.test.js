import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Hyperlink from '../../../src/components/navbar/hyperlink';
import Link from 'next/link';

jest.mock('next/link', () => {
  return ({ children, href, className }) => {
    return <a href={href} class={className}>{children}</a>;
  };
});

describe('Hyperlink', () => {
  it('renders the hyperlink with active class when path matches address', () => {
    render(<Hyperlink path="/home" address="/home" text="Home" />);
    const linkElement = screen.getByText('Home');
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveClass('bg-transparent text-blue-700 p-0 dark:text-blue-500');
  });

  it('renders the hyperlink with hover class when path does not match address', () => {
    render(<Hyperlink path="/home" address="/about" text="About" />);
    const linkElement = screen.getByText('About');
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveClass('hover:bg-transparent hover:text-blue-700 p-0 dark:text-white dark:hover:bg-transparent');
  });
});