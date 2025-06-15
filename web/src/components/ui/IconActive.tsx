import React from 'react'

interface Props{
    icon:React.ElementType,
    color?:string,
    size?:number,
    active:boolean,
    className?:string
}
const IconActive = ({icon:Icon,size,active,color, className}:Props) => {
  return <Icon className={className} size={size} color={color} weight= {active ? "fill" : "regular"} />
}

export default IconActive