# Copilot Instructions for Kelukin's Personal Website

## Project Overview
This is a bilingual (English/Chinese) personal portfolio website built with vanilla HTML/CSS/JavaScript. The site features automatic language detection, a blog system with markdown articles, and modern dark theme design with glassmorphism effects.

## Architecture & Key Components

### Bilingual Translation System
- **Core Pattern**: All translatable text uses `data-key` attributes in HTML elements
- **Translation Object**: Located in `script.js` with nested `en`/`zh` structure
- **Auto-detection**: `detectBrowserLanguage()` checks `navigator.language` for Chinese variants (`zh-*`)
- **State Management**: Language buttons get `.active` class, URL parameters preserve language in article views

Example pattern:
```html
<h1 data-key="welcome">Welcome to My Page</h1>
```

### Comment System
- **Implementation** Relies on GitHub Issues for article comments
- **Linking**: Each article's comments are linked to its GitHub issue via `data-key="comments-link"`
- **Display**: Comments are fetched and displayed dynamically in the article. 

### Article System Architecture
- **Metadata**: `articles.json` contains bilingual titles, summaries, dates, and IDs
- **File Convention**: Articles stored as `articles/{id}_{lang}.md` (e.g., `agents-era-reflection_en.md`)
- **Rendering**: `marked.js` library converts markdown to HTML client-side
- **Navigation**: Two-page system - main page shows cards, `article.html` renders full content with sidebar

### Styling Conventions
- **Theme**: Dark design with `#121212` background, `#1db954` (Spotify green) accent
- **Typography**: Montserrat font family via Google Fonts
- **Layout**: Mobile-first responsive design with `@media (max-width: 600px)` breakpoints
- **Effects**: Glassmorphism with `backdrop-filter: blur(10px)` and semi-transparent backgrounds

## Development Workflows

### Adding New Articles
1. Create markdown files: `articles/{id}_en.md` and `articles/{id}_zh.md`
2. Update `articles.json` with metadata entry containing both language versions
3. Files automatically appear on main page and in article sidebar

### Local Development
- **CORS Issue**: JSON loading requires local server - use `python3 -m http.server 8000`
- **Testing**: Always test both languages and mobile responsiveness
- **Assets**: Images stored in `image/` directory, referenced as `image/filename.ext`

### Deployment
- **Target**: GitHub Pages at `{username}.github.io`
- **Guide**: Comprehensive deployment instructions in `DEPLOY_GUIDE.md`
- **Branch**: Deploy from `main` branch, no build process required

## Project-Specific Patterns

### Hero Section Positioning
- Uses `align-items: flex-end` with `padding-bottom` to position text in lower portion
- Background image should not be blocked by text overlay
- Glassmorphism text box with brand color borders

### Mobile Optimization
- Navigation becomes static (not fixed) on mobile
- Hero height reduces to `40vh` on small screens
- Article layout switches from sidebar to stacked vertically
- Language switcher moves to block display on mobile

### Content Management
- Personal info embedded in translation objects, not separate config
- Work experience uses structured HTML with `data-key` for all text
- Projects section commented out with TODO markers for future content

## Critical Files
- `script.js`: Main translation system and article loading logic
- `article.js`: Individual article page functionality with sidebar
- `style.css`: Complete styling with mobile-first responsive design
- `articles.json`: Single source of truth for article metadata
- `DEPLOY_GUIDE.md`: Step-by-step GitHub Pages deployment

## External Dependencies
- **Google Fonts**: Montserrat typeface
- **Font Awesome**: Social media icons
- **marked.js**: Client-side markdown parsing
- **CDN**: All dependencies loaded via CDN, no build system

When working with this codebase, always consider bilingual impact, test mobile responsiveness, and maintain the established dark theme aesthetic with Spotify green accents.
