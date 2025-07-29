# Comment System Setup Guide

## Overview
The comment system uses GitHub Issues to store and display comments. Each article links to a specific GitHub issue where users can participate in discussions.

## Setup Steps

### 1. Create GitHub Issues for Articles
For each article, you need to create a corresponding GitHub issue:

1. Go to your repository: `https://github.com/Kelukin/kelukin.github.io/issues`
2. Click "New Issue"
3. Use the article title as the issue title
4. Add a brief description mentioning it's for article comments
5. Add labels like "comments" or "article-discussion"
6. Note the issue number and update it in `articles.json`

### 2. Example Issue Creation
For the "Reflections on the Era of Agents" article:
- **Title**: "Comments: Reflections on the Era of Agents"
- **Body**: 
  ```markdown
  This issue is for discussing the article "Reflections on the Era of Agents".
  
  Read the full article: [English](https://kelukin.github.io/article.html?id=agents-era-reflection&lang=en) | [中文](https://kelukin.github.io/article.html?id=agents-era-reflection&lang=zh)
  
  Feel free to share your thoughts, questions, or additional insights!
  ```

### 3. Update Articles Metadata
Update `articles.json` with the GitHub issue number:
```json
{
    "id": "agents-era-reflection",
    "github_issue": 1,
    "title_en": "...",
    // ... other fields
}
```

## Features

### Bilingual Support
- Comment section titles and messages are translated
- Date formatting adapts to language (Chinese/English formats)
- "Join Discussion" button text changes with language

### Automatic Loading
- Comments are fetched from GitHub Issues API
- Displays author avatars, names, and timestamps
- Renders markdown in comment bodies
- Handles loading states and errors gracefully

### Responsive Design
- Mobile-optimized comment layout
- Glassmorphism styling matches site theme
- Hover effects on comment action button

## Troubleshooting

### No Comments Showing
1. Check if the GitHub issue number is correct in `articles.json`
2. Ensure the issue exists and is public
3. Verify the repository name matches in `article.js` (currently set to `Kelukin/kelukin.github.io`)

### API Rate Limiting
GitHub API allows 60 requests per hour for unauthenticated requests, which should be sufficient for normal blog traffic.

## Future Enhancements
- Add comment count display on main page
- Implement comment preview/excerpt
- Add social sharing integration
- Consider GitHub authentication for enhanced features
