import React, { useContext, useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import { ThemeContext } from 'styled-components';
import { usePlayer } from '../../contexts/PlayerContext';

import convertDurationToTimeString from '../../utils/convertDurationToTimeString';

import {
  Container,
  PlayingEpisode,
  EmptyPlayer,
  Progress,
  SliderContainer,
  EmptySlider,
  Buttons,
  Button,
  PlayButton,
} from './styles';

const Player: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [progress, setProgress] = useState(0);

  const theme = useContext(ThemeContext);

  const {
    episodeList,
    currentEpisodeIndex,
    isPlaying,
    isLooping,
    isShuffling,
    togglePlay,
    toggleLoop,
    toggleShuffle,
    setPlayingState,
    playNext,
    playPrevious,
    hasNext,
    hasPrevious,
    clearPlayerState,
  } = usePlayer();

  useEffect(() => {
    if (!audioRef.current) {
      return;
    }
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  function setupProgressListener() {
    audioRef.current.currentTime = 0;

    audioRef.current.addEventListener('timeupdate', () => {
      setProgress(Math.floor(audioRef.current.currentTime));
    });
  }

  function handleSeek(amount: number) {
    audioRef.current.currentTime = amount;
    setProgress(amount);
  }

  function handleEpisodeEndend() {
    if (hasNext) {
      playNext();
    } else {
      clearPlayerState();
    }
  }

  const episode = episodeList[currentEpisodeIndex];

  return (
    <Container hasEpisodePlaying={!episode}>
      <header>
        <img src="/playing.svg" alt="Tocando agora" />
        <strong>Tocando agora</strong>
      </header>

      {episode ? (
        <PlayingEpisode>
          <Image
            width={592}
            height={592}
            src={episode.thumbnail}
            objectFit="cover"
          />
          <strong>{episode.title}</strong>
          <strong>{episode.members}</strong>
        </PlayingEpisode>
      ) : (
        <EmptyPlayer>
          <strong>Selecione um podcast para ouvir</strong>
        </EmptyPlayer>
      )}

      <footer>
        <Progress>
          <span>{convertDurationToTimeString(progress)}</span>
          <SliderContainer>
            {episode ? (
              <Slider
                max={episode.duration}
                value={progress}
                onChange={handleSeek}
                trackStyle={{ backgroundColor: '#04D361' }}
                railStyle={
                  theme.title === 'light'
                    ? { backgroundColor: '#9F75FF' }
                    : { backgroundColor: '#333333' }
                }
                handleStyle={{ borderColor: '#04D361', borderWidth: 4 }}
              />
            ) : (
              <EmptySlider />
            )}
          </SliderContainer>
          <span>{convertDurationToTimeString(episode?.duration ?? 0)}</span>
        </Progress>

        {episode && (
          <audio
            src={episode.url}
            ref={audioRef}
            autoPlay
            onEnded={handleEpisodeEndend}
            loop={isLooping}
            onPlay={() => setPlayingState(true)}
            onPause={() => setPlayingState(false)}
            onLoadedMetadata={setupProgressListener}
          />
        )}

        <Buttons>
          <Button
            type="button"
            disabled={!episode || episodeList.length === 1}
            onClick={toggleShuffle}
            isShuffling={isShuffling}
          >
            <img src="/shuffle.svg" alt="Aleatório" />
          </Button>

          <Button
            type="button"
            disabled={!episode || !hasPrevious}
            onClick={playPrevious}
          >
            <img src="/play-previous.svg" alt="Tocar anterior" />
          </Button>

          <PlayButton type="button" disabled={!episode} onClick={togglePlay}>
            {isPlaying ? (
              <img src="/pause.svg" alt="Pausar" />
            ) : (
              <img src="/play.svg" alt="Tocar" />
            )}
          </PlayButton>

          <Button
            type="button"
            disabled={!episode || !hasNext}
            onClick={playNext}
          >
            <img src="/play-next.svg" alt="Tocar próxima" />
          </Button>

          <Button
            type="button"
            disabled={!episode}
            onClick={toggleLoop}
            isLooping={isLooping}
          >
            <img src="/repeat.svg" alt="Repetir" />
          </Button>
        </Buttons>
      </footer>
    </Container>
  );
};

export default Player;
