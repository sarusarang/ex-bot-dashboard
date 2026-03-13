import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, Inbox, Link2, Bot, Users, Radio, MessageSquare, Activity, Share2, Puzzle, Settings, ChevronDown, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";



// helper function
function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}




// navigation items
const navItems = [
    { name: "Overview", href: "/", icon: LayoutDashboard, color: "text-blue-500 dark:text-blue-400" },
    { name: "Shared Inbox", href: "/inbox", icon: Inbox, color: "text-purple-500 dark:text-purple-400" },
    {
        name: "Connect Account", icon: Link2, color: "text-orange-500 dark:text-orange-400",
        subItems: [
            { name: "Connect WhatsApp", href: "/connect/whatsapp", iconUrl: "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" },
            { name: "Connect Google", href: "/connect/google", iconUrl: "https://www.svgrepo.com/show/475656/google-color.svg" }
        ]
    },
    { name: "Chatbot Manager", href: "/chatbot", icon: Bot, color: "text-emerald-500 dark:text-emerald-400" },
    { name: "Subscriber Manager", href: "/subscribers", icon: Users, color: "text-pink-500 dark:text-pink-400" },
    { name: "Broadcasting", href: "/broadcast", icon: Radio, color: "text-indigo-500 dark:text-indigo-400" },
    { name: "Live Chat", href: "/chat", icon: MessageSquare, color: "text-teal-500 dark:text-teal-400" },
    { name: "WhatsApp Automation", href: "/automation", icon: Activity, color: "text-cyan-500 dark:text-cyan-400" },
    { name: "Social Posting", href: "/social", icon: Share2, color: "text-sky-500 dark:text-sky-400" },
    { name: "Integrations", href: "/integrations", icon: Puzzle, color: "text-amber-500 dark:text-amber-400" },
    { name: "Control Panel", href: "/settings", icon: Settings, color: "text-slate-500 dark:text-slate-400" },
    { name: "WhatsApp", href: "/whatsapp-main", iconUrl: "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" },
];




// types
interface SubItemType {
    name: string;
    href: string;
    icon?: React.ElementType;
    iconUrl?: string;
    color?: string;
}

interface NavItemType {
    name: string;
    href?: string;
    icon?: React.ElementType;
    iconUrl?: string;
    color?: string;
    subItems?: SubItemType[];
}





function NavItem({ item, isActive, path, isCollapsed, onExpandSidebar }: { item: NavItemType; isActive: boolean; path: string; isCollapsed: boolean; onExpandSidebar: () => void }) {



    // If the item has subItems, check if any subItem is currently active
    const isSubActive = item.subItems?.some((sub) => sub.href === path) || false;
    const [isOpen, setIsOpen] = useState(isSubActive);
    const Icon = item.icon;



    if (item.subItems) {


        return (


            <div className="space-y-1" title={isCollapsed ? item.name : undefined}>


                <button
                    onClick={() => {
                        if (isCollapsed) {
                            onExpandSidebar();
                            setIsOpen(true);
                        } else {
                            setIsOpen(!isOpen);
                        }
                    }}
                    className={cn(
                        "w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors group relative",
                        isActive || isSubActive
                            ? "bg-[#1C8D73]/10 text-[#1C8D73] dark:text-[#20d489]"
                            : "text-black dark:text-muted-foreground hover:bg-secondary hover:text-black dark:hover:text-foreground",
                        isCollapsed && "justify-center"
                    )}
                >

                    <div className={cn("flex items-center w-full", isCollapsed ? "justify-center" : "justify-start")}>

                        {item.iconUrl ? (
                            <img src={item.iconUrl} alt={item.name} className="w-5 h-5 shrink-0 object-contain" />
                        ) : Icon ? (
                            <Icon className={cn("w-5 h-5 shrink-0", isActive || isSubActive ? "text-[#1C8D73] dark:text-[#20d489]" : (item.color || "text-black dark:text-muted-foreground group-hover:text-black dark:group-hover:text-foreground"))} />
                        ) : null}

                        <motion.div
                            initial={false}
                            animate={{ width: isCollapsed ? 0 : "auto", opacity: isCollapsed ? 0 : 1 }}
                            className="overflow-hidden whitespace-nowrap flex items-center"
                        >
                            <span className="ml-3 block">{item.name}</span>
                        </motion.div>

                    </div>


                    <motion.div
                        initial={false}
                        animate={{
                            width: isCollapsed ? 0 : "auto",
                            opacity: isCollapsed ? 0 : 1,
                            rotate: isOpen && !isCollapsed ? 180 : 0
                        }}
                        className="overflow-hidden"
                    >

                        <ChevronDown className="w-4 h-4 opacity-50 shrink-0 ml-2" />

                    </motion.div>

                </button>



                <AnimatePresence initial={false}>


                    {isOpen && !isCollapsed && (


                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2, ease: "easeInOut" }}
                            className="overflow-hidden"
                        >


                            <div className="ml-8 mt-1 space-y-1 border-l border-[#1C8D73]/20 pl-2">


                                {item.subItems.map((sub) => {


                                    const isSubItemActive = path === sub.href;


                                    return (


                                        <Link
                                            key={sub.name}
                                            to={sub.href}
                                            className={cn(
                                                "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                                                isSubItemActive
                                                    ? "text-black dark:text-foreground bg-secondary/50"
                                                    : "text-black dark:text-muted-foreground hover:text-black dark:hover:text-foreground hover:bg-secondary"
                                            )}
                                        >

                                            {sub.iconUrl ? (
                                                <img src={sub.iconUrl} alt={sub.name} className="w-4 h-4 shrink-0 object-contain" />
                                            ) : sub.icon ? (
                                                <sub.icon className={cn("w-4 h-4 shrink-0", isSubItemActive ? "text-black dark:text-foreground" : (sub.color || "text-black dark:text-muted-foreground"))} />
                                            ) : null}

                                            <span className="whitespace-nowrap overflow-hidden">{sub.name}</span>

                                        </Link>

                                    );

                                })}

                            </div>

                        </motion.div>

                    )}

                </AnimatePresence>

            </div>

        );

    }



    return (

        <Link
            to={item.href || "#"}
            title={isCollapsed ? item.name : undefined}
            className={cn(
                "flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors group outline-none",
                isCollapsed ? "justify-center" : "",
                isActive
                    ? "bg-[#1C8D73]/10 text-[#1C8D73] dark:text-[#20d489]"
                    : "text-black dark:text-muted-foreground hover:bg-secondary hover:text-black dark:hover:text-foreground"
            )}
        >

            {item.iconUrl ? (
                <img src={item.iconUrl} alt={item.name} className="w-5 h-5 shrink-0 object-contain" />
            ) : Icon ? (
                <Icon className={cn("w-5 h-5 shrink-0", isActive ? "text-[#1C8D73] dark:text-[#20d489]" : (item.color || "text-black dark:text-muted-foreground group-hover:text-black dark:group-hover:text-foreground"))} />
            ) : null}


            <motion.div
                initial={false}
                animate={{ width: isCollapsed ? 0 : "auto", opacity: isCollapsed ? 0 : 1 }}
                className="overflow-hidden whitespace-nowrap flex items-center"
            >

                <span className="ml-3 block">{item.name}</span>

            </motion.div>

        </Link>

    );

}





