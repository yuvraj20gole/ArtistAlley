const fs = require('fs');
const path = require('path');

// This script helps you copy your Figma Make project to a local directory
// Run this in your Cursor AI project root after setting up the basic React app

const filesToCopy = [
  'src/App.tsx',
  'src/styles/globals.css',
  'src/components/About.tsx',
  'src/components/BestSellers.tsx',
  'src/components/ComingSoon.tsx',
  'src/components/Footer.tsx',
  'src/components/Gallery.tsx',
  'src/components/Header.tsx',
  'src/components/Hero.tsx',
  'src/components/Login.tsx',
  'src/components/More.tsx',
  'src/components/PopularArtists.tsx',
  'src/components/PopularArtwork.tsx',
  'src/components/Register.tsx',
  'src/components/figma/ImageWithFallback.tsx',
  // Add all UI components
  'src/components/ui/accordion.tsx',
  'src/components/ui/alert-dialog.tsx',
  'src/components/ui/alert.tsx',
  'src/components/ui/aspect-ratio.tsx',
  'src/components/ui/avatar.tsx',
  'src/components/ui/badge.tsx',
  'src/components/ui/breadcrumb.tsx',
  'src/components/ui/button.tsx',
  'src/components/ui/calendar.tsx',
  'src/components/ui/card.tsx',
  'src/components/ui/carousel.tsx',
  'src/components/ui/chart.tsx',
  'src/components/ui/checkbox.tsx',
  'src/components/ui/collapsible.tsx',
  'src/components/ui/command.tsx',
  'src/components/ui/context-menu.tsx',
  'src/components/ui/dialog.tsx',
  'src/components/ui/drawer.tsx',
  'src/components/ui/dropdown-menu.tsx',
  'src/components/ui/form.tsx',
  'src/components/ui/hover-card.tsx',
  'src/components/ui/input-otp.tsx',
  'src/components/ui/input.tsx',
  'src/components/ui/label.tsx',
  'src/components/ui/menubar.tsx',
  'src/components/ui/navigation-menu.tsx',
  'src/components/ui/pagination.tsx',
  'src/components/ui/popover.tsx',
  'src/components/ui/progress.tsx',
  'src/components/ui/radio-group.tsx',
  'src/components/ui/resizable.tsx',
  'src/components/ui/scroll-area.tsx',
  'src/components/ui/select.tsx',
  'src/components/ui/separator.tsx',
  'src/components/ui/sheet.tsx',
  'src/components/ui/sidebar.tsx',
  'src/components/ui/skeleton.tsx',
  'src/components/ui/slider.tsx',
  'src/components/ui/sonner.tsx',
  'src/components/ui/switch.tsx',
  'src/components/ui/table.tsx',
  'src/components/ui/tabs.tsx',
  'src/components/ui/textarea.tsx',
  'src/components/ui/toggle-group.tsx',
  'src/components/ui/toggle.tsx',
  'src/components/ui/tooltip.tsx',
  'src/components/ui/use-mobile.ts',
  'src/components/ui/utils.ts',
  'src/lib/utils.ts'
];

// Function to create directories if they don't exist
function ensureDirectoryExists(filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Manual content insertion function
function insertContent(filePath, content) {
  ensureDirectoryExists(filePath);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✅ Created: ${filePath}`);
}

// Create utils.ts file
const utilsContent = `import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}`;

insertContent('src/lib/utils.ts', utilsContent);

console.log('🚀 Project structure created!');
console.log('📝 Now manually copy each file content from Figma Make to the corresponding file in this project.');
console.log('📋 Files to copy:');
filesToCopy.forEach(file => {
  if (!file.includes('utils.ts')) {
    console.log(`   ${file}`);
  }
});