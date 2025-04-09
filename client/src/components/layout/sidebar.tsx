import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";

interface SidebarLinkProps {
  icon: string;
  label: string;
  href: string;
  isActive?: boolean;
}

function SidebarLink({ icon, label, href, isActive }: SidebarLinkProps) {
  const [_, navigate] = useLocation();
  
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(href);
  };
  
  return (
    <div
      onClick={handleClick}
      className={cn(
        "flex items-center text-sm px-3 py-2 rounded-md cursor-pointer",
        isActive
          ? "bg-primary-700 text-white font-medium"
          : "text-slate-300 hover:bg-slate-800"
      )}
    >
      <i className="material-icons text-sm mr-3">{icon}</i>
      <span>{label}</span>
    </div>
  );
}

interface SidebarSectionProps {
  title: string;
  children: React.ReactNode;
}

function SidebarSection({ title, children }: SidebarSectionProps) {
  return (
    <div className="mb-6">
      <p className="text-xs font-semibold text-slate-400 uppercase mb-2 px-3">
        {title}
      </p>
      {children}
    </div>
  );
}

export default function Sidebar() {
  const [location] = useLocation();

  return (
    <aside className="hidden md:flex md:flex-col md:w-64 bg-slate-900 text-white shadow-lg">
      <div className="p-4 flex items-center justify-center border-b border-slate-700">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-md bg-primary-600 flex items-center justify-center">
            <i className="material-icons text-white text-lg">all_inclusive</i>
          </div>
          <h1 className="text-xl font-bold">AllInOne</h1>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto sidebar-scroll">
        <nav className="p-4 space-y-1">
          <SidebarSection title="Dashboard">
            <SidebarLink
              icon="dashboard"
              label="Overview"
              href="/"
              isActive={location === "/"}
            />
          </SidebarSection>

          <SidebarSection title="Campaigns">
            <SidebarLink
              icon="email"
              label="Email Campaigns"
              href="/campaigns"
              isActive={location === "/campaigns"}
            />
            <SidebarLink
              icon="schedule"
              label="Scheduled"
              href="/campaigns?filter=scheduled"
              isActive={location.startsWith("/campaigns?filter=scheduled")}
            />
            <SidebarLink
              icon="history"
              label="Campaign History"
              href="/campaigns?filter=history"
              isActive={location.startsWith("/campaigns?filter=history")}
            />
            <SidebarLink
              icon="auto_awesome"
              label="Automations"
              href="/automations"
              isActive={location === "/automations"}
            />
          </SidebarSection>

          <SidebarSection title="Content">
            <SidebarLink
              icon="design_services"
              label="Email Builder"
              href="/email-builder"
              isActive={location === "/email-builder"}
            />
            <SidebarLink
              icon="view_quilt"
              label="Templates"
              href="/templates"
              isActive={location === "/templates"}
            />
          </SidebarSection>

          <SidebarSection title="Audience">
            <SidebarLink
              icon="people"
              label="Contacts"
              href="/contacts"
              isActive={location === "/contacts"}
            />
            <SidebarLink
              icon="segment"
              label="Segments"
              href="/segments"
              isActive={location === "/segments"}
            />
            <SidebarLink
              icon="file_upload"
              label="Import"
              href="/import"
              isActive={location === "/import"}
            />
          </SidebarSection>

          <SidebarSection title="Analytics">
            <SidebarLink
              icon="analytics"
              label="Reports"
              href="/reports"
              isActive={location === "/reports"}
            />
            <SidebarLink
              icon="science"
              label="A/B Testing"
              href="/ab-testing"
              isActive={location === "/ab-testing"}
            />
          </SidebarSection>

          <SidebarSection title="Settings">
            <SidebarLink
              icon="settings"
              label="Account Settings"
              href="/settings"
              isActive={location === "/settings"}
            />
            <SidebarLink
              icon="integration_instructions"
              label="Integrations"
              href="/integrations"
              isActive={location === "/integrations"}
            />
          </SidebarSection>
        </nav>
      </div>
      <div className="p-4 border-t border-slate-700">
        <div className="flex items-center">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=48&h=48&q=80"
            alt="Profile"
            className="h-8 w-8 rounded-full"
          />
          <div className="ml-3">
            <p className="text-sm font-medium text-white">John Smith</p>
            <p className="text-xs text-slate-400">john@company.com</p>
          </div>
          <button className="ml-auto text-slate-400 hover:text-white">
            <i className="material-icons text-sm">logout</i>
          </button>
        </div>
      </div>
    </aside>
  );
}
