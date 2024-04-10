import { Box, Button, Input, InputField, Text } from "@gluestack-ui/themed"
import { useAuth } from "../../hooks/auth"

export default function Login() {
  const auth = useAuth()
  
  return (
    <Box width="90%">
      <Input variant="outline" size="md">
        <InputField placeholder="E-mail" onChangeText={(text) => auth.setUser({ ...auth.user, email: text })} />
      </Input>
      
      <Input variant="outline" size="md" mt={10}>
        <InputField placeholder="Senha" type="password" onChangeText={(text) => auth.setUser({ ...auth.user, password: text })} />
      </Input>

      <Button mt={10} onPress={auth.handleLogin}>
        <Text color="white">Entrar</Text>
      </Button>
    </Box>
  );
}
