import Link from "next/link";
import { FileText, Palette } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
          <p>© 2026 Defects Management System</p>
          <div className="flex items-center gap-4">
            <Link
              href="/docs"
              className="hover:text-purple-600 transition-colors flex items-center gap-1"
            >
              <FileText className="h-3.5 w-3.5" />
              Docs
            </Link>
            <span className="text-gray-300">|</span>
            <Link
              href="/design-guide"
              className="hover:text-purple-600 transition-colors flex items-center gap-1"
            >
              <Palette className="h-3.5 w-3.5" />
              Design Guide
            </Link>
            <span className="text-gray-300">|</span>
            <p>Version 2.0.0 (Prototype)</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
