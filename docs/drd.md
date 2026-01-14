# Design Requirement Document (DRD)

## Defects Management System

## Version: 2.0

---

## 1. Overview

This document outlines the design requirements and specifications for the Defects Management System. It serves as a guide for developers and designers to ensure consistent implementation.

---

## 2. Design Principles

### 2.1 Consistency
- Use standardized components across all pages
- Follow established color and typography patterns
- Consistent rounded corners (rounded-lg) throughout

### 2.2 Clarity
- Information should be easy to scan and understand
- Critical information prominently displayed
- Use visual hierarchy to guide user attention

### 2.3 Efficiency
- Minimize clicks to access information
- Provide quick search and filter capabilities
- Enable keyboard navigation

### 2.4 Responsiveness
- Desktop: Full DataTable view (lg breakpoint: 1024px+)
- Mobile/Tablet: Card layout view

---

## 3. Color Specification

### 3.1 Primary Colors

| Color Name | Hex Code | Usage |
|------------|----------|-------|
| Primary | #7C3AED | Brand color, primary actions |
| Primary Foreground | #FFFFFF | Text on primary |
| Purple-50 | #FAF5FF | Hover backgrounds, accents |
| Purple-100 | #F3E8FF | Active states, badges |
| Purple-600 | #9333EA | Buttons, links |
| Purple-700 | #7E22CE | Button hover |

### 3.2 Semantic Colors

| Color Name | Hex Code | Usage |
|------------|----------|-------|
| Success | #22C55E | Success states |
| Warning | #F59E0B | Warning states, Man category |
| Destructive | #EF4444 | Error states, critical |
| Info | #3B82F6 | Information, Machine category |

### 3.3 Category Badge Colors (4M)

| Category | Badge Variant | Background | Text |
|----------|---------------|------------|------|
| MACHINE | info | bg-blue-100 | text-blue-800 |
| MAN | warning | bg-yellow-100 | text-yellow-800 |
| METHOD | secondary | bg-gray-100 | text-gray-800 |
| MATERIAL | outline | bg-white | text-gray-800 |

### 3.4 Special Colors

| Element | Background | Text |
|---------|------------|------|
| Criteria/Acceptance Limit | bg-red-50 | text-red-900 |
| Criteria Badge | bg-red-100 | text-red-700 |

---

## 4. Typography

### 4.1 Font Family
- **Primary**: Inter, system-ui, sans-serif
- **Monospace**: ui-monospace, monospace (for codes)

### 4.2 Font Sizes

| Name | Size | Usage |
|------|------|-------|
| 2xl | 24px | Page titles |
| xl | 20px | Card titles |
| lg | 18px | Section titles |
| base | 16px | Body text |
| sm | 14px | Secondary text, table cells |
| xs | 12px | Captions, metadata |

---

## 5. Component Specifications

### 5.1 Buttons

**Primary Button**
- Background: bg-purple-600
- Hover: hover:bg-purple-700
- Text: text-white
- Border Radius: rounded-lg
- Shadow: shadow-md hover:shadow-lg

**Ghost Button**
- Background: transparent
- Hover: hover:bg-gray-100
- Text: text-gray-600

**Icon Button**
- Size: h-9 w-9
- Padding: centered icon

### 5.2 Cards

**Default Card**
- Background: bg-white
- Border: border rounded-lg
- Shadow: shadow-sm

**Mobile Defect Card**
- Border Left: border-l-4 border-l-purple-500
- Hover: hover:shadow-lg transition-shadow
- Header: bg-gradient-to-r from-purple-50 to-white

### 5.3 DataTable

**Table Container**
- Background: bg-white
- Border Radius: rounded-lg
- Shadow: shadow-md
- Border: border

**Table Header**
- Background: bg-gradient-to-r from-gray-50 to-gray-100
- Sortable headers: cursor-pointer hover:bg-gray-100

**Table Row**
- Alternating: odd:bg-white even:bg-gray-50/30
- Hover: hover:bg-purple-50/50

**Sort Indicators**
- Active: ArrowUp/ArrowDown (text-purple-600)
- Inactive: ArrowUpDown (text-gray-400)

### 5.4 Pagination

**Pagination Bar**
- Background: bg-white
- Border: border rounded-lg
- Shadow: shadow-sm
- Padding: p-4

**Page Buttons**
- Size: h-9 w-9
- Active: bg-purple-600 text-white
- Inactive: variant="outline"

### 5.5 Image Grid

**Image Container**
- Aspect Ratio: aspect-video
- Border Radius: rounded-lg
- Border: border border-gray-200
- Hover: hover:ring-2 hover:ring-purple-400
- Shadow: shadow-sm

**Image Modal**
- Background: bg-black/90
- Max Width: max-w-5xl
- Image: max-h-[85vh] object-contain

