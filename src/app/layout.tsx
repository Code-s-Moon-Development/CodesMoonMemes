import { Html, Head, Main, NextScript } from "next/document";
import styled from "styled-components";

import Navbar from "../components/Navbar";

const MainWrap = styled.main`
    padding: 0 2rem;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    max-width: 1950px;
`;

export default function RootLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <html dir="ltr" lang="pt">
        <body>
            <MainWrap>
                <Navbar />
                {children}
            </MainWrap>
        </body>
      </html>
    );
  }