interface IconListProps {
    className?: string;
    width?: number;
    height?: number;
    color?: string;
}

const IconList = ({ className, width = 24, height = 24, color = 'black' }: IconListProps) => {
    return (
        <svg
            className={className}
            viewBox="0 0 16 16"
            width={width}
            height={height}
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M15 15H1v-1.5h14V15zm0-4.5H1V9h14v1.5zm-14-7A2.5 2.5 0 0 1 3.5 1h9a2.5 2.5 0 0 1 0 5h-9A2.5 2.5 0 0 1 1 3.5zm2.5-1a1 1 0 0 0 0 2h9a1 1 0 1 0 0-2h-9z"
                fill={color}
            />
        </svg>
    )
}
export default IconList 
{/* <svg data-encore-id="icon" role="presentation" aria-label="Volume alto" aria-hidden="false" class="e-9640-icon" id="volume-icon" viewBox="0 0 16 16" style="--encore-icon-height: var(--encore-graphic-size-informative-smaller); --encore-icon-width: var(--encore-graphic-size-informative-smaller);"><path d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.642 3.642 0 0 1-1.33-4.967 3.639 3.639 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.139 2.139 0 0 0 0 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 4.29V5.56a2.75 2.75 0 0 1 0 4.88z"></path><path d="M11.5 13.614a5.752 5.752 0 0 0 0-11.228v1.55a4.252 4.252 0 0 1 0 8.127v1.55z"></path></svg> */}