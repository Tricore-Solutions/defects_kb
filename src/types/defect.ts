/**
 * Defects Management Types
 *
 * This module defines the data structures for the Defects Management system.
 * The system allows manufacturing teams to:
 * 1. Search and identify types of defects
 * 2. View investigation results
 * 3. Reference corrective actions for manufacturing
 */

export interface DefectKnowledge {
  id: string;
  code: string; // Unique defect code (e.g., "DK-001")
  name: string; // Defect name/title (Failure Mode)
  category: DefectCategory;
  severity: SeverityLevel;
  description: string;

  // Investigation Results
  failureAnalysis: string; // Root cause analysis
  rootCause: string;

  // Manufacturing Reference
  correctiveAction: string;
  preventiveAction?: string;

  // Visual Reference
  images: DefectImage[];

  // Metadata
  applicableProducts?: string[];
  applicableProcesses?: string[];
  relatedDefectCodes?: string[]; // Links to P-Chart defect codes

  // Audit
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy?: string;
  isActive: boolean;

  // Statistics
  occurrenceCount?: number;
  lastOccurrence?: Date;
}

export interface DefectImage {
  id: string;
  defectId: string;
  url: string;
  caption?: string;
  imageType: "defect" | "root_cause" | "corrective_action" | "reference";
  uploadedAt: Date;
  uploadedBy: string;
}

export type DefectCategory =
  | "SOLDERING"
  | "VISUAL_INSPECTION"
  | "CABLE_PREPARATION"
  | "CRIMPING"
  | "ASSEMBLY"
  | "TAPING"
  | "ELECTRICAL"
  | "LABELING"
  | "OTHER";

export const DEFECT_CATEGORIES: Record<DefectCategory, string> = {
  SOLDERING: "Soldering",
  VISUAL_INSPECTION: "Visual Inspection",
  CABLE_PREPARATION: "Cable Preparation",
  CRIMPING: "Crimping & Terminal",
  ASSEMBLY: "Assembly",
  TAPING: "Taping & Packaging",
  ELECTRICAL: "Electrical Test",
  LABELING: "Labeling",
  OTHER: "Other",
};

export type SeverityLevel = "CRITICAL" | "MAJOR" | "MINOR" | "COSMETIC";

export const SEVERITY_LEVELS: Record<
  SeverityLevel,
  { label: string; color: string; bgColor: string }
> = {
  CRITICAL: {
    label: "Critical",
    color: "text-red-700",
    bgColor: "bg-red-100",
  },
  MAJOR: {
    label: "Major",
    color: "text-orange-700",
    bgColor: "bg-orange-100",
  },
  MINOR: {
    label: "Minor",
    color: "text-yellow-700",
    bgColor: "bg-yellow-100",
  },
  COSMETIC: {
    label: "Cosmetic",
    color: "text-blue-700",
    bgColor: "bg-blue-100",
  },
};

export interface DefectFormData {
  code: string;
  name: string;
  category: DefectCategory;
  severity: SeverityLevel;
  description: string;
  failureAnalysis: string;
  rootCause: string;
  correctiveAction: string;
  preventiveAction?: string;
  applicableProducts?: string[];
  applicableProcesses?: string[];
  relatedDefectCodes?: string[];
  isActive: boolean;
}

export interface DefectSearchFilters {
  search?: string;
  category?: DefectCategory;
  severity?: SeverityLevel;
  isActive?: boolean;
  page: number;
  limit: number;
  sortField?: string;
  sortDirection?: "asc" | "desc";
}

export interface PaginatedDefects {
  data: DefectKnowledge[];
  total: number;
  totalPages: number;
  page: number;
  limit: number;
}
