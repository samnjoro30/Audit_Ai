
import { Storage } from "@google-cloud/storage";

const storage = new Storage({
  projectId: process.env.GCLOUD_PROJECT_ID,
  keyFilename: process.env.GCS_KEY_FILE
});

export const bucket = storage.bucket(process.env.GCS_BUCKET);
