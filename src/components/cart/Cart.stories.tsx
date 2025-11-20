import type { Meta, StoryObj } from "@storybook/react";
import Cart from "./cart";

const meta: Meta<typeof Cart> = {
  title: "Components/Cart",
  component: Cart,
  tags: ["autodocs"],
  argTypes: {
    data: {
      control: { type: "object" },
    },
  },
  args: {
    data: {
      imgUrl: "https://via.placeholder.com/200x200?text=Product",
      title: "نام محصول",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Cart>;

export const Default: Story = {
  args: {
    data: {
      imgUrl: "https://via.placeholder.com/200x200?text=Product",
      title: "محصول نمونه",
    },
  },
};

export const WithLongTitle: Story = {
  args: {
    data: {
      imgUrl: "https://via.placeholder.com/200x200?text=Long+Title",
      title: "محصول با نام بسیار طولانی برای تست overflow",
    },
  },
};

export const MultipleCards: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      <Cart
        data={{
          imgUrl: "https://via.placeholder.com/200x200?text=Product+1",
          title: "محصول اول",
        }}
      />
      <Cart
        data={{
          imgUrl: "https://via.placeholder.com/200x200?text=Product+2",
          title: "محصول دوم",
        }}
      />
      <Cart
        data={{
          imgUrl: "https://via.placeholder.com/200x200?text=Product+3",
          title: "محصول سوم",
        }}
      />
    </div>
  ),
};
