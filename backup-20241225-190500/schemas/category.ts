import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'category',
  title: 'Categories',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Category Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'icon',
      title: 'Icon/Emoji',
      type: 'string',
      description: 'Emoji or icon for this category (e.g., 📰, 📊, 💡)',
      initialValue: '📁',
    }),
    defineField({
      name: 'color',
      title: 'Color Theme',
      type: 'string',
      options: {
        list: [
          { title: 'Red (News)', value: 'red' },
          { title: 'Blue (Reviews)', value: 'blue' },
          { title: 'Purple (Tutorials)', value: 'purple' },
          { title: 'Green (Business)', value: 'green' },
          { title: 'Orange (Finance)', value: 'orange' },
          { title: 'Teal (AI Agents)', value: 'teal' },
        ],
      },
      initialValue: 'red',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Category',
      type: 'boolean',
      description: 'Show in main navigation and shortcuts',
      initialValue: false,
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      description: 'Lower numbers appear first (e.g., 1, 2, 3...)',
      initialValue: 1,
    }),
    defineField({
      name: 'metaTitle',
      title: 'SEO Meta Title',
      type: 'string',
      description: 'Custom title for SEO (optional)',
    }),
    defineField({
      name: 'metaDescription',
      title: 'SEO Meta Description',
      type: 'text',
      description: 'Description for search engines (optional)',
      rows: 2,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'description',
      icon: 'icon',
      featured: 'featured',
      sortOrder: 'sortOrder',
    },
    prepare(selection) {
      const { title, subtitle, icon, featured, sortOrder } = selection
      return {
        title: `${icon || '📁'} ${title}${featured ? ' ⭐' : ''}`,
        subtitle: `Order: ${sortOrder || 1} • ${subtitle || 'No description'}`,
      }
    },
  },
  orderings: [
    {
      title: 'Sort Order',
      name: 'sortOrder',
      by: [{ field: 'sortOrder', direction: 'asc' }]
    },
    {
      title: 'Name A-Z',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }]
    },
    {
      title: 'Featured First',
      name: 'featuredFirst',
      by: [{ field: 'featured', direction: 'desc' }, { field: 'sortOrder', direction: 'asc' }]
    },
  ],
})
