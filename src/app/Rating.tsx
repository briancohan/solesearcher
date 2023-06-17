interface RatingProps {
    stars: number;
    maxRating?: number;
}

const filledStar = (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24">
        <path fill="currentColor"
            d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2L9.19 8.63L2 9.24l5.46 4.73L5.82 21z" />
    </svg>
)

const outlineStar = (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24">
        <path fill="currentColor"
            d="m22 9.24l-7.19-.62L12 2L9.19 8.63L2 9.24l5.46 4.73L5.82 21L12 17.27L18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27l1-4.28l-3.32-2.88l4.38-.38L12 6.1l1.71 4.04l4.38.38l-3.32 2.88l1 4.28L12 15.4z" />
    </svg>
)

const Rating: React.FC<RatingProps> = ({ stars, maxRating = 3 }) => {

    return <div className="flex">
        {Array.from({ length: stars }, (_, i) => filledStar)}
        {Array.from({ length: maxRating - stars }, (_, i) => outlineStar)}
    </div>
}

export default Rating
