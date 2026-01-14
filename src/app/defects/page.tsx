"use client";

import { useMemo, Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent } from "@/components/ui/dialog";
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
} from "lucide-react";
import {
  mockDefects,
  searchDefects,
} from "@/data/mockDefects";
import { DEFECT_CATEGORIES } from "@/types/defect";

function DefectsListContent() {
  console.log("DefectsListPage: Rendering defects list");

  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
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

  const hasActiveFilters = 
    !!searchParams.get("item") || 
    !!searchParams.get("category") || 
    !!searchParams.get("defect");

  const clearFilters = () => {
    router.push("/defects");
  };

  return (
    <DashboardLayout>
      <div className="py-6">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              <span className="bg-purple-500 text-white px-2 py-1">
                Defects List
              </span>
            </h1>
            <p className="text-gray-600 mt-2">
              Browse documented failure modes, investigation results, and corrective actions
            </p>
          </div>
          <Link href="/defects/add">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">
              <PlusCircle className="h-4 w-4 mr-2" />
              Add New
            </Button>
          </Link>
        </div>

        {/* Results Summary */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Showing {filteredDefects.length} of {mockDefects.length} defects
            {hasActiveFilters && " (filtered)"}
          </p>
          {hasActiveFilters && (
            <Button variant="ghost" onClick={clearFilters} size="sm" className="text-gray-500 hover:text-gray-900">
              Clear filters
            </Button>
          )}
        </div>

        {/* Defects Table */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-x-auto">
          <Table className="min-w-[1500px]">
            <TableHeader>
              <TableRow>
                <TableHead className="w-32 bg-gray-50">Failure Mode</TableHead>
                <TableHead className="w-64 bg-gray-50">Process</TableHead>
                <TableHead className="w-32 bg-red-100 text-red-900">Criteria / Acceptance Limit</TableHead>
                <TableHead className="w-24 bg-gray-50">DRI</TableHead>
                <TableHead className="w-28 bg-gray-50">Category</TableHead>
                <TableHead className="w-80 bg-gray-50">Failure Analysis / Root Cause</TableHead>
                <TableHead className="w-80 bg-gray-50">Corrective Action</TableHead>
                <TableHead className="w-20 bg-gray-50 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDefects.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={8}
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
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/50 align-top"
                  >
                    <TableCell className="font-medium text-purple-600">
                      {defect.failureMode}
                    </TableCell>
                    <TableCell>
                      <div className="space-y-3">
                        <div className="font-medium">{defect.process}</div>
                        {defect.processImages && defect.processImages.length > 0 && (
                          <div className="grid grid-cols-2 gap-2">
                            {defect.processImages.map((img, idx) => (
                              <div key={idx} className="relative aspect-video bg-gray-100 rounded overflow-hidden border border-gray-200 cursor-pointer hover:opacity-90 transition-opacity">
                                <img 
                                  src={img} 
                                  alt={`Process ${idx + 1}`} 
                                  className="object-cover w-full h-full"
                                  onClick={() => setSelectedImage(img)}
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).style.display = 'none';
                                    (e.target as HTMLImageElement).parentElement!.innerHTML = '<div class="flex items-center justify-center h-full text-xs text-gray-400">No Image</div>';
                                  }}
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm bg-red-50 text-red-900 align-middle">
                      {defect.criteriaAcceptanceLimit}
                    </TableCell>
                    <TableCell className="align-middle">{defect.dri}</TableCell>
                    <TableCell className="align-middle">
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
                    <TableCell>
                      <div className="space-y-3">
                        <div className="text-sm whitespace-pre-line max-h-48 overflow-y-auto">
                          {defect.failureAnalysisRootCause}
                        </div>
                        {defect.failureAnalysisImages && defect.failureAnalysisImages.length > 0 && (
                          <div className="grid grid-cols-2 gap-2">
                            {defect.failureAnalysisImages.map((img, idx) => (
                              <div key={idx} className="relative aspect-video bg-gray-100 rounded overflow-hidden border border-gray-200 cursor-pointer hover:opacity-90 transition-opacity">
                                <img 
                                  src={img} 
                                  alt={`FA ${idx + 1}`} 
                                  className="object-cover w-full h-full"
                                  onClick={() => setSelectedImage(img)}
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).style.display = 'none';
                                    (e.target as HTMLImageElement).parentElement!.innerHTML = '<div class="flex items-center justify-center h-full text-xs text-gray-400">No Image</div>';
                                  }}
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-3">
                        <div className="text-sm whitespace-pre-line max-h-48 overflow-y-auto">
                          {defect.correctiveAction}
                        </div>
                        {defect.correctiveActionImages && defect.correctiveActionImages.length > 0 && (
                          <div className="grid grid-cols-2 gap-2">
                            {defect.correctiveActionImages.map((img, idx) => (
                              <div key={idx} className="relative aspect-video bg-gray-100 rounded overflow-hidden border border-gray-200 cursor-pointer hover:opacity-90 transition-opacity">
                                <img 
                                  src={img} 
                                  alt={`CA ${idx + 1}`} 
                                  className="object-cover w-full h-full"
                                  onClick={() => setSelectedImage(img)}
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).style.display = 'none';
                                    (e.target as HTMLImageElement).parentElement!.innerHTML = '<div class="flex items-center justify-center h-full text-xs text-gray-400">No Image</div>';
                                  }}
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right align-middle">
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

        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-4xl p-0 overflow-hidden bg-transparent border-none shadow-none">
            <div className="relative w-full h-full flex items-center justify-center">
              {selectedImage && (
                <img
                  src={selectedImage}
                  alt="Full size view"
                  className="max-w-full max-h-[90vh] object-contain rounded-lg"
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
              <span className="bg-purple-500 text-white px-2 py-1">
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
