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
  Plus,
  X,
  Trash2,
} from "lucide-react";
import { getDefectById } from "@/data/mockDefects";
import {
  DEFECT_CATEGORIES,
  SEVERITY_LEVELS,
  DefectFormData,
} from "@/types/defect";

export default function EditDefectPage() {
  const params = useParams();
  const router = useRouter();
  const defectId = Number(params.id);

  console.log("EditDefectPage: Loading defect with ID:", defectId);

  const [formData, setFormData] = useState<DefectFormData | null>(null);
  const [newProduct, setNewProduct] = useState("");
  const [newProcess, setNewProcess] = useState("");
  const [newRelatedCode, setNewRelatedCode] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const defect = getDefectById(defectId);
    if (defect) {
      console.log("EditDefectPage: Loaded defect data:", defect);
      setFormData({
        code: defect.code,
        name: defect.name,
        category: defect.category,
        severity: defect.severity,
        description: defect.description,
        failureAnalysis: defect.failureAnalysis,
        rootCause: defect.rootCause,
        correctiveAction: defect.correctiveAction,
        preventiveAction: defect.preventiveAction || "",
        applicableProducts: defect.applicableProducts || [],
        applicableProcesses: defect.applicableProcesses || [],
        relatedDefectCodes: defect.relatedDefectCodes || [],
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
              The defect with ID {defectId} could not be found.
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

  const addToList = (
    listName: "applicableProducts" | "applicableProcesses" | "relatedDefectCodes",
    value: string,
    setter: (value: string) => void
  ) => {
    if (value.trim() && formData) {
      console.log(`EditDefectPage: Adding ${value} to ${listName}`);
      setFormData((prev) =>
        prev
          ? {
              ...prev,
              [listName]: [...(prev[listName] || []), value.trim()],
            }
          : null
      );
      setter("");
    }
  };

  const removeFromList = (
    listName: "applicableProducts" | "applicableProcesses" | "relatedDefectCodes",
    index: number
  ) => {
    console.log(`EditDefectPage: Removing item at index ${index} from ${listName}`);
    setFormData((prev) =>
      prev
        ? {
            ...prev,
            [listName]: (prev[listName] || []).filter((_, i) => i !== index),
          }
        : null
    );
  };

  const validateForm = (): boolean => {
    if (!formData) return false;

    const newErrors: Record<string, string> = {};

    if (!formData.code.trim()) {
      newErrors.code = "Defect code is required";
    }
    if (!formData.name.trim()) {
      newErrors.name = "Defect name is required";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }
    if (!formData.failureAnalysis.trim()) {
      newErrors.failureAnalysis = "Failure analysis is required";
    }
    if (!formData.rootCause.trim()) {
      newErrors.rootCause = "Root cause is required";
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
              <h1 className="text-2xl font-bold text-purple-700">
                Edit Defect: {formData.code}
              </h1>
              <p className="text-gray-600">Update the defect information</p>
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
                  <Label htmlFor="code">
                    Defect Code <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="code"
                    name="code"
                    value={formData.code}
                    onChange={handleInputChange}
                    className={errors.code ? "border-red-500" : ""}
                  />
                  {errors.code && (
                    <p className="text-sm text-red-500">{errors.code}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name">
                    Defect Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={errors.name ? "border-red-500" : ""}
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500">{errors.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
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
                  <Label htmlFor="severity">Severity</Label>
                  <Select
                    value={formData.severity}
                    onValueChange={(value) =>
                      handleSelectChange("severity", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(SEVERITY_LEVELS).map(([key, value]) => (
                        <SelectItem key={key} value={key}>
                          {value.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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

              <div className="space-y-2">
                <Label htmlFor="description">
                  Description <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  rows={3}
                  value={formData.description}
                  onChange={handleInputChange}
                  className={errors.description ? "border-red-500" : ""}
                />
                {errors.description && (
                  <p className="text-sm text-red-500">{errors.description}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Investigation Results */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="h-5 w-5 mr-2 text-orange-600" />
                Investigation Results
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="failureAnalysis">
                  Failure Analysis <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="failureAnalysis"
                  name="failureAnalysis"
                  rows={4}
                  value={formData.failureAnalysis}
                  onChange={handleInputChange}
                  className={errors.failureAnalysis ? "border-red-500" : ""}
                />
                {errors.failureAnalysis && (
                  <p className="text-sm text-red-500">{errors.failureAnalysis}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="rootCause">
                  Root Cause <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="rootCause"
                  name="rootCause"
                  rows={4}
                  value={formData.rootCause}
                  onChange={handleInputChange}
                  className={errors.rootCause ? "border-red-500" : ""}
                />
                {errors.rootCause && (
                  <p className="text-sm text-red-500">{errors.rootCause}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Corrective & Preventive Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Wrench className="h-5 w-5 mr-2 text-blue-600" />
                Corrective & Preventive Actions
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
                  rows={4}
                  value={formData.correctiveAction}
                  onChange={handleInputChange}
                  className={errors.correctiveAction ? "border-red-500" : ""}
                />
                {errors.correctiveAction && (
                  <p className="text-sm text-red-500">{errors.correctiveAction}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="preventiveAction">Preventive Action</Label>
                <Textarea
                  id="preventiveAction"
                  name="preventiveAction"
                  rows={4}
                  value={formData.preventiveAction}
                  onChange={handleInputChange}
                />
              </div>
            </CardContent>
          </Card>

          {/* Metadata */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-gray-600" />
                Additional Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Applicable Products */}
              <div className="space-y-2">
                <Label>Applicable Products</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add product..."
                    value={newProduct}
                    onChange={(e) => setNewProduct(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addToList("applicableProducts", newProduct, setNewProduct);
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      addToList("applicableProducts", newProduct, setNewProduct)
                    }
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {formData.applicableProducts &&
                  formData.applicableProducts.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.applicableProducts.map((product, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                        >
                          {product}
                          <button
                            type="button"
                            onClick={() =>
                              removeFromList("applicableProducts", index)
                            }
                            className="hover:text-purple-900"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
              </div>

              {/* Applicable Processes */}
              <div className="space-y-2">
                <Label>Applicable Processes</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add process..."
                    value={newProcess}
                    onChange={(e) => setNewProcess(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addToList("applicableProcesses", newProcess, setNewProcess);
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      addToList("applicableProcesses", newProcess, setNewProcess)
                    }
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {formData.applicableProcesses &&
                  formData.applicableProcesses.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.applicableProcesses.map((process, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                        >
                          {process}
                          <button
                            type="button"
                            onClick={() =>
                              removeFromList("applicableProcesses", index)
                            }
                            className="hover:text-blue-900"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
              </div>

              {/* Related Defect Codes */}
              <div className="space-y-2">
                <Label>Related P-Chart Defect Codes</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add related code..."
                    value={newRelatedCode}
                    onChange={(e) => setNewRelatedCode(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addToList(
                          "relatedDefectCodes",
                          newRelatedCode,
                          setNewRelatedCode
                        );
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      addToList(
                        "relatedDefectCodes",
                        newRelatedCode,
                        setNewRelatedCode
                      )
                    }
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {formData.relatedDefectCodes &&
                  formData.relatedDefectCodes.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.relatedDefectCodes.map((code, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-mono"
                        >
                          {code}
                          <button
                            type="button"
                            onClick={() =>
                              removeFromList("relatedDefectCodes", index)
                            }
                            className="hover:text-gray-900"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      ))}
                    </div>
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
