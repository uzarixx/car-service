import React, {FC} from 'react'
import Link from 'next/link';

interface props {
  city: string
}

const LocationImage: FC<props> = ({ city }) => {
  return (
    <Link href={`https://www.google.com.ua/maps/place/${city}`}
          target={'_blank'}>
      <div>
        <img
          src={'https://www.olx.ua/app/static/media/staticmap.65e20ad98.svg'}
          alt='location' />
      </div>
    </Link>
  )
}

export default LocationImage;