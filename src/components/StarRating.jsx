import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import PropTypes from "prop-types";

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar className="text-yellow-500" key={`full-${i}`} />);
    }
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt className="text-yellow-500" key="half" />);
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} />);
    }
    return stars;
  };

  return (
    <div className="flex flex-row items-center gap-1 text-sm md:text-xl">
      {renderStars()}
    </div>
  );
};

StarRating.propTypes = {
  rating: PropTypes.number.isRequired,
};

StarRating.defaultProps = {
  rating: 0,
};

export default StarRating;
