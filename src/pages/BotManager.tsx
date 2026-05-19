import { useState } from "react";
import {
  Bot, Sparkles, Send, MessageSquare, Droplets,
  Activity, Zap, LayoutTemplate, ShoppingBag, Settings, Plus, Copy, FileText,
  Edit, Trash2, Folder, ChevronDown,
} from "lucide-react";
import { Link } from "react-router-dom";



// Dummy data for bots
const bots = [
  { id: "1", name: "Volant Footwear", number: "+91 85903 66431", active: true }
];

// Dummy data for modules
const modules = [
  { id: "bot-reply", name: "Bot Reply", icon: Bot, iconColor: "text-emerald-500", bgColor: "bg-emerald-500/10" },
  { id: "ai-agent", name: "AI Agent", icon: Sparkles, iconColor: "text-emerald-500", bgColor: "bg-emerald-500/10" },
  { id: "broadcast", name: "Broadcast Campaign", icon: Send, iconColor: "text-emerald-500", bgColor: "bg-emerald-500/10" },
  { id: "chat-widget", name: "Chat Widget", icon: MessageSquare, iconColor: "text-emerald-500", bgColor: "bg-emerald-500/10" },
  { id: "sequence", name: "Sequence", icon: Droplets, iconColor: "text-emerald-500", bgColor: "bg-emerald-500/10" },
  { id: "input-flow", name: "Input Flow", icon: Activity, iconColor: "text-emerald-500", bgColor: "bg-emerald-500/10" },
  { id: "whatsapp-flows", name: "Whatsapp Flows", icon: Zap, iconColor: "text-emerald-500", bgColor: "bg-emerald-500/10" },
  { id: "message-template", name: "Message Template", icon: LayoutTemplate, iconColor: "text-emerald-500", bgColor: "bg-emerald-500/10" },
  { id: "wc-shopify", name: "WC/Shopify Automation", icon: ShoppingBag, iconColor: "text-emerald-500", bgColor: "bg-emerald-500/10" }
];

// Dummy data for bot replies
const botReplies = [
  { id: "1769842", ref: "VK06", updated: "18th Apr 26" },
  { id: "1769844", ref: "VK07", updated: "18th Apr 26" },
  { id: "1733321", ref: "VLA03", updated: "7th Apr 26" },
  { id: "1612504", ref: "PL27002", updated: "7th Apr 26" },
  { id: "1612409", ref: "PL26003", updated: "7th Apr 26" },
  { id: "1733307", ref: "VL21026", updated: "7th Apr 26" },
  { id: "1695388", ref: "VL19052", updated: "7th Apr 26" },
  { id: "1733282", ref: "VL17003", updated: "7th Apr 26" },
  { id: "1666205", ref: "VL17002", updated: "7th Apr 26" },
  { id: "1567447", ref: "VL16003", updated: "7th Apr 26" },
];

