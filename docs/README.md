# Documentation Index

## Defects Management System

This folder contains all documentation for the Defects Management System.

---

## Documents

| Document | Description | Last Updated |
|----------|-------------|--------------|
| [PRD](./prd.md) | Product Requirements Document - Features, roadmap, and specifications | v2.0 |
| [DRD](./drd.md) | Design Requirements Document - UI/UX specifications, colors, components | v2.0 |
| [Database Schema](./database-schema.md) | Data model and schema documentation | v2.0 |
| [Process Flow](./process-flow.md) | User workflows and data flows | v1.0 |
| [API Specification](./api-specification.md) | REST API endpoints (future) | v1.0 |
| [User Guide](./user-guide.md) | How to use the system | v2.0 |

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
- Lucide React icons

---

## Getting Started

1. Read the [User Guide](./user-guide.md) to understand how to use the system
2. Review the [PRD](./prd.md) for feature details
3. Check the [DRD](./drd.md) for design specifications
4. See [Database Schema](./database-schema.md) for data model details

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 2.0 | 2026-01-15 | DMF-based data model, DataTable, responsive design |
| 1.0 | 2026-01-14 | Initial documentation |
