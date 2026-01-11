# Database Schema Documentation

## Defect Knowledge Base System

## Version: 1.0

---

## 1. Overview

This document describes the database schema for the Defect Knowledge Base System. The schema is designed to support efficient storage and retrieval of defect information, images, and audit trails.

---

## 2. Entity Relationship Diagram

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                          │
│  ┌──────────────┐       ┌──────────────┐       ┌──────────────┐        │
│  │    users     │       │   defects    │       │defect_images │        │
│  ├──────────────┤       ├──────────────┤       ├──────────────┤        │
│  │ id           │       │ id           │       │ id           │        │
│  │ name         │       │ code         │       │ defect_id    │───┐    │
│  │ email        │       │ name         │       │ url          │   │    │
│  │ role         │       │ category     │       │ caption      │   │    │
│  │ created_at   │       │ severity     │       │ image_type   │   │    │
│  └──────┬───────┘       │ description  │       │ uploaded_at  │   │    │
│         │               │ failure_     │       │ uploaded_by  │   │    │
│         │               │   analysis   │       └──────────────┘   │    │
│         │               │ root_cause   │              ▲           │    │
│         │               │ corrective_  │              │           │    │
│         │               │   action     │              │           │    │
│         │               │ preventive_  │              │           │    │
│         │               │   action     │──────────────┘           │    │
│         │               │ created_by   │───────────────────────┐  │    │
│         │               │ updated_by   │───────────────────┐   │  │    │
│         │               │ created_at   │                   │   │  │    │
│         └───────────────│ updated_at   │                   │   │  │    │
│                         │ is_active    │                   │   │  │    │
│                         └──────┬───────┘                   │   │  │    │
│                                │                           │   │  │    │
│         ┌──────────────────────┼───────────────────────────┼───┘  │    │
│         │                      │                           │      │    │
│         ▼                      ▼                           ▼      │    │
│  ┌──────────────┐       ┌──────────────┐       ┌──────────────┐  │    │
│  │defect_products│      │defect_       │       │defect_related│  │    │
│  ├──────────────┤       │ processes    │       │    _codes    │  │    │
│  │ id           │       ├──────────────┤       ├──────────────┤  │    │
│  │ defect_id    │       │ id           │       │ id           │  │    │
│  │ product_name │       │ defect_id    │       │ defect_id    │  │    │
│  └──────────────┘       │ process_name │       │ related_code │  │    │
│                         └──────────────┘       └──────────────┘  │    │
│                                                                   │    │
│  ┌──────────────┐                                                │    │
│  │ audit_logs   │◀───────────────────────────────────────────────┘    │
│  ├──────────────┤                                                      │
│  │ id           │                                                      │
│  │ table_name   │                                                      │
│  │ record_id    │                                                      │
│  │ action       │                                                      │
│  │ old_values   │                                                      │
│  │ new_values   │                                                      │
│  │ user_id      │                                                      │
│  │ created_at   │                                                      │
│  └──────────────┘                                                      │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Table Definitions

### 3.1 defects

Main table storing defect/failure mode information.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | INT | PRIMARY KEY, AUTO_INCREMENT | Unique identifier |
| code | VARCHAR(20) | UNIQUE, NOT NULL | Defect code (e.g., DK-001) |
| name | VARCHAR(255) | NOT NULL | Failure mode name |
| category | ENUM | NOT NULL | Category classification |
| severity | ENUM | NOT NULL | Severity level |
| description | TEXT | NOT NULL | Detailed description |
| failure_analysis | TEXT | NOT NULL | Investigation findings |
| root_cause | TEXT | NOT NULL | Identified root causes |
| corrective_action | TEXT | NOT NULL | Steps to correct |
| preventive_action | TEXT | NULL | Steps to prevent |
| occurrence_count | INT | DEFAULT 0 | Number of occurrences |
| last_occurrence | DATETIME | NULL | Last occurrence date |
| created_by | VARCHAR(100) | NOT NULL | Creator name |
| updated_by | VARCHAR(100) | NULL | Last updater name |
| created_at | DATETIME | DEFAULT CURRENT_TIMESTAMP | Creation timestamp |
| updated_at | DATETIME | ON UPDATE CURRENT_TIMESTAMP | Update timestamp |
| is_active | BOOLEAN | DEFAULT TRUE | Active status |

**Indexes:**
- PRIMARY KEY (id)
- UNIQUE INDEX (code)
- INDEX (category)
- INDEX (severity)
- INDEX (is_active)
- FULLTEXT INDEX (name, description, root_cause, corrective_action)

**Category ENUM Values:**
- VISUAL_DEFECT
- DIMENSIONAL_DEFECT
- FUNCTIONAL_DEFECT
- MATERIAL_DEFECT
- PROCESS_DEFECT
- ASSEMBLY_DEFECT
- PACKAGING_DEFECT
- OTHER

