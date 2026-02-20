import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('jt_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [jobs, setJobs] = useState(() => {
    const saved = localStorage.getItem('jt_jobs');
    return saved ? JSON.parse(saved) : [
      {
        id: '1',
        company: 'Google',
        role: 'Software Engineer',
        location: 'Mountain View, CA',
        type: 'Full-time',
        date: '2024-02-15',
        status: 'Applied',
        jd: 'Building world-class software at scale.',
        skills: ['React', 'Node.js', 'Go'],
        progress: 30
      },
      {
        id: '2',
        company: 'Meta',
        role: 'Frontend Developer',
        location: 'Remote',
        type: 'Full-time',
        date: '2024-02-10',
        status: 'Interview',
        jd: 'Creating immersive experiences for billions.',
        skills: ['React', 'JavaScript', 'System Design'],
        progress: 65
      }
    ];
  });

  const [selectedJobId, setSelectedJobId] = useState(null);

  useEffect(() => {
    localStorage.setItem('jt_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('jt_jobs', JSON.stringify(jobs));
  }, [jobs]);

  const addJob = (job) => {
    setJobs([...jobs, { ...job, id: Date.now().toString(), progress: 0 }]);
  };

  const updateJob = (updatedJob) => {
    setJobs(jobs.map(j => j.id === updatedJob.id ? updatedJob : j));
  };

  const deleteJob = (id) => {
    setJobs(jobs.filter(j => j.id !== id));
  };

  const selectedJob = jobs.find(j => j.id === selectedJobId) || null;

  const value = {
    user,
    setUser,
    jobs,
    addJob,
    updateJob,
    deleteJob,
    selectedJob,
    setSelectedJobId
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
