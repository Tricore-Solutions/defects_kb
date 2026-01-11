import { DefectKnowledge, DefectCategory, SeverityLevel } from "@/types/defect";

/**
 * Mock data for the Defects Management prototype
 * This data simulates what would come from a database
 */
export const mockDefects: DefectKnowledge[] = [
  {
    id: 1,
    code: "DK-001",
    name: "Solder Bridge",
    category: "PROCESS_DEFECT",
    severity: "CRITICAL",
    description:
      "Unintended connection between two or more solder joints, creating an electrical short circuit.",
    failureAnalysis:
      "Analysis revealed excessive solder paste application during stencil printing process. The solder paste volume exceeded specifications by 15-20%, causing adjacent pads to merge during reflow.",
    rootCause:
      "1. Stencil aperture size too large\n2. Excessive squeegee pressure\n3. Worn stencil causing paste bleeding",
    correctiveAction:
      "1. Replace stencil with correct aperture size (0.8:1 area ratio)\n2. Adjust squeegee pressure to 5-7 kg\n3. Implement stencil inspection every 500 prints\n4. Retrain operators on paste inspection criteria",
    preventiveAction:
      "Implement SPC monitoring on paste volume. Add automated optical inspection (AOI) checkpoint after reflow.",
    images: [
      {
        id: 1,
        defectId: 1,
        url: "/images/defects/solder-bridge-1.jpg",
        caption: "Example of solder bridge between IC pins",
        imageType: "defect",
        uploadedAt: new Date("2025-12-01"),
        uploadedBy: "John Doe",
      },
    ],
    applicableProducts: ["PCB Assembly", "SMT Components"],
    applicableProcesses: ["OP15 - 1st Side Process", "OP20 - 2nd Side Process"],
    relatedDefectCodes: ["SOLDER-001", "SMT-003"],
    createdAt: new Date("2025-11-15"),
    updatedAt: new Date("2025-12-20"),
    createdBy: "Quality Engineer A",
    updatedBy: "Quality Engineer B",
    isActive: true,
    occurrenceCount: 45,
    lastOccurrence: new Date("2025-12-18"),
  },
  {
    id: 2,
    code: "DK-002",
    name: "Wire Insulation Damage",
    category: "MATERIAL_DEFECT",
    severity: "MAJOR",
    description:
      "Physical damage to wire insulation causing exposed conductor, potential for short circuit or electrical hazard.",
    failureAnalysis:
      "Investigation found that the stripping machine blade was worn, causing irregular cuts and nicks in the insulation. Additionally, improper wire routing during assembly caused abrasion against sharp edges.",
    rootCause:
      "1. Worn stripping blade (exceeded 10,000 cycle limit)\n2. Sharp edges on cable routing fixtures\n3. Insufficient incoming material inspection",
    correctiveAction:
      "1. Replace stripping blade immediately\n2. Implement blade change schedule every 8,000 cycles\n3. Add edge guards to routing fixtures\n4. 100% visual inspection of affected lot",
    preventiveAction:
      "Add blade wear indicator to maintenance checklist. Design fixture modification to eliminate sharp edges.",
    images: [
      {
        id: 2,
        defectId: 2,
        url: "/images/defects/wire-damage-1.jpg",
        caption: "Insulation nick from worn blade",
        imageType: "defect",
        uploadedAt: new Date("2025-11-20"),
        uploadedBy: "Jane Smith",
      },
    ],
    applicableProducts: ["Wire Harness", "Cable Assembly"],
    applicableProcesses: ["OP10 - Cable Cutting", "OP30 - Taping Process"],
    relatedDefectCodes: ["WIRE-001", "CUT-002"],
    createdAt: new Date("2025-10-10"),
    updatedAt: new Date("2025-12-15"),
    createdBy: "Quality Engineer A",
    isActive: true,
    occurrenceCount: 23,
    lastOccurrence: new Date("2025-12-10"),
  },
  {
    id: 3,
    code: "DK-003",
    name: "Connector Pin Misalignment",
    category: "ASSEMBLY_DEFECT",
    severity: "CRITICAL",
    description:
      "Connector pins not properly aligned with housing, causing incomplete insertion or connection failure.",
    failureAnalysis:
      "Root cause analysis identified that the insertion tooling had shifted from its calibrated position. The pin insertion depth was 0.5mm shorter than specification, causing pins to sit at an angle.",
    rootCause:
      "1. Tooling fixture loosened during operation\n2. Missing torque verification on fixture bolts\n3. Operator skipped calibration check",
    correctiveAction:
      "1. Re-calibrate insertion tooling to specification\n2. Apply thread locker to fixture bolts\n3. Add go/no-go gauge check to work instruction\n4. Retrain all operators on calibration procedure",
    preventiveAction:
      "Implement daily calibration verification log. Add visual indicator for proper tool position.",
    images: [],
    applicableProducts: ["Connector Assembly", "Terminal Block"],
    applicableProcesses: ["OP15 - 1st Side Process"],
    relatedDefectCodes: ["CONN-001", "ASM-005"],
    createdAt: new Date("2025-09-05"),
    updatedAt: new Date("2025-12-01"),
    createdBy: "Quality Engineer C",
    updatedBy: "Quality Engineer A",
    isActive: true,
    occurrenceCount: 12,
    lastOccurrence: new Date("2025-11-28"),
  },
  {
    id: 4,
    code: "DK-004",
    name: "Label Peeling",
    category: "VISUAL_DEFECT",
    severity: "MINOR",
    description:
      "Product label lifting or peeling from surface, affecting product identification and traceability.",
    failureAnalysis:
      "Testing showed that the label adhesive was not compatible with the surface coating used on recent product batches. The new coating has a lower surface energy, reducing adhesion.",
    rootCause:
      "1. Surface coating formula changed without notification\n2. Label adhesive not tested against new coating\n3. No change management process for material changes",
    correctiveAction:
      "1. Switch to high-tack adhesive labels (3M 9472LE or equivalent)\n2. Add surface preparation step (IPA wipe) before labeling\n3. Communicate with supplier about coating changes",
    preventiveAction:
      "Establish material change notification agreement with suppliers. Add adhesion test to incoming inspection.",
    images: [
      {
        id: 3,
        defectId: 4,
        url: "/images/defects/label-peel-1.jpg",
        caption: "Label corner lifting from product surface",
        imageType: "defect",
        uploadedAt: new Date("2025-12-05"),
        uploadedBy: "John Doe",
      },
    ],
    applicableProducts: ["All Products"],
    applicableProcesses: ["OP40 - QC Sampling"],
    relatedDefectCodes: ["LABEL-001"],
    createdAt: new Date("2025-11-01"),
    updatedAt: new Date("2025-12-10"),
    createdBy: "Quality Engineer B",
    isActive: true,
    occurrenceCount: 67,
    lastOccurrence: new Date("2025-12-08"),
  },
  {
    id: 5,
    code: "DK-005",
    name: "Dimensional Out of Tolerance",
    category: "DIMENSIONAL_DEFECT",
    severity: "MAJOR",
    description:
      "Part dimensions exceed specified tolerance limits, causing assembly fit issues.",
    failureAnalysis:
      "CMM measurement revealed that the molded parts were 0.15mm oversized on critical dimensions. Analysis of molding parameters showed that the cooling time was reduced to increase throughput.",
    rootCause:
      "1. Reduced cooling time from 45s to 35s\n2. Mold temperature running 5°C above specification\n3. No process change approval obtained",
    correctiveAction:
      "1. Restore cooling time to 45 seconds\n2. Adjust mold temperature to 45°C ± 2°C\n3. Sort and measure 100% of affected production\n4. Issue NCR for unauthorized process change",
    preventiveAction:
      "Lock critical process parameters in machine controller. Require engineering approval for any parameter changes.",
    images: [],
    applicableProducts: ["Molded Components", "Housing Parts"],
    applicableProcesses: ["Injection Molding"],
    relatedDefectCodes: ["DIM-001", "MOLD-002"],
    createdAt: new Date("2025-08-20"),
    updatedAt: new Date("2025-11-30"),
    createdBy: "Quality Engineer A",
    isActive: true,
    occurrenceCount: 8,
    lastOccurrence: new Date("2025-11-15"),
  },
  {
    id: 6,
    code: "DK-006",
    name: "Tape Adhesion Failure",
    category: "PROCESS_DEFECT",
    severity: "MINOR",
    description:
      "Protective or bundling tape not adhering properly to wire harness, causing loose bundles.",
    failureAnalysis:
      "Investigation found that the tape application temperature was below the recommended range. Cold ambient conditions in the production area reduced tape tack.",
    rootCause:
      "1. Production area temperature dropped to 15°C (spec: 20-25°C)\n2. Tape stored in cold warehouse before use\n3. No temperature monitoring in production area",
    correctiveAction:
      "1. Install space heater to maintain 20°C minimum\n2. Store tape in climate-controlled area\n3. Allow tape to acclimate for 4 hours before use",
    preventiveAction:
      "Install temperature monitoring with alert system. Add temperature check to morning startup checklist.",
    images: [],
    applicableProducts: ["Wire Harness"],
    applicableProcesses: ["OP30 - Taping Process"],
    relatedDefectCodes: ["TAPE-001"],
    createdAt: new Date("2025-10-15"),
    updatedAt: new Date("2025-12-05"),
    createdBy: "Quality Engineer C",
    isActive: true,
    occurrenceCount: 34,
    lastOccurrence: new Date("2025-12-01"),
  },
  {
    id: 7,
    code: "DK-007",
    name: "Missing Component",
    category: "ASSEMBLY_DEFECT",
    severity: "CRITICAL",
    description:
      "Required component not installed in assembly, causing functional failure.",
    failureAnalysis:
      "Work station analysis revealed that the component bin was empty during the defect occurrence period. The kanban replenishment signal was not triggered due to sensor malfunction.",
    rootCause:
      "1. Bin level sensor failed (stuck in 'full' position)\n2. Operator did not notice empty bin\n3. No visual management for component levels",
    correctiveAction:
      "1. Replace bin level sensor\n2. Add redundant visual indicator (andon light)\n3. Implement mandatory bin check at shift start\n4. 100% functional test on affected units",
    preventiveAction:
      "Add sensor health check to daily maintenance. Implement poka-yoke to prevent assembly without component.",
    images: [
      {
        id: 4,
        defectId: 7,
        url: "/images/defects/missing-comp-1.jpg",
        caption: "Empty component location on PCB",
        imageType: "defect",
        uploadedAt: new Date("2025-12-12"),
        uploadedBy: "Jane Smith",
      },
    ],
    applicableProducts: ["PCB Assembly", "Electronic Modules"],
    applicableProcesses: ["OP15 - 1st Side Process", "OP20 - 2nd Side Process"],
    relatedDefectCodes: ["ASM-001", "MISS-001"],
    createdAt: new Date("2025-07-10"),
    updatedAt: new Date("2025-12-12"),
    createdBy: "Quality Engineer A",
    updatedBy: "Quality Engineer B",
    isActive: true,
    occurrenceCount: 5,
    lastOccurrence: new Date("2025-12-10"),
  },
  {
    id: 8,
    code: "DK-008",
    name: "Contamination - Foreign Material",
    category: "MATERIAL_DEFECT",
    severity: "MAJOR",
    description:
      "Foreign particles or substances found on product surface or within assembly.",
    failureAnalysis:
      "Particle analysis identified the contamination as metal shavings from a nearby machining operation. The particles were carried by air flow from the adjacent work area.",
    rootCause:
      "1. No physical barrier between machining and assembly areas\n2. Air flow pattern directing particles toward clean area\n3. Inadequate housekeeping in machining area",
    correctiveAction:
      "1. Install plastic curtain barrier between areas\n2. Redirect air flow away from assembly\n3. Implement 5S program in machining area\n4. Clean affected products with compressed air",
    preventiveAction:
      "Design permanent partition wall. Add particle counter monitoring in assembly area.",
    images: [],
    applicableProducts: ["All Products"],
    applicableProcesses: ["All Operations"],
    relatedDefectCodes: ["CONT-001", "CLEAN-001"],
    createdAt: new Date("2025-06-01"),
    updatedAt: new Date("2025-11-20"),
    createdBy: "Quality Engineer B",
    isActive: true,
    occurrenceCount: 19,
    lastOccurrence: new Date("2025-11-18"),
  },
];

