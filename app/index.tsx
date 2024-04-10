import { GluestackUIProvider, Box } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import Login from "../components/login";

export default function App() {
  return (
    <Box justifyContent="center" alignItems="center" flex={1}>
      <Login />
    </Box>
  );
}
