/* eslint-disable react/prop-types */

function Playlist({ videos }) {
  return (
    <div className="container mx-auto p-4">
      {/* Fixed 3-column grid */}
      <div className="grid grid-cols-3 gap-4">
        {videos.map((video, index) => {
          // Extract the video ID from the embed URL
          // const videoId = video.split("/embed/")[1];
          // Construct the direct YouTube link
          // const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

          const videoId = video.split("/").pop();

          return (
            <a
              key={index}
              href={video}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center p-2 border rounded hover:bg-gray-100"
            >
              <img
                src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`}
                alt={`Video ${index + 1}`}
                className="w-full h-auto"
              />
            </a>
          );
        })}
      </div>
    </div>
  );
}

export default Playlist;
