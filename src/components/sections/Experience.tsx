import React, { useState } from 'react';
import { JobCard } from '../ui/JobCard';
import { JOBS } from '../../data/constants';

export const Experience: React.FC = () => {
  const [openJobs, setOpenJobs] = useState<Record<string, boolean>>({
    'job-2': true
  });

  const toggleJob = (id: string) => {
    setOpenJobs(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="experiencia">
      <div className="wrap">
        <h2>Experiência</h2>
        <p className="sub">Clique em um cargo para ver os detalhes.</p>
        <div className="timeline">
          {JOBS.map(job => (
            <JobCard
              key={job.id}
              {...job}
              isOpen={!!openJobs[job.id]}
              onToggle={toggleJob}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
