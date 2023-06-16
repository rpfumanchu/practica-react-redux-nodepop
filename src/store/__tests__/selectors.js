import { getAdId, getAllAds } from "../selectors";

describe("getAdID", () => {
  test("should return an ads by adsID", () => {
    const id = "1as5";
    const ads = [{ id: id }];
    const state = { ads: { data: ads } };
    //NOTE espero que me devuelva mi primer ads
    expect(getAdId(id)(state)).toBe(ads[0]);
  });

  test("should not return any ads", () => {
    const id = "1as5";
    const ads = [];
    const state = { ads: { data: ads } };
    //NOTE espero que me devuelva mi primer ads
    expect(getAdId(id)(state)).toBeUndefined();
  });
  describe("getAllAds", () => {
    test("should return all ads if areLoaded is true", () => {
      const ads = [
        { id: "1", name: "Ad 1" },
        { id: "2", name: "Ad 2" },
      ];
      const state = { ads: { areLoaded: true, data: ads } };
      //NOTE Espero que me devuelva todos los anuncios
      expect(getAllAds(state)).toEqual(ads);
    });

    test("should return an empty array if areLoaded is false", () => {
      const state = { ads: { areLoaded: false, data: [] } };
      //NOTE Espero que me devuelva un array vacío
      expect(getAllAds(state)).toEqual([]);
    });
  });
});
