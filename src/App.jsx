import { LanguageProvider } from "./components/LanguageProvider";
import Page from "./PAGE/Page";

const App = () => {
  return (
    <LanguageProvider>
      <Page />
    </LanguageProvider>
  );
};

export default App;
