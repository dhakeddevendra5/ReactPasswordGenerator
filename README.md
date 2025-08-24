# 🔐 React Password Generator

A modern, customizable password generator built with **React + TypeScript + Vite**.  
Easily generate secure passwords with adjustable length, character sets, and strength estimation.

🚀 **Live Demo**: [dd-react-password-generator.vercel.app](https://dd-react-password-generator.vercel.app/)

---

## ✨ Features

- Generate strong, random passwords
- Adjustable length (default: 16)
- Toggle:
  - Uppercase letters
  - Lowercase letters
  - Digits
  - Symbols
- Options to exclude similar or ambiguous characters
- Password strength estimation
- One-click copy to clipboard
- Mobile-friendly responsive UI

---

## 🛠️ Tech Stack

- **React 18** + **TypeScript**
- **Vite** for fast builds
- **Tailwind CSS** for styling
- **Vercel** for deployment

---

## 📦 Installation

Clone the repository:

```
https://github.com/dhakeddevendra5/ReactPasswordGenerator.git
cd ReactPasswordGenerator
```

## 📂 Project Structure
```
src/
  components/
    Controls.tsx
    PasswordDisplay.tsx
    StrengthMeter.tsx
    Toast.tsx
  hooks/
    usePassword.ts
    useLocalStorage.ts
  utils/
    charset.ts
    entropy.ts
    clipboard.ts
  App.tsx
  main.tsx
  styles.css
tests/
  generator.test.ts
.env.example
README.md
```
## Install dependencies:
```
npm install
```

## Run the development server:
```
npm run dev
```

## Build for production:
```
npm run build
```

## Preview the production build:
```
npm run preview
```


# 🌐 Deployment

This project is deployed on Vercel.
Every push to main triggers an automatic deployment.



# 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you’d like to change.

# 📜 License

MIT © 2025 — Built with ❤️ using React, TypeScript, and Vite.


