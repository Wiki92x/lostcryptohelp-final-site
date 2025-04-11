@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --foreground: #000000;
  --background: #ffffff;
}

[data-theme='dark'],
.dark {
  --foreground: #ffffff;
  --background: #0f1117;
}

body {
  color: var(--foreground);
  background: var(--background);
  font-family: Inter, sans-serif;
  margin: 0;
  padding: 0;
  transition: background-color 0.3s ease, color 0.3s ease;
}
