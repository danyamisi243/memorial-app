import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator, Animated, Easing } from 'react-native';
import { WebView } from 'react-native-webview';
import LottieView from 'lottie-react-native';
import NetInfo from '@react-native-community/netinfo';

const WEBVIEW_URL = 'https://memorial.base44.app';
const SPLASH_DURATION = 3500; // 3.5 secondes

export default function App() {
  const [isOnline, setIsOnline] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const animationRef = useRef(null);
  const splashOpacity = useRef(new Animated.Value(1)).current;

  const checkConnection = async () => {
    const state = await NetInfo.fetch();
    setIsOnline(state.isConnected);
    return state.isConnected;
  };

  useEffect(() => {
    const initApp = async () => {
      const connected = await checkConnection();

      // Start Lottie animation
      if (animationRef.current) {
        animationRef.current.play();
      }

      // Keep splash screen for at least SPLASH_DURATION
      setTimeout(() => {
        if (connected) {
          setIsLoading(false);
          Animated.timing(splashOpacity, {
            toValue: 0,
            duration: 500, // Fade out duration
            easing: Easing.linear,
            useNativeDriver: true,
          }).start();
        } else {
          setIsLoading(false); // Show offline screen if not connected after splash
        }
      }, SPLASH_DURATION);
    };

    initApp();

    // Subscribe to network changes for real-time updates
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsOnline(state.isConnected);
    });

    return () => unsubscribe();
  }, []);

  const handleRetry = async () => {
    setIsLoading(true);
    const connected = await checkConnection();
    if (connected) {
      setIsLoading(false);
      Animated.timing(splashOpacity, {
        toValue: 0,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
    } else {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <Animated.View style={[styles.splashContainer, { opacity: splashOpacity }]}>
        <LottieView
          ref={animationRef}
          source={require('./assets/animation.json')}
          autoPlay
          loop={false} // Play once for splash
          style={styles.lottieAnimation}
          onAnimationFinish={() => {
            // If still loading after animation finishes, keep it visible
            if (isLoading && isOnline) {
              // This ensures the splash stays for the full duration even if animation is shorter
            }
          }}
        />
        <ActivityIndicator size="large" color="#000000" style={styles.activityIndicator} />
      </Animated.View>
    );
  }

  if (!isOnline) {
    return (
      <View style={styles.offlineContainer}>
        <LottieView
          source={require('./assets/animation.json')}
          autoPlay
          loop // Loop indefinitely for offline screen
          style={styles.lottieAnimationOffline}
        />
        <Text style={styles.offlineTitle}>Oups ! Vous êtes hors ligne</Text>
        <Text style={styles.offlineText}>
          L'application Mémorial requiert une connexion internet pour afficher les données en temps réel.
        </Text>
        <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
          <Text style={styles.retryButtonText}>Réessayer</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: WEBVIEW_URL }}
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        renderLoading={() => (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#000000" />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  lottieAnimation: {
    width: '80%',
    height: '80%',
  },
  activityIndicator: {
    position: 'absolute',
    bottom: 50,
  },
  offlineContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 20,
  },
  lottieAnimationOffline: {
    width: '60%',
    height: '60%',
    marginBottom: 20,
  },
  offlineTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  offlineText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666666',
  },
  retryButton: {
    backgroundColor: '#000000',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  retryButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  webview: {
    flex: 1,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    zIndex: 999,
  },
});
