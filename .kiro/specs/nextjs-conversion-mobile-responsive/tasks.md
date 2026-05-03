# Implementation Plan: Next.js Conversion with Mobile Responsiveness

## Overview

This implementation plan converts the Care & Cure Homoeopathic Clinic static HTML website (2381 lines) into a modern Next.js 14+ application with App Router. The conversion follows a component-based architecture with mobile-first responsive design, enhanced touch interactions, and performance optimizations while preserving all existing features and visual design.

The implementation will be done incrementally, building from foundational setup through component creation, feature implementation, and testing. Each task builds on previous work to ensure continuous integration and validation.

## Tasks

- [x] 1. Initialize Next.js project and configure foundational setup
  - Create Next.js 14+ project with App Router and TypeScript
  - Configure next.config.js for image optimization (external domains: i.ibb.co)
  - Set up font optimization using next/font for Lato and Playfair Display
  - Create root layout with metadata (title, description, theme-color)
  - Set up CSS custom properties and global styles
  - Configure TypeScript with strict mode
  - _Requirements: 1.2, 21.1, 21.2, 21.3, 21.4, 22.1_

- [x] 2. Create core layout components and navigation
  - [x] 2.1 Implement Header component with sticky navigation
    - Create Header client component with brand logo and navigation links
    - Implement useScrollDetection hook for scroll state (threshold: 10px)
    - Add 'is-scrolled' class when scroll position exceeds threshold
    - Include skip-to-content link for accessibility
    - _Requirements: 1.3, 3.1, 3.2, 3.5, 1.6_

  - [ ]* 2.2 Write property test for Header scroll detection
    - **Property 7: Scroll Behavior**
    - **Validates: Requirements 3.5**

  - [x] 2.3 Implement mobile menu functionality
    - Create useMobileMenu hook with toggle, close functions
    - Handle menu open/close state with aria-expanded attribute
    - Prevent body scroll when menu is open
    - Close menu on navigation link click, outside click, and Escape key
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7_

  - [ ]* 2.4 Write property tests for mobile menu behavior
    - **Property 4: Mobile Menu Toggle Consistency**
    - **Property 5: Menu State Invariants**
    - **Property 6: Navigation Link Closes Menu**
    - **Validates: Requirements 4.2, 4.3, 4.4, 4.7_

  - [x] 2.5 Implement smooth scroll navigation
    - Create handleSmoothScroll function accounting for sticky header height
    - Wire navigation links to scroll to target sections
    - Close mobile menu after navigation
    - _Requirements: 3.3, 3.4_

  - [ ]* 2.6 Write property test for navigation scroll behavior
    - **Property 3: Navigation Link Scroll Behavior**
    - **Validates: Requirements 3.3, 3.4**

  - [x] 2.7 Implement Footer component
    - Create Footer server component with navigation links and credentials
    - Display doctor registration info and copyright notice
    - Support smooth scrolling to anchor sections
    - _Requirements: 1.1_

- [x] 3. Checkpoint - Verify navigation and layout
  - Ensure all tests pass, ask the user if questions arise.

- [x] 4. Implement Hero section with responsive layout
  - [x] 4.1 Create Hero section component
    - Build Hero section with gradient background and Next.js Image for background
    - Display heading, description, and CTA buttons
    - Create hero card with clinic highlights
    - Add floating badge with doctor credentials
    - Include decorative SVG leaf accents
    - Implement two-column grid for desktop (≥980px), single-column for mobile
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7_

  - [ ]* 4.2 Write unit tests for Hero section
    - Test responsive layout rendering at different breakpoints
    - Verify CTA button functionality
    - Test image optimization
    - _Requirements: 5.1, 5.2, 5.6, 5.7_

- [x] 5. Implement About section with doctor profile
  - [x] 5.1 Create About section component
    - Display doctor photo using Next.js Image with decorative frame
    - Show credentials as tag badges
    - Render statistics cards in responsive grid (3 columns ≥760px, 1 column <760px)
    - Optimize doctor photo for different viewport sizes
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7_

  - [ ]* 5.2 Write unit tests for About section
    - Test responsive grid layout at different breakpoints
    - Verify image optimization
    - Test credential badge rendering
    - _Requirements: 6.4, 6.5, 6.7_

