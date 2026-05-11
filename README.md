# 🎓 Graduates Corner

![Graduates Corner Banner](public/og-image.png)

> **The premier platform connecting ambitious students with top-tier universities and enterprise companies.**

Graduates Corner is a modern, multibillion-dollar aesthetic platform designed to streamline the academic and early-career recruitment process. It serves as a centralized hub for discovering **Master's Theses, PhD Positions, and Trainee Programs** across Sweden and worldwide.

---

## ✨ Key Features

### 🏢 For Students
*   **Global Command Palette (`⌘K`):** Instantly search across the entire platform, jump to dashboards, or find specific theses without touching your mouse.
*   **Smart Match Scores:** See real-time percentage match scores on opportunities based on your profile completeness and skills.
*   **Profile Analytics:** Track your application status in real-time, monitor your "Profile Completeness" progress bar, and manage your wishlist.
*   **Premium UX/UI:** Enjoy buttery-smooth page transitions (powered by Framer Motion), glassmorphism components, and a stunning Deep Slate Dark Mode.

### 🏛️ For Universities & Companies
*   **Role-Based Access Control (RBAC):** Dedicated dashboards for Universities and Companies to post opportunities and manage applicants securely.
*   **Applicant Tracking:** Seamlessly move candidates through statuses (`Pending`, `Reviewing`, `Accepted`, `Rejected`).
*   **Analytics Dashboard:** Visualize candidate demographics and application trends using interactive Recharts.

---

## 🛠️ Tech Stack

This project is built using the latest, enterprise-grade web technologies:

*   **Framework:** [Next.js 16](https://nextjs.org/) (App Router, Server Components)
*   **Language:** TypeScript
*   **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) (Custom OKLCH color palettes)
*   **UI Components:** [Shadcn/UI](https://ui.shadcn.com/), Radix Primitives
*   **Animations:** [Framer Motion](https://www.framer.com/motion/)
*   **Database & Auth:** [Supabase](https://supabase.com/) (PostgreSQL, Row-Level Security, Realtime Subscriptions)
*   **Icons:** Lucide React

---

## 🚀 Getting Started

Follow these steps to run the project locally.

### 1. Clone the repository
```bash
git clone https://github.com/nomantabassum38/Graduates-Corner.git
cd Graduates-Corner
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Setup Environment Variables
Create a `.env.local` file in the root directory and add your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Database Setup
Ensure your Supabase PostgreSQL database is synced with the application.
Execute the SQL commands found in `supabase_improvements.sql` within your Supabase SQL Editor. This will establish the correct schema for:
*   Realtime Notifications
*   Application Status Tracking
*   User Profile Extensions
*   Optimized Database Indexes

### 5. Run the Development Server
```bash
npm run dev
# or
yarn dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

---

## 🎨 Design System & Aesthetics
This project follows the **GSD (Get Shit Done)** methodology for rapid, premium frontend development.
*   **Glassmorphism:** Custom `.glass-navbar` and `.glass-panel` utilities utilizing heavy backdrop blurs.
*   **Vibrant Gradients:** High-contrast text gradients and animated CSS backgrounds.
*   **Micro-interactions:** `.hover-lift` classes for cards and framer-motion `<AnimatePresence>` for route changes to eliminate layout shifts.

---

## 🤝 Contributing
Contributions are always welcome! Feel free to open a pull request or an issue if you have suggestions for improvements.

## 📄 License
This project is licensed under the MIT License.
