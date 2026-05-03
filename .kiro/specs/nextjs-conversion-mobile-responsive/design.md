# Design Document: Next.js Conversion with Mobile Responsiveness

## Overview

This design document outlines the conversion of the Care & Cure Homoeopathic Clinic static HTML website (2381 lines of embedded HTML, CSS, and JavaScript) into a modern Next.js 14+ application with App Router. The conversion focuses on component-based architecture, mobile-first responsive design, enhanced touch interactions, and performance optimizations while preserving all existing features and visual design.

The current static website includes: sticky navigation with scroll effects, mobile menu toggle, treatment accordions, lightbox gallery, contact form, scroll-reveal animations, WhatsApp FAB button, and mobile quickbar. All these features will be preserved and enhanced in the Next.js implementation with improved mobile responsiveness and performance.

## Architecture

The application will follow Next.js 14+ App Router conventions with a component-based architecture, separating concerns into reusable components, server and client components, and optimized asset handling.

```mermaid
graph TD
    A[Next.js App Router] --> B[Layout Component]
    B --> C[Header Component]
    B --> D[Main Content]
    B --> E[Footer Component]
    B --> F[Mobile Quickbar]
    B --> G[WhatsApp FAB]
    
    D --> H[Hero Section]
    D --> I[About Section]
    D --> J[Homeopathy Section]
    D --> K[Treatments Section]
    D --> L[Locations Section]
    D --> M[Gallery Section]
    D --> N[Contact Section]
    
    C --> C1[Navigation]
    C --> C2[Mobile Menu Toggle]
    
    K --> K1[Treatment Cards]
    K --> K2[Accordion Component]
    
    M --> M1[Gallery Grid]
    M --> M2[Lightbox Component]
    
    N --> N1[Contact Cards]
    N --> N2[Contact Form]
    
    style A fill:#2d6a4f
    style B fill:#74c69d
    style D fill:#74c69d


## Sequence Diagrams

### Page Load and Hydration Flow

```mermaid
sequenceDiagram
    participant Browser
    participant NextServer as Next.js Server
    participant AppRouter as App Router
    participant Components as React Components
    participant Client as Client Hydration
    
    Browser->>NextServer: Request page
    NextServer->>AppRouter: Route to page
    AppRouter->>Components: Render Server Components
    Components-->>AppRouter: HTML with data
    AppRouter-->>NextServer: Complete HTML
    NextServer-->>Browser: Send HTML + CSS
    Browser->>Browser: Display content (FCP)
    Browser->>Client: Load JavaScript bundles
    Client->>Components: Hydrate interactive components
    Components-->>Browser: Fully interactive (TTI)


### Mobile Menu Interaction Flow

```mermaid
sequenceDiagram
    participant User
    participant MenuToggle as Menu Toggle Button
    participant NavMenu as Navigation Menu
    participant Body as Document Body
    
    User->>MenuToggle: Tap menu button
    MenuToggle->>MenuToggle: Toggle aria-expanded
    MenuToggle->>NavMenu: Add/remove 'is-open' class
    MenuToggle->>Body: Add/remove 'menu-open' class
    NavMenu-->>User: Show/hide menu with animation
    
    alt User clicks menu link
        User->>NavMenu: Tap navigation link
        NavMenu->>NavMenu: Close menu
        NavMenu->>Body: Remove 'menu-open' class
        NavMenu-->>User: Smooth scroll to section
    else User clicks outside
        User->>Body: Tap outside menu
        Body->>NavMenu: Detect click outside
        NavMenu->>NavMenu: Close menu
        NavMenu-->>User: Menu closes
    end


### Gallery Lightbox Interaction Flow

```mermaid
sequenceDiagram
    participant User
    participant GalleryItem as Gallery Image
    participant Lightbox as Lightbox Component
    participant Body as Document Body
    
    User->>GalleryItem: Click/tap image
    GalleryItem->>Lightbox: Open with image data
    Lightbox->>Lightbox: Set image src, alt, caption
    Lightbox->>Lightbox: Add 'is-open' class
    Lightbox->>Body: Set overflow: hidden
    Lightbox-->>User: Display full-size image
    
    alt User closes lightbox
        User->>Lightbox: Click close button or press Escape
        Lightbox->>Lightbox: Remove 'is-open' class
        Lightbox->>Body: Restore overflow
        Lightbox-->>User: Lightbox closes
    end


## Components and Interfaces

### Component 1: Header

**Purpose**: Sticky navigation header with mobile menu toggle, scroll effects, and responsive navigation

**Interface**:
```typescript
interface HeaderProps {
  className?: string;
}

interface NavigationLink {
  href: string;
  label: string;
}

const navigationLinks: NavigationLink[] = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#treatments', label: 'Treatments' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#contact', label: 'Contact' }
];
```

**Responsibilities**:
- Render sticky header with brand logo and navigation
- Handle scroll state to add/remove 'is-scrolled' class
- Toggle mobile menu on button click
- Close menu on navigation link click or outside click
- Provide accessible navigation with ARIA attributes
- Support smooth scrolling to anchor sections

**Client Component**: Yes (requires useState, useEffect for scroll detection and menu toggle)

---

### Component 2: Hero Section

**Purpose**: Hero section with gradient background, call-to-action buttons, and clinic highlights card

**Interface**:
```typescript
interface HeroProps {
  className?: string;
}

interface HeroHighlight {
  text: string;
}

const heroHighlights: HeroHighlight[] = [
  { text: 'Individualized homeopathic case taking and follow-up care' },
  { text: 'Support for acute, chronic, and specialized health concerns' },
  { text: 'Consultation by appointment with a calm, patient-centered approach' }
];
```

**Responsibilities**:
- Display hero content with heading, description, and CTA buttons
- Render hero card with clinic highlights
- Show floating badge with credentials
- Include decorative leaf SVG accents
- Support reveal animations on scroll
- Use Next.js Image for background optimization

**Client Component**: Partially (reveal animations require client-side intersection observer)

---

### Component 3: About Section

**Purpose**: Doctor profile section with photo, credentials, and statistics

**Interface**:
```typescript
interface AboutProps {
  className?: string;
}

interface DoctorCredential {
  icon: string;
  text: string;
}

interface StatCard {
  title: string;
  description: string;
}

const credentials: DoctorCredential[] = [
  { icon: '✅', text: 'Regd. No.: A-1998' },
  { icon: '✅', text: 'Licence No.: 4066' },
  { icon: '✅', text: 'NEIAH — Ministry of Ayush, Govt. of India' }
];

const stats: StatCard[] = [
  { title: 'Years of Experience', description: 'Practical homeopathic care...' },
  { title: 'Patients Treated', description: 'Consultations shaped around...' },
  { title: 'Conditions Covered', description: 'Support for day-to-day concerns...' }
];
```

**Responsibilities**:
- Display doctor photo with decorative frame
- Show credentials as tag badges
- Render statistics cards in responsive grid
- Support reveal animations
- Use Next.js Image for doctor photo optimization

**Client Component**: Partially (reveal animations)

---

### Component 4: Treatments Section

**Purpose**: Treatment categories with accordion for detailed condition information

**Interface**:
```typescript
interface TreatmentsProps {
  className?: string;
}

interface TreatmentCard {
  icon: string;
  title: string;
  description: string;
  conditions: string[];
}

interface AccordionItem {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  symptoms: string[];
}

const treatments: TreatmentCard[] = [
  {
    icon: '🩺',
    title: 'General Conditions',
    description: 'Supportive care for everyday health concerns...',
    conditions: ['Skin Diseases', 'Seasonal Flu', 'Child Health Issues']
  },
  // ... more treatments
];

const accordionItems: AccordionItem[] = [
  {
    id: 'arthritis',
    icon: '🦴',
    title: 'Arthritis Treatment',
    subtitle: 'Reducing pain, inflammation & stiffness...',
    symptoms: ['Joint pain & stiffness', 'Swelling', 'Reduced movement']
  },
  // ... more accordion items
];
```

**Responsibilities**:
- Display treatment cards in responsive grid
- Render accordion with expandable items
- Handle accordion open/close state
- Support only one open accordion item at a time
- Provide accessible accordion with ARIA attributes

**Client Component**: Yes (accordion state management)

---

### Component 5: Accordion

**Purpose**: Reusable accordion component for expandable content

**Interface**:
```typescript
interface AccordionProps {
  items: AccordionItem[];
  defaultOpenId?: string;
  className?: string;
}

interface AccordionItem {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  symptoms: string[];
}
```

**Responsibilities**:
- Manage open/close state for accordion items
- Support single-item-open behavior
- Provide smooth expand/collapse animations
- Include accessible ARIA attributes (aria-expanded, role)
- Handle keyboard navigation (Enter, Space, Escape)

