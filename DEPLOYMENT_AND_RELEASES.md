# Deployment and Release Strategy

## 1. Deployment Automation with Vercel

To automate deployments so that merging a PR into `main` triggers a production deployment, follow these steps:

1.  **Connect Repository**:
    *   Go to your [Vercel Dashboard](https://vercel.com/dashboard).
    *   Click "Add New..." -> "Project".
    *   Import your GitHub repository (`testing-vercel-001`).

2.  **Configure Project**:
    *   Vercel automatically detects Next.js.
    *   Ensure the "Build Command" is `next build` (default).
    *   Ensure the "Output Directory" is `.next` (default).
    *   Click "Deploy".

3.  **Automatic Deployments**:
    *   Once connected, Vercel automatically creates a **Preview Deployment** for every Pull Request.
    *   When a PR is merged into `main`, Vercel automatically triggers a **Production Deployment**.
    *   You can verify this in the "Deployments" tab of your Vercel project.

## 2. Release Strategy

To automate semantic versioning and release notes, we recommend the following workflow:

### Recommended Tool: `release-it` or GitHub Releases

A simple and effective strategy for this project size is to use **GitHub Releases** combined with conventional commits.

#### Workflow:
1.  **Develop**: Create feature branches and open PRs.
2.  **Merge**: Merge PRs into `main` after CI checks pass.
3.  **Release**:
    *   When you are ready to release a new version, create a new **Release** in GitHub.
    *   Go to the "Releases" section in your repository.
    *   Click "Draft a new release".
    *   **Tag version**: Use semantic versioning (e.g., `v1.0.0`, `v1.1.0`).
    *   **Release title**: Same as the tag (e.g., `v1.0.0`).
    *   **Description**: Click "Generate release notes" to automatically generate notes based on your merged PRs.
    *   Click "Publish release".

### Advanced Automation (Optional)

For fully automated releases (auto-incrementing versions based on commit messages), you can set up [Semantic Release](https://github.com/semantic-release/semantic-release) in your CI pipeline.

1.  **Install Semantic Release**: `npm install --save-dev semantic-release`
2.  **Configure**: Add a `release` configuration file.
3.  **CI Step**: Add a step in your GitHub Actions workflow to run `npx semantic-release` on push to `main`.
    *   *Note: This requires setting up a `GITHUB_TOKEN` and `NPM_TOKEN` (if publishing to npm).*

For now, the **manual GitHub Release** method with auto-generated notes is the most robust and least intrusive starting point.