- [x] 6. Implement Treatments section with accordion
  - [x] 6.1 Create treatment cards component
    - Display treatment category cards in responsive grid
    - Implement two-column grid for ≥760px, single-column for <760px
    - Show treatment icons, titles, descriptions, and conditions
    - _Requirements: 7.1, 7.9, 7.10_

  - [x] 6.2 Create Accordion component
    - Build reusable Accordion component with AccordionItem interface
    - Implement useAccordion hook for state management
    - Support single-item-open behavior (at most one open at a time)
    - Update aria-expanded attributes to reflect item state
    - Handle keyboard navigation (Enter, Space keys)
    - Display condition symptoms as styled tags
    - _Requirements: 7.2, 7.3, 7.4, 7.5, 7.6, 7.7, 7.8_

  - [ ]* 6.3 Write property tests for Accordion behavior
    - **Property 7: Accordion Single-Open Invariant**
    - **Property 8: Accordion Item Toggle**
    - **Property 9: Accordion ARIA Consistency**
    - **Property 10: Accordion Keyboard Navigation**
    - **Validates: Requirements 7.3, 7.4, 7.5, 7.6, 7.7**

  - [ ]* 6.4 Write unit tests for treatment cards
    - Test responsive grid layout
    - Verify treatment data rendering
    - Test icon and condition list display
    - _Requirements: 7.1, 7.9, 7.10_

- [x] 7. Checkpoint - Verify content sections
  - Ensure all tests pass, ask the user if questions arise.

- [x] 8. Implement Gallery section with lightbox
  - [x] 8.1 Create Gallery component
    - Display images in masonry-style grid (1/2/3 columns based on viewport)
    - Use Next.js Image component with lazy loading
    - Implement responsive columns: 1 column <520px, 2 columns 520-979px, 3 columns ≥980px
    - Add alt text for all images
    - Display captions on hover for desktop, permanently for touch devices
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 8.7, 8.8, 8.9_

  - [ ]* 8.2 Write property tests for Gallery images
    - **Property 11: Gallery Image Opens Lightbox**
    - **Property 12: Gallery Image Alt Text**
    - **Property 22: Image Component Usage**
    - **Property 23: Below-Fold Image Lazy Loading**
    - **Validates: Requirements 8.6, 8.7, 14.1, 14.2**

  - [x] 8.3 Create Lightbox component
    - Build Lightbox component with useLightbox hook
    - Display full-size image with caption
    - Prevent body scrolling when lightbox is open
    - Close on close button click, Escape key, or backdrop click
    - Use appropriate ARIA attributes for dialog accessibility
    - Restore body scrolling when lightbox closes
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6, 9.7, 9.8_

  - [ ]* 8.4 Write property tests for Lightbox behavior
    - **Property 13: Lightbox State Invariants**
    - **Property 14: Lightbox Close Restores Scroll**
    - **Validates: Requirements 9.2, 9.3, 9.8**

  - [ ]* 8.5 Write unit tests for Lightbox component
    - Test open/close functionality
    - Verify keyboard navigation (Escape key)
    - Test backdrop click handling
    - Verify ARIA attributes
    - _Requirements: 9.4, 9.5, 9.6, 9.7_

- [x] 9. Implement Contact section with form validation
  - [x] 9.1 Create Contact section component
    - Display contact information cards (phone, location, hours)
    - Integrate ContactForm component
    - Apply gradient background styling
    - _Requirements: 10.1, 10.2_

  - [x] 9.2 Create ContactForm component with validation
    - Build form with fields for name, phone, and message
    - Implement validateContactForm function with validation rules
    - Display validation error messages for each field
    - Show success message after valid submission
    - Clear form fields after successful submission
    - Use appropriate ARIA attributes for accessibility
    - Link error messages to form fields using aria-describedby
    - _Requirements: 10.3, 10.4, 10.5, 10.6, 10.7, 10.8, 10.9, 10.10, 10.11, 10.12, 10.13, 10.14_

  - [ ]* 9.3 Write property tests for form validation
    - **Property 15: Form Required Field Validation**
    - **Property 16: Form Name Validation**
    - **Property 17: Form Phone Validation**
    - **Property 18: Form Message Validation**
    - **Property 19: Form Submission Success**
    - **Validates: Requirements 10.4, 10.5, 10.6, 10.7, 10.8, 10.9, 10.10, 10.11, 10.12**

  - [ ]* 9.4 Write unit tests for ContactForm component
    - Test form field rendering
    - Verify error message display
    - Test form submission flow
    - Verify ARIA attributes and accessibility
    - _Requirements: 10.13, 10.14_

