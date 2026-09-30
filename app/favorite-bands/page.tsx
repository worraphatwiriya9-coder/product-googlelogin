import BandExplorer from "../components/BandExplorer";
import { bands } from "../data/bands";

export default function FavoriteBands() {
  return (
    <main>
      <h1>Favorite Bands</h1>
      <BandExplorer bands={bands} />
    </main>
  );
}
