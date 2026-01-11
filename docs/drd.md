# Design Requirement Document (DRD)

## Defect Knowledge Base System

## Version: 1.0

---

## 1. Overview

This document outlines the design requirements and specifications for the Defect Knowledge Base System. It serves as a guide for developers and designers to ensure consistent implementation.

---

## 2. Design Principles

### 2.1 Consistency
- Maintain visual consistency with P-Chart System
- Use standardized components across all pages
- Follow established color and typography patterns

### 2.2 Clarity
- Information should be easy to scan and understand
- Critical information should be prominently displayed
- Use visual hierarchy to guide user attention

### 2.3 Efficiency
- Minimize clicks to access information
- Provide quick search and filter capabilities
- Enable keyboard navigation

### 2.4 Accessibility
- Meet WCAG 2.1 AA standards
- Ensure sufficient color contrast
- Support screen readers

---

## 3. Color Specification

### 3.1 Primary Colors

| Color Name | HSL Value | Hex Code | Usage |
|------------|-----------|----------|-------|
| Primary | 265 89% 50% | #7C3AED | Brand color, primary actions |
| Primary Foreground | 0 0% 100% | #FFFFFF | Text on primary |

### 3.2 Semantic Colors

| Color Name | HSL Value | Hex Code | Usage |
|------------|-----------|----------|-------|
| Success | 142 72% 42% | #22C55E | Success states, active status |
| Warning | 38 92% 50% | #F59E0B | Warning states, major severity |
| Destructive | 0 84.2% 60.2% | #EF4444 | Error states, critical severity |
| Info | 220 70% 50% | #3B82F6 | Information, minor severity |

### 3.3 Neutral Colors

| Color Name | HSL Value | Hex Code | Usage |
|------------|-----------|----------|-------|
| Background | 0 0% 95% | #F2F2F2 | Page background |
| Card | 0 0% 100% | #FFFFFF | Card backgrounds |
| Muted | 265 10% 96.1% | #F5F3F7 | Muted backgrounds |
| Border | 265 10% 89.8% | #E5E0EA | Borders, dividers |

### 3.4 Severity Color Mapping

| Severity | Background | Text | Badge Variant |
|----------|------------|------|---------------|
| Critical | bg-red-100 | text-red-700 | critical |
| Major | bg-orange-100 | text-orange-700 | warning |
| Minor | bg-yellow-100 | text-yellow-700 | info |
| Cosmetic | bg-blue-100 | text-blue-700 | secondary |

---

## 4. Typography

### 4.1 Font Family
- **Primary**: Inter, system-ui, sans-serif
- **Monospace**: ui-monospace, monospace (for codes)

### 4.2 Font Sizes

| Name | Size | Line Height | Usage |
|------|------|-------------|-------|
| 3xl | 30px | 36px | Page titles |
| 2xl | 24px | 32px | Section titles |
| xl | 20px | 28px | Card titles |
| lg | 18px | 28px | Subsection titles |
| base | 16px | 24px | Body text |
| sm | 14px | 20px | Secondary text |
| xs | 12px | 16px | Captions, metadata |

### 4.3 Font Weights

| Weight | Value | Usage |
|--------|-------|-------|
| Bold | 700 | Page titles |
| Semibold | 600 | Section titles, emphasis |
| Medium | 500 | Labels, buttons |
| Regular | 400 | Body text |

---

## 5. Spacing System

### 5.1 Base Unit
- Base unit: 4px
- All spacing should be multiples of 4px

### 5.2 Common Spacing Values

| Token | Value | Usage |
|-------|-------|-------|
| 1 | 4px | Tight spacing |
| 2 | 8px | Icon gaps |
| 3 | 12px | Small padding |
| 4 | 16px | Standard gap |
| 6 | 24px | Section spacing |
| 8 | 32px | Large spacing |

### 5.3 Page Layout Spacing

| Element | Spacing |
|---------|---------|
| Page padding (vertical) | py-6 (24px) |
| Section margin | mb-6 (24px) |
| Card padding | p-4 or p-6 |
| Grid gap | gap-4 or gap-6 |
| Form field spacing | space-y-4 |

---

## 6. Component Specifications

### 6.1 Buttons

**Primary Button**
```
Background: bg-purple-600
Hover: hover:bg-purple-700
Text: text-white
Padding: px-4 py-2
Border Radius: rounded-md
```

**Secondary Button**
```
Background: bg-secondary
Text: text-secondary-foreground
Border: border border-input
```

**Destructive Button**
```
Background: bg-destructive
Text: text-destructive-foreground
```

**Button Sizes**
| Size | Height | Padding |
|------|--------|---------|
| sm | h-9 | px-3 |
| default | h-10 | px-4 py-2 |
| lg | h-11 | px-8 |
| icon | h-10 w-10 | - |

### 6.2 Cards

**Default Card**
```
Background: bg-card
Border: border rounded-lg
Shadow: shadow-sm
Padding: p-6 (header), p-6 pt-0 (content)
```

**Accent Card (Left Border)**
```
Base card styles +
Border Left: border-l-4 border-l-{color}-500
```

**Highlighted Card**
```
Background: bg-{color}-50
Border: border-{color}-200
```

### 6.3 Form Elements

