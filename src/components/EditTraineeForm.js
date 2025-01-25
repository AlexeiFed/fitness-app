import React, { useState } from 'react';

const EditTraineeForm = ({ trainee, onSave, onCancel }) => {
    const [formData, setFormData] = useState({ ...trainee });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:5000/trainees/${trainee.id}/edit-all`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Ошибка при обновлении данных подопечного');
            }

            const updatedTrainee = await response.json();
            onSave(updatedTrainee.trainee); // Обновляем данные на клиенте
        } catch (error) {
            console.error(error);
            alert('Не удалось сохранить изменения');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Редактирование анкеты</h2>
            <label>
                Имя:
                <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                />
            </label>
            <label>
                Фамилия:
                <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                />
            </label>
            <label>
                Дата рождения:
                <input
                    type="date"
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleChange}
                />
            </label>
            <label>
                Контактный телефон:
                <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                />
            </label>
            <label>
                Email:
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
            </label>
            <label>
                Рост (см):
                <input
                    type="number"
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                />
            </label>
            <label>
                Настоящий вес (кг):
                <input
                    type="number"
                    name="currentWeight"
                    value={formData.currentWeight}
                    onChange={handleChange}
                />
            </label>
            <label>
                Желаемый вес (кг):
                <input
                    type="number"
                    name="desiredWeight"
                    value={formData.desiredWeight}
                    onChange={handleChange}
                />
            </label>
            <label>
                Цели:
                <textarea
                    name="goals"
                    value={formData.goals}
                    onChange={handleChange}
                ></textarea>
            </label>
            <label>
                Вредные привычки:
                <textarea
                    name="badHabits"
                    value={formData.badHabits}
                    onChange={handleChange}
                ></textarea>
            </label>
            <label>
                График дня (сидячий, подвижный):
                <textarea
                    name="dailySchedule"
                    value={formData.dailySchedule}
                    onChange={handleChange}
                ></textarea>
            </label>
            <label>
                Какие ваши любимые продукты или продукты, от которых вам сложно отказаться?:
                <textarea
                    name="favoriteProducts"
                    value={formData.favoriteProducts}
                    onChange={handleChange}
                ></textarea>
            </label>
            <label>
                Какие ваши нелюбимые продукты?:
                <textarea
                    name="dislikedProducts"
                    value={formData.dislikedProducts}
                    onChange={handleChange}
                ></textarea>
            </label>
            <label>
                Сколько часов в сутки спите?:
                <textarea
                    name="sleepHours"
                    value={formData.sleepHours}
                    onChange={handleChange}
                ></textarea>
            </label>
            <label>
                Во сколько ложитесь спать и во сколько просыпаетесь?:
                <textarea
                    name="sleepSchedule"
                    value={formData.sleepSchedule}
                    onChange={handleChange}
                ></textarea>
            </label>
            <label>
                Завтракаете ли вы?:
                <textarea
                    name="breakfast"
                    value={formData.breakfast}
                    onChange={handleChange}
                ></textarea>
            </label>
            <label>
                Сколько приёмов пищи в день?:
                <textarea
                    name="goals"
                    value={formData.goals}
                    onChange={handleChange}
                ></textarea>
            </label>
            <label>
                Цели:
                <textarea
                    name="goals"
                    value={formData.goals}
                    onChange={handleChange}
                ></textarea>
            </label>




            {/* Продолжите добавлять остальные поля анкеты */}




            <button type="submit">Сохранить</button>
            <button type="button" onClick={onCancel}>
                Отмена
            </button>
        </form>
    );
};

export default EditTraineeForm;