- [x] 10. Implement mobile-specific components
  - [x] 10.1 Create MobileQuickbar component
    - Display fixed bottom bar on mobile devices (<980px)
    - Show three action buttons: Call, WhatsApp, Book Now
    - Implement phone call, WhatsApp chat, and scroll to Contact actions
    - Respect safe-area-inset-bottom for notched devices
    - Use backdrop-filter for visual styling
    - Hide on desktop (≥980px)
    - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5, 11.6, 11.7, 11.8, 11.9_

  - [ ]* 10.2 Write property test for Quickbar button actions
    - **Property 20: Quickbar Button Actions**
    - **Validates: Requirements 11.4, 11.5, 11.6**

  - [x] 10.3 Create WhatsAppFAB component
    - Display floating action button in bottom-right corner on desktop (≥980px)
    - Hide on mobile (<980px)
    - Open WhatsApp chat in new tab on click
    - Add WhatsApp icon and hover effects
    - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5, 12.6_

  - [ ]* 10.4 Write unit tests for mobile components
    - Test responsive visibility at different breakpoints
    - Verify button actions and links
    - Test safe area inset handling
    - _Requirements: 11.1, 11.2, 12.1, 12.2_

- [x] 11. Checkpoint - Verify interactive features
  - Ensure all tests pass, ask the user if questions arise.

- [x] 12. Implement scroll reveal animations
  - [x] 12.1 Create RevealOnScroll component
    - Build wrapper component using Intersection Observer API
    - Add 'visible' class when element enters viewport
    - Support staggered animation delays
    - Implement fallback for browsers without Intersection Observer
    - Respect prefers-reduced-motion setting
    - Disconnect observer on component unmount
    - _Requirements: 13.1, 13.2, 13.3, 13.4, 13.5, 13.6, 13.7_

  - [ ]* 12.2 Write property test for reveal animation trigger
    - **Property 21: Reveal Animation Trigger**
    - **Validates: Requirement 13.1**

  - [ ]* 12.3 Write unit tests for RevealOnScroll component
    - Test Intersection Observer setup
    - Verify fallback behavior
    - Test prefers-reduced-motion handling
    - Verify cleanup on unmount
    - _Requirements: 13.2, 13.3, 13.4, 13.7_

  - [x] 12.4 Apply reveal animations to content sections
    - Wrap section headings and content in RevealOnScroll components
    - Add staggered delays for multiple elements
    - Test animations across all sections
    - _Requirements: 13.1, 13.5_

- [x] 13. Implement responsive layout system
  - [x] 13.1 Create responsive grid layouts
    - Implement mobile layout (<520px): single-column grids
    - Implement tablet layout (520-759px): two-column grids for selected sections
    - Implement large tablet layout (760-979px): three-column grids for treatments
    - Implement desktop layout (≥980px): full navigation and multi-column grids
    - Use CSS Grid and Flexbox for responsive layouts
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_

  - [ ]* 13.2 Write property tests for responsive layout
    - **Property 1: Responsive Layout Consistency**
    - **Property 2: No Horizontal Overflow**
    - **Validates: Requirements 2.1, 2.2, 2.3, 2.4, 2.6**

  - [x] 13.3 Write integration tests for responsive behavior
    - Test layout changes at each breakpoint
    - Verify no horizontal scrolling at any viewport width
    - Test mobile menu visibility at different breakpoints
    - _Requirements: 2.6, 4.1, 4.8_

- [x] 14. Implement image optimization and performance
  - [x] 14.1 Configure Next.js image optimization
    - Set up image domains in next.config.js
    - Configure responsive image sizes based on viewport
    - Implement lazy loading for below-fold images
    - Use WebP format with fallbacks
    - Add blur placeholders for loading states
    - _Requirements: 14.1, 14.2, 14.3, 14.4, 14.5, 14.6, 14.7_

  - [x] 14.2 Optimize fonts and CSS
    - Configure next/font for Lato and Playfair Display
    - Preload critical fonts
    - Use font-display: swap
    - Subset fonts to include only used characters
    - Extract and inline critical CSS
    - _Requirements: 21.1, 21.2, 21.3, 21.4, 15.8_

  - [ ]* 14.3 Write performance tests
    - Test image lazy loading behavior
    - Verify font loading performance
    - Test initial JavaScript bundle size (<200KB gzipped)
    - _Requirements: 14.2, 21.5, 15.7_

