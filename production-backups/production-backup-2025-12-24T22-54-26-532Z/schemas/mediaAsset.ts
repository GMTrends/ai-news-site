import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'mediaAsset',
  title: '📂 Media Library',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: '🏷️ Asset Title',
      type: 'string',
      description: 'Descriptive name for this media file',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'file',
      title: '📁 File',
      type: 'file',
      description: 'Upload your media file',
      validation: (Rule) => Rule.required(),
      options: {
        accept: '.jpg,.jpeg,.png,.gif,.svg,.webp,.pdf,.doc,.docx,.mp4,.mov,.avi,.mp3,.wav'
      }
    }),
    defineField({
      name: 'altText',
      title: '♿ Alt Text',
      type: 'string',
      description: 'Describe this media for accessibility and SEO',
      validation: (Rule) => Rule.max(100).warning('Keep alt text concise (under 100 characters)'),
    }),
    defineField({
      name: 'caption',
      title: '📝 Caption',
      type: 'text',
      rows: 2,
      description: 'Optional caption to display with this media',
    }),
    defineField({
      name: 'category',
      title: '📂 Media Category',
      type: 'string',
      description: 'Organize your media files',
      options: {
        list: [
          { title: '📷 Images', value: 'images' },
          { title: '🎥 Videos', value: 'videos' },
          { title: '📄 Documents', value: 'documents' },
          { title: '🎵 Audio', value: 'audio' },
          { title: '🎨 Graphics', value: 'graphics' },
          { title: '📊 Charts & Infographics', value: 'charts' },
          { title: '👥 Team Photos', value: 'team' },
          { title: '🏢 Brand Assets', value: 'brand' },
          { title: '📱 Social Media', value: 'social' },
        ],
      },
      initialValue: 'images',
    }),
    defineField({
      name: 'tags',
      title: '🏷️ Tags',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Add tags to help find this media later',
      options: {
        list: [
          { title: 'AI Tools', value: 'ai-tools' },
          { title: 'Technology', value: 'technology' },
          { title: 'Business', value: 'business' },
          { title: 'Marketing', value: 'marketing' },
          { title: 'Tutorial', value: 'tutorial' },
          { title: 'News', value: 'news' },
          { title: 'Review', value: 'review' },
          { title: 'Featured', value: 'featured' },
          { title: 'Homepage', value: 'homepage' },
          { title: 'Blog', value: 'blog' },
        ]
      }
    }),
    defineField({
      name: 'usage',
      title: '📋 Usage Notes',
      type: 'text',
      rows: 2,
      description: 'Note where and how this media is being used',
    }),
    defineField({
      name: 'copyright',
      title: '©️ Copyright Info',
      type: 'object',
      description: 'Copyright and attribution information',
      fields: [
        {
          name: 'owner',
          title: 'Copyright Owner',
          type: 'string',
          description: 'Who owns this media?'
        },
        {
          name: 'license',
          title: 'License Type',
          type: 'string',
          options: {
            list: [
              { title: 'Original Content', value: 'original' },
              { title: 'Stock Photo (Licensed)', value: 'stock-licensed' },
              { title: 'Creative Commons', value: 'creative-commons' },
              { title: 'Public Domain', value: 'public-domain' },
              { title: 'Fair Use', value: 'fair-use' },
            ]
          },
          initialValue: 'original'
        },
        {
          name: 'attribution',
          title: 'Attribution Required',
          type: 'string',
          description: 'How to credit this media (if required)'
        },
        {
          name: 'source',
          title: 'Source URL',
          type: 'url',
          description: 'Where did this media come from?'
        }
      ]
    }),
    defineField({
      name: 'seo',
      title: '🔍 SEO Settings',
      type: 'object',
      description: 'Search engine optimization settings',
      fields: [
        {
          name: 'filename',
          title: 'SEO Filename',
          type: 'string',
          description: 'SEO-friendly filename (will be auto-generated if empty)'
        },
        {
          name: 'keywords',
          title: 'Keywords',
          type: 'array',
          of: [{ type: 'string' }],
          description: 'Keywords related to this media'
        }
      ]
    }),
    defineField({
      name: 'featured',
      title: '⭐ Featured Media',
      type: 'boolean',
      description: 'Mark as featured media for easy access',
      initialValue: false,
    }),
  ],

  preview: {
    select: {
      title: 'title',
      category: 'category',
      featured: 'featured',
      media: 'file',
      altText: 'altText',
    },
    prepare(selection) {
      const { title, category, featured, altText } = selection
      
      const categoryEmojis = {
        images: '📷',
        videos: '🎥',
        documents: '📄',
        audio: '🎵',
        graphics: '🎨',
        charts: '📊',
        team: '👥',
        brand: '🏢',
        social: '📱',
      }
      
      const categoryEmoji = categoryEmojis[category as keyof typeof categoryEmojis] || '📁'
      const featuredIcon = featured ? ' ⭐' : ''
      
      return {
        title: `${categoryEmoji} ${title}${featuredIcon}`,
        subtitle: `${category || 'Uncategorized'} • ${altText || 'No alt text'}`,
        media: selection.media
      }
    }
  },

  orderings: [
    {
      title: 'Featured First',
      name: 'featuredFirst',
      by: [
        { field: 'featured', direction: 'desc' },
        { field: '_createdAt', direction: 'desc' }
      ]
    },
    {
      title: 'Category',
      name: 'category',
      by: [
        { field: 'category', direction: 'asc' },
        { field: 'title', direction: 'asc' }
      ]
    },
    {
      title: 'Newest First',
      name: 'newest',
      by: [{ field: '_createdAt', direction: 'desc' }]
    },
    {
      title: 'Title A-Z',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }]
    },
  ],
})
