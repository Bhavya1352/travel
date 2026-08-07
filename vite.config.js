import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig(({ mode }) => ({
  plugins: [
    react({
      // React optimizations without external babel plugin
      babel: {
        plugins: []
      }
    }), 
    tailwindcss(),
    // Bundle analyzer plugin
    mode === 'analyze' && visualizer({
      filename: 'dist/stats.html',
      open: true,
      gzipSize: true,
    }),
  ].filter(Boolean),
  
  build: {
    // Enable aggressive minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.warn'],
        unused: true,
        dead_code: true,
        // Aggressive optimizations
        passes: 2,
        unsafe: true,
        unsafe_comps: true,
        unsafe_math: true,
        hoist_funs: true,
        hoist_vars: true,
      },
      mangle: {
        safari10: true,
        toplevel: true,
      },
      format: {
        comments: false,
      },
    },
    
    // More aggressive code splitting
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Vendor splitting
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
              return 'react-vendor';
            }
            if (id.includes('framer-motion') || id.includes('motion')) {
              return 'animation-vendor';
            }
            if (id.includes('@tanstack/react-query')) {
              return 'query-vendor';
            }
            if (id.includes('lucide-react')) {
              return 'icons-vendor';
            }
            return 'vendor';
          }
          
          // Component splitting for better caching
          if (id.includes('src/components')) {
            return 'components';
          }
          if (id.includes('src/pages')) {
            return 'pages';
          }
          if (id.includes('src/data')) {
            return 'data';
          }
        },
        // Smaller chunk names
        chunkFileNames: 'assets/[hash].js',
        entryFileNames: 'assets/[hash].js',
        assetFileNames: 'assets/[hash].[ext]',
      },
    },
    
    // Stricter chunk size limits
    chunkSizeWarningLimit: 500,
    
    // Disable sourcemaps for smaller bundles
    sourcemap: false,
    
    // Optimize CSS aggressively
    cssCodeSplit: true,
    cssMinify: 'esbuild',
    
    // Target very modern browsers for smallest bundles
    target: ['es2022', 'chrome90', 'firefox88', 'safari14'],
    
    // Smaller asset inline limit
    assetsInlineLimit: 2048,
    
    // Report compressed sizes
    reportCompressedSize: true,
  },
  
  // Aggressive dependency optimization
  optimizeDeps: {
    include: [
      'react/jsx-runtime',
      'react', 
      'react-dom', 
      'react-router-dom', 
      'framer-motion',
      '@tanstack/react-query',
    ],
    exclude: ['@vite/client', '@vite/env'],
    esbuildOptions: {
      // Optimize dependencies
      drop: ['console', 'debugger'],
      minify: true,
      treeShaking: true,
    },
  },
  
  // Server configuration for development
  server: {
    port: 3000,
    open: true,
  },
  
  // Production-specific optimizations
  esbuild: {
    // Aggressive dropping in production
    drop: mode === 'production' ? ['console', 'debugger'] : [],
    // Minify identifiers
    minifyIdentifiers: mode === 'production',
    minifySyntax: mode === 'production',
    minifyWhitespace: mode === 'production',
  },
  
  // CSS optimization
  css: {
    devSourcemap: false,
  },
}))
