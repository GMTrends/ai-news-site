/**
 * Sanity CMS Schema for Ads Content Type
 * This schema defines the structure for managing ads through Sanity Studio
 */

import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'ad',
  title: 'Advertisement',
  type: 'document',
  icon: () => '📢',
  fields: [
    defineField({
      name: 'id',
      title: 'Ad ID',
      type: 'string',
      description: 'Unique identifier for this ad (used in code)',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'title',
      title: 'Ad Title',
      type: 'string',
      validation: Rule => Rule.required().max(60)
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required().max(150)
    }),
    defineField({
      name: 'active',
      title: 'Active',
      type: 'boolean',
      description: 'Whether this ad is currently active',
      initialValue: true
    }),
    defineField({
      name: 'priority',
      title: 'Priority',
      type: 'number',
      description: 'Lower numbers = higher priority',
      validation: Rule => Rule.required().min(1).max(100),
      initialValue: 10
    }),
    defineField({
      name: 'type',
      title: 'Ad Type',
      type: 'string',
      options: {
        list: [
          { title: 'Leaderboard (728x90)', value: 'leaderboard' },
          { title: 'Sidebar (300x250)', value: 'sidebar' },
          { title: 'Hero Placement', value: 'hero' },
          { title: 'Inline Content', value: 'inline' },
          { title: 'Banner', value: 'banner' }
        ]
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'placement',
      title: 'Placement Location',
      type: 'string',
      options: {
        list: [
          { title: 'Homepage - After Shortcuts', value: 'homepage-after-shortcuts' },
          { title: 'Hero Sidebar - Top', value: 'hero-sidebar-top' },
          { title: 'Category Sidebar - Top', value: 'category-sidebar-top' },
          { title: 'Category Sidebar - Newsletter', value: 'category-sidebar-newsletter' },
          { title: 'Category Sidebar - Trending', value: 'category-sidebar-trending' },
          { title: 'Article Content - Inline', value: 'article-inline' },
          { title: 'Footer Banner', value: 'footer-banner' }
        ]
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'cta',
      title: 'Call to Action Text',
      type: 'string',
      validation: Rule => Rule.required().max(20)
    }),
    defineField({
      name: 'ctaUrl',
      title: 'CTA URL',
      type: 'url',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'badge',
      title: 'Badge Text',
      type: 'string',
      description: 'Optional badge (e.g., "SPONSORED", "PREMIUM", "FREE")',
      validation: Rule => Rule.max(15)
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Emoji or icon identifier',
      validation: Rule => Rule.max(10)
    }),
    defineField({
      name: 'image',
      title: 'Ad Image',
      type: 'image',
      description: 'Optional image for the ad',
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: 'dimensions',
      title: 'Dimensions',
      type: 'object',
      fields: [
        defineField({
          name: 'width',
          title: 'Width (px)',
          type: 'number',
          validation: Rule => Rule.required().min(100).max(1200)
        }),
        defineField({
          name: 'height',
          title: 'Height (px)',
          type: 'number',
          validation: Rule => Rule.required().min(50).max(600)
        })
      ]
    }),
    defineField({
      name: 'targeting',
      title: 'Targeting Options',
      type: 'object',
      fields: [
        defineField({
          name: 'categories',
          title: 'Target Categories',
          type: 'array',
          of: [{ type: 'string' }],
          options: {
            list: [
              { title: 'Marketing', value: 'marketing' },
              { title: 'Business', value: 'business' },
              { title: 'AI Agents', value: 'ai-agents' },
              { title: 'Productivity', value: 'productivity' },
              { title: 'Creative', value: 'creative' },
              { title: 'eCommerce', value: 'ecommerce' }
            ]
          }
        }),
        defineField({
          name: 'pages',
          title: 'Target Pages',
          type: 'array',
          of: [{ type: 'string' }],
          description: 'Specific pages to show this ad on (e.g., "/", "/marketing")'
        }),
        defineField({
          name: 'excludePages',
          title: 'Exclude Pages',
          type: 'array',
          of: [{ type: 'string' }],
          description: 'Pages to exclude this ad from'
        })
      ]
    }),
    defineField({
      name: 'styling',
      title: 'Styling Options',
      type: 'object',
      fields: [
        defineField({
          name: 'theme',
          title: 'Theme',
          type: 'string',
          options: {
            list: [
              { title: 'Gradient', value: 'gradient' },
              { title: 'Solid', value: 'solid' },
              { title: 'Minimal', value: 'minimal' }
            ]
          },
          initialValue: 'gradient'
        }),
        defineField({
          name: 'colors',
          title: 'Colors',
          type: 'object',
          fields: [
            defineField({
              name: 'primary',
              title: 'Primary Color',
              type: 'string',
              validation: Rule => Rule.regex(/^#[0-9A-Fa-f]{6}$/).error('Must be a valid hex color')
            }),
            defineField({
              name: 'secondary',
              title: 'Secondary Color',
              type: 'string',
              validation: Rule => Rule.regex(/^#[0-9A-Fa-f]{6}$/).error('Must be a valid hex color')
            }),
            defineField({
              name: 'accent',
              title: 'Accent Color',
              type: 'string',
              validation: Rule => Rule.regex(/^#[0-9A-Fa-f]{6}$/).error('Must be a valid hex color')
            })
          ]
        }),
        defineField({
          name: 'animation',
          title: 'Animation',
          type: 'string',
          options: {
            list: [
              { title: 'Wave Effect', value: 'wave' },
              { title: 'Sparkle Effect', value: 'sparkle' },
              { title: 'Glow Effect', value: 'glow' },
              { title: 'None', value: 'none' }
            ]
          },
          initialValue: 'none'
        })
      ]
    }),
    defineField({
      name: 'analytics',
      title: 'Analytics',
      type: 'object',
      fields: [
        defineField({
          name: 'trackingId',
          title: 'Tracking ID',
          type: 'string',
          description: 'Unique ID for analytics tracking'
        }),
        defineField({
          name: 'eventCategory',
          title: 'Event Category',
          type: 'string',
          initialValue: 'ads'
        }),
        defineField({
          name: 'eventAction',
          title: 'Event Action',
          type: 'string',
          initialValue: 'click'
        })
      ]
    }),
    defineField({
      name: 'schedule',
      title: 'Scheduling',
      type: 'object',
      fields: [
        defineField({
          name: 'startDate',
          title: 'Start Date',
          type: 'datetime',
          description: 'When to start showing this ad'
        }),
        defineField({
          name: 'endDate',
          title: 'End Date',
          type: 'datetime',
          description: 'When to stop showing this ad'
        }),
        defineField({
          name: 'timezone',
          title: 'Timezone',
          type: 'string',
          options: {
            list: [
              { title: 'Eastern Time (ET)', value: 'America/New_York' },
              { title: 'Central Time (CT)', value: 'America/Chicago' },
              { title: 'Mountain Time (MT)', value: 'America/Denver' },
              { title: 'Pacific Time (PT)', value: 'America/Los_Angeles' },
              { title: 'UTC', value: 'UTC' }
            ]
          },
          initialValue: 'America/New_York'
        })
      ]
    }),
    defineField({
      name: 'revenue',
      title: 'Revenue Tracking',
      type: 'object',
      fields: [
        defineField({
          name: 'cpm',
          title: 'CPM (Cost Per Mille)',
          type: 'number',
          description: 'Cost per 1000 impressions in USD',
          validation: Rule => Rule.min(0)
        }),
        defineField({
          name: 'estimatedMonthlyRevenue',
          title: 'Estimated Monthly Revenue',
          type: 'number',
          description: 'Expected monthly revenue in USD',
          validation: Rule => Rule.min(0)
        }),
        defineField({
          name: 'adNetwork',
          title: 'Ad Network',
          type: 'string',
          options: {
            list: [
              { title: 'Direct Sales', value: 'direct' },
              { title: 'Affiliate Marketing', value: 'affiliate' },
              { title: 'Native Advertising', value: 'native' },
              { title: 'Google AdSense', value: 'adsense' },
              { title: 'Other', value: 'other' }
            ]
          }
        })
      ]
    }),
    defineField({
      name: 'notes',
      title: 'Internal Notes',
      type: 'text',
      description: 'Internal notes for ad management (not displayed publicly)',
      rows: 3
    })
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'placement',
      active: 'active',
      type: 'type'
    },
    prepare(selection) {
      const { title, subtitle, active, type } = selection
      return {
        title: `${active ? '✅' : '❌'} ${title}`,
        subtitle: `${type} • ${subtitle}`,
        media: () => '📢'
      }
    }
  },
  orderings: [
    {
      title: 'Priority',
      name: 'priorityAsc',
      by: [{ field: 'priority', direction: 'asc' }]
    },
    {
      title: 'Created Date',
      name: 'createdDesc',
      by: [{ field: '_createdAt', direction: 'desc' }]
    },
    {
      title: 'Revenue (High to Low)',
      name: 'revenueDesc',
      by: [{ field: 'revenue.estimatedMonthlyRevenue', direction: 'desc' }]
    }
  ]
})