**Client Component**: Yes (state management and event handlers)

---

### Component 6: Gallery Section

**Purpose**: Masonry-style image gallery with lightbox functionality

**Interface**:
```typescript
interface GalleryProps {
  className?: string;
}

interface GalleryImage {
  src: string;
  alt: string;
  title: string;
}

const galleryImages: GalleryImage[] = [
  { src: 'https://i.ibb.co/nMn5x8Br/Dr-Hafizur-Rahman.jpg', alt: 'Doctor portrait...', title: 'Doctor' },
  // ... more images
];
```

**Responsibilities**:
- Display images in responsive masonry grid (1/2/3 columns)
- Handle image click to open lightbox
- Use Next.js Image for optimization
- Support lazy loading
- Provide accessible image labels

**Client Component**: Yes (lightbox interaction)

---

### Component 7: Lightbox

**Purpose**: Full-screen image viewer with close functionality

**Interface**:
```typescript
interface LightboxProps {
  isOpen: boolean;
  imageSrc: string;
  imageAlt: string;
  imageTitle: string;
  onClose: () => void;
}
```

**Responsibilities**:
- Display full-size image in overlay
- Show image caption
- Handle close on button click, Escape key, or backdrop click
- Prevent body scroll when open
- Provide accessible dialog with ARIA attributes
- Support keyboard navigation

**Client Component**: Yes (event handlers and state)

---

### Component 8: Contact Section

**Purpose**: Contact information cards and consultation request form

**Interface**:
```typescript
interface ContactProps {
  className?: string;
}

interface ContactCard {
  icon: string;
  title: string;
  description: string;
  link?: string;
}

const contactCards: ContactCard[] = [
  { icon: '📍', title: 'Bilasipara, Purani Bazar', description: '', link: '' },
  { icon: '📞', title: '8876341148', description: 'Call directly to book...', link: 'tel:8876341148' },
  // ... more cards
];
```

**Responsibilities**:
- Display contact information cards
- Render contact form with validation
- Handle form submission
- Show success message after submission
- Support accessible form labels and error messages

**Client Component**: Yes (form state and submission)

---

### Component 9: ContactForm

**Purpose**: Reusable contact form with validation

**Interface**:
```typescript
interface ContactFormProps {
  onSubmit?: (data: FormData) => void;
  className?: string;
}

interface FormData {
  name: string;
  phone: string;
  message: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  message?: string;
}
```

**Responsibilities**:
- Manage form input state
- Validate form fields (required, phone format)
- Handle form submission
- Display success/error messages
- Reset form after successful submission
- Provide accessible form with labels and ARIA attributes

**Client Component**: Yes (form state management)

---

### Component 10: Footer

**Purpose**: Site footer with navigation links and credentials

**Interface**:
```typescript
interface FooterProps {
  className?: string;
}

interface FooterLink {
  href: string;
  label: string;
}

const footerLinks: FooterLink[] = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  // ... more links
];
```

**Responsibilities**:
- Display footer brand and navigation links
- Show doctor credentials and registration info
- Render copyright notice
- Support smooth scrolling to anchor sections

**Client Component**: No (can be server component)

---

### Component 11: MobileQuickbar

**Purpose**: Fixed bottom navigation bar for mobile devices with quick actions

**Interface**:
```typescript
interface MobileQuickbarProps {
  className?: string;
}

interface QuickAction {
  href: string;
  label: string;
  icon: string;
  external?: boolean;
}

const quickActions: QuickAction[] = [
  { href: 'tel:8876341148', label: '📞 Call', icon: '📞' },
  { href: 'https://wa.me/918876341148', label: 'WhatsApp', icon: '', external: true },
  { href: '#contact', label: 'Book Now', icon: '' }
];
```

**Responsibilities**:
- Display fixed bottom bar on mobile devices only
- Show quick action buttons (Call, WhatsApp, Book Now)
- Hide on desktop (>= 980px)
- Support safe area insets for notched devices
- Provide accessible button labels

**Client Component**: No (can be server component with CSS media queries)

---

### Component 12: WhatsAppFAB

**Purpose**: Floating action button for WhatsApp contact (desktop only)

**Interface**:
```typescript
interface WhatsAppFABProps {
  phoneNumber: string;
  className?: string;
}
```

**Responsibilities**:
- Display floating WhatsApp button on desktop
- Hide on mobile devices (< 980px)
- Open WhatsApp chat in new tab
- Provide accessible button label
- Support hover effects

**Client Component**: No (can be server component)

---

### Component 13: RevealOnScroll

**Purpose**: Wrapper component for scroll-triggered reveal animations

**Interface**:
```typescript
interface RevealOnScrollProps {
  children: React.ReactNode;
  delay?: number;
  threshold?: number;
  className?: string;
}
```

**Responsibilities**:
- Wrap content to trigger reveal animation on scroll
- Use Intersection Observer API
- Support staggered delays for multiple items
- Add 'visible' class when element enters viewport
- Fallback to immediate visibility if Intersection Observer not supported
- Respect prefers-reduced-motion setting

**Client Component**: Yes (Intersection Observer)



## Data Models

### Model 1: NavigationLink

```typescript
interface NavigationLink {
  href: string;        // Anchor link (e.g., '#home', '#about')
  label: string;       // Display text (e.g., 'Home', 'About')
}
```

**Validation Rules**:
- `href` must start with '#' for internal anchors
- `label` must be non-empty string
- Both fields are required

---

### Model 2: TreatmentCard

```typescript
interface TreatmentCard {
  icon: string;           // Emoji icon (e.g., '🩺', '🌿')
  title: string;          // Card title (e.g., 'General Conditions')
  description: string;    // Brief description
  conditions: string[];   // List of conditions treated
}
```

**Validation Rules**:
- `icon` must be non-empty string (emoji)
- `title` must be non-empty string
- `description` must be non-empty string
- `conditions` must be non-empty array of strings

---

### Model 3: AccordionItem

```typescript
interface AccordionItem {
  id: string;          // Unique identifier (e.g., 'arthritis', 'insomnia')
  icon: string;        // Emoji icon (e.g., '🦴', '😴')
  title: string;       // Accordion title (e.g., 'Arthritis Treatment')
  subtitle: string;    // Brief description
  symptoms: string[];  // List of symptoms
}
```

**Validation Rules**:
- `id` must be unique and non-empty string
- `icon` must be non-empty string (emoji)
- `title` must be non-empty string
- `subtitle` must be non-empty string
- `symptoms` must be non-empty array of strings

---

### Model 4: GalleryImage

```typescript
interface GalleryImage {
  src: string;    // Image URL (external or local)
  alt: string;    // Accessible alt text
  title: string;  // Image caption for lightbox
}
```

**Validation Rules**:
- `src` must be valid URL or path
- `alt` must be non-empty string for accessibility
- `title` must be non-empty string
- All fields are required

---

### Model 5: ContactFormData

```typescript
interface ContactFormData {
  name: string;     // User's full name
  phone: string;    // Phone number
  message: string;  // Consultation request message
}

interface ContactFormErrors {
  name?: string;
  phone?: string;
  message?: string;
}
```

**Validation Rules**:
- `name`: Required, minimum 2 characters, maximum 100 characters
- `phone`: Required, must match phone pattern (digits, spaces, +, -, parentheses allowed)
- `message`: Required, minimum 10 characters, maximum 1000 characters

---

### Model 6: StatCard

```typescript
interface StatCard {
  title: string;        // Stat title (e.g., 'Years of Experience')
  description: string;  // Stat description
}
```

**Validation Rules**:
- `title` must be non-empty string
- `description` must be non-empty string
- Both fields are required

---

### Model 7: LocationCard

```typescript
interface LocationCard {
  title: string;      // Location name (e.g., 'Clinic 1')
  address: string;    // Full address
  phone: string;      // Contact phone number
}
```

**Validation Rules**:
- `title` must be non-empty string
- `address` must be non-empty string
- `phone` must be valid phone number format
- All fields are required



## Algorithmic Pseudocode

### Main Page Rendering Algorithm

