"use client";

import { useMemo, Suspense, useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
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
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { searchDefects } from "@/data/mockDefects";
import { DEFECT_CATEGORIES, DefectKnowledge } from "@/types/defect";

type SortField = "failureMode" | "process" | "category" | "dri" | "criteriaAcceptanceLimit";
type SortDirection = "asc" | "desc" | null;

// Image Grid Component
const ImageGrid = ({ 
  images, 
  altPrefix, 
  onImageClick 
}: { 
  images: string[]; 
  altPrefix: string; 
  onImageClick: (img: string) => void;
}) => {
  if (!images || images.length === 0) return null;
  
  return (
    <div className="grid grid-cols-2 gap-2 mt-3">
      {images.map((img, idx) => (
        <div 
          key={idx} 
          className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden border border-gray-200 cursor-pointer hover:ring-2 hover:ring-purple-400 transition-all duration-200 shadow-sm"
        >
          <img 
            src={img} 
            alt={`${altPrefix} ${idx + 1}`} 
            className="object-cover w-full h-full"
            onClick={() => onImageClick(img)}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
              (e.target as HTMLImageElement).parentElement!.innerHTML = '<div class="flex items-center justify-center h-full text-xs text-gray-400">No Image</div>';
            }}
          />
        </div>
      ))}
    </div>
  );
};

// Mobile Card Component
const DefectCard = ({ 
  defect, 
  onImageClick 
}: { 
  defect: DefectKnowledge; 
  onImageClick: (img: string) => void;
}) => {
  return (
    <Card className="mb-4 overflow-hidden hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-purple-500">
      <CardContent className="p-0">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-50 to-white p-4 border-b">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-bold text-purple-700 text-lg">{defect.failureMode}</h3>
              <p className="text-sm text-gray-600 mt-1">{defect.process}</p>
            </div>
            <div className="flex gap-1">
              <Link href={`/defects/${defect.id}`}>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600 hover:text-blue-800 hover:bg-blue-50">
                  <Eye className="h-4 w-4" />
                </Button>
              </Link>
              <Link href={`/defects/${defect.id}/edit`}>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-purple-600 hover:text-purple-800 hover:bg-purple-50">
                  <Pencil className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            <Badge variant={
              defect.category === "MACHINE" ? "info" :
              defect.category === "MAN" ? "warning" :
              defect.category === "METHOD" ? "secondary" : "outline"
            }>
              {DEFECT_CATEGORIES[defect.category]}
            </Badge>
            <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
              {defect.criteriaAcceptanceLimit}
            </Badge>
            <Badge variant="outline" className="bg-gray-50">
              DRI: {defect.dri}
            </Badge>
          </div>
        </div>

        {/* Process Images */}
        {defect.processImages && defect.processImages.length > 0 && (
          <div className="p-4 border-b bg-gray-50/50">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Process Images</p>
            <ImageGrid images={defect.processImages} altPrefix="Process" onImageClick={onImageClick} />
          </div>
        )}

        {/* Failure Analysis */}
        <div className="p-4 border-b">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Failure Analysis / Root Cause</p>
          <p className="text-sm text-gray-700 whitespace-pre-line">{defect.failureAnalysisRootCause}</p>
          <ImageGrid images={defect.failureAnalysisImages} altPrefix="FA" onImageClick={onImageClick} />
        </div>

        {/* Corrective Action */}
        <div className="p-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Corrective Action</p>
          <p className="text-sm text-gray-700 whitespace-pre-line">{defect.correctiveAction}</p>
          <ImageGrid images={defect.correctiveActionImages} altPrefix="CA" onImageClick={onImageClick} />
        </div>
      </CardContent>
    </Card>
  );
};

// Sortable Header Component
const SortableHeader = ({ 
  label, 
  field, 
  currentSort, 
  currentDirection, 
  onSort,
  className = ""
}: { 
  label: string; 
  field: SortField; 
  currentSort: SortField | null; 
  currentDirection: SortDirection; 
  onSort: (field: SortField) => void;
  className?: string;
}) => {
  const isActive = currentSort === field;
  
  return (
    <TableHead 
      className={`cursor-pointer select-none hover:bg-gray-100 transition-colors ${className}`}
      onClick={() => onSort(field)}
    >
      <div className="flex items-center gap-1">
        <span>{label}</span>
        {isActive ? (
          currentDirection === "asc" ? (
            <ArrowUp className="h-4 w-4 text-purple-600" />
          ) : (
            <ArrowDown className="h-4 w-4 text-purple-600" />
          )
        ) : (
          <ArrowUpDown className="h-4 w-4 text-gray-400" />
        )}
      </div>
    </TableHead>
  );
};