### 5.6 Badges

**Base Badge**
- Padding: px-2.5 py-0.5
- Border Radius: rounded-full
- Font: text-xs font-semibold

**Badge Variants**
| Variant | Background | Text |
|---------|------------|------|
| default | bg-primary | text-primary-foreground |
| secondary | bg-secondary | text-secondary-foreground |
| info | bg-blue-100 | text-blue-800 |
| warning | bg-yellow-100 | text-yellow-800 |
| outline | bg-white border | text-gray-800 |

### 5.7 Form Elements

**Input Field**
- Height: h-10
- Border: border border-input rounded-lg
- Focus: ring-2 ring-ring

**Textarea**
- Min Height: min-h-[80px]
- Border Radius: rounded-lg

**Select**
- Same dimensions as input
- Border Radius: rounded-lg

---

## 6. Layout Patterns

### 6.1 Page Structure

```
Navigation Bar (fixed top)
  - Logo
  - Nav Links (Desktop)
  - Search Input (lg screens)
  - Mobile Menu Button

Main Content
  - Page Header (Title + Actions)
  - Controls Bar (Results count + Pagination settings)
  - Content Area (DataTable or Cards)
  - Pagination (if needed)

Footer
```

### 6.2 Responsive Breakpoints

| Breakpoint | Width | Layout |
|------------|-------|--------|
| sm | 640px | Mobile landscape |
| md | 768px | Tablet |
| lg | 1024px | Desktop (table view) |
| xl | 1280px | Large desktop |

### 6.3 DataTable Columns

| Column | Width | Sortable |
|--------|-------|----------|
| Failure Mode | w-36 | Yes |
| Process | w-64 | Yes |
| Criteria | w-28 | Yes |
| DRI | w-24 | Yes |
| Category | w-28 | Yes |
| Failure Analysis | w-80 | No |
| Corrective Action | w-80 | No |
| Actions | w-24 | No |

---

## 7. Interaction Patterns

### 7.1 Search

**Header Search**
- Trigger: onBlur or Enter key
- Navigation: /defects?keyword={term}
- Visual: Badge showing active search term

### 7.2 Sorting

**Click Behavior**
1. First click: Sort ascending (ArrowUp)
2. Second click: Sort descending (ArrowDown)
3. Third click: Clear sort (ArrowUpDown)

### 7.3 Pagination

**Controls**
- First page: ChevronsLeft
- Previous: ChevronLeft
- Page numbers: 1-5 visible
- Next: ChevronRight
- Last page: ChevronsRight

### 7.4 Image Viewing

**Click Behavior**
- Click image: Open modal with full-size view
- Click outside or X: Close modal

---

## 8. Mobile Card Layout

### 8.1 Card Structure

```
Card (border-l-4 border-l-purple-500)
  Header (gradient background)
    - Failure Mode (title)
    - Process (subtitle)
    - Action buttons (View, Edit)
    - Badges (Category, Criteria, DRI)
  
  Process Images Section (if images exist)
  
  Failure Analysis Section
    - Text content
    - Images grid
  
  Corrective Action Section
    - Text content
    - Images grid
```

---

## 9. Icons

### 9.1 Icon Library
- **Library**: Lucide React
- **Default Size**: h-4 w-4 (16px)

### 9.2 Common Icons

| Purpose | Icon |
|---------|------|
| Search | Search |
| Add | PlusCircle |
| Edit | Pencil |
| View | Eye |
| Back | ArrowLeft |
| Sort Asc | ArrowUp |
| Sort Desc | ArrowDown |
| Sort None | ArrowUpDown |
| First Page | ChevronsLeft |
| Prev Page | ChevronLeft |
| Next Page | ChevronRight |
| Last Page | ChevronsRight |
| Warning | AlertTriangle |
| Remove | X |
| Image | Image |

---

## 10. Animation

### 10.1 Transitions
- Default duration: 200-300ms
- Easing: ease-out

### 10.2 Hover Effects
- Cards: hover:shadow-lg transition-shadow duration-300
- Buttons: transition-colors
- Images: hover:ring-2 transition-all duration-200
- Table rows: hover:bg-purple-50/50 transition-colors

### 10.3 Loading States
- Skeleton: bg-gray-100 animate-pulse rounded-lg

---

## 11. File Naming Conventions

### 11.1 Components
- PascalCase: PageHeader.tsx, Navigation.tsx

### 11.2 Pages
- kebab-case for routes: design-guide, defects
- Dynamic routes: [id]

### 11.3 Data Files
- camelCase: defects.json, mockDefects.ts

### 11.4 Types
- PascalCase for interfaces: DefectKnowledge
- SCREAMING_SNAKE_CASE for constants: DEFECT_CATEGORIES
