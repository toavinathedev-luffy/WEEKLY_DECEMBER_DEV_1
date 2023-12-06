from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from spellchecker import SpellChecker

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:4200"}}, supports_credentials=True)

class SpellCheckAPI:
    def __init__(self):
        self.spell_checker = SpellChecker(language='en')  # Spécifiez la langue ici

    def detect_errors(self, text):
        errors = self.spell_checker.unknown(text.split())
        return list(errors)

    def suggest_correction(self, word):
        suggestions = self.spell_checker.suggest(word)
        return suggestions

    def analyze_text(self, text):
        errors = self.spell_checker.unknown(text.split())
        return list(errors)

spell_check_api = SpellCheckAPI()

@app.route('/api/detect',  methods=['POST', 'OPTIONS'])
@cross_origin(vary_header=True)
def detect_errors():
    data = request.get_json()
    if 'text' in data and 'lang' in data:
        return jsonify({'errors': spell_check_api.detect_errors(data['text'])})
    return jsonify({'error': 'Text or language not provided'}), 400

@app.route('/api/suggest', methods=['POST', 'OPTIONS'])
@cross_origin(vary_header=True)
def suggest_correction():
    data = request.get_json()
    if 'word' in data and 'lang' in data:
        return jsonify({'suggestions': spell_check_api.suggest_correction(data['word'])})
    return jsonify({'error': 'Word or language not provided'}), 400

@app.route('/api/analyze', methods=['POST', 'OPTIONS'])
@cross_origin(vary_header=True)
def analyze_text():
    data = request.get_json()
    if 'text' in data and 'lang' in data:
        return jsonify({'errors': spell_check_api.analyze_text(data['text'])})
    return jsonify({'error': 'Text or language not provided'}), 400

if __name__ == '__main__':
    app.run(debug=True)
