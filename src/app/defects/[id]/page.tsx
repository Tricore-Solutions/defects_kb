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
  Shield,
  Target,
  Lightbulb,
  BookOpen,
} from "lucide-react";
import { getDefectById } from "@/data/mockDefects";
import { DEFECT_CATEGORIES, SEVERITY_LEVELS } from "@/types/defect";

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

  const severityInfo = SEVERITY_LEVELS[defect.severity];

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
                <h1 className="text-2xl font-bold text-purple-700">
                  {defect.code}
                </h1>
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
                  className="text-sm"
                >
                  {severityInfo.label}
                </Badge>
                <Badge
                  variant={defect.isActive ? "success" : "secondary"}
                  className="text-sm"
                >
                  {defect.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>
              <h2 className="text-xl text-gray-700 mt-1">{defect.name}</h2>
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
              value="investigation"
              className="flex items-center gap-2"
            >
              <Target className="h-4 w-4" />
              Investigation
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
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BookOpen className="h-5 w-5 mr-2 text-purple-600" />
                      Description
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed">
                      {defect.description}
                    </p>
                  </CardContent>
                </Card>

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
                          Immediate Actions:
                        </h4>
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 whitespace-pre-line text-sm">
                          {defect.correctiveAction}
                        </div>
                      </div>
                      {defect.preventiveAction && (
                        <div>
                          <h4 className="font-semibold text-green-800 mb-2">
                            Prevention:
                          </h4>
                          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-sm">
                            {defect.preventiveAction}
                          </div>
                        </div>
                      )}
                    </div>
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
                        <Tag className="h-4 w-4 mr-2" />
                        Category
                      </span>
                      <span className="font-medium">
                        {DEFECT_CATEGORIES[defect.category]}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 flex items-center">
                        <AlertTriangle className="h-4 w-4 mr-2" />
                        Severity
                      </span>
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
                        {severityInfo.label}
                      </Badge>
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
                    {defect.occurrenceCount !== undefined && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                          Occurrences
                        </span>
                        <span className="font-medium">
                          {defect.occurrenceCount}
                        </span>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Applicable To</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {defect.applicableProducts &&
                      defect.applicableProducts.length > 0 && (
                        <div>
                          <span className="text-sm text-gray-500 block mb-2">
                            Products
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {defect.applicableProducts.map((product) => (
                              <Badge key={product} variant="outline">
                                {product}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    {defect.applicableProcesses &&
                      defect.applicableProcesses.length > 0 && (
                        <div>
                          <span className="text-sm text-gray-500 block mb-2">
                            Processes
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {defect.applicableProcesses.map((process) => (
                              <Badge key={process} variant="outline">
                                {process}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    {defect.relatedDefectCodes &&
                      defect.relatedDefectCodes.length > 0 && (
                        <div>
                          <span className="text-sm text-gray-500 block mb-2">
                            Related Codes (P-Chart)
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {defect.relatedDefectCodes.map((code) => (
                              <Badge
                                key={code}
                                variant="secondary"
                                className="font-mono"
                              >
                                {code}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
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

          {/* Investigation Tab */}
          <TabsContent value="investigation">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-orange-700">
                    <Target className="h-5 w-5 mr-2" />
                    Failure Analysis
                  </CardTitle>
                  <CardDescription>
                    Detailed analysis of the failure mode
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
                    <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                      {defect.failureAnalysis}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-red-700">
                    <AlertTriangle className="h-5 w-5 mr-2" />
                    Root Cause
                  </CardTitle>
                  <CardDescription>
                    Identified root causes of the defect
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
                    <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                      {defect.rootCause}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Corrective Actions Tab */}
          <TabsContent value="actions">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                    <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                      {defect.correctiveAction}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-500">
                <CardHeader>
                  <CardTitle className="flex items-center text-green-700">
                    <Shield className="h-5 w-5 mr-2" />
                    Preventive Action
                  </CardTitle>
                  <CardDescription>
                    Steps to prevent future occurrences
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {defect.preventiveAction ? (
                    <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                      <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                        {defect.preventiveAction}
                      </p>
                    </div>
                  ) : (
                    <div className="text-gray-500 italic text-center py-8">
                      No preventive action documented yet.
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
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