export default function BotManager() {
  const [activeBot, setActiveBot] = useState(bots[0].id);
  const [activeModule, setActiveModule] = useState(modules[0].id);

  return (
    <div className="space-y-6 pb-8 h-full flex flex-col">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">WhatsApp Bot Manager</h1>
        <p className="text-muted-foreground text-sm mt-1">Manage your WhatsApp bot</p>
      </div>

      {/* Main Layout Container */}
      <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0 overflow-hidden">

        {/* Left Column: Bots */}
        <div className="w-full lg:w-64 shrink-0 flex flex-col bg-white/40 dark:bg-black/40 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-white/10 flex items-center justify-between">
            <h2 className="font-semibold text-sm">Bots</h2>
            <div className="relative w-32">
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-3 pr-3 py-1.5 text-xs bg-white dark:bg-black border border-gray-200 dark:border-white/10 rounded-full focus:outline-none focus:ring-1 focus:ring-[#1C8D73]"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-2">
            {bots.map(bot => (
              <div
                key={bot.id}
                onClick={() => setActiveBot(bot.id)}
                className={`p-4 rounded-xl cursor-pointer transition-colors ${activeBot === bot.id
                    ? 'bg-[#1C8D73]/10 border border-[#1C8D73]/20'
                    : 'hover:bg-gray-100 dark:hover:bg-white/5 border border-transparent'
                  }`}
              >
                <h3 className="font-medium text-sm text-foreground">{bot.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">{bot.number}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Middle Column: Modules */}
        <div className="w-full lg:w-72 shrink-0 flex flex-col bg-white/40 dark:bg-black/40 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-white/10 flex items-center justify-between">
            <h2 className="font-semibold text-sm truncate">{bots.find(b => b.id === activeBot)?.name}</h2>
            <button className="text-[#1C8D73] hover:bg-[#1C8D73]/10 p-1.5 rounded-md transition-colors">
              <Settings className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-2 custom-scrollbar">
            {modules.map(mod => {
              const Icon = mod.icon;
              const isActive = activeModule === mod.id;
              return (
                <div
                  key={mod.id}
                  onClick={() => setActiveModule(mod.id)}
                  className={`flex items-center p-3 rounded-xl cursor-pointer transition-all ${isActive
                      ? 'bg-linear-to-r from-[#1C8D73]/10 to-transparent border border-[#1C8D73]/20 shadow-sm'
                      : 'bg-white dark:bg-black/20 hover:bg-gray-50 dark:hover:bg-white/5 border border-gray-100 dark:border-white/5'
                    }`}
                >
                  <div className={`p-2.5 rounded-lg ${isActive ? mod.bgColor : 'bg-gray-100 dark:bg-white/5'}`}>
                    <Icon className={`w-5 h-5 ${isActive ? mod.iconColor : 'text-gray-500 dark:text-gray-400'}`} />
                  </div>
                  <div className="ml-3">
                    <h3 className={`text-sm font-medium ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {mod.name}
                    </h3>
                    <div className="flex items-center mt-0.5">
                      <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#1C8D73]' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
                      <span className="text-[10px] text-[#1C8D73] ml-1.5 font-medium">Change Settings</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Content Area (Bot Reply Table) */}
        <div className="flex-1 flex flex-col bg-white/60 dark:bg-black/60 backdrop-blur-2xl rounded-2xl border border-gray-200 dark:border-white/10 shadow-lg overflow-hidden">

          {/* Content Header */}
          <div className="px-6 py-4 border-b border-gray-200 dark:border-white/10 flex flex-wrap items-center justify-between gap-4">
            <h2 className="font-semibold text-lg">Bot Reply Settings</h2>
            <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-black border border-gray-200 dark:border-white/10 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
              Options
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* Table Actions */}
          <div className="px-6 py-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <select className="appearance-none pl-4 pr-10 py-2 bg-white dark:bg-black border border-gray-200 dark:border-white/10 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#1C8D73]">
                  <option>All Folders</option>
                </select>
                <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search & Enter.."
                  className="pl-4 pr-4 py-2 w-64 bg-white dark:bg-black/50 border border-gray-200 dark:border-white/10 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#1C8D73] placeholder:text-gray-400"
                />
              </div>
            </div>

            <Link to="/chatbot/flow">
              <button className="flex hover:cursor-pointer items-center gap-2 px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg text-sm font-medium hover:opacity-90 transition-opacity shadow-md">
                <Plus className="w-4 h-4" />
                Create
              </button>
            </Link>

          </div>

          {/* Table */}
          <div className="flex-1 overflow-auto px-6">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-gray-50/50 dark:bg-white/5 sticky top-0 backdrop-blur-md z-10">
                <tr>
                  <th scope="col" className="px-4 py-4 font-semibold rounded-tl-lg">#</th>
                  <th scope="col" className="px-4 py-4 font-semibold">Unique ID</th>
                  <th scope="col" className="px-4 py-4 font-semibold">Reference Name</th>
                  <th scope="col" className="px-4 py-4 font-semibold">Updated at</th>
                  <th scope="col" className="px-4 py-4 font-semibold text-center rounded-tr-lg">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                {botReplies.map((reply, index) => (
                  <tr key={reply.id} className="hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors group">
                    <td className="px-4 py-4 whitespace-nowrap text-muted-foreground">{index + 1}</td>
                    <td className="px-4 py-4 whitespace-nowrap font-medium">{reply.id}</td>
                    <td className="px-4 py-4 whitespace-nowrap">{reply.ref}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-muted-foreground">{reply.updated}</td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center justify-center gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
                        <button className="p-1.5 bg-gray-100 dark:bg-white/10 hover:bg-[#1C8D73] hover:text-white dark:hover:bg-[#1C8D73] rounded-md transition-colors" title="Copy">
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                        <button className="p-1.5 bg-gray-100 dark:bg-white/10 hover:bg-[#1C8D73] hover:text-white dark:hover:bg-[#1C8D73] rounded-md transition-colors" title="Files">
                          <FileText className="w-3.5 h-3.5" />
                        </button>
                        <button className="p-1.5 bg-gray-100 dark:bg-white/10 hover:bg-blue-500 hover:text-white rounded-md transition-colors" title="Edit">
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button className="p-1.5 bg-gray-100 dark:bg-white/10 hover:bg-red-500 hover:text-white rounded-md transition-colors" title="Delete">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                        <button className="p-1.5 bg-gray-100 dark:bg-white/10 hover:bg-amber-500 hover:text-white rounded-md transition-colors" title="Folder">
                          <Folder className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-gray-200 dark:border-white/10 flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <select className="appearance-none pl-3 pr-8 py-1.5 bg-white dark:bg-black border border-gray-200 dark:border-white/10 rounded-md focus:outline-none focus:ring-1 focus:ring-[#1C8D73]">
                <option>10</option>
                <option>20</option>
                <option>50</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400 -ml-7 pointer-events-none" />
            </div>

            <div className="flex flex-col items-end gap-2">
              <span className="text-xs text-muted-foreground">1 - 10 of 820</span>
              <div className="flex items-center gap-1">
                <button className="px-3 py-1.5 border border-gray-200 dark:border-white/10 rounded-md text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors disabled:opacity-50">
                  Previous
                </button>
                <button className="w-8 h-8 flex items-center justify-center bg-blue-500 text-white rounded-md">1</button>
                <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-white/5 rounded-md transition-colors">2</button>
                <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-white/5 rounded-md transition-colors">3</button>
                <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-white/5 rounded-md transition-colors">4</button>
                <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-white/5 rounded-md transition-colors">5</button>
                <span className="px-1 text-gray-400">...</span>
                <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-white/5 rounded-md transition-colors">82</button>
                <button className="px-3 py-1.5 border border-gray-200 dark:border-white/10 rounded-md hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                  Next
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
