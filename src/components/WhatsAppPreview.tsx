import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Smartphone, MessageSquare, Image as ImageIcon, Video,
  FileText, List, GitBranch, Play, Wifi, Battery, Signal,
  ChevronLeft, Phone, Video as VideoIcon, Bot,
} from 'lucide-react';
import type { Node, Edge } from '@xyflow/react';
import type { FlowNodeData } from './FlowNodes';

interface WhatsAppPreviewProps {
  nodes: Node<FlowNodeData>[];
  edges: Edge[];
  isDark: boolean;
  isVisible: boolean;
  onToggle: () => void;
}

const BOT_TYPES = ['textMsg', 'mediaMsg', 'buttonMsg', 'listMsg', 'condition'];

/* ── Graph traversal: follow edges from start node ── */
function buildOrderedNodes(nodes: Node<FlowNodeData>[], edges: Edge[]): Node<FlowNodeData>[] {
  const nodeMap = new Map(nodes.map((n) => [n.id, n]));
  const adjacency = new Map<string, string[]>();
  edges.forEach((e) => {
    if (!adjacency.has(e.source)) adjacency.set(e.source, []);
    adjacency.get(e.source)!.push(e.target);
  });

  const startNode = nodes.find((n) => n.type === 'start');
  const ordered: Node<FlowNodeData>[] = [];
  const visited = new Set<string>();

  function dfs(id: string) {
    if (visited.has(id)) return;
    visited.add(id);
    const node = nodeMap.get(id);
    if (node && node.type !== 'start') ordered.push(node);
    const children = adjacency.get(id) ?? [];
    children.forEach(dfs);
  }

  if (startNode) dfs(startNode.id);
  // append any unconnected nodes (not visited, not start)
  nodes.forEach((n) => {
    if (!visited.has(n.id) && n.type !== 'start') ordered.push(n);
  });

  return ordered;
}

/* ── Helpers ── */
function timeNow() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

const BlueTick = () => (
  <svg width="14" height="10" viewBox="0 0 16 11" className="inline ml-1 shrink-0">
    <path d="M1 5.5L5.5 10L15 1" stroke="#53BDEB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <path d="M5 5.5L9.5 10L15 4" stroke="#53BDEB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

const BotAvatar = () => (
  <div className="w-6 h-6 rounded-full bg-[#1C8D73] flex items-center justify-center shrink-0 mb-0.5 shadow-sm">
    <Bot className="w-3 h-3 text-white" />
  </div>
);

/* ── Bubble wrappers ── */
function SentWrap({ children, time }: { children: React.ReactNode; time: string }) {
  return (
    <motion.div className="flex justify-end"
      initial={{ opacity: 0, x: 14, scale: 0.95 }} animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}>
      <div className="max-w-[80%] bg-[#005C4B] text-white rounded-t-2xl rounded-bl-2xl rounded-br-sm px-3.5 py-2 shadow-sm">
        {children}
        <div className="flex items-center justify-end gap-0.5 mt-1">
          <span className="text-[10px] text-white/50">{time}</span><BlueTick />
        </div>
      </div>
    </motion.div>
  );
}

