import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'faq',
  title: '❓ FAQs',
  type: 'document',
  fields: [
    defineField({
      name: 'question',
      title: '❓ Question',
      type: 'string',
      description: 'The frequently asked question',
      validation: (Rule) => Rule.required().max(200).warning('Keep questions under 200 characters'),
    }),
    defineField({
      name: 'answer',
      title: '💬 Answer',
      type: 'array',
      description: 'The answer to this question',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H4', value: 'h4' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Code', value: 'code' }
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
        }
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: '📂 FAQ Category',
      type: 'string',
      description: 'Group related questions together',
      options: {
        list: [
          { title: '🚀 Getting Started', value: 'getting-started' },
          { title: '👤 Account & Billing', value: 'account-billing' },
          { title: '🛠️ Technical Support', value: 'technical' },
          { title: '📰 Content & Articles', value: 'content' },
          { title: '🤖 AI Tools', value: 'ai-tools' },
          { title: '📊 Analytics & Reporting', value: 'analytics' },
          { title: '🔒 Privacy & Security', value: 'privacy' },
          { title: '💼 Business Features', value: 'business' },
          { title: '📱 Mobile & Apps', value: 'mobile' },
          { title: '🎓 Learning & Tutorials', value: 'learning' },
        ]
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'priority',
      title: '📊 Priority',
      type: 'string',
      description: 'How important is this FAQ?',
      options: {
        list: [
          { title: '🔥 High Priority', value: 'high' },
          { title: '📝 Medium Priority', value: 'medium' },
          { title: '📋 Low Priority', value: 'low' },
        ],
        layout: 'radio',
      },
      initialValue: 'medium',
    }),
    defineField({
      name: 'tags',
      title: '🏷️ Tags',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Add tags to help users find this FAQ',
      options: {
        list: [
          { title: 'Beginner', value: 'beginner' },
          { title: 'Advanced', value: 'advanced' },
          { title: 'Troubleshooting', value: 'troubleshooting' },
          { title: 'Setup', value: 'setup' },
          { title: 'API', value: 'api' },
          { title: 'Integration', value: 'integration' },
          { title: 'Pricing', value: 'pricing' },
          { title: 'Features', value: 'features' },
        ]
      }
    }),
    defineField({
      name: 'relatedArticles',
      title: '📰 Related Articles',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'article' }]
        }
      ],
      description: 'Link to helpful articles related to this FAQ',
    }),
    defineField({
      name: 'isPublished',
      title: '✅ Published',
      type: 'boolean',
      description: 'Should this FAQ be visible on your website?',
      initialValue: true,
    }),
    defineField({
      name: 'sortOrder',
      title: '🔢 Sort Order',
      type: 'number',
      description: 'Order within category (lower numbers appear first)',
      initialValue: 1,
    }),
    defineField({
      name: 'lastUpdated',
      title: '📅 Last Updated',
      type: 'datetime',
      description: 'When was this FAQ last reviewed?',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'helpfulnessScore',
      title: '👍 Helpfulness Score',
      type: 'number',
      description: 'User rating of how helpful this FAQ is (1-5)',
      validation: (Rule) => Rule.min(1).max(5),
    }),
  ],

  preview: {
    select: {
      title: 'question',
      category: 'category',
      priority: 'priority',
      isPublished: 'isPublished',
    },
    prepare(selection) {
      const { title, category, priority, isPublished } = selection
      
      const priorityEmojis = {
        high: '🔥',
        medium: '📝',
        low: '📋',
      }
      
      const categoryEmojis = {
        'getting-started': '🚀',
        'account-billing': '👤',
        'technical': '🛠️',
        'content': '📰',
        'ai-tools': '🤖',
        'analytics': '📊',
        'privacy': '🔒',
        'business': '💼',
        'mobile': '📱',
        'learning': '🎓',
      }
      
      const priorityEmoji = priorityEmojis[priority as keyof typeof priorityEmojis] || '📝'
      const categoryEmoji = categoryEmojis[category as keyof typeof categoryEmojis] || '❓'
      const statusEmoji = isPublished ? '✅' : '❌'
      
      return {
        title: `${priorityEmoji} ${title}`,
        subtitle: `${categoryEmoji} ${category || 'Uncategorized'} ${statusEmoji}`
      }
    }
  },

  orderings: [
    {
      title: 'Category & Priority',
      name: 'categoryPriority',
      by: [
        { field: 'category', direction: 'asc' },
        { field: 'priority', direction: 'asc' },
        { field: 'sortOrder', direction: 'asc' }
      ]
    },
    {
      title: 'Priority & Helpfulness',
      name: 'priorityHelpfulness',
      by: [
        { field: 'priority', direction: 'asc' },
        { field: 'helpfulnessScore', direction: 'desc' }
      ]
    },
    {
      title: 'Recently Updated',
      name: 'recentlyUpdated',
      by: [{ field: 'lastUpdated', direction: 'desc' }]
    },
    {
      title: 'Published First',
      name: 'publishedFirst',
      by: [
        { field: 'isPublished', direction: 'desc' },
        { field: 'sortOrder', direction: 'asc' }
      ]
    },
  ],
})
