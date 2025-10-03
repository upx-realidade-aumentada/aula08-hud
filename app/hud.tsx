import { CameraView, useCameraPermissions } from "expo-camera";
import { useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

export default function HUD() {
  const [permission, requestPermission] = useCameraPermissions();
  const [showHUD, setShowHUD] = useState(true);

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, [permission]);

  if (!permission) {
    return (
      <View style={styles.center}>
        <Text>Carregando permissões...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text>Permita acesso à câmera para continuar</Text>
        <TouchableOpacity onPress={requestPermission} style={styles.button}>
          <Text style={styles.buttonText}>Permitir</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      {/* Fundo da câmera */}
      <CameraView style={StyleSheet.absoluteFill} />

      {/* HUD sobreposto */}
      {showHUD && (
        <View style={styles.hud}>
          <Text style={styles.hudText}>🌡️ Temperatura: 22ºC</Text>
          <Text style={styles.hudText}>📏 Distância: 5.3m</Text>
          <Text style={styles.hudText}>✅ Status: Ativo</Text>
        </View>
      )}

      <TouchableOpacity
        style={styles.toggleButton}
        onPress={() => setShowHUD(!showHUD)}
      >
        <Text style={styles.buttonText}>
          {showHUD ? "Ocultar HUD" : "Mostrar HUD"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  hud: {
    position: "absolute",
    top: 60,
    left: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 12,
    borderRadius: 10,
  },
  hudText: {
    color: "#00FFAA",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  toggleButton: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
    backgroundColor: "#222",
    padding: 12,
    borderRadius: 10,
  },
  button: {
    backgroundColor: "#222",
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
