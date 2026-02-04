import {ObjectId} from "bson";
import {StorageUtil} from "./storage";

export const getLocation = async () => {
  return new Promise<any>((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          resolve({lat: position.coords.latitude, long: position.coords.longitude});
        },
        (error: GeolocationPositionError) => {
          // Error callback
          switch (error.code) {
            case error.PERMISSION_DENIED:
              reject("User denied the request for Geolocation.");
              break;
            case error.POSITION_UNAVAILABLE:
              reject("Location information is unavailable.");
              break;
            case error.TIMEOUT:
              reject("The request to get user location timed out.");
              break;
          }
        },
      );
    } else {
      reject("Geolocation is not supported by this browser.");
    }
  });

};

export const getClientId = () => {
  let clientId = StorageUtil.get("clientId");
  if (!clientId) {
    clientId = (new ObjectId()).toString();
    StorageUtil.set("clientId", clientId);
  }
  return clientId;
};
