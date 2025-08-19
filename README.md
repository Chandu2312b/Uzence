Uzence Assessment – React Component Development

This repository contains the submission for the Uzence Frontend Assessment, focused on UI Component Development using React, TypeScript, TailwindCSS, and Storybook. The goal was to build two reusable, scalable, and accessible components – InputField and DataTable – within 2 days, and document them with Storybook.

🚀 Tech Stack

React · TypeScript · TailwindCSS · Storybook · Jest/RTL

📦 Components
1. InputField

A flexible, reusable input component with validation and multiple states.
Features: label, placeholder, helper/error text, states (disabled, invalid, loading), variants (filled, outlined, ghost), sizes (sm, md, lg), optional clear button & password toggle, optional light/dark theme.
Props:

interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  variant?: 'filled' | 'outlined' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

2. DataTable

A dynamic table with sorting, selection, and state handling.
Features: display tabular data, column sorting, row selection (single/multiple), loading & empty states.
Props:

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
}
interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
}

📂 Project Structure
uzence-assessment/
├── src/components/InputField
├── src/components/DataTable
├── src/stories
├── src/tests
├── .storybook
└── package.json

⚙️ Setup & Usage

Clone and install:

git clone https://github.com/your-username/uzence-assessment.git
cd uzence-assessment
npm install


Run dev server:

npm run dev


Run Storybook:

npm run storybook


Run tests:

npm test

🔹 Example Usage
// InputField
<InputField label="Username" placeholder="Enter username" variant="outlined" size="md" />

// DataTable
<DataTable
  data={[{ id: 1, name: "John" }, { id: 2, name: "Jane" }]}
  columns={[{ key: "1", title: "ID", dataIndex: "id", sortable: true }, { key: "2", title: "Name", dataIndex: "name" }]}
  selectable
/>

📖 Storybook Preview

👉 Live Storybook Link

✅ Requirements Covered

✔ TypeScript with proper typing · ✔ Responsive design · ✔ Accessibility (ARIA) · ✔ Clean styling · ✔ Unit tests · ✔ Storybook docs

📝 Approach

Components structured for scalability

TailwindCSS for consistent styling and variants

TypeScript props ensure safety and reusability

Storybook for interactive documentation

Tests for reliability
