import { LogoIcon } from "../../icons/LogoIcon";
import { TwitterIcon } from "../../icons/TwitterIcon";
import { YouTubeIcon } from "../../icons/YouTubeIcon";
import { SidebarItem } from "./SidebarItems";

export function Sidebar() {
  return (
    <div className="h-screen bg-white border-r w-50 absolute left-0 top-0 pt-5">
      <div className="flex text-2xl  items-center text-blue-600 ">
        <SidebarItem text="Brainly" icon={<LogoIcon />} />
      </div>
      <div className="pt-4 pl-4 text-gray-500">
        <SidebarItem text="Twitter" icon={<TwitterIcon />} />
        <SidebarItem text="Youtube" icon={<YouTubeIcon />} />
      </div>
    </div>
  );
}
