"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  BookOpen,
  Palette,
  Database,
  GitBranch,
  Code,
  Users,
  ChevronRight,
} from "lucide-react";

// Documentation content - embedded for prototype
const docs = {
  readme: {
    title: "Documentation Index",
    icon: BookOpen,
    version: "2.0",
    content: `# Documentation Index

## Defects Management System

This folder contains all documentation for the Defects Management System.

---

## Documents

| Document | Description |
|----------|-------------|
| **PRD** | Product Requirements - Features, roadmap, specifications |
| **DRD** | Design Requirements - UI/UX specifications, colors, components |
| **Database Schema** | Data model and schema documentation |
| **User Guide** | How to use the system |

---

## Quick Reference

### System Overview

The Defects Management System is a web application for managing manufacturing defect information based on DMF (Defect Mode and Failure analysis) format.

### Key Features

- **Dashboard Search** - Simple three-field search interface
- **DataTable** - Professional sortable, paginated defects list
- **Responsive Design** - Table view on desktop, cards on mobile
- **Keyword Search** - Global search from navigation header
- **Image Viewer** - Clickable images with modal display
- **4M Categories** - Machine, Man, Method, Material classification

### Data Structure

Each defect record contains:
- Failure Mode
- Process (with images)
- Criteria / Acceptance Limit
- DRI (Direct Responsible Individual)
- Category (4M)
- Failure Analysis / Root Cause (with images)
- Corrective Action (with images)

### Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui
- Lucide React icons`,
  },
  prd: {
    title: "Product Requirements",
    icon: FileText,
    version: "2.0",
    content: `# Product Requirement Document (PRD)

## Product Name: Defects Management System

## Version: 2.0

---

## Introduction

The Defects Management System is a web-based application designed to serve as a centralized repository for manufacturing defect information based on DMF (Defect Mode and Failure analysis) format.

---

## Problem Statement

Manufacturing teams face several challenges when encountering defects:

1. **Knowledge Silos**: Investigation results stored in scattered Excel files
2. **Slow Response Time**: Operators spend time searching for information
3. **Inconsistent Actions**: Corrective actions vary between shifts
4. **Lost Institutional Knowledge**: Knowledge lost when engineers leave
5. **Repeated Investigations**: Similar defects investigated multiple times

---

## Solution Overview

A searchable, user-friendly web application that:

- Provides instant access to defect information via keyword search
- Documents failure modes with DMF-format structure
- Offers clear corrective actions with visual references
- Includes multiple image types (process, failure analysis, corrective action)
- Supports 4M category classification for root cause analysis

---

## Target Users

### Primary Users

1. **Production Operators** - Quick reference when defects are encountered
2. **Line Supervisors** - Verify correct actions are being taken

### Secondary Users

3. **Quality Engineers** - Document new failure modes
4. **Process Engineers** - Reference root cause analysis

---

## Key Features

### 1. Dashboard Search Interface
- Three-field search form: Item, Category, Defect
- Direct navigation to filtered defects list

### 2. Defect DataTable
- Sortable columns (Failure Mode, Process, Criteria, DRI, Category)
- Pagination with configurable items per page (5, 10, 25, 50)
- Responsive design (table on desktop, cards on mobile)
- Inline images below descriptions
- Clickable images with modal viewer

### 3. Keyword Search
- Global keyword search from navigation header
- Search on blur or Enter key
- URL-based search parameters
- Visual badge showing active search term

### 4. Defect Detail View
- Process Details section with images
- Failure Analysis / Root Cause section with images
- Corrective Action section with images
- All images clickable for full-size viewing

---

## Data Model

### DefectKnowledge Fields

| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique identifier |
| failureMode | string | e.g., "Exposed Wire" |
| process | string | Process name |
| processImages | string[] | Process image URLs |
| criteriaAcceptanceLimit | string | e.g., "AL-PH061" |
| dri | string | Responsible person |
| category | enum | MACHINE, MAN, METHOD, MATERIAL |
| failureAnalysisRootCause | string | Root cause description |
| failureAnalysisImages | string[] | Evidence images |
| correctiveAction | string | Steps to resolve |
| correctiveActionImages | string[] | Reference images |

### 4M Categories

| Category | Description |
|----------|-------------|
| MACHINE | Equipment or tool-related causes |
| MAN | Human error or operator-related causes |
| METHOD | Process or procedure-related causes |
| MATERIAL | Raw material or component-related causes |

---

## Roadmap

### Phase 1: MVP (Current) ✅
- Dashboard search interface
- DataTable with sorting and pagination
- Responsive design
- Defect detail view
- Add/Edit forms
- Keyword search
- Clickable images with modal

### Phase 2: Enhancement
- User authentication
- Image upload
- Export functionality

### Phase 3: Integration
- Database backend
- API development
- P-Chart System integration`,
  },
  drd: {
    title: "Design Requirements",
    icon: Palette,
    version: "2.0",
    content: `# Design Requirement Document (DRD)

## Defects Management System - Version: 2.0

---

## Design Principles

### Consistency
- Use standardized components across all pages
- Follow established color and typography patterns
- Consistent rounded corners (rounded-lg) throughout

### Clarity
- Information should be easy to scan and understand
- Critical information prominently displayed
- Use visual hierarchy to guide user attention

### Responsiveness
- Desktop: Full DataTable view (lg breakpoint: 1024px+)
- Mobile/Tablet: Card layout view

---

## Color Specification

### Primary Colors

| Color Name | Hex Code | Usage |
|------------|----------|-------|
| Primary | #7C3AED | Brand color, primary actions |
| Purple-50 | #FAF5FF | Hover backgrounds, accents |
| Purple-100 | #F3E8FF | Active states, badges |
| Purple-600 | #9333EA | Buttons, links |
| Purple-700 | #7E22CE | Button hover |

### Category Badge Colors (4M)

| Category | Badge Variant | Background | Text |
|----------|---------------|------------|------|
| MACHINE | info | bg-blue-100 | text-blue-800 |
| MAN | warning | bg-yellow-100 | text-yellow-800 |
| METHOD | secondary | bg-gray-100 | text-gray-800 |
| MATERIAL | outline | bg-white | text-gray-800 |

### Special Colors

| Element | Background | Text |
|---------|------------|------|
| Criteria/Acceptance Limit | bg-red-50 | text-red-900 |
| Criteria Badge | bg-red-100 | text-red-700 |

---

## Component Specifications

### DataTable

**Table Container**
- Background: bg-white
- Border Radius: rounded-lg
- Shadow: shadow-md

**Table Header**
- Background: bg-gradient-to-r from-gray-50 to-gray-100
- Sortable headers: cursor-pointer hover:bg-gray-100

**Table Row**
- Alternating: odd:bg-white even:bg-gray-50/30
- Hover: hover:bg-purple-50/50

### Pagination

**Page Buttons**
- Size: h-9 w-9
- Active: bg-purple-600 text-white
- Inactive: variant="outline"

### Mobile Card Layout

**Card Structure**
- Border Left: border-l-4 border-l-purple-500
- Hover: hover:shadow-lg transition-shadow
- Header: bg-gradient-to-r from-purple-50 to-white

### Image Grid

**Image Container**
- Aspect Ratio: aspect-video
- Border Radius: rounded-lg
- Hover: hover:ring-2 hover:ring-purple-400

**Image Modal**
- Background: bg-black/90
- Max Width: max-w-5xl
- Image: max-h-[85vh] object-contain

---

## Responsive Breakpoints

| Breakpoint | Width | Layout |
|------------|-------|--------|
| sm | 640px | Mobile landscape |
| md | 768px | Tablet |
| lg | 1024px | Desktop (table view) |
| xl | 1280px | Large desktop |

---

## Icons

Using **Lucide React** icon library:

| Purpose | Icon |
|---------|------|
| Search | Search |
| Add | PlusCircle |
| Edit | Pencil |
| View | Eye |
| Sort Asc | ArrowUp |
| Sort Desc | ArrowDown |
| Pagination | ChevronLeft/Right |`,
  },
  schema: {
    title: "Database Schema",
    icon: Database,
    version: "2.0",
    content: `# Database Schema Documentation

## Defects Management System - Version: 2.0

---

## Overview

This document describes the data schema for the Defects Management System. The schema is designed based on the DMF (Defect Mode and Failure analysis) format.

---

## Data Model

### DefectKnowledge (Main Entity)

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | string | Yes | Unique identifier |
| failureMode | string | Yes | Failure mode name |
| process | string | Yes | Process name |
| processImages | string[] | Yes | Image URLs for process |
| criteriaAcceptanceLimit | string | Yes | Acceptance criteria code |
| dri | string | Yes | Direct Responsible Individual |
| category | DefectCategory | Yes | 4M category |
| failureAnalysisRootCause | string | Yes | Root cause description |
| failureAnalysisImages | string[] | Yes | Image URLs for FA |
| correctiveAction | string | Yes | Corrective action steps |
| correctiveActionImages | string[] | Yes | Image URLs for CA |
| createdAt | Date | Yes | Creation timestamp |
| updatedAt | Date | Yes | Update timestamp |
| createdBy | string | Yes | Creator name |
| isActive | boolean | Yes | Active status |

### DefectCategory (Enum)

| Value | Display Name | Description |
|-------|--------------|-------------|
| MACHINE | Machine | Equipment-related causes |
| MAN | Man | Human error causes |
| METHOD | Method | Process-related causes |
| MATERIAL | Material | Material-related causes |

---

## TypeScript Interface

\`\`\`typescript
interface DefectKnowledge {
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
  isActive: boolean;
}
\`\`\`

---

## JSON Sample Record

\`\`\`json
{
  "id": "1",
  "failureMode": "Exposed Wire",
  "process": "AL-Pet Laser Marking",
  "processImages": ["/defects/row1-img1.png"],
  "criteriaAcceptanceLimit": "AL-PH061",
  "dri": "Yhel",
  "category": "MACHINE",
  "failureAnalysisRootCause": "Laser power too high...",
  "failureAnalysisImages": ["/defects/row1-fail1.png"],
  "correctiveAction": "Adjust laser settings...",
  "correctiveActionImages": [],
  "createdAt": "2026-01-14",
  "updatedAt": "2026-01-14",
  "createdBy": "Quality Engineer",
  "isActive": true
}
\`\`\`

---

## Image Storage

Images are stored in: \`public/defects/\`

Naming convention:
- \`row{n}-img{n}.png\` - Process images
- \`row{n}-fail{n}.png\` - Failure analysis images
- \`row{n}-corrective{n}.png\` - Corrective action images

---

## Search Fields

Keyword search covers:
- failureMode
- process
- failureAnalysisRootCause
- correctiveAction
- criteriaAcceptanceLimit
- dri
- category`,
  },
  userguide: {
    title: "User Guide",
    icon: Users,
    version: "2.0",
    content: `# User Guide

## Defects Management System - Version: 2.0

---

## Getting Started

### Accessing the System

1. Open your web browser (Chrome, Firefox, Safari, or Edge)
2. Navigate to the system URL
3. The Dashboard search interface will be displayed

### Navigation

| Menu Item | Description |
|-----------|-------------|
| Dashboard | Home page with search interface |
| Defects Management | Browse and search all defects |
| Add New | Create a new defect record |
| Settings | System configuration |

---

## Dashboard Search

### Search Form Fields

| Field | Description | Example |
|-------|-------------|---------|
| Item | Search by failure mode | "Exposed Wire" |
| Category | Search by 4M category | "Machine" |
| Defect | General search term | "laser" |

### Using the Search

1. Enter your search terms
2. Click "Search" button
3. View filtered results in DataTable

---

## Defects DataTable

### Desktop View (Table)

Columns displayed:
- **Failure Mode** - Name of defect (sortable)
- **Process** - Where defect occurs (sortable)
- **Criteria** - Acceptance limit code (sortable)
- **DRI** - Responsible person (sortable)
- **Category** - 4M classification (sortable)
- **Failure Analysis** - Root cause with images
- **Corrective Action** - Fix steps with images
- **Actions** - View/Edit buttons

### Mobile View (Cards)

On smaller screens, defects display as cards with:
- Header with failure mode and process
- Category, criteria, and DRI badges
- Expandable sections for images

### Sorting

Click column headers to sort:
1. First click: Ascending ↑
2. Second click: Descending ↓
3. Third click: Clear sort

### Pagination

- Navigate with First/Prev/Next/Last buttons
- Select items per page: 5, 10, 25, or 50

---

## Viewing Defect Details

### Page Sections

**Process Details**
- Process name and images

**Failure Analysis / Root Cause**
- Description and evidence images

**Corrective Action**
- Steps and reference images

### Viewing Images

Click any image to open full-size modal view.

---

## Understanding 4M Categories

| Category | Description | Badge Color |
|----------|-------------|-------------|
| MACHINE | Equipment issues | Blue |
| MAN | Operator errors | Yellow |
| METHOD | Process issues | Gray |
| MATERIAL | Material defects | White |

---

## Tips

### Searching
- Use specific keywords
- Try different terms if no results
- Clear filters to see all defects

### Documentation
- Include clear descriptions
- Add relevant images
- Keep corrective actions actionable`,
  },
};

