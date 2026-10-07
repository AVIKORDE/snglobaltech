import { useState } from 'react';
import { Leaf } from 'lucide-react';
import './ProductImage.css';

/**
 * Product image with a graceful fallback if the file is missing.
 * Uses lazy loading and a fixed aspect ratio so cards never jump.
 */
export default function ProductImage({ src, alt, name, ratio = '1 / 1', className = '', priority = false }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={`product-image ${className}`.trim()} style={{ aspectRatio: ratio }}>
      {failed || !src ? (
        <div className="product-image__fallback" role="img" aria-label={alt || name}>
          <Leaf size={36} aria-hidden="true" />
          <span>{name}</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt || name}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
