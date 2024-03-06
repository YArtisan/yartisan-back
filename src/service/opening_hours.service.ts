import openingHoursModelSchema from "../models/opening_hours.model.js";
import { artisantDto } from "./../dto/artisant.dto.js";

async function getOpeningHoursByArtisan(
  artisan_id: string
): Promise<artisantDto> {
  return new Promise((resolve, reject) => {
    openingHoursModelSchema
      .findOne({
        artisant_id: artisan_id,
      })
      .lean()
      .then((e) => resolve(e as artisantDto))
      .catch(reject);
  });
}

export default {
  getOpeningHoursByArtisan,
};
