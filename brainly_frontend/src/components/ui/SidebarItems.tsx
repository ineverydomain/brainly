import type { ReactElement } from "react";

export function SidebarItem({
  text,
  icon,
}: {
  text: string;
  icon: ReactElement;
}) {
  return (
    <div className="flex pl-4 text-black-500 cursor-pointer hover:bg-gray-200 rounded-md max-w-40 transition-all">
      <div className="p-2  ">{icon}</div>
      <div className="p-2">{text}</div>
    </div>
  );
}
