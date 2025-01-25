import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditTraineePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({});

    useEffect(() => {
        // Fetch trainee data to prefill the form
        const fetchTrainee = async () => {
            try {
                const response = await fetch(`http://localhost:5000/trainees/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch trainee data');
                }
                const data = await response.json();
                setFormData(data);
            } catch (error) {
                console.error(error);
                alert('Error loading trainee data');
            }
        };

        fetchTrainee();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/trainees/${id}/edit`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to update trainee data');
            }

            alert('Trainee updated successfully!');
            navigate(`/trainees/${id}`);
        } catch (error) {
            console.error(error);
            alert('Error updating trainee');
        }
    };

    return (
        <div className="p-4">
            <header className="mb-4">
                <button onClick={() => navigate('/')} className="text-blue-500">&larr; Back to Home</button>
            </header>
            <h1 className="text-xl font-bold mb-4">Edit Trainee</h1>
            <form onSubmit={handleSubmit} className="grid gap-4">
                {/* Example fields */}
                <div>
                    <label htmlFor="name" className="block font-semibold">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name || ''}
                        onChange={handleInputChange}
                        className="border p-2 rounded w-full"
                    />
                </div>
                <div>
                    <label htmlFor="birthdate" className="block font-semibold">Date of Birth:</label>
                    <input
                        type="date"
                        id="birthdate"
                        name="birthdate"
                        value={formData.birthdate || ''}
                        onChange={handleInputChange}
                        className="border p-2 rounded w-full"
                    />
                </div>
                <div>
                    <label htmlFor="phone" className="block font-semibold">Contact Phone:</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone || ''}
                        onChange={handleInputChange}
                        className="border p-2 rounded w-full"
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block font-semibold">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email || ''}
                        onChange={handleInputChange}
                        className="border p-2 rounded w-full"
                    />
                </div>
                <div>
                    <label htmlFor="goal" className="block font-semibold">Goal:</label>
                    <textarea
                        id="goal"
                        name="goal"
                        value={formData.goal || ''}
                        onChange={handleInputChange}
                        className="border p-2 rounded w-full"
                    ></textarea>
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default EditTraineePage;
