"use client";

import { useParams } from "next/navigation";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import {
  ArrowLeft,
  Pencil,
  AlertTriangle,
  CheckCircle,
  FileText,
  Image as ImageIcon,
  Clock,
  User,
  Tag,
  Wrench,
  Target,
  Lightbulb,
  BookOpen,
  Factory,
} from "lucide-react";
import { getDefectById } from "@/data/mockDefects";
import { DEFECT_CATEGORIES } from "@/types/defect";

export default function DefectDetailPage() {
  const params = useParams();
  const defectId = params.id as string;

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
                  <span className=" text-purple-500 px-2 py-1">
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

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-white dark:bg-gray-800 p-1 shadow">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="analysis"
              className="flex items-center gap-2"
            >
              <Target className="h-4 w-4" />
              Failure Analysis
            </TabsTrigger>
            <TabsTrigger value="actions" className="flex items-center gap-2">
              <Wrench className="h-4 w-4" />
              Corrective Actions
            </TabsTrigger>
            <TabsTrigger value="images" className="flex items-center gap-2">
              <ImageIcon className="h-4 w-4" />
              Images ({defect.images.length})
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Info */}
              <div className="lg:col-span-2 space-y-6">
                {/* Quick Reference Card - For Manufacturing */}
                <Card className="border-l-4 border-l-green-500 bg-green-50 dark:bg-green-900/20">
                  <CardHeader>
                    <CardTitle className="flex items-center text-green-700">
                      <Lightbulb className="h-5 w-5 mr-2" />
                      Quick Reference for Manufacturing
                    </CardTitle>
                    <CardDescription>
                      What to do when you encounter this defect
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-green-800 mb-2">
                          Corrective Action:
                        </h4>
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 whitespace-pre-line text-sm">
                          {defect.correctiveAction}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Root Cause Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <AlertTriangle className="h-5 w-5 mr-2 text-orange-600" />
                      Root Cause Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {defect.failureAnalysisRootCause.substring(0, 300)}...
                    </p>
                    <Button variant="link" className="mt-2 p-0">
                      <Link href="#" onClick={() => document.querySelector('[value="analysis"]')?.dispatchEvent(new Event('click'))}>
                        Read full analysis →
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar Info */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 flex items-center">
                        <Factory className="h-4 w-4 mr-2" />
                        Process
                      </span>
                      <span className="font-medium text-right text-sm max-w-[180px]">
                        {defect.process}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 flex items-center">
                        <Tag className="h-4 w-4 mr-2" />
                        Category (4M)
                      </span>
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
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 flex items-center">
                        <FileText className="h-4 w-4 mr-2" />
                        Criteria
                      </span>
                      <span className="font-mono text-sm">
                        {defect.criteriaAcceptanceLimit}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 flex items-center">
                        <User className="h-4 w-4 mr-2" />
                        DRI
                      </span>
                      <span className="font-medium">
                        {defect.dri}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Status
                      </span>
                      <Badge variant={defect.isActive ? "success" : "secondary"}>
                        {defect.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Audit Trail</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div className="flex items-center text-gray-600">
                      <User className="h-4 w-4 mr-2" />
                      Created by: {defect.createdBy}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-4 w-4 mr-2" />
                      Created: {new Date(defect.createdAt).toLocaleDateString()}
                    </div>
                    {defect.updatedBy && (
                      <div className="flex items-center text-gray-600">
                        <User className="h-4 w-4 mr-2" />
                        Updated by: {defect.updatedBy}
                      </div>
                    )}
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-4 w-4 mr-2" />
                      Updated: {new Date(defect.updatedAt).toLocaleDateString()}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Failure Analysis Tab */}
          <TabsContent value="analysis">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-orange-700">
                  <Target className="h-5 w-5 mr-2" />
                  Failure Analysis / Root Cause
                </CardTitle>
                <CardDescription>
                  Detailed analysis of the failure mode and its root causes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-6">
                  <p className="text-gray-700 whitespace-pre-line leading-relaxed text-base">
                    {defect.failureAnalysisRootCause}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Corrective Actions Tab */}
          <TabsContent value="actions">
            <Card className="border-l-4 border-l-blue-500">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-700">
                  <Wrench className="h-5 w-5 mr-2" />
                  Corrective Action
                </CardTitle>
                <CardDescription>
                  Steps to correct the defect when found
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                  <p className="text-gray-700 whitespace-pre-line leading-relaxed text-base">
                    {defect.correctiveAction}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Images Tab */}
          <TabsContent value="images">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ImageIcon className="h-5 w-5 mr-2 text-purple-600" />
                  Reference Images
                </CardTitle>
                <CardDescription>
                  Visual documentation of the defect
                </CardDescription>
              </CardHeader>
              <CardContent>
                {defect.images.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {defect.images.map((image) => (
                      <div
                        key={image.id}
                        className="border rounded-lg overflow-hidden"
                      >
                        <div className="aspect-video bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                          {/* Placeholder for actual image */}
                          <div className="text-center p-4">
                            <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-500">
                              Image placeholder
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                              {image.url}
                            </p>
                          </div>
                        </div>
                        <div className="p-3 bg-gray-50 dark:bg-gray-800">
                          <Badge variant="outline" className="mb-2">
                            {image.imageType.replace("_", " ")}
                          </Badge>
                          {image.caption && (
                            <p className="text-sm text-gray-600">
                              {image.caption}
                            </p>
                          )}
                          <p className="text-xs text-gray-400 mt-1">
                            Uploaded by {image.uploadedBy} on{" "}
                            {new Date(image.uploadedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <ImageIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-700 mb-2">
                      No Images Yet
                    </h3>
                    <p className="text-gray-500 mb-4">
                      No reference images have been uploaded for this defect.
                    </p>
                    <Link href={`/defects/${defect.id}/edit`}>
                      <Button variant="outline">
                        <Pencil className="h-4 w-4 mr-2" />
                        Add Images
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
