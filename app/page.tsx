import Image from "next/image";
import story from "@/data/the-town--scenes.json";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-start justify-start p-24">
      <h1 className="text-xl mb-1">Story: {story.title}</h1>
      <p className="text-sm">Scene count: {story.scenes.length}</p>
      <div className="flex flex-col gap-8 mt-8">
        {story.scenes.map(({ scene, ...sceneData }, index) => {
          const startAtSeconds = convertToSeconds(sceneData.startAt);
          const endAtSeconds = convertToSeconds(sceneData.endAt);
          const sceneLengthInSeconds = endAtSeconds - startAtSeconds;
          return (
            <div key={scene} className="bg-gray-200 p-4 flex flex-col gap-4">
              <p className="text-sm">
                #{index + 1} {sceneData.name}
              </p>
              <p className="text-xs">
                {sceneData.startAt} - {sceneData.endAt} / {sceneLengthInSeconds}
                s
              </p>
              <p
                className="text-xs bg-gray-300 px-2 text-gray-500"
                style={{ minHeight: `${sceneLengthInSeconds}px` }}
              ></p>
            </div>
          );
        })}
      </div>
    </main>
  );
}

function convertToSeconds(input: string) {
  // Define the regex pattern
  const pattern = /^(\d+)m (\d+)s$/;
  // Match the input string against the pattern
  const match = input.match(pattern);

  // Check if the input matches the pattern
  if (!match) {
    throw new Error("Input does not match the required format");
  }

  // Capture the minutes and seconds from the match groups
  let minutesText = match[1];
  let secondsText = match[2];

  // Trim leading zeros and whitespace, and convert to numbers
  const minutes = Number(trimLeadingZeros(minutesText.trim()));
  const seconds = Number(trimLeadingZeros(secondsText.trim()));

  // Convert minutes to seconds and add the seconds
  const totalSeconds = minutes * 60 + seconds;

  return totalSeconds;
}

// Function to trim leading zeros
function trimLeadingZeros(value: string) {
  let trimmed = value.replace(/^0+/, "");
  return trimmed === "" ? "0" : trimmed;
}
