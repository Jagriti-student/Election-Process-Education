# AI-Powered Election Education Assistant 🗳️🤖

An interactive, premium web application designed to educate citizens—especially first-time voters—about the democratic election process. The platform combines a structured learning timeline with an AI-powered assistant to make civic education engaging, accessible, and simple.

## 🌟 Vertical: Civic Engagement & Election Education
This project addresses the critical gap in voter awareness. By simplifying complex electoral procedures into interactive simulations and personalized AI guidance, we empower citizens to participate confidently in the democratic process.

---

## 🛠️ Approach and Logic

### 1. Progressive Disclosure
The app uses a "Timeline-first" approach. Instead of overwhelming users with information, it breaks the election cycle into five logical stages (Registration → Nomination → Campaign → Voting → Results). Users can explore each at their own pace.

### 2. Interactive Simulations
- **Voting Simulator**: A step-by-step virtual walkthrough of a polling booth to reduce "booth anxiety."
- **Knowledge Quiz**: A gamified assessment to reinforce learning through immediate feedback.
- **Misinformation Guide**: A critical thinking tool to help users identify and debunk "fake news."

### 3. AI-First Guidance (Google Gemini)
The **Chat Assistant** isn't just a chatbot; it's a context-aware navigator.
- **Natural Language Navigation**: Users can type "How do I vote?" and the app instantly switches to the Voting Simulator.
- **Personalized Context**: By using the user's profile (first-time voter, location), Gemini provides tailored advice (e.g., "Since you're a first-time voter in Delhi...").

---

## 🚀 How the Solution Works

### Tech Stack
- **Frontend**: React (Vite) + TypeScript for type-safe, performant UI.
- **Styling**: Tailwind CSS + Custom Glassmorphism design system for a premium aesthetic.
- **AI Engine**: Google Gemini 1.5 Flash via the `@google/generative-ai` SDK.
- **State Management**: React Hooks + Local Storage for persistence.
- **Testing**: Vitest for unit testing core logic.

### Key Logic Flows
1. **Onboarding**: Captures user demographics to personalize the AI and content.
2. **AI Integration**:
   - `GeminiService.ts` handles the communication with Google AI.
   - `ChatAssistant.tsx` manages a dual-layer response system: a **Local Keyword Matcher** for instant navigation and **Gemini AI** for complex queries.
3. **Efficiency**: Use of `React.lazy` and `Suspense` ensures that heavy components (like the simulator) only load when needed, keeping the initial bundle size small.

---

## 🧠 Assumptions Made
1. **General Principles**: While the app includes Indian states, the election process steps (Registration, Campaign, etc.) are based on universal democratic principles common to most parliamentary and presidential democracies.
2. **AI Availability**: Assumes the user has access to a Gemini API key for the full experience (fallback "Guide Mode" is provided if the key is missing).
3. **Data Persistence**: Assumes the user is on a modern browser that supports `localStorage` for saving their civic profile.
4. **Tone**: Assumes a non-partisan, strictly educational tone is best for civic engagement.

---

## 🚦 Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Set up AI**:
   - Create a `.env` file in the root.
   - Add `VITE_GEMINI_API_KEY=your_key_here`.

3. **Run Development Server**:
   ```bash
   npm run dev
   ```

4. **Run Tests**:
   ```bash
   npx vitest run
   ```

---

*Developed with ❤️ for a more informed democracy.*
