import os
import google.generativeai as genai

genai.configure(api_key="AIzaSyBQZr9bOpq_DDtW_39idsyxClH_z2lQrUQ")

print("Available models:")
for m in genai.list_models():
    if 'generateContent' in m.supported_generation_methods:
        print(m.name)
