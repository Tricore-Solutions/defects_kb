# Defects Management System

A web-based application for managing manufacturing defect information based on DMF (Defect Mode and Failure analysis) format, providing investigation results and corrective actions.

## Overview

The Defects Management System provides manufacturing teams with:
- 🔍 **Searchable defect database** - Quick keyword search across all defect records
- 📋 **DMF-based structure** - Failure modes, processes, root cause analysis, and corrective actions
- 🔧 **4M Category analysis** - Machine, Man, Method, Material classification
- 📸 **Visual references** - Process images, failure analysis images, and corrective action images
- 📊 **Professional DataTable** - Sortable, paginated, responsive data display

## Features

### Dashboard
- Simple search interface with three input fields (Item, Category, Defect)
- Quick navigation to defects list

### Defects DataTable
- **Sorting** - Click column headers to sort by Failure Mode, Process, Criteria, DRI, or Category
- **Pagination** - Navigate through pages with configurable items per page (5, 10, 25, 50)
- **Responsive design** - Table view on desktop, card layout on mobile/tablet
- **Keyword search** - Global search from navigation header
- **Clickable images** - View full-size images in modal

### Defect Detail View
- Process information with images
- Failure analysis / root cause with images
- Corrective action with images
- Quick actions (Edit, Back)

### Data Structure (DMF Format)
Each defect record contains:
- **Failure Mode** - e.g., "Exposed Wire"
- **Process** - e.g., "AL-Pet Laser Marking and Manual AL-Pet removal"
- **Process Images** - Visual references for the process
- **Criteria / Acceptance Limit** - e.g., "AL-PH061"
- **DRI** - Person responsible
- **Category** - 4M classification (Machine, Man, Method, Material)
- **Failure Analysis / Root Cause** - Investigation findings
- **Failure Analysis Images** - Evidence images
- **Corrective Action** - Steps to resolve
- **Corrective Action Images** - Reference images

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Navigate to project directory
cd defect_knowledge_base

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
defect_knowledge_base/
├── docs/                    # Documentation
│   ├── prd.md              # Product Requirements
│   ├── drd.md              # Design Requirements
│   ├── process-flow.md     # Process Flows
│   ├── database-schema.md  # Database Schema
│   ├── api-specification.md # API Specification
│   └── user-guide.md       # User Guide
├── src/
│   ├── app/                # Next.js App Router pages
│   │   ├── page.tsx        # Dashboard (Search)
│   │   ├── defects/        # Defect pages
│   │   │   ├── page.tsx    # DataTable list
│   │   │   ├── [id]/       # Detail & Edit
│   │   │   └── add/        # Add new defect
│   │   ├── design-guide/   # Design guide page
│   │   └── settings/       # Settings page
│   ├── components/
│   │   ├── layout/         # Layout components (Navigation, Footer)
│   │   └── ui/             # UI components (shadcn)
│   ├── data/               # Mock data (defects.json, mockDefects.ts)
│   ├── lib/                # Utilities
│   └── types/              # TypeScript types (defect.ts)
├── public/
│   └── defects/            # Defect images
└── files/                  # Source DMF files (Excel, images)
```

## Documentation

| Document | Description |
|----------|-------------|
| [PRD](./docs/prd.md) | Product requirements and roadmap |
| [DRD](./docs/drd.md) | Design specifications and guidelines |
| [Process Flow](./docs/process-flow.md) | User workflows and data flows |
| [Database Schema](./docs/database-schema.md) | Data structure |
| [API Specification](./docs/api-specification.md) | REST API endpoints |
| [User Guide](./docs/user-guide.md) | How to use the system |

## Pages

| Page | URL | Description |
|------|-----|-------------|
| Dashboard | `/` | Search interface |
| Defect List | `/defects` | DataTable with all defects |
| Defect Detail | `/defects/[id]` | View defect details |
| Add Defect | `/defects/add` | Create new defect |
| Edit Defect | `/defects/[id]/edit` | Edit existing defect |
| Design Guide | `/design-guide` | UI components reference |
| Settings | `/settings` | System configuration |

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React

## Styling

The application uses a purple-themed color palette:
- Primary: Purple (#7C3AED)
- Category badges: Info (Machine), Warning (Man), Secondary (Method), Outline (Material)
- Accent: Red highlights for Criteria/Acceptance Limit

See the [Design Guide](/design-guide) for full component reference.

## Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## Data Format

The system uses DMF (Defect Mode and Failure analysis) format based on manufacturing quality standards. Each row of data represents a unique failure analysis/root cause with associated corrective actions.

### Example Record
```json
{
  "id": "1",
  "failureMode": "Exposed Wire",
  "process": "AL-Pet Laser Marking and Manual AL-Pet removal",
  "processImages": ["/defects/row1-img1.png"],
  "criteriaAcceptanceLimit": "AL-PH061",
  "dri": "Yhel",
  "category": "MACHINE",
  "failureAnalysisRootCause": "AL-Pet laser marking penetrate the insulation...",
  "failureAnalysisImages": ["/defects/row1-2-fail1.png"],
  "correctiveAction": "Adjust the laser power setting...",
  "correctiveActionImages": []
}
```

## Status

🚧 **Prototype** - This is a working prototype for demonstration purposes. Mock data is used instead of a real database.

## License

Proprietary - Internal use only
