# API Specification

## Defect Knowledge Base System

## Version: 1.0

---

## 1. Overview

This document defines the REST API endpoints for the Defect Knowledge Base System. The API follows RESTful conventions and uses JSON for request/response bodies.

**Base URL**: `/api`

---

## 2. Authentication (Future)

All API endpoints will require authentication via JWT tokens.

```
Authorization: Bearer <token>
```

---

## 3. Common Response Formats

### Success Response

```json
{
  "success": true,
  "data": { ... },
  "message": "Operation completed successfully"
}
```

### Error Response

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message",
    "details": { ... }
  }
}
```

### Paginated Response

```json
{
  "success": true,
  "data": [ ... ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10
  }
}
```

---

## 4. Defects Endpoints

### 4.1 List Defects

**GET** `/api/defects`

Retrieves a paginated list of defects with optional filtering and sorting.

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| page | integer | No | Page number (default: 1) |
| limit | integer | No | Items per page (default: 10, max: 100) |
| search | string | No | Search term for full-text search |
| category | string | No | Filter by category |
| severity | string | No | Filter by severity |
| isActive | boolean | No | Filter by active status |
| sortField | string | No | Field to sort by |
| sortDirection | string | No | Sort direction (asc/desc) |

**Example Request:**
```
GET /api/defects?page=1&limit=10&category=PROCESS_DEFECT&severity=CRITICAL
```

**Example Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "code": "DK-001",
      "name": "Solder Bridge",
      "category": "PROCESS_DEFECT",
      "severity": "CRITICAL",
      "description": "Unintended connection between two or more solder joints...",
      "isActive": true,
      "imageCount": 2,
      "updatedAt": "2025-12-20T10:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 45,
    "totalPages": 5
  }
}
```

---

### 4.2 Get Defect Details

**GET** `/api/defects/:id`

Retrieves detailed information for a specific defect.

**Path Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | integer | Yes | Defect ID |

**Example Request:**
```
GET /api/defects/1
```

**Example Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "code": "DK-001",
    "name": "Solder Bridge",
    "category": "PROCESS_DEFECT",
    "severity": "CRITICAL",
    "description": "Unintended connection between two or more solder joints, creating an electrical short circuit.",
    "failureAnalysis": "Analysis revealed excessive solder paste application...",
    "rootCause": "1. Stencil aperture size too large\n2. Excessive squeegee pressure...",
    "correctiveAction": "1. Replace stencil with correct aperture size...",
    "preventiveAction": "Implement SPC monitoring on paste volume...",
    "images": [
      {
        "id": 1,
        "url": "/images/defects/solder-bridge-1.jpg",
        "caption": "Example of solder bridge between IC pins",
        "imageType": "defect",
        "uploadedAt": "2025-12-01T08:00:00Z",
        "uploadedBy": "John Doe"
      }
    ],
    "applicableProducts": ["PCB Assembly", "SMT Components"],
    "applicableProcesses": ["OP15 - 1st Side Process", "OP20 - 2nd Side Process"],
    "relatedDefectCodes": ["SOLDER-001", "SMT-003"],
    "occurrenceCount": 45,
    "lastOccurrence": "2025-12-18T14:30:00Z",
    "createdBy": "Quality Engineer A",
    "updatedBy": "Quality Engineer B",
    "createdAt": "2025-11-15T09:00:00Z",
    "updatedAt": "2025-12-20T10:30:00Z",
    "isActive": true
  }
}
```

---

### 4.3 Create Defect

**POST** `/api/defects`

Creates a new defect record.

**Request Body:**

```json
{
  "code": "DK-009",
  "name": "New Defect Name",
  "category": "PROCESS_DEFECT",
  "severity": "MAJOR",
  "description": "Description of the defect...",
  "failureAnalysis": "Analysis findings...",
  "rootCause": "Root cause details...",
  "correctiveAction": "Corrective steps...",
  "preventiveAction": "Preventive steps...",
  "applicableProducts": ["Product A", "Product B"],
  "applicableProcesses": ["Process 1"],
  "relatedDefectCodes": ["CODE-001"]
}
```

**Required Fields:**
- code
- name
- category
- severity
- description
- failureAnalysis
- rootCause
- correctiveAction

**Example Response:**
```json
{
  "success": true,
  "data": {
    "id": 9,
    "code": "DK-009",
    "name": "New Defect Name",
    ...
  },
  "message": "Defect created successfully"
}
```

---

### 4.4 Update Defect

**PUT** `/api/defects/:id`

Updates an existing defect record.

**Path Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | integer | Yes | Defect ID |

**Request Body:**
Same as Create, but all fields are optional.

**Example Request:**
```json
{
  "correctiveAction": "Updated corrective action steps...",
  "preventiveAction": "Updated preventive action..."
}
```

**Example Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    ...
  },
  "message": "Defect updated successfully"
}
```

---

### 4.5 Delete Defect

**DELETE** `/api/defects/:id`

Deletes a defect record (soft delete - sets isActive to false).

**Path Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | integer | Yes | Defect ID |

