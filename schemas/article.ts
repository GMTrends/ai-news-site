import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Draft', value: 'draft' },
          { title: 'Published', value: 'published' },
          { title: 'Scheduled', value: 'scheduled' },
        ],
        layout: 'radio',
      },
      initialValue: 'draft',
      validation: (Rule) => Rule.required(),
    }),
    // Added category reference to article (adds dynamic categories to the admin page)
    defineField({
        name: 'category',
        title: 'Category',
        type: 'reference',
        to: [{ type: 'category' }],
        validation: (Rule) => Rule.required(),
        options: {
          filter: 'featured == true',
          // This ensures only featured categories appear in the dropdown
      },
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
    }),
    defineField({
        name: 'content',
        title: 'Content',
        type: 'array',
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
                {title: 'Code', value: 'code'}
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
                    }
                  ]
                }
              ]
            }
          },
          // Image block
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
                description: 'Important for SEO and accessibility'
              },
              {
                name: 'caption',
                type: 'string',
                title: 'Caption'
              }
            ]
          },
          // Custom Quote Block
          {
            name: 'customQuote',
            type: 'object',
            title: 'Quote Block',
            fields: [
              {
                name: 'text',
                type: 'text',
                title: 'Quote Text',
                rows: 3
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
              }
            ],
            preview: {
              select: {
                title: 'text',
                subtitle: 'author'
              }
            }
          },
          // Video Embed
          {
            name: 'videoEmbed',
            type: 'object',
            title: 'Video',
            fields: [
              {
                name: 'url',
                type: 'url',
                title: 'Video URL',
                description: 'YouTube, Vimeo, or direct video URL'
              },
              {
                name: 'caption',
                type: 'string',
                title: 'Video Caption'
              }
            ],
            preview: {
              select: {
                title: 'url'
              }
            }
          },
          // Call-to-Action Block
          {
            name: 'callToAction',
            type: 'object',
            title: 'Call to Action',
            fields: [
              {
                name: 'title',
                type: 'string',
                title: 'CTA Title'
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
                title: 'Button Text'
              },
              {
                name: 'buttonUrl',
                type: 'url',
                title: 'Button URL'
              }
            ]
          },
          // HTML Block
          {
            name: 'htmlBlock',
            type: 'object',
            title: 'HTML',
            fields: [
              {
                name: 'html',
                type: 'text',
                title: 'HTML Code',
                description: 'Enter raw HTML code (use with caution)',
                rows: 6,
                validation: (Rule) => Rule.required()
              },
              {
                name: 'description',
                type: 'string',
                title: 'Description',
                description: 'Brief description of what this HTML does (for reference)'
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
      
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Publish Date & Time',
      type: 'datetime',
      description: 'Schedule publication time in Eastern Time (Florida). Uses 24-hour format: 14:30 = 2:30 PM, 09:15 = 9:15 AM',
      initialValue: () => new Date().toISOString(),
      options: {
        timeStep: 15, // 15-minute intervals in the time picker
      }
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
      description: 'Select the article author',
    }),
    // HERO PLACEMENT FIELD
    defineField({
      name: 'heroPlacement',
      title: 'Hero Placement',
      type: 'string',
      options: {
        list: [
          { title: 'Large Card', value: 'large' },
          { title: 'Small Cards', value: 'small' },
          { title: 'Not Featured', value: 'none' },
        ],
        layout: 'radio',
      },
      initialValue: 'none',
      description: 'Controls if and how this article appears in the homepage hero section.'
    }),

    // REVENUE POTENTIAL FIELD
    defineField({
      name: 'revenuePotential',
      title: 'Revenue Potential',
      type: 'string',
      options: {
        list: [
          { title: 'High Affiliate (5+ links)', value: 'high-affiliate' },
          { title: 'Medium Affiliate (2-4 links)', value: 'medium-affiliate' },
          { title: 'Conversion Focused', value: 'conversion-focused' },
          { title: 'Standard', value: 'standard' },
        ],
        layout: 'radio',
      },
      initialValue: 'standard',
      description: 'Indicate the revenue/affiliate potential of this article.'
    }),

    // CONTENT TYPE FIELD
    defineField({
      name: 'contentType',
      title: 'Content Type',
      type: 'string',
      options: {
        list: [
          { title: 'Tool Review', value: 'tool-review' },
          { title: 'Tool Comparison', value: 'comparison' },
          { title: 'Tutorial/Guide', value: 'tutorial' },
          { title: 'Breaking News', value: 'breaking-news' },
          { title: 'General Article', value: 'general' },
        ],
      },
      initialValue: 'general',
      description: 'What type of content is this article?'
    }),
    defineField({
        name: 'priority',
        title: 'Priority',
        type: 'string',
        options: {
          list: [
            { title: '🔥 High Priority', value: 'high' },
            { title: '📝 Normal', value: 'normal' },
            { title: '📋 Low Priority', value: 'low' },
          ],
          layout: 'radio',
        },
        initialValue: 'normal',
      }),
      
      defineField({
        name: 'seoScore',
        title: 'SEO Score',
        type: 'number',
        description: 'Rate the SEO optimization (1-10)',
        validation: (Rule) => Rule.min(1).max(10),
      }),
      
      defineField({
        name: 'notes',
        title: 'Internal Notes',
        type: 'text',
        description: 'Private notes for content management (not shown on website)',
      }),
    defineField({
      name: 'previewUrl',
      title: '🔗 Preview URL',
      type: 'url',
      description: 'Enter the full URL to preview this article (e.g., http://localhost:4321/news/article-slug)',
      hidden: ({ document }) => document?.status !== 'published',
    }),
  ],
  
  preview: {
    select: {
      title: 'title',
      categoryName: 'category.name',
      status: 'status',
      publishedAt: 'publishedAt',
      media: 'featuredImage',
      author: 'author.name',
      slug: 'slug.current',
      category: 'category.slug.current'
  },
  
    prepare(selection) {
      const { title, categoryName, status, publishedAt, author, slug, category } = selection
      
      // Format the date
      const formatDate = (dateString: string) => {
        if (!dateString) return 'No date'
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', { 
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      }
      
      // Status emojis
      const statusEmoji: { [key: string]: string } = {
        draft: '📝',
        published: '✅',
        scheduled: '⏰'
      }
      
      const currentStatus = status || 'draft'
      const emoji = statusEmoji[currentStatus] || '📝'
      
      const baseSubtitle = `${categoryName || 'No category'} • ${currentStatus} • ${formatDate(publishedAt)} • By ${author || 'No author'}`
      
      return {
        title: `${emoji} ${title}`,
        subtitle: baseSubtitle,
        media: selection.media
      }
    },
  },
  
  
  orderings: [
    {
      title: 'Status & Priority',
      name: 'statusPriority',
      by: [{ field: 'status', direction: 'asc' }, { field: 'priority', direction: 'asc' }, { field: 'publishedAt', direction: 'desc' }]
    },
    {
      title: 'Publish Date, New',
      name: 'publishDateDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }]
    },
    {
      title: 'Category, then Date',
      name: 'categoryDate',
      by: [{ field: 'category', direction: 'asc' }, { field: 'publishedAt', direction: 'desc' }]
    },
    {
      title: 'Title A-Z',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }]
    },
    {
      title: 'SEO Score (High to Low)',
      name: 'seoScore',
      by: [{ field: 'seoScore', direction: 'desc' }]
    },
  ],
}) 