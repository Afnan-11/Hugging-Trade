"use client"

import React, { useState, useRef, useCallback } from "react"

interface SemicircularSliderProps {
  value: number
  min: number
  max: number
  onChange: (value: number) => void
  className?: string
}

export function SemicircularSlider({ value, min, max, onChange, className = "" }: SemicircularSliderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const svgRef = useRef<SVGSVGElement>(null)

  const radius = 80
  const centerX = 120
  const centerY = 120

  // Convert value to angle (0 to 180 degrees for semicircle)
  const valueToAngle = (val: number) => {
    const normalizedValue = (val - min) / (max - min)
    return normalizedValue * 180
  }

  // Convert angle to value
  const angleToValue = (angle: number) => {
    const normalizedAngle = Math.max(0, Math.min(180, angle)) / 180
    return Math.round(min + normalizedAngle * (max - min))
  }

  // Get current angle
  const currentAngle = valueToAngle(value)

  // Calculate thumb position
  const thumbAngle = (currentAngle * Math.PI) / 180
  const thumbX = centerX - radius * Math.cos(thumbAngle)
  const thumbY = centerY - radius * Math.sin(thumbAngle)

  // Handle mouse/touch events
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    setIsDragging(true)
    e.preventDefault()
  }, [])

  const handlePointerMove = useCallback(
    (e: PointerEvent) => {
      if (!isDragging || !svgRef.current) return

      const rect = svgRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left - centerX
      const y = e.clientY - rect.top - centerY

      // Calculate angle from center
      let angle = Math.atan2(-y, -x) * (180 / Math.PI)

      // Normalize angle to 0-180 range
      if (angle < 0) angle += 360
      if (angle > 180) {
        angle = angle > 270 ? 0 : 180
      }

      const newValue = angleToValue(angle)
      onChange(newValue)
    },
    [isDragging, onChange],
  )

  const handlePointerUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  // Add global event listeners
  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener("pointermove", handlePointerMove)
      document.addEventListener("pointerup", handlePointerUp)

      return () => {
        document.removeEventListener("pointermove", handlePointerMove)
        document.removeEventListener("pointerup", handlePointerUp)
      }
    }
  }, [isDragging, handlePointerMove, handlePointerUp])

  // Create arc path
  const createArcPath = (startAngle: number, endAngle: number, arcRadius: number = radius) => {
    const start = (startAngle * Math.PI) / 180
    const end = (endAngle * Math.PI) / 180

    const x1 = centerX - arcRadius * Math.cos(start)
    const y1 = centerY - arcRadius * Math.sin(start)
    const x2 = centerX - arcRadius * Math.cos(end)
    const y2 = centerY - arcRadius * Math.sin(end)

    const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0

    return `M ${x1} ${y1} A ${arcRadius} ${arcRadius} 0 ${largeArcFlag} 1 ${x2} ${y2}`
  }

  return (
    <div className={`relative ${className}`}>
      <svg ref={svgRef} width="240" height="140" className="overflow-visible" style={{ touchAction: "none" }}>
        {/* Background track */}
        <path d={createArcPath(0, 180)} fill="none" stroke="#D1D5DB" strokeWidth="8" strokeLinecap="round" />

        {/* Active track */}
        <path d={createArcPath(0, currentAngle)} fill="none" stroke="#2563EB" strokeWidth="8" strokeLinecap="round" />

        {/* Marker at 12m position */}
        <circle
          cx={centerX - radius * Math.cos((valueToAngle(12) * Math.PI) / 180)}
          cy={centerY - radius * Math.sin((valueToAngle(12) * Math.PI) / 180)}
          r="6"
          fill="#9CA3AF"
        />

        {/* Draggable thumb */}
        <circle
          cx={thumbX}
          cy={thumbY}
          r="10"
          fill="#2563EB"
          className="cursor-pointer drop-shadow-sm"
          onPointerDown={handlePointerDown}
        />

        {/* Labels */}
        <text x="40" y="135" textAnchor="middle" className="text-sm fill-gray-600 font-medium">
          1m
        </text>
        <text x="120" y="145" textAnchor="middle" className="text-sm fill-gray-600 font-medium">
          6m
        </text>
        <text x="200" y="135" textAnchor="middle" className="text-sm fill-gray-600 font-medium">
          12m
        </text>
      </svg>
    </div>
  )
}
