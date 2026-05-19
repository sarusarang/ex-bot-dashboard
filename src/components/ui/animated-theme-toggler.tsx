import { useCallback, useEffect, useRef, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { flushSync } from "react-dom"

import { cn } from "@/lib/utils"

interface AnimatedThemeTogglerProps
  extends React.ComponentPropsWithoutRef<"button"> {
  duration?: number
  onThemeChange?: (isDark: boolean) => void
}

export const AnimatedThemeToggler = ({
  className,
  duration = 400,
  onThemeChange,
  ...props
}: AnimatedThemeTogglerProps) => {
  const [isDark, setIsDark] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")

    // set default theme to dark on first visit
    if (!savedTheme) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else if (savedTheme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }

    const updateTheme = () => {
      const dark = document.documentElement.classList.contains("dark")
      setIsDark(dark)
      onThemeChange?.(dark)
    }

    updateTheme()

    const observer = new MutationObserver(updateTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })

    return () => observer.disconnect()
  }, [])

  const toggleTheme = useCallback(() => {
    if (!buttonRef.current) return

    const applyTheme = () => {
      const newTheme = !isDark
      setIsDark(newTheme)
      document.documentElement.classList.toggle("dark")
      localStorage.setItem("theme", newTheme ? "dark" : "light")
    }

    if (
      typeof document === "undefined" ||
      !("startViewTransition" in document)
    ) {
      applyTheme()
      return
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const transition = (document as any).startViewTransition(() => {
      flushSync(applyTheme)
    })

    const ready = transition?.ready

    if (ready && typeof ready.then === "function") {
      ready.then(() => {
        const button = buttonRef.current
        if (!button) return

        const { top, left, width, height } =
          button.getBoundingClientRect()

        const x = left + width / 2
        const y = top + height / 2

        const maxRadius = Math.hypot(
          Math.max(left, window.innerWidth - left),
          Math.max(top, window.innerHeight - top)
        )

        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${maxRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration,
            easing: "ease-in-out",
            pseudoElement: "::view-transition-new(root)",
          }
        )
      })
    }
  }, [isDark, duration])

  return (
    <button
      ref={buttonRef}
      onClick={toggleTheme}
      className={cn(className)}
      {...props}
    >
      {isDark ? <Sun /> : <Moon />}
      <span className="sr-only">Toggle theme</span>
    </button>
  )

  

}