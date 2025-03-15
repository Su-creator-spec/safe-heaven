import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense

def create_moderation_model():
    moderation_model = Sequential()
    moderation_model.add(Dense(10, activation='relu', input_shape=(10,)))
    moderation_model.add(Dense(1, activation='sigmoid'))
    moderation_model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])
    return moderation_model

moderation_model = create_moderation_model()
moderation_model.save('moderation_model.h5')