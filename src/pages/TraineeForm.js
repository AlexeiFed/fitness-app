import React, { useState } from 'react';

const TraineeForm = () => {
    const [form, setForm] = useState({
        name: '',
        category: 'online',
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Анкета отправлена:', form);
    };

    return (
        <div>
            <h1>Заполнить анкету</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Имя:
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Категория:
                    <select
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                    >
                        <option value="online">Онлайн наставничество</option>
                        <option value="offline">Офлайн тренировки</option>
                        <option value="marathon">Марафон</option>
                    </select>
                </label>
                <br />
                <button type="submit">Отправить</button>
            </form>
        </div>
    );
};

export default TraineeForm;
