import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
          <p>© 2026 Defect Knowledge Base System</p>
          <div className="flex items-center gap-4">
            <Link
              href="/design-guide"
              className="hover:text-purple-600 transition-colors"
            >
              Design Guide
            </Link>
            <span>|</span>
            <p>Version 1.0.0 (Prototype)</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
