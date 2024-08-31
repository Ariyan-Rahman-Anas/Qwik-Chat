import dynamic from 'next/dynamic';
import React from 'react';

const EmojiPicker = dynamic(() => import('emoji-picker-react'), { ssr: false });

export default function EmojiPickerReact({ open, onEmojiClick }) {
  if (!open) return null;

  return (
    <div className="absolute bottom-10 right-0 z-50">
      <EmojiPicker onEmojiClick={onEmojiClick} />
    </div>
  );
}