from flask import Blueprint, request, jsonify
from services.parser import parse_musicxml
from services.converter import convert_notes_to_tab

convert_bp = Blueprint('convert', __name__)


@convert_bp.post('/convert')
def convert():
    data = request.get_json()
    if not data or 'file_id' not in data:
        return jsonify({'error': 'file_id required'}), 400

    file_id = data['file_id']
    notes = parse_musicxml(file_id)
    tab = convert_notes_to_tab(notes)
    return jsonify({'tab': tab})
