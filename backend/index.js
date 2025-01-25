const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// Используем middleware
app.use(cors());
app.use(bodyParser.json());

// Заглушка для данных подопечных
let trainees = [
    { id: 1, firstName: 'John', lastName: 'Doe', birthDate: '15-05-1995', phone: '+1234567890', email: 'john.doe@example.com', height: 180, currentWeight: 80, desiredWeight: 70, goals: 'Похудеть на 10 кг', badHabits: 'Курение', dailySchedule: 'Сидячий', favoriteProducts: 'Шоколад, Чипсы', dislikedProducts: 'Рыба', sleepHours: 6, sleepSchedule: 'Ложусь в 2:00, просыпаюсь в 8:00', breakfast: 'Овсянка с фруктами', lunch: 'Курица с рисом', dinner: 'Салат с тунцом', snacksBeforeBed: true, drinks: 'Чай, Кофе', fruits: 'Яблоки, Бананы', fruitFrequency: 'Каждый день', vegetables: 'Огурцы, Помидоры', vegetableFrequency: '3 раза в неделю', varicoseVeins: 'Нет', spineDiseases: 'Остеохондроз', cnsDiseases: 'Нет', cardiovascularDiseases: 'Нет', respiratoryDiseases: 'Нет', diabetes: 'Нет', jointDiseases: 'Нет', injuries: 'Нет', visionImpairment: 'Нет', thyroidDiseases: 'Нет', lastMenstruation: 'Не применимо', hormonalDisorders: 'Нет', digestiveDiseases: 'Нет', allergies: 'Нет', breastfeeding: false, bloodTests: 'Нет', vitaminDeficiencySymptoms: 'Нет', digestiveIssues: 'Нет', medications: 'Нет', healthDeviations: 'Нет', mealTimes: 'Завтрак в 8:00, Обед в 13:00, Ужин в 18:00', fitnessExperience: '2 года', gymFrequency: '3 раза в неделю', trainingTypes: 'Кардио, Силовые тренировки', category: 'online', photos: [] },
    { id: 2, firstName: 'Bob', lastName: 'Rich', birthDate: '15-05-1995', phone: '+1234567890', email: 'john.doe@example.com', height: 180, currentWeight: 80, desiredWeight: 70, goals: 'Похудеть на 10 кг', badHabits: 'Курение', dailySchedule: 'Сидячий', favoriteProducts: 'Шоколад, Чипсы', dislikedProducts: 'Рыба', sleepHours: 6, sleepSchedule: 'Ложусь в 2:00, просыпаюсь в 8:00', breakfast: 'Овсянка с фруктами', lunch: 'Курица с рисом', dinner: 'Салат с тунцом', snacksBeforeBed: true, drinks: 'Чай, Кофе', fruits: 'Яблоки, Бананы', fruitFrequency: 'Каждый день', vegetables: 'Огурцы, Помидоры', vegetableFrequency: '3 раза в неделю', varicoseVeins: 'Нет', spineDiseases: 'Остеохондроз', cnsDiseases: 'Нет', cardiovascularDiseases: 'Нет', respiratoryDiseases: 'Нет', diabetes: 'Нет', jointDiseases: 'Нет', injuries: 'Нет', visionImpairment: 'Нет', thyroidDiseases: 'Нет', lastMenstruation: 'Не применимо', hormonalDisorders: 'Нет', digestiveDiseases: 'Нет', allergies: 'Нет', breastfeeding: false, bloodTests: 'Нет', vitaminDeficiencySymptoms: 'Нет', digestiveIssues: 'Нет', medications: 'Нет', healthDeviations: 'Нет', mealTimes: 'Завтрак в 8:00, Обед в 13:00, Ужин в 18:00', fitnessExperience: '2 года', gymFrequency: '3 раза в неделю', trainingTypes: 'Кардио, Силовые тренировки', category: 'online', photos: [] },
    { id: 3, firstName: 'Chris', lastName: 'Evans', birthDate: '15-05-1995', phone: '+1234567890', email: 'john.doe@example.com', height: 180, currentWeight: 80, desiredWeight: 70, goals: 'Похудеть на 10 кг', badHabits: 'Курение', dailySchedule: 'Сидячий', favoriteProducts: 'Шоколад, Чипсы', dislikedProducts: 'Рыба', sleepHours: 6, sleepSchedule: 'Ложусь в 2:00, просыпаюсь в 8:00', breakfast: 'Овсянка с фруктами', lunch: 'Курица с рисом', dinner: 'Салат с тунцом', snacksBeforeBed: true, drinks: 'Чай, Кофе', fruits: 'Яблоки, Бананы', fruitFrequency: 'Каждый день', vegetables: 'Огурцы, Помидоры', vegetableFrequency: '3 раза в неделю', varicoseVeins: 'Нет', spineDiseases: 'Остеохондроз', cnsDiseases: 'Нет', cardiovascularDiseases: 'Нет', respiratoryDiseases: 'Нет', diabetes: 'Нет', jointDiseases: 'Нет', injuries: 'Нет', visionImpairment: 'Нет', thyroidDiseases: 'Нет', lastMenstruation: 'Не применимо', hormonalDisorders: 'Нет', digestiveDiseases: 'Нет', allergies: 'Нет', breastfeeding: false, bloodTests: 'Нет', vitaminDeficiencySymptoms: 'Нет', digestiveIssues: 'Нет', medications: 'Нет', healthDeviations: 'Нет', mealTimes: 'Завтрак в 8:00, Обед в 13:00, Ужин в 18:00', fitnessExperience: '2 года', gymFrequency: '3 раза в неделю', trainingTypes: 'Кардио, Силовые тренировки', category: 'online', photos: [] },
];

