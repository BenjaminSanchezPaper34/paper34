import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function fadeInUp(
  element: string | Element | Element[],
  options?: { delay?: number; duration?: number; y?: number; trigger?: string | Element }
) {
  return gsap.fromTo(
    element,
    { opacity: 0, y: options?.y ?? 50 },
    {
      opacity: 1,
      y: 0,
      duration: options?.duration ?? 1,
      delay: options?.delay ?? 0,
      ease: "power3.out",
      scrollTrigger: {
        trigger: (options?.trigger ?? element) as string | Element,
        start: "top 85%",
        end: "top 20%",
        toggleActions: "play none none none",
      },
    }
  );
}

export function staggerReveal(
  elements: string | Element[],
  options?: { stagger?: number; trigger?: string | Element }
) {
  return gsap.fromTo(
    elements,
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: options?.stagger ?? 0.12,
      ease: "power3.out",
      scrollTrigger: {
        trigger: (options?.trigger ?? elements) as string | Element,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    }
  );
}

export function counterAnimation(
  element: Element,
  target: number,
  options?: { duration?: number; trigger?: string | Element }
) {
  const obj = { val: 0 };
  return gsap.to(obj, {
    val: target,
    duration: options?.duration ?? 2,
    ease: "power2.out",
    scrollTrigger: {
      trigger: (options?.trigger ?? element) as string | Element,
      start: "top 85%",
      toggleActions: "play none none none",
    },
    onUpdate: () => {
      element.textContent = Math.floor(obj.val).toString();
    },
  });
}

export { gsap, ScrollTrigger };
