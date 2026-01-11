import { DefectKnowledge, DefectCategory, SeverityLevel, DefectImage } from "@/types/defect";
import defectsData from "./defects.json";

/**
 * Mock data for Defects Management System
 * Based on actual defects from P-Chart master_defects table
 * Data is loaded from defects.json for easier maintenance
 */

// Type for the raw JSON data
interface DefectJsonData {
  id: string;
  code: string;
  name: string;
  category: string;
  severity: string;
  description: string;
  failureAnalysis: string;
  rootCause: string;
  correctiveAction: string;
  preventiveAction: string;
  images: string[];
  applicableProducts: string[];
  applicableProcesses: string[];
  relatedDefectCodes: string[];
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
  isActive: boolean;
  occurrenceCount: number;
}

/**
 * Transform JSON data to DefectKnowledge type with proper Date objects
 */
function transformDefectData(data: DefectJsonData[]): DefectKnowledge[] {
  console.log("transformDefectData: Transforming", data.length, "defects from JSON");
  
  return data.map((item) => ({
    ...item,
    category: item.category as DefectCategory,
    severity: item.severity as SeverityLevel,
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
  query?: string,
  category?: DefectCategory,
  severity?: SeverityLevel,
  isActive?: boolean
): DefectKnowledge[] {
  console.log("searchDefects called with:", { query, category, severity, isActive });
  
  let results = [...mockDefects];

  if (query) {
    const lowerQuery = query.toLowerCase();
    results = results.filter(
      (defect) =>
        defect.name.toLowerCase().includes(lowerQuery) ||
        defect.code.toLowerCase().includes(lowerQuery) ||
        defect.description.toLowerCase().includes(lowerQuery) ||
        defect.rootCause.toLowerCase().includes(lowerQuery) ||
        defect.correctiveAction.toLowerCase().includes(lowerQuery)
    );
  }

  if (category) {
    results = results.filter((defect) => defect.category === category);
  }

  if (severity) {
    results = results.filter((defect) => defect.severity === severity);
  }

  if (isActive !== undefined) {
    results = results.filter((defect) => defect.isActive === isActive);
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
 * Get unique severity levels from defects
 */
export function getSeverityLevels(): SeverityLevel[] {
  const severities = new Set(mockDefects.map((d) => d.severity));
  return Array.from(severities);
}
