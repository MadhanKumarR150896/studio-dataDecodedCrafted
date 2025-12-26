import {defineType, defineField} from 'sanity'

export const categoryType = defineType({
  name: 'category',
  title: 'Category section',
  type: 'document',
  fields: [
    defineField({
      name: 'tag',
      title: 'Tag',
      description: 'Give a tag for each post which will later help you group them',
      type: 'string',
    }),
  ],
})
