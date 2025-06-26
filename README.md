# 🤖 AI Buzz Media

A modern, high-performance AI news website built with **Astro** and **Sanity CMS**, featuring E-E-A-T compliance, expert author profiles, and comprehensive AI content management.

## ✨ Features

### 🎯 **E-E-A-T Compliance**
- **Expert Verification**: Verified author credentials and expertise areas
- **Experience Tracking**: Years of experience and professional background
- **Authoritativeness**: Published works, speaking engagements, and awards
- **Trustworthiness**: Fact-checking status and source attribution

### 📰 **Content Management**
- **Sanity CMS Integration**: Beautiful, intuitive content management interface
- **AI-Specific Fields**: Tools mentioned, difficulty levels, reading time
- **Editorial Workflow**: Draft/publish states with approval process
- **SEO Optimization**: Comprehensive meta tags and structured data

### 🎨 **Modern Design**
- **Responsive Layout**: Mobile-first design with beautiful animations
- **AI-Themed Styling**: Modern gradient designs and professional typography
- **Performance Optimized**: Fast loading with optimized assets
- **Accessibility**: WCAG compliant with proper semantic markup

### 🔧 **Technical Excellence**
- **Astro Framework**: Static site generation with server-side rendering
- **Netlify Deployment**: Global CDN with automatic SSL certificates
- **Email Integration**: Newsletter signup and contact forms
- **Security**: Comprehensive security headers and spam protection

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ai-news-site.git
   cd ai-news-site
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env
   # Edit .env with your configuration
   ```

4. **Start Sanity Studio**
   ```bash
   npx sanity dev
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   - Website: http://localhost:4321
   - Sanity Studio: http://localhost:3333

## 📁 Project Structure

```
ai-news-site/
├── src/
│   ├── components/          # Reusable UI components
│   ├── layouts/            # Page layouts and templates
│   ├── pages/              # Astro pages and routes
│   │   ├── admin/          # Sanity Studio interface
│   │   ├── api/            # API endpoints
│   │   └── categories/     # Category pages
│   ├── content/            # Content collections
│   │   ├── articles/       # Blog articles
│   │   ├── authors/        # Author profiles
│   │   └── categories/     # Category definitions
│   ├── lib/                # Utility functions and Sanity client
│   ├── styles/             # Global styles and CSS
│   └── utils/              # Helper utilities
├── public/                 # Static assets
├── netlify/                # Netlify functions
├── schemas/                # Sanity schema definitions
├── sanity.config.ts        # Sanity configuration
└── astro.config.mjs        # Astro configuration
```

## 🎛️ Content Management

### Accessing the CMS
1. Navigate to `/admin` on your deployed site
2. Log in with your credentials
3. Start creating and managing content

### Content Types

#### Articles
- **Basic Info**: Title, slug, excerpt, content
- **Organization**: Category, author, tags, status
- **SEO**: Custom titles, descriptions, keywords
- **AI-Specific**: Tools mentioned, difficulty, reading time
- **E-E-A-T**: Expert verification, fact-checking, sources

#### Authors
- **Profile**: Name, bio, avatar, job title
- **Expertise**: Areas of specialization, credentials
- **Verification**: Status, verification date, experience years
- **Social**: Twitter, LinkedIn, GitHub, website
- **Professional**: Published works, speaking engagements, awards

#### Categories
- **Identity**: Name, description, icon, color theme
- **SEO**: Custom titles, descriptions, keywords
- **Organization**: Content categorization and filtering

## 🚀 Deployment

### Netlify Deployment

1. **Connect to Netlify**
   ```bash
   # Deploy to Netlify
   npm run build
   netlify deploy --prod
   ```

2. **Set up environment variables in Netlify dashboard**

3. **Configure Sanity Studio for production**

### Manual Deployment

```bash
# Build the project
npm run build

# Deploy to your hosting provider
git add .
git commit -m "Complete AI news site with Sanity CMS"
git push origin main
```

## 🔧 Configuration

### Environment Variables

Copy `env.example` to `.env` and configure:

```bash
# Site Configuration
SITE_URL=https://your-site.com
NODE_ENV=production

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Analytics
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
FACEBOOK_PIXEL_ID=XXXXXXXXXX

# Social Media
TWITTER_HANDLE=@yourhandle
LINKEDIN_URL=https://linkedin.com/company/yourcompany
```

### Customization

#### Styling
- Modify `src/styles/global.css` for global styles
- Update component styles in individual `.astro` files
- Customize colors in CSS custom properties

