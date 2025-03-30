import React from "react";
import "../app/globals.css";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* <title>Art Discovery App</title> */}
        <meta name="description" content="Discover random artworks with this API-based web app." />
      </head>
      <body>
        <div className="container">
          {/* <h1>Art Discovery App</h1> */}
          {children}
        </div>
      </body>
    </html>
  );
}
