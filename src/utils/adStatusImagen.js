import Photo from "../components/shared/DefaultPhoto";

export function adStatusImage(ad) {
  if (ad.photo === null) {
    ad.photo = Photo;
  }
}
