import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" suppressHydrationWarning>
      <Head>
        <title>Hope Foundation - Empowering Communities</title>
        <meta
          name="description"
          content="A non-profit organization dedicated to making a difference in communities worldwide"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
