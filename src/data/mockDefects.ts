import { DefectKnowledge, DefectCategory, DefectImage } from "@/types/defect";
import defectsData from "./defects.json";

/**
 * Mock data for Defects Management System
 * Based on MX** DEFECT SUMMARY AND FACA format
 * Data is loaded from defects.json for easier maintenance
 */

// Type for the raw JSON data
interface DefectJsonData {
  id: string;
  failureMode: string;
  process: string;
  criteriaAcceptanceLimit: string;
  dri: string;
  category: string;
  failureAnalysisRootCause: string;
  correctiveAction: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy?: string;
  isActive: boolean;
}

/**
 * Transform JSON data to DefectKnowledge type with proper Date objects
 */
function transformDefectData(data: DefectJsonData[]): DefectKnowledge[] {
  console.log("transformDefectData: Transforming", data.length, "defects from JSON");
  
  return data.map((item) => ({
    ...item,
    category: item.category as DefectCategory,
    images: [] as DefectImage[], // Empty images array for now
    createdAt: new Date(item.createdAt),
    updatedAt: new Date(item.updatedAt),
  }));
}

// Export the transformed mock defects
export const mockDefects: DefectKnowledge[] = transformDefectData(
  defectsData as DefectJsonData[]
);

console.log("mockDefects loaded:", mockDefects.length, "defects");

/**
 * Helper function to search defects
 */
export function searchDefects(
  item?: string,
  category?: string,
  defect?: string
): DefectKnowledge[] {
  console.log("searchDefects called with:", { item, category, defect });
  
  let results = [...mockDefects];

  // Filter by item (failureMode)
  if (item) {
    const lowerItem = item.toLowerCase();
    results = results.filter(
      (d) => d.failureMode.toLowerCase().includes(lowerItem)
    );
  }

  // Filter by category (4M category or process)
  if (category) {
    const lowerCategory = category.toLowerCase();
    results = results.filter(
      (d) =>
        d.category.toLowerCase().includes(lowerCategory) ||
        d.process.toLowerCase().includes(lowerCategory)
    );
  }

  // Filter by defect (general search across all fields)
  if (defect) {
    const lowerDefect = defect.toLowerCase();
    results = results.filter(
      (d) =>
        d.failureMode.toLowerCase().includes(lowerDefect) ||
        d.process.toLowerCase().includes(lowerDefect) ||
        d.failureAnalysisRootCause.toLowerCase().includes(lowerDefect) ||
        d.correctiveAction.toLowerCase().includes(lowerDefect)
    );
  }

  console.log("searchDefects returning", results.length, "results");
  return results;
}

/**
 * Get defect by ID
 */
export function getDefectById(id: string): DefectKnowledge | undefined {
  console.log("getDefectById called with:", id);
  return mockDefects.find((defect) => defect.id === id);
}

/**
 * Get unique categories from defects
 */
export function getCategories(): DefectCategory[] {
  const categories = new Set(mockDefects.map((d) => d.category));
  return Array.from(categories);
}

/**
 * Get unique failure modes from defects
 */
export function getFailureModes(): string[] {
  const failureModes = new Set(mockDefects.map((d) => d.failureMode));
  return Array.from(failureModes);
}

/**
 * Get unique processes from defects
 */
export function getProcesses(): string[] {
  const processes = new Set(mockDefects.map((d) => d.process));
  return Array.from(processes);
}
