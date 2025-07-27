# How to Deploy Your Website to GitHub Pages

This guide will walk you through deploying your personal website to GitHub Pages.

## Prerequisites

1.  **A GitHub Account:** If you don't have one, sign up at [github.com](https://github.com).
2.  **Git Installed:** You need Git installed on your computer. You can download it from [git-scm.com](https://git-scm.com/).

## Deployment Steps

### 1. Create a New Repository on GitHub

*   Go to your GitHub account and create a new repository.
*   The repository name **must** be `your-username.github.io`, where `your-username` is your GitHub username. This is crucial for GitHub Pages to work correctly for a user site.
*   You can choose to make it public or private. For a personal website, public is standard.
*   Do **not** initialize the repository with a README, .gitignore, or license yet. You'll add the files you've just created.

### 2. Initialize a Git Repository Locally

Open your terminal or command prompt and navigate to the `website` directory where your `index.html`, `style.css`, and `script.js` files are.

```bash
cd /Users/kelukin/Documents/website
```

Now, initialize a new Git repository:

```bash
git init
```

### 3. Add and Commit Your Website Files

Add the files to your new local repository.

```bash
git add .
```

Commit the files:

```bash
git commit -m "Initial commit"
```

### 4. Connect Your Local Repository to GitHub

Link your local repository to the one you created on GitHub. Replace `your-username` with your actual GitHub username.

```bash
git remote add origin https://github.com/your-username/your-username.github.io.git
```

Verify the new remote:

```bash
git remote -v
```

### 5. Push Your Website to GitHub

Push your committed files to the `main` branch on GitHub.

```bash
git branch -M main
git push -u origin main
```

### 6. Access Your Website

Your website should now be live at `https://your-username.github.io`. It might take a few minutes for the site to become available.

## Making Changes

Whenever you make changes to your website:

1.  **Add and commit the changes:**
    ```bash
    git add .
    git commit -m "A message describing your changes"
    ```
2.  **Push the changes to GitHub:**
    ```bash
    git push
    ```

Your website will be updated automatically.
