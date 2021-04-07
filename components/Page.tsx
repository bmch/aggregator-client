import styled, { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  html {
    --maxWidth:1300px;
    box-sizing: border-box;
    font-size: 62.5%; //10px
    font-family:Helvetica, sans-serif;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height:2;
    background: #f8f8f8;
  }
  a {
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }
`;

const InnerStyles = styled.div`
	max-width: var(--maxWidth);
	margin: 0 auto;
	padding: 2rem;
`;

const Page = ({ children }) => (
	<div>
		<GlobalStyles />
		<InnerStyles>{children}</InnerStyles>
	</div>
);

export default Page;
