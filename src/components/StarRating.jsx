import { Star, StarHalf } from 'lucide-react'

export const StarRating = ({ rating, size = 16 }) => {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i + 1 <= Math.floor(rating)
        const half   = !filled && i < rating && rating % 1 !== 0 && i === Math.floor(rating)
        return filled ? (
          <Star key={i} size={size} fill="#FFD700" color="#FFD700" strokeWidth={0} />
        ) : half ? (
          <StarHalf key={i} size={size} fill="#FFD700" color="#FFD700" strokeWidth={0} />
        ) : (
          <Star key={i} size={size} color="#FFD700" strokeWidth={1.5} fill="transparent" />
        )
      })}
    </div>
  )
}
