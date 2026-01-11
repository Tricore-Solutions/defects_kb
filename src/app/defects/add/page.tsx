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
  Plus,
  X,
} from "lucide-react";
import {
  DEFECT_CATEGORIES,
  SEVERITY_LEVELS,
  DefectCategory,
  SeverityLevel,
  DefectFormData,
} from "@/types/defect";

export default function AddDefectPage() {
  const router = useRouter();
  console.log("AddDefectPage: Rendering add defect form");

  const [formData, setFormData] = useState<DefectFormData>({
    code: "",
    name: "",
    category: "OTHER",
    severity: "MINOR",
    description: "",
    failureAnalysis: "",
    rootCause: "",
    correctiveAction: "",
    preventiveAction: "",
    applicableProducts: [],
    applicableProcesses: [],
    relatedDefectCodes: [],
    isActive: true,
  });

  const [newProduct, setNewProduct] = useState("");
  const [newProcess, setNewProcess] = useState("");
  const [newRelatedCode, setNewRelatedCode] = useState("");
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

  const addToList = (
    listName: "applicableProducts" | "applicableProcesses" | "relatedDefectCodes",
    value: string,
    setter: (value: string) => void
  ) => {
    if (value.trim()) {
      console.log(`AddDefectPage: Adding ${value} to ${listName}`);
      setFormData((prev) => ({
        ...prev,
        [listName]: [...(prev[listName] || []), value.trim()],
      }));
      setter("");
    }
  };

  const removeFromList = (
    listName: "applicableProducts" | "applicableProcesses" | "relatedDefectCodes",
    index: number
  ) => {
    console.log(`AddDefectPage: Removing item at index ${index} from ${listName}`);
    setFormData((prev) => ({
      ...prev,
      [listName]: (prev[listName] || []).filter((_, i) => i !== index),
    }));
  };

  const validateForm = (): boolean => {
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
              <h1 className="text-2xl font-bold text-purple-700">
                Add New Defect
              </h1>
              <p className="text-gray-600">
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
                  <Label htmlFor="code">
                    Defect Code <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="code"
                    name="code"
                    placeholder="e.g., DK-009"
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
                    Defect Name (Failure Mode) <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="e.g., Solder Bridge"
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
                  <Label htmlFor="severity">Severity</Label>
                  <Select
                    value={formData.severity}
                    onValueChange={(value) =>
                      handleSelectChange("severity", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select severity" />
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
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">
                  Description <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe the defect in detail..."
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
              <CardDescription>
                Document the failure analysis and root cause
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="failureAnalysis">
                  Failure Analysis <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="failureAnalysis"
                  name="failureAnalysis"
                  placeholder="Describe the analysis performed to understand the failure..."
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
                  placeholder="List the identified root causes (use numbered list for multiple causes)..."
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
              <CardDescription>
                Document the actions to address and prevent this defect
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
                  placeholder="List the steps to prevent future occurrences (optional)..."
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
              <CardDescription>
                Optional metadata for categorization
              </CardDescription>
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