type DocKey = keyof typeof docs;

export default function DocsPage() {
  const [activeDoc, setActiveDoc] = useState<DocKey>("readme");

  console.log("DocsPage: Rendering documentation viewer");

  const docList: { key: DocKey; title: string; icon: typeof FileText }[] = [
    { key: "readme", title: "Overview", icon: BookOpen },
    { key: "prd", title: "Product Requirements", icon: FileText },
    { key: "drd", title: "Design Requirements", icon: Palette },
    { key: "schema", title: "Database Schema", icon: Database },
    { key: "userguide", title: "User Guide", icon: Users },
  ];

  const currentDoc = docs[activeDoc];
  const IconComponent = currentDoc.icon;

  // Simple markdown-like rendering
  const renderContent = (content: string) => {
    const lines = content.split("\n");
    const elements: React.ReactNode[] = [];
    let inTable = false;
    let tableRows: string[] = [];
    let inCodeBlock = false;
    let codeLines: string[] = [];
    let codeLanguage = "";

    const processTable = (rows: string[]) => {
      if (rows.length < 2) return null;
      const headers = rows[0].split("|").filter((h) => h.trim());
      const dataRows = rows.slice(2); // Skip header and separator

      return (
        <div className="overflow-x-auto my-4">
          <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                {headers.map((header, i) => (
                  <th
                    key={i}
                    className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b"
                  >
                    {header.trim()}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dataRows.map((row, i) => {
                const cells = row.split("|").filter((c) => c.trim());
                return (
                  <tr
                    key={i}
                    className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}
                  >
                    {cells.map((cell, j) => (
                      <td
                        key={j}
                        className="px-4 py-2 text-sm text-gray-600 border-b"
                      >
                        {cell.trim().replace(/\*\*/g, "")}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    };

    lines.forEach((line, index) => {
      // Code block handling
      if (line.startsWith("```")) {
        if (inCodeBlock) {
          elements.push(
            <pre
              key={index}
              className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-4 text-sm"
            >
              <code>{codeLines.join("\n")}</code>
            </pre>
          );
          codeLines = [];
          inCodeBlock = false;
        } else {
          inCodeBlock = true;
          codeLanguage = line.replace("```", "").trim();
        }
        return;
      }

      if (inCodeBlock) {
        codeLines.push(line);
        return;
      }

      // Table handling
      if (line.startsWith("|")) {
        if (!inTable) {
          inTable = true;
          tableRows = [];
        }
        tableRows.push(line);
        return;
      } else if (inTable) {
        const table = processTable(tableRows);
        if (table) elements.push(<div key={`table-${index}`}>{table}</div>);
        inTable = false;
        tableRows = [];
      }

      // Headers
      if (line.startsWith("# ")) {
        elements.push(
          <h1
            key={index}
            className="text-2xl font-bold text-gray-900 mt-6 mb-4"
          >
            {line.replace("# ", "")}
          </h1>
        );
      } else if (line.startsWith("## ")) {
        elements.push(
          <h2
            key={index}
            className="text-xl font-semibold text-gray-800 mt-6 mb-3 pb-2 border-b border-gray-200"
          >
            {line.replace("## ", "")}
          </h2>
        );
      } else if (line.startsWith("### ")) {
        elements.push(
          <h3
            key={index}
            className="text-lg font-semibold text-gray-700 mt-4 mb-2"
          >
            {line.replace("### ", "")}
          </h3>
        );
      } else if (line.startsWith("#### ")) {
        elements.push(
          <h4 key={index} className="text-base font-semibold text-gray-700 mt-3 mb-1">
            {line.replace("#### ", "")}
          </h4>
        );
      }
      // Horizontal rule
      else if (line.startsWith("---")) {
        elements.push(<hr key={index} className="my-6 border-gray-200" />);
      }
      // List items
      else if (line.startsWith("- ")) {
        const text = line.replace("- ", "");
        elements.push(
          <li key={index} className="ml-4 text-gray-600 my-1 list-disc list-inside">
            {text.split("**").map((part, i) =>
              i % 2 === 1 ? (
                <strong key={i} className="font-semibold text-gray-800">
                  {part}
                </strong>
              ) : (
                part
              )
            )}
          </li>
        );
      }
      // Numbered list
      else if (/^\d+\.\s/.test(line)) {
        const text = line.replace(/^\d+\.\s/, "");
        elements.push(
          <li key={index} className="ml-4 text-gray-600 my-1 list-decimal list-inside">
            {text.split("**").map((part, i) =>
              i % 2 === 1 ? (
                <strong key={i} className="font-semibold text-gray-800">
                  {part}
                </strong>
              ) : (
                part
              )
            )}
          </li>
        );
      }
      // Empty line
      else if (line.trim() === "") {
        elements.push(<div key={index} className="h-2" />);
      }
      // Regular paragraph
      else {
        elements.push(
          <p key={index} className="text-gray-600 my-2 leading-relaxed">
            {line.split("**").map((part, i) =>
              i % 2 === 1 ? (
                <strong key={i} className="font-semibold text-gray-800">
                  {part}
                </strong>
              ) : (
                part
              )
            )}
          </p>
        );
      }
    });

    // Handle remaining table
    if (inTable && tableRows.length > 0) {
      const table = processTable(tableRows);
      if (table) elements.push(<div key="final-table">{table}</div>);
    }

    return elements;
  };

  return (
    <DashboardLayout>
      <div className="py-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Documentation</h1>
        <p className="text-gray-600 mb-6">System documentation for clients and developers</p>
      </div>
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:w-64 flex-shrink-0">
          <Card className="sticky top-24">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-purple-600" />
                Documents
              </CardTitle>
            </CardHeader>
            <CardContent className="p-2">
              <nav className="space-y-1">
                {docList.map((doc) => {
                  const Icon = doc.icon;
                  const isActive = activeDoc === doc.key;
                  return (
                    <button
                      key={doc.key}
                      onClick={() => setActiveDoc(doc.key)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        isActive
                          ? "bg-purple-100 text-purple-700"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <Icon className={`h-4 w-4 ${isActive ? "text-purple-600" : "text-gray-400"}`} />
                      <span className="text-sm font-medium">{doc.title}</span>
                      {isActive && (
                        <ChevronRight className="h-4 w-4 ml-auto text-purple-600" />
                      )}
                    </button>
                  );
                })}
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <Card>
            <CardHeader className="border-b bg-gradient-to-r from-purple-50 to-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <IconComponent className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{currentDoc.title}</CardTitle>
                    <p className="text-sm text-gray-500 mt-1">
                      Defects Management System Documentation
                    </p>
                  </div>
                </div>
                <Badge variant="secondary" className="text-xs">
                  v{currentDoc.version}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6 lg:p-8">
              <div className="prose prose-gray max-w-none">
                {renderContent(currentDoc.content)}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