**Input Field**
```
Height: h-10
Border: border border-input rounded-md
Padding: px-3 py-2
Focus: ring-2 ring-ring ring-offset-2
```

**Textarea**
```
Min Height: min-h-[80px]
Same border/padding as input
Resizable: vertical
```

**Select**
```
Same dimensions as input
Dropdown: shadow-md rounded-md
```

### 6.4 Badges

**Base Badge**
```
Padding: px-2.5 py-0.5
Border Radius: rounded-full
Font: text-xs font-semibold
```

**Badge Variants**
| Variant | Background | Text |
|---------|------------|------|
| default | bg-primary | text-primary-foreground |
| secondary | bg-secondary | text-secondary-foreground |
| success | bg-green-100 | text-green-800 |
| warning | bg-yellow-100 | text-yellow-800 |
| critical | bg-red-100 | text-red-800 |
| info | bg-blue-100 | text-blue-800 |

### 6.5 Tables

**Table Container**
```
Background: bg-white (dark: bg-gray-800)
Border Radius: rounded-lg
Shadow: shadow
Overflow: overflow-hidden
```

**Table Header**
```
Height: h-12
Padding: px-4
Font: font-medium text-muted-foreground
```

**Table Row**
```
Border: border-b
Hover: hover:bg-muted/50
```

**Table Cell**
```
Padding: p-4
Alignment: align-middle
```

---

## 7. Layout Patterns

### 7.1 Page Structure

```
┌─────────────────────────────────────┐
│           Navigation Bar            │
├─────────────────────────────────────┤
│  Page Header (Title + Actions)      │
├─────────────────────────────────────┤
│                                     │
│         Main Content Area           │
│                                     │
├─────────────────────────────────────┤
│              Footer                 │
└─────────────────────────────────────┘
```

### 7.2 Grid System

**Dashboard Grid**
- Statistics: 4 columns (md:grid-cols-4)
- Cards: 2 columns (lg:grid-cols-2)
- Quick actions: 3 columns (md:grid-cols-3)

**Detail Page**
- Main content: 2/3 width (lg:col-span-2)
- Sidebar: 1/3 width

**Form Layout**
- 2 columns for short fields (md:grid-cols-2)
- Full width for textareas

### 7.3 Responsive Breakpoints

| Breakpoint | Width | Usage |
|------------|-------|-------|
| sm | 640px | Mobile landscape |
| md | 768px | Tablet |
| lg | 1024px | Desktop |
| xl | 1280px | Large desktop |
| 2xl | 1400px | Container max-width |

---

## 8. Interaction Patterns

### 8.1 Navigation
- Active state: bg-purple-100 text-purple-700
- Hover state: hover:bg-gray-100
- Focus state: ring-2 ring-ring

### 8.2 Links
- Default: text-purple-600
- Hover: hover:text-purple-800 hover:underline
- Visited: same as default (no change)

### 8.3 Loading States
- Spinner: animate-spin border-purple-600
- Skeleton: bg-gray-200 animate-pulse

### 8.4 Empty States
- Icon: h-16 w-16 text-gray-300
- Message: text-lg font-medium text-gray-700
- Action: Button or link to add content

---

## 9. Icons

### 9.1 Icon Library
- **Library**: Lucide React
- **Default Size**: h-4 w-4 (16px)
- **Large Size**: h-5 w-5 (20px)
- **XL Size**: h-8 w-8 or larger

### 9.2 Common Icons

| Purpose | Icon |
|---------|------|
| Search | Search |
| Add | PlusCircle |
| Edit | Pencil |
| Delete | Trash2 |
| View | Eye |
| Back | ArrowLeft |
| Settings | Settings |
| Database | Database |
| Warning | AlertTriangle |
| Success | CheckCircle |
| Error | AlertCircle |
| Info | Info |
| Image | Image |
| Document | FileText |

---

## 10. Animation

### 10.1 Transitions
- Default duration: 200ms
- Easing: ease-out
- Properties: colors, background-color, border-color, opacity

### 10.2 Hover Effects
- Cards: hover:shadow-lg transition-shadow
- Buttons: transition-colors
- Links: transition-colors

### 10.3 Loading Animation
- Spinner: animate-spin (1s linear infinite)
- Skeleton: animate-pulse

---

## 11. Accessibility Requirements

### 11.1 Color Contrast
- Normal text: minimum 4.5:1 ratio
- Large text: minimum 3:1 ratio
- UI components: minimum 3:1 ratio

### 11.2 Focus Indicators
- Visible focus ring on all interactive elements
- ring-2 ring-ring ring-offset-2

### 11.3 Keyboard Navigation
- Tab order follows visual order
- Enter/Space activates buttons
- Escape closes modals/dropdowns

### 11.4 Screen Reader Support
- Semantic HTML elements
- ARIA labels where needed
- Alt text for images

---

## 12. File Naming Conventions

### 12.1 Components
- PascalCase: `PageHeader.tsx`, `DataTable.tsx`
- Index files for directories: `index.tsx`

### 12.2 Pages
- kebab-case for routes: `design-guide`, `defects`
- Dynamic routes: `[id]`

### 12.3 Utilities
- camelCase: `utils.ts`, `mockDefects.ts`

### 12.4 Types
- PascalCase for interfaces: `DefectKnowledge`
- SCREAMING_SNAKE_CASE for constants: `SEVERITY_LEVELS`
