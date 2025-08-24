import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: '⚙️ Site Settings',
  type: 'document',
  __experimental_actions: [
    // Remove duplicate and delete actions since there should only be one settings document
    'update',
    'publish'
  ],
  fields: [
    // BASIC SITE INFO
    defineField({
      name: 'siteName',
      title: '🏢 Site Name',
      type: 'string',
      description: 'The name of your website (e.g., AI Buzz Media)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: '📝 Site Tagline',
      type: 'string',
      description: 'Short description that appears in search results',
      validation: (Rule) => Rule.max(160).warning('Keep taglines under 160 characters for better SEO'),
    }),
    defineField({
      name: 'description',
      title: '📄 Site Description',
      type: 'text',
      rows: 3,
      description: 'Longer description for About pages and SEO',
    }),
    defineField({
      name: 'siteUrl',
      title: '🌐 Site URL',
      type: 'url',
      description: 'Your website URL (e.g., https://aibuzzmedia.com)',
      validation: (Rule) => Rule.required(),
    }),

    // BRANDING
    defineField({
      name: 'logo',
      title: '🎨 Site Logo',
      type: 'image',
      description: 'Main logo for your site header',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          description: 'Important for accessibility'
        }
      ]
    }),
    defineField({
      name: 'favicon',
      title: '🔖 Favicon',
      type: 'image',
      description: 'Small icon that appears in browser tabs (32x32px recommended)',
      options: {
        accept: '.ico,.png'
      }
    }),
    defineField({
      name: 'brandColors',
      title: '🎨 Brand Colors',
      type: 'object',
      description: 'Your brand color palette',
      fields: [
        {
          name: 'primary',
          title: 'Primary Color',
          type: 'string',
          description: 'Main brand color (hex code)',
          validation: (Rule) => Rule.regex(/^#[0-9A-F]{6}$/i).error('Please enter a valid hex color (e.g., #FF6B35)')
        },
        {
          name: 'secondary',
          title: 'Secondary Color',
          type: 'string',
          description: 'Secondary brand color (hex code)',
          validation: (Rule) => Rule.regex(/^#[0-9A-F]{6}$/i).error('Please enter a valid hex color (e.g., #FF6B35)')
        }
      ]
    }),

    // CONTACT & SOCIAL
    defineField({
      name: 'contactInfo',
      title: '📞 Contact Information',
      type: 'object',
      fields: [
        {
          name: 'email',
          title: 'Email',
          type: 'email',
          description: 'Main contact email'
        },
        {
          name: 'phone',
          title: 'Phone',
          type: 'string',
          description: 'Contact phone number'
        },
        {
          name: 'address',
          title: 'Address',
          type: 'text',
          rows: 2,
          description: 'Business address'
        }
      ]
    }),
    defineField({
      name: 'socialMedia',
      title: '📱 Social Media Links',
      type: 'object',
      description: 'Your social media profiles',
      fields: [
        {
          name: 'twitter',
          title: 'Twitter/X',
          type: 'url',
          description: 'Your Twitter/X profile URL'
        },
        {
          name: 'facebook',
          title: 'Facebook',
          type: 'url',
          description: 'Your Facebook page URL'
        },
        {
          name: 'linkedin',
          title: 'LinkedIn',
          type: 'url',
          description: 'Your LinkedIn profile URL'
        },
        {
          name: 'instagram',
          title: 'Instagram',
          type: 'url',
          description: 'Your Instagram profile URL'
        },
        {
          name: 'youtube',
          title: 'YouTube',
          type: 'url',
          description: 'Your YouTube channel URL'
        },
        {
          name: 'github',
          title: 'GitHub',
          type: 'url',
          description: 'Your GitHub profile URL'
        }
      ]
    }),

    // SEO & ANALYTICS
    defineField({
      name: 'seo',
      title: '🔍 SEO Settings',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          title: 'Default Meta Title',
          type: 'string',
          description: 'Default title for pages without custom titles',
          validation: (Rule) => Rule.max(60).warning('Keep titles under 60 characters for better SEO')
        },
        {
          name: 'metaDescription',
          title: 'Default Meta Description',
          type: 'text',
          rows: 2,
          description: 'Default description for search engines',
          validation: (Rule) => Rule.max(160).warning('Keep descriptions under 160 characters for better SEO')
        },
        {
          name: 'openGraphImage',
          title: 'Default Open Graph Image',
          type: 'image',
          description: 'Default image for social media sharing (1200x630px recommended)',
          options: {
            hotspot: true,
          }
        }
      ]
    }),
    defineField({
      name: 'analytics',
      title: '📊 Analytics & Tracking',
      type: 'object',
      fields: [
        {
          name: 'googleAnalyticsId',
          title: 'Google Analytics ID',
          type: 'string',
          description: 'Your GA4 Measurement ID (e.g., G-XXXXXXXXXX)',
          validation: (Rule) => Rule.regex(/^G-[A-Z0-9]+$/).error('Please enter a valid GA4 ID (e.g., G-XXXXXXXXXX)')
        },
        {
          name: 'googleTagManagerId',
          title: 'Google Tag Manager ID',
          type: 'string',
          description: 'Your GTM Container ID (e.g., GTM-XXXXXXX)',
          validation: (Rule) => Rule.regex(/^GTM-[A-Z0-9]+$/).error('Please enter a valid GTM ID (e.g., GTM-XXXXXXX)')
        },
        {
          name: 'facebookPixelId',
          title: 'Facebook Pixel ID',
          type: 'string',
          description: 'Your Facebook Pixel ID for tracking'
        }
      ]
    }),

    // FOOTER CONTENT
    defineField({
      name: 'footer',
      title: '🦶 Footer Settings',
      type: 'object',
      fields: [
        {
          name: 'copyrightText',
          title: 'Copyright Text',
          type: 'string',
          description: 'Copyright notice (year will be auto-added)',
          initialValue: 'All rights reserved.'
        },
        {
          name: 'footerText',
          title: 'Footer Description',
          type: 'text',
          rows: 2,
          description: 'Additional text in footer'
        },
        {
          name: 'showSocialLinks',
          title: 'Show Social Links in Footer',
          type: 'boolean',
          description: 'Display social media links in footer',
          initialValue: true
        }
      ]
    }),

    // NEWSLETTER & LEAD CAPTURE
    defineField({
      name: 'newsletter',
      title: '📧 Newsletter Settings',
      type: 'object',
      fields: [
        {
          name: 'enabled',
          title: 'Enable Newsletter Signup',
          type: 'boolean',
          description: 'Show newsletter signup forms',
          initialValue: true
        },
        {
          name: 'title',
          title: 'Newsletter Title',
          type: 'string',
          description: 'Heading for newsletter signup',
          initialValue: 'Stay Updated with AI News'
        },
        {
          name: 'description',
          title: 'Newsletter Description',
          type: 'text',
          rows: 2,
          description: 'Description text for newsletter signup',
          initialValue: 'Get the latest AI news and insights delivered to your inbox.'
        },
        {
          name: 'buttonText',
          title: 'Button Text',
          type: 'string',
          description: 'Text for subscribe button',
          initialValue: 'Subscribe Now'
        }
      ]
    }),
  ],

  preview: {
    select: {
      title: 'siteName',
      subtitle: 'tagline',
      media: 'logo'
    },
    prepare(selection) {
      const { title, subtitle } = selection
      return {
        title: `⚙️ ${title || 'Site Settings'}`,
        subtitle: subtitle || 'Configure your website settings'
      }
    }
  }
})
