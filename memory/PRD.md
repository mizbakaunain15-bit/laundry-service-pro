# WashCare Pro - Washing Machine Repair & Service Website

## Original Problem Statement
Build a washing machine repair and service website including:
- Phone number: 8310334978
- Offline address: Barline Road, Hassa
- Payment section with PhonePe and Google Pay QR code
- Easy booking system for customers

## Business Information
- **Business Name**: WashCare Pro
- **Phone**: 8310334978
- **Address**: Barline Road, Hassa
- **Payment**: PhonePe/Google Pay UPI

## Architecture

### Backend (FastAPI)
- `/api/` - API root
- `/api/bookings` - POST (create booking), GET (list bookings)
- `/api/bookings/{id}` - GET (specific booking)
- MongoDB for data persistence

### Frontend (React)
- Single page landing website
- Sections: Hero, Services, Why Choose Us, Booking Form, Payment QR, Testimonials, Footer
- Floating WhatsApp button
- Mobile responsive design

## User Personas
1. **Local Customers** - Need washing machine repair/service
2. **Business Owner** - Receives booking inquiries

## Core Requirements (Implemented)
- [x] Hero section with CTAs
- [x] Services: Repair, Installation, AMC
- [x] Easy booking form
- [x] Payment QR code display
- [x] Contact info with phone/address
- [x] WhatsApp integration
- [x] Customer testimonials
- [x] Mobile responsive design

## What's Been Implemented (December 2024)
1. Full landing page with modern UI
2. Service booking API with MongoDB
3. Payment section with user's PhonePe QR code
4. WhatsApp floating button
5. Navigation with smooth scroll
6. Mobile hamburger menu

## Tech Stack
- Backend: FastAPI, MongoDB, Motor
- Frontend: React, Tailwind CSS, Shadcn UI, Framer Motion
- Fonts: Outfit (headings), Manrope (body)

## Prioritized Backlog

### P0 (Critical) - COMPLETED
- Basic landing page
- Booking form
- Contact information
- Payment QR code

### P1 (High Priority)
- Admin dashboard to view bookings
- SMS notifications on booking
- Service pricing display

### P2 (Medium Priority)
- Customer login/booking history
- Service tracking
- Multiple payment options

## Next Tasks
1. Add admin panel to manage bookings
2. Implement email/SMS notifications
3. Add service pricing page
4. Google Maps integration for location