/**
 * Get all unique categories from mock data
 */
export function getCategories(): DefectCategory[] {
  const categories = new Set(mockDefects.map((d) => d.category));
  return Array.from(categories);
}

/**
 * Get all unique severity levels from mock data
 */
export function getSeverityLevels(): SeverityLevel[] {
  const severities = new Set(mockDefects.map((d) => d.severity));
  return Array.from(severities);
}

/**
 * Search and filter defects
 */
export function searchDefects(
  search?: string,
  category?: DefectCategory,
  severity?: SeverityLevel,
  isActive?: boolean
): DefectKnowledge[] {
  console.log("searchDefects: Filtering with params:", {
    search,
    category,
    severity,
    isActive,
  });

  let results = [...mockDefects];

  if (search) {
    const searchLower = search.toLowerCase();
    results = results.filter(
      (d) =>
        d.name.toLowerCase().includes(searchLower) ||
        d.code.toLowerCase().includes(searchLower) ||
        d.description.toLowerCase().includes(searchLower) ||
        d.rootCause.toLowerCase().includes(searchLower) ||
        d.correctiveAction.toLowerCase().includes(searchLower)
    );
  }

  if (category) {
    results = results.filter((d) => d.category === category);
  }

  if (severity) {
    results = results.filter((d) => d.severity === severity);
  }

  if (isActive !== undefined) {
    results = results.filter((d) => d.isActive === isActive);
  }

  console.log("searchDefects: Found", results.length, "results");
  return results;
}

/**
 * Get a single defect by ID
 */
export function getDefectById(id: number): DefectKnowledge | undefined {
  console.log("getDefectById: Looking for ID:", id);
  return mockDefects.find((d) => d.id === id);
}

/**
 * Get a single defect by code
 */
export function getDefectByCode(code: string): DefectKnowledge | undefined {
  console.log("getDefectByCode: Looking for code:", code);
  return mockDefects.find((d) => d.code === code);
}
