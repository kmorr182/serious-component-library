import type { Meta, StoryObj } from '@storybook/react-vite'
import { Select } from './Select'

const meta = {
  title: 'Components/Select',
  component: Select,
  args: {
    label: 'Country',
    placeholder: 'Choose…',
    children: (
      <>
        <option value="us">United States</option>
        <option value="ca">Canada</option>
        <option value="mx">Mexico</option>
        <option value="uk">United Kingdom</option>
      </>
    ),
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithHelperText: Story = {
  args: { helperText: 'Used to calculate shipping and tax.' },
}

export const WithError: Story = {
  args: { errorText: 'Please choose a country.' },
}

export const Preselected: Story = {
  args: { defaultValue: 'ca' },
}

export const Required: Story = {
  args: { required: true },
}

export const Disabled: Story = {
  args: { disabled: true, defaultValue: 'us' },
}

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Select {...args} size="sm" label="Small" />
      <Select {...args} size="md" label="Medium" />
      <Select {...args} size="lg" label="Large" />
    </div>
  ),
}

export const OptionGroups: Story = {
  args: {
    label: 'Time zone',
    placeholder: 'Choose a time zone…',
    children: (
      <>
        <optgroup label="Americas">
          <option value="est">Eastern (ET)</option>
          <option value="cst">Central (CT)</option>
          <option value="pst">Pacific (PT)</option>
        </optgroup>
        <optgroup label="Europe">
          <option value="gmt">London (GMT)</option>
          <option value="cet">Central European (CET)</option>
        </optgroup>
      </>
    ),
  },
}
