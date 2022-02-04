import React from 'react';
import * as THREE from 'three';

const VideoText = () => {
  const [video] = React.useState(() =>
    Object.assign(document.createElement('video'), {
      src: '/drei.mp4',
      crossOrigin: 'Anonymous',
      loop: true,
      muted: true,
      autoplay: true,
      playsinline: true,
    })
  );
  React.useEffect(() => {
    video.play();
  }, [video]);

  return (
    <meshBasicMaterial toneMapped={false}>
      <videoTexture attach="map" args={[video]} encoding={THREE.sRGBEncoding} />
    </meshBasicMaterial>
  );
};

export default VideoText;
