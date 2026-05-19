import { useCallback, useState } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  BackgroundVariant,
  MarkerType,
  type Connection,
  type Edge,
  type Node,
  ReactFlowProvider,
  useReactFlow,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import {
  MessageSquare, Image as ImageIcon, Video, FileText, List, MousePointerClick,
  Save, ArrowLeft, GitBranch, Trash2, Copy, X, MessageCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { TextNode, MediaNode, ButtonNode, ListNode, ConditionNode, StartNode, TriggerNode, type FlowNodeData } from '../components/FlowNodes';
import { AnimatedThemeToggler } from '@/components/ui/animated-theme-toggler';
import { WhatsAppPreview } from '../components/WhatsAppPreview';
import { CustomEdge } from '../components/CustomEdge';



// node types
const nodeTypes = {
  textMsg: TextNode,
  mediaMsg: MediaNode,
  buttonMsg: ButtonNode,
  listMsg: ListNode,
  condition: ConditionNode,
  start: StartNode,
  triggerMsg: TriggerNode,
};



// edge types
const edgeTypes = {
  custom: CustomEdge,
};



// initial nodes
const initialNodes: Node<FlowNodeData>[] = [
  { id: 'start_1', type: 'start', position: { x: 100, y: 250 }, data: { label: 'Start' } },
];



// sidebar button props
type SidebarButtonProps = {
  icon: React.ElementType;
  label: string;
  onClick: () => void;
  colorClass: string;
};



// sidebar button component
const SidebarButton = ({ icon: Icon, label, onClick, colorClass }: SidebarButtonProps) => (
  <button
    onClick={onClick}
    className="flex items-center gap-3 w-full p-2.5 bg-white hover:cursor-pointer dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg hover:border-[#1C8D73] dark:hover:border-[#1C8D73] transition-all group text-left shadow-sm hover:shadow-md"
  >
    <Icon className={`w-4 h-4 ${colorClass}`} />
    <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 group-hover:text-[#1C8D73] transition-colors">{label}</span>
  </button>
);



function FlowCanvas() {


  // navigation
  const navigate = useNavigate();
  const { screenToFlowPosition } = useReactFlow();


  // nodes states
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);


  // edges states
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);


  // meta payload states
  const [metaPayload, setMetaPayload] = useState<string | null>(null);


  // theme states
  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains('dark')
  );


  // whatsapp preview states
  const [showPreview, setShowPreview] = useState(true);



  // Context menus
  const [nodeMenu, setNodeMenu] = useState<{ id: string; top: number; left: number; } | null>(null);
  const [paneMenu, setPaneMenu] = useState<{ x: number; y: number; top: number; left: number; } | null>(null);



  // handle edge connection
  const onConnect = useCallback((params: Connection | Edge) => {
    setEdges((eds) => addEdge({
      ...params,
      type: 'custom',
      animated: true,
      style: { stroke: '#1C8D73', strokeWidth: 3 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#1C8D73' }
    } as any, eds));
  }, [setEdges]);



  // handle node context menu
  const onNodeContextMenu = useCallback(
    (event: any, node: Node) => {
      event.preventDefault();
      setNodeMenu({
        id: node.id,
        top: event.clientY,
        left: event.clientX,
      });
      setPaneMenu(null);
    },
    [setNodeMenu, setPaneMenu]
  );



  // handle pane context menu
  const onPaneContextMenu = useCallback(
    (event: any) => {
      event.preventDefault();
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      setPaneMenu({
        top: event.clientY,
        left: event.clientX,
        x: position.x,
        y: position.y,
      });
      setNodeMenu(null);
    },
    [screenToFlowPosition, setPaneMenu, setNodeMenu]
  );



  // handle close menus
  const closeMenus = useCallback(() => {
    setNodeMenu(null);
    setPaneMenu(null);
  }, []);



  // delete node
  const deleteNode = useCallback(() => {
    if (nodeMenu) {
      setNodes((nds) => nds.filter((node) => node.id !== nodeMenu.id));
      setEdges((eds) => eds.filter((edge) => edge.source !== nodeMenu.id && edge.target !== nodeMenu.id));
      setNodeMenu(null);
    }
  }, [nodeMenu, setNodes, setEdges]);



  // duplicate node
  const duplicateNode = useCallback(() => {
    if (nodeMenu) {
      const nodeToDuplicate = nodes.find((n) => n.id === nodeMenu.id);
      if (nodeToDuplicate) {
        const newNode: Node<FlowNodeData> = {
          ...nodeToDuplicate,
          id: `${nodeToDuplicate.type}_${new Date().getTime()}`,
          position: {
            x: nodeToDuplicate.position.x + 40,
            y: nodeToDuplicate.position.y + 40,
          },
          selected: false,
        };
        setNodes((nds) => nds.concat(newNode));
      }
      setNodeMenu(null);
    }
  }, [nodeMenu, nodes, setNodes]);



  // handle node data change
  const onNodeDataChange = useCallback((id: string, field: string, value: string) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === id
          ? { ...node, data: { ...node.data, [field]: value } }
          : node
      )
    );
  }, [setNodes]);



  // add node at specific position
  const addNodeAt = (type: string, x: number, y: number, mediaType?: string) => {
    const id = `${type}_${new Date().getTime()}`;
    const newNode: Node<FlowNodeData> = {
      id,
      type,
      position: { x, y },
      data: { onChange: onNodeDataChange, mediaType: mediaType as 'image' | 'video' | 'document' | undefined },
    };
    setNodes((nds) => nds.concat(newNode));
    closeMenus();
  };



  // add node
  const addNode = (type: string, mediaType?: string) => {
    // Default fallback if added from sidebar
    addNodeAt(type, Math.random() * 200 + 300, Math.random() * 200 + 100, mediaType);
  };



  // generate meta payload
  const generateMetaPayload = () => {
    const payload = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: "{{RECIPIENT_PHONE_NUMBER}}",
      type: "template",
      template: {
        name: "flow_template",
        language: { code: "en_US" },
        components: nodes.filter(n => n.type !== 'start').map(node => {
          if (node.type === 'textMsg') {
            return { type: "body", parameters: [{ type: "text", text: node.data.text || "" }] };
          }
          if (node.type === 'mediaMsg') {
            return {
              type: "header",
              parameters: [{ type: node.data.mediaType, [node.data.mediaType as string]: { link: node.data.url || "" } }]
            };
          }
          if (node.type === 'buttonMsg') {
            return {
              type: "button", sub_type: "quick_reply", index: "0",
              parameters: [{ type: "payload", payload: node.data.btn1 || "btn1" }]
            };
          }
          if (node.type === 'listMsg') {
            return {
              type: "interactive",
              interactive: {
                type: "list", body: { text: node.data.text || "" },
                action: {
                  button: node.data.buttonText || "Options",
                  sections: [{ title: "Menu", rows: [{ id: "item1", title: node.data.item1 || "Item 1" }, { id: "item2", title: node.data.item2 || "Item 2" }] }]
                }
              }
            };
          }
          if (node.type === 'condition') {
            return { type: "condition", variable: node.data.variable || "unknown" };
          }
          return null;
        }).filter(Boolean)
      }
    };
    setMetaPayload(JSON.stringify(payload, null, 2));
  };



  return (


    <div className="flex flex-col h-screen bg-gray-50 dark:bg-[#0a0a0b] overflow-hidden font-sans">


      {/* Sleek Header */}
      <div className="shrink-0 px-5 py-3 bg-white dark:bg-black border-b border-gray-200 dark:border-[#1C8D73]/30 flex items-center justify-between z-10 shadow-sm dark:shadow-[0_4px_20px_rgba(28,141,115,0.1)] relative">

        <div className="flex items-center gap-3">

          <button onClick={() => navigate('/chatbot')} className="p-1.5 hover:bg-gray-100 dark:hover:bg-[#111] rounded-md transition-colors text-gray-500 dark:text-gray-400">
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div>
            <h1 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white leading-tight">Flow Builder</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">Design your WhatsApp conversation</p>
          </div>

        </div>

        <div className="flex items-center gap-4">

          <AnimatedThemeToggler onThemeChange={setIsDark} />

          <button onClick={generateMetaPayload} className="flex items-center gap-2 px-4 py-2 bg-[#1C8D73] text-white rounded-md text-sm font-semibold hover:bg-[#156e5a] transition-colors shadow-sm">
            <Save className="w-4 h-4" />
            Export Payload
          </button>

        </div>

      </div>


      {/* Main Content */}
      <div className="flex-1 flex min-h-0 relative">

        <WhatsAppPreview
          nodes={nodes}
          edges={edges}
          isDark={isDark}
          isVisible={showPreview}
          onToggle={() => setShowPreview((v) => !v)}
        />

        {/* Compact Sidebar */}
        <div className="w-56 shrink-0 bg-gray-50/50 dark:bg-black border-r border-gray-200 dark:border-[#1C8D73]/30 p-3 flex flex-col gap-4 overflow-y-auto z-10 dark:shadow-[4px_0_20px_rgba(28,141,115,0.1)] relative">


          <div>
            <h3 className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2 px-1">Trigger</h3>
            <div className="space-y-2">
              <SidebarButton icon={MessageCircle} label="Trigger Message" colorClass="text-amber-500" onClick={() => addNode('triggerMsg')} />
            </div>
          </div>


          <div>
            <h3 className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2 px-1">Bot Replies</h3>
            <div className="space-y-2">
              <SidebarButton icon={MessageSquare} label="Text" colorClass="text-blue-500" onClick={() => addNode('textMsg')} />
              <SidebarButton icon={ImageIcon} label="Image" colorClass="text-emerald-500" onClick={() => addNode('mediaMsg', 'image')} />
              <SidebarButton icon={Video} label="Video" colorClass="text-purple-500" onClick={() => addNode('mediaMsg', 'video')} />
              <SidebarButton icon={FileText} label="Document" colorClass="text-amber-500" onClick={() => addNode('mediaMsg', 'document')} />
            </div>
          </div>


          <div>
            <h3 className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2 px-1">Interactive</h3>
            <div className="space-y-2">
              <SidebarButton icon={MousePointerClick} label="Buttons" colorClass="text-orange-500" onClick={() => addNode('buttonMsg')} />
              <SidebarButton icon={List} label="List Message" colorClass="text-pink-500" onClick={() => addNode('listMsg')} />
            </div>
          </div>


          <div>
            <h3 className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2 px-1">Logic</h3>
            <div className="space-y-2">
              <SidebarButton icon={GitBranch} label="Condition" colorClass="text-indigo-500" onClick={() => addNode('condition')} />
            </div>
          </div>


        </div>



        {/* Canvas */}
        <div className="flex-1 h-full bg-[#f8f9fa] dark:bg-[#0a0a0b]">


          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeContextMenu={onNodeContextMenu}
            onPaneContextMenu={onPaneContextMenu}
            onPaneClick={closeMenus}
            onNodeClick={closeMenus}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            colorMode={isDark ? 'dark' : 'light'}
            fitView
            proOptions={{ hideAttribution: true }}
          >


            <Background variant={BackgroundVariant.Dots} gap={16} size={1} color="#1C8D73" bgColor={isDark ? '#000000' : '#FFFFFF'} />


            <Controls className="bg-white dark:bg-black border border-gray-200 dark:border-[#1a1a1a] rounded-lg overflow-hidden shadow-sm flex flex-col [&_button]:bg-white dark:[&_button]:bg-black [&_button]:text-gray-800 dark:[&_button]:text-gray-200 [&_button]:border-b [&_button]:border-gray-100 dark:[&_button]:border-[#1a1a1a] [&_button:last-child]:border-none [&_svg]:fill-current [&_path]:fill-current hover:[&_button]:bg-gray-50 dark:hover:[&_button]:bg-[#111]" />


            <MiniMap
              className="bg-white/80 dark:bg-black/80 backdrop-blur-md border border-gray-200 dark:border-[#1a1a1a] rounded-lg shadow-sm"
              maskColor="rgba(0,0,0,0.2)"
              nodeColor="#1C8D73"
            />

          </ReactFlow>


        </div>




        {/* Node Context Menu */}
        {nodeMenu && (

          <div
            className="fixed z-50 bg-white dark:bg-black border border-gray-200 dark:border-[#1a1a1a] rounded-lg shadow-xl overflow-hidden py-1 w-40"
            style={{ top: nodeMenu.top, left: nodeMenu.left }}
            onClick={(e) => e.stopPropagation()}
          >

            <button onClick={duplicateNode} className="w-full px-3 py-2 text-left text-xs hover:bg-gray-50 dark:hover:bg-[#111111] text-gray-700 dark:text-gray-200 flex items-center gap-2">
              <Copy className="w-3.5 h-3.5 text-gray-400" /> Duplicate
            </button>

            <div className="h-px bg-gray-100 dark:bg-[#1a1a1a] my-1" />

            <button onClick={deleteNode} className="w-full px-3 py-2 text-left text-xs hover:bg-red-50 dark:hover:bg-red-500/10 text-red-600 dark:text-red-400 flex items-center gap-2">
              <Trash2 className="w-3.5 h-3.5" /> Delete
            </button>

          </div>

        )}



        {/* Pane Context Menu (Add Node) */}
        {paneMenu && (

          <div
            className="fixed z-50 bg-white dark:bg-black border border-gray-200 dark:border-[#1a1a1a] rounded-lg shadow-2xl overflow-hidden py-2 w-48"
            style={{ top: paneMenu.top, left: paneMenu.left }}
            onClick={(e) => e.stopPropagation()}
          >

            <div className="px-3 py-1 mb-1 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Add Node Here</div>


            <button onClick={() => addNodeAt('triggerMsg', paneMenu.x, paneMenu.y)} className="w-full px-3 py-2 text-left text-xs hover:bg-gray-50 dark:hover:bg-[#111111] text-gray-700 dark:text-gray-200 flex items-center gap-2">
              <MessageCircle className="w-3.5 h-3.5 text-amber-500" /> Trigger Message
            </button>

            <div className="h-px bg-gray-100 dark:bg-gray-800 my-1" />

            <button onClick={() => addNodeAt('textMsg', paneMenu.x, paneMenu.y)} className="w-full px-3 py-2 text-left text-xs hover:bg-gray-50 dark:hover:bg-[#111111] text-gray-700 dark:text-gray-200 flex items-center gap-2">
              <MessageSquare className="w-3.5 h-3.5 text-blue-500" /> Text Message
            </button>

            <button onClick={() => addNodeAt('mediaMsg', paneMenu.x, paneMenu.y, 'image')} className="w-full px-3 py-2 text-left text-xs hover:bg-gray-50 dark:hover:bg-[#111111] text-gray-700 dark:text-gray-200 flex items-center gap-2">
              <ImageIcon className="w-3.5 h-3.5 text-emerald-500" /> Image
            </button>

            <button onClick={() => addNodeAt('mediaMsg', paneMenu.x, paneMenu.y, 'video')} className="w-full px-3 py-2 text-left text-xs hover:bg-gray-50 dark:hover:bg-[#111111] text-gray-700 dark:text-gray-200 flex items-center gap-2">
              <Video className="w-3.5 h-3.5 text-purple-500" /> Video
            </button>

            <button onClick={() => addNodeAt('mediaMsg', paneMenu.x, paneMenu.y, 'document')} className="w-full px-3 py-2 text-left text-xs hover:bg-gray-50 dark:hover:bg-[#111111] text-gray-700 dark:text-gray-200 flex items-center gap-2">
              <FileText className="w-3.5 h-3.5 text-amber-500" /> Document
            </button>

            <button onClick={() => addNodeAt('buttonMsg', paneMenu.x, paneMenu.y)} className="w-full px-3 py-2 text-left text-xs hover:bg-gray-50 dark:hover:bg-[#111111] text-gray-700 dark:text-gray-200 flex items-center gap-2">
              <MousePointerClick className="w-3.5 h-3.5 text-orange-500" /> Buttons
            </button>

            <button onClick={() => addNodeAt('listMsg', paneMenu.x, paneMenu.y)} className="w-full px-3 py-2 text-left text-xs hover:bg-gray-50 dark:hover:bg-[#111111] text-gray-700 dark:text-gray-200 flex items-center gap-2">
              <List className="w-3.5 h-3.5 text-pink-500" /> List
            </button>

            <div className="h-px bg-gray-100 dark:bg-gray-800 my-1" />

            <button onClick={() => addNodeAt('condition', paneMenu.x, paneMenu.y)} className="w-full px-3 py-2 text-left text-xs hover:bg-gray-50 dark:hover:bg-[#111111] text-gray-700 dark:text-gray-200 flex items-center gap-2">
              <GitBranch className="w-3.5 h-3.5 text-indigo-500" /> Condition
            </button>

          </div>

        )}



        {/* Output Panel Overlay */}
        {metaPayload && (

          <div className="absolute right-6 top-6 w-[400px] max-h-[80%] bg-white dark:bg-black rounded-xl border border-gray-200 dark:border-[#1a1a1a] shadow-2xl flex flex-col z-50">

            <div className="p-3 border-b border-gray-200 dark:border-[#1a1a1a] flex justify-between items-center">

              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Meta API Payload</h3>

              <button onClick={() => setMetaPayload(null)} className="p-1 hover:bg-gray-100 dark:hover:bg-[#111] rounded-md text-gray-500">
                <X className="w-4 h-4" />
              </button>

            </div>

            <div className="p-4 overflow-auto flex-1">
              <pre className="text-[11px] font-mono text-[#1C8D73] bg-gray-50 dark:bg-[#0a0a0b] p-4 rounded-lg border border-gray-100 dark:border-[#1a1a1a]">
                {metaPayload}
              </pre>
            </div>

          </div>

        )}

      </div>

    </div>

  );

}





export default function FlowBuilder() {

  return (

    <ReactFlowProvider>

      <FlowCanvas />

    </ReactFlowProvider>

  );

}
