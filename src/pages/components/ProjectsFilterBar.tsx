import React from 'react';

interface ProjectsFilterBarProps {
  filters: string[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  visibleCount: number;
  totalCount: number;
}

export const ProjectsFilterBar: React.FC<ProjectsFilterBarProps> = ({
  filters,
  activeFilter,
  onFilterChange,
  visibleCount,
  totalCount
}) => {
  return (
    <div className="pp-bar">
      <div className="pp-filters" role="group" aria-label="Filtrar projetos por tecnologia">
        {filters.map((f) => (
          <button
            key={f}
            className="f"
            type="button"
            aria-pressed={activeFilter === f}
            onClick={() => onFilterChange(f)}
          >
            {f}
          </button>
        ))}
      </div>
      <span className="pp-count" aria-live="polite">
        {visibleCount} em destaque · {totalCount} no total
      </span>
    </div>
  );
};
