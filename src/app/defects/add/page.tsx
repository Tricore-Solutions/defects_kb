"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
  Factory,
  User,
} from "lucide-react";
import {
  DEFECT_CATEGORIES,
  DefectCategory,
  DefectFormData,
  PROCESSES,
} from "@/types/defect";

export default function AddDefectPage() {
  const router = useRouter();
  console.log("AddDefectPage: Rendering add defect form");

  const [formData, setFormData] = useState<DefectFormData>({
    failureMode: "",
    process: "",
    criteriaAcceptanceLimit: "",
    dri: "",
    category: "MACHINE",
    failureAnalysisRootCause: "",
    correctiveAction: "",
    isActive: true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    console.log(`AddDefectPage: Field ${name} changed to:`, value);
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    console.log(`AddDefectPage: Select ${name} changed to:`, value);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = (): boolean => {
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
    console.log("AddDefectPage: Validation errors:", newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("AddDefectPage: Form submitted with data:", formData);

    if (!validateForm()) {
      console.log("AddDefectPage: Validation failed");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("AddDefectPage: Defect created successfully (mock)");
    alert("Defect created successfully! (This is a prototype - data is not saved)");
    router.push("/defects");
  };

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
              <h1 className="text-2xl font-bold">
                <span className=" text-purple-500 px-2 py-1">
                  Add New Defect
                </span>
              </h1>
              <p className="text-gray-600 mt-1">
                Document a new failure mode for the knowledge base
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2 text-purple-600" />
                Basic Information
              </CardTitle>
              <CardDescription>
                Enter the basic details of the defect
              </CardDescription>
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
                    placeholder="e.g., Exposed Wire"
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
                      <SelectValue placeholder="Select process" />
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
                      <SelectValue placeholder="Select category" />
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
                    placeholder="e.g., AL-PH061"
                    value={formData.criteriaAcceptanceLimit}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dri">DRI (Directly Responsible Individual)</Label>
                  <Input
                    id="dri"
                    name="dri"
                    placeholder="e.g., John Doe"
                    value={formData.dri}
                    onChange={handleInputChange}
                  />
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
              <CardDescription>
                Document the failure analysis and root cause
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="failureAnalysisRootCause">
                  Failure Analysis / Root Cause <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="failureAnalysisRootCause"
                  name="failureAnalysisRootCause"
                  placeholder="Describe the failure analysis and root cause..."
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
              <CardDescription>
                Document the corrective action to address this defect
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="correctiveAction">
                  Corrective Action <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="correctiveAction"
                  name="correctiveAction"
                  placeholder="List the steps to correct the defect when found..."
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
            <Link href="/defects">
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
                  Save Defect
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
