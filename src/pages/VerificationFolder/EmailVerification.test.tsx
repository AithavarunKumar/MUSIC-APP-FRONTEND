import React from 'react';
import { render, screen } from '@testing-library/react';
import EmailPage from './Email';

describe('EmailPage Component', () => {
  test('renders logo and app name correctly', () => {
    render(<EmailPage />);
    const logoImage = screen.getByAltText('SongSea Logo');
    const appName = screen.getByText('SongSea');
    expect(logoImage).toBeInTheDocument();
    expect(appName).toBeInTheDocument();
  });

  test('renders heading "Check Your Email"', () => {
    render(<EmailPage />);
    const heading = screen.getByText('Check Your Email');
    expect(heading).toBeInTheDocument();
  });

  test('renders email placeholder text correctly', () => {
    render(<EmailPage />);
    const emailPlaceholder = screen.getByText('--EMAIL--');
    expect(emailPlaceholder).toBeInTheDocument();
  });
});
