import React, { useEffect, useState } from "react";

// NFTGallery.jsx
// React component (default export) that fetches and displays NFTs for an Ethereum address
// Uses Alchemy REST API. Provide an API key via the `apiKey` prop.

export default function NFTGallery({
  address = "0x60B0F6F18329FD7365254252fE17F4747D93906C",
  apiKey = "n08ve1QenkRfVdXSGwXpS",
  pageSize = 20,
}) {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pageKey, setPageKey] = useState(null);

  useEffect(() => {
    setNfts([]);
    setPageKey(null);
    setError(null);
    if (address) fetchNfts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  async function fetchNfts(nextPageKey = null) {
    if (!apiKey) {
      setError("No Alchemy API key provided. Pass `apiKey` prop.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const base = `https://eth-mainnet.alchemyapi.io/v2/${apiKey}/getNFTs/`;
      const params = new URLSearchParams({ owner: address, pageSize: String(pageSize) });
      if (nextPageKey) params.set("pageKey", nextPageKey);
      const url = base + "?" + params.toString();

      const res = await fetch(url);
      if (!res.ok) throw new Error(`Alchemy error ${res.status}`);
      const data = await res.json();

      const newNfts = await Promise.all(
        (data.ownedNfts || []).map(async (item) => {
          const tokenId = item.id?.tokenId;
          const contract = item.contract?.address;
          const metadata = item.metadata || {};

          // try to fetch tokenUri JSON if available
          let externalUrl = null;
          try {
            if (item.tokenUri?.gateway) {
              const metaRes = await fetch(item.tokenUri.gateway);
              if (metaRes.ok) {
                const metaJson = await metaRes.json();
                if (metaJson.external_url) {
                  externalUrl = metaJson.external_url;
                }
              }
            }
          } catch (e) {
            console.warn("Failed to fetch tokenUri metadata", e);
          }

          const rawImage =
            (item.media && item.media[0] && item.media[0].gateway) ||
            metadata.image ||
            metadata.image_url ||
            (item.tokenUri && item.tokenUri.gateway) ||
            null;

          return {
            tokenId,
            contract,
            title: metadata.name || `${contract}:${tokenId}`,
            description: metadata.description || "",
            image: normalizeImageUrl(rawImage),
            externalUrl,
            raw: item,
          };
        })
      );

      setNfts((prev) => [...prev, ...newNfts]);
      setPageKey(data.pageKey || null);
    } catch (err) {
      console.error(err);
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  function normalizeImageUrl(url) {
    if (!url) return null;
    if (typeof url === "object") {
      if (url.gateway) return url.gateway;
      if (url['/']) return `https://ipfs.io/ipfs/${url['/']}`;
      return null;
    }
    if (url.startsWith("ipfs://")) {
      return url.replace(/^ipfs:\/\//, "https://ipfs.io/ipfs/");
    }
    return url;
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">NFTs for {shorten(address)}</h2>
        <div>
          <button
            onClick={() => fetchNfts()}
            className="px-3 py-1 rounded-md border hover:shadow-sm"
          >
            Refresh
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded">Error: {error}</div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {nfts.map((nft, idx) => (
          <div key={`${nft.contract}-${nft.tokenId}-${idx}`} className="bg-white rounded-lg shadow p-3">
            <div className="w-full h-48 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
              {nft.image ? (
                nft.externalUrl ? (
                  <a href={nft.externalUrl} target="_blank" rel="noopener noreferrer">
                    <img src={nft.image} alt={nft.title || "nft image"} className="object-contain h-full" />
                  </a>
                ) : (
                  <img src={nft.image} alt={nft.title || "nft image"} className="object-contain h-full" />
                )
              ) : (
                <div className="text-sm text-gray-400">No image</div>
              )}
            </div>
            <div className="mt-2">
              <div className="font-medium text-sm truncate">{nft.title}</div>
              <div className="text-xs text-gray-500">#{parseInt(nft.tokenId || '0', 16)}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-center">
        {loading ? (
          <div className="px-4 py-2">Loading…</div>
        ) : pageKey ? (
          <button
            onClick={() => fetchNfts(pageKey)}
            className="px-4 py-2 rounded border hover:shadow"
          >
            Load more
          </button>
        ) : (
          nfts.length === 0 && <div className="text-gray-500">No NFTs found for this address.</div>
        )}
      </div>
    </div>
  );

  function shorten(addr) {
    if (!addr) return "-";
    return addr.slice(0, 6) + "…" + addr.slice(-4);
  }
}
