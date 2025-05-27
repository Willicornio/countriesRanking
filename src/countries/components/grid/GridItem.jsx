import { Link } from 'react-router-dom'

export const GridItem = ({country}) => {
  return (
    <>
    <Link to={`/details/${country?.cca2}`}>
        <div
          key={country?.name?.common}
          className="grid grid-cols-5 py-2 px-4 item-center text-white hover:bg-gray-700 transtition duration-200"
        >
          <img alt={country?.name?.common} src={country?.flags?.png} className="w-16 h-auto"></img>

          <div>{country?.name?.common}</div>
          <div>{country?.population}</div>
          <div>{country?.area}</div>
          <div>{country?.region}</div>
        </div>
        </Link>
    </>
  )
}