**Example Response:**
```json
{
  "success": true,
  "message": "Defect deleted successfully"
}
```

---

### 4.6 Activate/Deactivate Defect

**PUT** `/api/defects/:id/activate`
**PUT** `/api/defects/:id/deactivate`

Changes the active status of a defect.

**Example Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "isActive": true
  },
  "message": "Defect activated successfully"
}
```

---

## 5. Images Endpoints

### 5.1 Upload Image

**POST** `/api/defects/:id/images`

Uploads an image for a defect.

**Content-Type**: `multipart/form-data`

**Form Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| file | file | Yes | Image file (JPEG, PNG) |
| caption | string | No | Image caption |
| imageType | string | Yes | Type: defect, root_cause, corrective_action, reference |

**Example Response:**
```json
{
  "success": true,
  "data": {
    "id": 5,
    "url": "/uploads/defects/1/image-5.jpg",
    "caption": "Example image",
    "imageType": "defect"
  },
  "message": "Image uploaded successfully"
}
```

### 5.2 Delete Image

**DELETE** `/api/defects/:defectId/images/:imageId`

Deletes an image from a defect.

**Example Response:**
```json
{
  "success": true,
  "message": "Image deleted successfully"
}
```

---

## 6. Categories & Filters Endpoints

### 6.1 Get Categories

**GET** `/api/categories`

Returns list of available categories.

**Example Response:**
```json
{
  "success": true,
  "data": [
    { "value": "VISUAL_DEFECT", "label": "Visual Defect" },
    { "value": "DIMENSIONAL_DEFECT", "label": "Dimensional Defect" },
    { "value": "FUNCTIONAL_DEFECT", "label": "Functional Defect" },
    { "value": "MATERIAL_DEFECT", "label": "Material Defect" },
    { "value": "PROCESS_DEFECT", "label": "Process Defect" },
    { "value": "ASSEMBLY_DEFECT", "label": "Assembly Defect" },
    { "value": "PACKAGING_DEFECT", "label": "Packaging Defect" },
    { "value": "OTHER", "label": "Other" }
  ]
}
```

### 6.2 Get Severity Levels

**GET** `/api/severities`

Returns list of severity levels.

**Example Response:**
```json
{
  "success": true,
  "data": [
    { "value": "CRITICAL", "label": "Critical", "color": "#EF4444" },
    { "value": "MAJOR", "label": "Major", "color": "#F59E0B" },
    { "value": "MINOR", "label": "Minor", "color": "#3B82F6" },
    { "value": "COSMETIC", "label": "Cosmetic", "color": "#6B7280" }
  ]
}
```

---

## 7. Statistics Endpoints

### 7.1 Get Dashboard Statistics

**GET** `/api/statistics`

Returns statistics for the dashboard.

**Example Response:**
```json
{
  "success": true,
  "data": {
    "totalDefects": 100,
    "activeDefects": 85,
    "criticalDefects": 12,
    "categoriesInUse": 6,
    "categoryBreakdown": [
      { "category": "PROCESS_DEFECT", "count": 35 },
      { "category": "MATERIAL_DEFECT", "count": 25 },
      { "category": "ASSEMBLY_DEFECT", "count": 20 }
    ],
    "recentlyUpdated": [
      {
        "id": 1,
        "code": "DK-001",
        "name": "Solder Bridge",
        "updatedAt": "2025-12-20T10:30:00Z"
      }
    ]
  }
}
```

---

## 8. Search Endpoint

### 8.1 Search Defects

**GET** `/api/search`

Performs full-text search across defects.

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| q | string | Yes | Search query |
| limit | integer | No | Max results (default: 10) |

**Example Request:**
```
GET /api/search?q=solder+bridge&limit=5
```

**Example Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "code": "DK-001",
      "name": "Solder Bridge",
      "category": "PROCESS_DEFECT",
      "severity": "CRITICAL",
      "description": "Unintended connection...",
      "relevanceScore": 0.95
    }
  ],
  "query": "solder bridge",
  "resultCount": 1
}
```

---

## 9. Export Endpoint

### 9.1 Export Defects

**GET** `/api/defects/export`

Exports defects to Excel/CSV format.

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| format | string | No | Export format: xlsx, csv (default: xlsx) |
| category | string | No | Filter by category |
| severity | string | No | Filter by severity |

**Example Request:**
```
GET /api/defects/export?format=xlsx&category=PROCESS_DEFECT
```

**Response:**
Returns file download with appropriate Content-Type header.

---

## 10. Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| VALIDATION_ERROR | 400 | Invalid request data |
| NOT_FOUND | 404 | Resource not found |
| DUPLICATE_CODE | 409 | Defect code already exists |
| UNAUTHORIZED | 401 | Authentication required |
| FORBIDDEN | 403 | Insufficient permissions |
| INTERNAL_ERROR | 500 | Server error |

---

## 11. Rate Limiting (Future)

- 100 requests per minute per user
- 1000 requests per hour per user
- Rate limit headers included in response:
  - `X-RateLimit-Limit`
  - `X-RateLimit-Remaining`
  - `X-RateLimit-Reset`
