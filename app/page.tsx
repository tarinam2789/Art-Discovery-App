
"use client";

import React, { useState, useEffect } from "react";

interface ArtData {
  id: string;
  title: string;
  artist: string;
  imageUrl: string;
  category: string;
  date: string;
}

export default function Page() {
  const [art, setArt] = useState<ArtData | null>(null);
  const [banList, setBanList] = useState<string[]>([]);

  // Function to fetch random art
  const fetchArt = async () => {
    try {
      const response = await fetch("https://api.artic.edu/api/v1/artworks?page=1&limit=100");
      const data = await response.json();
      const artworks = data.data;

      // Filter out banned attributes
      const filteredArtworks = artworks.filter(
        (item: any) =>
          !banList.includes(item.artist_title) &&
          !banList.includes(item.classification_title) &&
          !banList.includes(item.title)
      );

      if (filteredArtworks.length === 0) {
        setArt(null);
        return;
      }

      const randomArt = filteredArtworks[Math.floor(Math.random() * filteredArtworks.length)];

      setArt({
        id: randomArt.id,
        title: randomArt.title,
        artist: randomArt.artist_title || "Unknown",
        imageUrl: `https://www.artic.edu/iiif/2/${randomArt.image_id}/full/400,/0/default.jpg`,
        category: randomArt.classification_title || "Uncategorized",
        date: randomArt.date_display || "Unknown",  // Adjust if the field name is different
      });
    } catch (error) {
      console.error("Error fetching artwork:", error);
    }
  };

  useEffect(() => {
    fetchArt();
  }, []);

  // Function to add an attribute to the ban list
  const banAttribute = (attribute: string) => {
    if (!banList.includes(attribute)) {
      setBanList([...banList, attribute]);
    }
  };

  // Function to remove an attribute from the ban list
  const removeBan = (attribute: string) => {
    setBanList(banList.filter((item) => item !== attribute));
  };

  return (
    <div className="page-container">
      <h1 className="app-title">Art Discovery App</h1>
      <div className="content-container">
        <div className="art-card">
          <h2>{art?.title}</h2>
          <p>
            <strong>Artist:</strong>{" "}
            <span onClick={() => banAttribute(art?.artist || "")} className="clickable-text">
              {art?.artist}
            </span>
          </p>
          <p>
            <strong>Category:</strong>{" "}
            <span onClick={() => banAttribute(art?.category || "")} className="clickable-text">
              {art?.category}
            </span>
          </p>
          <p>
            <strong>Date:</strong>{" "}
            <span onClick={() => banAttribute(art?.date || "")} className="clickable-text">
              {art?.date}
            </span>
          </p>
          <img src={art?.imageUrl} alt={art?.title} className="art-image" />
          <button onClick={fetchArt} className="btn-discover">
            Discover
          </button>
        </div>

        <div className="ban-list">
          {banList.length > 0 && (
            <div className="list-section">
              <h3>Banned Attributes</h3>
              {banList.map((attribute) => (
                <span key={attribute} className="ban-list-item" onClick={() => removeBan(attribute)}>
                  {attribute} ✖
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