// Маршрут для получения списка подопечных
app.get('/trainees', (req, res) => {
    res.json(trainees);
});

// Маршрут для обновления категории подопечного
app.put('/trainees/:id', (req, res) => {
    const { id } = req.params; // Получаем ID подопечного из URL
    const { newCategory } = req.body; // Получаем новую категорию из тела запроса


    // Находим подопечного по ID
    const trainee = trainees.find((t) => t.id === Number(id));
    if (!trainee) {
        return res.status(404).json({ message: 'Подопечный не найден' });
    }

    trainee.category = newCategory; // Меняем категорию
    return res.json({ message: 'Категория изменена', trainee });
});

// Добавляем новый маршрут для редактирования всех данных подопечного
app.put('/trainees/:id/edit-all', (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;

    const trainee = trainees.find((t) => t.id === Number(id));
    if (!trainee) {
        return res.status(404).json({ message: 'Подопечный не найден' });
    }

    Object.assign(trainee, updatedData);

    res.json({ message: 'Данные подопечного успешно обновлены', trainee });
});

// Маршрут для редактирования данных подопечного
app.put('/trainees/:id/edit', (req, res) => {
    const { id } = req.params; // Получаем ID подопечного из URL
    const { name, age, goals } = req.body; // Получаем данные из тела запроса

    // Находим подопечного по ID
    const trainee = trainees.find((t) => t.id === Number(id));
    if (!trainee) {
        return res.status(404).json({ message: 'Подопечный не найден' });
    }

    // Обновляем данные подопечного
    if (name) trainee.name = name;
    if (age) trainee.age = age;
    if (goals) trainee.goals = goals;

    return res.json({ message: 'Данные подопечного обновлены', trainee });
});

// Маршрут для удаления подопечного
app.delete('/trainees/:id', (req, res) => {
    const { id } = req.params; // Получаем ID подопечного из URL

    // Проверяем, существует ли подопечный
    const traineeIndex = trainees.findIndex((t) => t.id === Number(id));
    if (traineeIndex === -1) {
        return res.status(404).json({ message: 'Подопечный не найден' });
    }

    // Удаляем подопечного
    trainees.splice(traineeIndex, 1);
    return res.json({ message: 'Подопечный удален' });
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
