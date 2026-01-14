"use client";

import { useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
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
                <TableHead className="w-48 bg-gray-50">Process</TableHead>
                <TableHead className="w-48 bg-gray-50">Process Images</TableHead>
                <TableHead className="w-32 bg-red-100 text-red-900">Criteria / Acceptance Limit</TableHead>
                <TableHead className="w-24 bg-gray-50">DRI</TableHead>
                <TableHead className="w-28 bg-gray-50">Category</TableHead>
                <TableHead className="w-64 bg-gray-50">Failure Analysis / Root Cause</TableHead>
                <TableHead className="w-48 bg-gray-50">FA / Root Cause Images</TableHead>
                <TableHead className="w-64 bg-gray-50">Corrective Action</TableHead>
                <TableHead className="w-48 bg-gray-50">Corrective Action Images</TableHead>
                <TableHead className="w-20 bg-gray-50 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDefects.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={11}
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
                    <TableCell>{defect.process}</TableCell>
                    <TableCell>
                      {defect.processImages && defect.processImages.length > 0 ? (
                        <div className="grid grid-cols-1 gap-2">
                          {defect.processImages.map((img, idx) => (
                            <div key={idx} className="relative aspect-video bg-gray-100 rounded overflow-hidden border border-gray-200">
                              {/* Using generic placeholder or simple img tag */}
                              {/* In a real app, use next/image with proper config */}
                              <img 
                                src={img} 
                                alt={`Process ${idx + 1}`} 
                                className="object-cover w-full h-full"
                                onError={(e) => {
                                  // Fallback if image fails
                                  (e.target as HTMLImageElement).style.display = 'none';
                                  (e.target as HTMLImageElement).parentElement!.innerHTML = '<div class="flex items-center justify-center h-full text-xs text-gray-400">No Image</div>';
                                }}
                              />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <span className="text-gray-400 text-xs">-</span>
                      )}
                    </TableCell>
                    <TableCell className="font-mono text-sm bg-red-50 text-red-900">
                      {defect.criteriaAcceptanceLimit}
                    </TableCell>
                    <TableCell>{defect.dri}</TableCell>
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
                    <TableCell>
                      <div className="text-sm whitespace-pre-line max-h-48 overflow-y-auto">
                        {defect.failureAnalysisRootCause}
                      </div>
                    </TableCell>
                    <TableCell>
                      {defect.failureAnalysisImages && defect.failureAnalysisImages.length > 0 ? (
                        <div className="grid grid-cols-1 gap-2">
                          {defect.failureAnalysisImages.map((img, idx) => (
                            <div key={idx} className="relative aspect-video bg-gray-100 rounded overflow-hidden border border-gray-200">
                              <img 
                                src={img} 
                                alt={`FA ${idx + 1}`} 
                                className="object-cover w-full h-full"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).style.display = 'none';
                                  (e.target as HTMLImageElement).parentElement!.innerHTML = '<div class="flex items-center justify-center h-full text-xs text-gray-400">No Image</div>';
                                }}
                              />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <span className="text-gray-400 text-xs">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="text-sm whitespace-pre-line max-h-48 overflow-y-auto">
                        {defect.correctiveAction}
                      </div>
                    </TableCell>
                    <TableCell>
                      {defect.correctiveActionImages && defect.correctiveActionImages.length > 0 ? (
                        <div className="grid grid-cols-1 gap-2">
                          {defect.correctiveActionImages.map((img, idx) => (
                            <div key={idx} className="relative aspect-video bg-gray-100 rounded overflow-hidden border border-gray-200">
                              <img 
                                src={img} 
                                alt={`CA ${idx + 1}`} 
                                className="object-cover w-full h-full"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).style.display = 'none';
                                  (e.target as HTMLImageElement).parentElement!.innerHTML = '<div class="flex items-center justify-center h-full text-xs text-gray-400">No Image</div>';
                                }}
                              />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <span className="text-gray-400 text-xs">-</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
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
