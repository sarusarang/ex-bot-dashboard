import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Handle, Position, type NodeProps, type Node } from '@xyflow/react';
import {
  MessageSquare, Image as ImageIcon, Video, FileText,
  List, MousePointerClick, Play, GitBranch, MessageCircle,
} from 'lucide-react';
import { NodeFormField } from '@/components/ui/NodeFormField';
import {
  textNodeSchema, mediaNodeSchema, buttonNodeSchema,
  listNodeSchema, conditionNodeSchema, triggerNodeSchema,
  computeStatus, STATUS_CONFIG, type NodeStatus,
} from '@/lib/nodeSchemas';

// ─── Types ────────────────────────────────────────────────────────────────────

export type FlowNodeData = {
  onChange?: (id: string, field: string, value: string) => void;
  text?: string;
  url?: string;
  caption?: string;
  btn1?: string;
  btn2?: string;
  mediaType?: 'image' | 'video' | 'document';
  buttonText?: string;
  item1?: string;
  item2?: string;
  variable?: string;
  label?: string;
};

export type FlowNodeProps = NodeProps<Node<FlowNodeData>>;

// ─── Shared style tokens ──────────────────────────────────────────────────────

const handleStyle =
  '!w-4 !h-4 !bg-[#1C8D73] border-2 border-white dark:border-black shadow-md hover:!w-6 hover:!h-6 hover:!bg-emerald-400 hover:shadow-[0_0_15px_rgba(16,185,129,0.8)] transition-all duration-200 cursor-pointer z-50';

// ─── Reusable sub-components ──────────────────────────────────────────────────

/** Top-right status badge shown in every node header */
function StatusBadge({ status }: { status: NodeStatus }) {
  const s = STATUS_CONFIG[status];
  return (
    <div className={`ml-auto flex items-center gap-1.5 text-[10px] font-semibold px-2 py-0.5 rounded-full ${s.badge}`}>
      <div className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
      {s.label}
    </div>
  );
}

/** Wrapper that applies status-driven border + shadow + layout */
function NodeShell({
  status,
  children,
  customBorder,
}: {
  status: NodeStatus;
  children: React.ReactNode;
  customBorder?: string;
}) {
  const s = STATUS_CONFIG[status];
  const border = customBorder ?? s.border;
  return (
    <div
      className={`bg-white dark:bg-black border-2 ${border} rounded-xl ${s.shadow} transition-all duration-300 min-w-[260px] group`}
    >
      {children}
    </div>
  );
}

/** Shared header row */
function NodeHeader({
  icon,
  label,
  status,
  headerBg = 'bg-gray-50/80 dark:bg-black',
}: {
  icon: React.ReactNode;
  label: string;
  status: NodeStatus;
  headerBg?: string;
}) {
  return (
    <div className={`flex items-center gap-2 px-4 py-3 ${headerBg} border-b border-gray-100 dark:border-[#1a1a1a] rounded-t-xl`}>
      {icon}
      <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">{label}</span>
      <StatusBadge status={status} />
    </div>
  );
}

const body = 'p-4 space-y-3';

// ─── Text Node ────────────────────────────────────────────────────────────────

export const TextNode = ({ id, data, isConnectable }: FlowNodeProps) => {
  const { register, watch, formState: { errors } } = useForm({
    resolver: zodResolver(textNodeSchema),
    defaultValues: { text: data.text ?? '' },
    mode: 'onChange',
  });
  const status = computeStatus(errors, watch(), ['text'], []);

  return (
    <NodeShell status={status}>
      <Handle type="target" position={Position.Left} isConnectable={isConnectable} className={handleStyle} />
      <NodeHeader icon={<MessageSquare className="w-4 h-4 text-blue-500" />} label="Text Message" status={status} />
      <div className={body}>
        <NodeFormField
          registration={register('text')}
          onValueChange={(v) => data.onChange?.(id, 'text', v)}
          placeholder="Enter message text..."
          error={errors.text?.message}
          as="textarea"
          rows={3}
        />
      </div>
      <Handle type="source" position={Position.Right} isConnectable={isConnectable} className={handleStyle} />
    </NodeShell>
  );
};

// ─── Media Node ───────────────────────────────────────────────────────────────

