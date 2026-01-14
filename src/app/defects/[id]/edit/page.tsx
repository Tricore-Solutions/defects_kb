"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  AlertTriangle,
  FileText,
  Target,
  Wrench,
  Image as ImageIcon,
  Trash2,
} from "lucide-react";
import { getDefectById } from "@/data/mockDefects";
import {
  DEFECT_CATEGORIES,
  DefectFormData,
  PROCESSES,
} from "@/types/defect";

export default function EditDefectPage() {
  const params = useParams();
  const router = useRouter();
  const defectId = params.id as string;

  console.log("EditDefectPage: Loading defect with ID:", defectId);

  const [formData, setFormData] = useState<DefectFormData | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const defect = getDefectById(defectId);
    if (defect) {
      console.log("EditDefectPage: Loaded defect data:", defect);
      setFormData({
        failureMode: defect.failureMode,
        process: defect.process,
        criteriaAcceptanceLimit: defect.criteriaAcceptanceLimit,
        dri: defect.dri,
        category: defect.category,
        failureAnalysisRootCause: defect.failureAnalysisRootCause,
        correctiveAction: defect.correctiveAction,
        processImages: defect.processImages,
        failureAnalysisImages: defect.failureAnalysisImages,
        correctiveActionImages: defect.correctiveActionImages,
        isActive: defect.isActive,
      });
    }
    setIsLoading(false);
  }, [defectId]);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="py-6 flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (!formData) {
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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    console.log(`EditDefectPage: Field ${name} changed`);
    setFormData((prev) => (prev ? { ...prev, [name]: value } : null));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    console.log(`EditDefectPage: Select ${name} changed to:`, value);
    setFormData((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const validateForm = (): boolean => {
    if (!formData) return false;

    const newErrors: Record<string, string> = {};

    if (!formData.failureMode.trim()) {
      newErrors.failureMode = "Failure mode is required";
    }
    if (!formData.process.trim()) {
      newErrors.process = "Process is required";
    }
    if (!formData.failureAnalysisRootCause.trim()) {
      newErrors.failureAnalysisRootCause = "Failure analysis / root cause is required";
    }
    if (!formData.correctiveAction.trim()) {
      newErrors.correctiveAction = "Corrective action is required";
    }

    setErrors(newErrors);
    console.log("EditDefectPage: Validation errors:", newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("EditDefectPage: Form submitted with data:", formData);

    if (!validateForm()) {
      console.log("EditDefectPage: Validation failed");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("EditDefectPage: Defect updated successfully (mock)");
    alert("Defect updated successfully! (This is a prototype - data is not saved)");
    router.push(`/defects/${defectId}`);
  };

  const handleDelete = async () => {
    if (
      confirm(
        "Are you sure you want to delete this defect? This action cannot be undone."
      )
    ) {
      console.log("EditDefectPage: Deleting defect:", defectId);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      alert("Defect deleted! (This is a prototype - data is not actually deleted)");
      router.push("/defects");
    }
  };

  return (
    <DashboardLayout>
      <div className="py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Link href={`/defects/${defectId}`}>
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold">
                <span className=" text-purple-500 px-2 py-1">
                  Edit Defect
                </span>
              </h1>
              <p className="text-gray-600 mt-1">
                {formData.failureMode} - {formData.process}
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={handleDelete}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Defect
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2 text-purple-600" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="failureMode">
                    Failure Mode <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="failureMode"
                    name="failureMode"
                    value={formData.failureMode}
                    onChange={handleInputChange}
                    className={errors.failureMode ? "border-red-500" : ""}
                  />
                  {errors.failureMode && (
                    <p className="text-sm text-red-500">{errors.failureMode}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="process">
                    Process <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.process}
                    onValueChange={(value) => handleSelectChange("process", value)}
                  >
                    <SelectTrigger className={errors.process ? "border-red-500" : ""}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {PROCESSES.map((process) => (
                        <SelectItem key={process} value={process}>
                          {process}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.process && (
                    <p className="text-sm text-red-500">{errors.process}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category (4M)</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) =>
                      handleSelectChange("category", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(DEFECT_CATEGORIES).map(([key, label]) => (
                        <SelectItem key={key} value={key}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="criteriaAcceptanceLimit">
                    Criteria / Acceptance Limit
                  </Label>
                  <Input
                    id="criteriaAcceptanceLimit"
                    name="criteriaAcceptanceLimit"
                    value={formData.criteriaAcceptanceLimit}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dri">DRI</Label>
                  <Input
                    id="dri"
                    name="dri"
                    value={formData.dri}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="isActive">Status</Label>
                  <Select
                    value={formData.isActive ? "active" : "inactive"}
                    onValueChange={(value) =>
                      setFormData((prev) =>
                        prev ? { ...prev, isActive: value === "active" } : null
                      )
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Failure Analysis / Root Cause */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="h-5 w-5 mr-2 text-orange-600" />
                Failure Analysis / Root Cause
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="failureAnalysisRootCause">
                  Failure Analysis / Root Cause <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="failureAnalysisRootCause"
                  name="failureAnalysisRootCause"
                  rows={6}
                  value={formData.failureAnalysisRootCause}
                  onChange={handleInputChange}
                  className={errors.failureAnalysisRootCause ? "border-red-500" : ""}
                />
                {errors.failureAnalysisRootCause && (
                  <p className="text-sm text-red-500">{errors.failureAnalysisRootCause}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Corrective Action */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Wrench className="h-5 w-5 mr-2 text-blue-600" />
                Corrective Action
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="correctiveAction">
                  Corrective Action <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="correctiveAction"
                  name="correctiveAction"
                  rows={6}
                  value={formData.correctiveAction}
                  onChange={handleInputChange}
                  className={errors.correctiveAction ? "border-red-500" : ""}
                />
                {errors.correctiveAction && (
                  <p className="text-sm text-red-500">{errors.correctiveAction}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Image Upload Placeholder */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ImageIcon className="h-5 w-5 mr-2 text-green-600" />
                Reference Images
              </CardTitle>
              <CardDescription>
                Upload images to help identify the defect
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">
                  Drag and drop images here, or click to browse
                </p>
                <p className="text-sm text-gray-400">
                  (Image upload will be available in the full version)
                </p>
                <Button type="button" variant="outline" className="mt-4" disabled>
                  Browse Files
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-4">
            <Link href={`/defects/${defectId}`}>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </Link>
            <Button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="animate-spin mr-2">⏳</span>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
