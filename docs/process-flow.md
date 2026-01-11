# Process Flow Documentation

## Defects Management System

## Version: 1.0

---

## 1. System Overview Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    DEFECT KNOWLEDGE BASE SYSTEM                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐  │
│  │Production│    │  Quality │    │  Process │    │   Line   │  │
│  │ Operator │    │ Engineer │    │ Engineer │    │Supervisor│  │
│  └────┬─────┘    └────┬─────┘    └────┬─────┘    └────┬─────┘  │
│       │               │               │               │         │
│       ▼               ▼               ▼               ▼         │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                   WEB APPLICATION                        │   │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐    │   │
│  │  │ Search  │  │  View   │  │  Add/   │  │Dashboard│    │   │
│  │  │ Defects │  │ Details │  │  Edit   │  │  Stats  │    │   │
│  │  └─────────┘  └─────────┘  └─────────┘  └─────────┘    │   │
│  └─────────────────────────────────────────────────────────┘   │
│                              │                                  │
│                              ▼                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                      DATABASE                            │   │
│  │  • Defect Records    • Images    • Audit Logs           │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. User Workflows

### 2.1 Production Operator Workflow

**Scenario**: Operator encounters a defect on the production line

```
┌─────────────────┐
│ Defect Detected │
│  on Production  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Open Defect    │
│ Knowledge Base  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐     ┌─────────────────┐
│ Search by Name  │────▶│ Filter Results  │
│ or Description  │     │ (if needed)     │
└────────┬────────┘     └────────┬────────┘
         │                       │
         └───────────┬───────────┘
                     │
                     ▼
              ┌──────────────┐
              │ Found Match? │
              └──────┬───────┘
                     │
         ┌───────────┴───────────┐
         │                       │
         ▼                       ▼
   ┌──────────┐           ┌──────────┐
   │   YES    │           │    NO    │
   └────┬─────┘           └────┬─────┘
        │                      │
        ▼                      ▼
┌─────────────────┐    ┌─────────────────┐
│  View Details   │    │ Report to QC    │
│ & Quick Ref     │    │   Engineer      │
└────────┬────────┘    └─────────────────┘
         │
         ▼
┌─────────────────┐
│ Follow Correct- │
│  ive Actions    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Resume Normal   │
│   Production    │
└─────────────────┘
```

### 2.2 Quality Engineer Workflow

**Scenario**: Document a new failure mode after investigation

```
┌─────────────────┐
│ New Defect Type │
│   Identified    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Conduct       │
│  Investigation  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Document Root   │
│  Cause & Fix    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Open Knowledge  │
│     Base        │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Click "Add New  │
│    Defect"      │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────────────────┐
│           FILL IN FORM                   │
├─────────────────────────────────────────┤
│ 1. Basic Info (Code, Name, Category)    │
│ 2. Description                          │
│ 3. Failure Analysis                     │
│ 4. Root Cause                           │
│ 5. Corrective Action                    │
│ 6. Preventive Action                    │
│ 7. Upload Images                        │
│ 8. Add Tags (Products, Processes)       │
└────────┬────────────────────────────────┘
         │
         ▼
┌─────────────────┐
│  Save Defect    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Notify Team of  │
│  New Entry      │
└─────────────────┘
```

### 2.3 Update Existing Defect Workflow

```
┌─────────────────┐
│ New Information │
│   Available     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Search for      │
│ Existing Defect │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  View Details   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Click "Edit"   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Update Fields:  │
│ • New findings  │
│ • Better images │
│ • Refined steps │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Save Changes   │
│ (Auto-audit)    │
└─────────────────┘
```

---

## 3. Data Flow

### 3.1 Search Flow

```
┌──────────────┐
│ User Input   │
│ (Search Box) │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Client-side  │
│ Debounce     │
│ (500ms)      │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ API Request  │
│ GET /search  │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Database     │
│ Full-text    │
│ Search       │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Filter by:   │
│ • Category   │
│ • Severity   │
│ • Status     │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Sort Results │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Return JSON  │
│ Response     │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Render Table │
│ with Results │
└──────────────┘
```

### 3.2 Create/Update Flow

```
┌──────────────┐
│ User fills   │
│ Form         │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Client-side  │
│ Validation   │
└──────┬───────┘
       │
       ├─────────────────┐
       │                 │
       ▼                 ▼
┌──────────────┐  ┌──────────────┐
│ Valid        │  │ Invalid      │
└──────┬───────┘  └──────┬───────┘
       │                 │
       ▼                 ▼
┌──────────────┐  ┌──────────────┐
│ Submit to    │  │ Show Error   │
│ API          │  │ Messages     │
└──────┬───────┘  └──────────────┘
       │
       ▼
┌──────────────┐
│ Server-side  │
│ Validation   │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Database     │
│ Transaction  │
│ • Save data  │
│ • Save images│
│ • Audit log  │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Return       │
│ Success/Error│
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Redirect to  │
│ Detail Page  │
└──────────────┘
```

---

## 4. Page Navigation Flow