export const MediaNode = ({ id, data, isConnectable }: FlowNodeProps) => {
  const { register, watch, formState: { errors } } = useForm({
    resolver: zodResolver(mediaNodeSchema),
    defaultValues: { url: data.url ?? '', caption: data.caption ?? '' },
    mode: 'onChange',
  });
  const status = computeStatus(errors, watch(), ['url'], ['caption']);

  const icons: Record<string, React.ReactNode> = {
    image:    <ImageIcon className="w-4 h-4 text-emerald-500" />,
    video:    <Video className="w-4 h-4 text-purple-500" />,
    document: <FileText className="w-4 h-4 text-amber-500" />,
  };
  const labels: Record<string, string> = {
    image: 'Image Message', video: 'Video Message', document: 'Document Message',
  };
  const type = data.mediaType ?? 'image';

  return (
    <NodeShell status={status}>
      <Handle type="target" position={Position.Left} isConnectable={isConnectable} className={handleStyle} />
      <NodeHeader icon={icons[type]} label={labels[type]} status={status} />
      <div className={body}>
        <NodeFormField
          registration={register('url')}
          onValueChange={(v) => data.onChange?.(id, 'url', v)}
          placeholder="Media URL (https://...)"
          error={errors.url?.message}
        />
        <NodeFormField
          registration={register('caption')}
          onValueChange={(v) => data.onChange?.(id, 'caption', v)}
          placeholder="Caption (optional)"
          error={errors.caption?.message}
          as="textarea"
          rows={2}
        />
      </div>
      <Handle type="source" position={Position.Right} isConnectable={isConnectable} className={handleStyle} />
    </NodeShell>
  );
};

// ─── Button Node ──────────────────────────────────────────────────────────────

export const ButtonNode = ({ id, data, isConnectable }: FlowNodeProps) => {
  const { register, watch, formState: { errors } } = useForm({
    resolver: zodResolver(buttonNodeSchema),
    defaultValues: { text: data.text ?? '', btn1: data.btn1 ?? '', btn2: data.btn2 ?? '' },
    mode: 'onChange',
  });
  const status = computeStatus(errors, watch(), ['text', 'btn1'], ['btn2']);

  return (
    <NodeShell status={status}>
      <Handle type="target" position={Position.Left} isConnectable={isConnectable} className={handleStyle} />
      <NodeHeader icon={<MousePointerClick className="w-4 h-4 text-orange-500" />} label="Interactive Buttons" status={status} />
      <div className={body}>
        <NodeFormField
          registration={register('text')}
          onValueChange={(v) => data.onChange?.(id, 'text', v)}
          placeholder="Header/Body text"
          error={errors.text?.message}
          as="textarea"
          rows={2}
        />
        <div className="space-y-2">
          <div className="relative flex items-center">
            <NodeFormField
              registration={register('btn1')}
              onValueChange={(v) => data.onChange?.(id, 'btn1', v)}
              placeholder="Button 1 *"
              error={errors.btn1?.message}
              className="flex-1"
            />
            <Handle type="source" position={Position.Right} id="btn1" className={handleStyle} style={{ right: '-1.25rem' }} />
          </div>
          <div className="relative flex items-center">
            <NodeFormField
              registration={register('btn2')}
              onValueChange={(v) => data.onChange?.(id, 'btn2', v)}
              placeholder="Button 2 (optional)"
              error={errors.btn2?.message}
              className="flex-1"
            />
            <Handle type="source" position={Position.Right} id="btn2" className={handleStyle} style={{ right: '-1.25rem' }} />
          </div>
        </div>
      </div>
    </NodeShell>
  );
};

// ─── List Node ────────────────────────────────────────────────────────────────

export const ListNode = ({ id, data, isConnectable }: FlowNodeProps) => {
  const { register, watch, formState: { errors } } = useForm({
    resolver: zodResolver(listNodeSchema),
    defaultValues: {
      text: data.text ?? '', buttonText: data.buttonText ?? '',
      item1: data.item1 ?? '', item2: data.item2 ?? '',
    },
    mode: 'onChange',
  });
  const status = computeStatus(errors, watch(), ['text', 'buttonText', 'item1'], ['item2']);

  return (
    <NodeShell status={status}>
      <Handle type="target" position={Position.Left} isConnectable={isConnectable} className={handleStyle} />
      <NodeHeader icon={<List className="w-4 h-4 text-pink-500" />} label="List Message" status={status} />
      <div className={body}>
        <NodeFormField
          registration={register('text')}
          onValueChange={(v) => data.onChange?.(id, 'text', v)}
          placeholder="Header/Body text *"
          error={errors.text?.message}
          as="textarea"
          rows={2}
        />
        <NodeFormField
          registration={register('buttonText')}
          onValueChange={(v) => data.onChange?.(id, 'buttonText', v)}
          placeholder="Menu Button Text *"
          error={errors.buttonText?.message}
        />
        <div className="space-y-2 border-t border-gray-100 dark:border-[#1a1a1a] pt-3">
          <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">List Items</p>
          <div className="relative flex items-center">
            <NodeFormField
              registration={register('item1')}
              onValueChange={(v) => data.onChange?.(id, 'item1', v)}
              placeholder="Item 1 Title *"
              error={errors.item1?.message}
              className="flex-1"
            />
            <Handle type="source" position={Position.Right} id="item1" className={handleStyle} style={{ right: '-1.25rem' }} />
          </div>
          <div className="relative flex items-center">
            <NodeFormField
              registration={register('item2')}
              onValueChange={(v) => data.onChange?.(id, 'item2', v)}
              placeholder="Item 2 Title (optional)"
              error={errors.item2?.message}
              className="flex-1"
            />
            <Handle type="source" position={Position.Right} id="item2" className={handleStyle} style={{ right: '-1.25rem' }} />
          </div>
        </div>
      </div>
    </NodeShell>
  );
};

