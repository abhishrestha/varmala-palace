import VenuePage from "../venue-page";
import dictionary from "../dictionaries/en.json";

export default function Page() {
  return <VenuePage dictionary={dictionary} language="en" />;
}
