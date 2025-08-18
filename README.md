# IN1621

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

---

## ✨ Overview

IN1621 is a modern full‑stack web application built with Next.js 15, React 19, MongoDB (via Mongoose), and NextAuth for authentication. TailwindCSS 4 is used for styling. It is designed as part of the **IN1621 coursework/project module**.

---

## 🧰 Tech Stack

* **Framework**: [Next.js 15](https://nextjs.org)
* **Frontend**: React 19 + TailwindCSS 4
* **Backend**: Node.js API routes
* **Auth**: NextAuth.js
* **Database**: MongoDB with Mongoose
* **Icons**: lucide-react
* **Security**: bcryptjs for password hashing

---

## 📦 Getting Started

### Prerequisites

* **Node.js**: v18+ recommended
* **Package manager**: npm, yarn, pnpm, or bun

### 1) Clone the repository

```bash
git clone https://github.com/NehanZ/IN1621.git
cd IN1621/React/in1621
```

### 2) Install dependencies

```bash
npm install
```

### 3) Run the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4) Build for production

```bash
npm run build
```

### 5) Start the production server

```bash
npm start
```

---

## 🔧 Available Scripts

From `package.json`:

```jsonc
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint"
}
```

---

## 🗂️ Project Structure

```
IN1621/
└─ React/
   └─ in1621/
      ├─ app/                  # App router (Next.js 13+)
      │  ├─ page.js            # Home page
      │  └─ api/               # API routes (backend endpoints)
      ├─ components/           # UI components
      ├─ lib/                  # Utilities & helpers (db, auth, etc.)
      ├─ public/               # Static assets
      ├─ styles/               # Global styles (Tailwind)
      ├─ package.json
      └─ README.md
```

---

## 🔐 Environment Variables

Create a `.env.local` file in the project root.

```bash
# MongoDB
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/db

# NextAuth
NEXTAUTH_SECRET=your-secret
NEXTAUTH_URL=http://localhost:3000

# Optional
GOOGLE_CLIENT_ID=xxxx
GOOGLE_CLIENT_SECRET=xxxx
```

Add a committed template `.env.example` for contributors.

---

## 🧪 Testing

Add tests under `__tests__/` and run:

```bash
npm test
```

Recommended stack: Jest or Vitest + React Testing Library.

---

## 🧹 Linting & Formatting

```bash
npm run lint
```

ESLint with `eslint-config-next` is preconfigured.

---

## 🚀 Deployment

The easiest way to deploy is with [Vercel](https://vercel.com). Push your repo to GitHub and import it into Vercel.

**Build command**: `npm run build`
**Output directory**: `.next`

---

## 🤝 Contributing

1. Fork the repo
2. Create a new branch: `git checkout -b feat/feature-name`
3. Commit: `git commit -m "feat: add new feature"`
4. Push: `git push origin feat/feature-name`
5. Open a Pull Request

---

## 📄 License

MIT License. See [LICENSE](LICENSE) file for details.

---

## 🧑‍💻 Author

* **Nehan Wijayagunarathna** (maintainer)

---

## 📎 Notes

* Uses the new **App Router** (`app/` directory)
* Styled with **TailwindCSS v4**
* Authentication via **NextAuth.js**
* Database with **MongoDB + Mongoose**
