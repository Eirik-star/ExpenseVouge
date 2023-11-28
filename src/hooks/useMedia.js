import { useState, useEffect } from "react"

export const useMedia = () => {
  const [isDesktop, setDesktop] = useState(false)
  const [isTablet, setTablet] = useState(false)
  const [isMobile, setMobile] = useState(false)

  const updateMedia = () => {
    setDesktop(window.innerWidth > 1024)
    setTablet(window.innerWidth > 768)
    setMobile(window.innerWidth > 640)
  };

  useEffect(() => {
    // Initial update
    updateMedia()

    // Update values on resize
    const handleResize = () => {
      updateMedia()
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    };
  }, [])

  return { isDesktop, isMobile, isTablet }
}
