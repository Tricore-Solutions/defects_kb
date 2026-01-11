"use client";

import { useState, useMemo } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import PageHeader from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import {
  PlusCircle,
  Eye,
  Pencil,
  AlertTriangle,
  Filter,
  X,
  Image as ImageIcon,
} from "lucide-react";
import {
  mockDefects,
  searchDefects,
  getCategories,
  getSeverityLevels,
} from "@/data/mockDefects";
import {
  DEFECT_CATEGORIES,
  SEVERITY_LEVELS,
  DefectCategory,
  SeverityLevel,
} from "@/types/defect";

export default function DefectsListPage() {
  console.log("DefectsListPage: Rendering defects list");

  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [severityFilter, setSeverityFilter] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);

  // Filter defects based on search and filters
  const filteredDefects = useMemo(() => {
    console.log("DefectsListPage: Filtering defects with:", {
      searchQuery,
      categoryFilter,
      severityFilter,
    });

    return searchDefects(
      searchQuery || undefined,
      categoryFilter !== "all" ? (categoryFilter as DefectCategory) : undefined,
      severityFilter !== "all" ? (severityFilter as SeverityLevel) : undefined,
      undefined // Show all active/inactive
    );
  }, [searchQuery, categoryFilter, severityFilter]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("DefectsListPage: Search changed to:", e.target.value);
    setSearchQuery(e.target.value);
  };

  const clearFilters = () => {
    console.log("DefectsListPage: Clearing all filters");
    setSearchQuery("");
    setCategoryFilter("all");
    setSeverityFilter("all");
  };

  const hasActiveFilters =
    searchQuery || categoryFilter !== "all" || severityFilter !== "all";

  return (
    <DashboardLayout>
      <div className="py-6">
        <PageHeader
          title="Defect Knowledge Base"
          description="Search and browse documented failure modes, investigation results, and corrective actions"
          searchPlaceholder="Search by name, code, description, root cause..."
          searchValue={searchQuery}
          onSearchChange={handleSearchChange}
          actions={
            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className={showFilters ? "bg-purple-100" : ""}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
                {hasActiveFilters && (
                  <Badge variant="secondary" className="ml-2">
                    Active
                  </Badge>
                )}
              </Button>
              <Link href="/defects/add">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add New Defect
                </Button>
              </Link>
            </div>
          }
        />

        {/* Filter Panel */}
        {showFilters && (
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <Select
                    value={categoryFilter}
                    onValueChange={setCategoryFilter}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {Object.entries(DEFECT_CATEGORIES).map(([key, label]) => (
                        <SelectItem key={key} value={key}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Severity
                  </label>
                  <Select
                    value={severityFilter}
                    onValueChange={setSeverityFilter}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All Severities" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Severities</SelectItem>
                      {Object.entries(SEVERITY_LEVELS).map(([key, value]) => (
                        <SelectItem key={key} value={key}>
                          {value.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-end">
                  {hasActiveFilters && (
                    <Button variant="ghost" onClick={clearFilters}>
                      <X className="h-4 w-4 mr-2" />
                      Clear Filters
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Results Summary */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Showing {filteredDefects.length} of {mockDefects.length} defects
            {hasActiveFilters && " (filtered)"}
          </p>
        </div>

        {/* Defects Table */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-24">Code</TableHead>
                <TableHead>Failure Mode</TableHead>
                <TableHead className="w-40">Category</TableHead>
                <TableHead className="w-28">Severity</TableHead>
                <TableHead className="w-24 text-center">Images</TableHead>
                <TableHead className="w-28">Updated</TableHead>
                <TableHead className="w-32 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDefects.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="h-32 text-center text-gray-500"
                  >
                    <div className="flex flex-col items-center">
                      <AlertTriangle className="h-8 w-8 text-gray-400 mb-2" />
                      <p>No defects found matching your criteria</p>
                      {hasActiveFilters && (
                        <Button
                          variant="link"
                          onClick={clearFilters}
                          className="mt-2"
                        >
                          Clear filters
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredDefects.map((defect) => (
                  <TableRow
                    key={defect.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  >
                    <TableCell>
                      <Link
                        href={`/defects/${defect.id}`}
                        className="font-mono text-purple-600 hover:text-purple-800 hover:underline"
                      >
                        {defect.code}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <div>
                        <Link
                          href={`/defects/${defect.id}`}
                          className="font-medium hover:text-purple-600"
                        >
                          {defect.name}
                        </Link>
                        <p className="text-sm text-gray-500 truncate max-w-md">
                          {defect.description}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">
                        {DEFECT_CATEGORIES[defect.category]}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          defect.severity === "CRITICAL"
                            ? "critical"
                            : defect.severity === "MAJOR"
                            ? "warning"
                            : defect.severity === "MINOR"
                            ? "info"
                            : "secondary"
                        }
                      >
                        {SEVERITY_LEVELS[defect.severity].label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      {defect.images.length > 0 ? (
                        <div className="flex items-center justify-center text-green-600">
                          <ImageIcon className="h-4 w-4 mr-1" />
                          <span className="text-sm">{defect.images.length}</span>
                        </div>
                      ) : (
                        <span className="text-gray-400 text-sm">-</span>
                      )}
                    </TableCell>
                    <TableCell className="text-sm text-gray-500">
                      {new Date(defect.updatedAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-end space-x-1">
                        <Link href={`/defects/${defect.id}`}>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-blue-600 hover:text-blue-800"
                            title="View Details"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Link href={`/defects/${defect.id}/edit`}>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-purple-600 hover:text-purple-800"
                            title="Edit"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Legend */}
        <Card className="mt-6 bg-gray-50 dark:bg-gray-800/50">
          <CardContent className="py-4">
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <span className="font-medium text-gray-700">
                Severity Legend:
              </span>
              {Object.entries(SEVERITY_LEVELS).map(([key, value]) => (
                <div key={key} className="flex items-center gap-1">
                  <Badge
                    variant={
                      key === "CRITICAL"
                        ? "critical"
                        : key === "MAJOR"
                        ? "warning"
                        : key === "MINOR"
                        ? "info"
                        : "secondary"
                    }
                  >
                    {value.label}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
