import type { Meta, StoryObj } from "@storybook/react";
import Input from "./input";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    placeholder: { control: "text" },
    size: {
      control: { type: "select" },
      options: ["sm", "base", "lg"],
    },
    dir: {
      control: { type: "select" },
      options: ["ltr", "rtl"],
    },
    disabled: { control: "boolean" },
    type: { control: "text" },
    iconLeft: { control: "text" },
    iconRight: { control: "text" },
  },
  args: {
    placeholder: "متن را وارد کنید...",
    label: "برچسب",
    size: "base",
    dir: "rtl",
    disabled: false,
  },
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    label: "ایمیل",
    placeholder: "ایمیل خود را وارد کنید",
    type: "email",
    dir: "rtl",
  },
};

export const WithIconLeft: Story = {
  args: {
    label: "نام کاربری",
    placeholder: "نام کاربری را وارد کنید",
    iconLeft: "i-pentagon:",
  },
};

export const WithIconRight: Story = {
  args: {
    label: "رمز عبور",
    placeholder: "رمز عبور را وارد کنید",
    type: "password",
    iconRight: "i-security-card",
    dir: "rtl",
  },
};

export const WithBothIcons: Story = {
  args: {
    label: "مبلغ",
    placeholder: "مبلغ را وارد کنید",
    type: "number",
    iconLeft: "i-money",
    iconRight: "i-dollar-circle",
    dir: "rtl",
  },
};

export const Small: Story = {
  args: {
    label: "جستجو",
    placeholder: "جستجو کنید...",
    size: "sm",
    iconLeft: "i-receipt-search",
    dir: "rtl",
  },
};

export const Large: Story = {
  args: {
    label: "آدرس",
    placeholder: "آدرس کامل را وارد کنید",
    size: "lg",
    dir: "rtl",
  },
};

export const Disabled: Story = {
  args: {
    label: "فیلد غیرفعال",
    placeholder: "این فیلد غیرفعال است",
    disabled: true,
    dir: "rtl",
  },
};

export const LTR: Story = {
  args: {
    label: "Email",
    placeholder: "Enter your email",
    type: "email",
    dir: "ltr",
  },
};

export const LTRWithIcon: Story = {
  args: {
    label: "Username",
    placeholder: "Enter username",
    iconLeft: "i-group",
    dir: "ltr",
  },
};

export const CardPayment: Story = {
  args: {
    label: "شماره کارت",
    placeholder: "شماره کارت را وارد کنید",
    type: "text",
    iconLeft: "i-card",
    dir: "rtl",
  },
};

export const WalletAmount: Story = {
  args: {
    label: "مبلغ کیف پول",
    placeholder: "مبلغ را وارد کنید",
    type: "number",
    iconLeft: "i-pentagon",
    iconRight: "i-dollar-circle",
    dir: "rtl",
  },
};

