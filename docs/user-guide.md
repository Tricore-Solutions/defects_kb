# User Guide

## Defects Management System

## Version: 2.0

---

## 1. Introduction

Welcome to the Defects Management System! This guide will help you understand how to use the system to search for defect information, view root cause analysis, and access corrective actions based on DMF (Defect Mode and Failure analysis) format.

---

## 2. Getting Started

### 2.1 Accessing the System

1. Open your web browser (Chrome, Firefox, Safari, or Edge)
2. Navigate to the system URL (default: http://localhost:3000)
3. The Dashboard search interface will be displayed

### 2.2 Navigation

The navigation bar at the top provides quick access to all sections:

| Menu Item | Description |
|-----------|-------------|
| Dashboard | Home page with search interface |
| Defects Management | Browse and search all defects |
| Add New | Create a new defect record |
| Settings | System configuration |

### 2.3 Quick Search

Use the search input in the navigation header to quickly search for defects by keyword. Press Enter or click away to search.

---

## 3. Dashboard

The Dashboard provides a simple search interface for finding defects.

### 3.1 Search Form

Three search fields are available:

| Field | Description | Example |
|-------|-------------|---------|
| Item | Search by failure mode | "Exposed Wire" |
| Category | Search by 4M category or process | "Machine" |
| Defect | General search term | "laser" |

### 3.2 Using the Search

1. Enter your search terms in one or more fields
2. Click the "Search" button
3. You will be redirected to the defects list with filtered results

---

## 4. Defects DataTable

The defects list displays all defect records in a professional DataTable format.

### 4.1 Desktop View (Table)

On desktop screens (1024px and wider), defects are displayed in a table with columns:

| Column | Description | Sortable |
|--------|-------------|----------|
| Failure Mode | Name of the defect type | Yes |
| Process | Where the defect occurs | Yes |
| Criteria | Acceptance limit code | Yes |
| DRI | Responsible person | Yes |
| Category | 4M classification | Yes |
| Failure Analysis | Root cause with images | No |
| Corrective Action | Fix steps with images | No |
| Actions | View/Edit buttons | No |

### 4.2 Mobile View (Cards)

On smaller screens, defects are displayed as cards with:
- Header: Failure mode, process, and action buttons
- Badges: Category, criteria, and DRI
- Sections: Process images, failure analysis, corrective action

### 4.3 Sorting

Click on sortable column headers to sort:
1. First click: Sort ascending (arrow up)
2. Second click: Sort descending (arrow down)
3. Third click: Clear sort

### 4.4 Pagination

Navigate through pages using the pagination controls:
- First/Last page buttons
- Previous/Next buttons
- Page number buttons
- Items per page selector (5, 10, 25, 50)

### 4.5 Keyword Search

Use the search input in the navigation header:
1. Type your search term
2. Press Enter or click away from the field
3. Results will be filtered
4. Active search shows as a purple badge
5. Click "Clear filters" to reset

---

## 5. Viewing Defect Details

Click "View" on any defect to see the full detail page.

### 5.1 Page Sections

The detail page shows three main sections:

**Process Details**
- Process name
- Process images (clickable for full view)

**Failure Analysis / Root Cause**
- Root cause description
- Evidence images (clickable)

**Corrective Action**
- Steps to resolve the defect
- Reference images (clickable)

### 5.2 Sidebar Information

- 4M Category badge
- Criteria/Acceptance Limit
- DRI (responsible person)
- Created/Updated timestamps
- Created by information

### 5.3 Viewing Images

Click any image to open it in a full-size modal:
- Images display at maximum viewable size
- Click outside the image or the X button to close
- All images are clickable throughout the system

---

## 6. Adding a New Defect

### 6.1 When to Add

Add a new defect when:
- A new failure mode is discovered
- Investigation is complete with root cause identified
- Corrective actions have been validated

### 6.2 Required Fields

| Field | Description | Example |
|-------|-------------|---------|
| Failure Mode | Name of the defect | "Exposed Wire" |
| Process | Where it occurs | "Laser Marking" |
| Criteria | Acceptance code | "AL-PH061" |
| DRI | Responsible person | "Yhel" |
| Category | 4M classification | "Machine" |
| Root Cause | Why it happened | "Laser power too high..." |
| Corrective Action | How to fix | "Adjust laser settings..." |

### 6.3 Adding Images

Each section supports multiple images:
- Process Images
- Failure Analysis Images
- Corrective Action Images

Images are added by URL path (e.g., /defects/image.png)

---

## 7. Editing Defects

### 7.1 How to Edit

1. Navigate to the defect detail page
2. Click "Edit Defect" button
3. Modify the fields as needed
4. Manage images in each section
5. Click "Save Changes"

### 7.2 Image Management

In edit mode, each image section shows:
- Existing images with remove button (X)
- "Click to Add Image" placeholder

---

## 8. Understanding 4M Categories

### 8.1 Machine

- Equipment malfunction
- Tool wear or damage
- Calibration issues
- **Badge**: Blue

### 8.2 Man

- Operator error
- Training gaps
- Fatigue or distraction
- **Badge**: Yellow

### 8.3 Method

- Process issues
- Procedure gaps
- Workflow problems
- **Badge**: Gray

### 8.4 Material

- Raw material defects
- Component issues
- Supplier problems
- **Badge**: White/Outline

---

## 9. Tips for Effective Use

### 9.1 Searching

- Use specific keywords from the defect description
- Try different terms if initial search fails
- Use the header search for quick filtering
- Clear filters to see all defects

### 9.2 Viewing

- Click images to see full details
- Check all three sections (process, analysis, corrective)
- Note the DRI for follow-up questions

### 9.3 Documentation

- Include clear, specific descriptions
- Add relevant images for each section
- Keep corrective actions actionable
- Update records when new information is available

---

## 10. Troubleshooting

### 10.1 Can't Find a Defect

- Try different search terms
- Check spelling
- Clear filters and browse manually
- Ask Quality Engineering if defect is documented

### 10.2 Images Not Loading

- Check if image file exists in /public/defects/
- Verify the image URL path is correct
- Refresh the page

### 10.3 Page Not Loading

- Refresh the browser
- Clear browser cache
- Check internet connection
- Verify dev server is running (npm run dev)

---

## 11. Glossary

| Term | Definition |
|------|------------|
| Failure Mode | A specific way a product or process can fail |
| Root Cause | The fundamental reason for a defect |
| Corrective Action | Steps to eliminate the cause of a defect |
| DMF | Defect Mode and Failure analysis format |
| 4M | Machine, Man, Method, Material categories |
| DRI | Direct Responsible Individual |
| DataTable | Interactive table with sorting and pagination |

---

## 12. Support

For questions or issues:
- Contact your Quality Engineering team
- Review this documentation
- Check the Design Guide page for UI reference
