import React, { useEffect, useState } from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Linking,
} from "react-native";
import NeynarLogo from "./components/NeynarLogo";
import WebView, {
  WebViewMessageEvent,
  WebViewNavigation,
} from "react-native-webview";

export interface ISuccessMessage {
  fid: string;
  is_authenticated: boolean;
  signer_uuid: string;
}

export enum Variant {
  NEYNAR = "neynar",
  WARPCAST = "warpcast",
  FARCASTER = "farcaster",
}

enum ButtonText {
  NEYNAR = "Sign in with Neynar",
  WARPCAST = "Connect Warpcast",
  FARCASTER = "Connect Farcaster",
}

interface IProps {
  apiKey: string;
  clientId: string;
  successCallback: (data: ISuccessMessage) => void;
  errorCallback?: (error: any) => void;
  variant?: Variant;
}

export const NeynarSigninButton = ({
  apiKey,
  clientId,
  successCallback,
  errorCallback = () => {},
  variant = Variant.NEYNAR,
}: IProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [authUrl, setAuthUrl] = useState<string | null>(null);
  const [buttonText, setButtonText] = useState<ButtonText>(ButtonText.NEYNAR);

  const handleMessage = (event: WebViewMessageEvent) => {
    const data = JSON.parse(event.nativeEvent.data);
    successCallback(data);
    setModalVisible(false);
  };

  useEffect(() => {
    switch (variant) {
      case Variant.NEYNAR:
        setButtonText(ButtonText.NEYNAR);
        break;
      case Variant.WARPCAST:
        setButtonText(ButtonText.WARPCAST);
        break;
      case Variant.FARCASTER:
        setButtonText(ButtonText.FARCASTER);
        break;
      default:
        setButtonText(ButtonText.NEYNAR);
    }
  }, [variant]);

  const handleOnPress = async () => {
    try {
      const response = await fetch(
        `https://api.neynar.com/v2/farcaster/login/authorize?api_key=${apiKey}&response_type=code&client_id=${clientId}`
      );

      if (!response.ok) throw new Error("Something went wrong");

      const json = await response.json();
      setAuthUrl(json.authorization_url);
      setModalVisible(true);
    } catch (err) {
      errorCallback(err);
      setModalVisible(false);
    }
  };

  return (
    <>
      <TouchableOpacity onPress={handleOnPress} style={styles.signInButton}>
        <NeynarLogo />
        <Text style={styles.signInText}>{buttonText}</Text>
      </TouchableOpacity>
      {modalVisible && (
        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          {authUrl && (
            <WebView
              source={{
                uri: authUrl,
              }}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              scalesPageToFit={true}
              startInLoadingState={true}
              onNavigationStateChange={(navState: WebViewNavigation) =>
                console.log(navState)
              }
              onMessage={handleMessage}
              originWhitelist={["*"]}
              onShouldStartLoadWithRequest={(event) => {
                if (event.url.match(/(https:\/\/)|(http:\/\/)/)) {
                  return true;
                }
                Linking.openURL(event.url).catch((err) =>
                  console.error("MP: An error occurred", err)
                );
                return false;
              }}
            />
          )}
        </Modal>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  signInButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginBottom: 24,
    minWidth: 218,
    width: 218,
  },
  signInText: { fontSize: 16, fontWeight: "300", marginLeft: 10 },
});
