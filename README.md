# Portfolio Website - Riandy Hasan (Yandy)

A minimalist portfolio website showcasing projects, blog posts, and professional information.

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Set up environment variables:

Create a `.env` file in the root directory based on `.env.example`:

```bash
cp .env.example .env
```

Fill in your Firebase configuration values in the `.env` file.

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## Admin Panel

Access the admin panel at `/admin/login`

## Content Management

All content is stored in JSON files in the `/data` directory:

- `projects.json` - Project portfolio items
- `featured-projects.json` - Featured projects
- `blog-posts.json` - Blog posts with Markdown content
- `categories.json` - Blog and project categories
- `profile.json` - Personal information and bio

## License

MIT License - feel free to use this template for your own portfolio.
