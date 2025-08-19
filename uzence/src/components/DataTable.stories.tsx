import type { Meta, StoryObj } from 'storybook/react';
import React from 'react';
import DataTable, { Column } from './DataTable';

const meta: Meta<typeof DataTable> = {
  title: 'Components/DataTable',
  component: DataTable,
};

export default meta;
type Story = StoryObj<typeof DataTable>;

interface UserRow {
  id: number;
  name: string;
  email: string;
  status: string;
}

const data: UserRow[] = [
  { id: 1, name: 'John Smith', email: 'john@example.com', status: 'Active' },
  { id: 2, name: 'Sarah Johnson', email: 'sarah@example.com', status: 'Inactive' },
];

const columns: Column[] = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'email', header: 'Email', sortable: true },
  { key: 'status', header: 'Status', sortable: true },
];

export const Basic: Story = {
  args: {
    data,
    columns,
    pageSize: 5,
    searchable: true,
    filterable: true,
    exportable: false,
  },
};


