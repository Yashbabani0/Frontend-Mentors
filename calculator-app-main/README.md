# Frontend Mentor - Calculator App Solution

This is a solution to the [Calculator app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/calculator-app-9lteq5N29). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshots)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Users should be able to:

- See the size of the elements adjust based on their device's screen size
- Perform mathematical operations like addition, subtraction, multiplication, and division
- Adjust the color theme based on their preference
- **Bonus**: Have their initial theme preference checked using `prefers-color-scheme` and have any additional changes saved in the browser

### Screenshots

![Screenshot 1](public/Screenshots/Screenshot%202024-06-28%20144612.png)
![Screenshot 2](public/Screenshots/Screenshot%202024-06-28%20144621.png)
![Screenshot 3](public/Screenshots/Screenshot%202024-06-28%20144640.png)

### Links

- Solution URL: [GitHub Repository](https://github.com/Yashbabani0/calculator-app-main)
- Live Site URL: [Vercel Deployment](https://calculator-app-main-sigma.vercel.app)

## My process

### Built with

- CSS custom properties
- Flexbox
- [React](https://reactjs.org/) - JS library
- [Vite](https://vitejs.dev/) - Frontend tooling
- [Tailwind CSS](https://tailwindcss.com/) - For styles

### What I learned

During this project, I learned how to effectively use React with Vite for fast and efficient development. Tailwind CSS greatly simplified the styling process, allowing for rapid UI development and easy theme management. Additionally, I implemented a feature to save user preferences using `localStorage`.

#### Code snippets

Here are some code snippets I'm proud of:

**React Component for Theme Toggle:**

```jsx
const Toggle = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'theme1');

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleToggle = () => {
    setTheme(theme === 'theme1' ? 'theme2' : theme === 'theme2' ? 'theme3' : 'theme1');
  };

  return <button onClick={handleToggle}>Toggle Theme</button>;
};
```

### Continued development

In future projects, I want to continue improving my skills in state management within React, perhaps diving deeper into context and Redux. I also aim to enhance my knowledge of Tailwind CSS for creating more complex and responsive designs.

### Useful resources

- [React Documentation](https://reactjs.org/docs/getting-started.html) - This helped me understand the basics of React and its core concepts.
- [Vite Documentation](https://vitejs.dev/guide/) - This was invaluable for setting up my development environment quickly and efficiently.
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - Essential for mastering utility-first CSS and rapid UI development.

## Author

- **Name**: Yash Babani
- **Frontend Mentor**: [@Yashbabani0](https://www.frontendmentor.io/profile/Yashbabani0)
- **Twitter**: [@yashbabani09](https://twitter.com/yashbabani09)
- **Threads**: [@yash_babani_](https://www.threads.net/@yash_babani_)
- **Instagram**: [@yash_babani_](https://www.instagram.com/yash_babani_/)
- **LinkedIn**: [Yash Babani](https://www.linkedin.com/in/yashbabani1/)

## Acknowledgments

Special thanks to the Frontend Mentor community for providing feedback and support throughout this project. Their insights were invaluable in refining the final product.
