export interface Task {
    id: string;
    title: string;
    subtitle?: string;
    author?: string;
    assignee: string;
    timeEstimate?: string;
    description: string;
    status?: 'to-do' | 'in-progress' | 'done' | 'completed' | 'active';
  }
  