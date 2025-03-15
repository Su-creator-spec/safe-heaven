import tensorflow as tf
from tensorflow.keras.models import load_model

def run_moderation_model(input):
    moderation_model = load_model('moderation_model.h5')
    output = moderation_model.predict(input)
    return output

if __name__ == '__main__':
    input = float(sys.argv[1])
    output = run_moderation_model([[input]])
    print(output)