```pascal
ALGORITHM renderHomePage()
INPUT: None (static page)
OUTPUT: Rendered HTML page with all sections

BEGIN
  // Server-side rendering
  ASSERT Next.js App Router is configured
  
  // Step 1: Render layout with metadata
  metadata ← {
    title: "Care & Cure Homoeopathic Clinic | Bilasipara",
    description: "Dr. Hafizur Rahman (BHMS) offers safe, personalized...",
    themeColor: "#2d6a4f"
  }
  
  // Step 2: Render root layout
  layout ← RootLayout({
    children: HomePage(),
    fonts: [Lato, PlayfairDisplay],
    cssVariables: loadCSSVariables()
  })
  
  // Step 3: Render page sections in order
  sections ← [
    Header(),
    HeroSection(),
    AboutSection(),
    HomeopathySection(),
    TreatmentsSection(),
    LocationsSection(),
    GallerySection(),
    ContactSection(),
    Footer(),
    MobileQuickbar(),
    WhatsAppFAB()
  ]
  
  FOR each section IN sections DO
    ASSERT section is properly rendered
    page.append(section)
  END FOR
  
  // Step 4: Add client-side interactivity
  ASSERT all client components are hydrated
  
  RETURN page
END
```

**Preconditions**:
- Next.js 14+ is installed and configured
- App Router is enabled
- All required dependencies are installed
- Font files are accessible

**Postconditions**:
- Complete HTML page is rendered
- All sections are visible
- Client components are hydrated and interactive
- Page is accessible and responsive

**Loop Invariants**:
- All previously rendered sections are valid
- Page structure remains consistent

---

### Header Scroll Detection Algorithm

```pascal
ALGORITHM handleHeaderScroll()
INPUT: None (listens to scroll events)
OUTPUT: Updated header state with 'is-scrolled' class

BEGIN
  // Initialize state
  isScrolled ← false
  scrollThreshold ← 10  // pixels
  
  // Step 1: Set up scroll listener
  window.addEventListener('scroll', FUNCTION() {
    currentScrollY ← window.scrollY
    
    // Step 2: Check scroll position
    IF currentScrollY > scrollThreshold THEN
      IF NOT isScrolled THEN
        header.classList.add('is-scrolled')
        isScrolled ← true
      END IF
    ELSE
      IF isScrolled THEN
        header.classList.remove('is-scrolled')
        isScrolled ← false
      END IF
    END IF
  })
  
  // Step 3: Initial check on mount
  handleScroll()
  
  // Step 4: Cleanup on unmount
  RETURN cleanup function to remove listener
END
```

**Preconditions**:
- Header element exists in DOM
- Window object is available (client-side only)

**Postconditions**:
- Header has correct 'is-scrolled' class based on scroll position
- Scroll listener is properly attached and cleaned up

**Loop Invariants**:
- isScrolled state matches actual scroll position
- Header class reflects current state

---

### Mobile Menu Toggle Algorithm

```pascal
ALGORITHM toggleMobileMenu()
INPUT: None (triggered by button click)
OUTPUT: Updated menu state (open/closed)

BEGIN
  // Initialize state
  isMenuOpen ← false
  
  // Step 1: Handle toggle button click
  PROCEDURE handleToggle() IS
    isMenuOpen ← NOT isMenuOpen
    
    // Step 2: Update ARIA attributes
    toggleButton.setAttribute('aria-expanded', isMenuOpen)
    
    // Step 3: Update CSS classes
    IF isMenuOpen THEN
      navMenu.classList.add('is-open')
      document.body.classList.add('menu-open')
    ELSE
      navMenu.classList.remove('is-open')
      document.body.classList.remove('menu-open')
    END IF
  END PROCEDURE
  
  // Step 4: Handle outside click
  PROCEDURE handleOutsideClick(event) IS
    IF isMenuOpen AND NOT navMenu.contains(event.target) AND NOT toggleButton.contains(event.target) THEN
      handleToggle()
    END IF
  END PROCEDURE
  
  // Step 5: Handle navigation link click
  PROCEDURE handleNavLinkClick() IS
    IF isMenuOpen THEN
      handleToggle()
    END IF
  END PROCEDURE
  
  // Step 6: Handle Escape key
  PROCEDURE handleEscapeKey(event) IS
    IF event.key = 'Escape' AND isMenuOpen THEN
      handleToggle()
    END IF
  END PROCEDURE
  
  // Attach event listeners
  toggleButton.addEventListener('click', handleToggle)
  document.addEventListener('click', handleOutsideClick)
  navLinks.forEach(link => link.addEventListener('click', handleNavLinkClick))
  document.addEventListener('keydown', handleEscapeKey)
  
  // Cleanup on unmount
  RETURN cleanup function to remove all listeners
END
```

**Preconditions**:
- Toggle button exists in DOM
- Navigation menu exists in DOM
- Navigation links are available

**Postconditions**:
- Menu state is correctly toggled
- ARIA attributes are updated
- Body scroll is prevented when menu is open
- Event listeners are properly cleaned up

**Loop Invariants**:
- isMenuOpen state matches actual menu visibility
- ARIA attributes match menu state

---

### Accordion Interaction Algorithm

```pascal
ALGORITHM handleAccordion(items)
INPUT: items - array of AccordionItem
OUTPUT: Updated accordion state with one item open

BEGIN
  // Initialize state
  openItemId ← items[0].id  // First item open by default
  
  // Step 1: Handle accordion item click
  PROCEDURE handleItemClick(clickedItemId) IS
    IF clickedItemId = openItemId THEN
      // Clicking open item closes it
      openItemId ← null
    ELSE
      // Open clicked item, close others
      openItemId ← clickedItemId
    END IF
    
    // Step 2: Update all accordion items
    FOR each item IN items DO
      accordionElement ← getElementByItemId(item.id)
      trigger ← accordionElement.querySelector('.accordion-trigger')
      
      IF item.id = openItemId THEN
        accordionElement.classList.add('is-open')
        trigger.setAttribute('aria-expanded', 'true')
      ELSE
        accordionElement.classList.remove('is-open')
        trigger.setAttribute('aria-expanded', 'false')
      END IF
    END FOR
  END PROCEDURE
  
  // Step 3: Initialize accordion state
  FOR each item IN items DO
    trigger ← getElementByItemId(item.id).querySelector('.accordion-trigger')
    trigger.addEventListener('click', FUNCTION() {
      handleItemClick(item.id)
    })
  END FOR
  
  // Set initial state
  handleItemClick(openItemId)
  
  RETURN cleanup function to remove listeners
END
```

**Preconditions**:
- items array is non-empty
- Each item has unique id
- Accordion elements exist in DOM

**Postconditions**:
- At most one accordion item is open
- ARIA attributes correctly reflect state
- Smooth animations are applied

**Loop Invariants**:
- Only one item has 'is-open' class
- All ARIA attributes match visual state

---

### Gallery Lightbox Algorithm

```pascal
ALGORITHM handleGalleryLightbox(images)
INPUT: images - array of GalleryImage
OUTPUT: Lightbox state (open/closed) with selected image

BEGIN
  // Initialize state
  isLightboxOpen ← false
  currentImage ← null
  
  // Step 1: Open lightbox
  PROCEDURE openLightbox(image) IS
    ASSERT image is valid GalleryImage
    
    currentImage ← image
    lightboxImage.src ← image.src
    lightboxImage.alt ← image.alt
    lightboxCaption.textContent ← image.title
    
    lightbox.classList.add('is-open')
    lightbox.setAttribute('aria-hidden', 'false')
    document.body.style.overflow ← 'hidden'
    
    isLightboxOpen ← true
  END PROCEDURE
  
  // Step 2: Close lightbox
  PROCEDURE closeLightbox() IS
    lightbox.classList.remove('is-open')
    lightbox.setAttribute('aria-hidden', 'true')
    lightboxImage.src ← ''
    lightboxImage.alt ← ''
    lightboxCaption.textContent ← ''
    document.body.style.overflow ← ''
    
    isLightboxOpen ← false
    currentImage ← null
  END PROCEDURE
  
  // Step 3: Attach event listeners
  FOR each image IN images DO
    imageElement ← getGalleryItemElement(image)
    imageElement.addEventListener('click', FUNCTION(event) {
      event.preventDefault()
      openLightbox(image)
    })
  END FOR
  
  // Close button
  closeButton.addEventListener('click', closeLightbox)
  
  // Backdrop click
  lightbox.addEventListener('click', FUNCTION(event) {
    IF event.target = lightbox THEN
      closeLightbox()
    END IF
  })
  
  // Escape key
  document.addEventListener('keydown', FUNCTION(event) {
    IF event.key = 'Escape' AND isLightboxOpen THEN
      closeLightbox()
    END IF
  })
  
  RETURN cleanup function to remove listeners
END
```

**Preconditions**:
- images array is non-empty
- Each image has valid src, alt, and title
- Lightbox elements exist in DOM

**Postconditions**:
- Lightbox opens with correct image
- Body scroll is prevented when open
- Lightbox closes properly
- Event listeners are cleaned up

