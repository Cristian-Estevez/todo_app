import { useState } from 'react';

import { getTasks } from '../services/taskServices';

export function useTasks() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = ({ folderId }) => {
    getTasks({ folderId: folderId }).then((tasks) => {
      setTasks(tasks);
    });
  };

  return { fetchTasks, tasks };
}
