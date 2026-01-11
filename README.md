# Defect Knowledge Base System

A web-based application for managing manufacturing defect information, investigation results, and corrective actions.

## Overview

The Defect Knowledge Base System provides manufacturing teams with:
- 🔍 **Searchable defect database** - Quick access to documented failure modes
- 📋 **Investigation results** - Root cause analysis and failure analysis
- 🔧 **Corrective actions** - Step-by-step guidance for defect resolution
- 📸 **Visual references** - Images for defect identification
- 📊 **Dashboard analytics** - Statistics and category breakdown

## Features

### For Production Operators
- Search for defects by name, code, or description
- View quick reference cards with immediate actions
- Access visual guides for defect identification

### For Quality Engineers
- Document new failure modes with detailed information
- Update existing records with new findings
- Upload reference images

### For Supervisors
- Monitor defect statistics on dashboard
- Track recently updated records
- View category and severity breakdown

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
│   │   ├── page.tsx        # Dashboard
│   │   ├── defects/        # Defect pages
│   │   ├── design-guide/   # Design guide page
│   │   └── settings/       # Settings page
│   ├── components/
│   │   ├── layout/         # Layout components
│   │   └── ui/             # UI components (shadcn)
│   ├── data/               # Mock data
│   ├── lib/                # Utilities
│   └── types/              # TypeScript types
└── public/                 # Static assets
```

## Documentation

| Document | Description |
|----------|-------------|
| [PRD](./docs/prd.md) | Product requirements and roadmap |
| [DRD](./docs/drd.md) | Design specifications and guidelines |
| [Process Flow](./docs/process-flow.md) | User workflows and data flows |
| [Database Schema](./docs/database-schema.md) | Database structure |
| [API Specification](./docs/api-specification.md) | REST API endpoints |
| [User Guide](./docs/user-guide.md) | How to use the system |

## Pages

| Page | URL | Description |
|------|-----|-------------|
| Dashboard | `/` | Statistics and quick actions |
| Defect List | `/defects` | Browse and search defects |
| Defect Detail | `/defects/[id]` | View defect details |
| Add Defect | `/defects/add` | Create new defect |
| Edit Defect | `/defects/[id]/edit` | Edit existing defect |
| Design Guide | `/design-guide` | UI components reference |
| Settings | `/settings` | System configuration |

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React

## Styling

The application uses a purple-themed color palette consistent with the P-Chart System:
- Primary: Purple (#7C3AED)
- Severity colors: Red (Critical), Orange (Major), Blue (Minor), Gray (Cosmetic)

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

## Related Projects

- **P-Chart System** - Production quality control and defect tracking

## Status

🚧 **Prototype** - This is a wireframe prototype for demonstration purposes. Mock data is used instead of a real database.

## License

Proprietary - Internal use only
