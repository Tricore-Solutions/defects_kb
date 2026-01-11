"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, Database, Users, FileText, Bell } from "lucide-react";

export default function SettingsPage() {
  console.log("SettingsPage: Rendering settings page");

  return (
    <DashboardLayout>
      <div className="py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-purple-700">Settings</h1>
          <p className="text-gray-600 mt-2">
            Configure the Defect Knowledge Base system
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="opacity-50">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="h-5 w-5 mr-2 text-purple-600" />
                Database Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500 text-sm">
                Configure database connection and backup settings.
              </p>
              <p className="text-xs text-gray-400 mt-2 italic">
                (Available in full version)
              </p>
            </CardContent>
          </Card>

          <Card className="opacity-50">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2 text-blue-600" />
                User Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500 text-sm">
                Manage users, roles, and permissions.
              </p>
              <p className="text-xs text-gray-400 mt-2 italic">
                (Available in full version)
              </p>
            </CardContent>
          </Card>

          <Card className="opacity-50">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2 text-green-600" />
                Categories & Severity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500 text-sm">
                Customize defect categories and severity levels.
              </p>
              <p className="text-xs text-gray-400 mt-2 italic">
                (Available in full version)
              </p>
            </CardContent>
          </Card>

          <Card className="opacity-50">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="h-5 w-5 mr-2 text-orange-600" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500 text-sm">
                Configure email and system notifications.
              </p>
              <p className="text-xs text-gray-400 mt-2 italic">
                (Available in full version)
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6 bg-yellow-50 border-yellow-200">
          <CardContent className="py-4">
            <div className="flex items-center">
              <Settings className="h-5 w-5 text-yellow-600 mr-2" />
              <p className="text-yellow-700">
                This is a wireframe prototype. Settings functionality will be
                available in the full version.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
