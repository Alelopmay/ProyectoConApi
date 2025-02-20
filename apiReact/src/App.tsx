import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Welcome from './Viwe/Welcome/Welcome';
import Home from './Viwe/Home/Home';
import CheckIn from './Viwe/CheckIn/CheckIn';
import AdminInstitutes from './Viwe/Administer_institutes/Administer_intitutes';
import AdminTeacher from './Viwe/Administer_teacher/administer_teacher';
import AdministerSchedule from './Viwe/Administer_shedules/Administer_shedules';
import AdministerWork from './Viwe/Administer_works/Administer_works';
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />  
        <Route path="/home" element={<Home />} />  
        <Route path="/checking" element={<CheckIn />} />  
        <Route path="/admin/institutes" element={<AdminInstitutes />} />
        <Route path="/admin/teachers" element={<AdminTeacher />} />
        <Route path="/admin/schedules" element={<AdministerSchedule />} />
        <Route path="/admin/works" element={<AdministerWork />} />
      </Routes>
    </Router>
  );
};

export default App;
