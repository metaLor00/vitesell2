import { cn } from "../../libs/utils";
interface FeedbackProps {
  onChange: (e: any) => void;
  recommendLabel?: string;
  notSureLabel?: string;
  dontRecommendLabel?: string;
  feedback?: string;
}
const Feedback = (
{  feedback,
  onChange,
  recommendLabel = 'کالا را پیشنهاد می کنم',
  notSureLabel = 'مطمئن نیستم',
  dontRecommendLabel = 'کالا را پیشنهاد نمی کنم'}:FeedbackProps) => {

  

  // Color mapping using custom theme colors from index.css
  const colorMap: Record<string, { bg: string; border: string; text: string }> = {
    success: { bg: 'bg-success', border: 'border-success', text: 'text-success' },
    warning: { bg: 'bg-warning', border: 'border-warning', text: 'text-warning' },
    danger: { bg: 'bg-danger', border: 'border-danger', text: 'text-danger' },
  };

    const options: Array<{ value:  string; label: string; color: string; }> = [
    { value: 'success', label: dontRecommendLabel, color: 'success'},
    { value: 'warning', label: notSureLabel, color: 'warning'},
    { value: 'danger', label: recommendLabel, color: 'danger'},
  ]

  return (
    <div className="flex gap-6 items-center">
        {options.map((option) => (
          <label key={option.value} className={cn(feedback === option.value && colorMap[option.color].text, "relative flex items-center gap-1")}>
          <input className={cn(feedback=== option.value  && colorMap[option.color].border,"appearance-none w-4 h-4 border-2 rounded-full cursor-pointer transition-colors")}
            type="radio" name="feedback" value={option.value} checked={feedback === option.value} 
          onChange={(e)=>onChange(e.target.value)} />
          {feedback===option.value &&  <div className={cn("absolute right-1 w-2 h-2 rounded-full pointer-events-none", colorMap[option.color].bg)}></div>}
          <span className={cn(feedback === option.value && colorMap[option.color].text)}>{option.label}</span>
          </label>
        ))}
    </div>
  );
};

export default Feedback;