```
                        ┌─────────────┐
                        │  Dashboard  │
                        │     (/)     │
                        └──────┬──────┘
                               │
         ┌─────────────────────┼─────────────────────┐
         │                     │                     │
         ▼                     ▼                     ▼
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│  Defect List    │  │   Add New       │  │   Settings      │
│   (/defects)    │  │ (/defects/add)  │  │  (/settings)    │
└────────┬────────┘  └────────┬────────┘  └─────────────────┘
         │                    │
         ▼                    │
┌─────────────────┐           │
│  Defect Detail  │◀──────────┘
│ (/defects/[id]) │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Edit Defect   │
│(/defects/[id]/  │
│     edit)       │
└─────────────────┘
```

---

## 5. State Management Flow

### 5.1 List Page State

```
┌─────────────────────────────────────────────────────────────┐
│                     LIST PAGE STATE                          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │ searchQuery │  │   filters   │  │  sortConfig │         │
│  │   string    │  │   object    │  │   object    │         │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘         │
│         │                │                │                 │
│         └────────────────┼────────────────┘                 │
│                          │                                  │
│                          ▼                                  │
│                 ┌─────────────────┐                         │
│                 │ useMemo Filter  │                         │
│                 │ & Sort Data     │                         │
│                 └────────┬────────┘                         │
│                          │                                  │
│                          ▼                                  │
│                 ┌─────────────────┐                         │
│                 │ filteredDefects │                         │
│                 │     array       │                         │
│                 └────────┬────────┘                         │
│                          │                                  │
│                          ▼                                  │
│                 ┌─────────────────┐                         │
│                 │  Render Table   │                         │
│                 └─────────────────┘                         │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 5.2 Form State

```
┌─────────────────────────────────────────────────────────────┐
│                      FORM STATE                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │  formData   │  │   errors    │  │isSubmitting │         │
│  │   object    │  │   object    │  │   boolean   │         │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘         │
│         │                │                │                 │
│         ▼                │                │                 │
│  ┌─────────────┐         │                │                 │
│  │ handleInput │         │                │                 │
│  │   Change    │─────────┼────────────────┘                 │
│  └──────┬──────┘         │                                  │
│         │                │                                  │
│         ▼                ▼                                  │
│  ┌─────────────┐  ┌─────────────┐                          │
│  │ Update form │  │ Clear error │                          │
│  │    data     │  │  for field  │                          │
│  └─────────────┘  └─────────────┘                          │
│                                                              │
│  On Submit:                                                  │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │  Validate   │─▶│ Set errors  │─▶│   Submit    │         │
│  │    form     │  │  if invalid │  │  if valid   │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 6. Integration Points

### 6.1 P-Chart System Integration (Future)

```
┌─────────────────┐         ┌─────────────────┐
│   P-Chart       │         │ Defect Knowledge│
│   System        │◀───────▶│     Base        │
└────────┬────────┘         └────────┬────────┘
         │                           │
         │    Shared Data:           │
         │    • Defect codes         │
         │    • Categories           │
         │    • Severity levels      │
         │                           │
         ▼                           ▼
┌─────────────────┐         ┌─────────────────┐
│ Defect counts   │         │ Detailed info   │
│ Statistics      │         │ Root cause      │
│ Trends          │         │ Corrective acts │
└─────────────────┘         └─────────────────┘
```

### 6.2 API Endpoints (Planned)

| Endpoint | Method | Description |
|----------|--------|-------------|
| /api/defects | GET | List all defects |
| /api/defects | POST | Create new defect |
| /api/defects/[id] | GET | Get defect details |
| /api/defects/[id] | PUT | Update defect |
| /api/defects/[id] | DELETE | Delete defect |
| /api/defects/search | GET | Search defects |
| /api/defects/[id]/images | POST | Upload images |
| /api/categories | GET | List categories |
| /api/statistics | GET | Get dashboard stats |

---

## 7. Error Handling Flow

```
┌─────────────────┐
│  User Action    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Try Operation  │
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
    ▼         ▼
┌───────┐ ┌───────┐
│Success│ │ Error │
└───┬───┘ └───┬───┘
    │         │
    ▼         ▼
┌───────┐ ┌─────────────────┐
│ Show  │ │ Log Error       │
│Success│ │ (console)       │
│Message│ └────────┬────────┘
└───────┘          │
                   ▼
           ┌─────────────────┐
           │ Show User-      │
           │ Friendly Error  │
           │ Message         │
           └────────┬────────┘
                    │
                    ▼
           ┌─────────────────┐
           │ Provide Action  │
           │ (Retry/Contact) │
           └─────────────────┘
```

---

## 8. Deployment Flow (Future)

```
┌─────────────────┐
│   Developer     │
│   Commits Code  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Git Push to   │
│   Repository    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   CI/CD         │
│   Pipeline      │
│   • Build       │
│   • Test        │
│   • Lint        │
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
    ▼         ▼
┌───────┐ ┌───────┐
│ Pass  │ │ Fail  │
└───┬───┘ └───┬───┘
    │         │
    ▼         ▼
┌───────┐ ┌───────┐
│Deploy │ │Notify │
│to Env │ │Team   │
└───────┘ └───────┘
```
