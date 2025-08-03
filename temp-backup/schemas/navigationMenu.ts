import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'navigationMenu',
  title: '🧭 Navigation Menus',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: '📋 Menu Name',
      type: 'string',
      description: 'Internal name for this menu (e.g., "Main Navigation", "Footer Menu")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: '📍 Menu Location',
      type: 'string',
      description: 'Where this menu will appear on your website',
      options: {
        list: [
          { title: '🔝 Header Navigation', value: 'header' },
          { title: '🦶 Footer Navigation', value: 'footer' },
          { title: '📱 Mobile Menu', value: 'mobile' },
          { title: '👀 Sidebar Menu', value: 'sidebar' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'items',
      title: '🔗 Menu Items',
      type: 'array',
      description: 'Add and organize your menu links',
      of: [
        {
          type: 'object',
          name: 'menuItem',
          title: 'Menu Item',
          fields: [
            {
              name: 'label',
              title: '🏷️ Link Text',
              type: 'string',
              description: 'Text that will be displayed for this link',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'linkType',
              title: '🔗 Link Type',
              type: 'string',
              description: 'What type of link is this?',
              options: {
                list: [
                  { title: '📄 Internal Page', value: 'internal' },
                  { title: '🌐 External URL', value: 'external' },
                  { title: '📰 Article', value: 'article' },
                  { title: '📂 Category', value: 'category' },
                ],
                layout: 'radio',
              },
              initialValue: 'internal',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'internalLink',
              title: '📄 Internal Page',
              type: 'string',
              description: 'Choose a page on your website',
              options: {
                list: [
                  { title: '🏠 Home', value: '/' },
                  { title: '📰 All Articles', value: '/articles' },
                  { title: '👥 About Us', value: '/about' },
                  { title: '📞 Contact', value: '/contact' },
                  { title: '🔒 Privacy Policy', value: '/privacy' },
                  { title: '📋 Terms of Service', value: '/terms' },
                ],
              },
              hidden: ({ parent }) => parent?.linkType !== 'internal',
            },
            {
              name: 'externalUrl',
              title: '🌐 External URL',
              type: 'url',
              description: 'Full URL to external website (e.g., https://example.com)',
              hidden: ({ parent }) => parent?.linkType !== 'external',
              validation: (Rule) => 
                Rule.custom((url, context) => {
                  if (context.parent?.linkType === 'external' && !url) {
                    return 'External URL is required when link type is External URL'
                  }
                  return true
                })
            },
            {
              name: 'articleReference',
              title: '📰 Article',
              type: 'reference',
              to: [{ type: 'article' }],
              description: 'Select an article to link to',
              hidden: ({ parent }) => parent?.linkType !== 'article',
            },
            {
              name: 'categoryReference',
              title: '📂 Category',
              type: 'reference',
              to: [{ type: 'category' }],
              description: 'Select a category to link to',
              hidden: ({ parent }) => parent?.linkType !== 'category',
            },
            {
              name: 'openInNewTab',
              title: '🔗 Open in New Tab',
              type: 'boolean',
              description: 'Should this link open in a new browser tab?',
              initialValue: false,
            },
            {
              name: 'description',
              title: '📝 Description (Optional)',
              type: 'string',
              description: 'Optional description for accessibility and tooltips',
            },
            {
              name: 'icon',
              title: '🎨 Icon (Optional)',
              type: 'string',
              description: 'Optional emoji or icon for this menu item',
            },
            {
              name: 'isHighlighted',
              title: '✨ Highlight This Item',
              type: 'boolean',
              description: 'Make this menu item stand out (useful for CTA buttons)',
              initialValue: false,
            },
          ],
          preview: {
            select: {
              title: 'label',
              linkType: 'linkType',
              internalLink: 'internalLink',
              externalUrl: 'externalUrl',
              icon: 'icon',
              isHighlighted: 'isHighlighted',
            },
            prepare(selection) {
              const { title, linkType, internalLink, externalUrl, icon, isHighlighted } = selection
              
              let subtitle = ''
              switch (linkType) {
                case 'internal':
                  subtitle = `📄 ${internalLink || 'Internal page'}`
                  break
                case 'external':
                  subtitle = `🌐 ${externalUrl || 'External URL'}`
                  break
                case 'article':
                  subtitle = '📰 Article link'
                  break
                case 'category':
                  subtitle = '📂 Category link'
                  break
                default:
                  subtitle = linkType || 'Menu item'
              }
              
              if (isHighlighted) subtitle += ' ✨'
              
              return {
                title: `${icon || '🔗'} ${title}`,
                subtitle
              }
            }
          }
        }
      ]
    }),
    defineField({
      name: 'isActive',
      title: '✅ Active Menu',
      type: 'boolean',
      description: 'Is this menu currently active on your website?',
      initialValue: true,
    }),
    defineField({
      name: 'sortOrder',
      title: '🔢 Sort Order',
      type: 'number',
      description: 'Order menus when you have multiple (lower numbers first)',
      initialValue: 1,
    }),
  ],

  preview: {
    select: {
      title: 'title',
      location: 'location',
      isActive: 'isActive',
      itemCount: 'items',
    },
    prepare(selection) {
      const { title, location, isActive, itemCount } = selection
      
      const locationEmojis = {
        header: '🔝',
        footer: '🦶',
        mobile: '📱',
        sidebar: '👀',
      }
      
      const locationEmoji = locationEmojis[location as keyof typeof locationEmojis] || '🧭'
      const count = Array.isArray(itemCount) ? itemCount.length : 0
      const status = isActive ? '✅' : '❌'
      
      return {
        title: `${locationEmoji} ${title}`,
        subtitle: `${location || 'No location'} • ${count} items • ${status}`
      }
    }
  },

  orderings: [
    {
      title: 'Location & Order',
      name: 'locationOrder',
      by: [
        { field: 'location', direction: 'asc' },
        { field: 'sortOrder', direction: 'asc' }
      ]
    },
    {
      title: 'Menu Name',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }]
    },
    {
      title: 'Active First',
      name: 'activeFirst',
      by: [
        { field: 'isActive', direction: 'desc' },
        { field: 'sortOrder', direction: 'asc' }
      ]
    },
  ],
})
