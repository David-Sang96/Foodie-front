import { useEffect, useState } from "react";
import { FaCircleArrowUp } from "react-icons/fa6";

const ScrollToTopBtn = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Check if the user has scrolled more than the viewport height
      if (window.scrollY > window.innerHeight) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    isVisible && (
      <FaCircleArrowUp
        onClick={scrollToTop}
        className="fixed bottom-16 right-5 cursor-pointer rounded-full text-3xl text-orange"
      />
    )
  );
};

export default ScrollToTopBtn;
