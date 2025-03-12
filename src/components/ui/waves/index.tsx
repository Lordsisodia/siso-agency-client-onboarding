
import { cn } from "@/lib/utils"
import { WavesProps } from "./types"
import { useWavesAnimation } from "./useWavesAnimation"

/**
 * Interactive wave background component that responds to mouse movement
 */
export function Waves({
  lineColor = "hsl(var(--foreground))",
  backgroundColor = "transparent",
  waveSpeedX = 0.0125,
  waveSpeedY = 0.005,
  waveAmpX = 32,
  waveAmpY = 16,
  xGap = 10,
  yGap = 32,
  friction = 0.925,
  tension = 0.005,
  maxCursorMove = 100,
  className,
}: WavesProps) {
  const { containerRef, canvasRef } = useWavesAnimation({
    lineColor,
    backgroundColor,
    waveSpeedX,
    waveSpeedY,
    waveAmpX,
    waveAmpY,
    xGap,
    yGap,
    friction,
    tension,
    maxCursorMove,
  })

  return (
    <div
      ref={containerRef}
      style={{
        backgroundColor,
        position: "relative", // Ensure proper stacking context
        zIndex: -5, // Higher than FloatingOrbs but still behind content
      }}
      className={cn(
        "absolute top-0 left-0 w-full h-full overflow-hidden",
        className,
      )}
    >
      <div
        className={cn(
          "absolute top-0 left-0 rounded-full",
          "w-2 h-2 bg-foreground/10",
        )}
        style={{
          transform:
            "translate3d(calc(var(--x) - 50%), calc(var(--y) - 50%), 0)",
          willChange: "transform",
        }}
      />
      <canvas 
        ref={canvasRef} 
        className="block w-full h-full pointer-events-none" 
      />
    </div>
  )
}
