import React from 'react';
import { render, screen ,fireEvent} from '@testing-library/react';
import { Sidebar } from './sidebar';
import { useNavigate } from 'react-router-dom';
import { waitFor } from '@testing-library/dom';
