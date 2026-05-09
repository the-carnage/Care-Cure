import type { Metadata } from 'next'
import { Lato, Playfair_Display } from 'next/font/google'
import { doctorPhoto } from '../constants/images'
import './globals.css'

const lato = Lato({
  weight: ['400', '700', '900'],
  subsets: ['latin'],
  variable: '--font-lato',
  display: 'swap',
})

const playfairDisplay = Playfair_Display({
  weight: ['600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Care & Cure Homoeopathic Clinic | Dr. Hafizur Rahman | Bilasipara',
  description:
    'Care & Cure Homoeopathic Clinic in Bilasipara, Assam. Dr. Hafizur Rahman (BHMS) offers safe, personalized, and holistic homeopathic treatment for arthritis, skin diseases, insomnia, fatty liver, and more.',

  keywords: [
    'homeopathy',
    'homeopathic clinic',
    'Bilasipara',
    'Dr. Hafizur Rahman',
    'BHMS',
    'natural healing',
    'arthritis treatment',
    'skin disease homeopathy',
    'Assam clinic',
    'Care Cure Clinic',
  ],

  authors: [{ name: 'Dr. Hafizur Rahman' }],

  // ✅ FIXED ICON CONFIG
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', type: 'image/x-icon' }, // fallback
    ],
  },

  openGraph: {
    title: 'Care & Cure Homoeopathic Clinic | Bilasipara',
    description:
      'Natural Healing. Personalized Care. Lasting Results. Dr. Hafizur Rahman (BHMS) provides safe, effective, and holistic homeopathic treatment in Bilasipara, Assam.',
    url: 'https://carencurehomeo.com',
    siteName: 'Care & Cure Homoeopathic Clinic',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: doctorPhoto,
        width: 400,
        height: 500,
        alt: 'Dr. Hafizur Rahman — Care & Cure Homoeopathic Clinic',
      },
    ],
  },

  robots: {
    index: true,
    follow: true,
  },

  other: {
    'theme-color': '#2d6a4f',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${lato.variable} ${playfairDisplay.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'MedicalClinic',
              name: 'Care & Cure Homoeopathic Clinic',
              description:
                'Homeopathic clinic in Bilasipara, Assam providing personalized natural treatment.',
              url: 'https://carencurehomeo.com',
              telephone: '+918876341148',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Purani Bazar',
                addressLocality: 'Bilasipara',
                addressRegion: 'Assam',
                addressCountry: 'IN',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: '26.2283',
                longitude: '90.2275',
              },
              medicalSpecialty: 'Homeopathy',
              openingHoursSpecification: {
                '@type': 'OpeningHoursSpecification',
                description: 'Consultation by Appointment',
              },
              founder: {
                '@type': 'Person',
                name: 'Dr. Hafizur Rahman',
                jobTitle: 'Homeopathic Physician (BHMS)',
              },
              image: doctorPhoto,
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}