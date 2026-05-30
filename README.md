# AIMan Knowledge Commons

> **Human-in-the-Loop AI Knowledge Validation Platform**  
> A modern SaaS dashboard application showcasing collaborative knowledge validation between humans and AI systems.

![Version](https://img.shields.io/badge/version-1.0.0-cyan)
![License](https://img.shields.io/badge/license-MIT-green)
![Status](https://img.shields.io/badge/status-Production--Ready-brightgreen)

## 🌟 Overview

**AIMan Knowledge Commons** is a premium, full-stack web application demonstrating a sophisticated human-in-the-loop AI workflow. AI systems don't know everything—valuable knowledge exists with humans. This platform enables users to submit knowledge claims, have them validated by reviewers, and convert verified claims into AI-ready resources.

### Key Value Proposition
- 🧠 **Local Knowledge Capture** - Field observations, environmental data, expert insights
- ✅ **Quality Validation** - Human reviewers verify claims with sophisticated scoring
- 🚀 **AI Integration** - Verified knowledge becomes training and evaluation data
- 📊 **Real-Time Analytics** - Dashboard insights into validation pipeline

---

## ✨ Features

### User Features
- 📝 **Knowledge Claim Submission** - Comprehensive form with validation and scoring
- 📊 **Personal Dashboard** - Track submitted claims, filter by status/category
- 🔍 **Search & Discovery** - Full-text search across knowledge base
- 📈 **Real-Time Scoring** - Auto-generated quality scores based on claim characteristics
- 📱 **Responsive Design** - Seamless experience on mobile, tablet, desktop

### Reviewer Features
- ⚙️ **Review Queue** - Organized interface for claim evaluation
- 🎯 **Multi-Level Scoring** - Reviewer scores independent of initial scoring
- 📝 **Detailed Comments** - Rich feedback system for validation decisions
- 🏷️ **AI Usefulness Classification** - Tag claims for specific AI use cases
- 📊 **Reviewer Analytics** - Track review volume and accuracy

### Admin Features
- 📈 **Global Analytics** - System-wide statistics and trends
- 🎭 **Claim Lifecycle Tracking** - View full history from submission to verification
- 🔄 **Status Management** - Submitted → Needs Review → Verified/Rejected workflow
- 💾 **Persistent Storage** - localStorage-based data persistence

---

## 🛠 Tech Stack

### Frontend
- **React 18** - Modern UI library with hooks
- **Vite** - Ultra-fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router v6** - Client-side routing
- **Lucide React** - Modern icon library
- **Context API** - State management

### Architecture
```
Frontend-First SPA (Single Page Application)
├── Landing Page - Hero & workflow visualization
├── Submit Claim - Multi-field form with validation
├── User Dashboard - Claims list, filters, search
├── Claim Details - Full claim view with reviews
└── Reviewer Dashboard - Review queue & scoring interface
```

### Data Persistence
- **localStorage** - Client-side data storage (simulates backend)
- Automatic sync on state changes
- Session persistence across page reloads

---

## 📋 Project Structure

```
src/
├── pages/
│   ├── LandingPage.jsx              # Hero section & workflow cards
│   ├── SubmitClaimPage.jsx          # Form with live validation
│   ├── DashboardPage.jsx            # User dashboard with filters
│   ├── ClaimDetailPage.jsx          # Full claim view
│   └── ReviewerDashboard.jsx        # Review queue interface
├── components/
│   ├── Navbar.jsx                   # Top navigation
│   └── Sidebar.jsx                  # Side navigation
├── context/
│   └── ClaimsContext.jsx            # Global state management
├── utils/
│   ├── storageService.js            # localStorage wrapper
│   ├── helpers.js                   # Scoring & formatting utilities
│   └── constants.js                 # Categories, statuses, options
├── styles/
│   └── index.css                    # Tailwind & custom styles
└── App.jsx                          # Main router component
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### First Run
1. Open http://localhost:5173
2. Submit a test knowledge claim
3. Review it in the Reviewer Dashboard
4. See it appear as verified in the Dashboard

---

## 🎨 Design System

### Color Palette
```
Primary:    Cyan (#06B6D4)
Secondary:  Purple (#A855F7)
Accent:     Pink (#EC4899)
Success:    Emerald (#10B981)
Warning:    Yellow (#FBBF24)
Error:      Red (#EF4444)
Background: Slate (#0F172A)
```

### UI Components
- **Glass Morphism** - Frosted glass effect with backdrop blur
- **Gradient Accents** - Smooth color transitions
- **Rounded Cards** - 2xl border radius for premium feel
- **Smooth Animations** - Fade-in, slide-up transitions
- **Responsive Grid** - Auto-layout for all screen sizes

---

## 📊 Knowledge Scoring Algorithm

### Scoring Factors
| Factor | Weight | Criteria |
|--------|--------|----------|
| Title | 10% | 10+ characters |
| Description | 25% | 100+ characters (70% for 50+) |
| Evidence Link | 20% | Valid HTTP(S) URL |
| File Upload | 15% | Document attachment |
| Consent | 15% | Explicit user agreement |
| Category | 10% | Valid category selected |
| Observation Date | 5% | Date provided |

---

## 🔄 Workflow Example

### Claim Lifecycle
```
1. USER SUBMITS CLAIM -> Auto-scoring -> Status: submitted
2. REVIEWER EVALUATES -> Reviewer score -> Approve/Reject
3. CLAIM VERIFIED -> Review recorded -> Available for AI
4. USER VIEWS RESULT -> Sees feedback -> Can improve
```

---

## 🔮 Future Enhancements

### Backend Integration
- [ ] Node.js/Express API server
- [ ] MongoDB database
- [ ] JWT authentication
- [ ] Real data persistence

### AI Features
- [ ] AI-assisted categorization
- [ ] Automatic credibility scoring
- [ ] Plagiarism detection
- [ ] Multi-language support

### Advanced Workflows
- [ ] Multi-reviewer validation
- [ ] Appeal system
- [ ] Public datasets
- [ ] Real-time notifications

---

## 📄 License

MIT License - See LICENSE file for details.

---

<div align="center">

**Built with ❤️ for the AI Community**

*Making human knowledge AI-ready*

</div>