#### Content Schema
- Edit `src/content.config.ts` to modify content structure
- Update `public/admin/config.yml` for CMS interface changes

#### Netlify Functions
- Modify `netlify/functions/` for custom serverless functions
- Update `netlify.toml` for deployment configuration

## 📊 Performance

### Build Optimization
- **Static Generation**: Pre-rendered pages for fast loading
- **Asset Optimization**: Compressed images and minified assets
- **Caching**: Long-term caching for static assets
- **CDN**: Global content delivery network

### Core Web Vitals
- **LCP**: Optimized for Largest Contentful Paint
- **FID**: Minimal First Input Delay
- **CLS**: No Cumulative Layout Shift

## 🔒 Security

### Security Headers
- **CSP**: Content Security Policy protection
- **HSTS**: HTTP Strict Transport Security
- **XSS Protection**: Cross-site scripting prevention
- **Frame Options**: Clickjacking protection

### Form Protection
- **Honeypot**: Spam prevention
- **Rate Limiting**: Request throttling
- **Input Validation**: Server-side validation
- **CSRF Protection**: Cross-site request forgery prevention

## 📈 SEO

### Technical SEO
- **Sitemap**: Automatic XML sitemap generation
- **RSS Feed**: RSS/Atom feed for content syndication
- **Meta Tags**: Comprehensive meta tag optimization
- **Structured Data**: Schema.org markup for rich snippets

### Content SEO
- **E-E-A-T**: Expert, Experience, Authoritativeness, Trustworthiness
- **Keyword Optimization**: Strategic keyword placement
- **Internal Linking**: Optimized site architecture
- **Image Optimization**: Alt text and compression

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Test thoroughly**
   ```bash
   npm run build
   npm run dev
   ```
5. **Commit your changes**
   ```bash
   git commit -m "Add amazing feature"
   ```
6. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

## 📚 Documentation

- **[Deployment Guide](DEPLOYMENT_GUIDE.md)**: Complete deployment instructions
- **[Testing Checklist](TESTING_CHECKLIST.md)**: Comprehensive testing procedures
- **[Content Migration](MIGRATION_GUIDE.md)**: Sanity to Decap CMS migration guide

## 🛠️ Tech Stack

- **Framework**: [Astro](https://astro.build) - Modern static site generator
- **Styling**: CSS with modern features and responsive design
- **Content Management**: [Sanity CMS](https://sanity.io) - Headless CMS with real-time collaboration
- **Deployment**: [Netlify](https://netlify.com) - Static site hosting with serverless functions
- **Analytics**: Google Analytics and Facebook Pixel
- **Email**: Custom SMTP integration for newsletters
- **Security**: Rate limiting, input validation, and security headers
- **Performance**: Image optimization, lazy loading, and Core Web Vitals optimization

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Astro Team** for the amazing framework
- **Sanity CMS** for the headless CMS solution
- **Netlify** for hosting and serverless functions
- **AI Research Community** for inspiration and content

## 📞 Support

For support and questions:
- 📧 Email: contact@aibuzzmedia.com
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/ai-news-site/issues)
- 📖 Documentation: [Project Wiki](https://github.com/yourusername/ai-news-site/wiki)

---

**Built with ❤️ for the AI community**

*AI Buzz Media - Your trusted source for AI news and insights*

```sh
npm create astro@latest -- --template blog
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/withastro/astro/tree/latest/examples/blog)
[![Open with CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/sandbox/github/withastro/astro/tree/latest/examples/blog)
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/withastro/astro?devcontainer_path=.devcontainer/blog/devcontainer.json)

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

![blog](https://github.com/withastro/astro/assets/2244813/ff10799f-a816-4703-b967-c78997e8323d)

Features:

- ✅ Minimal styling (make it your own!)
- ✅ 100/100 Lighthouse performance
- ✅ SEO-friendly with canonical URLs and OpenGraph data
- ✅ Sitemap support
- ✅ RSS Feed support
- ✅ Markdown & MDX support

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
├── public/
├── src/
│   ├── components/
│   ├── content/
│   ├── layouts/
│   └── pages/
├── astro.config.mjs
├── README.md
├── package.json
└── tsconfig.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

The `src/content/` directory contains "collections" of related Markdown and MDX documents. Use `getCollection()` to retrieve posts from `src/content/blog/`, and type-check your frontmatter using an optional schema. See [Astro's Content Collections docs](https://docs.astro.build/en/guides/content-collections/) to learn more.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Check out [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

## Credit

This theme is based off of the lovely [Bear Blog](https://github.com/HermanMartinus/bearblog/).
