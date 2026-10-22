# Manish Raje — Developer Portfolio

Personal portfolio of **Manish Bhaskar Raje**, a Computer Engineering student at VESIT (CGPA 9.86) working on full-stack web development (MERN), AI/ML and agentic AI systems.

<img src="/public/assets/sss.png" alt="Portfolio preview" width="700">

---

## ✨ Features

- 🎬 **Video hero** with animated rotating words and a mute/unmute toggle
- 🧩 **Bento-style About section** with draggable skill cards, an interactive 3D globe (`cobe`) and orbiting tech-stack icons
- 📊 **Developer Activity heatmap** combining GitHub contributions and LeetCode submissions, served by a Vercel serverless function (`/api/activity`)
- 🗂 **Projects grid** with detail modals and live links
- 🎓 **Education & Experience timelines**
- 💬 **Testimonials marquee**
- 💌 **Contact form** powered by EmailJS
- 📄 **View Resume** button (configurable via env variable)
- 📱 Fully responsive layout, tuned for phones

---

## 🗂 Featured Projects

| Project | Description | Stack |
|---------|-------------|-------|
| [CertiChain](https://certificate-verifier-seven.vercel.app/) | Blockchain-based certificate verification — **Genesis 2026 Hackathon Winner** | React, Node.js, Express, MongoDB |
| [PragnaPath](https://pragnapath.vercel.app/) | Cognitive-adaptive multi-agent AI learning companion | Google ADK, FastAPI, React, Tailwind |
| [AlumnNet](https://alumnet-xi.vercel.app/) | Alumni–student mentorship portal with AI mentor matching | MERN |
| [SkillSnap](https://skillsnapp.vercel.app/) | AI career-path recommender from resume analysis | React, AWS (S3, Textract, Lambda, DynamoDB) |
| VPM-X | University dashboard with code compiler, quizzes and Telegram bot | MERN |
| Secret-Santa | Gift-pairing app with auth and group management | React, Supabase |
| MoodMap | Mood-based nearby place discovery | React, OpenStreetMap |

---

## 🛠 Tech Stack

| Tech | Used for |
|------|----------|
| React 19 + Vite 6 | App framework and build tooling |
| Tailwind CSS 4 | Styling |
| Motion (Framer Motion) | Animations and transitions |
| React Three Fiber + Drei / Three.js | 3D elements |
| cobe | Interactive globe |
| GSAP | Additional animations |
| EmailJS | Contact form |
| Vercel Serverless Functions | GitHub + LeetCode activity API |

---

## 🚀 Getting Started

```bash
git clone https://github.com/manishraje28/manish-portfolio-new.git
cd manish-portfolio-new
npm install
npm run dev
```

Build for production with `npm run build` and preview with `npm run preview`.

### Environment variables

Create a `.env` file (and add the same values in your Vercel project settings):

| Variable | Purpose |
|----------|---------|
| `GITHUB_TOKEN` | GitHub personal access token used by `/api/activity` to read the contribution calendar |
| `VITE_RESUME_URL` | Optional link for the "View Resume" button (defaults to `/assets/resume.pdf`) |

> The `/api/activity` endpoint runs as a Vercel function, so the activity heatmap only loads when deployed on Vercel or run with `vercel dev`.

---

## 📁 Project Structure

```bash
├── api/
│   └── activity.js         # Serverless function: GitHub + LeetCode activity
├── public/
│   └── assets/             # Images, logos, project screenshots, resume
├── src/
│   ├── components/         # Reusable UI (Button, Globe, Timeline, Marquee, ...)
│   ├── constants/          # Projects, experience, education, socials, reviews
│   ├── sections/           # Navbar, Hero, About, DeveloperActivity, Projects,
│   │                       # Education, Experiences, Testimonial, Contact, Footer
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
└── vite.config.js
```

To update content (projects, experience, education), edit `src/constants/index.js`.

---

## 📬 Contact Me

[![GitHub](https://img.shields.io/badge/GitHub-181717.svg?logo=github&logoColor=white)](https://github.com/manishraje28)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/manishbraje/)
[![Instagram](https://img.shields.io/badge/Instagram-%23E4405F.svg?logo=Instagram&logoColor=white)](https://www.instagram.com/manish.raje28)
