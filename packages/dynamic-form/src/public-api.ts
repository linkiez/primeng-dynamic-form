export { DynamicFormComponent } from './lib/components/dynamic-form.component';
export { FieldRendererComponent } from './lib/components/field-renderer.component';

export type {
  FormSchema,
  FieldDefinition,
  ValidationRule,
  DynamicFormConfiguration,
  FormSubmissionPayload,
  FieldType,
  FieldOption,
  LayoutConfig,
  SubmitConfig,
  UIHints,
  ValidatorName,
} from './lib/models/dynamic-form.types';

export { SUPPORTED_FIELD_TYPES } from './lib/models/dynamic-form.types';

export type { DynamicFormConfigError, ErrorCode } from './lib/models/error-codes';
export { ERROR_CODES } from './lib/models/error-codes';

// Roadmap planning domain
export type {
  InitiativeCategory,
  InitiativePriority,
  RiskLevel,
  InitiativeStatus,
  RiskMetrics,
  AcceptanceCriterion,
  CompatibilityImpact,
  ReadinessCheckResult,
  PrioritizedEntry,
} from './lib/models/roadmap.types';

export {
  INITIATIVE_STATUSES,
  RISK_LEVELS,
  INITIATIVE_PRIORITIES,
  INITIATIVE_CATEGORIES,
  RISK_EXPOSURE_BANDS,
  PRIORITY_WEIGHTS,
} from './lib/models/roadmap.enums';

export type {
  PriorityScoreInput,
  PriorityScoreResult,
} from './lib/mappers/priority-score.mapper';
export { computePriorityScore } from './lib/mappers/priority-score.mapper';

export type {
  DependencyNode,
  DependencyChainValidationResult,
} from './lib/validators/dependency-chain.validator';
export { validateDependencyChain } from './lib/validators/dependency-chain.validator';

export type { InitiativeReadinessInput } from './lib/validators/initiative-readiness.validator';
export { validateInitiativeReadiness } from './lib/validators/initiative-readiness.validator';

// Hardening controls (US1)
export type {
  HardeningControl,
  HardeningEvidence,
  HardeningGateResult,
  ReleaseReadinessResult,
} from './lib/models/hardening-control.model';

export {
  HARDENING_CONTROLS,
  MANDATORY_GATE_KEYS,
} from './lib/models/hardening-control.model';

export type { EvidenceIndex } from './lib/mappers/hardening-evidence.mapper';
export {
  indexEvidence,
  findMissingEvidence,
  findFailedControls,
} from './lib/mappers/hardening-evidence.mapper';

export { validateHardeningGate } from './lib/validators/hardening-gate.validator';
export { validateReleaseReadiness } from './lib/validators/release-readiness.validator';

// Prioritization domain (US2)
export type {
  Initiative,
  InitiativeForPrioritization,
} from './lib/models/initiative.model';

export type { RiskAssessment } from './lib/models/risk-assessment.model';
export { deriveRiskLevel, buildRiskAssessment } from './lib/models/risk-assessment.model';

export type { PrioritizedBacklog } from './lib/mappers/backlog-prioritization.mapper';
export { prioritizeBacklog } from './lib/mappers/backlog-prioritization.mapper';

export type { PrioritizationValidationResult } from './lib/validators/prioritization.validator';
export { validatePrioritizationInput } from './lib/validators/prioritization.validator';

// Feature planning domain (US3)
export type { FeatureProposal } from './lib/models/feature-proposal.model';

export type { RoadmapSlice } from './lib/models/roadmap-slice.model';
export { buildRoadmapSlice } from './lib/models/roadmap-slice.model';

export type { CompatibilityImpactValidationResult } from './lib/validators/compatibility-impact.validator';
export { validateCompatibilityImpact } from './lib/validators/compatibility-impact.validator';

export type { ProposalSliceMappingResult } from './lib/mappers/proposal-slice.mapper';
export { mapProposalsToSlice } from './lib/mappers/proposal-slice.mapper';
