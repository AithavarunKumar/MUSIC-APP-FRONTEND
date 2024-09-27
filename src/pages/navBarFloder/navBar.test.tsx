import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navbar from './navBar'; // Adjust the import path as necessary

describe('Navbar Component', () => {
        const exampleLinks = ['Home', 'About', 'Contact'];
        const exampleSongs = [
                { title: 'Song 1', artist: 'Artist 1', genre: 'Genre 1', likes: 100 },
                { title: 'Song 2', artist: 'Artist 2', genre: 'Genre 2', likes: 200 },
        ];
        const setExampleFeaturedSongs = jest.fn();

        test('renders without crashing', () => {
                render(<Navbar links={exampleLinks} exampleFeaturedSongs={exampleSongs} setExampleFeaturedSongs={setExampleFeaturedSongs} />);
                expect(screen.getByText('Song Sea')).toBeInTheDocument();
        });

        test('sidebar toggle works correctly', () => {
                const { container } = render(<Navbar links={exampleLinks} exampleFeaturedSongs={exampleSongs} setExampleFeaturedSongs={setExampleFeaturedSongs} />);
                // Replace 'fasbars' with the actual data-testid or use container.querySelector if it's a class name
                const toggleButton = container.querySelector('.fasbars');

                // Ensure the element exists
                if (toggleButton) {
                        fireEvent.click(toggleButton);
                } else {
                        // If the element is not found, fail the test with a custom message
                        throw new Error('Toggle button not found');
                }
                // Assuming 'model' is a class name of the modal. Adjust if it's different.
                const modal = container.querySelector('.model');
                expect(modal).toHaveAttribute('isOpen', 'true');
                fireEvent.click(screen.getByText('Close')); // Assuming there's a close button/text in Sidebar
                // Re-query for the modal as the DOM might have updated
                const updatedModal = container.querySelector('.model');
                expect(updatedModal).toHaveAttribute('isOpen', 'false');
        });

        test('navigation links are displayed', () => {
                render(<Navbar links={exampleLinks} exampleFeaturedSongs={exampleSongs} setExampleFeaturedSongs={setExampleFeaturedSongs} />);
                exampleLinks.forEach(link => {
                        expect(screen.getByText(link)).toBeInTheDocument();
                });
        });

        test('SearchBar receives setExampleFeaturedSongs prop', () => {
                render(<Navbar links={exampleLinks} exampleFeaturedSongs={exampleSongs} setExampleFeaturedSongs={setExampleFeaturedSongs} />);
                expect(screen.getByTestId('search-bar')).toHaveProp('setExampleFeaturedSongs');
        });

        test('Friends icon and link are displayed correctly', () => {
                const { container } = render(<Navbar links={exampleLinks} exampleFeaturedSongs={exampleSongs} setExampleFeaturedSongs={setExampleFeaturedSongs} />);
                // Assuming 'faUserFriends' is a class name. Adjust if it's an icon with a different selector.
                const friendsIcon = container.querySelector('.faUserFriends');
                expect(friendsIcon).toBeInTheDocument();
                expect(screen.getByText('Friends')).toBeInTheDocument();
        });
});