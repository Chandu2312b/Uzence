import type { Meta, StoryObj } from 'storybook/react';
import React from 'react';
import ComponentDemo from './ComponentDemo';

const meta: Meta<typeof ComponentDemo> = {
  title: 'Pages/ComponentDemo',
  component: ComponentDemo,
};

export default meta;
type Story = StoryObj<typeof ComponentDemo>;

export const Demo: Story = {
  args: {},
};


