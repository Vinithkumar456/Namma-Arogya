import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
import joblib
from sklearn.preprocessing import LabelEncoder

# Load dataset
df = pd.read_csv("dataset.csv")  # Ensure dataset.csv exists

# Encode target variable (disease) into numbers
label_encoder = LabelEncoder()
df["Disease"] = label_encoder.fit_transform(df["Disease"])

# Convert symptoms into binary (one-hot encoding)
df = pd.get_dummies(df)  # This converts symptoms into numeric format (0 or 1)

# Split into features and target
X = df.drop(columns=["Disease"])  # Symptoms
y = df["Disease"]  # Encoded Disease Labels

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train the model
model = RandomForestClassifier(n_estimators=100)
model.fit(X_train, y_train)

# Save model and encoders
joblib.dump(model, "disease_predictor.pkl")
joblib.dump(label_encoder, "label_encoder.pkl")  # Save label encoder for decoding predictions

print("Model trained and saved successfully!")