**Severity ENUM Values:**
- CRITICAL
- MAJOR
- MINOR
- COSMETIC

### 3.2 defect_images

Stores images associated with defects.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | INT | PRIMARY KEY, AUTO_INCREMENT | Unique identifier |
| defect_id | INT | FOREIGN KEY, NOT NULL | Reference to defects |
| url | VARCHAR(500) | NOT NULL | Image file path/URL |
| caption | VARCHAR(255) | NULL | Image caption |
| image_type | ENUM | NOT NULL | Type of image |
| uploaded_at | DATETIME | DEFAULT CURRENT_TIMESTAMP | Upload timestamp |
| uploaded_by | VARCHAR(100) | NOT NULL | Uploader name |

**Indexes:**
- PRIMARY KEY (id)
- INDEX (defect_id)
- FOREIGN KEY (defect_id) REFERENCES defects(id) ON DELETE CASCADE

**Image Type ENUM Values:**
- defect
- root_cause
- corrective_action
- reference

### 3.3 defect_products

Many-to-many relationship for applicable products.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | INT | PRIMARY KEY, AUTO_INCREMENT | Unique identifier |
| defect_id | INT | FOREIGN KEY, NOT NULL | Reference to defects |
| product_name | VARCHAR(100) | NOT NULL | Product name |

**Indexes:**
- PRIMARY KEY (id)
- INDEX (defect_id)
- UNIQUE INDEX (defect_id, product_name)
- FOREIGN KEY (defect_id) REFERENCES defects(id) ON DELETE CASCADE

### 3.4 defect_processes

Many-to-many relationship for applicable processes.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | INT | PRIMARY KEY, AUTO_INCREMENT | Unique identifier |
| defect_id | INT | FOREIGN KEY, NOT NULL | Reference to defects |
| process_name | VARCHAR(100) | NOT NULL | Process name |

**Indexes:**
- PRIMARY KEY (id)
- INDEX (defect_id)
- UNIQUE INDEX (defect_id, process_name)
- FOREIGN KEY (defect_id) REFERENCES defects(id) ON DELETE CASCADE

### 3.5 defect_related_codes

Links to P-Chart system defect codes.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | INT | PRIMARY KEY, AUTO_INCREMENT | Unique identifier |
| defect_id | INT | FOREIGN KEY, NOT NULL | Reference to defects |
| related_code | VARCHAR(50) | NOT NULL | P-Chart defect code |

**Indexes:**
- PRIMARY KEY (id)
- INDEX (defect_id)
- UNIQUE INDEX (defect_id, related_code)
- FOREIGN KEY (defect_id) REFERENCES defects(id) ON DELETE CASCADE

### 3.6 users (Future)

User management table.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | INT | PRIMARY KEY, AUTO_INCREMENT | Unique identifier |
| name | VARCHAR(100) | NOT NULL | User full name |
| email | VARCHAR(255) | UNIQUE, NOT NULL | Email address |
| password_hash | VARCHAR(255) | NOT NULL | Hashed password |
| role | ENUM | NOT NULL | User role |
| department | VARCHAR(100) | NULL | Department |
| is_active | BOOLEAN | DEFAULT TRUE | Active status |
| created_at | DATETIME | DEFAULT CURRENT_TIMESTAMP | Creation timestamp |
| last_login | DATETIME | NULL | Last login timestamp |

**Role ENUM Values:**
- ADMIN
- QUALITY_ENGINEER
- PROCESS_ENGINEER
- SUPERVISOR
- OPERATOR
- VIEWER

### 3.7 audit_logs

Tracks all changes to defect records.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | INT | PRIMARY KEY, AUTO_INCREMENT | Unique identifier |
| table_name | VARCHAR(50) | NOT NULL | Table that was modified |
| record_id | INT | NOT NULL | ID of modified record |
| action | ENUM | NOT NULL | Type of action |
| old_values | JSON | NULL | Previous values |
| new_values | JSON | NULL | New values |
| user_id | INT | NULL | User who made change |
| user_name | VARCHAR(100) | NOT NULL | User name |
| created_at | DATETIME | DEFAULT CURRENT_TIMESTAMP | Timestamp |

**Action ENUM Values:**
- CREATE
- UPDATE
- DELETE
- ACTIVATE
- DEACTIVATE

---

## 4. SQL Schema

