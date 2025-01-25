import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';

const TrainerDashboard = () => {
    const [trainees, setTrainees] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');

    useEffect(() => {
        // Запрос к API для получения подопечных
        fetch('http://localhost:5000/trainees')
            .then((response) => response.json())
            .then((data) => setTrainees(data))
            .catch((error) => console.error('Ошибка загрузки данных:', error));
    }, []);

    const filteredTrainees =
        selectedCategory === 'all'
            ? trainees
            : trainees.filter((trainee) => trainee.category === selectedCategory);

    return (
        <div>
            <Header />
            <h1>Тренерский кабинет</h1>
            <p>
                Всего подопечных: {trainees.length}, из них:
                <br /> Онлайн наставничество: {trainees.filter((t) => t.category === 'online').length}
                <br /> Офлайн тренировки: {trainees.filter((t) => t.category === 'offline').length}
                <br /> Марафон: {trainees.filter((t) => t.category === 'marathon').length}
            </p>

            <div>
                <button onClick={() => setSelectedCategory('all')}>Все</button>
                <button onClick={() => setSelectedCategory('online')}>Онлайн наставничество</button>
                <button onClick={() => setSelectedCategory('offline')}>Офлайн тренировки</button>
                <button onClick={() => setSelectedCategory('marathon')}>Марафон</button>
            </div>

            <h2>Список подопечных</h2>
            <ul>
                {filteredTrainees.map((trainee) => (
                    <li key={trainee.id}>
                        {trainee.name} ({trainee.category}) —{' '}
                        <Link to={`/trainee/${trainee.id}`}>Перейти к анкете</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TrainerDashboard;
