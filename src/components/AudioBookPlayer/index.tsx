import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, IconButton, Slider, styled } from "@mui/material";
import PauseRounded from "@mui/icons-material/PauseRounded";
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";


// Styled components
const Widget = styled("div")(({ theme }) => ({
  padding: 16,
  borderRadius: 16,
  width: "100%",
  maxWidth: "100%",
  margin: "auto",
  position: "relative",
  zIndex: 1,
  backgroundColor:
    theme.palette.mode === "dark" ? "rgba(0,0,0,0.6)" : "rgba(255,255,255, 0.5)",
  backdropFilter: "blur(40px)",
}));

const TinyText = styled(Typography)({
  fontSize: "0.75rem",
  opacity: 0.38,
  fontWeight: 500,
  letterSpacing: 0.2,
});

// Main component
const AudioBookPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;

    const setAudioData = () => {
      if (audio) {
        setDuration(audio.duration);
      }
    };

    const setAudioTime = () => setCurrentTime(audio ? audio.currentTime : 0);

    const handleAudioEnd = () => setIsPlaying(false); // Handler for audio end

    if (audio) {
      audio.addEventListener("loadeddata", setAudioData);
      audio.addEventListener("timeupdate", setAudioTime);
      audio.addEventListener("ended", handleAudioEnd); // Listen for audio end
    }

    return () => {
      if (audio) {
        audio.removeEventListener("loadeddata", setAudioData);
        audio.removeEventListener("timeupdate", setAudioTime);
        audio.removeEventListener("ended", handleAudioEnd); // Clean up
      }
    };
  }, []);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (audio) {
      isPlaying ? audio.pause() : audio.play();
      setIsPlaying(!isPlaying);
    }
  };

  const handleSliderChange = (_event: Event, newValue: number | number[]) => {
    const audio = audioRef.current;
    const newTime = typeof newValue === "number" ? newValue : newValue[0];
    if (audio) {
      audio.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  function formatDuration(value: number) {
    const minute = Math.floor(value / 60);
    const secondLeft = Math.round(value - minute * 60);
    return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
  }

  return (
    <Box sx={{ width: "100%", padding: "5vw 10vw", overflow: "hidden" }}>
      <Widget>
        <audio ref={audioRef} src="src/assets/audio/a.mp3" preload="metadata" />
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box
            sx={{
              width: 450,
              height: 550,
              overflow: "hidden",
              borderRadius: "15px",
              marginRight: "1rem",
            }}
          >
            <img
              src="src/assets/images/sample-a.webp"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Box>
          <Box sx={{ ml: 1.5, minWidth: 0 }}>
            <Typography variant="h4" noWrap>
              The brave little star
            </Typography>
            <Typography variant="h6" letterSpacing={-0.25} sx={{ width: "50vw" }}>
            Once upon a time, in a twinkling night sky, 
            there was a small star named Twink.
            Twink felt tiny and dim compared to the other stars. 
            He wished he could be brighter. 
            One evening, the wise Moon noticed 
            Twink's sadness and said, 
            Twink, every star is special. 
            Your gentle glow is just what some people need. 
            Encouraged, Twink tried to shine his best. 
            That night, a little girl on Earth looked up and saw Twink. 
            Look, Mommy, that star is shining just for me! she exclaimed.
            Twink realized that even as a small star, 
            he could make a big difference to someone. 
            From then on, Twink shone happily every night, 
            knowing he was important just the way he was.
            Your gentle glow is just what some people need. 
            Encouraged, Twink tried to shine his best. 
            That night, a little girl on Earth looked up and saw Twink. 
            Look, Mommy, that star is shining just for me! she exclaimed.
            Twink realized that even as a small star, 
            he could make a big difference to someone. 
            From then on, Twink shone happily every night, 
            knowing he was important just the way he was.
            </Typography>
          </Box>
        </Box>
        <Slider
          aria-label="time-indicator"
          size="small"
          value={currentTime}
          min={0}
          step={1}
          max={duration}
          onChange={handleSliderChange}
          sx={{
            color: "#FDCC64",
            height: 4,
            "& .MuiSlider-thumb": {
              width: 8,
              height: 8,
              backgroundColor: "#FDCC64",
              transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
              "&:hover, &.Mui-focusVisible, &.Mui-active": {
                width: 20,
                height: 20,
              },
            },
            "& .MuiSlider-track": {
              backgroundColor: "#FDCC64",
            },
            "& .MuiSlider-rail": {
              opacity: 0.28,
              backgroundColor: "#FDCC64",
            },
          }}
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mt: -2,
          }}
        >
          <TinyText>{formatDuration(currentTime)}</TinyText>
          <TinyText>-{formatDuration(duration - currentTime)}</TinyText>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mt: -1,
          }}
        >
          <IconButton
            aria-label={isPlaying ? "pause" : "play"}
            onClick={togglePlayPause}
          >
            {isPlaying ? (
              <PauseRounded fontSize="large" />
            ) : (
              <PlayArrowRounded fontSize="large" />
            )}
          </IconButton>
        </Box>
      </Widget>
    </Box>
  );
}

export default AudioBookPlayer;