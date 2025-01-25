import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from './Header';

// Заглушка для данных о подопечных
const initialTrainees = [
    { id: 1, name: 'John Doe', age: 28, category: 'online', goals: 'Похудеть на 10 кг', photos: ['photo1.jpg', 'photo2.jpg'] },
    { id: 2, name: 'Jane Smith', age: 32, category: 'offline', goals: 'Набрать мышечную массу', photos: ['photo3.jpg'] },
    { id: 3, name: 'Chris Evans', age: 25, category: 'marathon', goals: 'Подготовка к марафону', photos: [] },
];

const TraineeDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [trainees, setTrainees] = useState(initialTrainees);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ name: '', age: '', goals: '' });

    const trainee = trainees.find((t) => t.id === Number(id));
    if (!trainee) return <p>Подопечный не найден</p>;

    const handleCategoryChange = async (newCategory) => {
        try {
            const response = await fetch(`http://localhost:5000/trainees/${trainee.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ newCategory }),
            });

            if (!response.ok) {
                throw new Error('Не удалось изменить категорию');
            }

            const updatedTrainee = await response.json();

            // Обновляем состояние после успешного изменения категории
            setTrainees((prevTrainees) =>
                prevTrainees.map((t) =>
                    t.id === trainee.id ? { ...t, category: updatedTrainee.trainee.category } : t
                )
            );

            alert(`Категория подопечного изменена на "${newCategory}"`);
            navigate('/'); // Возвращаемся на главную страницу
        } catch (error) {
            console.error(error);
            alert('Произошла ошибка при изменении категории');
        }
    };

    const handleEdit = async () => {
        try {
            const response = await fetch(`http://localhost:5000/trainees/${trainee.id}/edit`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error('Ошибка при обновлении данных');

            const updatedTrainee = await response.json();
            setTrainees((prevTrainees) =>
                prevTrainees.map((t) => (t.id === trainee.id ? updatedTrainee.trainee : t))
            );
            alert('Данные подопечного успешно обновлены');
            setIsEditing(false);
        } catch (error) {
            console.error(error);
            alert('Ошибка при обновлении данных');
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Вы уверены, что хотите удалить подопечного?')) {
            try {
                const response = await fetch(`http://localhost:5000/trainees/${trainee.id}`, {
                    method: 'DELETE',
                });

                if (!response.ok) throw new Error('Ошибка при удалении подопечного');

                setTrainees((prevTrainees) => prevTrainees.filter((t) => t.id !== trainee.id));
                alert('Подопечный успешно удален');
                navigate('/');
            } catch (error) {
                console.error(error);
                alert('Ошибка при удалении подопечного');
            }
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    return (
        <div>
            <Header />
            <h1>Анкета подопечного</h1>
            <p><strong>Имя:</strong> {trainee.name}</p>
            <p><strong>Возраст:</strong> {trainee.age}</p>
            <p><strong>Цели:</strong> {trainee.goals}</p>
            <p><strong>Категория:</strong> {trainee.category}</p>

            <h2>Фотографии</h2>
            {/* Отображение фотографий */}

            <h2>Управление подопечным</h2>
            <button onClick={() => setIsEditing(true)}>Редактировать данные</button>
            <button onClick={handleDelete} style={{ marginLeft: '10px', color: 'red' }}>
                Удалить подопечного
            </button>

            {isEditing && (
                <div>
                    <h3>Редактирование данных</h3>
                    <label>
                        Имя:
                        <input type="text" name="name" defaultValue={trainee.name} onChange={handleInputChange} />
                    </label>
                    <label>
                        Возраст:
                        <input type="number" name="age" defaultValue={trainee.age} onChange={handleInputChange} />
                    </label>
                    <label>
                        Цели:
                        <input type="text" name="goals" defaultValue={trainee.goals} onChange={handleInputChange} />
                    </label>
                    <button onClick={handleEdit}>Сохранить</button>
                    <button onClick={() => setIsEditing(false)}>Отмена</button>
                    <h2>Изменить категорию</h2>
                    <div>
                        <button onClick={() => handleCategoryChange('online')}>Онлайн наставничество</button>
                        <button onClick={() => handleCategoryChange('offline')}>Офлайн тренировки</button>
                        <button onClick={() => handleCategoryChange('marathon')}>Марафон</button>
                    </div>


                </div>
            )}
        </div>
    );
};

export default TraineeDetails;
