/* eslint-disable no-unused-vars */
import {useNavigate, useSearchParams} from 'react-router-dom';
import styles from './Map.module.css';
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import { useState } from 'react';
import { useCities } from '../contexts/CitiesContext';
import { useEffect } from 'react';

function Map() {
  const [mapPosition, setMapPosition] = useState([40, 0])
  const { cities } = useCities()
  
	const [searchParams, setSearchParams] = useSearchParams();
	const mapLat = searchParams.get('lat');
	const mapLng = searchParams.get('lng');

  useEffect(() => {
    if(mapLat && mapLng) setMapPosition([mapLat, mapLng])

  }, [mapLat, mapLng])
  

	return (
		<div
			className={styles.mapContainer}
		>
			<MapContainer center={mapPosition} zoom={5} scrollWheelZoom={true} className={styles.map}>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url='https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
				/>
        {cities.map((city) =>  (
          <Marker position={[city.position.lat, city.position.lng]} key={city.id}>
					<Popup>
						{city.cityName} <br /> {city.emoji} {city.country}
					</Popup>
				</Marker>
        ))}
        <ChangeCenter position={mapPosition}/>
        <DetectClick />
			</MapContainer>
		</div>
	);
}

function ChangeCenter({ position }) {
  const map = useMap()
  map.setView(position)

  return null
}

function DetectClick() {
  const navigate = useNavigate();

  useMapEvents({
    click: e => navigate(`form`)
  })
}

export default Map;
