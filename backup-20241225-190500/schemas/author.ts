import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
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
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'expertise',
      title: 'Expertise Areas',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'e.g., Machine Learning, Natural Language Processing',
    }),
    defineField({
      name: 'credentials',
      title: 'Credentials',
      type: 'text',
      description: 'Education, certifications, experience for E-E-A-T',
    }),
  ],
})