**Loop Invariants**:
- isLightboxOpen matches actual lightbox visibility
- currentImage matches displayed image when open

---

### Contact Form Validation Algorithm

```pascal
ALGORITHM validateContactForm(formData)
INPUT: formData - ContactFormData object
OUTPUT: FormErrors object or null if valid

BEGIN
  errors ← {}
  
  // Step 1: Validate name
  IF formData.name.trim() = '' THEN
    errors.name ← 'Name is required'
  ELSE IF formData.name.length < 2 THEN
    errors.name ← 'Name must be at least 2 characters'
  ELSE IF formData.name.length > 100 THEN
    errors.name ← 'Name must be less than 100 characters'
  END IF
  
  // Step 2: Validate phone
  phonePattern ← /^[\d\s\+\-\(\)]+$/
  IF formData.phone.trim() = '' THEN
    errors.phone ← 'Phone number is required'
  ELSE IF NOT phonePattern.test(formData.phone) THEN
    errors.phone ← 'Please enter a valid phone number'
  ELSE IF formData.phone.length < 10 THEN
    errors.phone ← 'Phone number must be at least 10 digits'
  END IF
  
  // Step 3: Validate message
  IF formData.message.trim() = '' THEN
    errors.message ← 'Message is required'
  ELSE IF formData.message.length < 10 THEN
    errors.message ← 'Message must be at least 10 characters'
  ELSE IF formData.message.length > 1000 THEN
    errors.message ← 'Message must be less than 1000 characters'
  END IF
  
  // Step 4: Return errors or null
  IF errors is empty THEN
    RETURN null
  ELSE
    RETURN errors
  END IF
END
```

**Preconditions**:
- formData contains name, phone, and message fields
- All fields are strings

**Postconditions**:
- Returns null if all validations pass
- Returns FormErrors object with specific error messages if validation fails
- All error messages are user-friendly

---

### Reveal on Scroll Algorithm

```pascal
ALGORITHM revealOnScroll(elements)
INPUT: elements - array of DOM elements with 'reveal' class
OUTPUT: Elements with 'visible' class when in viewport

BEGIN
  // Check for Intersection Observer support
  IF NOT IntersectionObserver is supported THEN
    // Fallback: make all elements visible immediately
    FOR each element IN elements DO
      element.classList.add('visible')
    END FOR
    RETURN
  END IF
  
  // Step 1: Create Intersection Observer
  options ← {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  }
  
  observer ← new IntersectionObserver(FUNCTION(entries) {
    FOR each entry IN entries DO
      IF entry.isIntersecting THEN
        entry.target.classList.add('visible')
        observer.unobserve(entry.target)
      END IF
    END FOR
  }, options)
  
  // Step 2: Observe all reveal elements
  FOR each element IN elements DO
    observer.observe(element)
  END FOR
  
  // Step 3: Cleanup on unmount
  RETURN cleanup function to disconnect observer
END
```

**Preconditions**:
- elements array contains valid DOM elements
- Elements have 'reveal' class
- Browser supports Intersection Observer (or fallback is used)

**Postconditions**:
- Elements become visible when entering viewport
- Observer is disconnected on cleanup
- Fallback ensures all elements are visible if API not supported

**Loop Invariants**:
- All observed elements are valid
- Visible elements remain visible



## Key Functions with Formal Specifications

### Function 1: useScrollDetection()

```typescript
function useScrollDetection(threshold: number = 10): boolean
```

**Preconditions:**
- `threshold` is a positive number (pixels)
- Function is called in client component (browser environment)
- Window object is available

**Postconditions:**
- Returns boolean indicating if scroll position exceeds threshold
- Scroll event listener is properly attached
- Listener is cleaned up on component unmount
- No memory leaks from event listeners

**Loop Invariants:** N/A (no loops)

---

### Function 2: useMobileMenu()

```typescript
function useMobileMenu(): {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
}
```

**Preconditions:**
- Function is called in client component
- DOM elements (menu, toggle button) exist

**Postconditions:**
- Returns object with menu state and control functions
- `isOpen` reflects current menu state
- `toggle()` correctly toggles menu state
- `close()` closes menu if open
- Body scroll is prevented when menu is open
- Event listeners are cleaned up on unmount

**Loop Invariants:** N/A

---

### Function 3: useAccordion()

```typescript
function useAccordion(
  items: AccordionItem[],
  defaultOpenId?: string
): {
  openId: string | null;
  toggle: (id: string) => void;
}
```

**Preconditions:**
- `items` is non-empty array of AccordionItem
- Each item has unique `id`
- `defaultOpenId` (if provided) matches an item id

**Postconditions:**
- Returns object with current open item id and toggle function
- At most one item is open at a time
- `toggle(id)` opens specified item and closes others
- Clicking open item closes it
- ARIA attributes are updated correctly

**Loop Invariants:**
- For toggle operation: Only one item has open state at any time

---

### Function 4: useLightbox()

```typescript
function useLightbox(): {
  isOpen: boolean;
  currentImage: GalleryImage | null;
  open: (image: GalleryImage) => void;
  close: () => void;
}
```

**Preconditions:**
- Function is called in client component
- Lightbox DOM elements exist

**Postconditions:**
- Returns object with lightbox state and control functions
- `isOpen` reflects current lightbox state
- `currentImage` contains displayed image when open, null when closed
- `open(image)` displays specified image
- `close()` closes lightbox and clears image
- Body scroll is prevented when lightbox is open
- Escape key closes lightbox

**Loop Invariants:** N/A

---

### Function 5: validateContactForm()

```typescript
function validateContactForm(data: ContactFormData): FormErrors | null
```

**Preconditions:**
- `data` contains name, phone, and message fields
- All fields are strings (may be empty)

**Postconditions:**
- Returns null if all validations pass
- Returns FormErrors object with specific error messages if validation fails
- Name: 2-100 characters, required
- Phone: valid phone format, minimum 10 digits, required
- Message: 10-1000 characters, required
- No side effects on input data

**Loop Invariants:** N/A

---

### Function 6: handleSmoothScroll()

```typescript
function handleSmoothScroll(targetId: string): void
```

**Preconditions:**
- `targetId` is a valid anchor id (e.g., 'home', 'about')
- Target element with id exists in DOM
- Function is called in browser environment

**Postconditions:**
- Page scrolls smoothly to target element
- Target element is positioned at top of viewport (accounting for sticky header)
- Mobile menu is closed if open
- No errors thrown if element not found

**Loop Invariants:** N/A

---

### Function 7: useRevealOnScroll()

```typescript
function useRevealOnScroll(
  ref: React.RefObject<HTMLElement>,
  options?: IntersectionObserverInit
): boolean
```

**Preconditions:**
- `ref` is a valid React ref to a DOM element
- Function is called in client component
- IntersectionObserver API is available (or fallback is used)

**Postconditions:**
- Returns boolean indicating if element is visible in viewport
- Element is observed for intersection
- Observer is disconnected on unmount
- Fallback returns true immediately if API not supported
- Respects prefers-reduced-motion setting

**Loop Invariants:** N/A

---

### Function 8: optimizeImage()

```typescript
function optimizeImage(
  src: string,
  width: number,
  quality?: number
): string
```

**Preconditions:**
- `src` is valid image URL (external or local)
- `width` is positive integer
- `quality` (if provided) is between 1-100

**Postconditions:**
- Returns optimized image URL for Next.js Image component
- External images (ibb.co) are proxied through Next.js image optimization
- Local images use Next.js static optimization
- Width and quality parameters are applied
- Returns original src if optimization fails

**Loop Invariants:** N/A

---

### Function 9: handleFormSubmit()

```typescript
async function handleFormSubmit(
  data: ContactFormData
): Promise<{ success: boolean; message: string }>
```

**Preconditions:**
- `data` is validated ContactFormData
- All required fields are present and valid

**Postconditions:**
- Returns success response with confirmation message
- Form data is processed (logged or sent to backend)
- Success message includes user's name if provided
- Error handling for network failures
- No sensitive data is exposed in error messages

**Loop Invariants:** N/A

---

### Function 10: getResponsiveImageSizes()

```typescript
function getResponsiveImageSizes(breakpoints: {
  mobile: number;
  tablet: number;
  desktop: number;
}): string
```

**Preconditions:**
- `breakpoints` object contains mobile, tablet, desktop widths
- All widths are positive integers

**Postconditions:**
- Returns sizes string for Next.js Image component
- Format: "(max-width: 520px) 100vw, (max-width: 980px) 50vw, 33vw"
- Optimizes image loading for different viewport sizes
- Reduces bandwidth on mobile devices

**Loop Invariants:** N/A



## Example Usage

