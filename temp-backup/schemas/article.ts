import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  groups: [
    {
      name: 'content',
      title: 'Content',
      default: true,
    },
    {
      name: 'seo',
      title: 'SEO & Meta',
    },
    {
      name: 'media',
      title: 'Media',
    },
    {
      name: 'publishing',
      title: 'Publishing',
    },
    {
      name: 'analytics',
      title: 'Analytics & Marketing',
    },
    {
      name: 'settings',
      title: 'Advanced Settings',
    },
  ],
  fields: [
    // CONTENT GROUP
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required().max(60).warning('Keep titles under 60 characters for better SEO'),
      description: 'Main article title (recommended: 30-60 characters)',
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      group: 'content',
      options: {
        source: 'title',
        maxLength: 96,
        slugify: (input) => input
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^\w\-]+/g, '')
          .slice(0, 96),
      },
      validation: (Rule) => Rule.required(),
      description: 'URL-friendly version of the title',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      group: 'content',
      rows: 3,
      validation: (Rule) => Rule.max(160).warning('Keep excerpts under 160 characters for better search results'),
      description: 'Brief summary (recommended: 120-160 characters)',
    }),
    // Added category reference to article (adds dynamic categories to the admin page)
    defineField({
        name: 'category',
        title: 'Primary Category',
        type: 'reference',
        group: 'content',
        to: [{ type: 'category' }],
        validation: (Rule) => Rule.required(),
        description: 'Main category for this article',
    }),
    defineField({
      name: 'contentType',
      title: 'Content Type',
      type: 'string',
      group: 'content',
      options: {
        list: [
          { title: '📰 Breaking News', value: 'breaking-news' },
          { title: '🔧 Tool Review', value: 'tool-review' },
          { title: '⚖️ Tool Comparison', value: 'comparison' },
          { title: '📚 Tutorial/Guide', value: 'tutorial' },
          { title: '💡 Opinion/Analysis', value: 'opinion' },
          { title: '🔬 Research/Study', value: 'research' },
          { title: '📈 Business/Trends', value: 'business' },
          { title: '📝 General Article', value: 'general' },
        ],
        layout: 'dropdown',
      },
      initialValue: 'general',
      description: 'What type of content is this article?'
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'string'
        }
      ],
      options: {
        list: [
          { title: 'AI Tools', value: 'ai-tools' },
          { title: 'Automation', value: 'automation' },
          { title: 'Productivity', value: 'productivity' },
          { title: 'Machine Learning', value: 'machine-learning' },
          { title: 'ChatGPT', value: 'chatgpt' },
          { title: 'Midjourney', value: 'midjourney' },
          { title: 'Claude', value: 'claude' },
          { title: 'OpenAI', value: 'openai' },
          { title: 'Google AI', value: 'google-ai' },
          { title: 'Microsoft AI', value: 'microsoft-ai' },
          { title: 'Startup', value: 'startup' },
          { title: 'Enterprise', value: 'enterprise' },
          { title: 'Free Tools', value: 'free-tools' },
          { title: 'Paid Tools', value: 'paid-tools' },
          { title: 'No-Code', value: 'no-code' },
          { title: 'API', value: 'api' },
          { title: 'Integration', value: 'integration' },
          { title: 'Workflow', value: 'workflow' },
          { title: 'Data Analysis', value: 'data-analysis' },
          { title: 'Content Creation', value: 'content-creation' },
        ]
      },
      description: 'Select relevant tags for better categorization and SEO'
    }),
    defineField({
        name: 'content',
        title: 'Article Content',
        type: 'array',
        group: 'content',
        of: [
          // Rich text blocks
          {
            type: 'block',
            styles: [
              {title: 'Normal', value: 'normal'},
              {title: 'H2', value: 'h2'},
              {title: 'H3', value: 'h3'},
              {title: 'H4', value: 'h4'},
              {title: 'Quote', value: 'blockquote'}
            ],
            marks: {
              decorators: [
                {title: 'Strong', value: 'strong'},
                {title: 'Emphasis', value: 'em'},
                {title: 'Code', value: 'code'},
                {title: 'Underline', value: 'underline'},
                {title: 'Strike', value: 'strike-through'}
              ],
              annotations: [
                {
                  title: 'URL',
                  name: 'link',
                  type: 'object',
                  fields: [
                    {
                      title: 'URL',
                      name: 'href',
                      type: 'url'
                    },
                    {
                      title: 'Open in new tab',
                      name: 'blank',
                      type: 'boolean',
                      initialValue: false
                    },
                    {
                      title: 'No follow',
                      name: 'nofollow',
                      type: 'boolean',
                      initialValue: false,
                      description: 'Add rel="nofollow" for affiliate links'
                    }
                  ]
                }
              ]
            }
          },
          // Enhanced Image block
          {
            type: 'image',
            title: 'Image',
            options: {
              hotspot: true
            },
            fields: [
              {
                name: 'alt',
                type: 'string',
                title: 'Alt Text',
                description: 'Important for SEO and accessibility',
                validation: (Rule) => Rule.required()
              },
              {
                name: 'caption',
                type: 'string',
                title: 'Caption'
              },
              {
                name: 'attribution',
                type: 'string',
                title: 'Photo Credit/Source'
              }
            ]
          },
          // Image Gallery
          {
            name: 'gallery',
            type: 'object',
            title: 'Image Gallery',
            fields: [
              {
                name: 'images',
                type: 'array',
                title: 'Images',
                of: [
                  {
                    type: 'image',
                    options: { hotspot: true },
                    fields: [
                      {
                        name: 'alt',
                        type: 'string',
                        title: 'Alt Text',
                        validation: (Rule) => Rule.required()
                      },
                      {
                        name: 'caption',
                        type: 'string',
                        title: 'Caption'
                      }
                    ]
                  }
                ]
              },
              {
                name: 'layout',
                type: 'string',
                title: 'Gallery Layout',
                options: {
                  list: [
                    { title: 'Grid', value: 'grid' },
                    { title: 'Carousel', value: 'carousel' },
                    { title: 'Masonry', value: 'masonry' }
                  ]
                },
                initialValue: 'grid'
              }
            ],
            preview: {
              select: {
                images: 'images',
                layout: 'layout'
              },
              prepare(selection) {
                const { images, layout } = selection
                const imageCount = images ? images.length : 0
                return {
                  title: `Gallery: ${imageCount} images`,
                  subtitle: `Layout: ${layout || 'grid'}`,
                  media: images && images[0] ? images[0] : undefined
                }
              }
            }
          },
          // Enhanced Quote Block
          {
            name: 'customQuote',
            type: 'object',
            title: 'Quote Block',
            fields: [
              {
                name: 'text',
                type: 'text',
                title: 'Quote Text',
                rows: 3,
                validation: (Rule) => Rule.required()
              },
              {
                name: 'author',
                type: 'string',
                title: 'Quote Author'
              },
              {
                name: 'authorTitle',
                type: 'string',
                title: 'Author Title/Company'
              },
              {
                name: 'style',
                type: 'string',
                title: 'Quote Style',
                options: {
                  list: [
                    { title: 'Default', value: 'default' },
                    { title: 'Highlighted', value: 'highlighted' },
                    { title: 'Pull Quote', value: 'pullquote' }
                  ]
                },
                initialValue: 'default'
              }
            ],
            preview: {
              select: {
                title: 'text',
                subtitle: 'author'
              }
            }
          },
          // Code Block
          {
            name: 'codeBlock',
            type: 'object',
            title: 'Code Block',
            fields: [
              {
                name: 'code',
                type: 'text',
                title: 'Code',
                rows: 8,
                validation: (Rule) => Rule.required()
              },
              {
                name: 'language',
                type: 'string',
                title: 'Language',
                options: {
                  list: [
                    { title: 'JavaScript', value: 'javascript' },
                    { title: 'Python', value: 'python' },
                    { title: 'HTML', value: 'html' },
                    { title: 'CSS', value: 'css' },
                    { title: 'JSON', value: 'json' },
                    { title: 'Bash', value: 'bash' },
                    { title: 'SQL', value: 'sql' },
                    { title: 'PHP', value: 'php' },
                    { title: 'Ruby', value: 'ruby' },
                    { title: 'Java', value: 'java' },
                    { title: 'C++', value: 'cpp' },
                    { title: 'Plain Text', value: 'text' }
                  ]
                },
                initialValue: 'javascript'
              },
              {
                name: 'filename',
                type: 'string',
                title: 'Filename (optional)',
                description: 'e.g., script.js, index.html'
              },
              {
                name: 'highlightLines',
                type: 'string',
                title: 'Highlight Lines',
                description: 'e.g., "1,3-5,7" to highlight lines 1, 3-5, and 7'
              }
            ],
            preview: {
              select: {
                title: 'filename',
                subtitle: 'language',
                code: 'code'
              },
              prepare(selection) {
                const { title, subtitle, code } = selection
                return {
                  title: title || 'Code Block',
                  subtitle: `Language: ${subtitle || 'text'} • ${code ? code.split('\n').length : 0} lines`
                }
              }
            }
          },
          // Table Builder
          {
            name: 'table',
            type: 'object',
            title: 'Table',
            fields: [
              {
                name: 'caption',
                type: 'string',
                title: 'Table Caption'
              },
              {
                name: 'headers',
                type: 'array',
                title: 'Headers',
                of: [{ type: 'string' }],
                validation: (Rule) => Rule.required().min(1)
              },
              {
                name: 'rows',
                type: 'array',
                title: 'Rows',
                of: [
                  {
                    type: 'object',
                    fields: [
                      {
                        name: 'cells',
                        type: 'array',
                        title: 'Cells',
                        of: [{ type: 'string' }]
                      }
                    ]
                  }
                ]
              },
              {
                name: 'style',
                type: 'string',
                title: 'Table Style',
                options: {
                  list: [
                    { title: 'Default', value: 'default' },
                    { title: 'Striped', value: 'striped' },
                    { title: 'Bordered', value: 'bordered' },
                    { title: 'Compact', value: 'compact' }
                  ]
                },
                initialValue: 'default'
              }
            ],
            preview: {
              select: {
                caption: 'caption',
                headers: 'headers',
                rows: 'rows'
              },
              prepare(selection) {
                const { caption, headers, rows } = selection
                const headerCount = headers ? headers.length : 0
                const rowCount = rows ? rows.length : 0
                return {
                  title: caption || 'Table',
                  subtitle: `${headerCount} columns × ${rowCount} rows`
                }
              }
            }
          },
          // Alert/Notice Box
          {
            name: 'alertBox',
            type: 'object',
            title: 'Alert/Notice Box',
            fields: [
              {
                name: 'type',
                type: 'string',
                title: 'Alert Type',
                options: {
                  list: [
                    { title: '💡 Info', value: 'info' },
                    { title: '✅ Success', value: 'success' },
                    { title: '⚠️ Warning', value: 'warning' },
                    { title: '❌ Error', value: 'error' },
                    { title: '💰 Tip', value: 'tip' }
                  ]
                },
                initialValue: 'info'
              },
              {
                name: 'title',
                type: 'string',
                title: 'Alert Title'
              },
              {
                name: 'content',
                type: 'text',
                title: 'Alert Content',
                rows: 3,
                validation: (Rule) => Rule.required()
              }
            ],
            preview: {
              select: {
                title: 'title',
                type: 'type',
                content: 'content'
              },
              prepare(selection) {
                const { title, type, content } = selection
                const typeLabels = {
                  info: '💡 Info',
                  success: '✅ Success',
                  warning: '⚠️ Warning',
                  error: '❌ Error',
                  tip: '💰 Tip'
                }
                return {
                  title: title || typeLabels[type] || 'Alert',
                  subtitle: content ? content.substring(0, 60) + '...' : ''
                }
              }
            }
          },
          // Accordion/FAQ
          {
            name: 'accordion',
            type: 'object',
            title: 'Accordion/FAQ',
            fields: [
              {
                name: 'items',
                type: 'array',
                title: 'Accordion Items',
                of: [
                  {
                    type: 'object',
                    fields: [
                      {
                        name: 'question',
                        type: 'string',
                        title: 'Question/Title',
                        validation: (Rule) => Rule.required()
                      },
                      {
                        name: 'answer',
                        type: 'text',
                        title: 'Answer/Content',
                        rows: 4,
                        validation: (Rule) => Rule.required()
                      }
                    ],
                    preview: {
                      select: {
                        title: 'question',
                        subtitle: 'answer'
                      }
                    }
                  }
                ]
              },
              {
                name: 'allowMultiple',
                type: 'boolean',
                title: 'Allow multiple items open',
                initialValue: false
              }
            ],
            preview: {
              select: {
                items: 'items'
              },
              prepare(selection) {
                const { items } = selection
                const itemCount = items ? items.length : 0
                return {
                  title: `Accordion: ${itemCount} items`,
                  subtitle: 'Expandable content sections'
                }
              }
            }
          },
          // Product Comparison Table
          {
            name: 'comparisonTable',
            type: 'object',
            title: 'Product Comparison',
            fields: [
              {
                name: 'title',
                type: 'string',
                title: 'Comparison Title'
              },
              {
                name: 'products',
                type: 'array',
                title: 'Products',
                of: [
                  {
                    type: 'object',
                    fields: [
                      {
                        name: 'name',
                        type: 'string',
                        title: 'Product Name',
                        validation: (Rule) => Rule.required()
                      },
                      {
                        name: 'image',
                        type: 'image',
                        title: 'Product Image',
                        options: { hotspot: true }
                      },
                      {
                        name: 'price',
                        type: 'string',
                        title: 'Price'
                      },
                      {
                        name: 'features',
                        type: 'array',
                        title: 'Features',
                        of: [{ type: 'string' }]
                      },
                      {
                        name: 'rating',
                        type: 'number',
                        title: 'Rating (1-5)',
                        validation: (Rule) => Rule.min(1).max(5)
                      },
                      {
                        name: 'affiliateLink',
                        type: 'url',
                        title: 'Affiliate Link'
                      }
                    ],
                    preview: {
                      select: {
                        title: 'name',
                        subtitle: 'price',
                        media: 'image'
                      }
                    }
                  }
                ]
              }
            ],
            preview: {
              select: {
                title: 'title',
                products: 'products'
              },
              prepare(selection) {
                const { title, products } = selection
                const productCount = products ? products.length : 0
                return {
                  title: title || 'Product Comparison',
                  subtitle: `${productCount} products`
                }
              }
            }
          },
          // Enhanced Video Embed
          {
            name: 'videoEmbed',
            type: 'object',
            title: 'Video',
            fields: [
              {
                name: 'url',
                type: 'url',
                title: 'Video URL',
                description: 'YouTube, Vimeo, or direct video URL',
                validation: (Rule) => Rule.required()
              },
              {
                name: 'title',
                type: 'string',
                title: 'Video Title'
              },
              {
                name: 'caption',
                type: 'string',
                title: 'Video Caption'
              },
              {
                name: 'aspectRatio',
                type: 'string',
                title: 'Aspect Ratio',
                options: {
                  list: [
                    { title: '16:9 (Widescreen)', value: '16:9' },
                    { title: '4:3 (Standard)', value: '4:3' },
                    { title: '1:1 (Square)', value: '1:1' },
                    { title: '9:16 (Vertical)', value: '9:16' }
                  ]
                },
                initialValue: '16:9'
              }
            ],
            preview: {
              select: {
                title: 'title',
                url: 'url'
              },
              prepare(selection) {
                const { title, url } = selection
                return {
                  title: title || 'Video',
                  subtitle: url
                }
              }
            }
          },
          // Enhanced Call-to-Action Block
          {
            name: 'callToAction',
            type: 'object',
            title: 'Call to Action',
            fields: [
              {
                name: 'style',
                type: 'string',
                title: 'CTA Style',
                options: {
                  list: [
                    { title: 'Default Box', value: 'default' },
                    { title: 'Highlighted', value: 'highlighted' },
                    { title: 'Minimal', value: 'minimal' },
                    { title: 'Banner', value: 'banner' }
                  ]
                },
                initialValue: 'default'
              },
              {
                name: 'title',
                type: 'string',
                title: 'CTA Title',
                validation: (Rule) => Rule.required()
              },
              {
                name: 'description',
                type: 'text',
                title: 'Description',
                rows: 2
              },
              {
                name: 'buttonText',
                type: 'string',
                title: 'Button Text',
                validation: (Rule) => Rule.required()
              },
              {
                name: 'buttonUrl',
                type: 'url',
                title: 'Button URL',
                validation: (Rule) => Rule.required()
              },
              {
                name: 'buttonStyle',
                type: 'string',
                title: 'Button Style',
                options: {
                  list: [
                    { title: 'Primary', value: 'primary' },
                    { title: 'Secondary', value: 'secondary' },
                    { title: 'Outline', value: 'outline' }
                  ]
                },
                initialValue: 'primary'
              },
              {
                name: 'isAffiliate',
                type: 'boolean',
                title: 'Affiliate Link',
                description: 'Mark as affiliate link for proper disclosure',
                initialValue: false
              }
            ],
            preview: {
              select: {
                title: 'title',
                subtitle: 'buttonText'
              }
            }
          },
          // HTML Block (restricted)
          {
            name: 'htmlBlock',
            type: 'object',
            title: 'Custom HTML',
            fields: [
              {
                name: 'html',
                type: 'text',
                title: 'HTML Code',
                description: 'Enter custom HTML (use with caution)',
                rows: 6,
                validation: (Rule) => Rule.required()
              },
              {
                name: 'description',
                type: 'string',
                title: 'Description',
                description: 'Brief description of what this HTML does',
                validation: (Rule) => Rule.required()
              }
            ],
            preview: {
              select: {
                title: 'description',
                subtitle: 'html'
              },
              prepare(selection) {
                const { title, subtitle } = selection
                return {
                  title: title || 'HTML Block',
                  subtitle: subtitle ? `${subtitle.substring(0, 50)}...` : 'No HTML content'
                }
              }
            }
          }
        ]
    }),

    // SEO & META GROUP
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      group: 'seo',
      validation: (Rule) => Rule.max(60).warning('Keep SEO titles under 60 characters'),
      description: 'Custom title for search engines (if different from main title)',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      group: 'seo',
      rows: 3,
      validation: (Rule) => Rule.max(160).warning('Keep meta descriptions under 160 characters'),
      description: 'Description for search engines and social media (120-160 characters)',
    }),
    defineField({
      name: 'focusKeyword',
      title: 'Focus Keyword',
      type: 'string',
      group: 'seo',
      description: 'Primary keyword to optimize this article for',
    }),
    defineField({
      name: 'additionalKeywords',
      title: 'Additional Keywords',
      type: 'array',
      group: 'seo',
      of: [{ type: 'string' }],
      description: 'Related keywords and phrases',
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL',
      type: 'url',
      group: 'seo',
      description: 'Canonical URL if this content exists elsewhere',
    }),
    defineField({
      name: 'noIndex',
      title: 'No Index',
      type: 'boolean',
      group: 'seo',
      description: 'Prevent search engines from indexing this page',
      initialValue: false,
    }),
    defineField({
      name: 'openGraph',
      title: 'Open Graph (Social Media)',
      type: 'object',
      group: 'seo',
      fields: [
        {
          name: 'title',
          type: 'string',
          title: 'OG Title',
          description: 'Title for social media sharing'
        },
        {
          name: 'description',
          type: 'text',
          title: 'OG Description',
          rows: 2,
          description: 'Description for social media sharing'
        },
        {
          name: 'image',
          type: 'image',
          title: 'OG Image',
          description: 'Image for social media sharing (1200x630px recommended)',
          options: { hotspot: true }
        }
      ],
      options: {
        collapsible: true,
        collapsed: true
      }
    }),

    // MEDIA GROUP
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      group: 'media',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          description: 'Important for SEO and accessibility',
          validation: (Rule) => Rule.required()
        },
        {
          name: 'caption',
          type: 'string',
          title: 'Caption'
        }
      ],
      description: 'Main image for the article (1200x630px recommended)',
    }),
    defineField({
      name: 'mediaGallery',
      title: 'Additional Media',
      type: 'array',
      group: 'media',
      of: [
        {
          type: 'reference',
          to: [{ type: 'mediaAsset' }]
        }
      ],
      description: 'Additional images, videos, or files related to this article',
    }),

    // PUBLISHING GROUP
    defineField({
      name: 'status',
      title: 'Publication Status',
      type: 'string',
      group: 'publishing',
      options: {
        list: [
          { title: '📝 Draft', value: 'draft' },
          { title: '👀 Review', value: 'review' },
          { title: '✅ Published', value: 'published' },
          { title: '⏰ Scheduled', value: 'scheduled' },
          { title: '🗃️ Archived', value: 'archived' },
        ],
        layout: 'radio',
      },
      initialValue: 'draft',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Publish Date & Time',
      type: 'datetime',
      group: 'publishing',
      description: 'Schedule publication time (uses site timezone)',
      initialValue: () => new Date().toISOString(),
      options: {
        timeStep: 15,
      },
      hidden: ({ document }) => document?.status === 'draft',
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      group: 'publishing',
      to: [{ type: 'author' }],
      description: 'Article author',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'coAuthors',
      title: 'Co-Authors',
      type: 'array',
      group: 'publishing',
      of: [
        {
          type: 'reference',
          to: [{ type: 'author' }]
        }
      ],
      description: 'Additional authors who contributed to this article',
    }),
    defineField({
      name: 'lastModified',
      title: 'Last Modified',
      type: 'datetime',
      group: 'publishing',
      readOnly: true,
      description: 'Automatically updated when article is saved',
    }),

    // ANALYTICS & MARKETING GROUP
    defineField({
      name: 'heroPlacement',
      title: 'Homepage Placement',
      type: 'string',
      group: 'analytics',
      options: {
        list: [
          { title: '🌟 Featured (Large Card)', value: 'large' },
          { title: '📰 Small Cards', value: 'small' },
          { title: '❌ Not Featured', value: 'none' },
        ],
        layout: 'radio',
      },
      initialValue: 'none',
      description: 'Controls homepage hero section placement',
    }),
    defineField({
      name: 'revenuePotential',
      title: 'Revenue Potential',
      type: 'string',
      group: 'analytics',
      options: {
        list: [
          { title: '💰 High Affiliate (5+ links)', value: 'high-affiliate' },
          { title: '💵 Medium Affiliate (2-4 links)', value: 'medium-affiliate' },
          { title: '🎯 Conversion Focused', value: 'conversion-focused' },
          { title: '📊 Lead Generation', value: 'lead-generation' },
          { title: '📝 Standard Content', value: 'standard' },
        ],
        layout: 'dropdown',
      },
      initialValue: 'standard',
      description: 'Expected revenue/conversion potential',
    }),
    defineField({
      name: 'readingTime',
      title: 'Reading Time (minutes)',
      type: 'number',
      group: 'analytics',
      description: 'Estimated reading time (auto-calculated from content)',
      readOnly: true,
    }),
    defineField({
      name: 'wordCount',
      title: 'Word Count',
      type: 'number',
      group: 'analytics',
      description: 'Total word count (auto-calculated)',
      readOnly: true,
    }),
    defineField({
      name: 'targetAudience',
      title: 'Target Audience',
      type: 'array',
      group: 'analytics',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Beginners', value: 'beginners' },
          { title: 'Intermediate Users', value: 'intermediate' },
          { title: 'Advanced Users', value: 'advanced' },
          { title: 'Developers', value: 'developers' },
          { title: 'Business Owners', value: 'business-owners' },
          { title: 'Marketers', value: 'marketers' },
          { title: 'Content Creators', value: 'content-creators' },
          { title: 'Entrepreneurs', value: 'entrepreneurs' },
          { title: 'Students', value: 'students' },
        ]
      },
      description: 'Who is this article targeted for?',
    }),
    defineField({
      name: 'relatedArticles',
      title: 'Related Articles',
      type: 'array',
      group: 'analytics',
      of: [
        {
          type: 'reference',
          to: [{ type: 'article' }]
        }
      ],
      description: 'Manually select related articles',
    }),

    // ADVANCED SETTINGS GROUP
    defineField({
        name: 'priority',
        title: 'Editorial Priority',
        type: 'string',
        group: 'settings',
        options: {
          list: [
            { title: '🔥 Urgent', value: 'urgent' },
            { title: '⚡ High Priority', value: 'high' },
            { title: '📝 Normal', value: 'normal' },
            { title: '📋 Low Priority', value: 'low' },
            { title: '🗂️ Backlog', value: 'backlog' },
          ],
          layout: 'radio',
        },
        initialValue: 'normal',
        description: 'Editorial workflow priority',
      }),
      defineField({
        name: 'contentTemplate',
        title: 'Content Template',
        type: 'string',
        group: 'settings',
        options: {
          list: [
            { title: 'Default Article', value: 'default' },
            { title: 'Product Review', value: 'product-review' },
            { title: 'Tutorial/How-to', value: 'tutorial' },
            { title: 'Comparison Guide', value: 'comparison' },
            { title: 'News/Update', value: 'news' },
            { title: 'Opinion/Analysis', value: 'opinion' },
            { title: 'Resource List', value: 'resource-list' },
          ]
        },
        description: 'Template structure for this article type',
      }),
      defineField({
        name: 'updateFrequency',
        title: 'Update Frequency',
        type: 'string',
        group: 'settings',
        options: {
          list: [
            { title: 'One-time', value: 'once' },
            { title: 'Monthly', value: 'monthly' },
            { title: 'Quarterly', value: 'quarterly' },
            { title: 'Yearly', value: 'yearly' },
            { title: 'As needed', value: 'as-needed' },
          ]
        },
        description: 'How often should this content be reviewed/updated?',
      }),
      defineField({
        name: 'comments',
        title: 'Editorial Comments',
        type: 'array',
        group: 'settings',
        of: [
          {
            type: 'object',
            fields: [
              {
                name: 'comment',
                type: 'text',
                title: 'Comment',
                rows: 3
              },
              {
                name: 'author',
                type: 'string',
                title: 'Author'
              },
              {
                name: 'timestamp',
                type: 'datetime',
                title: 'Date',
                initialValue: () => new Date().toISOString()
              },
              {
                name: 'resolved',
                type: 'boolean',
                title: 'Resolved',
                initialValue: false
              }
            ],
            preview: {
              select: {
                title: 'comment',
                subtitle: 'author',
                resolved: 'resolved'
              },
              prepare(selection) {
                const { title, subtitle, resolved } = selection
                return {
                  title: (resolved ? '✅ ' : '💬 ') + (title || 'Comment'),
                  subtitle: subtitle || 'Anonymous'
                }
              }
            }
          }
        ],
        description: 'Internal comments and feedback',
      }),
      defineField({
        name: 'notes',
        title: 'Internal Notes',
        type: 'text',
        group: 'settings',
        rows: 4,
        description: 'Private notes for content management (not shown on website)',
      }),
    defineField({
      name: 'previewUrl',
      title: '🔗 Preview URL',
      type: 'url',
      group: 'settings',
      description: 'Full URL to preview this article',
      hidden: ({ document }) => document?.status === 'draft',
    }),
  ],
  
  preview: {
    select: {
      title: 'title',
      categoryName: 'category.name',
      status: 'status',
      priority: 'priority',
      publishedAt: 'publishedAt',
      media: 'featuredImage',
      author: 'author.name',
      contentType: 'contentType',
      revenuePotential: 'revenuePotential'
  },
  
    prepare(selection) {
      const { title, categoryName, status, priority, publishedAt, author, contentType, revenuePotential } = selection
      
      // Format the date
      const formatDate = (dateString: string) => {
        if (!dateString) return 'No date'
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', { 
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      }
      
      // Status emojis
      const statusEmoji: { [key: string]: string } = {
        draft: '📝',
        review: '👀',
        published: '✅',
        scheduled: '⏰',
        archived: '🗃️'
      }
      
      // Priority indicators
      const priorityEmoji: { [key: string]: string } = {
        urgent: '🔥',
        high: '⚡',
        normal: '',
        low: '📋',
        backlog: '🗂️'
      }
      
      // Revenue indicators
      const revenueEmoji: { [key: string]: string } = {
        'high-affiliate': '💰',
        'medium-affiliate': '💵',
        'conversion-focused': '🎯',
        'lead-generation': '📊',
        standard: ''
      }
      
      const currentStatus = status || 'draft'
      const currentPriority = priority || 'normal'
      const currentRevenue = revenuePotential || 'standard'
      
      const statusIcon = statusEmoji[currentStatus] || '📝'
      const priorityIcon = priorityEmoji[currentPriority] || ''
      const revenueIcon = revenueEmoji[currentRevenue] || ''
      
      const icons = [statusIcon, priorityIcon, revenueIcon].filter(Boolean).join(' ')
      
      const subtitle = `${categoryName || 'No category'} • ${contentType || 'general'} • ${formatDate(publishedAt)} • ${author || 'No author'}`
      
      return {
        title: `${icons} ${title}`.trim(),
        subtitle: subtitle,
        media: selection.media
      }
    },
  },
  
  orderings: [
    {
      title: 'Editorial Workflow',
      name: 'editorialWorkflow',
      by: [{ field: 'status', direction: 'asc' }, { field: 'priority', direction: 'asc' }, { field: 'publishedAt', direction: 'desc' }]
    },
    {
      title: 'Recent Updates',
      name: 'recentUpdates',
      by: [{ field: '_updatedAt', direction: 'desc' }]
    },
    {
      title: 'Publish Date (Newest)',
      name: 'publishDateDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }]
    },
    {
      title: 'Category & Type',
      name: 'categoryType',
      by: [{ field: 'category', direction: 'asc' }, { field: 'contentType', direction: 'asc' }, { field: 'publishedAt', direction: 'desc' }]
    },
    {
      title: 'Revenue Potential',
      name: 'revenuePotential',
      by: [{ field: 'revenuePotential', direction: 'asc' }, { field: 'publishedAt', direction: 'desc' }]
    },
    {
      title: 'Title A-Z',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }]
    },
    {
      title: 'Author & Date',
      name: 'authorDate',
      by: [{ field: 'author', direction: 'asc' }, { field: 'publishedAt', direction: 'desc' }]
    },
  ],
}) 