import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Modal from './ModalFilter'; // Adjust the import path according to your project structure
describe('Modal handleSubmit', () => {
  const mockOnClose = jest.fn();
  const mockOnSelect = jest.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
    mockOnSelect.mockClear();
  });

  test('calls onSelect with "artist" when artist is selected and Select is clicked', () => {
    const { getByLabelText, getByText } = render(
      <Modal show={true} onClose={mockOnClose} onSelect={mockOnSelect} />
    );
    fireEvent.click(getByLabelText('Artist'));
    fireEvent.click(getByText('Select'));
    expect(mockOnSelect).toHaveBeenCalledWith('artist');
    expect(mockOnClose).toHaveBeenCalled();
  });

  test('calls onSelect with "genre" when genre is selected and Select is clicked', () => {
    const { getByLabelText, getByText } = render(
      <Modal show={true} onClose={mockOnClose} onSelect={mockOnSelect} />
    );
    fireEvent.click(getByLabelText('Genre'));
    fireEvent.click(getByText('Select'));
    expect(mockOnSelect).toHaveBeenCalledWith('genre');
    expect(mockOnClose).toHaveBeenCalled();
  });

  test('calls onClose but not onSelect when no option is selected and Select is clicked', () => {
    const { getByText } = render(
      <Modal show={true} onClose={mockOnClose} onSelect={mockOnSelect} />
    );
    fireEvent.click(getByText('Select'));
    expect(mockOnSelect).not.toHaveBeenCalled();
    expect(mockOnClose).toHaveBeenCalled();
  });
});
describe('Modal handleSubmit', () => {
        const mockOnClose = jest.fn();
        const mockOnSelect = jest.fn();
      
        beforeEach(() => {
          mockOnClose.mockClear();
          mockOnSelect.mockClear();
        });
      
        test('calls onSelect with "artist" when artist is selected and Select is clicked', () => {
          const { getByLabelText, getByText } = render(
            <Modal show={true} onClose={mockOnClose} onSelect={mockOnSelect} />
          );
          fireEvent.click(getByLabelText('Artist'));
          fireEvent.click(getByText('Select'));
          expect(mockOnSelect).toHaveBeenCalledWith('artist');
          expect(mockOnClose).toHaveBeenCalled();
        });
      
        test('calls onSelect with "genre" when genre is selected and Select is clicked', () => {
          const { getByLabelText, getByText } = render(
            <Modal show={true} onClose={mockOnClose} onSelect={mockOnSelect} />
          );
          fireEvent.click(getByLabelText('Genre'));
          fireEvent.click(getByText('Select'));
          expect(mockOnSelect).toHaveBeenCalledWith('genre');
          expect(mockOnClose).toHaveBeenCalled();
        });
      
        test('calls onClose but not onSelect when no option is selected and Select is clicked', () => {
          const { getByText } = render(
            <Modal show={true} onClose={mockOnClose} onSelect={mockOnSelect} />
          );
          fireEvent.click(getByText('Select'));
          expect(mockOnSelect).not.toHaveBeenCalled();
          expect(mockOnClose).toHaveBeenCalled();
        });
      });