### Example 1: Basic Page Structure

```typescript
// app/page.tsx
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Treatments from '@/components/Treatments';
import Gallery from '@/components/Gallery';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import MobileQuickbar from '@/components/MobileQuickbar';
import WhatsAppFAB from '@/components/WhatsAppFAB';

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Hero />
        <About />
        <Treatments />
        <Gallery />
        <Contact />
      </main>
      <Footer />
      <MobileQuickbar />
      <WhatsAppFAB phoneNumber="918876341148" />
    </>
  );
}
```

---

### Example 2: Using Accordion Component

```typescript
// components/Treatments.tsx
'use client';

import { useState } from 'react';
import Accordion from '@/components/Accordion';

const accordionItems = [
  {
    id: 'arthritis',
    icon: '🦴',
    title: 'Arthritis Treatment',
    subtitle: 'Reducing pain, inflammation & stiffness...',
    symptoms: ['Joint pain & stiffness', 'Swelling', 'Reduced movement']
  },
  {
    id: 'insomnia',
    icon: '😴',
    title: 'Insomnia Care',
    subtitle: 'Restoring natural sleep cycles holistically.',
    symptoms: ['Difficulty sleeping', 'Frequent waking', 'Daytime fatigue']
  }
];

export default function Treatments() {
  return (
    <section className="section" id="treatments">
      <div className="container">
        <h2>Conditions We Treat</h2>
        <Accordion items={accordionItems} defaultOpenId="arthritis" />
      </div>
    </section>
  );
}
```

---

### Example 3: Using Mobile Menu Hook

```typescript
// components/Header.tsx
'use client';

import { useMobileMenu } from '@/hooks/useMobileMenu';
import { useScrollDetection } from '@/hooks/useScrollDetection';

export default function Header() {
  const isScrolled = useScrollDetection(10);
  const { isOpen, toggle, close } = useMobileMenu();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    if (href) {
      close();
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`site-header ${isScrolled ? 'is-scrolled' : ''}`}>
      <div className="container nav-shell">
        <a className="brand" href="#home">
          <span className="brand-icon">🌿</span>
          <span className="brand-text">Care & Cure Homoeopathic Clinic</span>
        </a>

        <button
          className="nav-toggle"
          onClick={toggle}
          aria-expanded={isOpen}
          aria-controls="site-menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`site-nav ${isOpen ? 'is-open' : ''}`} id="site-menu">
          <a href="#home" onClick={handleNavClick}>Home</a>
          <a href="#about" onClick={handleNavClick}>About</a>
          <a href="#treatments" onClick={handleNavClick}>Treatments</a>
          <a href="#gallery" onClick={handleNavClick}>Gallery</a>
          <a href="#contact" onClick={handleNavClick}>Contact</a>
          <a className="nav-cta" href="#contact" onClick={handleNavClick}>
            📞 Book Now
          </a>
        </nav>
      </div>
    </header>
  );
}
```

---

### Example 4: Using Gallery with Lightbox

```typescript
// components/Gallery.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Lightbox from '@/components/Lightbox';

const galleryImages = [
  {
    src: 'https://i.ibb.co/nMn5x8Br/Dr-Hafizur-Rahman.jpg',
    alt: 'Doctor portrait of Dr. Hafizur Rahman',
    title: 'Doctor'
  },
  {
    src: 'https://i.ibb.co/Rk29HHH7/Receiption1.jpg',
    alt: 'Reception area at Care and Cure Homoeopathic Clinic',
    title: 'Reception'
  }
  // ... more images
];

export default function Gallery() {
  const [lightbox, setLightbox] = useState<{
    isOpen: boolean;
    image: typeof galleryImages[0] | null;
  }>({ isOpen: false, image: null });

  const openLightbox = (image: typeof galleryImages[0]) => {
    setLightbox({ isOpen: true, image });
  };

  const closeLightbox = () => {
    setLightbox({ isOpen: false, image: null });
  };

  return (
    <section className="section" id="gallery">
      <div className="container">
        <h2>Clinic & Patient Gallery</h2>
        <div className="gallery-grid">
          {galleryImages.map((image, index) => (
            <a
              key={index}
              className="gallery-item"
              href={image.src}
              onClick={(e) => {
                e.preventDefault();
                openLightbox(image);
              }}
              data-title={image.title}
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={400}
                height={300}
                loading="lazy"
                sizes="(max-width: 520px) 100vw, (max-width: 980px) 50vw, 33vw"
              />
            </a>
          ))}
        </div>
      </div>

      {lightbox.isOpen && lightbox.image && (
        <Lightbox
          isOpen={lightbox.isOpen}
          imageSrc={lightbox.image.src}
          imageAlt={lightbox.image.alt}
          imageTitle={lightbox.image.title}
          onClose={closeLightbox}
        />
      )}
    </section>
  );
}
```

---

### Example 5: Using Contact Form with Validation

```typescript
// components/ContactForm.tsx
'use client';

import { useState } from 'react';
import { validateContactForm } from '@/lib/validation';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateContactForm(formData);
    if (validationErrors) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setStatus(
      `Thank you${formData.name ? `, ${formData.name}` : ''}. ` +
      'Your consultation request has been noted. ' +
      'Please call 8876341148 to confirm your appointment.'
    );
    setFormData({ name: '', phone: '', message: '' });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <h3>Send a Consultation Request</h3>
      
      <div className="form-row">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          required
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-error' : undefined}
        />
        {errors.name && (
          <span id="name-error" className="error-message">
            {errors.name}
          </span>
        )}
      </div>

      <div className="form-row">
        <label htmlFor="phone">Phone</label>
        <input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          required
          aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? 'phone-error' : undefined}
        />
        {errors.phone && (
          <span id="phone-error" className="error-message">
            {errors.phone}
          </span>
        )}
      </div>

      <div className="form-row">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
        {errors.message && (
          <span id="message-error" className="error-message">
            {errors.message}
          </span>
        )}
      </div>

      <button className="btn btn-primary form-submit" type="submit">
        Submit
      </button>
      
      {status && (
        <p className="form-status" role="status" aria-live="polite">
          {status}
        </p>
      )}
    </form>
  );
}
```

---

### Example 6: Using Reveal on Scroll

```typescript
// components/RevealOnScroll.tsx
'use client';

import { useEffect, useRef, useState } from 'react';

interface RevealOnScrollProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export default function RevealOnScroll({
  children,
  delay = 0,
  className = ''
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Check for Intersection Observer support
    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${isVisible ? 'visible' : ''} ${className}`}
      data-delay={delay}
    >
      {children}
    </div>
  );
}