function RecvWrap({ children, time, isDark }: { children: React.ReactNode; time: string; isDark: boolean }) {
  return (
    <motion.div className="flex justify-start items-end gap-1.5"
      initial={{ opacity: 0, x: -14, scale: 0.95 }} animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}>
      <BotAvatar />
      <div className="max-w-[80%] rounded-t-2xl rounded-br-2xl rounded-bl-sm px-3.5 py-2 shadow-sm"
        style={{ background: isDark ? '#1f2c34' : '#fff', color: isDark ? '#e9edef' : '#111b21' }}>
        {children}
        <div className="flex justify-end mt-1">
          <span className="text-[10px]" style={{ color: isDark ? 'rgba(255,255,255,0.38)' : 'rgba(0,0,0,0.38)' }}>{time}</span>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Per-node bubble renderers ── */
function TriggerBubble({ d, time }: { d: FlowNodeData; time: string }) {
  return (
    <SentWrap time={time}>
      <p className="text-[13px] leading-relaxed whitespace-pre-wrap wrap-break-word">
        {d.text || <span className="italic opacity-50">Hi…</span>}
      </p>
    </SentWrap>
  );
}

function TextBotBubble({ d, time, isDark }: { d: FlowNodeData; time: string; isDark: boolean }) {
  return (
    <RecvWrap time={time} isDark={isDark}>
      <p className="text-[13px] leading-relaxed whitespace-pre-wrap wrap-break-word">
        {d.text || <span className="italic opacity-40">Message…</span>}
      </p>
    </RecvWrap>
  );
}

function MediaBotBubble({ d, time, isDark }: { d: FlowNodeData; time: string; isDark: boolean }) {
  const Icon = d.mediaType === 'video' ? Video : d.mediaType === 'document' ? FileText : ImageIcon;
  const label = d.mediaType === 'video' ? 'Video' : d.mediaType === 'document' ? 'Document' : 'Image';
  return (
    <motion.div className="flex justify-start items-end gap-1.5"
      initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.2 }}>
      <BotAvatar />
      <div className="max-w-[80%] rounded-t-2xl rounded-br-2xl rounded-bl-sm overflow-hidden shadow-sm"
        style={{ background: isDark ? '#1f2c34' : '#fff' }}>
        <div className="h-28 flex flex-col items-center justify-center gap-1.5 relative"
          style={{ background: isDark ? '#0d1117' : '#ddd' }}>
          {d.url && d.mediaType === 'image' && (
            <img src={d.url} alt="" className="absolute inset-0 w-full h-full object-cover"
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
          )}
          <div className="relative z-10 flex flex-col items-center gap-1" style={{ color: 'rgba(255,255,255,0.5)' }}>
            <Icon className="w-7 h-7" />
            <span className="text-[10px]">{d.url || `${label} URL`}</span>
          </div>
        </div>
        <div className="px-3 py-2" style={{ color: isDark ? '#e9edef' : '#111b21' }}>
          {d.caption && <p className="text-[12px] mb-1 whitespace-pre-wrap wrap-break-word">{d.caption}</p>}
          <div className="flex justify-end">
            <span className="text-[10px]" style={{ color: isDark ? 'rgba(255,255,255,0.38)' : 'rgba(0,0,0,0.38)' }}>{time}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ButtonBotBubble({ d, time, isDark }: { d: FlowNodeData; time: string; isDark: boolean }) {
  const bg = isDark ? '#1f2c34' : '#fff';
  const fg = isDark ? '#e9edef' : '#111b21';
  const div = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.08)';
  return (
    <motion.div className="flex justify-start items-end gap-1.5"
      initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.2 }}>
      <BotAvatar />
      <div className="max-w-[80%] w-full">
        <div className="rounded-t-2xl rounded-br-md px-3.5 py-2 shadow-sm mb-[2px]" style={{ background: bg, color: fg }}>
          <p className="text-[13px] leading-relaxed whitespace-pre-wrap wrap-break-word">
            {d.text || <span className="italic opacity-40">Message body…</span>}
          </p>
          <div className="flex justify-end mt-1">
            <span className="text-[10px]" style={{ color: isDark ? 'rgba(255,255,255,0.38)' : 'rgba(0,0,0,0.38)' }}>{time}</span>
          </div>
        </div>
        {[d.btn1 || 'Button 1', d.btn2 || 'Button 2'].map((b, i) => (
          <div key={i} className="text-[#53BDEB] text-[13px] font-semibold text-center py-2 px-3 shadow-sm mb-[2px] last:rounded-b-2xl last:mb-0 cursor-pointer"
            style={{ background: bg, borderTop: `1px solid ${div}` }}>
            {b}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function ListBotBubble({ d, time, isDark }: { d: FlowNodeData; time: string; isDark: boolean }) {
  const bg = isDark ? '#1f2c34' : '#fff';
  const fg = isDark ? '#e9edef' : '#111b21';
  const div = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.08)';
  return (
    <motion.div className="flex justify-start items-end gap-1.5"
      initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.2 }}>
      <BotAvatar />
      <div className="max-w-[80%] rounded-t-2xl rounded-br-2xl rounded-bl-sm overflow-hidden shadow-sm" style={{ background: bg, color: fg }}>
        <div className="px-3.5 pt-2.5 pb-2">
          <p className="text-[13px] leading-relaxed whitespace-pre-wrap wrap-break-word">
            {d.text || <span className="italic opacity-40">List body…</span>}
          </p>
          <div className="my-2 space-y-1">
            {[d.item1 || 'Item 1', d.item2 || 'Item 2'].map((item, i) => (
              <div key={i} className="flex items-center gap-1.5 text-[11px] opacity-70">
                <List className="w-3 h-3 text-[#53BDEB] shrink-0" />{item}
              </div>
            ))}
          </div>
          <div className="border-t pt-2 flex justify-center gap-1.5 text-[#53BDEB] text-[12px] font-semibold cursor-pointer" style={{ borderColor: div }}>
            <List className="w-3.5 h-3.5" />{d.buttonText || 'View Options'}
          </div>
          <div className="flex justify-end mt-1.5">
            <span className="text-[10px]" style={{ color: isDark ? 'rgba(255,255,255,0.38)' : 'rgba(0,0,0,0.38)' }}>{time}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ConditionChip({ d }: { d: FlowNodeData }) {
  return (
    <motion.div className="flex justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="flex items-center gap-1.5 bg-indigo-500/10 border border-indigo-500/25 rounded-full px-3 py-1">
        <GitBranch className="w-3 h-3 text-indigo-400" />
        <span className="text-[10px] text-indigo-400 font-medium">Condition: {d.variable || 'variable'}</span>
      </div>
    </motion.div>
  );
}

/* ── Main ── */
export function WhatsAppPreview({ nodes, edges, isDark, isVisible, onToggle }: WhatsAppPreviewProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const time = timeNow();

  const orderedNodes = buildOrderedNodes(nodes, edges);
  const isEmpty = orderedNodes.length === 0;
  const hasBotNode = orderedNodes.some((n) => BOT_TYPES.includes(n.type ?? ''));

  useEffect(() => {
    if (scrollRef.current && isVisible) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [orderedNodes.length, isVisible]);

  function renderBubble(node: Node<FlowNodeData>) {
    const d = node.data;
    const t = node.type ?? '';
    if (t === 'triggerMsg') return <TriggerBubble key={node.id} d={d} time={time} />;
    if (t === 'textMsg') return <TextBotBubble key={node.id} d={d} time={time} isDark={isDark} />;
    if (t === 'mediaMsg') return <MediaBotBubble key={node.id} d={d} time={time} isDark={isDark} />;
    if (t === 'buttonMsg') return <ButtonBotBubble key={node.id} d={d} time={time} isDark={isDark} />;
    if (t === 'listMsg') return <ListBotBubble key={node.id} d={d} time={time} isDark={isDark} />;
    if (t === 'condition') return <ConditionChip key={node.id} d={d} />;
    return null;
  }

  return (
    <>
      {/* floating toggle */}
      <AnimatePresence>
        {!isVisible && (
          <motion.button key="btn"
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
            onClick={onToggle}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-1.5 group cursor-pointer">
            <div className="relative p-3 bg-white dark:bg-black border border-gray-200 dark:border-[#1C8D73]/40 rounded-2xl shadow-lg dark:shadow-[0_0_20px_rgba(28,141,115,0.2)] group-hover:border-[#1C8D73] transition-all duration-200">
              <Smartphone className="w-5 h-5 text-[#1C8D73]" />
              {orderedNodes.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#1C8D73] rounded-full text-[9px] text-white font-bold flex items-center justify-center">
                  {orderedNodes.length}
                </span>
              )}
            </div>
            <span className="text-[9px] font-semibold text-gray-400 dark:text-gray-500 group-hover:text-[#1C8D73] transition-colors uppercase tracking-wider">Preview</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* panel */}
      <AnimatePresence>
        {isVisible && (
          <motion.div key="panel"
            initial={{ x: '100%', opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', stiffness: 340, damping: 34, mass: 0.8 }}
            className="absolute right-0 top-0 h-full z-20 flex items-center pr-5 pointer-events-none">
            <div className="pointer-events-auto flex flex-col items-center gap-3">
              {/* hide btn */}
              <button onClick={onToggle}
                className="self-end flex items-center gap-1.5 text-[11px] text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-200 bg-white dark:bg-black border border-gray-200 dark:border-[#1a1a1a] rounded-full px-3 py-1.5 shadow-sm cursor-pointer transition-colors">
                <X className="w-3 h-3" /> Hide Preview
              </button>

              {/* phone */}
              <div className="relative flex flex-col overflow-hidden" style={{
                width: 280, height: 560, borderRadius: 44,
                background: isDark ? '#111' : '#e5ddd5',
                border: isDark ? '3px solid #222' : '3px solid #c8c1b4',
                boxShadow: isDark
                  ? '0 0 0 1px #333,inset 0 0 0 1px #000,0 30px 80px rgba(0,0,0,0.8)'
                  : '0 0 0 1px #b0a99e,0 30px 80px rgba(0,0,0,0.35)',
              }}>
                {/* notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10 rounded-b-xl"
                  style={{ width: 100, height: 26, background: isDark ? '#111' : '#e5ddd5' }} />

                {/* status bar */}
                <div className="flex items-center justify-between px-6 pt-3 pb-1 shrink-0">
                  <span className="text-[10px] font-semibold" style={{ color: isDark ? '#fff' : '#000' }}>{time}</span>
                  <div className="flex items-center gap-1.5" style={{ color: isDark ? '#fff' : '#000' }}>
                    <Signal className="w-3 h-3" /><Wifi className="w-3 h-3" /><Battery className="w-3 h-3" />
                  </div>
                </div>

                {/* WA top bar */}
                <div className="flex items-center gap-2.5 px-3 py-2 shrink-0" style={{ background: isDark ? '#1f2c34' : '#075E54' }}>
                  <ChevronLeft className="w-4 h-4 text-white shrink-0" />
                  <div className="w-8 h-8 rounded-full bg-[#1C8D73] flex items-center justify-center shrink-0 shadow-sm">
                    <MessageSquare className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-[12px] font-semibold leading-tight truncate">WhatsApp Bot</p>
                    <p className="text-white/60 text-[9px]">online</p>
                  </div>
                  <div className="flex items-center gap-3 text-white/80">
                    <VideoIcon className="w-4 h-4" /><Phone className="w-4 h-4" />
                  </div>
                </div>

                {/* chat */}
                <div className="flex-1 overflow-hidden" style={{
                  background: isDark
                    ? "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30'%3E%3Ccircle cx='15' cy='15' r='1' fill='%231C8D73' opacity='0.07'/%3E%3C/svg%3E\") #0d1117"
                    : "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30'%3E%3Ccircle cx='15' cy='15' r='1' fill='%231C8D73' opacity='0.12'/%3E%3C/svg%3E\") #e5ddd5",
                }}>
                  <div ref={scrollRef} className="h-full overflow-y-auto px-2.5 py-3 space-y-2 scroll-smooth">
                    {/* flow chip */}
                    <motion.div className="flex justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <div className="text-[10px] px-3 py-1 rounded-full font-medium flex items-center gap-1"
                        style={{ background: isDark ? 'rgba(28,141,115,0.12)' : 'rgba(7,94,84,0.1)', color: isDark ? '#1C8D73' : '#075E54', border: '1px solid rgba(28,141,115,0.2)' }}>
                        <Play className="w-2.5 h-2.5 fill-current" /> Flow Preview
                      </div>
                    </motion.div>

                    {/* empty */}
                    {isEmpty && (
                      <motion.div className="flex flex-col items-center justify-center h-44 gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: isDark ? 'rgba(28,141,115,0.1)' : 'rgba(7,94,84,0.08)' }}>
                          <Smartphone className="w-6 h-6 text-[#1C8D73]" />
                        </div>
                        <p className="text-[11px] text-center px-4 font-medium" style={{ color: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)' }}>
                          Connect nodes to see the conversation flow in order
                        </p>
                      </motion.div>
                    )}

                    {orderedNodes.map(renderBubble)}

                    {/* typing indicator */}
                    {hasBotNode && (
                      <motion.div className="flex justify-start items-end gap-1.5"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                        <BotAvatar />
                        <div className="rounded-t-2xl rounded-br-2xl rounded-bl-sm px-3.5 py-2.5 shadow-sm flex items-center gap-1"
                          style={{ background: isDark ? '#1f2c34' : '#fff' }}>
                          {[0, 1, 2].map((i) => (
                            <motion.div key={i} className="w-1.5 h-1.5 rounded-full bg-gray-400"
                              animate={{ y: [0, -3, 0] }}
                              transition={{ repeat: Infinity, duration: 0.7, delay: i * 0.15, ease: 'easeInOut' }} />
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* input bar */}
                <div className="flex items-center gap-2 px-3 py-2 shrink-0" style={{ background: isDark ? '#1f2c34' : '#f0f2f5' }}>
                  <div className="flex-1 rounded-full px-3 py-1.5 text-[11px]"
                    style={{ background: isDark ? '#2a3942' : '#fff', color: isDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.35)' }}>
                    Message
                  </div>
                  <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0" style={{ background: '#075E54' }}>
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-white"><path d="M2 21l21-9L2 3v7l15 2-15 2z" /></svg>
                  </div>
                </div>

                {/* home indicator */}
                <div className="flex justify-center pb-2 shrink-0" style={{ background: isDark ? '#1f2c34' : '#f0f2f5' }}>
                  <div className="w-20 h-1 rounded-full" style={{ background: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)' }} />
                </div>
              </div>

              {/* live pill */}
              <div className="flex items-center gap-2 text-[10px] text-gray-400 dark:text-gray-600 font-medium">
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#1C8D73] animate-pulse" />
                  Live Preview
                </div>
                <span>·</span>
                <span>{orderedNodes.length} step{orderedNodes.length !== 1 ? 's' : ''}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
