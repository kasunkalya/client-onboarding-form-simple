# Client Onboarding Form – Simple

A small client onboarding form built with **Next.js (App Router)**, **React Hook Form**, and **Zod** for validation.  
On submit, the validated form data is sent via `POST` to an external API endpoint.  

This project is built for the **Besty International technical assessment**.


## Features

- **Validation** using Zod + `zodResolver` from `@hookform/resolvers/zod`
- **React Hook Form** for form state management
- Inline error messages for each field
- Success & error handling for API submission
- Submit button disabled while submitting
- Pre-fill services via query params (`?service=UI/UX,Web%20Dev`)
- Accessible labels & keyboard navigation
- Unit test for the Zod schema (Vitest)

---

## Tech Stack

- **Next.js** (App Router)
- **React Hook Form**
- **Zod**
- **Tailwind CSS** for styling
- **Axios** for HTTP requests
- **Vitest** + **Testing Library** for tests

---

## Setup & Run

1. **Clone the repo**

   git clone https://github.com/kasunkalya/client-onboarding-form-simple.git

   cd client-onboarding-form-simple

2. **Install dependencies**

    npm install
   
3. **Set environment variable**

    Create .env.local in the project root:
    
    NEXT_PUBLIC_ONBOARD_URL=https://example.com/api/onboard

4. **Run in development**

    npm run dev

5. **Build for production**

    npm run build
    
    npm start

6. **Run tests**

    npx vitest run

7. **Project Structure**

    src/
    lib/
    
            schema.ts         # Zod schema & types
            
            schema.test.ts    # Vitest unit tests for schema
    app/
    
            page.tsx          # Main page rendering the form       