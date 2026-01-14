"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
  Search,
} from "lucide-react";
import {
  mockDefects,
  searchDefects,
  getCategories,
  getFailureModes,
  getProcesses,
} from "@/data/mockDefects";
import { DEFECT_CATEGORIES, DefectCategory } from "@/types/defect";

function DefectsListContent() {
  console.log("DefectsListPage: Rendering defects list");

  const searchParams = useSearchParams();
  
  // Initialize from URL params
  const [itemFilter, setItemFilter] = useState(searchParams.get("item") || "");
  const [categoryFilter, setCategoryFilter] = useState(searchParams.get("category") || "");
  const [defectSearch, setDefectSearch] = useState(searchParams.get("defect") || "");
  const [showFilters, setShowFilters] = useState(false);

  // Update state when URL params change
  useEffect(() => {
    console.log("DefectsListPage: URL params changed:", {
      item: searchParams.get("item"),
      category: searchParams.get("category"),
      defect: searchParams.get("defect"),
    });
    setItemFilter(searchParams.get("item") || "");
    setCategoryFilter(searchParams.get("category") || "");
    setDefectSearch(searchParams.get("defect") || "");
  }, [searchParams]);

  // Filter defects based on search and filters
  const filteredDefects = useMemo(() => {
    console.log("DefectsListPage: Filtering defects with:", {
      itemFilter,
      categoryFilter,
      defectSearch,
    });

    return searchDefects(
      itemFilter || undefined,
      categoryFilter || undefined,
      defectSearch || undefined
    );
  }, [itemFilter, categoryFilter, defectSearch]);

  const clearFilters = () => {
    console.log("DefectsListPage: Clearing all filters");
    setItemFilter("");
    setCategoryFilter("");
    setDefectSearch("");
  };

  const hasActiveFilters = itemFilter || categoryFilter || defectSearch;

  // Get unique values for filters
  const failureModes = getFailureModes();
  const processes = getProcesses();
  const categories = getCategories();

  return (
    <DashboardLayout>
      <div className="py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            <span className=" text-purple-500 px-2 py-1">
              Defects List
            </span>
          </h1>
          <p className="text-gray-600 mt-2">
            Browse documented failure modes, investigation results, and corrective actions
          </p>
        </div>

        {/* Search and Filter Bar */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Item (Failure Mode)
                </label>
                <Input
                  placeholder="e.g., Exposed Wire"
                  value={itemFilter}
                  onChange={(e) => setItemFilter(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category (4M / Process)
                </label>
                <Input
                  placeholder="e.g., Machine, Soldering"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Search
                </label>
                <Input
                  placeholder="Search all fields..."
                  value={defectSearch}
                  onChange={(e) => setDefectSearch(e.target.value)}
                />
              </div>

              <div className="flex items-end gap-2">
                {hasActiveFilters && (
                  <Button variant="outline" onClick={clearFilters}>
                    <X className="h-4 w-4 mr-2" />
                    Clear
                  </Button>
                )}
                <Link href="/defects/add">
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add New
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

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
                <TableHead className="w-32">Failure Mode</TableHead>
                <TableHead>Process</TableHead>
                <TableHead className="w-28">Category</TableHead>
                <TableHead className="w-24">DRI</TableHead>
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
                        className="font-medium text-purple-600 hover:text-purple-800 hover:underline"
                      >
                        {defect.failureMode}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <div>
                        <Link
                          href={`/defects/${defect.id}`}
                          className="font-medium hover:text-purple-600"
                        >
                          {defect.process}
                        </Link>
                        <p className="text-sm text-gray-500 truncate max-w-md">
                          {defect.failureAnalysisRootCause.substring(0, 100)}...
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          defect.category === "MACHINE"
                            ? "info"
                            : defect.category === "MAN"
                            ? "warning"
                            : defect.category === "METHOD"
                            ? "secondary"
                            : "outline"
                        }
                      >
                        {DEFECT_CATEGORIES[defect.category]}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">
                      {defect.dri}
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
                Category Legend (4M):
              </span>
              {Object.entries(DEFECT_CATEGORIES).map(([key, value]) => (
                <div key={key} className="flex items-center gap-1">
                  <Badge
                    variant={
                      key === "MACHINE"
                        ? "info"
                        : key === "MAN"
                        ? "warning"
                        : key === "METHOD"
                        ? "secondary"
                        : "outline"
                    }
                  >
                    {value}
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

export default function DefectsListPage() {
  return (
    <Suspense fallback={
      <DashboardLayout>
        <div className="py-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              <span className="text-purple-500 px-2 py-1">
                Defects List
              </span>
            </h1>
            <p className="text-gray-600 mt-2">Loading defects...</p>
          </div>
        </div>
      </DashboardLayout>
    }>
      <DefectsListContent />
    </Suspense>
  );
}
