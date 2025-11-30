import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import Feedback from "./feedback";

const meta: Meta<typeof Feedback> = {
  title: "Components/Feedback",
  component: Feedback,
  tags: ["autodocs"],
  argTypes: {
    value: { control: "text" },
    label: { control: "text" },
    color: { control: "text" },
    textColor: { control: "text" },
    onChange: { action: "changed" },
    recommendLabel: { control: "text" },
    notSureLabel: { control: "text" },
    dontRecommendLabel: { control: "text" },
  },
  args: {
    value: "success",
    label: "بازخورد",
    color: "success",
    textColor: "text-success",
  },
};

export default meta;

type Story = StoryObj<typeof Feedback>;

/**
 * Default Feedback component with Persian labels
 */
export const Default: Story = {
  args: {
    value: "success",
    label: "بازخورد",
    color: "success",
    textColor: "text-success",
    recommendLabel: "کالا را پیشنهاد می کنم",
    notSureLabel: "مطمئن نیستم",
    dontRecommendLabel: "کالا را پیشنهاد نمی کنم",
  },
  render: (args) => {
    return (
      <div className="p-8 bg-gray-50 rounded-lg">
        <h3 className="mb-4 text-lg font-semibold text-right">آیا این محصول را پیشنهاد می دهید؟</h3>
        <Feedback {...args} onChange={() => {}} />
      </div>
    );
  },
};

/**
 * Feedback with custom English labels
 */
export const EnglishLabels: Story = {
  args: {
    value: "success",
    label: "Feedback",
    color: "success",
    textColor: "text-success",
    recommendLabel: "Recommend",
    notSureLabel: "Not Sure",
    dontRecommendLabel: "Not Recommended",
  },
  render: (args) => {
    return (
      <div className="p-8 bg-gray-50 rounded-lg">
        <h3 className="mb-4 text-lg font-semibold">Do you recommend this product?</h3>
        <Feedback {...args} onChange={() => {}} />
      </div>
    );
  },
};

/**
 * Feedback component showing all three states
 */
export const AllStates: Story = {
  render: () => {
    const [selectedFeedback, setSelectedFeedback] = useState("");

    return (
      <div className="p-8 bg-gray-50 rounded-lg space-y-8">
        <div>
          <h3 className="mb-4 text-lg font-semibold text-right">آیا این محصول را پیشنهاد می دهید؟</h3>
          <Feedback
            value={selectedFeedback}
            label="بازخورد"
            color="success"
            textColor="text-success"
            onChange={(e) => setSelectedFeedback(e.target.value)}
            recommendLabel="کالا را پیشنهاد می کنم"
            notSureLabel="مطمئن نیستم"
            dontRecommendLabel="کالا را پیشنهاد نمی کنم"
          />
        </div>

        {selectedFeedback && (
          <div className="p-4 bg-white rounded-lg border border-gray-200">
            <p className="text-sm">
              <span className="font-semibold">انتخاب شده:</span>
              <span className="ms-2">{selectedFeedback}</span>
            </p>
          </div>
        )}

        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
          <div className="p-4 bg-white rounded-lg">
            <div className="w-3 h-3 rounded-full bg-success mb-2"></div>
            <p className="text-xs text-gray-600">Success</p>
            <p className="text-sm font-semibold">#219653</p>
          </div>
          <div className="p-4 bg-white rounded-lg">
            <div className="w-3 h-3 rounded-full bg-warning mb-2"></div>
            <p className="text-xs text-gray-600">Warning</p>
            <p className="text-sm font-semibold">#F2994A</p>
          </div>
          <div className="p-4 bg-white rounded-lg">
            <div className="w-3 h-3 rounded-full bg-danger mb-2"></div>
            <p className="text-xs text-gray-600">Danger</p>
            <p className="text-sm font-semibold">#F23B51</p>
          </div>
        </div>
      </div>
    );
  },
};

/**
 * Feedback component in a product review card
 */
export const InProductCard: Story = {
  render: () => {
    const [feedback, setFeedback] = useState("");

    return (
      <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
        <h4 className="mb-2 text-lg font-semibold text-right">نظر خود را با ما به اشتراک بگذارید</h4>
        <p className="mb-6 text-sm text-gray-600 text-right">
          این محصول را چگونه ارزیابی می کنید؟
        </p>
        
        <Feedback
          value={feedback}
          label="بازخورد"
          color="success"
          textColor="text-success"
          onChange={(e) => setFeedback(e.target.value)}
          recommendLabel="کالا را پیشنهاد می کنم"
          notSureLabel="مطمئن نیستم"
          dontRecommendLabel="کالا را پیشنهاد نمی کنم"
        />

        {feedback && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-800 text-right">
              ✓ بازخورد شما ثبت شد
            </p>
          </div>
        )}
      </div>
    );
  },
};
