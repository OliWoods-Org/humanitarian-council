/**
 * Humanitarian Council — AI deliberation with opposing worldviews.
 *
 * 7 voices. Ranked-choice voting. Preserved dissent.
 * Because the hardest problems don't have one right answer.
 *
 * An OliWoods Foundation project.
 * https://github.com/OliWoods-Org/humanitarian-council
 */

import { z } from "zod";

// ============================================================================
// Council Voice Types
// ============================================================================

/**
 * The 7 council voices — each represents a genuine philosophical tradition.
 */
export const CouncilVoiceId = z.enum([
  "rights-advocate",
  "community-elder",
  "fiscal-realist",
  "lived-experience",
  "systems-thinker",
  "frontline-worker",
  "future-guardian",
]);
export type CouncilVoiceId = z.infer<typeof CouncilVoiceId>;

export const CouncilVoice = z.object({
  id: CouncilVoiceId,
  name: z.string(),
  perspective: z.string(),
  coreValues: z.array(z.string()),
  keyQuestion: z.string(),
});
export type CouncilVoice = z.infer<typeof CouncilVoice>;

// ============================================================================
// Voice Definitions
// ============================================================================

export const COUNCIL_VOICES: CouncilVoice[] = [
  {
    id: "rights-advocate",
    name: "Rights Advocate",
    perspective: "International human rights law",
    coreValues: ["Universal dignity", "UDHR", "Bodily autonomy", "Non-discrimination"],
    keyQuestion: "Does this respect human rights? Who is excluded?",
  },
  {
    id: "community-elder",
    name: "Community Elder",
    perspective: "Indigenous & traditional knowledge",
    coreValues: ["Community wisdom", "Intergenerational responsibility", "Land connection", "Oral tradition"],
    keyQuestion: "What do the elders say? What has worked for 10,000 years?",
  },
  {
    id: "fiscal-realist",
    name: "Fiscal Realist",
    perspective: "Evidence-based resource allocation",
    coreValues: ["Cost-effectiveness", "Scalability", "Sustainability", "Measurable outcomes"],
    keyQuestion: "Can we afford this? What's the evidence? What's the ROI per life improved?",
  },
  {
    id: "lived-experience",
    name: "Lived Experience",
    perspective: "People directly affected by the issue",
    coreValues: ["Nothing about us without us", "Dignity", "Agency", "Self-determination"],
    keyQuestion: "Have you asked the people this affects? Would YOU accept this solution for yourself?",
  },
  {
    id: "systems-thinker",
    name: "Systems Thinker",
    perspective: "Structural analysis, root cause",
    coreValues: ["Power dynamics", "Institutional change", "Feedback loops", "Unintended consequences"],
    keyQuestion: "What system created this problem? Are we treating symptoms or causes?",
  },
  {
    id: "frontline-worker",
    name: "Frontline Worker",
    perspective: "Practitioners delivering services",
    coreValues: ["Pragmatism", "What works in the field", "Burnout awareness", "Resource constraints"],
    keyQuestion: "I've tried this before. Here's what actually works on the ground.",
  },
  {
    id: "future-guardian",
    name: "Future Guardian",
    perspective: "Long-term & intergenerational impact",
    coreValues: ["Sustainability", "Children's rights", "Climate", "Precedent-setting"],
    keyQuestion: "What does this mean in 20 years? What world do we leave behind?",
  },
];

// ============================================================================
// Deliberation Types
// ============================================================================

export const DeliberationStage = z.enum([
  "position-statements",
  "cross-examination",
  "ranked-voting",
  "synthesis",
]);
export type DeliberationStage = z.infer<typeof DeliberationStage>;

export const ConsensusLevel = z.enum([
  "unanimous",       // 7/7
  "strong-majority", // 5-6/7
  "majority",        // 4/7
  "no-consensus",    // 3/7 or less
]);
export type ConsensusLevel = z.infer<typeof ConsensusLevel>;

export const PositionStatement = z.object({
  voiceId: CouncilVoiceId,
  position: z.string(),
  reasoning: z.string(),
  timestamp: z.string().datetime(),
});
export type PositionStatement = z.infer<typeof PositionStatement>;

export const CrossExamination = z.object({
  fromVoice: CouncilVoiceId,
  toVoice: CouncilVoiceId,
  challenge: z.string(),
  response: z.string().optional(),
});
export type CrossExamination = z.infer<typeof CrossExamination>;

export const RankedVote = z.object({
  voiceId: CouncilVoiceId,
  rankings: z.array(z.object({
    proposalId: z.string(),
    rank: z.number().int().positive(),
  })),
});
export type RankedVote = z.infer<typeof RankedVote>;

export const Dissent = z.object({
  voiceId: CouncilVoiceId,
  position: z.string(),
  reasoning: z.string(),
});
export type Dissent = z.infer<typeof Dissent>;

export const DeliberationResult = z.object({
  question: z.string(),
  recommendation: z.string(),
  confidence: z.number().min(0).max(1),
  consensusLevel: ConsensusLevel,
  positions: z.array(PositionStatement),
  crossExaminations: z.array(CrossExamination),
  votes: z.array(RankedVote),
  dissents: z.array(Dissent),
  synthesisNotes: z.string(),
  timestamp: z.string().datetime(),
});
export type DeliberationResult = z.infer<typeof DeliberationResult>;

// ============================================================================
// Re-exports
// ============================================================================

export { deliberate, getConsensusLevel } from "./council.js";
