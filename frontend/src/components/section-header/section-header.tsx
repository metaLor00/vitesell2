import { cn } from "../../libs/utils";
const defaultChildren = <i className="i-pen text-gray"></i>;
const SectionHeader = ({ title, icon, iconClassName = "text-primary text-2xl", children=defaultChildren }: { title: string; icon: string; iconClassName?: string; children?: React.ReactNode; }) => {
    return (
        <header className="flex grow px-6 py-4  items-center justify-between gap-2 md:gap-4">
            <div className="flex items-center  gap-1">
                <div className="bg-gray-light shrink-0 rounded-full w-10 h-10 flex items-center justify-center">
                    <i className={cn(icon, iconClassName)}></i>
                </div>
                <h2 className="text-sm md:text-lg  shrink-0 text-center  font-semibold">{title}</h2>
            </div>

            <div className="grow rounded-full border border-secondary  bg-secondary"></div>
            <div>{children}</div>
        </header>
    );
};

export default SectionHeader;