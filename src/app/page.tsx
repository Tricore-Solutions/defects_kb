"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Dashboard() {
  console.log("Dashboard: Rendering main dashboard");

  const router = useRouter();
  const [item, setItem] = useState("");
  const [category, setCategory] = useState("");
  const [defect, setDefect] = useState("");

  const handleSearch = () => {
    console.log("Dashboard: Search triggered with:", { item, category, defect });
    
    // Build query params
    const params = new URLSearchParams();
    if (item) params.set("item", item);
    if (category) params.set("category", category);
    if (defect) params.set("defect", defect);
    
    const queryString = params.toString();
    router.push(`/defects${queryString ? `?${queryString}` : ""}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <DashboardLayout>
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <Card className="w-full max-w-lg shadow-lg">
          <CardContent className="p-8">
            {/* Title */}
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold">
                <span className=" text-purple-500 px-2 py-1">
            Defects Management
                </span>
          </h1>
              <p className="text-gray-600 mt-4 text-sm">
            Manufacturing reference system for defect identification,
            investigation results, and corrective actions
          </p>
        </div>

            {/* Search Form */}
            <div className="space-y-4">
              <Input
                type="text"
                placeholder="Item"
                value={item}
                onChange={(e) => setItem(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full border-gray-300 focus:border-purple-500"
              />
              <Input
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full border-gray-300 focus:border-purple-500"
              />
              <Input
                type="text"
                placeholder="Defect"
                value={defect}
                onChange={(e) => setDefect(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full border-gray-300 focus:border-purple-500"
              />
              <Button
                onClick={handleSearch}
                className="w-full bg-purple-500 hover:bg-purple-600 text-white"
              >
                Search
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
