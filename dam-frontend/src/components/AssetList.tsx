import React, { useEffect, useState } from "react";
import axios from "axios";

interface Asset {
  id: number;
  fileUrl: string;
  // Add other fields as needed
}

const AssetList: React.FC = () => {
  const [assets, setAssets] = useState<Asset[]>([]);

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/upload", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAssets(res.data);
      } catch (error) {
        console.error(error);
        // Handle error
      }
    };

    fetchAssets();
  }, []);

  return (
    <div>
      <h2>Your Assets</h2>
      <ul>
        {assets.map((asset) => (
          <li key={asset.id}>
            <a href={asset.fileUrl} target="_blank" rel="noopener noreferrer">
              {asset.fileUrl}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AssetList;
