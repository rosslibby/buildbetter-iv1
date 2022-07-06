import "./fonts/fonts.css";
import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
	body {
		--elevation-01: #141415;
		--elevation-02: #27292C;
		--elevation-03: #3A3C3F;
		--elevation-04: #474A4E;

		--text-high-contrast: #FFFFFF;
		--text-low-contrast: #FFFFFF80;

		--highlight-accent: #8855FD;
		--highlight-border: #8855FDA3;

		--todo-highlight: #8855FD;
		--bug-highlight: #EE6B60;
		--feature-highlight: #FFD88D;
		--insight-highlight: #75C097;
	}

	body, html, #root {
		height: 100%;
		width: 100%;
		font-family: Gilroy, sans-serif;
	}

	body {
		background: var(--elevation-01);
		color: var(--text-high-contrast);
	}
	 
`;