function DefectsListContent() {
  console.log("DefectsListPage: Rendering defects list");

  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  
  // Sorting state
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  
  // Filter defects based on search params directly
  const filteredDefects = useMemo(() => {
    const item = searchParams.get("item");
    const category = searchParams.get("category");
    const defect = searchParams.get("defect");

    console.log("DefectsListPage: Filtering defects with:", {
      item,
      category,
      defect,
    });

    return searchDefects(
      item || undefined,
      category || undefined,
      defect || undefined
    );
  }, [searchParams]);

  // Sort defects
  const sortedDefects = useMemo(() => {
    if (!sortField || !sortDirection) return filteredDefects;
    
    return [...filteredDefects].sort((a, b) => {
      const aValue = a[sortField] || "";
      const bValue = b[sortField] || "";
      
      if (sortDirection === "asc") {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    });
  }, [filteredDefects, sortField, sortDirection]);

  // Paginate defects
  const paginatedDefects = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedDefects.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedDefects, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(sortedDefects.length / itemsPerPage);

  const hasActiveFilters = 
    !!searchParams.get("item") || 
    !!searchParams.get("category") || 
    !!searchParams.get("defect");

  const clearFilters = () => {
    router.push("/defects");
  };

  const handleSort = useCallback((field: SortField) => {
    if (sortField === field) {
      // Cycle through: asc -> desc -> null
      if (sortDirection === "asc") {
        setSortDirection("desc");
      } else if (sortDirection === "desc") {
        setSortField(null);
        setSortDirection(null);
      }
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
    setCurrentPage(1); // Reset to first page on sort
  }, [sortField, sortDirection]);

  const handlePageChange = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1); // Reset to first page
  };

  return (
    <DashboardLayout>
      <div className="py-6">
        {/* Header */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              <span className="bg-purple-500 text-white px-3 py-1 rounded-lg">
                Defects List
              </span>
            </h1>
            <p className="text-gray-600 mt-2">
              Browse documented failure modes, investigation results, and corrective actions
            </p>
          </div>
              <Link href="/defects/add">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white shadow-md hover:shadow-lg transition-shadow">
                  <PlusCircle className="h-4 w-4 mr-2" />
              Add New
                </Button>
              </Link>
            </div>

        {/* Controls Bar */}
        <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center gap-4">
            <p className="text-sm text-gray-600">
              Showing <span className="font-semibold text-purple-600">{paginatedDefects.length}</span> of{" "}
              <span className="font-semibold">{sortedDefects.length}</span> defects
              {hasActiveFilters && " (filtered)"}
            </p>
                  {hasActiveFilters && (
              <Button variant="ghost" onClick={clearFilters} size="sm" className="text-gray-500 hover:text-gray-900">
                Clear filters
                    </Button>
                  )}
                </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Show:</span>
            <Select value={String(itemsPerPage)} onValueChange={handleItemsPerPageChange}>
              <SelectTrigger className="w-20 h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
            <span className="text-sm text-gray-600">per page</span>
              </div>
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block bg-white shadow-md rounded-lg overflow-hidden border">
          <div className="overflow-x-auto">
          <Table>
            <TableHeader>
                <TableRow className="bg-gradient-to-r from-gray-50 to-gray-100">
                  <SortableHeader 
                    label="Failure Mode" 
                    field="failureMode" 
                    currentSort={sortField} 
                    currentDirection={sortDirection} 
                    onSort={handleSort}
                    className="w-36"
                  />
                  <SortableHeader 
                    label="Process" 
                    field="process" 
                    currentSort={sortField} 
                    currentDirection={sortDirection} 
                    onSort={handleSort}
                    className="w-64"
                  />
                  <SortableHeader 
                    label="Criteria" 
                    field="criteriaAcceptanceLimit" 
                    currentSort={sortField} 
                    currentDirection={sortDirection} 
                    onSort={handleSort}
                    className="w-28 bg-red-50 text-red-900"
                  />
                  <SortableHeader 
                    label="DRI" 
                    field="dri" 
                    currentSort={sortField} 
                    currentDirection={sortDirection} 
                    onSort={handleSort}
                    className="w-24"
                  />
                  <SortableHeader 
                    label="Category" 
                    field="category" 
                    currentSort={sortField} 
                    currentDirection={sortDirection} 
                    onSort={handleSort}
                    className="w-28"
                  />
                  <TableHead className="w-80">Failure Analysis / Root Cause</TableHead>
                  <TableHead className="w-80">Corrective Action</TableHead>
                  <TableHead className="w-24 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
                {paginatedDefects.length === 0 ? (
                <TableRow>
                    <TableCell colSpan={8} className="h-32 text-center text-gray-500">
                    <div className="flex flex-col items-center">
                      <AlertTriangle className="h-8 w-8 text-gray-400 mb-2" />
                      <p>No defects found matching your criteria</p>
                      {hasActiveFilters && (
                          <Button variant="link" onClick={clearFilters} className="mt-2">
                          Clear filters
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                  paginatedDefects.map((defect, index) => (
                  <TableRow
                    key={defect.id}
                      className={`hover:bg-purple-50/50 transition-colors align-top ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                      }`}
                    >
                      <TableCell className="font-semibold text-purple-700">
                        {defect.failureMode}
                    </TableCell>
                    <TableCell>
                        <div className="space-y-2">
                          <div className="font-medium text-gray-900">{defect.process}</div>
                          <ImageGrid images={defect.processImages} altPrefix="Process" onImageClick={setSelectedImage} />
                      </div>
                    </TableCell>
                      <TableCell className="font-mono text-sm bg-red-50/50 text-red-800 align-middle">
                        <span className="bg-red-100 px-2 py-1 rounded">{defect.criteriaAcceptanceLimit}</span>
                    </TableCell>
                      <TableCell className="align-middle font-medium">{defect.dri}</TableCell>
                      <TableCell className="align-middle">
                      <Badge
                        variant={
                            defect.category === "MACHINE" ? "info" :
                            defect.category === "MAN" ? "warning" :
                            defect.category === "METHOD" ? "secondary" : "outline"
                          }
                          className="shadow-sm"
                        >
                          {DEFECT_CATEGORIES[defect.category]}
                      </Badge>
                    </TableCell>
                      <TableCell>
                        <div className="space-y-2">
                          <div className="text-sm text-gray-700 whitespace-pre-line max-h-40 overflow-y-auto pr-2">
                            {defect.failureAnalysisRootCause}
                          </div>
                          <ImageGrid images={defect.failureAnalysisImages} altPrefix="FA" onImageClick={setSelectedImage} />
                        </div>
                    </TableCell>
                    <TableCell>
                        <div className="space-y-2">
                          <div className="text-sm text-gray-700 whitespace-pre-line max-h-40 overflow-y-auto pr-2">
                            {defect.correctiveAction}
                          </div>
                          <ImageGrid images={defect.correctiveActionImages} altPrefix="CA" onImageClick={setSelectedImage} />
                        </div>
                      </TableCell>
                      <TableCell className="text-right align-middle">
                        <div className="flex justify-end gap-1">
                        <Link href={`/defects/${defect.id}`}>
                          <Button
                            variant="ghost"
                            size="icon"
                              className="h-9 w-9 text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                            title="View Details"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Link href={`/defects/${defect.id}/edit`}>
                          <Button
                            variant="ghost"
                            size="icon"
                              className="h-9 w-9 text-purple-600 hover:text-purple-800 hover:bg-purple-50"
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
        </div>

        {/* Mobile Card View */}
        <div className="lg:hidden">
          {paginatedDefects.length === 0 ? (
            <Card className="p-8 text-center">
              <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No defects found matching your criteria</p>
              {hasActiveFilters && (
                <Button variant="link" onClick={clearFilters} className="mt-2">
                  Clear filters
                </Button>
              )}
            </Card>
          ) : (
            paginatedDefects.map((defect) => (
              <DefectCard key={defect.id} defect={defect} onImageClick={setSelectedImage} />
            ))
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-lg shadow-sm border">
            <p className="text-sm text-gray-600">
              Page <span className="font-semibold text-purple-600">{currentPage}</span> of{" "}
              <span className="font-semibold">{totalPages}</span>
            </p>
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9"
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
                title="First page"
              >
                <ChevronsLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                title="Previous page"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              {/* Page numbers */}
              <div className="hidden sm:flex items-center gap-1 mx-2">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum: number;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      size="icon"
                      className={`h-9 w-9 ${currentPage === pageNum ? "bg-purple-600 hover:bg-purple-700" : ""}`}
                      onClick={() => handlePageChange(pageNum)}
                    >
                      {pageNum}
                    </Button>
                  );
                })}
              </div>

              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                title="Next page"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9"
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
                title="Last page"
              >
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </div>
                </div>
        )}

        {/* Image Modal */}
        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-5xl p-2 overflow-hidden bg-black/90 border-none">
            <div className="relative w-full h-full flex items-center justify-center">
              {selectedImage && (
                <img
                  src={selectedImage}
                  alt="Full size view"
                  className="max-w-full max-h-[85vh] object-contain rounded-lg"
                />
              )}
            </div>
          </DialogContent>
        </Dialog>
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
              <span className="bg-purple-500 text-white px-3 py-1 rounded-lg">
                Defects List
              </span>
            </h1>
            <p className="text-gray-600 mt-2">Loading defects...</p>
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-gray-100 rounded-lg animate-pulse" />
            ))}
          </div>
        </div>
      </DashboardLayout>
    }>
      <DefectsListContent />
    </Suspense>
  );
}
