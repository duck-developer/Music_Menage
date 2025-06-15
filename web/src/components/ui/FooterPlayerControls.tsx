import IconActive from './IconActive'
import { PauseCircle, PlayCircle, SkipBack, SkipForward } from 'phosphor-react'
import useMusicControls from '../../utils/utilsMusicControls'
import FooterQueue from './FooterVolume'
import { useContext } from 'react'
import { Context } from '../../context/Context'

const PlayerControls = () => {

  const { audioRef, volume, handleVolumeChange, FormatTime, handleLoadedTotalTime, handleTimeUpdate, currentTime, duration, handleSeek, togglePlayPause, isPlaying } = useMusicControls()

  const { activePlaying } = useContext(Context)

  return (
    <div className=' flex w-[70%]  justify-between'>
      <div className='flex flex-col items-center  w-full h-full gap-1'>
        <div className='flex justify-center gap-6 w-full items-center'>
          <IconActive className='cursor-pointer' icon={SkipBack} active={true} size={25} color='white' />
          <button className='rounded-full' type="button"
            onClick={togglePlayPause}>
            <IconActive className='cursor-pointer' icon={isPlaying ? PauseCircle : PlayCircle} active={true} size={50} color='white' />
          </button>
          <IconActive className='cursor-pointer' icon={SkipForward} active={true} size={25} color='white' />
        </div>

        <div className='flex items-center px-2 w-full'>
          <p className='mr-2 text-white'>{FormatTime(currentTime)}</p>

          <input type='range' min={"0"} max={duration} value={currentTime}
            onChange={(e) => handleSeek(Number(e.target.value))}
            className='w-full cursor-pointer h-[0.35rem] accent-green-600' />

          <p className='ml-2 text-white'>{FormatTime(duration)}</p>
          <audio
            ref={audioRef}
            src={activePlaying?.mp3}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedTotalTime}
            onPlay={()=>true}
          />
        </div>
      </div>
      <FooterQueue volume={volume} onChange={handleVolumeChange} />
    </div>

  );
}

export default PlayerControls;
