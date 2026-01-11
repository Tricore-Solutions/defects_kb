"use client";

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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Palette,
  Type,
  Layout,
  Layers,
  MousePointer,
  AlertCircle,
  CheckCircle,
  Info,
  AlertTriangle,
  Copy,
} from "lucide-react";
import { useState } from "react";

export default function DesignGuidePage() {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  console.log("DesignGuidePage: Rendering design guide");

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedColor(label);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  const colors = [
    {
      name: "Primary",
      variable: "--primary",
      value: "265 89% 50%",
      hex: "#7C3AED",
      usage: "Main brand color, primary buttons, links",
    },
    {
      name: "Primary Foreground",
      variable: "--primary-foreground",
      value: "0 0% 100%",
      hex: "#FFFFFF",
      usage: "Text on primary backgrounds",
    },
    {
      name: "Background",
      variable: "--background",
      value: "0 0% 95%",
      hex: "#F2F2F2",
      usage: "Page background",
    },
    {
      name: "Card",
      variable: "--card",
      value: "0 0% 100%",
      hex: "#FFFFFF",
      usage: "Card backgrounds",
    },
    {
      name: "Destructive",
      variable: "--destructive",
      value: "0 84.2% 60.2%",
      hex: "#EF4444",
      usage: "Error states, delete actions",
    },
    {
      name: "Success",
      variable: "--success",
      value: "142 72% 42%",
      hex: "#22C55E",
      usage: "Success states, active status",
    },
    {
      name: "Warning",
      variable: "--warning",
      value: "38 92% 50%",
      hex: "#F59E0B",
      usage: "Warning states, major severity",
    },
    {
      name: "Info",
      variable: "--info",
      value: "220 70% 50%",
      hex: "#3B82F6",
      usage: "Information states, minor severity",
    },
    {
      name: "Muted",
      variable: "--muted",
      value: "265 10% 96.1%",
      hex: "#F5F3F7",
      usage: "Muted backgrounds, disabled states",
    },
    {
      name: "Border",
      variable: "--border",
      value: "265 10% 89.8%",
      hex: "#E5E0EA",
      usage: "Borders, dividers",
    },
  ];

  const severityBadges = [
    { level: "Critical", variant: "critical" as const, color: "Red" },
    { level: "Major", variant: "warning" as const, color: "Orange" },
    { level: "Minor", variant: "info" as const, color: "Blue" },
    { level: "Cosmetic", variant: "secondary" as const, color: "Gray" },
  ];

  return (
    <DashboardLayout>
      <div className="py-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-purple-700">Design Guide</h1>
          <p className="text-gray-600 mt-2">
            UI components, colors, and design patterns used in the Defect
            Management system
          </p>
        </div>

        <Tabs defaultValue="colors" className="space-y-6">
          <TabsList className="bg-white shadow">
            <TabsTrigger value="colors" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Colors
            </TabsTrigger>
            <TabsTrigger value="typography" className="flex items-center gap-2">
              <Type className="h-4 w-4" />
              Typography
            </TabsTrigger>
            <TabsTrigger value="components" className="flex items-center gap-2">
              <Layers className="h-4 w-4" />
              Components
            </TabsTrigger>
            <TabsTrigger value="patterns" className="flex items-center gap-2">
              <Layout className="h-4 w-4" />
              Patterns
            </TabsTrigger>
          </TabsList>

          {/* Colors Tab */}
          <TabsContent value="colors">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Color Palette</CardTitle>
                  <CardDescription>
                    CSS variables used throughout the application. Click to copy
                    the hex value.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {colors.map((color) => (
                      <div
                        key={color.name}
                        className="border rounded-lg overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => copyToClipboard(color.hex, color.name)}
                      >
                        <div
                          className="h-20 flex items-center justify-center"
                          style={{ backgroundColor: color.hex }}
                        >
                          {copiedColor === color.name && (
                            <span className="bg-black/50 text-white px-2 py-1 rounded text-sm">
                              Copied!
                            </span>
                          )}
                        </div>
                        <div className="p-3">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{color.name}</span>
                            <Copy className="h-3 w-3 text-gray-400" />
                          </div>
                          <p className="text-xs font-mono text-gray-500">
                            {color.hex}
                          </p>
                          <p className="text-xs font-mono text-gray-400">
                            var({color.variable})
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {color.usage}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Severity Colors</CardTitle>
                  <CardDescription>
                    Color coding for defect severity levels
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-4">
                    {severityBadges.map((badge) => (
                      <div
                        key={badge.level}
                        className="flex items-center gap-2"
                      >
                        <Badge variant={badge.variant}>{badge.level}</Badge>
                        <span className="text-sm text-gray-500">
                          ({badge.color})
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Typography Tab */}
          <TabsContent value="typography">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Font Family</CardTitle>
                  <CardDescription>
                    Inter is used as the primary font family
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-lg">
                    The quick brown fox jumps over the lazy dog.
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Font: Inter, system-ui, sans-serif
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Headings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h1 className="text-3xl font-bold text-purple-700">
                      Heading 1 (text-3xl font-bold)
                    </h1>
                    <p className="text-xs text-gray-400 mt-1">
                      Page titles, main headings
                    </p>
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold text-purple-700">
                      Heading 2 (text-2xl font-semibold)
                    </h2>
                    <p className="text-xs text-gray-400 mt-1">
                      Section titles, card headers
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">
                      Heading 3 (text-xl font-semibold)
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">Subsections</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium">
                      Heading 4 (text-lg font-medium)
                    </h4>
                    <p className="text-xs text-gray-400 mt-1">
                      Card titles, labels
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Body Text</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-base">
                      Base text (text-base) - Default body text size
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">
                      Small text (text-sm text-gray-600) - Secondary information
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">
                      Extra small (text-xs text-gray-500) - Captions, metadata
                    </p>
                  </div>
                  <div>
                    <p className="font-mono text-sm">
                      Monospace (font-mono) - Code, defect codes
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Components Tab */}
          <TabsContent value="components">
            <div className="space-y-6">
              {/* Buttons */}
              <Card>
                <CardHeader>
                  <CardTitle>Buttons</CardTitle>
                  <CardDescription>Button variants and sizes</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-4">
                    <Button>Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="destructive">Destructive</Button>
                    <Button variant="link">Link</Button>
                  </div>
                  <div className="flex flex-wrap gap-4 items-center">
                    <Button size="sm">Small</Button>
                    <Button size="default">Default</Button>
                    <Button size="lg">Large</Button>
                    <Button size="icon">
                      <MousePointer className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                      Primary Action (Recommended)
                    </Button>
                    <Button
                      variant="outline"
                      className="text-red-600 hover:bg-red-50"
                    >
                      Delete Action
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Badges */}
              <Card>
                <CardHeader>
                  <CardTitle>Badges</CardTitle>
                  <CardDescription>Status and category indicators</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-4">
                    <Badge>Default</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="outline">Outline</Badge>
                    <Badge variant="destructive">Destructive</Badge>
                    <Badge variant="success">Success</Badge>
                    <Badge variant="warning">Warning</Badge>
                    <Badge variant="info">Info</Badge>
                    <Badge variant="critical">Critical</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Form Elements */}
              <Card>
                <CardHeader>
                  <CardTitle>Form Elements</CardTitle>
                  <CardDescription>Input fields and controls</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="demo-input">Text Input</Label>
                      <Input
                        id="demo-input"
                        placeholder="Enter text..."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="demo-select">Select</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Option 1</SelectItem>
                          <SelectItem value="2">Option 2</SelectItem>
                          <SelectItem value="3">Option 3</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="demo-textarea">Textarea</Label>
                    <Textarea
                      id="demo-textarea"
                      placeholder="Enter longer text..."
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Cards */}
              <Card>
                <CardHeader>
                  <CardTitle>Cards</CardTitle>
                  <CardDescription>Container components</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Default Card</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-500">
                          Standard card with header and content.
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="border-l-4 border-l-purple-500">
                      <CardHeader>
                        <CardTitle className="text-lg">Accent Card</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-500">
                          Card with left border accent.
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="bg-purple-50 border-purple-200">
                      <CardHeader>
                        <CardTitle className="text-lg text-purple-700">
                          Highlighted Card
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600">
                          Card with background color.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>

              {/* Table */}
              <Card>
                <CardHeader>
                  <CardTitle>Tables</CardTitle>
                  <CardDescription>Data display tables</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Code</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Severity</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-mono text-purple-600">
                          DK-001
                        </TableCell>
                        <TableCell>Solder Bridge</TableCell>
                        <TableCell>Process Defect</TableCell>
                        <TableCell>
                          <Badge variant="critical">Critical</Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-mono text-purple-600">
                          DK-002
                        </TableCell>
                        <TableCell>Wire Damage</TableCell>
                        <TableCell>Material Defect</TableCell>
                        <TableCell>
                          <Badge variant="warning">Major</Badge>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Alerts */}
              <Card>
                <CardHeader>
                  <CardTitle>Alert States</CardTitle>
                  <CardDescription>Feedback and notification styles</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-green-700">
                      Success message - Operation completed successfully
                    </span>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <AlertCircle className="h-5 w-5 text-red-600" />
                    <span className="text-red-700">
                      Error message - Something went wrong
                    </span>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-yellow-600" />
                    <span className="text-yellow-700">
                      Warning message - Please review before proceeding
                    </span>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <Info className="h-5 w-5 text-blue-600" />
                    <span className="text-blue-700">
                      Info message - Additional information available
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Patterns Tab */}
          <TabsContent value="patterns">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Page Layout</CardTitle>
                  <CardDescription>
                    Standard page structure and spacing
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-lg p-4 bg-gray-50">
                    <div className="border-2 border-dashed border-purple-300 rounded p-2 mb-4 text-center text-purple-600 text-sm">
                      Navigation Bar
                    </div>
                    <div className="border-2 border-dashed border-blue-300 rounded p-2 mb-4 text-center text-blue-600 text-sm">
                      Page Header (Title + Actions)
                    </div>
                    <div className="border-2 border-dashed border-green-300 rounded p-4 mb-4 text-center text-green-600 text-sm min-h-32">
                      Main Content Area
                    </div>
                    <div className="border-2 border-dashed border-gray-300 rounded p-2 text-center text-gray-600 text-sm">
                      Footer
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Spacing Guidelines</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-24 text-sm text-gray-500">py-6</div>
                      <div className="text-sm">
                        Page padding (top and bottom)
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-24 text-sm text-gray-500">mb-6</div>
                      <div className="text-sm">
                        Section margin (between major sections)
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-24 text-sm text-gray-500">gap-4</div>
                      <div className="text-sm">
                        Grid/flex gap (between cards, items)
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-24 text-sm text-gray-500">space-y-4</div>
                      <div className="text-sm">
                        Vertical spacing (form fields, list items)
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-24 text-sm text-gray-500">p-4 / p-6</div>
                      <div className="text-sm">Card content padding</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Common Patterns</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-2">Page Header Pattern</h4>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h1 className="text-2xl font-semibold text-purple-700">
                            Page Title
                          </h1>
                          <p className="text-gray-600 mt-1">
                            Page description text
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline">Secondary</Button>
                          <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                            Primary Action
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Detail Page Sidebar</h4>
                    <div className="bg-gray-50 rounded-lg p-4 max-w-xs">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">Status</span>
                          <Badge variant="success">Active</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">
                            Severity
                          </span>
                          <Badge variant="critical">Critical</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">
                            Category
                          </span>
                          <span className="text-sm">Process Defect</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">
                      Quick Reference Card (Green Accent)
                    </h4>
                    <Card className="border-l-4 border-l-green-500 bg-green-50 max-w-lg">
                      <CardHeader>
                        <CardTitle className="text-green-700 text-lg">
                          Quick Reference for Manufacturing
                        </CardTitle>
                        <CardDescription>
                          What to do when you encounter this defect
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="bg-white rounded-lg p-3 text-sm">
                          1. Stop production immediately
                          <br />
                          2. Notify supervisor
                          <br />
                          3. Isolate affected units
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
