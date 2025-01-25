import React from 'react';
import { Routes, Route } from 'react-router-dom';

import TrainerDashboard from './pages/TrainerDashboard';
import TraineeDetails from './pages/TraineeDetails';
import TraineeForm from './pages/TraineeForm';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<TrainerDashboard />} />
        <Route path="/trainee/:id" element={<TraineeDetails />} />
        <Route path="/trainee-form" element={<TraineeForm />} />
      </Routes>
    </div>
  );
};

export default App;
