import { Formik } from 'formik';
import * as yup from 'yup';
import { Label } from 'components/LeadForm/LeadForm.styled';
import { LoginFormText } from 'components/Stream/Stream.styled';
import {
  AdminFormBtn,
  AdminInput,
  AdminInputNote,
} from 'pages/Streams/AdminPanel/AdminPanel.styled';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  GradientBackground,
  LoginForm,
  LoginMediaContainer,
  LoginMediaFields,
  LoginPage,
  LoginVideo,
  LoginSelect,
} from '../Videochat.styled';

function Login({ logined }) {
  const localMediaStream = useRef(null);
  const videoRef = useRef(null);
  const [microphoneDevices, setMicrophoneDevices] = useState([]);
  const [audioDevices, setAudioDevices] = useState([]);
  const [cameraDevices, setCameraDevices] = useState([]);
  const [volume, setVolume] = useState(0);

  const initialLoginValues = {
    userName: '',
  };

  const startCapture = useCallback(async () => {
    await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });

    const devices = await navigator.mediaDevices.enumerateDevices();

    const defaultMicrophoneDevice =
      getDevice('audioinput') ||
      localStorage.setItem(
        'default-audioinput',
        devices.filter(device => device.kind === 'audioinput')[0].deviceId
      );

    const defaultAudioDevice =
      getDevice('audiooutput') ||
      localStorage.setItem(
        'default-audiooutput',
        devices.filter(device => device.kind === 'audiooutput')[0].deviceId
      );
    console.log(defaultAudioDevice);

    const defaultCameraDevice =
      getDevice('videoinput') ||
      localStorage.setItem(
        'default-videoinput',
        devices.filter(device => device.kind === 'videoinput')[0].deviceId
      );

    localMediaStream.current = await navigator.mediaDevices.getUserMedia({
      audio: { deviceId: { exact: defaultMicrophoneDevice } },
      video: { deviceId: { exact: defaultCameraDevice } },
    });

    if (videoRef.current && localMediaStream.current) {
      videoRef.current.srcObject = localMediaStream.current;
    }

    setMicrophoneDevices(
      devices
        .filter(device => device.kind === 'audioinput')
        .map(device => ({ label: device.label, value: device.deviceId }))
    );
    setAudioDevices(
      devices
        .filter(device => device.kind === 'audiooutput')
        .map(device => ({ label: device.label, value: device.deviceId }))
    );
    setCameraDevices(
      devices
        .filter(device => device.kind === 'videoinput')
        .map(device => ({ label: device.label, value: device.deviceId }))
    );
  }, []);

  useEffect(() => {
    startCapture();

    let audioContext;
    let analyser;
    let microphone;
    let dataArray;
    let animationFrameId;

    const initAudio = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        analyser = audioContext.createAnalyser();
        analyser.fftSize = 256;
        const bufferLength = analyser.frequencyBinCount;
        dataArray = new Uint8Array(bufferLength);

        microphone = audioContext.createMediaStreamSource(stream);
        microphone.connect(analyser);

        const updateVolume = () => {
          analyser.getByteFrequencyData(dataArray);
          const avg = dataArray.reduce((a, b) => a + b, 0) / bufferLength;
          setVolume(Math.round((avg / 255) * 100));
          animationFrameId = requestAnimationFrame(updateVolume);
        };

        updateVolume();
      } catch (error) {
        console.error('Помилка доступу до мікрофона:', error);
      }
    };

    initAudio();

    return () => {
      if (audioContext) audioContext.close();
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [startCapture]);

  const getDevice = kind => {
    return localStorage.getItem(`default-${kind}`);
  };

  const handleDeviceSelect = async (deviceId, kind) => {
    localStorage.setItem(`default-${kind}`, deviceId);

    if (kind === 'audiooutput') {
      return;
    }

    localMediaStream.current = await navigator.mediaDevices.getUserMedia({
      audio: { deviceId: { exact: getDevice('audioinput') } },
      video: { deviceId: { exact: getDevice('videoinput') } },
    });

    if (videoRef.current && localMediaStream.current) {
      videoRef.current.srcObject = localMediaStream.current;
    }
  };

  const loginSchema = yup.object().shape({
    userName: yup.string().required("Введи ім'я та прізвище"),
  });

  return (
    <GradientBackground>
      <LoginPage>
        <LoginMediaContainer>
          <LoginVideo ref={videoRef} autoPlay></LoginVideo>
          <LoginMediaFields>
            <LoginSelect
              name="micro"
              id="micro"
              key="micro"
              onChange={e => handleDeviceSelect(e.target.value, 'audioinput')}
              value={localStorage.getItem('default-audioinput')}
            >
              {microphoneDevices.map(device => (
                <option key={device.value} value={device.value}>
                  {device.label}
                </option>
              ))}
            </LoginSelect>
            <LoginSelect
              name="audio"
              id="audio"
              key="audio"
              onChange={e => handleDeviceSelect(e.target.value, 'audiooutput')}
              value={localStorage.getItem('default-audiooutput')}
            >
              {audioDevices.map(device => (
                <option key={device.value} value={device.value}>
                  {device.label}
                </option>
              ))}
            </LoginSelect>
            <LoginSelect
              name="camera"
              id="camera"
              key="camera"
              onChange={e => handleDeviceSelect(e.target.value, 'videoinput')}
              value={localStorage.getItem('default-videoinput')}
            >
              {cameraDevices.map(device => (
                <option key={device.value} value={device.value}>
                  {device.label}
                </option>
              ))}
            </LoginSelect>

            <div
              style={{
                width: '100%',
                height: '20px',
                background: '#ddd',
                position: 'relative',
                borderRadius: '5px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${volume}%`,
                  height: '100%',
                  background: '#0f645b',
                  transition: 'width 0.1s',
                }}
              ></div>
            </div>
          </LoginMediaFields>
        </LoginMediaContainer>
        <Formik
          initialValues={initialLoginValues}
          onSubmit={logined}
          validationSchema={loginSchema}
        >
          <LoginForm>
            <LoginFormText style={{ color: 'white' }}>
              Привіт!
              <br />
              Введи своє ім'я та прізвище для доступу до заняття
            </LoginFormText>
            <Label>
              <AdminInput type="text" name="userName" placeholder="Ім'я та прізвище" />
              <AdminInputNote component="p" name="userName" type="text" style={{ color: 'red' }}/>
            </Label>
            <AdminFormBtn type="submit">Увійти</AdminFormBtn>
          </LoginForm>
        </Formik>
      </LoginPage>
    </GradientBackground>
  );
}

export default Login;
