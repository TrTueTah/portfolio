<a name="readme-top"></a>

# Tran Tue Tanh – 3D Portfolio

Personal portfolio of **Tran Tue Tanh**, a full-stack software engineer in Ho Chi Minh City who builds production web and mobile apps with React, Next.js, React Native and NestJS.

The site is an interactive 3D experience built with React Three Fiber:

- **Scroll-driven hero:** the camera flies into a MacBook screen that previews the About section, then hands off to the rest of the page.
- **Animated sections:** the About rows reveal in order with GSAP ScrollTrigger, and the tech stack balls orbit in a ring that zooms as you scroll.
- **Star field background:** a slowly rotating universe sits behind the whole site.
- **Working contact form:** emails are sent with Resend.

[![GitHub](https://img.shields.io/badge/GitHub-TrTueTah-181717?logo=github)](https://github.com/TrTueTah "GitHub")
[![LinkedIn](https://img.shields.io/badge/LinkedIn-tanhtran227-0A66C2?logo=linkedin)](https://www.linkedin.com/in/tanhtran227 "LinkedIn")
[![Email](https://img.shields.io/badge/Email-trantanh227%40gmail.com-D14836?logo=gmail&logoColor=white)](mailto:trantanh227@gmail.com "Email")

## :bangbang: Folder Structure

<!--- FOLDER_STRUCTURE_START --->
```bash
tanhtran-portfolio/
  |- api/
    |-- contact.ts
  |- emails/
    |-- contact-admin.html
    |-- contact-thank-you.html
  |- public/
  |- src/
    |-- components/
      |--- Button.tsx
      |--- CanvasLoader.tsx
      |--- GolangLogo.tsx
      |--- HeroCamera.tsx
      |--- Iphone.tsx
      |--- Macbook.tsx
      |--- NestLogo.tsx
      |--- ReactLogo.tsx
      |--- RubikCube.tsx
      |--- StarsCanvas.tsx
      |--- TechBall.tsx
    |-- constants/
      |--- index.ts
    |-- hooks/
      |--- useCanvasTexture.ts
      |--- useScreenTexture.ts
      |--- useSlideshowTexture.ts
    |-- lib/
      |--- contact.ts
      |--- motion.ts
      |--- screenTexture.ts
      |--- utils.ts
    |-- sections/
      |--- About.tsx
      |--- Contact.tsx
      |--- Experience.tsx
      |--- Footer.tsx
      |--- Hero.tsx
      |--- Navbar.tsx
      |--- Projects.tsx
      |--- TechStack.tsx
    |-- App.tsx
    |-- index.css
    |-- main.tsx
    |-- vite-env.d.ts
  |- .env.example
  |- .env/.env.local
  |- .gitignore
  |- .prettierrc
  |- eslint.config.js
  |- index.html
  |- package.json
  |- pnpm-lock.yaml
  |- pnpm-workspace.yaml
  |- tsconfig.app.json
  |- tsconfig.json
  |- tsconfig.node.json
  |- vite.config.ts
```
<!--- FOLDER_STRUCTURE_END --->

## :toolbox: Getting Started

1. Install **Node.js** and **pnpm**.
2. Clone this repository and install dependencies with `pnpm install`.
3. Copy `.env.example` to `.env` and fill in the values:

```env
# resend
RESEND_API_KEY="re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
RESEND_FROM_EMAIL="Your Name <me@example.com>"
CONTACT_TO_EMAIL="contact@example.com"
CONTACT_SITE_URL="https://your-site.vercel.app"
RESEND_TEMPLATE_CONTACT_USER="contact-thank-you"
RESEND_TEMPLATE_CONTACT_ADMIN="contact-admin"
```

4. **Resend:** [verify a sending domain](https://resend.com/domains "Resend domains") and create an API key with sending access.
   - `RESEND_FROM_EMAIL` must be an address on that domain.
   - `CONTACT_TO_EMAIL` is the inbox that receives new messages. If it's unset, messages go to the fallback address in `src/lib/contact.ts`.
   - `CONTACT_SITE_URL` is the site's public URL, without a trailing slash.
5. **Resend templates:** create and publish two [templates](https://resend.com/templates "Resend templates").
   - `contact-thank-you` (sent to the visitor), with the variables `USER_NAME`, `USER_MESSAGE` and `SITE_URL`.
   - `contact-admin` (sent to you), with the variables `USER_NAME`, `USER_EMAIL`, `USER_MESSAGE` and `SITE_URL`.
6. Start the dev server with `pnpm dev`.

## :gear: Tech Stack

[![React JS](https://skillicons.dev/icons?i=react "React JS")](https://react.dev/ "React JS") [![TypeScript](https://skillicons.dev/icons?i=ts "TypeScript")](https://www.typescriptlang.org/ "TypeScript") [![Vite JS](https://skillicons.dev/icons?i=vite "Vite JS")](https://vitejs.dev/ "Vite JS") [![Three JS](https://skillicons.dev/icons?i=threejs "Three JS")](https://threejs.org/ "Three JS") [![Tailwind CSS](https://skillicons.dev/icons?i=tailwind "Tailwind CSS")](https://tailwindcss.com/ "Tailwind CSS") [![Vercel](https://skillicons.dev/icons?i=vercel "Vercel")](https://vercel.com/ "Vercel")

The site also uses React Three Fiber, drei, GSAP and Motion.

## :page_with_curl: Deploy on Vercel

1. Import the repository in [Vercel](https://vercel.com/new "Vercel").
2. Add the variables from `.env` under **Settings → Environment Variables**.
3. Deploy. `api/contact.ts` runs as a Vercel Function and serves the contact form at `/api/contact`.

## :gem: Credits

- **Original template:** based on [threejs-portfolio](https://github.com/sanidhyy/threejs-portfolio "threejs-portfolio") by Sanidhya Kumar Verma, released under the MIT License.
- **3D models:** used under [CC-BY-4.0](http://creativecommons.org/licenses/by/4.0/ "CC-BY-4.0").
  - [MacBook Pro M3 16 inch 2024](https://sketchfab.com/3d-models/macbook-pro-m3-16-inch-2024-8e34fc2b303144f78490007d91ff57c4) by [jackbaeten](https://sketchfab.com/jackbaeten)
  - [Iphone 14 Pro](https://sketchfab.com/3d-models/iphone-14-pro-5cb0778041a34f09b409a38c687bb1d4) by [mister dude](https://sketchfab.com/misterdude)
  - [Gopher](https://sketchfab.com/3d-models/gopher-dcab77f1912a40da8fe05e2b49a79485) by [suguru](https://sketchfab.com/suguru)
  - [React logo](https://sketchfab.com/3d-models/react-logo-76174ceeba96487f9863f974636f641e) by [xenadus](https://sketchfab.com/xenadus)
  - [Rubik's Cube](https://sketchfab.com/3d-models/rubiks-cube-155420e09a124ec3a3bcca0852280672) by [DoobiDooba](https://sketchfab.com/DoobiDooba)

### Dependencies

<!--- DEPENDENCIES_START --->
- [@babel/core](https://www.npmjs.com/package/@babel/core): ^7.29.7
- [@eslint/js](https://www.npmjs.com/package/@eslint/js): ^10.0.1
- [@gsap/react](https://www.npmjs.com/package/@gsap/react): ^2.1.2
- [@locator/babel-jsx](https://www.npmjs.com/package/@locator/babel-jsx): ^0.5.1
- [@locator/runtime](https://www.npmjs.com/package/@locator/runtime): ^0.5.1
- [@react-three/drei](https://www.npmjs.com/package/@react-three/drei): ^10.4.4
- [@react-three/fiber](https://www.npmjs.com/package/@react-three/fiber): ^9.7.0
- [@rolldown/plugin-babel](https://www.npmjs.com/package/@rolldown/plugin-babel): ^0.2.4
- [@tailwindcss/vite](https://www.npmjs.com/package/@tailwindcss/vite): ^4.3.3
- [@types/babel__core](https://www.npmjs.com/package/@types/babel__core): ^7.20.5
- [@types/node](https://www.npmjs.com/package/@types/node): ^26.6.1
- [@types/react](https://www.npmjs.com/package/@types/react): ^19.2.18
- [@types/react-dom](https://www.npmjs.com/package/@types/react-dom): ^19.2.5
- [@types/react-vertical-timeline-component](https://www.npmjs.com/package/@types/react-vertical-timeline-component): ^3.3.6
- [@types/three](https://www.npmjs.com/package/@types/three): ^0.185.4
- [@vitejs/plugin-react](https://www.npmjs.com/package/@vitejs/plugin-react): ^6.1.1
- [clsx](https://www.npmjs.com/package/clsx): ^2.1.1
- [eslint](https://www.npmjs.com/package/eslint): ^10.11.0
- [eslint-plugin-react](https://www.npmjs.com/package/eslint-plugin-react): ^7.37.5
- [eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks): ^7.0.0
- [eslint-plugin-react-refresh](https://www.npmjs.com/package/eslint-plugin-react-refresh): ^0.5.7
- [eslint-plugin-unused-imports](https://www.npmjs.com/package/eslint-plugin-unused-imports): ^4.4.1
- [globals](https://www.npmjs.com/package/globals): ^17.12.0
- [gsap](https://www.npmjs.com/package/gsap): ^3.13.0
- [maath](https://www.npmjs.com/package/maath): ^0.10.8
- [motion](https://www.npmjs.com/package/motion): ^13.4.4
- [prettier](https://www.npmjs.com/package/prettier): ^3.6.2
- [prettier-plugin-tailwindcss](https://www.npmjs.com/package/prettier-plugin-tailwindcss): ^0.8.1
- [react](https://www.npmjs.com/package/react): ^19.2.8
- [react-dom](https://www.npmjs.com/package/react-dom): ^19.2.8
- [react-globe.gl](https://www.npmjs.com/package/react-globe.gl): ^2.34.0
- [react-responsive](https://www.npmjs.com/package/react-responsive): ^10.0.1
- [react-vertical-timeline-component](https://www.npmjs.com/package/react-vertical-timeline-component): ^4.0.0
- [resend](https://www.npmjs.com/package/resend): ^6.28.1
- [sonner](https://www.npmjs.com/package/sonner): ^2.0.6
- [tailwind-merge](https://www.npmjs.com/package/tailwind-merge): ^3.7.0
- [tailwindcss](https://www.npmjs.com/package/tailwindcss): ^4.3.3
- [three](https://www.npmjs.com/package/three): 0.186.0
- [three-stdlib](https://www.npmjs.com/package/three-stdlib): ^2.36.1
- [typescript](https://www.npmjs.com/package/typescript): ^6.0.3
- [typescript-eslint](https://www.npmjs.com/package/typescript-eslint): ^8.70.0
- [vite](https://www.npmjs.com/package/vite): ^8.3.0

<!--- DEPENDENCIES_END --->

<p align="right">(<a href="#readme-top">back to top</a>)</p>