export default function Sidebar({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (val: boolean) => void }) {


    const location = useLocation();


    // Persist sidebar collapsed state in localStorage
    const [isCollapsed, setIsCollapsed] = useState(() => {
        const stored = localStorage.getItem('exbot-sidebar-collapsed');
        return stored === 'true';
    });


    useEffect(() => {
        localStorage.setItem('exbot-sidebar-collapsed', String(isCollapsed));
    }, [isCollapsed]);



    return (


        <>

            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}


            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed top-0 left-0 z-50 h-screen lg:h-full bg-white/70 dark:bg-black/40 backdrop-blur-2xl border-r border-white/20 dark:border-white/10 flex flex-col transition-[width,transform] duration-300 ease-in-out lg:relative lg:flex shadow-[0_8px_30px_rgb(0,0,0,0.04)] shrink-0",
                    isOpen ? "translate-x-0" : "-translate-x-full ease-in-out",
                    "lg:translate-x-0",
                    isCollapsed ? "w-20" : "w-64"
                )}
            >


                <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-white/50 dark:via-white/20 to-transparent z-20 hidden lg:block"></div>


                {/* Logo & Top Toggle Section */}
                <div className="flex items-center justify-between h-20 border-b border-border px-4 relative shrink-0">


                    <Link to="/" className={cn("flex items-center h-full overflow-hidden", isCollapsed ? "w-full justify-center" : "flex-1")}>

                        <motion.div
                            initial={false}
                            animate={{ opacity: isCollapsed ? 0 : 1, width: isCollapsed ? 0 : "auto" }}
                            className="flex items-center justify-center overflow-hidden h-full w-full whitespace-nowrap py-5"
                        >
                            <img src="/dark_logo.png" alt="exbot logo" className="h-[34px] object-contain hidden dark:block" />
                            <img src="/logo-white.svg" alt="exbot logo" className="h-[34px] object-contain block dark:hidden" />

                        </motion.div>


                        {/* Compact Logo / Icon for Collapsed State */}
                        <motion.div
                            initial={false}
                            animate={{ opacity: isCollapsed ? 1 : 0, width: isCollapsed ? "auto" : 0 }}
                            className="flex items-center justify-center overflow-hidden"
                            style={{ display: isCollapsed ? "flex" : "none" }}
                        >
                            <div className="bg-[#1C8D73] p-1.5 rounded-xl block mt-1">
                                <Bot className="w-6 h-6 text-white" />
                            </div>
                        </motion.div>


                    </Link>


                    {/* Floating Toggle Button over the border */}
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="hidden lg:flex items-center justify-center absolute -right-5 top-1/2 -translate-y-1/2 bg-white dark:bg-black border border-gray-200 dark:border-white/10 rounded-lg shadow-sm p-2 z-50 text-black dark:text-muted-foreground hover:text-[#1C8D73] dark:hover:text-[#20d489] transition-colors cursor-pointer"
                        title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
                    >
                        {isCollapsed ? <PanelLeftOpen className="w-5 h-5" /> : <PanelLeftClose className="w-5 h-5" />}
                    </button>

                </div>



                {/* Independent Scrollable Nav */}
                <div className="flex-1 overflow-y-auto overflow-x-hidden py-6 px-4 no-scrollbar relative min-h-0 h-full">


                    <nav className="space-y-1 w-full relative">


                        {navItems.map((item) => {

                            const isActive = location.pathname === item.href;

                            return (

                                <NavItem
                                    key={item.name}
                                    item={item}
                                    isActive={isActive}
                                    path={location.pathname}
                                    isCollapsed={isCollapsed}
                                    onExpandSidebar={() => setIsCollapsed(false)}
                                />

                            );

                        })}

                    </nav>

                </div>

            </aside>

        </>

    );


}
