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
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
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
  Target,
  Wrench,
  Image as ImageIcon,
  Trash2,
  X,
  Plus,
  Factory,
} from "lucide-react";
import { getDefectById } from "@/data/mockDefects";
import {
  DEFECT_CATEGORIES,
  DefectFormData,
  PROCESSES,
} from "@/types/defect";

// Helper component for Image Management Section
const ImageSection = ({
  title,
  images,
  onRemove,
  onAdd,
  onImageClick,
}: {
  title: string;
  images: string[];
  onRemove: (index: number) => void;
  onAdd: () => void;
  onImageClick: (url: string) => void;
}) => (
  <div className="space-y-4 pt-4 border-t">
    <Label className="flex items-center text-gray-700">
      <ImageIcon className="h-4 w-4 mr-2" />
      {title}
    </Label>
    
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {images.map((img, idx) => (
        <div key={idx} className="relative aspect-video group bg-gray-100 rounded-lg overflow-hidden border border-gray-200 cursor-pointer">
          <img
            src={img}
            alt={`${title} ${idx + 1}`}
            className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
            onClick={() => onImageClick(img)}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
              (e.target as HTMLImageElement).parentElement!.innerHTML = '<div class="flex items-center justify-center h-full text-xs text-gray-400">No Image</div>';
            }}
          />
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onRemove(idx);
            }}
            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity z-10"
            title="Remove image"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      ))}
      
      {/* Add Image Button */}
      <button
        type="button"
        onClick={onAdd}
        className="flex flex-col items-center justify-center aspect-video border-2 border-dashed border-gray-300 rounded-lg hover:bg-gray-50 hover:border-purple-500 transition-colors"
      >
        <Plus className="h-6 w-6 text-gray-400 mb-1" />
        <span className="text-xs text-gray-500">Add Image</span>
      </button>
    </div>
  </div>
);

export default function EditDefectPage() {
  const params = useParams();
  const router = useRouter();
  const defectId = params.id as string;

  console.log("EditDefectPage: Loading defect with ID:", defectId);

  const [formData, setFormData] = useState<DefectFormData | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    // Simulate async data fetching
    const timer = setTimeout(() => {
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
          processImages: defect.processImages || [],
          failureAnalysisImages: defect.failureAnalysisImages || [],
          correctiveActionImages: defect.correctiveActionImages || [],
        isActive: defect.isActive,
      });
    }
    setIsLoading(false);
    }, 100);

    return () => clearTimeout(timer);
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

  const handleRemoveImage = (field: keyof DefectFormData, index: number) => {
    if (!formData) return;
    const currentImages = formData[field] as string[];
    const newImages = [...currentImages];
    newImages.splice(index, 1);
    setFormData({ ...formData, [field]: newImages });
  };

  const handleAddImage = (field: keyof DefectFormData) => {
    console.log(`Add image clicked for ${field}`);
    alert("Image upload would open here. (Prototype only)");
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
                {formData.failureMode}
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
          {/* Process Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Factory className="h-5 w-5 mr-2 text-purple-600" />
                Process Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
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

              <ImageSection 
                title="Process Images" 
                images={formData.processImages} 
                onRemove={(idx) => handleRemoveImage('processImages', idx)}
                onAdd={() => handleAddImage('processImages')}
                onImageClick={setSelectedImage}
              />
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
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="failureAnalysisRootCause">
                  Description <span className="text-red-500">*</span>
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

              <ImageSection 
                title="Analysis Images" 
                images={formData.failureAnalysisImages} 
                onRemove={(idx) => handleRemoveImage('failureAnalysisImages', idx)}
                onAdd={() => handleAddImage('failureAnalysisImages')}
                onImageClick={setSelectedImage}
              />
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
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="correctiveAction">
                  Description <span className="text-red-500">*</span>
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

              <ImageSection 
                title="Action Images" 
                images={formData.correctiveActionImages} 
                onRemove={(idx) => handleRemoveImage('correctiveActionImages', idx)}
                onAdd={() => handleAddImage('correctiveActionImages')}
                onImageClick={setSelectedImage}
              />
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
