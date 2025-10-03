class InternshipChatbotML {
    constructor() {
        this.model = null;
        this.encoder = null;
        this.intentLabels = [];
        this.responses = {};
        this.isReady = false;
        this.trainingHistory = [];
    }


    async initialize() {
        try {
            console.log('🚀 Loading TensorFlow.js models...');
            

            this.encoder = await use.load();
            console.log('✅ Sentence encoder loaded');
            

            this.prepareTrainingData();
            

            await this.buildAndTrainModel();
            
            this.isReady = true;
            console.log('✅ ML Model ready!');
            return true;
        } catch (error) {
            console.error('❌ Model initialization error:', error);
            return false;
        }
    }


    prepareTrainingData() {
        this.intentLabels = [];
        this.responses = {};
        
        TRAINING_DATA.intents.forEach(intent => {
            this.intentLabels.push(intent.tag);
            this.responses[intent.tag] = intent.responses;
        });
        
        console.log(`📊 Prepared ${this.intentLabels.length} intent categories`);
    }


    async buildAndTrainModel() {
        console.log('🏗️ Building neural network...');
        

        const allPatterns = [];
        const allLabels = [];
        
        TRAINING_DATA.intents.forEach((intent, intentIndex) => {
            intent.patterns.forEach(pattern => {
                allPatterns.push(pattern.toLowerCase());
                allLabels.push(intentIndex);
            });
        });
        
        console.log(`📚 Training on ${allPatterns.length} examples`);
        

        const embeddings = await this.encoder.embed(allPatterns);
        const embeddingsArray = await embeddings.array();
        

        const inputShape = embeddingsArray[0].length;
        

        this.model = tf.sequential({
            layers: [
                tf.layers.dense({
                    inputShape: [inputShape],
                    units: 256, // Increased capacity
                    activation: 'relu',
                    kernelInitializer: 'heNormal'
                }),
                tf.layers.dropout({ rate: 0.4 }), // Adjusted dropout
                tf.layers.dense({
                    units: 128, // New hidden layer
                    activation: 'relu'
                }),
                tf.layers.dropout({ rate: 0.3 }),
                tf.layers.dense({
                    units: 64,
                    activation: 'relu'
                }),
                tf.layers.dropout({ rate: 0.2 }),
                tf.layers.dense({
                    units: this.intentLabels.length,
                    activation: 'softmax'
                })
            ]
        });
        

        this.model.compile({
            optimizer: tf.train.adam(0.001),
            loss: 'sparseCategoricalCrossentropy',
            metrics: ['accuracy']
        });
        

        const xs = tf.tensor2d(embeddingsArray);
        const ys = tf.tensor1d(allLabels, 'float32');
        

        console.log('🎓 Training model...');
        const history = await this.model.fit(xs, ys, {
            epochs: 100, // Keep rigorous training
            batchSize: 16,
            validationSplit: 0.2,
            shuffle: true,
            callbacks: {
                onEpochEnd: (epoch, logs) => {
                    if (epoch % 10 === 0) {
                        console.log(`Epoch ${epoch}: loss = ${logs.loss.toFixed(4)}, accuracy = ${logs.acc.toFixed(4)}`);
                    }
                }
            }
        });
        

        xs.dispose();
        ys.dispose();
        embeddings.dispose();
        
        const finalAccuracy = (history.history.acc[history.history.acc.length - 1] * 100).toFixed(2);
        console.log(`✅ Training complete! Final accuracy: ${finalAccuracy}%`);
        
        this.trainingHistory = history.history;
    }


    async predict(userMessage) {
        if (!this.isReady) {
            throw new Error('Model not ready');
        }
        
        try {

            const embedding = await this.encoder.embed([userMessage.toLowerCase()]);
            const embeddingArray = await embedding.array();
            

            const inputTensor = tf.tensor2d(embeddingArray);
            const prediction = this.model.predict(inputTensor);
            const predictionArray = await prediction.array();
            

            embedding.dispose();
            inputTensor.dispose();
            prediction.dispose();
            

            const confidences = predictionArray[0];
            const maxConfidence = Math.max(...confidences);
            const predictedIndex = confidences.indexOf(maxConfidence);
            const predictedIntent = this.intentLabels[predictedIndex];
            
            console.log(`🎯 Predicted: ${predictedIntent} (${(maxConfidence * 100).toFixed(2)}% confidence)`);
            
            return {
                intent: predictedIntent,
                confidence: maxConfidence,
                allConfidences: confidences.map((conf, idx) => ({
                    intent: this.intentLabels[idx],
                    confidence: conf
                })).sort((a, b) => b.confidence - a.confidence)
            };
        } catch (error) {
            console.error('Prediction error:', error);
            return null;
        }
    }


    getResponse(intent) {
        const responses = this.responses[intent];
        if (responses && responses.length > 0) {
            return responses[Math.floor(Math.random() * responses.length)];
        }
        return "I'm not sure how to answer that. Could you rephrase your question?";
    }


    async processQuery(userMessage) {
        if (!this.isReady) {
            return {
                response: "I'm still loading my brain... Please wait a moment! 🧠",
                confidence: 0
            };
        }
        
        const prediction = await this.predict(userMessage);
        
        if (!prediction || prediction.confidence < 0.3) {
            return {
                response: "I'm not quite sure about that. Could you ask about:\n• Eligibility\n• Application process\n• Ministries\n• Stipend\n• Selection process\n• Contact information",
                confidence: prediction ? prediction.confidence : 0,
                suggestions: ['Eligibility?', 'How to apply?', 'Available ministries?']
            };
        }
        
        const response = this.getResponse(prediction.intent);
        
        return {
            response: response,
            confidence: prediction.confidence,
            intent: prediction.intent,
            alternativeIntents: prediction.allConfidences.slice(1, 3)
        };
    }


    getStats() {
        return {
            isReady: this.isReady,
            totalIntents: this.intentLabels.length,
            totalPatterns: TRAINING_DATA.intents.reduce((sum, intent) => sum + intent.patterns.length, 0),
            trainingAccuracy: this.trainingHistory.acc ? 
                (this.trainingHistory.acc[this.trainingHistory.acc.length - 1] * 100).toFixed(2) + '%' : 'N/A'
        };
    }
}


const chatbotML = new InternshipChatbotML();
