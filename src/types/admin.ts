
export interface Client {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  industry?: string;
  status: string;
  logo_url?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
  created_by: string;
  assigned_admin?: string;
}

export interface ClientNote {
  id: string;
  client_id: string;
  title: string;
  content?: string;
  created_at: string;
  updated_at: string;
  created_by: string;
}

export interface ClientPage {
  id: string;
  client_id: string;
  parent_id?: string;
  title: string;
  content: Record<string, any>;
  icon?: string;
  page_type: 'document' | 'database' | 'kanban' | 'calendar' | 'timeline';
  created_at: string;
  updated_at: string;
  created_by: string;
  last_edited_by?: string;
}

export type ClientSort = 'name' | 'created_at' | 'updated_at' | 'status';
export type SortDirection = 'asc' | 'desc';

export interface ClientFilter {
  search?: string;
  status?: string[];
  industry?: string[];
}
