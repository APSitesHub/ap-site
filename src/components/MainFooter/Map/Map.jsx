import {
  GoogleMap,
  InfoWindow,
  MarkerF,
  useJsApiLoader,
} from '@react-google-maps/api';
import { useMemo } from 'react';
import { Location, LocationAdress, LocationName } from './Map.styled';

export const Map = () => {
  const sizes = { width: '100%', height: '400px' };

  const center = useMemo(
    () => ({
      lat: 49.86299246943295,
      lng: 24.034402969489403,
    }),
    []
  );

  const marker = {
    lat: 49.86299246943295,
      lng: 24.034402969489403,
  };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
  });

  return (
    <div style={sizes}>
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap
          mapContainerClassName="map-container"
          center={center}
          zoom={17}
        >
          <MarkerF position={marker} title="AP Education Center">
            <InfoWindow position={marker}>
              <Location>
                <LocationName>AP Education Center</LocationName>{' '}
                <LocationAdress href="https://maps.app.goo.gl/mj3W28hhdfHekf8dA">
                  вул. Городницька, 47 Б
                </LocationAdress>
              </Location>
            </InfoWindow>
          </MarkerF>
        </GoogleMap>
      )}
    </div>
  );
};
