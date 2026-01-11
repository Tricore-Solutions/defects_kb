"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Database,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Search,
  PlusCircle,
  FileText,
  BarChart3,
} from "lucide-react";
import { mockDefects } from "@/data/mockDefects";
import { SEVERITY_LEVELS, DEFECT_CATEGORIES } from "@/types/defect";

export default function Dashboard() {
  console.log("Dashboard: Rendering main dashboard");

  // Calculate statistics from mock data
  const totalDefects = mockDefects.length;
  const activeDefects = mockDefects.filter((d) => d.isActive).length;
  const criticalDefects = mockDefects.filter(
    (d) => d.severity === "CRITICAL"
  ).length;
  const recentDefects = mockDefects
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    )
    .slice(0, 5);

  // Category breakdown
  const categoryBreakdown = Object.entries(DEFECT_CATEGORIES).map(
    ([key, label]) => ({
      category: key,
      label,
      count: mockDefects.filter((d) => d.category === key).length,
    })
  );

  return (
    <DashboardLayout>
      <div className="py-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-purple-700">
            Defects Management
          </h1>
          <p className="text-gray-600 mt-2">
            Manufacturing reference system for defect identification,
            investigation results, and corrective actions
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <Link href="/defects">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-purple-500">
              <CardContent className="flex items-center p-4 sm:p-6">
                <Search className="h-8 w-8 sm:h-10 sm:w-10 text-purple-600 mr-3 sm:mr-4 shrink-0" />
                <div className="min-w-0">
                  <h3 className="font-semibold text-base sm:text-lg">Search Defects</h3>
                  <p className="text-xs sm:text-sm text-gray-500 truncate">
                    Find defect information and corrective actions
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/defects/add">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-green-500">
              <CardContent className="flex items-center p-4 sm:p-6">
                <PlusCircle className="h-8 w-8 sm:h-10 sm:w-10 text-green-600 mr-3 sm:mr-4 shrink-0" />
                <div className="min-w-0">
                  <h3 className="font-semibold text-base sm:text-lg">Add New Defect</h3>
                  <p className="text-xs sm:text-sm text-gray-500 truncate">
                    Document a new failure mode
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/defects">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-blue-500">
              <CardContent className="flex items-center p-4 sm:p-6">
                <FileText className="h-8 w-8 sm:h-10 sm:w-10 text-blue-600 mr-3 sm:mr-4 shrink-0" />
                <div className="min-w-0">
                  <h3 className="font-semibold text-base sm:text-lg">Browse All</h3>
                  <p className="text-xs sm:text-sm text-gray-500 truncate">
                    View complete defect database
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Defects
              </CardTitle>
              <Database className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalDefects}</div>
              <p className="text-xs text-muted-foreground">
                Documented failure modes
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {activeDefects}
              </div>
              <p className="text-xs text-muted-foreground">
                Currently active records
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Critical</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {criticalDefects}
              </div>
              <p className="text-xs text-muted-foreground">
                High severity defects
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Categories</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {categoryBreakdown.filter((c) => c.count > 0).length}
              </div>
              <p className="text-xs text-muted-foreground">
                Defect categories in use
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recently Updated */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-purple-600" />
                Recently Updated
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentDefects.map((defect) => (
                  <Link
                    key={defect.id}
                    href={`/defects/${defect.id}`}
                    className="block"
                  >
                    <div className="p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border border-transparent hover:border-gray-200">
                      {/* Header row with code, badge, and date */}
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="font-mono text-sm text-purple-600 shrink-0">
                            {defect.code}
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
                            className="shrink-0"
                          >
                            {SEVERITY_LEVELS[defect.severity].label}
                          </Badge>
                        </div>
                        <span className="text-xs text-gray-400 shrink-0">
                          {new Date(defect.updatedAt).toLocaleDateString()}
                        </span>
                      </div>
                      {/* Title */}
                      <p className="font-medium text-gray-900 dark:text-gray-100 truncate">
                        {defect.name}
                      </p>
                      {/* Description */}
                      <p className="text-sm text-gray-500 line-clamp-2 mt-0.5">
                        {defect.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Category Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="h-5 w-5 mr-2 text-purple-600" />
                Defects by Category
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {categoryBreakdown
                  .filter((c) => c.count > 0)
                  .sort((a, b) => b.count - a.count)
                  .map((item) => (
                    <div key={item.category} className="flex items-center">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">
                            {item.label}
                          </span>
                          <span className="text-sm text-gray-500">
                            {item.count}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-purple-600 h-2 rounded-full"
                            style={{
                              width: `${(item.count / totalDefects) * 100}%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Instructions Panel */}
        <Card className="mt-6 bg-purple-50 dark:bg-purple-900/20 border-purple-200">
          <CardHeader>
            <CardTitle className="text-purple-700">
              📋 How to Use This System
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-semibold mb-2">For Manufacturing:</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>Search for defects you encounter on the line</li>
                  <li>Review the corrective actions for guidance</li>
                  <li>Follow the preventive measures to avoid recurrence</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">For Quality Engineers:</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>Add new failure modes as they are discovered</li>
                  <li>Update existing records with new findings</li>
                  <li>Upload images to help with identification</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
