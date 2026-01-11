import React, { ReactNode } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface PageHeaderProps {
  title: string;
  description?: string;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  actions?: ReactNode;
}

/**
 * PageHeader - A consistent header component for all main pages
 *
 * @param title - The page title
 * @param description - Optional description text shown below title
 * @param searchPlaceholder - Placeholder text for search input
 * @param searchValue - Current search input value
 * @param onSearchChange - Handler for search input changes
 * @param actions - Optional actions to display on the right (buttons, etc)
 */
const PageHeader = ({
  title,
  description,
  searchPlaceholder = "Search...",
  searchValue = "",
  onSearchChange,
  actions,
}: PageHeaderProps) => {
  console.log(`PageHeader: Rendering for ${title}`);

  return (
    <div className="w-full mb-6">
      {/* Title and description - always on top on mobile */}
      <div className="mb-4 lg:mb-0">
        <h1 className="text-2xl font-semibold text-purple-700">{title}</h1>
        {description && (
          <p className="text-gray-600 mt-1 text-sm md:text-base">{description}</p>
        )}
      </div>
      
      {/* Search and actions - stack on mobile, inline on desktop */}
      <div className="flex flex-col sm:flex-row gap-3 mt-4">
        {onSearchChange && (
          <div className="relative flex-1 max-w-full sm:max-w-md lg:max-w-lg">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder={searchPlaceholder}
              className="pl-9 w-full"
              value={searchValue}
              onChange={onSearchChange}
            />
          </div>
        )}
        {actions && (
          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
