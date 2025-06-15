import IconList from '../../assets/IconList'
import IconVolume from '../../assets/IconVolume'

interface VolumeControlProps {
    volume: number;
    onChange: (value: number) => void;
}
const FooterVolume = ({ volume, onChange }: VolumeControlProps) => {

    return (
        <div className='flex gap-8 w-[60%] items-center justify-center text-start'>
            <IconList color='white' className=' cursor-pointer' width={18} height={18} />
            <div className='flex items-center'>
                <IconVolume color='white' className=' cursor-pointer' width={18} height={18} />
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}

                    onChange={(e) => { onChange(Number(e.target.value)) }}
                    className="w-full h-1 bg-gray-300 cursor-pointer  accent-green-500"
                />
            </div>
        </div>
    )
}

export default FooterVolume


