import pandas as pd
import torch
from torch.utils.data import Dataset, DataLoader
from transformers import AutoTokenizer, AutoModelForSequenceClassification
from sklearn.model_selection import train_test_split
import torch
from transformers import AdamW
from tqdm import tqdm
from torch import nn
from transformers import AutoModel
from transformers import AutoTokenizer
from sklearn.metrics import classification_report
from peft import get_peft_model, LoraConfig, TaskType


class CyberbullyingClassifier(nn.Module):
    def __init__(self, base_model, num_classes):
        super(CyberbullyingClassifier, self).__init__()
        self.base_model = base_model
        self.config = base_model.config
        self.classifier = nn.Sequential(
            nn.Linear(base_model.config.hidden_size + 1, 128),
            nn.ReLU(),
            nn.Dropout(0.2),
            nn.Linear(128, num_classes)
        )

    def forward(self, input_ids=None, attention_mask=None, bad_words_count=None, inputs_embeds=None, labels=None, **kwargs):

        outputs = self.base_model(
            input_ids=input_ids,
            attention_mask=attention_mask,
            inputs_embeds=inputs_embeds,
            **kwargs
        )

        cls_token_embedding = outputs.last_hidden_state[:, 0, :]

        if bad_words_count is not None:
            augmented_features = torch.cat([cls_token_embedding, bad_words_count.unsqueeze(1)], dim=1)
        else:
            augmented_features = cls_token_embedding

        logits = self.classifier(augmented_features)

        if labels is not None:
            loss_fn = torch.nn.CrossEntropyLoss()
            loss = loss_fn(logits, labels)
            return loss, logits

        return logits