```sql
-- Create database
CREATE DATABASE IF NOT EXISTS defect_knowledge_base
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE defect_knowledge_base;

-- Defects table
CREATE TABLE defects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(20) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    category ENUM(
        'VISUAL_DEFECT',
        'DIMENSIONAL_DEFECT',
        'FUNCTIONAL_DEFECT',
        'MATERIAL_DEFECT',
        'PROCESS_DEFECT',
        'ASSEMBLY_DEFECT',
        'PACKAGING_DEFECT',
        'OTHER'
    ) NOT NULL,
    severity ENUM('CRITICAL', 'MAJOR', 'MINOR', 'COSMETIC') NOT NULL,
    description TEXT NOT NULL,
    failure_analysis TEXT NOT NULL,
    root_cause TEXT NOT NULL,
    corrective_action TEXT NOT NULL,
    preventive_action TEXT,
    occurrence_count INT DEFAULT 0,
    last_occurrence DATETIME,
    created_by VARCHAR(100) NOT NULL,
    updated_by VARCHAR(100),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    
    INDEX idx_category (category),
    INDEX idx_severity (severity),
    INDEX idx_is_active (is_active),
    FULLTEXT INDEX idx_search (name, description, root_cause, corrective_action)
) ENGINE=InnoDB;

-- Defect images table
CREATE TABLE defect_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    defect_id INT NOT NULL,
    url VARCHAR(500) NOT NULL,
    caption VARCHAR(255),
    image_type ENUM('defect', 'root_cause', 'corrective_action', 'reference') NOT NULL,
    uploaded_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    uploaded_by VARCHAR(100) NOT NULL,
    
    INDEX idx_defect_id (defect_id),
    FOREIGN KEY (defect_id) REFERENCES defects(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Defect products table
CREATE TABLE defect_products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    defect_id INT NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    
    INDEX idx_defect_id (defect_id),
    UNIQUE INDEX idx_defect_product (defect_id, product_name),
    FOREIGN KEY (defect_id) REFERENCES defects(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Defect processes table
CREATE TABLE defect_processes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    defect_id INT NOT NULL,
    process_name VARCHAR(100) NOT NULL,
    
    INDEX idx_defect_id (defect_id),
    UNIQUE INDEX idx_defect_process (defect_id, process_name),
    FOREIGN KEY (defect_id) REFERENCES defects(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Defect related codes table
CREATE TABLE defect_related_codes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    defect_id INT NOT NULL,
    related_code VARCHAR(50) NOT NULL,
    
    INDEX idx_defect_id (defect_id),
    UNIQUE INDEX idx_defect_code (defect_id, related_code),
    FOREIGN KEY (defect_id) REFERENCES defects(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Audit logs table
CREATE TABLE audit_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    table_name VARCHAR(50) NOT NULL,
    record_id INT NOT NULL,
    action ENUM('CREATE', 'UPDATE', 'DELETE', 'ACTIVATE', 'DEACTIVATE') NOT NULL,
    old_values JSON,
    new_values JSON,
    user_id INT,
    user_name VARCHAR(100) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_table_record (table_name, record_id),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB;
```

---

## 5. Sample Queries

### 5.1 Search Defects

```sql
-- Full-text search
SELECT * FROM defects
WHERE MATCH(name, description, root_cause, corrective_action) 
      AGAINST('solder bridge' IN NATURAL LANGUAGE MODE)
AND is_active = TRUE
ORDER BY severity = 'CRITICAL' DESC, updated_at DESC;
```

### 5.2 Get Defect with Related Data

```sql
SELECT 
    d.*,
    GROUP_CONCAT(DISTINCT dp.product_name) AS products,
    GROUP_CONCAT(DISTINCT dpr.process_name) AS processes,
    GROUP_CONCAT(DISTINCT drc.related_code) AS related_codes
FROM defects d
LEFT JOIN defect_products dp ON d.id = dp.defect_id
LEFT JOIN defect_processes dpr ON d.id = dpr.defect_id
LEFT JOIN defect_related_codes drc ON d.id = drc.defect_id
WHERE d.id = ?
GROUP BY d.id;
```

### 5.3 Dashboard Statistics

```sql
-- Total counts
SELECT 
    COUNT(*) AS total,
    SUM(is_active) AS active,
    SUM(severity = 'CRITICAL') AS critical,
    COUNT(DISTINCT category) AS categories
FROM defects;

-- Category breakdown
SELECT category, COUNT(*) AS count
FROM defects
WHERE is_active = TRUE
GROUP BY category
ORDER BY count DESC;
```

---

## 6. Data Migration

### 6.1 From Excel/CSV

```sql
-- Load data from CSV
LOAD DATA INFILE '/path/to/defects.csv'
INTO TABLE defects
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(code, name, category, severity, description, 
 failure_analysis, root_cause, corrective_action, 
 preventive_action, created_by);
```

### 6.2 Backup Script

```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
mysqldump -u user -p defect_knowledge_base > backup_$DATE.sql
```
