import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { Widget, TinyText } from "../AudioBookPlayer/AudioBookStyled.tsx";
import { fetchBookData } from "../../api/book/bookAPI.ts";
import { Box, Typography, IconButton, Slider, Skeleton } from "@mui/material";
import PauseRounded from "@mui/icons-material/PauseRounded";
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";
import styles from "./AudioBookPlayer.module.scss";

const AudioBookPlayer: React.FC = () => {
  const { id } = useParams();
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const {
    data: bookData,
    isLoading,
    isError,
    error,
  } = useQuery(["bookData", id], () => fetchBookData(id!), { enabled: !!id });

  const FormattedText = ({ text }: { text: string }) => {
    // Function to decode the text
    const decodeModelText = (modelText: string) => {
      // Replace escaped newlines and quotes
      let decodedText = modelText.replace(/\\n/g, "\n").replace(/\\"/g, '"');
      return decodedText;
    };

    // Decode the text
    const cleanText = decodeModelText(text);

    return (
      <>
        {cleanText.split("\n").map((line, index) => (
          <React.Fragment key={index}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </>
    );
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !bookData?.audio_link) return;

    // Function to set audio data
    const setAudioData = () => {
      if (audio) {
        setDuration(audio.duration);
      }
    };

    audio.load();

    // Adding event listeners
    audio.addEventListener("loadedmetadata", setAudioData);
    audio.addEventListener("timeupdate", () =>
      setCurrentTime(audio.currentTime)
    );
    audio.addEventListener("ended", () => setIsPlaying(false));

    // Removing event listeners
    return () => {
      audio.removeEventListener("loadedmetadata", setAudioData);
      audio.removeEventListener("timeupdate", () =>
        setCurrentTime(audio.currentTime)
      );
      audio.removeEventListener("ended", () => setIsPlaying(false));
    };
  }, [bookData?.audio_link, id]);

  useEffect(() => {
    // Reset states when bookData changes
    setCurrentTime(0);
    setIsPlaying(false);
  }, [bookData]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (audio) {
      isPlaying ? audio.pause() : audio.play();
      setIsPlaying(!isPlaying);
    }
  };

  const handleSliderChange = (_: any, newValue: number | number[]) => {
    const audio = audioRef.current;
    const newTime = Array.isArray(newValue) ? newValue[0] : newValue;
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

  const getErrorMessage = (err: unknown) => {
    if (err instanceof Error) return err.message;
    return String(err);
  };

  if (isLoading) {
    return (
      <Box className={styles.audioBox}>
        <Widget className={styles.widget}>
          <Box
            sx={{ display: "flex", gap: "35px", width: "100%", height: "60vh" }}
          >
            {/* Skeleton for the Media Player Container */}
            <Box className={styles.mediaPlayerContainer}>
              <Skeleton
                variant="rectangular"
                width={450}
                height={450}
                className={styles.mediaSkeleton}
              />
              <Skeleton variant="text" width={210} height={60} />
              <Skeleton variant="rectangular" width={"90%"} height={60} />
            </Box>

            {/* Skeleton for the Text Container */}
            <Box className={styles.textContainer}>
              <Skeleton variant="text" width={"50%"} height={60} />
              <Skeleton variant="rectangular" width={"58vw"} height={"50vh"} />
            </Box>
          </Box>
        </Widget>
      </Box>
    );
  }
  if (isError) return <div>Error: {getErrorMessage(error)}</div>;

  return (
    <Box
      sx={{
        width: "100%",
        padding: "5vw 8vw",
        marginBottom: "10vh",
        overflow: "hidden",
      }}
    >
      <Widget>
        <audio ref={audioRef} src={bookData?.audio_link} preload="metadata" />
        {/* Main container for media player and text */}
        <Box className={styles.widget}>
          {/* Media Player Container */}
          <Box
            className={styles.mediaPlayerContainer}
            // sx={{
            //   display: "flex",
            //   flexDirection: "column",
            //   alignItems: "center",
            //   maxWidth: "50%",
            //   backgroundColor: "rgba(242,242,242, 0.9)",
            //   borderRadius: "15px",
            //   backdropFilter: "blur(40px)",
            // }}
          >
            <Box className={styles.imgContainer}>
              <img
                src={bookData?.cover_image}
                alt={bookData?.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "35px",
                  padding: "20px",
                }}
              />
            </Box>
            <Typography variant="h5" noWrap sx={{ textAlign: "center" }}>
              {bookData?.title}
            </Typography>
            <Slider
              aria-label="time-indicator"
              size="small"
              value={currentTime}
              min={0}
              step={1}
              max={duration}
              onChange={handleSliderChange}
              sx={{ width: "90%" }}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "90%",
              }}
            >
              <TinyText>{formatDuration(currentTime)}</TinyText>
              <TinyText>-{formatDuration(duration - currentTime)}</TinyText>
            </Box>
            <IconButton
              aria-label={isPlaying ? "pause" : "play"}
              onClick={togglePlayPause}
              sx={{ marginBottom: 4 }}
            >
              {isPlaying ? (
                <PauseRounded fontSize="large" />
              ) : (
                <PlayArrowRounded fontSize="large" />
              )}
            </IconButton>
          </Box>

          {/* Text Container */}
          <Box
            className={styles.textContainer}
            // sx={{
            //   Width: "100%",
            //   overflow: "hidden",
            //   padding: "45px",
            //   backdropFilter: "blur(40px)",
            //   backgroundColor: "rgba(242,242,242, 0.9)",
            //   borderRadius: "20px",
            // }}
          >
            <Typography variant="h4" noWrap sx={{ textAlign: "center" }}>
              {bookData?.title}
            </Typography>
            <Typography
              variant="h6"
              letterSpacing={-0.25}
              className={styles.typographyCustom}
            >
              <FormattedText text={bookData ? bookData.desc : ""} />
            </Typography>
          </Box>
        </Box>
      </Widget>
    </Box>
  );
};

export default AudioBookPlayer;
