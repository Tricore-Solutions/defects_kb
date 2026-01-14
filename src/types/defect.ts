/**
 * Defects Management Types
 *
 * This module defines the data structures for the Defects Management system.
 * Based on MX** DEFECT SUMMARY AND FACA format.
 */

export interface DefectKnowledge {
  id: string;
  
  // Core identification
  failureMode: string;        // e.g., "Exposed Wire"
  process: string;            // e.g., "AL-Pet Laser Marking and Manual AL-Pet removal"
  processImages: string[];    // Array of image URLs for the process
  criteriaAcceptanceLimit: string;  // e.g., "AL-PH061"
  dri: string;                // DRI person responsible, e.g., "Yhel"
  
  // Category (4M analysis)
  category: DefectCategory;   // Machine, Man, Method, Material
  
  // Analysis
  failureAnalysisRootCause: string;  // Root cause description
  failureAnalysisImages: string[];   // Array of image URLs for failure analysis
  
  // Corrective Action
  correctiveAction: string;          // Corrective action to take
  correctiveActionImages: string[];  // Array of image URLs for corrective action
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy?: string;
  isActive: boolean;
}

export interface DefectImage {
  id: string;
  url: string;
  caption?: string;
}

// 4M Categories
export type DefectCategory = "MACHINE" | "MAN" | "METHOD" | "MATERIAL";

export const DEFECT_CATEGORIES: Record<DefectCategory, string> = {
  MACHINE: "Machine",
  MAN: "Man",
  METHOD: "Method",
  MATERIAL: "Material",
};

// Failure Modes
export type FailureMode = "EXPOSED_WIRE" | "OTHER";

export const FAILURE_MODES: Record<FailureMode, string> = {
  EXPOSED_WIRE: "Exposed Wire",
  OTHER: "Other",
};

// Processes
export const PROCESSES = [
  "AL-Pet Laser Marking and Manual AL-Pet removal",
  "Lowside Endstrip Process",
  "Ground Shell Assembly",
  "Soldering Process",
] as const;

export type ProcessType = (typeof PROCESSES)[number];

export interface DefectFormData {
  failureMode: string;
  process: string;
  processImages: string[];
  criteriaAcceptanceLimit: string;
  dri: string;
  category: DefectCategory;
  failureAnalysisRootCause: string;
  failureAnalysisImages: string[];
  correctiveAction: string;
  correctiveActionImages: string[];
  isActive: boolean;
}

export interface DefectSearchFilters {
  item?: string;      // Maps to failureMode
  category?: string;  // Maps to category or process
  defect?: string;    // General search term
  page: number;
  limit: number;
}

export interface PaginatedDefects {
  data: DefectKnowledge[];
  total: number;
  totalPages: number;
  page: number;
  limit: number;
}