// Usage in a section
export function AboutSection() {
  return (
    <section className="section" id="about">
      <div className="container">
        <RevealOnScroll>
          <h2>Meet Dr. Hafizur Rahman</h2>
        </RevealOnScroll>
        
        <RevealOnScroll delay={1}>
          <p>Professional, compassionate homeopathic care...</p>
        </RevealOnScroll>
        
        <RevealOnScroll delay={2}>
          <div className="stats-grid">
            {/* Stats content */}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
```



## Correctness Properties

### Universal Quantification Statements

1. **Navigation Consistency**: ∀ navigation links n, clicking n scrolls to the correct section AND closes mobile menu if open

2. **Accordion Single-Open**: ∀ accordion states s, at most one accordion item is open in state s

3. **Form Validation**: ∀ form submissions f, f is only processed if validateContactForm(f) returns null

4. **Image Optimization**: ∀ images i in gallery, i is loaded through Next.js Image component with appropriate sizes attribute

5. **Responsive Breakpoints**: ∀ viewport widths w:
   - w < 520px → mobile layout (1 column, mobile menu, quickbar visible)
   - 520px ≤ w < 760px → tablet layout (2 columns for some grids)
   - 760px ≤ w < 980px → large tablet layout (3 columns for treatments)
   - w ≥ 980px → desktop layout (full navigation, no mobile menu, no quickbar)

6. **Accessibility**: ∀ interactive elements e, e has appropriate ARIA attributes and keyboard navigation support

7. **Scroll Behavior**: ∀ scroll positions p, header has 'is-scrolled' class ⟺ p > 10px

8. **Lightbox State**: ∀ lightbox states l, body scroll is prevented ⟺ l.isOpen = true

9. **Menu State**: ∀ menu states m, body has 'menu-open' class ⟺ m.isOpen = true

10. **Reveal Animations**: ∀ elements e with 'reveal' class, e becomes visible when entering viewport OR immediately if IntersectionObserver not supported OR prefers-reduced-motion is enabled

11. **External Links**: ∀ external links l (WhatsApp, phone), l opens in appropriate application/dialer

12. **Image Loading**: ∀ images i below fold, i uses lazy loading to improve initial page load performance

13. **Touch Interactions**: ∀ mobile devices d, all interactive elements on d have minimum 44×44px touch target size

14. **Safe Area Insets**: ∀ devices with notches n, mobile quickbar respects safe-area-inset-bottom on n

15. **Error Handling**: ∀ form fields f with validation errors e, e is displayed with aria-describedby linking to error message



## Error Handling

### Error Scenario 1: Image Loading Failure

**Condition**: External image from ibb.co fails to load due to network issues or broken URL

**Response**: 
- Next.js Image component displays placeholder or fallback
- Console warning logged (development only)
- Page layout remains intact without broken image icons
- Alt text is displayed for accessibility

**Recovery**: 
- Retry loading on user interaction (click/tap)
- Provide fallback to local placeholder image if available
- Log error to monitoring service (production)

---

### Error Scenario 2: Form Submission Failure

**Condition**: Contact form submission fails due to network error or validation issues

**Response**:
- Display user-friendly error message in form status area
- Preserve user's form data (don't clear inputs)
- Highlight specific fields with validation errors
- Provide retry option

**Recovery**:
- User can correct errors and resubmit
- Form data is retained until successful submission
- Clear error messages when user starts editing fields

---

### Error Scenario 3: Intersection Observer Not Supported

**Condition**: Browser doesn't support Intersection Observer API (older browsers)

**Response**:
- Detect lack of support using feature detection
- Immediately add 'visible' class to all reveal elements
- Skip animation setup
- Page remains fully functional without animations

**Recovery**:
- No recovery needed - graceful degradation
- All content is immediately visible
- User experience is slightly degraded but functional

---

### Error Scenario 4: JavaScript Disabled

**Condition**: User has JavaScript disabled in browser

**Response**:
- Server-rendered HTML is fully visible and readable
- Navigation links work as standard anchor links
- Mobile menu is not functional (but navigation is accessible via footer links)
- Forms use native HTML5 validation
- Gallery images are visible but lightbox doesn't work

**Recovery**:
- Progressive enhancement approach ensures core content is accessible
- Encourage users to enable JavaScript for full experience
- Provide <noscript> message with instructions

---

### Error Scenario 5: Smooth Scroll Not Supported

**Condition**: Browser doesn't support smooth scrolling behavior

**Response**:
- Detect lack of support
- Fall back to instant scroll to target
- Functionality remains intact
- User experience slightly degraded

**Recovery**:
- No recovery needed - graceful degradation
- Navigation still works correctly

---

### Error Scenario 6: Mobile Menu Stuck Open

**Condition**: Menu remains open due to JavaScript error or state inconsistency

**Response**:
- Escape key always closes menu
- Clicking outside menu closes it
- Page refresh resets state
- Body scroll is restored

**Recovery**:
- Multiple close triggers (Escape, outside click, navigation click)
- State is reset on page navigation
- No persistent state across page loads

---

### Error Scenario 7: Lightbox Image Not Found

**Condition**: Lightbox attempts to display image that doesn't exist

**Response**:
- Display error message in lightbox
- Provide close button to exit lightbox
- Log error to console
- Don't break page functionality

**Recovery**:
- User can close lightbox and continue browsing
- Other gallery images remain functional
- Error is logged for debugging

---

### Error Scenario 8: Viewport Size Detection Failure

**Condition**: Unable to detect viewport size for responsive behavior

**Response**:
- Default to mobile-first layout
- Use CSS media queries as fallback
- Ensure all content is accessible
- Layout may not be optimal but is functional

**Recovery**:
- CSS media queries provide backup responsive behavior
- Page remains usable across all devices
- No JavaScript required for basic responsiveness



## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Responsive Layout Consistency

*For any* viewport width, the System SHALL apply the correct layout configuration based on breakpoint rules: mobile layout (< 520px), tablet layout (520-759px), large tablet layout (760-979px), or desktop layout (≥ 980px).

**Validates: Requirements 2.1, 2.2, 2.3, 2.4**

### Property 2: No Horizontal Overflow

*For any* viewport width, the document width SHALL NOT exceed the viewport width, ensuring all content is readable without horizontal scrolling.

**Validates: Requirement 2.6**

### Property 3: Navigation Link Scroll Behavior

*For any* navigation link, clicking the link SHALL scroll smoothly to the target section AND account for the sticky header height in scroll positioning.

**Validates: Requirements 3.3, 3.4**

### Property 4: Mobile Menu Toggle Consistency

*For any* menu state, toggling the menu button SHALL flip the state (open → closed, closed → open).

**Validates: Requirement 4.2**

### Property 5: Menu State Invariants

*For any* state where the Mobile_Menu is open, the System SHALL prevent body scrolling AND the menu toggle button's aria-expanded attribute SHALL be "true".

**Validates: Requirements 4.3, 4.7**

### Property 6: Navigation Link Closes Menu

*For any* navigation link in the Mobile_Menu, clicking the link SHALL close the menu.

**Validates: Requirement 4.4**

### Property 7: Accordion Single-Open Invariant

*For any* accordion state, at most one accordion item SHALL be open at any time.

**Validates: Requirement 7.4**

### Property 8: Accordion Item Toggle

*For any* accordion item, clicking the item SHALL expand it if closed OR close it if already open.

**Validates: Requirements 7.3, 7.5**

### Property 9: Accordion ARIA Consistency

*For any* accordion item, the aria-expanded attribute SHALL match the item's open/closed state (true when open, false when closed).

**Validates: Requirement 7.6**

### Property 10: Accordion Keyboard Navigation

*For any* accordion item, pressing Enter or Space key SHALL toggle the item's open/closed state.

**Validates: Requirement 7.7**

### Property 11: Gallery Image Opens Lightbox

*For any* gallery image, clicking the image SHALL open the Lightbox AND display that specific image with its caption.

**Validates: Requirements 8.6, 9.1**

### Property 12: Gallery Image Alt Text

*For any* gallery image, the image SHALL have alt text that is present and non-empty.

**Validates: Requirements 8.7, 14.6**

### Property 13: Lightbox State Invariants

*For any* state where the Lightbox is open, the System SHALL prevent body scrolling AND display the image caption.

**Validates: Requirements 9.2, 9.3**

### Property 14: Lightbox Close Restores Scroll

*For any* transition from Lightbox open to closed, the System SHALL restore body scrolling.

**Validates: Requirements 9.2, 9.8**

### Property 15: Form Required Field Validation

*For any* required field in the Contact_Form, submitting the form with that field empty SHALL display a validation error message for that field.

**Validates: Requirement 10.4**

### Property 16: Form Name Validation

*For any* name input, the validation SHALL reject names shorter than 2 characters OR longer than 100 characters.

**Validates: Requirements 10.5, 10.6**

### Property 17: Form Phone Validation

*For any* phone input, the validation SHALL reject invalid phone number formats OR phone numbers shorter than 10 digits.

**Validates: Requirements 10.7, 10.8**

### Property 18: Form Message Validation

*For any* message input, the validation SHALL reject messages shorter than 10 characters OR longer than 1000 characters.

**Validates: Requirements 10.9, 10.10**

### Property 19: Form Submission Success

*For any* valid form data, submitting the Contact_Form SHALL display a success message AND clear all form fields.

**Validates: Requirements 10.11, 10.12**

### Property 20: Quickbar Button Actions

*For any* quickbar button (Call, WhatsApp, Book Now), clicking the button SHALL trigger the correct action (initiate call, open WhatsApp, scroll to Contact).

**Validates: Requirements 11.4, 11.5, 11.6**

### Property 21: Reveal Animation Trigger

*For any* element with the 'reveal' class, when the element enters the viewport, the System SHALL add the 'visible' class to trigger the reveal animation.

**Validates: Requirement 13.1**

### Property 22: Image Component Usage

*For any* image element in the application, the image SHALL use the Next.js Image component.

**Validates: Requirement 14.1**

### Property 23: Below-Fold Image Lazy Loading

*For any* image positioned below the fold, the image SHALL implement lazy loading.

**Validates: Requirement 14.2**

### Property 24: Keyboard Navigation Support

*For any* interactive element (buttons, links, form inputs), the element SHALL support keyboard navigation (Tab, Enter, Space as appropriate).

**Validates: Requirement 16.1**

### Property 25: Mobile Touch Target Size

*For any* interactive element on mobile devices (viewport < 980px), the element SHALL have a minimum touch target size of 44x44 pixels.

**Validates: Requirement 16.9**



## Testing Strategy

### Unit Testing Approach

**Framework**: Jest + React Testing Library

**Key Test Cases**:

1. **Component Rendering**:
   - Test that all components render without errors
   - Verify correct props are passed to child components
   - Check that conditional rendering works correctly
   - Ensure accessibility attributes are present

2. **Hook Testing**:
   - `useScrollDetection`: Test scroll threshold detection
   - `useMobileMenu`: Test toggle, open, close functionality
   - `useAccordion`: Test single-item-open behavior
   - `useLightbox`: Test open/close state management
   - `useRevealOnScroll`: Test intersection observer logic

3. **Validation Testing**:
   - `validateContactForm`: Test all validation rules
   - Test edge cases (empty strings, special characters, length limits)
   - Verify error messages are user-friendly

4. **Utility Functions**:
   - Test smooth scroll behavior
   - Test image optimization helpers
   - Test responsive size calculations

**Coverage Goals**: Minimum 80% code coverage for all components and utilities

---

### Property-Based Testing Approach

**Property Test Library**: fast-check (JavaScript/TypeScript)

**Properties to Test**:

1. **Form Validation Properties**:
   ```typescript
   // Property: Valid form data always passes validation
   fc.assert(
     fc.property(
       fc.record({
         name: fc.string({ minLength: 2, maxLength: 100 }),
         phone: fc.string({ minLength: 10 }).filter(s => /^[\d\s\+\-\(\)]+$/.test(s)),
         message: fc.string({ minLength: 10, maxLength: 1000 })
       }),
       (formData) => {
         const errors = validateContactForm(formData);
         return errors === null;
       }
     )
   );
   ```

2. **Accordion State Property**:
   ```typescript
   // Property: At most one accordion item is open
   fc.assert(
     fc.property(
       fc.array(fc.string(), { minLength: 1, maxLength: 10 }),
       fc.nat(),
       (itemIds, clickIndex) => {
         const accordion = renderAccordion(itemIds);
         const validIndex = clickIndex % itemIds.length;
         accordion.toggle(itemIds[validIndex]);
         
         const openItems = accordion.getOpenItems();
         return openItems.length <= 1;
       }
     )
   );
   ```

3. **Navigation Link Property**:
   ```typescript
   // Property: All navigation links point to valid sections
   fc.assert(
     fc.property(
       fc.array(fc.record({
         href: fc.constantFrom('#home', '#about', '#treatments', '#gallery', '#contact'),
         label: fc.string({ minLength: 1 })
       })),
       (links) => {
         return links.every(link => {
           const target = document.querySelector(link.href);
           return target !== null;
         });
       }
     )
   );
   ```

4. **Image Optimization Property**:
   ```typescript
   // Property: Optimized images maintain aspect ratio
   fc.assert(
     fc.property(
       fc.record({
         width: fc.integer({ min: 100, max: 2000 }),
         height: fc.integer({ min: 100, max: 2000 })
       }),
       ({ width, height }) => {
         const aspectRatio = width / height;
         const optimized = optimizeImage(width, height);
         const newAspectRatio = optimized.width / optimized.height;
         
         return Math.abs(aspectRatio - newAspectRatio) < 0.01;
       }
     )
   );
   ```

5. **Responsive Breakpoint Property**:
   ```typescript
   // Property: Correct layout is applied for viewport width
   fc.assert(
     fc.property(
       fc.integer({ min: 320, max: 2560 }),
       (viewportWidth) => {
         const layout = getLayoutForViewport(viewportWidth);
         
         if (viewportWidth < 520) return layout === 'mobile';
         if (viewportWidth < 760) return layout === 'tablet';
         if (viewportWidth < 980) return layout === 'large-tablet';
         return layout === 'desktop';
       }
     )
   );
   ```

---

### Integration Testing Approach

**Framework**: Playwright or Cypress

**Key Integration Tests**:

1. **Page Navigation Flow**:
   - Test clicking navigation links scrolls to correct sections
   - Verify mobile menu closes after navigation
   - Check smooth scroll behavior
   - Test browser back/forward buttons

2. **Mobile Menu Interaction**:
   - Test menu toggle on mobile viewport
   - Verify menu closes on outside click
   - Test Escape key closes menu
   - Check body scroll prevention when menu open

3. **Gallery and Lightbox Flow**:
   - Test clicking gallery image opens lightbox
   - Verify correct image is displayed
   - Test lightbox close on button, Escape, backdrop click
   - Check body scroll prevention

4. **Accordion Interaction**:
   - Test clicking accordion items opens/closes them
   - Verify only one item open at a time
   - Test keyboard navigation (Enter, Space)
   - Check ARIA attributes update correctly

5. **Form Submission Flow**:
   - Test form validation on submit
   - Verify error messages display correctly
   - Test successful submission shows success message
   - Check form reset after submission

6. **Responsive Behavior**:
   - Test layout changes at different viewport sizes
   - Verify mobile quickbar shows/hides correctly
   - Test WhatsApp FAB visibility on desktop
   - Check touch target sizes on mobile

7. **Scroll Effects**:
   - Test header scroll state changes
   - Verify reveal animations trigger on scroll
   - Test scroll-to-top functionality
   - Check sticky header behavior

8. **Accessibility**:
   - Test keyboard navigation through all interactive elements
   - Verify screen reader announcements
   - Test focus management (menu, lightbox, accordion)
   - Check color contrast ratios

**Test Environments**:
- Desktop: Chrome, Firefox, Safari
- Mobile: iOS Safari, Chrome Android
- Tablet: iPad Safari, Android Chrome



## Performance Considerations

### Core Web Vitals Targets

- **Largest Contentful Paint (LCP)**: < 2.5 seconds
- **First Input Delay (FID)**: < 100 milliseconds
- **Cumulative Layout Shift (CLS)**: < 0.1
- **First Contentful Paint (FCP)**: < 1.8 seconds
- **Time to Interactive (TTI)**: < 3.8 seconds

### Optimization Strategies

1. **Image Optimization**:
   - Use Next.js Image component for automatic optimization
   - Implement lazy loading for below-fold images
   - Serve WebP format with fallbacks
   - Use responsive image sizes based on viewport
   - External images (ibb.co) proxied through Next.js image optimization
   - Target: Reduce image payload by 60-70%

2. **Code Splitting**:
   - Separate client and server components
   - Dynamic imports for heavy components (Lightbox, Accordion)
   - Route-based code splitting via Next.js App Router
   - Target: Initial bundle < 200KB gzipped

3. **CSS Optimization**:
   - Use CSS Modules or Tailwind CSS for scoped styles
   - Extract critical CSS for above-fold content
   - Defer non-critical CSS
   - Remove unused CSS with PurgeCSS
   - Target: Critical CSS < 50KB

4. **Font Loading**:
   - Use next/font for automatic font optimization
   - Preload critical fonts (Lato, Playfair Display)
   - Use font-display: swap to prevent FOIT
   - Subset fonts to include only used characters
   - Target: Font load time < 500ms

5. **JavaScript Optimization**:
   - Minimize client-side JavaScript
   - Use server components where possible
   - Defer non-critical scripts
   - Tree-shake unused code
   - Target: Total JS < 300KB gzipped

6. **Caching Strategy**:
   - Static assets cached with long TTL (1 year)
   - HTML cached with short TTL (5 minutes)
   - Use stale-while-revalidate for images
   - Implement service worker for offline support (optional)

7. **Mobile Performance**:
   - Reduce initial payload for mobile devices
   - Optimize touch event handlers (passive listeners)
   - Minimize layout thrashing
   - Use CSS transforms for animations (GPU acceleration)
   - Target: Mobile LCP < 3 seconds on 3G

8. **Rendering Strategy**:
   - Static generation for all pages (SSG)
   - Server components for non-interactive content
   - Client components only for interactive features
   - Streaming for faster initial render (optional)

### Performance Monitoring

- Implement Real User Monitoring (RUM) with Web Vitals
- Use Lighthouse CI in deployment pipeline
- Monitor Core Web Vitals in production
- Set up performance budgets and alerts
- Track metrics by device type and network speed

### Performance Budget

| Metric | Budget | Current (Static) | Target (Next.js) |
|--------|--------|------------------|------------------|
| Total Page Size | < 2MB | ~1.5MB | < 1MB |
| JavaScript | < 300KB | ~50KB | < 200KB |
| CSS | < 100KB | ~30KB | < 50KB |
| Images | < 1MB | ~1MB | < 500KB |
| Fonts | < 100KB | ~80KB | < 80KB |
| LCP | < 2.5s | ~2.8s | < 2.0s |
| FID | < 100ms | ~50ms | < 50ms |
| CLS | < 0.1 | ~0.05 | < 0.05 |



## Security Considerations

### Content Security Policy (CSP)

Implement strict CSP headers to prevent XSS attacks:

```
Content-Security-Policy:
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval';
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  img-src 'self' https://i.ibb.co data: blob:;
  font-src 'self' https://fonts.gstatic.com;
  connect-src 'self';
  frame-ancestors 'none';
  base-uri 'self';
  form-action 'self';
```

**Rationale**:
- Allow external images from ibb.co (existing image host)
- Allow Google Fonts for Lato and Playfair Display
- Restrict script execution to same origin
- Prevent clickjacking with frame-ancestors 'none'

### Input Validation and Sanitization

1. **Contact Form**:
   - Validate all inputs on client and server side
   - Sanitize user input to prevent XSS
   - Use parameterized queries if storing data
   - Implement rate limiting to prevent spam
   - Add CAPTCHA for production (optional)

2. **URL Parameters**:
   - Validate anchor links before scrolling
   - Sanitize any URL parameters
   - Prevent open redirect vulnerabilities

### External Resource Security

1. **Image Loading**:
   - Proxy external images through Next.js image optimization
   - Validate image URLs before loading
   - Implement CORS headers for image requests
   - Use subresource integrity (SRI) where possible

2. **Third-Party Links**:
   - Use rel="noopener noreferrer" for external links
   - Validate WhatsApp and phone number formats
   - Prevent tabnabbing attacks

### Authentication and Authorization

**Current Scope**: No authentication required (public website)

**Future Considerations**:
- If admin panel is added, implement proper authentication
- Use secure session management
- Implement CSRF protection for forms
- Use HTTPS only (enforce with HSTS headers)

### Data Privacy

1. **Form Data**:
   - Don't store sensitive information in localStorage
   - Clear form data after submission
   - Don't log sensitive data to console in production
   - Implement privacy policy if collecting user data

2. **Analytics**:
   - Use privacy-friendly analytics (optional)
   - Anonymize IP addresses
   - Comply with GDPR/privacy regulations
   - Provide opt-out mechanism

### Dependency Security

1. **Package Management**:
   - Regularly update dependencies
   - Use npm audit or yarn audit to check for vulnerabilities
   - Pin dependency versions in package.json
   - Review security advisories for Next.js and React

2. **Supply Chain Security**:
   - Verify package integrity with lock files
   - Use trusted package sources only
   - Review dependency licenses

### Environment Variables

1. **Sensitive Data**:
   - Store API keys in environment variables
   - Never commit .env files to version control
   - Use different keys for development and production
   - Rotate keys regularly

2. **Next.js Environment Variables**:
   - Use NEXT_PUBLIC_ prefix only for client-exposed variables
   - Keep server-side secrets in regular env variables
   - Validate environment variables on startup

### HTTP Security Headers

Implement security headers in next.config.js:

```javascript
{
  headers: [
    {
      key: 'X-DNS-Prefetch-Control',
      value: 'on'
    },
    {
      key: 'Strict-Transport-Security',
      value: 'max-age=63072000; includeSubDomains; preload'
    },
    {
      key: 'X-Frame-Options',
      value: 'DENY'
    },
    {
      key: 'X-Content-Type-Options',
      value: 'nosniff'
    },
    {
      key: 'X-XSS-Protection',
      value: '1; mode=block'
    },
    {
      key: 'Referrer-Policy',
      value: 'strict-origin-when-cross-origin'
    },
    {
      key: 'Permissions-Policy',
      value: 'camera=(), microphone=(), geolocation=()'
    }
  ]
}
```

### Threat Model

**Potential Threats**:
1. XSS attacks via form inputs
2. CSRF attacks on form submission
3. Clickjacking via iframe embedding
4. Man-in-the-middle attacks (mitigated by HTTPS)
5. DDoS attacks on form submission endpoint
6. Malicious image injection from external sources

**Mitigation Strategies**:
1. Input validation and sanitization
2. CSRF tokens for form submissions
3. X-Frame-Options and CSP headers
4. Enforce HTTPS with HSTS
5. Rate limiting and CAPTCHA
6. Image proxy through Next.js optimization



## Dependencies

### Core Dependencies

1. **Next.js** (^14.0.0)
   - React framework with App Router
   - Server-side rendering and static generation
   - Built-in image optimization
   - File-based routing

2. **React** (^18.0.0)
   - UI library for component-based architecture
   - Hooks for state management
   - Server and client components

3. **TypeScript** (^5.0.0)
   - Type safety for components and utilities
   - Better developer experience
   - Compile-time error checking

### Styling Dependencies

4. **Tailwind CSS** (^3.4.0) OR **CSS Modules**
   - Utility-first CSS framework (if using Tailwind)
   - Scoped styles (if using CSS Modules)
   - Responsive design utilities
   - Custom design system support

5. **PostCSS** (^8.4.0)
   - CSS processing and optimization
   - Autoprefixer for browser compatibility
   - CSS minification

### Font Dependencies

6. **next/font**
   - Built-in Next.js font optimization
   - Google Fonts integration (Lato, Playfair Display)
   - Automatic font subsetting
   - Font display optimization

### Development Dependencies

7. **ESLint** (^8.0.0)
   - Code linting and style enforcement
   - Next.js ESLint configuration
   - React hooks linting

8. **Prettier** (^3.0.0)
   - Code formatting
   - Consistent code style
   - Integration with ESLint

9. **TypeScript ESLint** (^6.0.0)
   - TypeScript-specific linting rules
   - Type-aware linting

### Testing Dependencies

10. **Jest** (^29.0.0)
    - Unit testing framework
    - Snapshot testing
    - Code coverage reporting

11. **React Testing Library** (^14.0.0)
    - Component testing utilities
    - User-centric testing approach
    - Accessibility testing helpers

12. **fast-check** (^3.0.0)
    - Property-based testing library
    - Generative testing
    - Edge case discovery

13. **Playwright** (^1.40.0) OR **Cypress** (^13.0.0)
    - End-to-end testing
    - Cross-browser testing
    - Visual regression testing

### Optional Dependencies

14. **sharp** (^0.33.0)
    - Image processing for Next.js Image optimization
    - Automatic installation by Next.js
    - Better performance than default image processing

15. **@next/bundle-analyzer** (^14.0.0)
    - Bundle size analysis
    - Performance optimization
    - Dependency visualization

16. **web-vitals** (^3.5.0)
    - Core Web Vitals measurement
    - Performance monitoring
    - Real user metrics

### External Services

17. **Google Fonts**
    - Lato (400, 700, 900 weights)
    - Playfair Display (600, 700, 800 weights)
    - Hosted by Google CDN

18. **ibb.co Image Hosting**
    - External image hosting for clinic photos
    - Proxied through Next.js image optimization
    - No direct dependency

19. **WhatsApp Business API**
    - Deep linking for WhatsApp contact
    - No SDK required (uses wa.me links)

### Package.json Example

```json
{
  "name": "care-cure-clinic-nextjs",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:e2e": "playwright test",
    "analyze": "ANALYZE=true next build"
  },
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  },
  "devDependencies": {
    "@next/bundle-analyzer": "^14.0.0",
    "@playwright/test": "^1.40.0",
    "@testing-library/jest-dom": "^6.1.0",
    "@testing-library/react": "^14.0.0",
    "@types/node": "^20.0.0",
    "@types/react": "^18.0.0",
    "@types/react-dom": "^18.0.0",
    "autoprefixer": "^10.4.0",
    "eslint": "^8.0.0",
    "eslint-config-next": "^14.0.0",
    "fast-check": "^3.0.0",
    "jest": "^29.0.0",
    "jest-environment-jsdom": "^29.0.0",
    "postcss": "^8.4.0",
    "prettier": "^3.0.0",
    "tailwindcss": "^3.4.0",
    "typescript": "^5.0.0",
    "web-vitals": "^3.5.0"
  }
}
```

### Browser Support

**Target Browsers**:
- Chrome/Edge: Last 2 versions
- Firefox: Last 2 versions
- Safari: Last 2 versions
- iOS Safari: Last 2 versions
- Chrome Android: Last 2 versions

**Polyfills Required**:
- None (Next.js handles polyfills automatically)
- Intersection Observer fallback in component code
- Smooth scroll fallback for older browsers

### System Requirements

**Development**:
- Node.js 18.17 or later
- npm 9.0 or later (or yarn 1.22+)
- 4GB RAM minimum
- Modern code editor (VS Code recommended)

**Production**:
- Node.js 18.17 or later (for server-side rendering)
- Or static hosting (Vercel, Netlify, AWS S3 + CloudFront)
- CDN for optimal performance
- HTTPS certificate (required)

