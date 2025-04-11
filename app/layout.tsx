@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --foreground: #000;
  --background: #fff;
}

[data-theme='dark'],
.dark {
  --foreground: #fff;
  --background: #0f1117;
}

body {
  color: var(--foreground);
  background: var(--background);
  font-family: Inter, sans-serif;
  margin: 0;
  padding: 0;
}
