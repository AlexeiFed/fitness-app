import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();

    return (
        <header style={{ padding: '10px', backgroundColor: '#f5f5f5', marginBottom: '20px' }}>
            <button onClick={() => navigate('/')} style={{ padding: '10px' }}>
                Главная страница
            </button>
        </header>
    );
};

export default Header;
