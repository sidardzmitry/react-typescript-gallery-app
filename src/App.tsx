import { FC } from "react";
import { Container } from "./components/Container";
import { GalleryArt } from "./components/GalleryArt";
import { photos } from "./data";

const App: FC = () => {
  return (
    <Container>
      <GalleryArt photos={photos} />
    </Container>
  );
};

export default App;
