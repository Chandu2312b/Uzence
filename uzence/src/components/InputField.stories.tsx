import type { Meta, StoryObj } from 'storybook/react';
import React from 'react';
import InputField, { InputFieldProps } from './InputField';

const meta: Meta<typeof InputField> = {
  title: 'Components/InputField',
  component: InputField,
  args: {
    label: 'First Name',
    placeholder: 'Enter your first name',
  } as Partial<InputFieldProps>,
};

export default meta;
type Story = StoryObj<typeof InputField>;

export const Text: Story = {
  args: {
    label: 'Text',
    placeholder: 'Type here',
  },
};

export const Email: Story = {
  args: {
    label: 'Email',
    type: 'email',
    placeholder: 'you@example.com',
    required: true,
  },
};

export const Password: Story = {
  args: {
    label: 'Password',
    type: 'password',
    required: true,
    minLength: 8,
  },
};


