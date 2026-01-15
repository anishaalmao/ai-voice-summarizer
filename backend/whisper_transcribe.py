import sys
import subprocess
import whisper
import os

input_path = sys.argv[1]
wav_path = input_path.replace(".webm", ".wav")

# Convert webm → wav
subprocess.run(
    ["ffmpeg", "-y", "-i", input_path, wav_path],
    stdout=subprocess.DEVNULL,
    stderr=subprocess.DEVNULL,
)

# Load Whisper
model = whisper.load_model("base")
result = model.transcribe(wav_path)

# Cleanup converted file
os.remove(wav_path)

print(result["text"])