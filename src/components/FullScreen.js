
import React, { useState } from "react";

export function FullScreen(props) {
  const [fullscreenElement, setFullscreenElement] = useState(false)
  
  function toggleFullSceen(){
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setFullscreenElement(true)
    } else {
      if (document.exitFullscreen) {
        setFullscreenElement(false)
        document.exitFullscreen();
      }
    } 
  };
  return (
    <button
        id="fullScreen"
        onClick={() => {
        toggleFullSceen();
        }}
      >
        {!fullscreenElement ? (
          <svg height="100%" version="1.1" viewBox="0 0 14 14" width="100%">
            <g stroke="none" />
            <g transform="translate(-215.000000, -257.000000)" />
            <g transform="translate(215.000000, 257.000000)" />
            <path d="M2,9 L0,9 L0,14 L5,14 L5,12 L2,12 L2,9 L2,9 Z M0,5 L2,5 L2,2 L5,2 L5,0 L0,0 L0,5 L0,5 Z M12,12 L9,12 L9,14 L14,14 L14,9 L12,9 L12,12 L12,12 Z M9,0 L9,2 L12,2 L12,5 L14,5 L14,0 L9,0 L9,0 Z" />
          </svg>
        ) : (
          <svg height="100%" version="1.1" viewBox="0 0 14 14" width="100%">
            <g stroke="none">
              <g transform="translate(-257.000000, -257.000000)">
                <g transform="translate(257.000000, 257.000000)">
                  <path d="M0,11 L3,11 L3,14 L5,14 L5,9 L0,9 L0,11 L0,11 Z M3,3 L0,3 L0,5 L5,5 L5,0 L3,0 L3,3 L3,3 Z M9,14 L11,14 L11,11 L14,11 L14,9 L9,9 L9,14 L9,14 Z M11,3 L11,0 L9,0 L9,5 L14,5 L14,3 L11,3 L11,3 Z" />
                </g>
              </g>
            </g>
          </svg>
        )}
      </button>
  )
}