- [x] 15. Implement accessibility features
  - [x] 15.1 Add keyboard navigation support
    - Ensure all interactive elements support keyboard navigation
    - Implement focus trapping for mobile menu and lightbox
    - Maintain logical focus order throughout page
    - Add visible focus indicators for all interactive elements
    - _Requirements: 16.1, 16.3, 16.4, 16.5, 16.6_

  - [x] 15.2 Add ARIA attributes and semantic HTML
    - Include appropriate ARIA attributes for dynamic components
    - Use semantic HTML5 elements for document structure
    - Provide text alternatives for all non-text content
    - Ensure minimum color contrast ratio of 4.5:1
    - Support screen reader announcements for dynamic content
    - _Requirements: 16.2, 16.7, 16.8, 16.10, 20.2_

  - [x] 15.3 Implement touch interaction enhancements
    - Ensure touch targets are at least 44x44 pixels on mobile
    - Use passive event listeners for scroll and touch events
    - Provide visual feedback for all touch interactions
    - Prevent accidental double-tap zoom on buttons
    - Use CSS transforms for animations (GPU acceleration)
    - Disable tap highlight color for custom interactive elements
    - _Requirements: 16.9, 17.1, 17.2, 17.3, 17.4, 17.5, 17.6_

  - [ ]* 15.4 Write property tests for accessibility
    - **Property 24: Keyboard Navigation Support**
    - **Property 25: Mobile Touch Target Size**
    - **Validates: Requirements 16.1, 16.9**

  - [ ]* 15.5 Write accessibility integration tests
    - Test keyboard navigation flow
    - Verify ARIA attributes on dynamic components
    - Test focus trapping in menu and lightbox
    - Verify touch target sizes on mobile
    - _Requirements: 16.1, 16.2, 16.4, 16.5, 16.9_

- [x] 16. Checkpoint - Verify accessibility and performance
  - Ensure all tests pass, ask the user if questions arise.

- [x] 17. Implement error handling and fallbacks
  - [x] 17.1 Add error handling for images
    - Display placeholder for failed image loads
    - Log errors to console in development
    - Maintain page layout without broken image icons
    - Display alt text for accessibility
    - _Requirements: 18.1_

  - [x] 17.2 Add error handling for form submission
    - Display user-friendly error messages
    - Preserve user's form data on error
    - Highlight specific fields with validation errors
    - Provide retry option
    - _Requirements: 18.2, 18.3_

  - [x] 17.3 Implement graceful degradation
    - Add fallback for Intersection Observer (immediate visibility)
    - Add fallback for smooth scrolling (instant scroll)
    - Ensure server-rendered content works without JavaScript
    - Provide noscript message for JavaScript-disabled users
    - _Requirements: 18.4, 18.5, 18.6_

  - [ ]* 17.4 Write error handling tests
    - Test image loading failure scenarios
    - Test form submission error handling
    - Verify fallback behavior for unsupported features
    - Test JavaScript-disabled scenario
    - _Requirements: 18.1, 18.2, 18.3, 18.4, 18.5_

- [x] 18. Implement SEO and metadata
  - [x] 18.1 Add SEO metadata
    - Include descriptive page title and meta description
    - Add Open Graph tags for social media sharing
    - Include structured data markup for local business
    - Use descriptive heading hierarchy (h1, h2, h3)
    - Add canonical URLs
    - _Requirements: 20.1, 20.3, 20.5, 20.6, 20.7_

  - [ ] 18.2 Generate sitemap and optimize structure
    - Generate sitemap.xml file
    - Use semantic HTML5 elements for proper structure
    - Ensure proper document outline
    - _Requirements: 20.2, 20.4_

  - [x]* 18.3 Write SEO validation tests
    - Verify metadata presence and correctness
    - Test structured data markup
    - Verify heading hierarchy
    - Test sitemap generation
    - _Requirements: 20.1, 20.3, 20.5, 20.6_

- [x] 19. Final integration and testing
  - [x] 19.1 Perform cross-browser testing
    - Test on latest two versions of Chrome, Firefox, Safari, Edge
    - Test on iOS Safari 14+
    - Test on Chrome Android 90+
    - Verify graceful degradation for unsupported features
    - _Requirements: 19.1, 19.2, 19.3, 19.4_

  - [x] 19.2 Run performance audits
    - Verify Largest Contentful Paint (LCP) < 2.5s
    - Verify First Input Delay (FID) < 100ms
    - Verify Cumulative Layout Shift (CLS) < 0.1
    - Test initial JavaScript bundle size
    - _Requirements: 15.1, 15.2, 15.3, 15.7_

  - [x]* 19.3 Run comprehensive integration tests
    - Test complete user flows (navigation, form submission, gallery)
    - Verify responsive behavior across all breakpoints
    - Test all interactive features (menu, accordion, lightbox)
    - Verify accessibility compliance
    - _Requirements: 1.1, 2.1, 2.2, 2.3, 2.4, 7.2, 8.1, 9.1_

- [x] 20. Final checkpoint - Complete verification
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation at key milestones
- Property tests validate universal correctness properties from the design document
- Unit tests validate specific examples and edge cases
- The implementation uses TypeScript throughout for type safety
- Next.js 14+ App Router is used for optimal performance and developer experience
- Mobile-first responsive design approach ensures optimal experience on all devices
