// components/SkeletonChatItem.js
import React from 'react';

const SkeletonChatItem = () => {
    return (
        <div className="flex items-center gap-2 p-2 bg-gray-200 rounded-lg animate-pulse">
            <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
            <div className="flex flex-col">
                <div className="h-4 w-32 bg-gray-300 rounded mb-2"></div>
                <div className="h-3 w-24 bg-gray-300 rounded"></div>
            </div>
        </div>
    );
};

export default SkeletonChatItem;
