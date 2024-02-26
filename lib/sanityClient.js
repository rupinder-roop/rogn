import sanityClient from "@sanity/client";

export const client = sanityClient({
  projectId: "ybgip3si",
  dataset: "production",
  apiVersion: "2024-02-27",
  token:
    "skByBuL0Uuz4xGKMefF0R5wx5rR0DocSibcLNVJONNR01hwQ4RZ0sT3CQj5D5uLwbJ8kzOgBazO3FN0pentXsigIQg6IAQ56j7LSiVBAnheT3pwwyNAUTUZsm02VinqFMSBprWr23Krsp1OZDrXDM52pwEjQm9YntJRhPDlLphu1vg7Bxqjn",
  useCdn: false,
});
