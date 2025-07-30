export enum ImageAspectRatio {
  "_1_1" = "1_1",
  "_16_9" = "16_9",
  "_3_1" = "3_1",
  "_4_3" = "4_3",
  "_21_9" = "21_9",
}

export default function formatImageAspectRatio(
  imageAspectRatio: ImageAspectRatio = ImageAspectRatio._1_1
) {
  const width = imageAspectRatio.split("_")[0];
  const height = imageAspectRatio.split("_")[1];

  return { width, height };
}
