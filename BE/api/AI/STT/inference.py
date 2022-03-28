# Copyright (c) 2020, Soohwan Kim. All rights reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

import argparse
import torch
import torch.nn as nn
import numpy as np
import torchaudio
from torch import Tensor
from hanspell import spell_checker
import re

from kospeech.vocabs.ksponspeech import KsponSpeechVocabulary
from kospeech.data.audio.core import load_audio

def parse_audio(audio_path: str, del_silence: bool = False, audio_extension: str = 'wav') -> Tensor:
    signal = load_audio(audio_path, del_silence, extension=audio_extension)
    feature = torchaudio.compliance.kaldi.fbank(
        waveform=Tensor(signal).unsqueeze(0),
        num_mel_bins=80,
        frame_length=20,
        frame_shift=10,
        window_type='hamming'
    ).transpose(0, 1).numpy()

    feature -= feature.mean()
    feature /= np.std(feature)

    return torch.FloatTensor(feature).transpose(0, 1)

def getText(audio_path):
    parser = argparse.ArgumentParser(description='KoSpeech')
    # parser.add_argument('--audio_path', type=str, required=True)
    opt = parser.parse_args()

    feature = parse_audio(audio_path, del_silence=True)
    input_length = torch.LongTensor([len(feature)])
    vocab = KsponSpeechVocabulary('C:/Users/multicampus/Desktop/kospeech/data/vocab/aihub_character_vocabs.csv')

    model = torch.load('C:/Users/multicampus/Desktop/models/model.pt', map_location=lambda storage, loc: storage).to('cpu')
    if isinstance(model, nn.DataParallel):
        model = model.module
    model.eval()

    model.device = 'cpu'
    y_hats = model.recognize(feature.unsqueeze(0), input_length)

    sentence = vocab.label_to_string(y_hats.cpu().detach().numpy())
    sentence = sentence[0]
    
    text = sentence.replace('\n',' ')
    text = ' '.join(text.split())
    p = re.compile('\S\b*다\s')
    text = re.sub(p,'다. ',text)
    p = re.compile('[.]+')
    text = re.sub(p,'.',text)
    input_convert = text.replace('.','.#').split('#')
    input_list =  [""]

    for i in input_convert:
        if len(input_list[-1]) + len(i) < 500:
            input_list[-1] += i
        else:
            input_list.append(i)  
    
    result = spell_checker.check(input_list)

    fixed_text = ''
    for i in result:
        fixed_text += i.checked

    return fixed_text

text = getText("C:/Users/multicampus/Desktop/models/test.wav")
print(text)