// ─── Condition Node ───────────────────────────────────────────────────────────

export const ConditionNode = ({ id, data, isConnectable }: FlowNodeProps) => {
  const { register, watch, formState: { errors } } = useForm({
    resolver: zodResolver(conditionNodeSchema),
    defaultValues: { variable: data.variable ?? '' },
    mode: 'onChange',
  });
  const status = computeStatus(errors, watch(), ['variable'], []);

  return (
    <NodeShell status={status}>
      <Handle type="target" position={Position.Left} isConnectable={isConnectable} className={handleStyle} />
      <NodeHeader icon={<GitBranch className="w-4 h-4 text-indigo-500" />} label="Condition" status={status} />
      <div className={body}>
        <NodeFormField
          registration={register('variable')}
          onValueChange={(v) => data.onChange?.(id, 'variable', v)}
          placeholder="Variable (e.g. user.age) *"
          error={errors.variable?.message}
        />
        <div className="space-y-2 border-t border-gray-100 dark:border-gray-800 pt-3">
          <div className="relative flex items-center justify-between bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 rounded-lg p-2.5">
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">True</span>
            <Handle type="source" position={Position.Right} id="true" className={`${handleStyle} bg-emerald-500!`} style={{ right: '-1.25rem' }} />
          </div>
          <div className="relative flex items-center justify-between bg-rose-50 dark:bg-rose-500/10 border border-rose-100 dark:border-rose-500/20 rounded-lg p-2.5">
            <span className="text-xs font-semibold text-rose-600 dark:text-rose-400">False</span>
            <Handle type="source" position={Position.Right} id="false" className={`${handleStyle} bg-rose-500!`} style={{ right: '-1.25rem' }} />
          </div>
        </div>
      </div>
    </NodeShell>
  );
};

// ─── Start Node ───────────────────────────────────────────────────────────────

export const StartNode = ({ isConnectable }: FlowNodeProps) => (
  <div className="bg-linear-to-r from-[#1C8D73] to-[#146c57] text-white rounded-full px-6 py-3 shadow-lg font-semibold flex items-center gap-2 hover:shadow-xl transition-shadow border-2 border-white/20">
    <Play className="w-4 h-4 fill-current" />
    Start Flow
    <Handle type="source" position={Position.Right} isConnectable={isConnectable} className={`${handleStyle} border-[#1C8D73]!`} />
  </div>
);

// ─── Trigger Node ─────────────────────────────────────────────────────────────

export const TriggerNode = ({ id, data, isConnectable }: FlowNodeProps) => {
  const { register, watch, formState: { errors } } = useForm({
    resolver: zodResolver(triggerNodeSchema),
    defaultValues: { text: data.text ?? '' },
    mode: 'onChange',
  });
  const status = computeStatus(errors, watch(), ['text'], []);
  const s = STATUS_CONFIG[status];

  return (
    <div className={`bg-white dark:bg-black border-2 ${s.border} rounded-xl ${s.shadow} transition-all duration-300 min-w-[260px] group`}>
      <Handle type="target" position={Position.Left} isConnectable={isConnectable} className={handleStyle} />
      <div className="flex items-center gap-2 px-4 py-3 bg-amber-50/80 dark:bg-amber-500/5 border-b border-amber-100 dark:border-amber-500/20 rounded-t-xl">
        <MessageCircle className="w-4 h-4 text-amber-500" />
        <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">Trigger Message</span>
        <StatusBadge status={status} />
      </div>
      <div className={body}>
        <NodeFormField
          registration={register('text')}
          onValueChange={(v) => data.onChange?.(id, 'text', v)}
          placeholder="e.g. Hi, Hello, Start..."
          error={errors.text?.message}
          as="textarea"
          rows={2}
        />
        <p className="text-[10px] text-gray-400 dark:text-gray-600 leading-tight">
          💬 The user message that triggers this bot flow
        </p>
      </div>
      <Handle type="source" position={Position.Right} isConnectable={isConnectable} className={handleStyle} />
    </div>
  );
};
