# Math Mountain - W06 Final Project

A responsive, dynamic website documenting my journey from struggling with math in high school to mastering calculus as an adult software developer.

## 🎯 Project Purpose

Math Mountain serves as a free, interactive learning hub providing:
- Curated video lectures organized by subject
- Personal lesson notes with photos
- Honest textbook and workbook reviews
- Code examples showing math concepts in programming
- Interactive tools and calculators

## 📁 Site Structure

### Pages (4 total)
1. **index.html** - Home page with hero, stats, features grid, newsletter signup
2. **notes.html** - Lesson notes gallery with filtering and add-note form
3. **books.html** - Book reviews with category filtering
4. **programming.html** - Interactive slope calculator and code examples
5. **citations.html** - Source attributions (unstyled as per requirements)

### JavaScript Files
- **main.js** - Home page: navigation, counters, newsletter form, localStorage
- **notes.js** - Notes gallery, filtering, add notes with localStorage persistence
- **books.js** - Book display with filtering and localStorage preferences
- **programming.js** - Slope calculator with canvas visualization, code examples toggle

### Stylesheets
- **main.css** - Comprehensive responsive styles for all pages
- **siteplan.css** - Site plan styling (existing)

## ✅ Project Requirements Met

### Functional Requirements
- [x] Hosted in GitHub Pages (`wdd131/project/`)
- [x] 3+ pages with common navigation and theme
- [x] Significant, relevant content supporting site purpose
- [x] Accessibility, usability, and visual appeal
- [x] Valid, standards-based HTML
- [x] Valid CSS (no unused/duplicate rules)
- [x] Responsive design (mobile portrait/landscape + desktop)
- [x] Optimized images with lazy loading
- [x] HTML form (newsletter signup, add note form)

### JavaScript Requirements
- [x] **Multiple functions** - 20+ functions across 4 JS files
- [x] **DOM interaction** - Selecting, modifying elements, event listening
- [x] **Conditional branching** - Filter logic, validation, display conditions
- [x] **Objects and arrays** - Notes data, books data, code examples
- [x] **Array methods** - `.map()`, `.filter()`, `.forEach()`, `.unshift()`
- [x] **Template literals** - All string building uses template literals
- [x] **localStorage** - Newsletter subscription, notes persistence, filter preferences

## 🎨 Design Features

### Color Palette (from site plan)
- Primary: `#1E3A8A` (Deep Blue)
- Secondary: `#60A5FA` (Sky Blue)
- Accent 1: `#F59E0B` (Warm Orange)
- Accent 2: `#E83F6F` (Warm Red)
- Text: `#1F2937` (Dark Gray)
- Background: `#F3F4F6` (Light Gray)

### Typography
- Headings: Merriweather (serif)
- Body: Roboto (sans-serif)
- Code: Courier New (monospace)

### Responsive Breakpoints
- Mobile: < 768px (hamburger menu, stacked layout)
- Tablet: 768px - 1023px (2-column grids)
- Desktop: 1024px+ (3-column grids)

## 🚀 Key Features

### Home Page
- Animated stat counters (Intersection Observer)
- Newsletter signup with localStorage
- Hero section with gradient background
- 3-column features grid

### Notes Page
- Dynamic photo gallery from localStorage
- Subject filtering (Pre-Calc, Calc 1, Calc 2, Algebra)
- Add new notes form with URL input
- Persistent storage of user-added notes

### Books Page
- Filterable book reviews by category
- Display count updates dynamically
- Saved filter preference in localStorage
- Recommended badges and star ratings

### Programming Page
- Interactive slope calculator
- Real-time canvas visualization
- Language toggle (Python/JavaScript)
- Code examples with syntax highlighting styles

## 📊 Testing Checklist

- [ ] Run DevTools Lighthouse (Performance, Accessibility, Best Practices, SEO)
- [ ] Check console for JavaScript errors
- [ ] Validate HTML (all pages)
- [ ] Validate CSS
- [ ] Test responsive layouts (mobile portrait/landscape, tablet, desktop)
- [ ] Verify lazy loading on images
- [ ] Test localStorage persistence
- [ ] Check color contrast (DevTools CSS Overview)
- [ ] Spell/grammar check all content

## 🔗 Deployment

**GitHub Pages URL:** `https://burdiapps.github.io/wdd131/project/`

Hosted in the `wdd131` repository under the `project/` folder.

## 📝 Citations

See `citations.html` for full source attributions including:
- Professor Leonard (YouTube lectures)
- Khan Academy (practice problems)
- Google Fonts
- Textbook references

## 👤 Author

**James Burdick**  
BurdiApps | WDD 131 Final Project  
December 2025

---

*This project demonstrates mastery of HTML, CSS, and JavaScript fundamentals including responsive design, DOM manipulation, array methods, conditional logic, template literals, and localStorage.*
