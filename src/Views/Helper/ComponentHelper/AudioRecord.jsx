import React, { useState, useRef, useEffect } from "react";
import { FaMicrophone, FaPause, FaPlay, FaTrash, FaUpload, FaStop } from "react-icons/fa";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { v4 } from "uuid";
import { imageDB } from "../../../Configs/Firebase/firebaseConfig";
import styles from "./AudioRecorder.module.scss";

const AudioRecorder = ({ setFormData, formData }) => {
    const [recording, setRecording] = useState(false);
    const [paused, setPaused] = useState(false);
    const [audioURL, setAudioURL] = useState(null);
    const [audioBlob, setAudioBlob] = useState(null);
    const mediaRecorder = useRef(null);
    const audioChunks = useRef([]);
    const canvasRef = useRef(null);
    const animationRef = useRef(null);
    const audioContextRef = useRef(null);
    const analyserRef = useRef(null);
    const dataArrayRef = useRef(null);
    const sourceRef = useRef(null);

    // Start Recording
    const startRecording = async () => {
        setRecording(true);
        setPaused(false);
        setAudioURL(null);
        setAudioBlob(null);
        setFormData({ ...formData, audio_url: "" }); // Remove previous audio

        audioChunks.current = [];

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorder.current = new MediaRecorder(stream);
            audioContextRef.current = new AudioContext();
            sourceRef.current = audioContextRef.current.createMediaStreamSource(stream);
            analyserRef.current = audioContextRef.current.createAnalyser();
            sourceRef.current.connect(analyserRef.current);
            analyserRef.current.fftSize = 512;

            const bufferLength = analyserRef.current.frequencyBinCount;
            dataArrayRef.current = new Uint8Array(bufferLength);

            drawWaveform(); // Start visualization

            mediaRecorder.current.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunks.current.push(event.data);
                }
            };

            mediaRecorder.current.onstop = () => {
                const audioBlob = new Blob(audioChunks.current, { type: "audio/mp3" });
                const audioURL = URL.createObjectURL(audioBlob);
                setAudioURL(audioURL);
                setAudioBlob(audioBlob);
                cancelAnimationFrame(animationRef.current);
            };

            mediaRecorder.current.start();
        } catch (error) {
            console.error("Error accessing microphone:", error);
            setRecording(false);
        }
    };

    // Draw Audio Waveform
    const drawWaveform = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        const renderFrame = () => {
            if (!analyserRef.current) return;

            analyserRef.current.getByteFrequencyData(dataArrayRef.current);

            ctx.fillStyle = "#f8f9fa";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.lineWidth = 2;
            ctx.strokeStyle = "#007bff";

            ctx.beginPath();
            const sliceWidth = (canvas.width * 1.0) / dataArrayRef.current.length;
            let x = 0;

            for (let i = 0; i < dataArrayRef.current.length; i++) {
                const v = dataArrayRef.current[i] / 255.0;
                const y = v * canvas.height;

                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
                x += sliceWidth;
            }
            ctx.stroke();
            animationRef.current = requestAnimationFrame(renderFrame);
        };

        animationRef.current = requestAnimationFrame(renderFrame);
    };


    // Pause Recording
    const pauseRecording = () => {
        if (mediaRecorder.current && mediaRecorder.current.state === "recording") {
            mediaRecorder.current.pause();
            setPaused(true);
            cancelAnimationFrame(animationRef.current); // Stop wave animation
        }
    };

    // Resume Recording
    const resumeRecording = () => {
        if (mediaRecorder.current && mediaRecorder.current.state === "paused") {
            mediaRecorder.current.resume();
            setPaused(false);
            drawWaveform(); // Restart waveform visualization
        }
    };

    // Stop Recording
    const stopRecording = () => {
        setRecording(false);
        setPaused(false);
        if (mediaRecorder.current && mediaRecorder.current.state !== "inactive") {
            mediaRecorder.current.stop();
        }
    };

    // Upload Recorded Audio to Firebase
    const uploadAudio = async () => {
        if (!audioBlob) return;

        const audioRef = ref(imageDB, `AudioFiles/${v4()}.mp3`);
        const audioBuffer = await audioBlob.arrayBuffer();
        const audioFile = new Uint8Array(audioBuffer);

        try {
            await uploadBytes(audioRef, audioFile);
            const downloadURL = await getDownloadURL(audioRef);
            setFormData({ ...formData, audio_url: downloadURL });
            setAudioURL(downloadURL);
            console.log("Audio uploaded successfully:", downloadURL);
        } catch (error) {
            console.error("Error uploading audio:", error);
        }
    };

    // Delete Audio from Firebase and UI
    const deleteAudio = async () => {
        setAudioBlob(null);
        setRecording(false);
        if (!formData.audio_url) return;

        const audioRef = ref(imageDB, formData.audio_url);
        try {
            await deleteObject(audioRef);
            setAudioURL(null);
            setAudioBlob(null);
            setRecording(false);
            setFormData({ ...formData, audio_url: "" });
            console.log("Audio deleted successfully");
        } catch (error) {
            console.error("Error deleting audio:", error);
        }
    };

    return (
        <div className={styles.audioRecorder}>
            <div className={styles.controls}>
                {!recording ? (
                    <div className={styles.recordBtn} onClick={startRecording}>
                        <FaMicrophone />
                    </div>
                ) : paused ? (
                    <div className={styles.resumeBtn} onClick={resumeRecording}>
                        <FaPlay /> Resume
                    </div>
                ) : (
                    <div className={styles.pauseBtn} onClick={pauseRecording}>
                        <FaPause /> Pause
                    </div>
                )}
                {recording && (
                    <div className={styles.stopBtn} onClick={stopRecording}>
                        <FaStop /> Stop
                    </div>
                )}
            </div>

            {recording && <canvas ref={canvasRef} className={styles.waveform}></canvas>}


            {!recording && audioBlob && (
                <div className={styles.actions}>
                    <div className={styles.uploadBtn} onClick={uploadAudio}>
                        <FaUpload /> Upload
                    </div>
                </div>
            )}

            {!recording && audioURL && (
                <div className={styles.audioPreview}>
                    <audio controls>
                        <source src={audioURL} type="audio/mp3" />
                        Your browser does not support the audio tag.
                    </audio>
                    {/* {formData.audio_url && ( */}
                    <FaTrash className={styles.deleteBtn} onClick={deleteAudio} />
                    {/* )} */}
                </div>
            )}
        </div>
    );
};

export default AudioRecorder;
