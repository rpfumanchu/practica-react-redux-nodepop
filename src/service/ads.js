import client from "../api/client";

const adsUrl = "/api/v1/adverts";

export const getAds = () => {
  return client.get(adsUrl);
};

export const getAd = id => {
  const url = `${adsUrl}/${id}`;

  return client.get(url);
};

export const getForm = form => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  return client.postForm(adsUrl, form, config);
};

export const getTags = () => {
  const url = `${adsUrl}/tags`;
  return client.get(url);
};

export const deleteAd = id => {
  const url = `${adsUrl}/${id}`;
  return client.delete(url);
};
