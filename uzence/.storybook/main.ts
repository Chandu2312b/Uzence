import type { StorybookConfig } from 'storybook';

const config: StorybookConfig = {
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)'
  ],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions'
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {}
  },
  docs: {
    autodocs: 'tag'
  },
  viteFinal: async (config) => {
    config.optimizeDeps = config.optimizeDeps || {};
    const existing = config.optimizeDeps.exclude || [];
    config.optimizeDeps.exclude = Array.from(new Set([...existing, 'lucide-react']));
    return config;
  }
};

export default config;


