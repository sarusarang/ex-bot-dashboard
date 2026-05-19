import { z } from 'zod';
import type { FieldErrors } from 'react-hook-form';

// ─── Schemas ──────────────────────────────────────────────────────────────────

export const textNodeSchema = z.object({
  text: z.string().min(1, 'Message is required'),
});

export const mediaNodeSchema = z.object({
  url: z.string().min(1, 'URL is required').url('Must be a valid URL'),
  caption: z.string().optional().default(''),
});

export const buttonNodeSchema = z.object({
  text: z.string().min(1, 'Body text is required'),
  btn1: z.string().min(1, 'Button 1 label is required'),
  btn2: z.string().optional().default(''),
});

export const listNodeSchema = z.object({
  text: z.string().min(1, 'Body text is required'),
  buttonText: z.string().min(1, 'Button label is required'),
  item1: z.string().min(1, 'Item 1 is required'),
  item2: z.string().optional().default(''),
});

export const conditionNodeSchema = z.object({
  variable: z.string().min(1, 'Variable name is required'),
});

export const triggerNodeSchema = z.object({
  text: z.string().min(1, 'Trigger message is required'),
});

// ─── Status ───────────────────────────────────────────────────────────────────

export type NodeStatus = 'valid' | 'draft' | 'error';

/**
 * Compute node status:
 * - error  → any required field is missing or invalid
 * - draft  → required fields OK but optional fields incomplete
 * - valid  → all fields (required + optional) filled and valid
 */
export function computeStatus(
  errors: FieldErrors,
  values: Record<string, unknown>,
  required: readonly string[],
  optional: readonly string[],
): NodeStatus {
  const hasRequiredIssue = required.some((f) => !!errors[f] || !values[f]);
  if (hasRequiredIssue) return 'error';
  if (optional.length > 0 && optional.some((f) => !values[f])) return 'draft';
  return 'valid';
}

// ─── Style config ─────────────────────────────────────────────────────────────

export const STATUS_CONFIG = {
  valid: {
    dot:    'bg-emerald-500',
    label:  'Valid',
    badge:  'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10',
    border: 'border-emerald-400/50 dark:border-emerald-500/35',
    shadow: 'shadow-[0_0_22px_rgba(16,185,129,0.18)] dark:shadow-[0_0_28px_rgba(16,185,129,0.28)]',
  },
  draft: {
    dot:    'bg-amber-400',
    label:  'Draft',
    badge:  'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10',
    border: 'border-amber-400/50 dark:border-amber-400/35',
    shadow: 'shadow-[0_0_22px_rgba(245,158,11,0.15)] dark:shadow-[0_0_28px_rgba(245,158,11,0.22)]',
  },
  error: {
    dot:    'bg-red-500',
    label:  'Error',
    badge:  'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10',
    border: 'border-red-400/50 dark:border-red-500/35',
    shadow: 'shadow-[0_0_22px_rgba(239,68,68,0.15)] dark:shadow-[0_0_28px_rgba(239,68,68,0.28)]',
  },
} as const;
