# Database Schema Documentation

## Defects Management System

## Version: 2.0

---

## 1. Overview

This document describes the data schema for the Defects Management System. The schema is designed based on the DMF (Defect Mode and Failure analysis) format used in manufacturing quality documentation.

---

## 2. Current Implementation

The system currently uses JSON-based mock data for the prototype phase. The schema below represents the data structure used.

---

## 3. Data Model

### 3.1 DefectKnowledge (Main Entity)

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | string | Yes | Unique identifier |
| failureMode | string | Yes | Failure mode name (e.g., "Exposed Wire") |
| process | string | Yes | Process name where defect occurs |
| processImages | string[] | Yes | Array of image URLs for process |
| criteriaAcceptanceLimit | string | Yes | Acceptance criteria code (e.g., "AL-PH061") |
| dri | string | Yes | Direct Responsible Individual |
| category | DefectCategory | Yes | 4M category classification |
| failureAnalysisRootCause | string | Yes | Root cause analysis description |
| failureAnalysisImages | string[] | Yes | Array of image URLs for failure analysis |
| correctiveAction | string | Yes | Corrective action steps |
| correctiveActionImages | string[] | Yes | Array of image URLs for corrective action |
| createdAt | Date | Yes | Creation timestamp |
| updatedAt | Date | Yes | Last update timestamp |
| createdBy | string | Yes | Creator name |
| updatedBy | string | No | Last updater name |
| isActive | boolean | Yes | Active status (default: true) |

### 3.2 DefectCategory (Enum)

4M Analysis categories for root cause classification:

| Value | Display Name | Description |
|-------|--------------|-------------|
| MACHINE | Machine | Equipment or tool-related causes |
| MAN | Man | Human error or operator-related causes |
| METHOD | Method | Process or procedure-related causes |
| MATERIAL | Material | Raw material or component-related causes |

---

## 4. TypeScript Interfaces

### 4.1 DefectKnowledge Interface

```typescript
export interface DefectKnowledge {
  id: string;
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
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy?: string;
  isActive: boolean;
}
```

### 4.2 DefectCategory Type

```typescript
export type DefectCategory = "MACHINE" | "MAN" | "METHOD" | "MATERIAL";

export const DEFECT_CATEGORIES: Record<DefectCategory, string> = {
  MACHINE: "Machine",
  MAN: "Man",
  METHOD: "Method",
  MATERIAL: "Material",
};
```

### 4.3 DefectFormData Interface

```typescript
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
```

---

## 5. JSON Data Structure

### 5.1 Sample Record

```json
{
  "id": "1",
  "failureMode": "Exposed Wire",
  "process": "AL-Pet Laser Marking and Manual AL-Pet removal",
  "processImages": ["/defects/row1-img1.png"],
  "criteriaAcceptanceLimit": "AL-PH061",
  "dri": "Yhel",
  "category": "MACHINE",
  "failureAnalysisRootCause": "AL-Pet laser marking penetrate the insulation causing for initial damage and resulted to expose wire at soldering process.",
  "failureAnalysisImages": ["/defects/row1-2-fail1.png"],
  "correctiveAction": "Adjust the laser power setting to prevent insulation damage.",
  "correctiveActionImages": [],
  "createdAt": "2026-01-14",
  "updatedAt": "2026-01-14",
  "createdBy": "Quality Engineer",
  "isActive": true
}
```

### 5.2 Data File Location

```
src/data/defects.json
```

---

## 6. Search Functionality

### 6.1 Search Function Signature

```typescript
export function searchDefects(
  item?: string,      // Search in failureMode
  category?: string,  // Search in category or process
  defect?: string,    // General search term
  keyword?: string    // Global keyword search
): DefectKnowledge[]
```

### 6.2 Keyword Search Fields

The keyword search searches across:
- failureMode
- process
- failureAnalysisRootCause
- correctiveAction
- criteriaAcceptanceLimit
- dri
- category

---

## 7. Image Storage

### 7.1 Current Implementation

Images are stored as static files in the public directory:

```
public/defects/
  ├── row1-img1.png
  ├── row1-2-fail1.png
  ├── row2-fail1.png
  ├── row3-img1.png
  ├── row3-img2.png
  ├── row3-img3.png
  ├── row3-fail1.png
  ├── row3-fail2.png
  ├── row3-corrective1.png
  └── ...
```

### 7.2 Image URL Format

Images are referenced by their public path:
- `/defects/row1-img1.png`
- `/defects/row3-corrective1.png`

---

## 8. Future Database Schema (SQL)

### 8.1 defects Table

```sql
CREATE TABLE defects (
    id VARCHAR(36) PRIMARY KEY,
    failure_mode VARCHAR(255) NOT NULL,
    process VARCHAR(500) NOT NULL,
    criteria_acceptance_limit VARCHAR(50) NOT NULL,
    dri VARCHAR(100) NOT NULL,
    category ENUM('MACHINE', 'MAN', 'METHOD', 'MATERIAL') NOT NULL,
    failure_analysis_root_cause TEXT NOT NULL,
    corrective_action TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by VARCHAR(100) NOT NULL,
    updated_by VARCHAR(100),
    is_active BOOLEAN DEFAULT TRUE,
    
    INDEX idx_category (category),
    INDEX idx_is_active (is_active),
    FULLTEXT INDEX idx_search (failure_mode, process, failure_analysis_root_cause, corrective_action)
) ENGINE=InnoDB;
```

### 8.2 defect_images Table

```sql
CREATE TABLE defect_images (
    id VARCHAR(36) PRIMARY KEY,
    defect_id VARCHAR(36) NOT NULL,
    url VARCHAR(500) NOT NULL,
    image_type ENUM('process', 'failure_analysis', 'corrective_action') NOT NULL,
    sort_order INT DEFAULT 0,
    uploaded_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_defect_id (defect_id),
    FOREIGN KEY (defect_id) REFERENCES defects(id) ON DELETE CASCADE
) ENGINE=InnoDB;
```

---

## 9. Data Migration

### 9.1 From Excel/DMF Files

The data is sourced from DMF Excel files with the following column mapping:

| Excel Column | JSON Field |
|--------------|------------|
| Failure Mode | failureMode |
| Process | process |
| Process Images | processImages |
| Criteria / Acceptance Limit | criteriaAcceptanceLimit |
| DRI | dri |
| Category | category |
| Failure Analysis / Root Cause | failureAnalysisRootCause |
| FA Images | failureAnalysisImages |
| Corrective Action | correctiveAction |
| CA Images | correctiveActionImages |

### 9.2 Key Principle

Each row of data represents a unique failure analysis/root cause. Multiple rows may share the same failure mode but have different root causes and corrective actions.

---

## 10. Validation Rules

### 10.1 Required Fields

All fields except `updatedBy` are required for a valid defect record.

### 10.2 Field Constraints

| Field | Constraint |
|-------|------------|
| id | Unique, non-empty string |
| failureMode | Non-empty string |
| process | Non-empty string |
| processImages | Array (can be empty) |
| criteriaAcceptanceLimit | Non-empty string |
| dri | Non-empty string |
| category | Must be valid DefectCategory |
| failureAnalysisRootCause | Non-empty string |
| failureAnalysisImages | Array (can be empty) |
| correctiveAction | Non-empty string |
| correctiveActionImages | Array (can be empty) |
