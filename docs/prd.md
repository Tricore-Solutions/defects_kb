# Product Requirement Document (PRD)

## Product Name: Defects Management System

## Version: 2.0

---

## Introduction

The Defects Management System is a web-based application designed to serve as a centralized repository for manufacturing defect information based on DMF (Defect Mode and Failure analysis) format. It provides manufacturing teams with quick access to documented failure modes, root cause analysis, and corrective actions.

The system uses a simplified data structure aligned with manufacturing DMF documentation standards, featuring 4M category analysis (Machine, Man, Method, Material).

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

1. **Production Operators**
   - Need quick reference when defects are encountered
   - Require clear corrective actions with visual guides

2. **Line Supervisors**
   - Verify correct actions are being taken
   - Access root cause analysis for decision making

### Secondary Users

3. **Quality Engineers**
   - Document new failure modes and investigation results
   - Update existing records with new findings

4. **Process Engineers**
   - Reference root cause analysis for process improvements

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

### 5. Defect Management
- Add new defect with DMF-format fields
- Edit existing defect
- Manage images per section

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
| createdAt | Date | Creation timestamp |
| updatedAt | Date | Update timestamp |
| createdBy | string | Creator name |
| isActive | boolean | Active status |

### 4M Categories

| Category | Description |
|----------|-------------|
| MACHINE | Equipment or tool-related causes |
| MAN | Human error or operator-related causes |
| METHOD | Process or procedure-related causes |
| MATERIAL | Raw material or component-related causes |

---

## Technical Requirements

### Platform
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui components

### Current Implementation
- Mock data (JSON file)
- Client-side filtering and pagination
- Static image hosting

---

## Roadmap

### Phase 1: MVP (Current)
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
- P-Chart System integration

---

## Glossary

| Term | Definition |
|------|------------|
| Failure Mode | A specific way a product or process can fail |
| Root Cause | The fundamental reason for a defect |
| Corrective Action | Steps to eliminate the cause of a defect |
| DMF | Defect Mode and Failure analysis format |
| 4M | Machine, Man, Method, Material categories |
| DRI | Direct Responsible Individual |
