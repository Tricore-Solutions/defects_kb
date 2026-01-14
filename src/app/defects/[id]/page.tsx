"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Link from "next/link";
import {
  ArrowLeft,
  Pencil,
  AlertTriangle,
  CheckCircle,
  FileText,
  Clock,
  User,
  Tag,
  Wrench,
  Target,
  Factory,
} from "lucide-react";
import { getDefectById } from "@/data/mockDefects";
import { DEFECT_CATEGORIES } from "@/types/defect";

export default function DefectDetailPage() {
  const params = useParams();
  const defectId = params.id as string;
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  console.log("DefectDetailPage: Loading defect with ID:", defectId);

  const defect = getDefectById(defectId);

  if (!defect) {
    return (
      <DashboardLayout>
        <div className="py-6">
          <div className="flex flex-col items-center justify-center h-96">
            <AlertTriangle className="h-16 w-16 text-yellow-500 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">
              Defect Not Found
            </h2>
            <p className="text-gray-500 mb-4">
              The defect with ID &quot;{defectId}&quot; could not be found.
            </p>
            <Link href="/defects">
              <Button>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Defect List
              </Button>
            </Link>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Link href="/defects">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold">
                  <span className="text-purple-500 px-2 py-1">
                    {defect.failureMode}
                  </span>
                </h1>
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
                  className="text-sm"
                >
                  {DEFECT_CATEGORIES[defect.category]}
                </Badge>
                <Badge
                  variant={defect.isActive ? "success" : "secondary"}
                  className="text-sm"
                >
                  {defect.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>
              <h2 className="text-lg text-gray-600 mt-1">{defect.process}</h2>
            </div>
          </div>
          <div className="flex space-x-2">
            <Link href={`/defects/${defect.id}/edit`}>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                <Pencil className="h-4 w-4 mr-2" />
                Edit Defect
              </Button>
            </Link>
          </div>
        </div>

        <div className="space-y-6">
          {/* Process & Details Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-gray-800">
                <Factory className="h-5 w-5 mr-2" />
                Process Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-500 flex items-center">
                      <FileText className="h-4 w-4 mr-2" />
                      Criteria / Limit
                    </span>
                    <span className="font-mono font-medium text-red-700">
                      {defect.criteriaAcceptanceLimit}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-500 flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      DRI
                    </span>
                    <span className="font-medium">
                      {defect.dri}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-500 flex items-center">
                      <Tag className="h-4 w-4 mr-2" />
                      Category
                    </span>
                    <span>{DEFECT_CATEGORIES[defect.category]}</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-500 flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Status
                    </span>
                    <Badge variant={defect.isActive ? "success" : "secondary"}>
                      {defect.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg text-sm space-y-1">
                    <div className="flex items-center justify-between text-gray-500">
                      <span className="flex items-center"><Clock className="h-3 w-3 mr-1" /> Created</span>
                      <span>{new Date(defect.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-gray-500">
                      <span className="flex items-center"><Clock className="h-3 w-3 mr-1" /> Updated</span>
                      <span>{new Date(defect.updatedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {defect.processImages && defect.processImages.length > 0 && (
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {defect.processImages.map((img, idx) => (
                      <div key={idx} className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden border border-gray-200 shadow-sm cursor-pointer group">
                        <img
                          src={img}
                          alt={`Process ${idx + 1}`}
                          className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                          onClick={() => setSelectedImage(img)}
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                            (e.target as HTMLImageElement).parentElement!.innerHTML = '<div class="flex items-center justify-center h-full text-xs text-gray-400">No Image</div>';
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Failure Analysis Section */}
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center text-orange-700">
                  <Target className="h-5 w-5 mr-2" />
                  Failure Analysis / Root Cause
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-6 mb-6 border border-orange-100">
                  <p className="text-gray-800 whitespace-pre-line leading-relaxed">
                    {defect.failureAnalysisRootCause}
                  </p>
                </div>
                
                {defect.failureAnalysisImages && defect.failureAnalysisImages.length > 0 && (
                  <div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {defect.failureAnalysisImages.map((img, idx) => (
                      <div key={idx} className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden border border-gray-200 shadow-sm cursor-pointer group">
                          <img
                            src={img}
                            alt={`Failure Analysis ${idx + 1}`}
                            className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                            onClick={() => setSelectedImage(img)}
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                              (e.target as HTMLImageElement).parentElement!.innerHTML = '<div class="flex items-center justify-center h-full text-xs text-gray-400">No Image</div>';
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Corrective Action Section */}
            <Card className="h-full border-t-4 border-t-blue-500">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-700">
                  <Wrench className="h-5 w-5 mr-2" />
                  Corrective Action
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 mb-6 border border-blue-100">
                  <p className="text-gray-800 whitespace-pre-line leading-relaxed">
                    {defect.correctiveAction}
                  </p>
                </div>

                {defect.correctiveActionImages && defect.correctiveActionImages.length > 0 && (
                  <div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {defect.correctiveActionImages.map((img, idx) => (
                      <div key={idx} className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden border border-gray-200 shadow-sm cursor-pointer group">
                          <img
                            src={img}
                            alt={`Corrective Action ${idx + 1}`}
                            className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                            onClick={() => setSelectedImage(img)}
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                              (e.target as HTMLImageElement).parentElement!.innerHTML = '<div class="flex items-center justify-center h-full text-xs text-gray-400">No Image</div>';
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
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
    </DashboardLayout>
  );
}
