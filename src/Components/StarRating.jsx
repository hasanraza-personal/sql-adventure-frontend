/* eslint-disable react/prop-types */
import { Star } from "lucide-react"; // Using Lucide icons for better UI
import "./css/StarRating.css";

const StarRating = ({ level }) => {
  const maxStars = 4; // Maximum number of stars
  // return (
  //   <div className="flex items-center gap-1">
  //     {[...Array(maxStars)].map((_, index) => (
  //       <Star
  //         key={index}
  //         size={24}
  //         className={`transition-all duration-500 ${
  //           index < level ? "text-yellow-500 fill-yellow-500" : "text-gray-400"
  //         }`}
  //       />
  //     ))}
  //   </div>
  // );

  return (
    <div className="flex items-center gap-1">
      {[...Array(maxStars)].map((_, index) => (
        <Star
          key={index}
          size={40}
          className={`
            transition-transform duration-500 transform 
            ${
              index < level
                ? "text-yellow-500 fill-yellow-500 animate-pop"
                : "text-yellow-500"
            } 
            hover:scale-125
          `}
        />
      ))}
    </div>
  );
};

export default StarRating;
