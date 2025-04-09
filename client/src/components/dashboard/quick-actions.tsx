import { Link } from "wouter";

export default function QuickActions() {
  return (
    <div className="space-y-6">
      {/* Create Campaign Card */}
      <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-lg shadow-sm overflow-hidden text-white">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-2">Ready to create a new campaign?</h2>
          <p className="text-primary-100 mb-4">Start from scratch or use one of our templates to quickly get started.</p>
          <Link href="/campaigns/new">
            <a className="bg-white text-primary-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-50 inline-block">
              Create Campaign
            </a>
          </Link>
        </div>
      </div>
      
      {/* Quick Links */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">Quick Actions</h2>
        </div>
        <div className="p-6 space-y-4">
          <Link href="/contacts">
            <a className="flex items-center p-3 hover:bg-slate-50 rounded-md transition duration-150">
              <div className="flex-shrink-0 h-10 w-10 rounded bg-primary-100 flex items-center justify-center">
                <i className="material-icons text-primary-600">groups</i>
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-slate-900">Manage Contacts</h3>
                <p className="text-xs text-slate-500">Import, segment, or clean your lists</p>
              </div>
              <i className="material-icons text-slate-400 ml-auto">chevron_right</i>
            </a>
          </Link>
          
          <Link href="/templates">
            <a className="flex items-center p-3 hover:bg-slate-50 rounded-md transition duration-150">
              <div className="flex-shrink-0 h-10 w-10 rounded bg-purple-100 flex items-center justify-center">
                <i className="material-icons text-purple-600">view_quilt</i>
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-slate-900">Email Templates</h3>
                <p className="text-xs text-slate-500">Create or edit your email templates</p>
              </div>
              <i className="material-icons text-slate-400 ml-auto">chevron_right</i>
            </a>
          </Link>
          
          <Link href="/automations">
            <a className="flex items-center p-3 hover:bg-slate-50 rounded-md transition duration-150">
              <div className="flex-shrink-0 h-10 w-10 rounded bg-sky-100 flex items-center justify-center">
                <i className="material-icons text-sky-600">auto_awesome</i>
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-slate-900">Automations</h3>
                <p className="text-xs text-slate-500">Set up automated email sequences</p>
              </div>
              <i className="material-icons text-slate-400 ml-auto">chevron_right</i>
            </a>
          </Link>
          
          <Link href="/ab-testing">
            <a className="flex items-center p-3 hover:bg-slate-50 rounded-md transition duration-150">
              <div className="flex-shrink-0 h-10 w-10 rounded bg-amber-100 flex items-center justify-center">
                <i className="material-icons text-amber-600">science</i>
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-slate-900">A/B Testing</h3>
                <p className="text-xs text-slate-500">Optimize your campaigns with testing</p>
              </div>
              <i className="material-icons text-slate-400 ml-auto">chevron_right</i>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
