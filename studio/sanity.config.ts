import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'rogn',

  projectId: 'ybgip3si',
  dataset: 'production',
  apiVersion:'2024-02-27',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
