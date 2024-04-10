import path from 'path'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': `${ path.resolve(__dirname, 'src/components') }`,
      '@assets': `${ path.resolve(__dirname, 'src/assets') }`,
      '@pages': `${ path.resolve(__dirname, 'src/pages') }`,
      '@hooks': `${ path.resolve(__dirname, 'src/hooks') }`,
      '@utils': `${ path.resolve(__dirname, 'src/utils') }`,
      '@enums': `${ path.resolve(__dirname, 'src/enums') }`,
      '@models': `${ path.resolve(__dirname, 'src/models') }`,
      '@context': `${ path.resolve(__dirname, 'src/context') }`,
      '@constants': `${ path.resolve(__dirname, 'src/constants') }`,
      '@data': `${ path.resolve(__dirname, 'src/data') }`,
    }
  },
  build: {
    minify: 'terser', // here we set up terser instead default esbuild
    terserOptions: { 
     mangle: {
      reserved: ['dc'] // here we set up variable we want to exclude //from naming
     }
    },
    rollupOptions: {
      // some other code
    },
  },
})
