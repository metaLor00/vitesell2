import type { Meta, StoryObj } from '@storybook/react';
import AuthCard from './auth-card';
import Input from '../input/input';

const meta: Meta<typeof AuthCard> = {
  title: 'Components/AuthCard',
  component: AuthCard,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    buttonText: { control: 'text' },
    subtitle: { control: 'text' },
    onClick: { action: 'clicked' },
  },
  args: {
    title: 'ورود',
    description: 'با شماره تلفن خود وارد شوید',
    buttonText: 'ورود',
    subtitle: 'با ثبت نام شما قوانین را می‌پذیرید',
  },
};

export default meta;

type Story = StoryObj<typeof AuthCard>;

export const Default: Story = {
  args: {},
  render: (args) => (
    <AuthCard {...args}>
      <Input placeholder="۰۹۱۲۳۴۵۶۷۸۹" dir="ltr" variant="rounded" />
    </AuthCard>
  ),
};

export const WithDescription: Story = {
  args: {
    description: 'کد تایید برای شما ارسال خواهد شد',
  },
  render: (args) => (
    <AuthCard {...args}>
      <Input placeholder="شماره موبایل" dir="ltr" variant="rounded" />
    </AuthCard>
  ),
};

export const Minimal: Story = {
  args: {
    title: undefined,
    description: undefined,
    subtitle: undefined,
  },
  render: (args) => (
    <AuthCard {...args}>
      <Input placeholder="ایمیل" dir="ltr" variant="rounded" />
    </AuthCard>
  ),
};
