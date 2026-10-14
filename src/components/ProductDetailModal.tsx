import React from 'react';
import { useStore } from '../context/StoreContext';

export const ProductDetailModal: React.FC = () => {
  const { productDetailModal, closeProductDetailModal, openWhatsAppDrawer, config } = useStore();
  const { isOpen, product } = productDetailModal;

  if (!isOpen || !product) return null;

  const slug = product.slug;
  const cleanPhone = config.whatsAppNumber.replace(/[^0-9]/g, '');
  const waText = encodeURIComponent(
    `Hello! I would like to order the following product.\nProduct: ${product.name}\nPrice: $${product.price.toFixed(
      2
    )}\nQuantity: 1\nProduct Link: https://violetmusebeauty.com/products/${slug}\nPlease share the ordering details. Thank you!`
  );
  const waLink = `https://wa.me/${cleanPhone || '18005550199'}?text=${waText}`;

  return (
    <div className="fixed inset-0 z-50 bg-inverse-surface/40 backdrop-blur-sm flex items-center justify-center p-margin animate-fadeIn">
      <div className="absolute inset-0" onClick={closeProductDetailModal} />
      <div className="bg-surface-container-lowest max-w-lg w-full rounded-2xl p-space-lg shadow-2xl relative space-y-space-md z-10 animate-scaleUp">
        <button
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-on-surface cursor-pointer"
          onClick={closeProductDetailModal}
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        <div>
          <span className="font-label-sm text-label-sm text-primary uppercase font-bold tracking-wider">
            {product.categoryLabel}
          </span>
          <h3 className="font-headline-md text-headline-md text-on-surface mt-1">
            {product.name}
          </h3>
          <p className="font-headline-sm text-headline-sm text-primary font-bold mt-1">
            ${product.price.toFixed(2)}
          </p>
        </div>

        <p className="font-body-md text-body-md text-on-surface-variant">
          {product.description}
        </p>

        <div className="p-space-md rounded-xl bg-surface-container-low space-y-2">
          <div className="flex items-center gap-2 text-primary font-label-md text-label-md">
            <span className="material-symbols-outlined text-[18px]">chat</span>
            <span className="font-semibold">WhatsApp Direct Checkout Order Preview</span>
          </div>
          <p className="font-body-sm text-body-sm text-outline">
            Clicking 'Order via WhatsApp' will launch a pre-filled cart chat with product details and international shade options.
          </p>
        </div>

        <div className="flex items-center gap-space-sm pt-space-xs">
          <button
            className="flex-1 h-11 rounded-lg bg-surface-container-high hover:bg-surface-container text-on-surface font-label-md text-label-md transition-colors cursor-pointer"
            onClick={closeProductDetailModal}
          >
            Close Preview
          </button>
          <button
            className="flex-1 h-11 rounded-lg bg-[#25D366] text-white hover:bg-[#20ba5a] font-label-md text-label-md transition-colors flex items-center justify-center gap-1 shadow-md cursor-pointer"
            onClick={() => {
              closeProductDetailModal();
              openWhatsAppDrawer(product);
            }}
          >
            <span className="material-symbols-outlined text-[16px]">chat</span>
            <span>Configure & Order</span>
          </button>
        </div>
      </div>
    </div>
  );
};
