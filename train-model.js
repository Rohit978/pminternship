
const tf = require('@tensorflow/tfjs-node');
const use = require('@tensorflow-models/universal-sentence-encoder');
const fs = require('fs');


const { TRAINING_DATA } = require('./training-data.js');

async function train() {
    console.log('🚀 Starting offline model training...');


    const intentLabels = TRAINING_DATA.intents.map(intent => intent.tag);
    const allPatterns = [];
    const allLabels = [];

    TRAINING_DATA.intents.forEach((intent, intentIndex) => {
        intent.patterns.forEach(pattern => {
            allPatterns.push(pattern.toLowerCase());
            allLabels.push(intentIndex);
        });
    });

    console.log('✅ Data prepared.');
    console.log('📚 Loading Universal Sentence Encoder...');
    const encoder = await use.load();

    console.log('🧠 Generating embeddings for training patterns...');
    const embeddings = await encoder.embed(allPatterns);
    const embeddingsArray = await embeddings.array();

    console.log('🏗️ Building neural network architecture...');
    const inputShape = embeddingsArray[0].length;
    const model = tf.sequential({
        layers: [
            tf.layers.dense({
                inputShape: [inputShape],
                units: 512,
                activation: 'relu',
                kernelInitializer: 'heNormal',
                kernelRegularizer: tf.regularizers.l2({l2: 0.001})
            }),
            tf.layers.batchNormalization(),
            tf.layers.dropout({ rate: 0.5 }),
            tf.layers.dense({
                units: 256,
                activation: 'relu',
                kernelRegularizer: tf.regularizers.l2({l2: 0.001})
            }),
            tf.layers.batchNormalization(),
            tf.layers.dropout({ rate: 0.4 }),
            tf.layers.dense({
                units: 128,
                activation: 'relu'
            }),
            tf.layers.dropout({ rate: 0.3 }),
            tf.layers.dense({
                units: intentLabels.length,
                activation: 'softmax'
            })
        ]
    });

    model.compile({
        optimizer: tf.train.adam(0.001),
        loss: 'sparseCategoricalCrossentropy',
        metrics: ['accuracy']
    });

    console.log('🎓 Training model...');
    const xs = tf.tensor2d(embeddingsArray);
    const ys = tf.tensor1d(allLabels, 'float32');

    await model.fit(xs, ys, {
        epochs: 100, // Keep rigorous training
        batchSize: 16,
        shuffle: true,
        callbacks: {
            onEpochEnd: (epoch, logs) => {
                console.log(`Epoch ${epoch + 1}: loss = ${logs.loss.toFixed(4)}, accuracy = ${logs.acc.toFixed(4)}`);
            }
        }
    });


    const savePath = 'public/model';
    if (!fs.existsSync(savePath)) {
        fs.mkdirSync(savePath, { recursive: true });
    }
    await model.save(`file://${savePath}`);


    fs.writeFileSync(`${savePath}/intent_labels.json`, JSON.stringify(intentLabels));

    console.log(`✅ Training complete! Model saved to ./${savePath}`);
}

train();
