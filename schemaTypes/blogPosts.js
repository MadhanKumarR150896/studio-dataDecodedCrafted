import {defineType, defineField} from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Post Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 150,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Date and Time',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'author',
      title: 'Author Name',
      type: 'string',
    }),
    defineField({
      name: 'tag',
      title: 'Tag',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'context',
      title: 'Post Context',
      type: 'array',
      of: [
        {
          type: 'block',
          options: {
            spellCheck: true,
          },
          styles: [],
          lists: [{title: 'Bullet', value: 'bullet'}],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
            ],
          },
        },
      ],
      validation: (rule) =>
        rule.required().error('The Context field is mandatory. You cannot publish without it.'),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block',
          options: {
            spellCheck: true,
          },
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'H4', value: 'h4'},
            {title: 'Quote', value: 'blockquote'},
          ],
          lists: [
            {title: 'Bullet', value: 'bullet'},
            {title: 'Numbered', value: 'number'},
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
              {title: 'Code', value: 'code'},
            ],
            annotations: [
              {
                name: 'link',
                title: 'External Reference',
                type: 'object',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url',
                  },
                  {
                    title: 'Open in new Tab',
                    name: 'blank',
                    type: 'boolean',
                    initialValue: true,
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          name: 'subImage',
          title: 'Sub Image',
          options: {
            hotspot: true,
          },
          fields: [{name: 'alt', type: 'string', title: 'Alternative Text'}],
        },
        {
          type: 'code',
          name: 'codeblock',
          title: 'Code Block',
          options: {
            language: 'python',
            withFileName: true,
            lineNumbers: true,
            languageAlternatives: [
              {title: 'Python', value: 'python'},
              {title: 'SQL', value: 'sql'},
              {title: 'Scala', value: 'scala'},
              {title: 'R', value: 'r'},
            ],
          },
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      date: 'publishedAt',
      tag: 'tag',
    },
    prepare(selection) {
      const {title, date, tag} = selection

      return {
        title: title,
        subtitle: `Tag: ${tag ? tag : 'No Tag'} - Date: ${date ? date.split('T')[0] : 'No date'}`,
      }
    },
  },
})
