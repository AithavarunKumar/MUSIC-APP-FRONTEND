import React, { useState } from 'react';
import './ModelFilter.css'; // Ensure this CSS file is updated

interface ModalProps {
    show: boolean; 
    onClose: () => void;
    onSelect: (option: string) => void;
}

const Modal: React.FC<ModalProps> = ({ show, onClose, onSelect }) => {
    const [selectedOption, setSelectedOption] = useState<string>('');

    const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSelectedOption(selectedOption === value ? '' : value); // Toggle selection
    };

    const handleSubmit = () => {
        if (selectedOption) {
            onSelect(selectedOption);
        }
        onClose();
    };

    if (!show) return null;

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <h2 id='searchOptionHeading'>Select Search Option</h2>
                <div>
                    <label className='labelForFilter'>
                        <input
                            type="checkbox"
                            value="artist"
                            className='inputForFilter'
                            checked={selectedOption === 'artist'}
                            onChange={handleOptionChange}
                        />
                        Artist
                    </label>
                </div>
                <div>
                    <label className='labelForFilter'>
                        <input
                            type="checkbox"
                            value="genre"
                            className='inputForFilter'
                            checked={selectedOption === 'genre'}
                            onChange={handleOptionChange}
                        />
                        Genre
                    </label>
                </div>
                <div className='buttonsforFilter'>
                    <button onClick={handleSubmit}>Select</button>
                    <button onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
