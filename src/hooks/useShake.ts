import { useEffect } from 'react';

export function useShake(onShake: () => void, threshold = 15) {
  useEffect(() => {
    let lastX = 0, lastY = 0, lastZ = 0;
    let lastUpdate = 0;

    const handleDeviceMotion = (event: DeviceMotionEvent) => {
      const current = event.accelerationIncludingGravity;
      if (!current || current.x === null || current.y === null || current.z === null) return;

      const currentTime = new Date().getTime();
      if (currentTime - lastUpdate > 100) {
        const diffTime = currentTime - lastUpdate;
        lastUpdate = currentTime;

        const speed = Math.abs(current.x + current.y + current.z - lastX - lastY - lastZ) / diffTime * 10000;

        if (speed > threshold * 100) {
          onShake();
        }

        lastX = current.x;
        lastY = current.y;
        lastZ = current.z;
      }
    };

    // Request permission for iOS 13+ devices
    const requestPermissionAndListen = async () => {
      if (typeof (DeviceMotionEvent as any).requestPermission === 'function') {
        try {
          const permissionState = await (DeviceMotionEvent as any).requestPermission();
          if (permissionState === 'granted') {
            window.addEventListener('devicemotion', handleDeviceMotion, false);
          }
        } catch (error) {
          console.error("Error requesting DeviceMotion permission:", error);
          // If permission request fails (e.g. not called from user gesture), 
          // we just try adding it anyway as a fallback for older devices.
          window.addEventListener('devicemotion', handleDeviceMotion, false);
        }
      } else {
        window.addEventListener('devicemotion', handleDeviceMotion, false);
      }
    };

    requestPermissionAndListen();

    return () => {
      window.removeEventListener('devicemotion', handleDeviceMotion, false);
    };
  }, [onShake, threshold]);
}
